import type { Goal } from '../types/game.ts'

/**
 * Rival XP is derived from timestamps:
 * elapsedMinutes = (currentTime - goal.createdAt) / 60000
 * rivalXP = min(elapsedMinutes * rivalRatePerMinute, rivalMaxXP)
 *
 * Completion freezes the clock at `completedAt`. After that the rate is 0.
 */

export function rivalXpForGoal(goal: Goal, at: number): number {
  const freezeAt = goal.completed ? (goal.completedAt ?? goal.createdAt) : at
  const elapsedMs = freezeAt - goal.createdAt
  if (elapsedMs <= 0) return 0
  const elapsedMinutes = elapsedMs / 60_000
  return Math.min(elapsedMinutes * goal.rivalRatePerMinute, goal.rivalMaxXP)
}

export function rivalXpForGoals(goals: readonly Goal[], at: number): number {
  return goals.reduce((sum, goal) => sum + rivalXpForGoal(goal, at), 0)
}

/** Sum of rewards already stored on completed goals. Each goal pays once. */
export function playerXpForGoals(goals: readonly Goal[]): number {
  return goals.reduce((sum, goal) => sum + (goal.completed ? goal.xpReward : 0), 0)
}
