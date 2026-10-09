import { describe, expect, it } from 'vitest'
import type { DailyBattle } from '../types/game.ts'
import { finalizeBattle } from './battle.ts'
import { at, openBattle } from './fixtures.ts'
import { addGoal } from './goals.ts'
import { streakMilestonesReached, tallyRecord } from './streaks.ts'

function finished(day: number, withGoal: boolean): DailyBattle {
  const battle = withGoal
    ? addGoal(openBattle(day), { id: `g-${day}`, title: 'Goal', category: 'Study', difficulty: 'easy' }, at(2026, 10, day, 9))
    : openBattle(day)
  return finalizeBattle(battle)
}

describe('participation streaks', () => {
  it('restarts after one missed day and keeps the best run', () => {
    const history = [finished(8, true), finished(9, true), finished(10, false), finished(11, true)]
    const record = tallyRecord(history, '2026-10-12')
    expect(record.currentStreak).toBe(1)
    expect(record.bestStreak).toBe(2)
    expect(record.losses).toBe(3)
    expect(record.draws).toBe(0)
  })

  it('drops the current run when today is more than one day later', () => {
    const record = tallyRecord([finished(8, true)], '2026-10-11')
    expect(record.currentStreak).toBe(0)
    expect(record.bestStreak).toBe(1)
  })

  it('lists the milestones a run has reached', () => {
    expect(streakMilestonesReached(0)).toEqual([])
    expect(streakMilestonesReached(3)).toEqual([3])
    expect(streakMilestonesReached(14)).toEqual([3, 7, 14])
    expect(streakMilestonesReached(365)).toEqual([3, 7, 14, 30, 60, 100, 365])
  })
})
