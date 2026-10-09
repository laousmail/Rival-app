/**
 * Core data shapes from specification section 5.
 * Calculations live in `src/game`. Components must not redo them.
 *
 * Timestamps are epoch milliseconds so elapsed time can be derived
 * with the section 7 formula. `DailyBattle.date` is the calendar day
 * (YYYY-MM-DD), separate from `startedAt`.
 */

export type RivalPersonality = 'challenger' | 'silent' | 'coach' | 'menace'

export type GoalDifficulty = 'easy' | 'medium' | 'hard' | 'boss'

export type BattleResult = 'active' | 'victory' | 'defeat' | 'draw'

/** Section 15. The engine decides this in Phase 2; the shell does not. */
export type BattleState = 'dominating' | 'ahead' | 'close' | 'behind' | 'critical'

/** Player look from specification section 19. These are colors and shapes, not stats. */
export interface Character {
  skin: string
  hair: string
  hairColor: string
  outfit: string
  accessory: string
  palette: string
}

/** Rival look from specification section 20. */
export interface RivalAppearance {
  body: string
  hair: string
  outfit: string
  color: string
}

export interface User {
  id: string
  name: string
  level: number
  totalXP: number
  currentStreak: number
  bestStreak: number
  wins: number
  losses: number
  draws: number
  character: Character
}

export interface Rival {
  id: string
  name: string
  personality: RivalPersonality
  appearance: RivalAppearance
}

export interface Goal {
  id: string
  title: string
  category: string
  difficulty: GoalDifficulty
  xpReward: number
  rivalRatePerMinute: number
  rivalMaxXP: number
  createdAt: number
  completedAt?: number
  completed: boolean
}

export interface DailyBattle {
  id: string
  date: string
  goals: Goal[]
  playerXP: number
  rivalXP: number
  result: BattleResult
  startedAt: number
  endedAt?: number
  /** True once rival XP was ahead of the player during this day. */
  trailed?: boolean
}
