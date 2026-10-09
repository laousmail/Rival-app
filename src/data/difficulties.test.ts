import { describe, expect, it } from 'vitest'
import { DIFFICULTIES } from './difficulties.ts'

describe('difficulty economy', () => {
  it('keeps every reward inside its band and makes harder goals close faster', () => {
    const minutesToCap = DIFFICULTIES.map((preset) => {
      expect(preset.xpReward).toBeGreaterThanOrEqual(preset.playerXpMin)
      expect(preset.xpReward).toBeLessThanOrEqual(preset.playerXpMax)
      expect(preset.rivalMaxXP).toBe(preset.xpReward)
      expect(preset.rivalRatePerMinute).toBeGreaterThan(0)
      return preset.rivalMaxXP / preset.rivalRatePerMinute
    })
    expect(DIFFICULTIES.map((preset) => preset.id)).toEqual(['easy', 'medium', 'hard', 'boss'])
    expect(DIFFICULTIES[2]).toMatchObject({ xpReward: 300, rivalRatePerMinute: 4, rivalMaxXP: 300 })
    expect(minutesToCap).toEqual([100, 80, 75, 60])
  })
})
