import { afterEach, describe, expect, it } from 'vitest'
import { createBattle } from '../game/battle.ts'
import { DEFAULT_APPEARANCE, DEFAULT_CHARACTER } from '../data/appearance.ts'
import { loadGame, resetGame, saveGame } from './storage.ts'

const memory = new Map<string, string>()

afterEach(() => {
  memory.clear()
  resetGame()
})

function installMemory() {
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      getItem: (key: string) => memory.get(key) ?? null,
      setItem: (key: string, value: string) => memory.set(key, value),
      removeItem: (key: string) => memory.delete(key),
    },
  })
}

describe('saveGame', () => {
  it('round-trips a save and reset clears it', () => {
    installMemory()
    const now = new Date(2026, 9, 8, 9).getTime()
    saveGame({
      muted: true,
      seenBattleIds: ['old'],
      rival: { id: 'r', name: 'Shade', personality: 'coach', appearance: { ...DEFAULT_APPEARANCE } },
      progress: {
        history: [],
        currentBattle: createBattle('b', '2026-10-08', now),
        user: {
          id: 'u',
          name: 'Smail',
          level: 1,
          totalXP: 0,
          currentStreak: 0,
          bestStreak: 0,
          wins: 0,
          losses: 0,
          draws: 0,
          character: { ...DEFAULT_CHARACTER },
        },
      },
    })
    expect(loadGame()?.rival.name).toBe('Shade')
    expect(loadGame()?.muted).toBe(true)
    resetGame()
    expect(loadGame()).toBeNull()
  })

  it('rejects a broken save', () => {
    installMemory()
    memory.set('rival.save.v1', '{')
    expect(loadGame()).toBeNull()
  })
})
