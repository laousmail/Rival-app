import type { RivalPersonality } from '../types/game.ts'

export interface RivalPersonalityPreset {
  id: RivalPersonality
  label: string
  /** Sample line from specification section 20. Silent has no taunt. */
  line: string
}

/** Personalities are voice, not abuse. Dialogue playback is a later phase. */
export const RIVAL_PERSONALITIES: readonly RivalPersonalityPreset[] = [
  {
    id: 'challenger',
    label: 'Challenger',
    line: "You're already behind.",
  },
  {
    id: 'silent',
    label: 'Silent',
    line: 'Minimal dialogue.',
  },
  {
    id: 'coach',
    label: 'Coach',
    line: 'You can still take this.',
  },
  {
    id: 'menace',
    label: 'Menace',
    line: 'Still procrastinating?',
  },
]
