import { describe, expect, it } from 'vitest'
import { achievementSnapshot, bestWinStreak } from './achievements.ts'
import { finalizeBattle } from './battle.ts'
import { at, makeUser, openBattle } from './fixtures.ts'
import { addGoal, completeGoal } from './goals.ts'

function won(day: number): ReturnType<typeof finalizeBattle> {
  const battle = addGoal(openBattle(day), { id: `g-${day}`, title: 'Goal', category: 'Study', difficulty: 'easy' }, at(2026, 10, day, 9))
  return finalizeBattle(completeGoal(battle, makeUser(), `g-${day}`, at(2026, 10, day, 9)).battle)
}

describe('achievements', () => {
  it('counts a three-day win streak and a perfect day', () => {
    const history = [won(8), won(9), won(10)]
    expect(bestWinStreak(history)).toBe(3)
    const snapshot = achievementSnapshot(history, openBattle(11))
    expect(snapshot.unlocked).toContain('first-blood')
    expect(snapshot.unlocked).toContain('three-peat')
    expect(snapshot.unlocked).toContain('no-excuses')
  })

  it('unlocks a comeback only when the day was trailed and still won', () => {
    const trailed = { ...won(8), trailed: true }
    expect(achievementSnapshot([trailed], openBattle(9)).unlocked).toContain('comeback')
    expect(achievementSnapshot([won(8)], openBattle(9)).unlocked).not.toContain('comeback')
  })

  it('unlocks boss slayer from a completed boss goal', () => {
    const battle = addGoal(openBattle(8), { id: 'boss', title: 'Deep work', category: 'Work', difficulty: 'boss' }, at(2026, 10, 8, 9))
    const done = completeGoal(battle, makeUser(), 'boss', at(2026, 10, 8, 9)).battle
    expect(achievementSnapshot([], done).unlocked).toContain('boss-slayer')
  })
})