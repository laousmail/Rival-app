import { XPBar } from './XPBar.tsx'

export function Rival() {
  return (
    <article aria-label="Rival" className="min-w-0 border border-line bg-panel p-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-rival">Rival</p>
      <p className="mt-2 truncate text-base font-semibold">Unnamed</p>
      <p className="mt-1 text-xs text-muted">Personality —</p>
      <div className="mt-3">
        <XPBar label="Rival XP" tone="rival" />
      </div>
    </article>
  )
}
