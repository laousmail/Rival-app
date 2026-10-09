import { HAIR_COLORS, optionColor, OUTFITS, PALETTES, RIVAL_BODIES, RIVAL_COLORS, RIVAL_OUTFITS, SKINS } from '../../data/appearance.ts'
import { RIVAL_PERSONALITIES } from '../../data/rivals.ts'
import { useGame } from '../../state/useGame.ts'
import { PixelFigure } from '../common/PixelFigure.tsx'
import { ScreenHeader } from '../common/ScreenHeader.tsx'
import { CharacterEditor } from './CharacterEditor.tsx'
import { RivalEditor } from './RivalEditor.tsx'

export function CharacterScreen() {
  const { user, rival } = useGame()
  const personality = RIVAL_PERSONALITIES.find((option) => option.id === rival.personality)
  return (
    <section>
      <ScreenHeader
        titleId="character-title"
        eyebrow="Character"
        title="Character"
        note="This is your look, and the rival who takes the XP you leave behind."
      />
      <div className="space-y-3">
        <article className="flex items-center gap-3 border border-line bg-panel p-3">
          <PixelFigure
            skin={optionColor(SKINS, user.character.skin, '#e6c3a1')}
            hair={optionColor(HAIR_COLORS, user.character.hairColor, '#1c2230')}
            outfit={optionColor(OUTFITS, user.character.outfit, '#3d6b8a')}
            accent={optionColor(PALETTES, user.character.palette, '#f2b544')}
            hairStyle={user.character.hair}
            accessory={user.character.accessory}
          />
          <div>
            <h2 className="text-base font-semibold">{user.name}</h2>
            <p className="mt-1 text-sm text-muted">Level {user.level}</p>
          </div>
        </article>
        <article className="flex items-center gap-3 border border-line bg-panel p-3">
          <PixelFigure
            skin={optionColor(RIVAL_BODIES, rival.appearance.body, '#c48a6a')}
            hair={optionColor(RIVAL_COLORS, rival.appearance.color, '#1c2230')}
            outfit={optionColor(RIVAL_OUTFITS, rival.appearance.outfit, '#3a2a38')}
            accent={optionColor(RIVAL_COLORS, rival.appearance.color, '#ff5a6a')}
            hairStyle={rival.appearance.hair === 'hood' ? 'hood' : rival.appearance.hair}
          />
          <div>
            <h2 className="text-base font-semibold">{rival.name}</h2>
            <p className="mt-1 text-sm text-muted">{personality?.label}</p>
          </div>
        </article>
      </div>
      <CharacterEditor />
      <RivalEditor />
    </section>
  )
}
