import type { BattleResult, BattleState, DailyBattle, User } from '../types/game.ts'
import { GameRuleError } from './errors.ts'
import { calculateLevel } from './levels.ts'
import { tallyRecord } from './streaks.ts'
import { assertTimestamp, calendarDate, startOfNextDay } from './time.ts'
import { playerXpForGoals, rivalXpForGoals } from './xp.ts'

/**
 * Battle state bands, as a share of the combined XP.
 * The specification names the five states and does not give cutoffs.
 * Dominating / critical: a lead of 35% or more of the total.
 * Ahead / behind: a lead of 10% or more.
 * Close: anything tighter, including 0–0 at the start of the day.
 */
const DOMINATING_LEAD = 35
const AHEAD_LEAD = 10

export interface GameProgress {
  user: User
  currentBattle: DailyBattle
  history: readonly DailyBattle[]
}

export function resolveResult(playerXP: number, rivalXP: number): Exclude<BattleResult, 'active'> {
  if (playerXP > rivalXP) return 'victory'
  if (playerXP < rivalXP) return 'defeat'
  return 'draw'
}

export function battleState(playerXP: number, rivalXP: number): BattleState {
  const player = Math.max(0, playerXP)
  const rival = Math.max(0, rivalXP)
  const total = player + rival
  if (total === 0) return 'close'
  const leadTimes100 = (player - rival) * 100
  if (leadTimes100 >= total * DOMINATING_LEAD) return 'dominating'
  if (leadTimes100 >= total * AHEAD_LEAD) return 'ahead'
  if (leadTimes100 > total * -AHEAD_LEAD) return 'close'
  if (leadTimes100 > total * -DOMINATING_LEAD) return 'behind'
  return 'critical'
}

export function createBattle(id: string, date: string, startedAt: number): DailyBattle {
  assertTimestamp(startedAt)
  if (!id.trim()) throw new GameRuleError('Battle id is required')
  if (calendarDate(startedAt) !== date) throw new GameRuleError('Battle start is outside its date')
  return {
    id,
    date,
    goals: [],
    playerXP: 0,
    rivalXP: 0,
    result: 'active',
    startedAt,
  }
}

/**
 * Freeze yesterday at the local midnight that ended it, not at the moment
 * the app is opened later. A goal created at 23:00 does not earn the rival
 * overnight credit.
 */
export function finalizeBattle(battle: DailyBattle): DailyBattle {
  if (battle.result !== 'active') return battle
  const endedAt = startOfNextDay(battle.date)
  const playerXP = playerXpForGoals(battle.goals)
  const rivalXP = rivalXpForGoals(battle.goals, endedAt)
  return {
    ...battle,
    playerXP,
    rivalXP,
    result: resolveResult(playerXP, rivalXP),
    endedAt,
  }
}

/**
 * If `now` is a later calendar day, archive the open battle and start today.
 * History is append-only. Calling this again on the same day returns the same progress.
 */
export function rollDay(progress: GameProgress, now: number, newBattleId: string): GameProgress {
  assertTimestamp(now)
  const today = calendarDate(now)
  if (progress.currentBattle.date >= today) return progress

  const history =
    progress.currentBattle.result === 'active'
      ? [...progress.history, finalizeBattle(progress.currentBattle)]
      : progress.history
  const record = tallyRecord(history, today)

  return {
    user: {
      ...progress.user,
      ...record,
      level: calculateLevel(progress.user.totalXP),
    },
    history,
    currentBattle: createBattle(newBattleId, today, now),
  }
}
