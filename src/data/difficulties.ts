import type { GoalDifficulty } from '../types/game.ts'

export interface DifficultyPreset {
  id: GoalDifficulty
  label: string
  /** Inclusive player XP band from specification section 6. */
  playerXpMin: number
  playerXpMax: number
  /** One reward for this difficulty. Copied onto the goal at creation. */
  xpReward: number
  rivalRatePerMinute: number
  /** Equal to the player reward, so an abandoned goal steals that opportunity and then stops. */
  rivalMaxXP: number
  /** Qualitative label from the specification. The numbers above are the economy. */
  rivalRate: 'low' | 'medium' | 'high' | 'very-high'
  examples: string
}

/**
 * Fixed rewards. The specification gives bands, not single prices.
 * Hard is the calculus example: +300 XP, 4 XP/min, cap 300.
 * Rates double each step (1, 2, 4, 8). Caps sit inside the bands, so a
 * harder goal still reaches its cap sooner: 100, 80, 75, then 60 minutes.
 */
export const DIFFICULTIES: readonly DifficultyPreset[] = [
  {
    id: 'easy',
    label: 'Easy',
    playerXpMin: 50,
    playerXpMax: 100,
    xpReward: 100,
    rivalRatePerMinute: 1,
    rivalMaxXP: 100,
    rivalRate: 'low',
    examples: 'Drink water, make the bed, read 10 min',
  },
  {
    id: 'medium',
    label: 'Medium',
    playerXpMin: 100,
    playerXpMax: 200,
    xpReward: 160,
    rivalRatePerMinute: 2,
    rivalMaxXP: 160,
    rivalRate: 'medium',
    examples: 'Read 30 min, guitar 30 min, walk 30 min',
  },
  {
    id: 'hard',
    label: 'Hard',
    playerXpMin: 200,
    playerXpMax: 350,
    xpReward: 300,
    rivalRatePerMinute: 4,
    rivalMaxXP: 300,
    rivalRate: 'high',
    examples: 'Gym 60 min, study 50 min, difficult work',
  },
  {
    id: 'boss',
    label: 'Boss',
    playerXpMin: 350,
    playerXpMax: 500,
    xpReward: 480,
    rivalRatePerMinute: 8,
    rivalMaxXP: 480,
    rivalRate: 'very-high',
    examples: '2-hour deep work, major milestone',
  },
]
