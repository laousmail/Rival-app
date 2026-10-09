import { createContext } from 'react'
import type { AchievementSnapshot } from '../game/achievements.ts'
import type { BattleState, Character, DailyBattle, GoalDifficulty, Rival, RivalAppearance, RivalPersonality, User } from '../types/game.ts'

export interface CompletionNotice {
  title: string
  xp: number
}

export interface NewGoalInput {
  title: string
  category: string
  difficulty: GoalDifficulty
}

export interface GameView {
  started: boolean
  now: number
  user: User
  rival: Rival
  battle: DailyBattle
  state: BattleState
  notice: CompletionNotice | null
  dayResult: DailyBattle | null
  muted: boolean
  achievements: AchievementSnapshot
  addGoal: (input: NewGoalInput) => string | null
  completeGoal: (goalId: string) => void
  endDay: () => void
  dismissDay: () => void
  setMuted: (muted: boolean) => void
  updateUser: (patch: { name?: string; character?: Partial<Character> }) => void
  updateRival: (patch: { name?: string; personality?: RivalPersonality; appearance?: Partial<RivalAppearance> }) => void
  reset: () => void
  begin: (input: { name: string; rivalName: string; personality: RivalPersonality; goals: NewGoalInput[] }) => void
}

export const GameContext = createContext<GameView | null>(null)
