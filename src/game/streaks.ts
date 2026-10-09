import type { DailyBattle } from '../types/game.ts'
import { daysBetween } from './time.ts'

/**
 * Participation streak, not a win streak.
 * A day counts when it has at least one goal. A defeat still counts.
 * A day with no goals, or a calendar gap before today, breaks the run.
 * There is no recovery day in the MVP: the next participating day starts at 1.
 * Milestones: 3, 7, 14, 30, 60, 100, 365.
 */

export const STREAK_MILESTONES = [3, 7, 14, 30, 60, 100, 365] as const

export interface CareerRecord {
  wins: number
  losses: number
  draws: number
  currentStreak: number
  bestStreak: number
}

export function streakMilestonesReached(streak: number): number[] {
  return STREAK_MILESTONES.filter((milestone) => streak >= milestone)
}

/**
 * Rebuild wins, losses, draws, and streak from finalized battles.
 * Goalless days are kept in history but do not move the record.
 */
export function tallyRecord(history: readonly DailyBattle[], today: string): CareerRecord {
  const ordered = [...history].sort((a, b) => a.date.localeCompare(b.date))
  let wins = 0
  let losses = 0
  let draws = 0
  let currentStreak = 0
  let bestStreak = 0
  let lastParticipation: string | null = null

  for (const battle of ordered) {
    if (battle.result === 'active') continue
    if (battle.goals.length === 0) {
      currentStreak = 0
      lastParticipation = null
      continue
    }
    if (battle.result === 'victory') wins += 1
    else if (battle.result === 'defeat') losses += 1
    else draws += 1

    if (lastParticipation !== null && daysBetween(lastParticipation, battle.date) === 1) currentStreak += 1
    else currentStreak = 1
    bestStreak = Math.max(bestStreak, currentStreak)
    lastParticipation = battle.date
  }

  if (lastParticipation !== null && daysBetween(lastParticipation, today) > 1) currentStreak = 0

  return { wins, losses, draws, currentStreak, bestStreak }
}
