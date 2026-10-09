import type { GameProgress } from '../game/battle.ts'
import type { Rival } from '../types/game.ts'

const KEY = 'rival.save.v1'

export interface SaveData {
  progress: GameProgress
  rival: Rival
  muted: boolean
  seenBattleIds: string[]
}

function bucket(): Storage | null {
  try {
    return globalThis.localStorage
  } catch {
    return null
  }
}

function isSave(value: unknown): value is SaveData {
  if (!value || typeof value !== 'object') return false
  const save = value as SaveData
  return Boolean(
    save.progress?.user?.name &&
      save.progress.currentBattle?.date &&
      save.rival?.name &&
      Array.isArray(save.progress.history) &&
      Array.isArray(save.seenBattleIds),
  )
}

export function saveGame(data: SaveData): void {
  bucket()?.setItem(KEY, JSON.stringify(data))
}

export function loadGame(): SaveData | null {
  const raw = bucket()?.getItem(KEY)
  if (!raw) return null
  try {
    const parsed: unknown = JSON.parse(raw)
    return isSave(parsed) ? parsed : null
  } catch {
    return null
  }
}

export function resetGame(): void {
  bucket()?.removeItem(KEY)
}
