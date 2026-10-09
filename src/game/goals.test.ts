import { describe, expect, it } from 'vitest'
import { finalizeBattle } from './battle.ts'
import { GameRuleError } from './errors.ts'
import { at, makeGoal, makeUser, openBattle } from './fixtures.ts'
import { addGoal, completeGoal, projectBattle } from './goals.ts'

const nine = at(2026, 10, 8, 9)
const nineThirty = at(2026, 10, 8, 9, 30)
const tenFifteen = at(2026, 10, 8, 10, 15)

describe('goals', () => {
  it('copies the hard preset from the calculus example', () => {
    const battle = addGoal(openBattle(8), { id: 'calculus', title: 'Calculus', category: 'Study', difficulty: 'hard' }, nine)
    const goal = battle.goals[0]
    expect(goal).toMatchObject({
      xpReward: 300,
      rivalRatePerMinute: 4,
      rivalMaxXP: 300,
      completed: false,
      createdAt: nine,
    })
    expect(openBattle(8).goals).toHaveLength(0)
  })

  it('pays the stored reward once, then ignores a second completion', () => {
    const battle = addGoal(openBattle(8), { id: 'calculus', title: 'Calculus', category: 'Study', difficulty: 'hard' }, nine)
    const first = completeGoal(battle, makeUser(), 'calculus', tenFifteen)
    const second = completeGoal(first.battle, first.user, 'calculus', at(2026, 10, 8, 11))

    expect(first.user.totalXP).toBe(300)
    expect(first.user.level).toBe(1)
    expect(first.battle.playerXP).toBe(300)
    expect(first.battle.rivalXP).toBe(300)
    expect(first.battle.goals[0]?.completedAt).toBe(tenFifteen)
    expect(second.user).toBe(first.user)
    expect(second.battle).toBe(first.battle)
    expect(battle.playerXP).toBe(0)
  })

  it('uses the reward stored on the goal, not the live preset', () => {
    const battle = { ...openBattle(8), goals: [makeGoal({ xpReward: 125, rivalMaxXP: 125 })] }
    const done = completeGoal(battle, makeUser(), 'calculus', nineThirty)
    expect(done.user.totalXP).toBe(125)
    expect(done.battle.playerXP).toBe(125)
  })

  it('stops rival XP for that goal only', () => {
    let battle = addGoal(openBattle(8), { id: 'calculus', title: 'Calculus', category: 'Study', difficulty: 'hard' }, nine)
    battle = addGoal(battle, { id: 'guitar', title: 'Guitar', category: 'Music', difficulty: 'medium' }, nine)
    const done = completeGoal(battle, makeUser(), 'calculus', nineThirty)
    const later = projectBattle(done.battle, at(2026, 10, 8, 10))
    expect(later.playerXP).toBe(300)
    expect(later.rivalXP).toBe(120 + 120)
  })

  it('levels up from lifetime XP', () => {
    const battle = addGoal(openBattle(8), { id: 'calculus', title: 'Calculus', category: 'Study', difficulty: 'hard' }, nine)
    const done = completeGoal(battle, makeUser({ totalXP: 400, level: 1 }), 'calculus', nine)
    expect(done.user.totalXP).toBe(700)
    expect(done.user.level).toBe(2)
  })

  it('rejects a blank name, a duplicate, a finished day, and a time outside the day', () => {
    const battle = addGoal(openBattle(8), { id: 'calculus', title: 'Calculus', category: 'Study', difficulty: 'hard' }, nine)
    expect(() => addGoal(battle, { id: 'x', title: '   ', category: 'Study', difficulty: 'easy' }, nine)).toThrow(GameRuleError)
    expect(() => addGoal(battle, { id: 'calculus', title: 'Again', category: 'Study', difficulty: 'easy' }, nine)).toThrow(GameRuleError)
    expect(() => addGoal(battle, { id: 'late', title: 'Late', category: 'Study', difficulty: 'easy' }, at(2026, 10, 9, 9))).toThrow(
      GameRuleError,
    )
    expect(() => completeGoal(battle, makeUser(), 'missing', nineThirty)).toThrow(GameRuleError)
    expect(() => completeGoal(battle, makeUser(), 'calculus', nine - 1)).toThrow(GameRuleError)
    const finalized = finalizeBattle(battle)
    expect(() => completeGoal(finalized, makeUser(), 'calculus', nineThirty)).toThrow(GameRuleError)
    expect(() => addGoal(finalized, { id: 'late', title: 'Late', category: 'Study', difficulty: 'easy' }, nineThirty)).toThrow(
      GameRuleError,
    )
  })
})
