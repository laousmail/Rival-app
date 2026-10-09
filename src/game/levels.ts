/**
 * Lifetime level, from one table.
 *
 * The specification gives five thresholds: 0, 500, 1,200, 2,000, 3,000.
 * It does not define level 6 onward. Past level 5, each level costs another
 * 1,000 XP, the same gap as level 4 to level 5, so lifetime XP cannot stall.
 */

const PUBLISHED_THRESHOLDS = [0, 500, 1200, 2000, 3000] as const
const LEVEL_GAP_AFTER_FIVE = 1000

/** XP required to arrive at `level`. Level 1 starts at 0. */
export function xpToReachLevel(level: number): number {
  if (level <= 1) return 0
  if (level <= PUBLISHED_THRESHOLDS.length) return PUBLISHED_THRESHOLDS[level - 1]
  return PUBLISHED_THRESHOLDS[4] + (level - 5) * LEVEL_GAP_AFTER_FIVE
}

export function calculateLevel(totalXP: number): number {
  const xp = Number.isFinite(totalXP) ? Math.max(0, Math.floor(totalXP)) : 0
  if (xp < 500) return 1
  if (xp < 1200) return 2
  if (xp < 2000) return 3
  if (xp < 3000) return 4
  if (xp < 4000) return 5
  return 5 + Math.floor((xp - 3000) / 1000)
}

export function levelProgress(totalXP: number): { level: number; levelStartXP: number; nextLevelXP: number } {
  const level = calculateLevel(totalXP)
  return {
    level,
    levelStartXP: xpToReachLevel(level),
    nextLevelXP: xpToReachLevel(level + 1),
  }
}
