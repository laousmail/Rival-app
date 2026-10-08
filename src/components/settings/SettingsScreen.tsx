import { ScreenHeader } from '../common/ScreenHeader.tsx'

export function SettingsScreen() {
  return (
    <section>
      <ScreenHeader
        titleId="settings-title"
        eyebrow="Settings"
        title="Settings"
        note="Layout only. Preferences are not saved yet. An optional mute control can live here later, and sound will never autoplay."
      />
      <p className="border border-dashed border-line px-3 py-8 text-center text-sm text-muted">
        Nothing is stored on this device.
      </p>
    </section>
  )
}
