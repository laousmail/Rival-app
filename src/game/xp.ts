/**
 * Player XP and rival XP (Phase 2).
 *
 * Rival XP is derived from timestamps, never from a timer:
 * elapsedMinutes = (currentTime - goal.createdAt) / 60000
 * rivalXP = min(elapsedMinutes * rivalRatePerMinute, rivalMaxXP)
 * Completion freezes rival XP and stops the rate.
 * Player XP is awarded once.
 */
export {}
