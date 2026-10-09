import { createContext } from 'react'
import type { BattleState, DailyBattle, GoalDifficulty, Rival, User } from '../types/game.ts'

export interface CompletionNotice {
  title: string
  xp: number
}

export interface GameView {
  now: number
  user: User
  rival: Rival
  battle: DailyBattle
  state: BattleState
  notice: CompletionNotice | null
  addGoal: (input: { title: string; category: string; difficulty: GoalDifficulty }) => string | null
  completeGoal: (goalId: string) => void
}

export const GameContext = createContext<GameView | null>(null)
