import { ScreenHeader } from '../common/ScreenHeader.tsx'
import { Character } from './Character.tsx'
import { CharacterEditor } from './CharacterEditor.tsx'
import { RivalEditor } from './RivalEditor.tsx'

export function CharacterScreen() {
  return (
    <section>
      <ScreenHeader
        titleId="character-title"
        eyebrow="Character"
        title="Character"
        note="Layout only. You and your rival get a look and a personality in a later phase."
      />
      <div className="space-y-3">
        <Character label="You" name="Player" detail="No look chosen yet." tone="player" />
        <Character label="Rival" name="Unnamed rival" detail="No personality chosen yet." tone="rival" />
      </div>
      <CharacterEditor />
      <RivalEditor />
    </section>
  )
}
