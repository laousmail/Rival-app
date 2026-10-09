import { ACCESSORIES, HAIR_COLORS, HAIR_STYLES, OUTFITS, PALETTES, SKINS } from '../../data/appearance.ts'
import { useGame } from '../../state/useGame.ts'
import { Choices } from '../common/Choices.tsx'

export function CharacterEditor() {
  const { user, updateUser } = useGame()
  const look = user.character
  return (
    <section aria-labelledby="character-editor-title" className="mt-4 border border-line bg-panel p-3">
      <h2 id="character-editor-title" className="text-sm font-semibold">
        Your look
      </h2>
      <label className="mt-3 block text-xs uppercase tracking-wide text-muted" htmlFor="player-name">
        Name
        <input
          id="player-name"
          value={user.name}
          onChange={(event) => updateUser({ name: event.target.value })}
          className="mt-1 w-full border border-line bg-ink px-3 py-2 text-sm text-cream outline-none focus:border-gold"
        />
      </label>
      <Choices legend="Skin tone" name="skin" options={SKINS} value={look.skin} onChange={(skin) => updateUser({ character: { skin } })} />
      <Choices legend="Hair" name="hair" options={HAIR_STYLES} value={look.hair} onChange={(hair) => updateUser({ character: { hair } })} />
      <Choices legend="Hair color" name="hair-color" options={HAIR_COLORS} value={look.hairColor} onChange={(hairColor) => updateUser({ character: { hairColor } })} />
      <Choices legend="Outfit" name="outfit" options={OUTFITS} value={look.outfit} onChange={(outfit) => updateUser({ character: { outfit } })} />
      <Choices legend="Accessory" name="accessory" options={ACCESSORIES} value={look.accessory} onChange={(accessory) => updateUser({ character: { accessory } })} />
      <Choices legend="Palette" name="palette" options={PALETTES} value={look.palette} onChange={(palette) => updateUser({ character: { palette } })} />
    </section>
  )
}
