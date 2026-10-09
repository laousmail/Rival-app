import type { DailyBattle, Goal, User } from '../types/game.ts'
import { createBattle } from './battle.ts'

export function at(year: number, month: number, day: number, hour = 0, minute = 0, second = 0): number {
  return new Date(year, month - 1, day, hour, minute, second, 0).getTime()
}

export function dayKey(day: number): string {
  return `2026-10-${String(day).padStart(2, '0')}`
}

export function makeUser(overrides: Partial<User> = {}): User {
  return {
    id: 'user-1',
    name: 'Player',
    level: 1,
    totalXP: 0,
    currentStreak: 0,
    bestStreak: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    character: {},
    ...overrides,
  }
}

export function openBattle(day: number, hour = 8): DailyBattle {
  return createBattle(`battle-${day}`, dayKey(day), at(2026, 10, day, hour))
}

export function makeGoal(overrides: Partial<Goal> = {}): Goal {
  return {
    id: 'calculus',
    title: 'Calculus',
    category: 'Study',
    difficulty: 'hard',
    xpReward: 300,
    rivalRatePerMinute: 4,
    rivalMaxXP: 300,
    createdAt: at(2026, 10, 8, 9),
    completed: false,
    ...overrides,
  }
}
