export interface AchievementDefinition {
  id: string
  name: string
  detail: string
}

/** Names and unlock conditions from specification section 32. Tracking is Phase 6. */
export const ACHIEVEMENTS: readonly AchievementDefinition[] = [
  { id: 'first-blood', name: 'First Blood', detail: 'First win' },
  { id: 'comeback', name: 'Comeback', detail: 'Win while behind' },
  { id: 'three-peat', name: 'Three Peat', detail: '3-day win streak' },
  { id: 'warrior', name: 'Warrior', detail: '7-day win streak' },
  { id: 'boss-slayer', name: 'Boss Slayer', detail: 'Complete a Boss goal' },
  { id: 'no-excuses', name: 'No Excuses', detail: 'Complete every goal in a day' },
]
