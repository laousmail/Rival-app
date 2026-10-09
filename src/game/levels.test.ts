import { describe, expect, it } from 'vitest'
import { calculateLevel, levelProgress, xpToReachLevel } from './levels.ts'

describe('calculateLevel', () => {
  it('uses the published thresholds', () => {
    expect(calculateLevel(0)).toBe(1)
    expect(calculateLevel(499)).toBe(1)
    expect(calculateLevel(500)).toBe(2)
    expect(calculateLevel(1199)).toBe(2)
    expect(calculateLevel(1200)).toBe(3)
    expect(calculateLevel(1999)).toBe(3)
    expect(calculateLevel(2000)).toBe(4)
    expect(calculateLevel(2999)).toBe(4)
    expect(calculateLevel(3000)).toBe(5)
    expect(calculateLevel(3999)).toBe(5)
  })

  it('keeps climbing by 1000 XP after level 5', () => {
    expect(calculateLevel(4000)).toBe(6)
    expect(calculateLevel(5000)).toBe(7)
    for (let level = 2; level <= 10; level += 1) {
      const start = xpToReachLevel(level)
      expect(calculateLevel(start)).toBe(level)
      expect(calculateLevel(start - 1)).toBe(level - 1)
    }
  })

  it('treats junk totals as level 1', () => {
    expect(calculateLevel(-20)).toBe(1)
    expect(calculateLevel(Number.NaN)).toBe(1)
    expect(levelProgress(700)).toEqual({ level: 2, levelStartXP: 500, nextLevelXP: 1200 })
  })
})
