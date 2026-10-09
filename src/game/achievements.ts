import type { DailyBattle } from '../types/game.ts'
import { daysBetween } from './time.ts'

export interface AchievementSnapshot {
  unlocked: string[]
  goalsCompleted: number
  goalsTotal: number
  bestWinStreak: number
}

function counted(history: readonly DailyBattle[]): DailyBattle[] {
  return [...history]
    .filter((battle) => battle.result !== 'active' && battle.goals.length > 0)
    .sort((a, b) => a.date.localeCompare(b.date))
}

export function bestWinStreak(history: readonly DailyBattle[]): number {
  let streak = 0
  let best = 0
  let previous: string | null = null
  for (const battle of counted(history)) {
    if (battle.result !== 'victory' || (previous !== null && daysBetween(previous, battle.date) !== 1)) {
      streak = battle.result === 'victory' ? 1 : 0
    } else {
      streak += 1
    }
    best = Math.max(best, streak)
    previous = battle.date
  }
  return best
}

export function achievementSnapshot(history: readonly DailyBattle[], current: DailyBattle): AchievementSnapshot {
  const battles = [...history, current]
  const goals = battles.flatMap((battle) => battle.goals)
  const goalsCompleted = goals.filter((goal) => goal.completed).length
  const unlocked = new Set<string>()
  if (counted(history).some((battle) => battle.result === 'victory')) unlocked.add('first-blood')
  if (counted(history).some((battle) => battle.result === 'victory' && battle.trailed)) unlocked.add('comeback')
  const wins = bestWinStreak(history)
  if (wins >= 3) unlocked.add('three-peat')
  if (wins >= 7) unlocked.add('warrior')
  if (goals.some((goal) => goal.completed && goal.difficulty === 'boss')) unlocked.add('boss-slayer')
  if (counted(history).some((battle) => battle.goals.every((goal) => goal.completed))) unlocked.add('no-excuses')
  return {
    unlocked: [...unlocked],
    goalsCompleted,
    goalsTotal: goals.length,
    bestWinStreak: wins,
  }
}
