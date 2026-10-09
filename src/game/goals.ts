import { DIFFICULTIES } from '../data/difficulties.ts'
import type { DailyBattle, Goal, GoalDifficulty, User } from '../types/game.ts'
import { GameRuleError } from './errors.ts'
import { calculateLevel } from './levels.ts'
import { assertTimestamp, calendarDate } from './time.ts'
import { playerXpForGoals, rivalXpForGoals } from './xp.ts'

export interface NewGoal {
  id: string
  title: string
  category: string
  difficulty: GoalDifficulty
}

function presetFor(difficulty: GoalDifficulty) {
  const preset = DIFFICULTIES.find((item) => item.id === difficulty)
  if (!preset) throw new GameRuleError('Unknown difficulty')
  return preset
}

/** Live XP for an active battle. A finished battle stays frozen. */
export function projectBattle(battle: DailyBattle, at: number): DailyBattle {
  assertTimestamp(at)
  if (battle.result !== 'active') return battle
  return {
    ...battle,
    playerXP: playerXpForGoals(battle.goals),
    rivalXP: rivalXpForGoals(battle.goals, at),
  }
}

function assertInsideBattleDay(battle: DailyBattle, at: number): void {
  if (calendarDate(at) !== battle.date) throw new GameRuleError('Goal time is outside this battle day')
}

/**
 * Copy the preset onto the goal. Later edits to the table do not rewrite it.
 * There is no delete: an open goal that has started feeding the rival stays.
 */
export function addGoal(battle: DailyBattle, input: NewGoal, now: number): DailyBattle {
  assertTimestamp(now)
  if (battle.result !== 'active') throw new GameRuleError('Battle is already finished')
  assertInsideBattleDay(battle, now)
  const title = input.title.trim()
  const category = input.category.trim()
  if (!title) throw new GameRuleError('Goal name is required')
  if (!category) throw new GameRuleError('Category is required')
  if (!input.id.trim()) throw new GameRuleError('Goal id is required')
  if (battle.goals.some((goal) => goal.id === input.id)) throw new GameRuleError('Goal id already exists')

  const preset = presetFor(input.difficulty)
  const goal: Goal = {
    id: input.id,
    title,
    category,
    difficulty: input.difficulty,
    xpReward: preset.xpReward,
    rivalRatePerMinute: preset.rivalRatePerMinute,
    rivalMaxXP: preset.rivalMaxXP,
    createdAt: now,
    completed: false,
  }
  return projectBattle({ ...battle, goals: [...battle.goals, goal] }, now)
}

/**
 * Award `goal.xpReward` once. A second call is a no-op, so a refresh cannot double-pay.
 * The reward read is the number stored on the goal, not today's preset table.
 */
export function completeGoal(
  battle: DailyBattle,
  user: User,
  goalId: string,
  at: number,
): { battle: DailyBattle; user: User } {
  assertTimestamp(at)
  if (battle.result !== 'active') throw new GameRuleError('Battle is already finished')
  assertInsideBattleDay(battle, at)
  const goal = battle.goals.find((item) => item.id === goalId)
  if (!goal) throw new GameRuleError('Goal not found')
  if (goal.completed) return { battle, user }
  if (at < goal.createdAt) throw new GameRuleError('Goal cannot be completed before it starts')

  const goals = battle.goals.map((item) => (item.id === goalId ? { ...item, completed: true, completedAt: at } : item))
  const totalXP = user.totalXP + goal.xpReward
  return {
    battle: projectBattle({ ...battle, goals }, at),
    user: { ...user, totalXP, level: calculateLevel(totalXP) },
  }
}
