import { useEffect, useRef, useState, type ReactNode } from 'react'
import { addGoal as addGoalToBattle, completeGoal as completeGoalInBattle, projectBattle } from '../game/goals.ts'
import { battleState, createBattle, rollDay, type GameProgress } from '../game/battle.ts'
import { GameRuleError } from '../game/errors.ts'
import { calendarDate } from '../game/time.ts'
import type { GoalDifficulty, Rival } from '../types/game.ts'
import { GameContext, type CompletionNotice, type GameView } from './gameContext.ts'

function createInitialProgress(now: number): GameProgress {
  return {
    user: {
      id: crypto.randomUUID(),
      name: 'Player',
      level: 1,
      totalXP: 0,
      currentStreak: 0,
      bestStreak: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      character: {},
    },
    currentBattle: createBattle(crypto.randomUUID(), calendarDate(now), now),
    history: [],
  }
}

const defaultRival: Rival = {
  id: 'rival',
  name: 'Rival',
  personality: 'challenger',
  appearance: {},
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(() => createInitialProgress(Date.now()))
  const progressRef = useRef(progress)
  const [now, setNow] = useState(() => Date.now())
  const [notice, setNotice] = useState<CompletionNotice | null>(null)

  useEffect(() => {
    const tick = () => {
      const nextNow = Date.now()
      setNow(nextNow)
      const next = rollDay(progressRef.current, nextNow, crypto.randomUUID())
      if (next === progressRef.current) return
      progressRef.current = next
      setProgress(next)
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

  const addGoal = (input: { title: string; category: string; difficulty: GoalDifficulty }) => {
    const at = Date.now()
    const rolled = rollDay(progressRef.current, at, crypto.randomUUID())
    try {
      const next = {
        ...rolled,
        currentBattle: addGoalToBattle(rolled.currentBattle, { ...input, id: crypto.randomUUID() }, at),
      }
      progressRef.current = next
      setNow(at)
      setProgress(next)
      return null
    } catch (error) {
      progressRef.current = rolled
      setNow(at)
      setProgress(rolled)
      return error instanceof GameRuleError ? error.message : 'Could not add that goal'
    }
  }

  const completeGoal = (goalId: string) => {
    const at = Date.now()
    const rolled = rollDay(progressRef.current, at, crypto.randomUUID())
    const goal = rolled.currentBattle.goals.find((item) => item.id === goalId)
    if (!goal || goal.completed) {
      progressRef.current = rolled
      setNow(at)
      setProgress(rolled)
      return
    }
    const next = completeGoalInBattle(rolled.currentBattle, rolled.user, goalId, at)
    const updated = { user: next.user, currentBattle: next.battle, history: rolled.history }
    progressRef.current = updated
    setNow(at)
    setProgress(updated)
    setNotice({ title: goal.title, xp: goal.xpReward })
  }

  const battle = projectBattle(progress.currentBattle, now)

  const value: GameView = {
    now,
    user: progress.user,
    rival: defaultRival,
    battle,
    state: battleState(battle.playerXP, battle.rivalXP),
    notice,
    addGoal,
    completeGoal,
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}
