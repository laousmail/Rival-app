import { useState } from 'react'
import { useGame } from '../../state/useGame.ts'
import { Button } from '../common/Button.tsx'
import { ScreenHeader } from '../common/ScreenHeader.tsx'

export function SettingsScreen() {
  const { muted, setMuted, reset } = useGame()
  const [confirm, setConfirm] = useState(false)

  return (
    <section>
      <ScreenHeader
        titleId="settings-title"
        eyebrow="Settings"
        title="Settings"
        note="This save stays on this device. Sound only plays after you tap, and only if it is on."
      />
      <button
        type="button"
        aria-pressed={muted}
        onClick={() => setMuted(!muted)}
        className="flex min-h-11 w-full items-center justify-between border border-line bg-panel px-3 text-sm"
      >
        <span>Mute</span>
        <span className={muted ? 'text-muted' : 'text-gold'}>{muted ? 'On' : 'Off'}</span>
      </button>
      <div className="mt-4 border border-line p-3">
        <p className="text-sm">Reset erases the save on this device and starts onboarding again.</p>
        {confirm ? (
          <div className="mt-3 flex gap-2">
            <Button tone="quiet" className="flex-1" onClick={() => setConfirm(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={reset}>
              Erase save
            </Button>
          </div>
        ) : (
          <Button tone="quiet" className="mt-3 w-full" onClick={() => setConfirm(true)}>
            Reset
          </Button>
        )}
      </div>
    </section>
  )
}
