import { describe, expect, it } from 'vitest'
import { projectBattle } from './goals.ts'
import { at, makeGoal, openBattle } from './fixtures.ts'
import { rivalXpForGoal } from './xp.ts'

const created = at(2026, 10, 8, 9)

describe('rival XP from timestamps', () => {
  it('follows the calculus example and then stops at the cap', () => {
    const goal = makeGoal()
    expect(rivalXpForGoal(goal, at(2026, 10, 8, 9, 30))).toBe(120)
    expect(rivalXpForGoal(goal, at(2026, 10, 8, 10))).toBe(240)
    expect(rivalXpForGoal(goal, at(2026, 10, 8, 10, 15))).toBe(300)
    expect(rivalXpForGoal(goal, at(2026, 10, 8, 12))).toBe(300)
  })

  it('counts a partial minute exactly', () => {
    const goal = makeGoal()
    expect(rivalXpForGoal(goal, created + 90_000)).toBe(6)
  })

  it('does not go backwards before the goal exists', () => {
    const goal = makeGoal()
    expect(rivalXpForGoal(goal, created)).toBe(0)
    expect(rivalXpForGoal(goal, created - 1)).toBe(0)
  })

  it('freezes at completion and ignores later time', () => {
    const goal = makeGoal({ completed: true, completedAt: at(2026, 10, 8, 9, 30) })
    expect(rivalXpForGoal(goal, at(2026, 10, 8, 9, 30))).toBe(120)
    expect(rivalXpForGoal(goal, at(2026, 10, 8, 18))).toBe(120)
  })

  it('sums goals and caps each one on its own', () => {
    const battle = {
      ...openBattle(8),
      goals: [makeGoal({ id: 'a' }), makeGoal({ id: 'b', createdAt: at(2026, 10, 8, 9) })],
    }
    const projected = projectBattle(battle, at(2026, 10, 8, 12))
    expect(projected.rivalXP).toBe(600)
    expect(battle.rivalXP).toBe(0)
  })
})
