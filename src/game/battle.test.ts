import { describe, expect, it } from 'vitest'
import { battleState, createBattle, finalizeBattle, resolveResult, rollDay, type GameProgress } from './battle.ts'
import { at, dayKey, makeUser, openBattle } from './fixtures.ts'
import { addGoal, completeGoal } from './goals.ts'
import { streakMilestonesReached } from './streaks.ts'

describe('battle result and state', () => {
  it('compares player XP with rival XP', () => {
    expect(resolveResult(300, 120)).toBe('victory')
    expect(resolveResult(0, 240)).toBe('defeat')
    expect(resolveResult(300, 300)).toBe('draw')
  })

  it('reads the gap in five bands', () => {
    expect(battleState(0, 0)).toBe('close')
    expect(battleState(135, 65)).toBe('dominating')
    expect(battleState(134, 66)).toBe('ahead')
    expect(battleState(110, 90)).toBe('ahead')
    expect(battleState(109, 91)).toBe('close')
    expect(battleState(91, 109)).toBe('close')
    expect(battleState(90, 110)).toBe('behind')
    expect(battleState(66, 134)).toBe('behind')
    expect(battleState(65, 135)).toBe('critical')
    expect(battleState(0, 240)).toBe('critical')
    expect(battleState(-5, 10)).toBe('critical')
  })
})

describe('finalizeBattle', () => {
  it('freezes an unfinished late goal at midnight, not the next morning', () => {
    const battle = addGoal(
      openBattle(8),
      { id: 'calculus', title: 'Calculus', category: 'Study', difficulty: 'hard' },
      at(2026, 10, 8, 23),
    )
    const finalized = finalizeBattle(battle)
    expect(finalized.rivalXP).toBe(240)
    expect(finalized.playerXP).toBe(0)
    expect(finalized.result).toBe('defeat')
    expect(finalized.endedAt).toBe(at(2026, 10, 9))
    expect(finalizeBattle(finalized)).toBe(finalized)
  })

  it('keeps an early completion frozen when the day ends', () => {
    const battle = addGoal(
      openBattle(8),
      { id: 'calculus', title: 'Calculus', category: 'Study', difficulty: 'hard' },
      at(2026, 10, 8, 9),
    )
    const done = completeGoal(battle, makeUser(), 'calculus', at(2026, 10, 8, 9, 30))
    const finalized = finalizeBattle(done.battle)
    expect(finalized.playerXP).toBe(300)
    expect(finalized.rivalXP).toBe(120)
    expect(finalized.result).toBe('victory')
  })

  it('draws when the rival reaches the reward at the same moment', () => {
    const battle = addGoal(
      openBattle(8),
      { id: 'calculus', title: 'Calculus', category: 'Study', difficulty: 'hard' },
      at(2026, 10, 8, 9),
    )
    const done = completeGoal(battle, makeUser(), 'calculus', at(2026, 10, 8, 10, 15))
    expect(finalizeBattle(done.battle).result).toBe('draw')
  })
})

describe('rollDay', () => {
  it('leaves today untouched', () => {
    const progress = { user: makeUser(), currentBattle: openBattle(8), history: [] }
    expect(rollDay(progress, at(2026, 10, 8, 22), 'next')).toBe(progress)
  })

  it('archives yesterday, keeps a defeat on the participation streak, and opens today', () => {
    const started = addGoal(
      openBattle(8),
      { id: 'calculus', title: 'Calculus', category: 'Study', difficulty: 'hard' },
      at(2026, 10, 8, 9),
    )
    const next = rollDay({ user: makeUser(), currentBattle: started, history: [] }, at(2026, 10, 9, 8), 'battle-9')
    expect(next.history).toHaveLength(1)
    expect(next.history[0]).toMatchObject({ date: dayKey(8), result: 'defeat', playerXP: 0, rivalXP: 300 })
    expect(next.user).toMatchObject({ losses: 1, wins: 0, draws: 0, currentStreak: 1, bestStreak: 1 })
    expect(next.currentBattle).toMatchObject({ id: 'battle-9', date: dayKey(9), result: 'active', goals: [] })
    expect(started.result).toBe('active')
  })

  it('counts three participating days, including losses, then breaks on a gap', () => {
    let progress: GameProgress = {
      user: makeUser(),
      currentBattle: addGoal(openBattle(8), { id: 'a', title: 'A', category: 'Study', difficulty: 'hard' }, at(2026, 10, 8, 9)),
      history: [],
    }
    progress = rollDay(progress, at(2026, 10, 9, 8), 'battle-9')
    progress = {
      ...progress,
      currentBattle: addGoal(progress.currentBattle, { id: 'b', title: 'B', category: 'Study', difficulty: 'easy' }, at(2026, 10, 9, 8, 5)),
    }
    const won = completeGoal(progress.currentBattle, progress.user, 'b', at(2026, 10, 9, 8, 5))
    progress = rollDay({ ...progress, user: won.user, currentBattle: won.battle }, at(2026, 10, 10, 8), 'battle-10')
    progress = {
      ...progress,
      currentBattle: addGoal(progress.currentBattle, { id: 'c', title: 'C', category: 'Study', difficulty: 'easy' }, at(2026, 10, 10, 8, 5)),
    }
    const wonAgain = completeGoal(progress.currentBattle, progress.user, 'c', at(2026, 10, 10, 8, 5))
    progress = { ...progress, user: wonAgain.user, currentBattle: wonAgain.battle }

    expect(rollDay(progress, at(2026, 10, 11, 8), 'battle-11').user.currentStreak).toBe(3)
    const afterGap = rollDay(progress, at(2026, 10, 13, 8), 'battle-13')
    expect(afterGap.user.currentStreak).toBe(0)
    expect(afterGap.user.bestStreak).toBe(3)
    expect(afterGap.user.wins).toBe(2)
    expect(afterGap.user.losses).toBe(1)
    expect(afterGap.history.map((battle) => battle.date)).toEqual([dayKey(8), dayKey(9), dayKey(10)])
    expect(streakMilestonesReached(3)).toEqual([3])
    expect(afterGap.user.totalXP).toBe(200)
  })

  it('does not score a day that never got a goal', () => {
    const next = rollDay({ user: makeUser(), currentBattle: openBattle(8), history: [] }, at(2026, 10, 9, 8), 'battle-9')
    expect(next.history[0]?.result).toBe('draw')
    expect(next.user).toMatchObject({ wins: 0, losses: 0, draws: 0, currentStreak: 0, bestStreak: 0 })
  })

  it('refuses a battle start that is not on its date', () => {
    expect(() => createBattle('x', dayKey(8), at(2026, 10, 9, 8))).toThrow()
  })
})
