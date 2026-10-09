import type { GoalDifficulty } from '../types/game.ts'

export interface DifficultyPreset {
  id: GoalDifficulty
  label: string
  /** Inclusive player XP band from specification section 6. */
  playerXpMin: number
  playerXpMax: number
  /** Qualitative only. Numeric rates are chosen in Phase 2, inside this band. */
  rivalRate: 'low' | 'medium' | 'high' | 'very-high'
  examples: string
}

/**
 * Fixed difficulty presets. Users never type an XP value.
 * Exact rewards and rival rates per minute are not in the specification;
 * Phase 2 picks them inside these bands.
 */
export const DIFFICULTIES: readonly DifficultyPreset[] = [
  {
    id: 'easy',
    label: 'Easy',
    playerXpMin: 50,
    playerXpMax: 100,
    rivalRate: 'low',
    examples: 'Drink water, make the bed, read 10 min',
  },
  {
    id: 'medium',
    label: 'Medium',
    playerXpMin: 100,
    playerXpMax: 200,
    rivalRate: 'medium',
    examples: 'Read 30 min, guitar 30 min, walk 30 min',
  },
  {
    id: 'hard',
    label: 'Hard',
    playerXpMin: 200,
    playerXpMax: 350,
    rivalRate: 'high',
    examples: 'Gym 60 min, study 50 min, difficult work',
  },
  {
    id: 'boss',
    label: 'Boss',
    playerXpMin: 350,
    playerXpMax: 500,
    rivalRate: 'very-high',
    examples: '2-hour deep work, major milestone',
  },
]
