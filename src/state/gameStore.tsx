import { useEffect, useRef, useState, type ReactNode } from 'react'
import { DEFAULT_APPEARANCE, DEFAULT_CHARACTER } from '../data/appearance.ts'
import { achievementSnapshot } from '../game/achievements.ts'
import { battleState, createBattle, rollDay, type GameProgress } from '../game/battle.ts'
import { GameRuleError } from '../game/errors.ts'
import { addGoal as addGoalToBattle, completeGoal as completeGoalInBattle, projectBattle } from '../game/goals.ts'
import { playCue } from '../game/sound.ts'
import { calendarDate, startOfNextDay } from '../game/time.ts'
import { loadGame, resetGame, saveGame, type SaveData } from '../persistence/storage.ts'
import type { DailyBattle, Rival, RivalPersonality } from '../types/game.ts'
import { GameContext, type CompletionNotice, type GameView, type NewGoalInput } from './gameContext.ts'

function freshProgress(now: number, name = 'Player'): GameProgress {
  return {
    user: {
      id: crypto.randomUUID(),
      name,
      level: 1,
      totalXP: 0,
      currentStreak: 0,
      bestStreak: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      character: { ...DEFAULT_CHARACTER },
    },
    currentBattle: createBattle(crypto.randomUUID(), calendarDate(now), now),
    history: [],
  }
}

function freshRival(name = 'Rival', personality: RivalPersonality = 'challenger'): Rival {
  return {
    id: crypto.randomUUID(),
    name,
    personality,
    appearance: { ...DEFAULT_APPEARANCE },
  }
}

function readSave(): { started: boolean; data: SaveData } {
  const saved = loadGame()
  if (!saved) {
    return {
      started: false,
      data: { progress: freshProgress(Date.now()), rival: freshRival(), muted: false, seenBattleIds: [] },
    }
  }
  return { started: true, data: saved }
}

export function GameProvider({ children }: { children: ReactNode }) {
  const initial = useState(readSave)[0]
  const [started, setStarted] = useState(initial.started)
  const [progress, setProgress] = useState(initial.data.progress)
  const [rival, setRival] = useState(initial.data.rival)
  const [muted, setMutedState] = useState(initial.data.muted)
  const [seenBattleIds, setSeenBattleIds] = useState(initial.data.seenBattleIds)
  const [now, setNow] = useState(() => Date.now())
  const [notice, setNotice] = useState<CompletionNotice | null>(null)
  const [dayResult, setDayResult] = useState<DailyBattle | null>(null)
  const progressRef = useRef(progress)
  const seenRef = useRef(seenBattleIds)
  const mutedRef = useRef(muted)
  const rivalRef = useRef(rival)

  useEffect(() => {
    seenRef.current = seenBattleIds
    mutedRef.current = muted
    rivalRef.current = rival
  })

  const publish = (next: GameProgress, reveal: boolean) => {
    const previous = progressRef.current
    const added = next.history.filter((battle) => !previous.history.some((item) => item.id === battle.id))
    progressRef.current = next
    setProgress(next)
    if (!reveal) return
    const result = [...added].reverse().find((battle) => battle.goals.length > 0 && !seenRef.current.includes(battle.id))
    if (result) setDayResult(result)
  }

  const noteTrail = (nextNow: number) => {
    const current = progressRef.current
    if (current.currentBattle.trailed || current.currentBattle.result !== 'active') return
    const projected = projectBattle(current.currentBattle, nextNow)
    if (projected.rivalXP <= projected.playerXP) return
    publish({ ...current, currentBattle: { ...current.currentBattle, trailed: true } }, false)
  }

  useEffect(() => {
    const tick = () => {
      const nextNow = Date.now()
      setNow(nextNow)
      const next = rollDay(progressRef.current, nextNow, crypto.randomUUID())
      if (next !== progressRef.current) publish(next, true)
      noteTrail(nextNow)
    }
    const id = window.setInterval(tick, 1000)
    document.addEventListener('visibilitychange', tick)
    return () => {
      window.clearInterval(id)
      document.removeEventListener('visibilitychange', tick)
    }
  }, [])

  useEffect(() => {
    if (!notice) return
    const id = window.setTimeout(() => setNotice(null), 4200)
    return () => window.clearTimeout(id)
  }, [notice])

  useEffect(() => {
    if (!started) return
    saveGame({ progress, rival, muted, seenBattleIds })
  }, [started, progress, rival, muted, seenBattleIds])

  const addGoal = (input: NewGoalInput) => {
    const at = Date.now()
    const rolled = rollDay(progressRef.current, at, crypto.randomUUID())
    try {
      const next = {
        ...rolled,
        currentBattle: addGoalToBattle(rolled.currentBattle, { ...input, id: crypto.randomUUID() }, at),
      }
      setNow(at)
      publish(next, true)
      return null
    } catch (error) {
      setNow(at)
      publish(rolled, true)
      return error instanceof GameRuleError ? error.message : 'Could not add that goal'
    }
  }

  const completeGoal = (goalId: string) => {
    const at = Date.now()
    const rolled = rollDay(progressRef.current, at, crypto.randomUUID())
    const goal = rolled.currentBattle.goals.find((item) => item.id === goalId)
    if (!goal || goal.completed) {
      setNow(at)
      publish(rolled, true)
      return
    }
    const next = completeGoalInBattle(rolled.currentBattle, rolled.user, goalId, at)
    setNow(at)
    publish({ user: next.user, currentBattle: next.battle, history: rolled.history }, true)
    setNotice({ title: goal.title, xp: goal.xpReward })
    playCue('complete', mutedRef.current)
  }

  const endDay = () => {
    const at = startOfNextDay(progressRef.current.currentBattle.date) + 60_000
    const next = rollDay(progressRef.current, at, crypto.randomUUID())
    setNow(at)
    publish(next, true)
    const result = next.history[next.history.length - 1]
    if (result && result.goals.length > 0) playCue(result.result === 'defeat' ? 'defeat' : 'victory', mutedRef.current)
  }

  const dismissDay = () => {
    if (!dayResult) return
    setSeenBattleIds((current) => (current.includes(dayResult.id) ? current : [...current, dayResult.id]))
    setDayResult(null)
  }

  const begin = (input: { name: string; rivalName: string; personality: RivalPersonality; goals: NewGoalInput[] }) => {
    const at = Date.now()
    let next = freshProgress(at, input.name.trim())
    const createdRival = freshRival(input.rivalName.trim(), input.personality)
    for (const goal of input.goals) {
      next = {
        ...next,
        currentBattle: addGoalToBattle(next.currentBattle, { ...goal, id: crypto.randomUUID() }, at),
      }
    }
    progressRef.current = next
    rivalRef.current = createdRival
    setProgress(next)
    setRival(createdRival)
    setSeenBattleIds([])
    setDayResult(null)
    setNotice(null)
    setNow(at)
    setStarted(true)
  }

  const battle = projectBattle(progress.currentBattle, now)
  const value: GameView = {
    started,
    now,
    user: progress.user,
    rival,
    battle,
    state: battleState(battle.playerXP, battle.rivalXP),
    notice,
    dayResult,
    muted,
    achievements: achievementSnapshot(progress.history, battle),
    addGoal,
    completeGoal,
    endDay,
    dismissDay,
    setMuted: (value) => {
      mutedRef.current = value
      setMutedState(value)
    },
    updateUser: (patch) => {
      const current = progressRef.current
      const next = {
        ...current,
        user: {
          ...current.user,
          name: patch.name?.trim() || current.user.name,
          character: { ...current.user.character, ...patch.character },
        },
      }
      progressRef.current = next
      setProgress(next)
    },
    updateRival: (patch) => {
      const next = {
        ...rivalRef.current,
        name: patch.name?.trim() || rivalRef.current.name,
        personality: patch.personality ?? rivalRef.current.personality,
        appearance: { ...rivalRef.current.appearance, ...patch.appearance },
      }
      rivalRef.current = next
      setRival(next)
    },
    reset: () => {
      resetGame()
      const at = Date.now()
      const next = freshProgress(at)
      progressRef.current = next
      setProgress(next)
      setRival(freshRival())
      setMutedState(false)
      setSeenBattleIds([])
      setDayResult(null)
      setNotice(null)
      setStarted(false)
    },
    begin,
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}
