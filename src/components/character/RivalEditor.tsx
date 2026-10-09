import { RIVAL_BODIES, RIVAL_COLORS, RIVAL_HAIR, RIVAL_OUTFITS } from '../../data/appearance.ts'
import { RIVAL_PERSONALITIES } from '../../data/rivals.ts'
import type { RivalPersonality } from '../../types/game.ts'
import { useGame } from '../../state/useGame.ts'
import { Choices } from '../common/Choices.tsx'

export function RivalEditor() {
  const { rival, updateRival } = useGame()
  return (
    <section aria-labelledby="rival-editor-title" className="mt-4 border border-line bg-panel p-3">
      <h2 id="rival-editor-title" className="text-sm font-semibold">
        Rival
      </h2>
      <label className="mt-3 block text-xs uppercase tracking-wide text-muted" htmlFor="rival-name">
        Name
        <input
          id="rival-name"
          value={rival.name}
          onChange={(event) => updateRival({ name: event.target.value })}
          className="mt-1 w-full border border-line bg-ink px-3 py-2 text-sm text-cream outline-none focus:border-gold"
        />
      </label>
      <Choices legend="Body" name="body" options={RIVAL_BODIES} value={rival.appearance.body} onChange={(body) => updateRival({ appearance: { body } })} />
      <Choices legend="Hair" name="rival-hair" options={RIVAL_HAIR} value={rival.appearance.hair} onChange={(hair) => updateRival({ appearance: { hair } })} />
      <Choices legend="Outfit" name="rival-outfit" options={RIVAL_OUTFITS} value={rival.appearance.outfit} onChange={(outfit) => updateRival({ appearance: { outfit } })} />
      <Choices legend="Color" name="rival-color" options={RIVAL_COLORS} value={rival.appearance.color} onChange={(color) => updateRival({ appearance: { color } })} />
      <fieldset className="mt-3 space-y-2">
        <legend className="text-xs uppercase tracking-wide text-muted">Personality</legend>
        {RIVAL_PERSONALITIES.map((option) => (
          <label
            key={option.id}
            className={`mt-2 block cursor-pointer border px-3 py-2 ${rival.personality === option.id ? 'border-gold' : 'border-line'}`}
          >
            <input
              className="sr-only"
              type="radio"
              name="rival-personality"
              value={option.id}
              checked={rival.personality === option.id}
              onChange={() => updateRival({ personality: option.id as RivalPersonality })}
            />
            <span className="text-sm font-semibold">{option.label}</span>
            <span className="mt-1 block text-xs text-muted">{option.line}</span>
          </label>
        ))}
      </fieldset>
    </section>
  )
}
