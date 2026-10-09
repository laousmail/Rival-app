import type { Character, RivalAppearance } from '../types/game.ts'

export interface LookOption {
  id: string
  label: string
  color: string
}

export const SKINS: readonly LookOption[] = [
  { id: 'sand', label: 'Sand', color: '#e6c3a1' },
  { id: 'clay', label: 'Clay', color: '#c48a6a' },
  { id: 'olive', label: 'Olive', color: '#8a8f62' },
  { id: 'deep', label: 'Deep', color: '#5c4033' },
]

export const HAIR_STYLES: readonly LookOption[] = [
  { id: 'short', label: 'Short', color: '#1c2230' },
  { id: 'long', label: 'Long', color: '#1c2230' },
  { id: 'bun', label: 'Bun', color: '#1c2230' },
  { id: 'none', label: 'None', color: 'transparent' },
]

export const HAIR_COLORS: readonly LookOption[] = [
  { id: 'ink', label: 'Ink', color: '#1c2230' },
  { id: 'gold', label: 'Gold', color: '#f2b544' },
  { id: 'rust', label: 'Rust', color: '#c4553a' },
  { id: 'white', label: 'White', color: '#f3ecdf' },
]

export const OUTFITS: readonly LookOption[] = [
  { id: 'tunic', label: 'Tunic', color: '#3d6b8a' },
  { id: 'jacket', label: 'Jacket', color: '#2f3d55' },
  { id: 'hoodie', label: 'Hoodie', color: '#4a5568' },
  { id: 'wrap', label: 'Wrap', color: '#6b4a2f' },
]

export const ACCESSORIES: readonly LookOption[] = [
  { id: 'none', label: 'None', color: 'transparent' },
  { id: 'glasses', label: 'Glasses', color: '#d7deea' },
  { id: 'scarf', label: 'Scarf', color: '#ff5a6a' },
  { id: 'band', label: 'Band', color: '#f2b544' },
]

export const PALETTES: readonly LookOption[] = [
  { id: 'gold', label: 'Gold', color: '#f2b544' },
  { id: 'mint', label: 'Mint', color: '#5ee0a0' },
  { id: 'rose', label: 'Rose', color: '#ff5a6a' },
  { id: 'ink', label: 'Ink', color: '#9aa6c0' },
]

export const RIVAL_BODIES: readonly LookOption[] = [
  { id: 'lean', label: 'Lean', color: '#c48a6a' },
  { id: 'broad', label: 'Broad', color: '#8a5a48' },
  { id: 'tall', label: 'Tall', color: '#e6c3a1' },
]

export const RIVAL_HAIR: readonly LookOption[] = [
  { id: 'short', label: 'Short', color: '#1c2230' },
  { id: 'long', label: 'Long', color: '#1c2230' },
  { id: 'hood', label: 'Hood', color: '#2a3144' },
  { id: 'none', label: 'None', color: 'transparent' },
]

export const RIVAL_OUTFITS: readonly LookOption[] = [
  { id: 'coat', label: 'Coat', color: '#3a2a38' },
  { id: 'tunic', label: 'Tunic', color: '#5a3040' },
  { id: 'hoodie', label: 'Hoodie', color: '#2c3344' },
]

export const RIVAL_COLORS: readonly LookOption[] = [
  { id: 'rose', label: 'Rose', color: '#ff5a6a' },
  { id: 'gold', label: 'Gold', color: '#f2b544' },
  { id: 'mint', label: 'Mint', color: '#5ee0a0' },
  { id: 'ink', label: 'Ink', color: '#9aa6c0' },
]

export const DEFAULT_CHARACTER: Character = {
  skin: 'sand',
  hair: 'short',
  hairColor: 'ink',
  outfit: 'tunic',
  accessory: 'none',
  palette: 'gold',
}

export const DEFAULT_APPEARANCE: RivalAppearance = {
  body: 'lean',
  hair: 'short',
  outfit: 'coat',
  color: 'rose',
}

export function optionColor(options: readonly LookOption[], id: string, fallback: string): string {
  return options.find((option) => option.id === id)?.color ?? fallback
}
