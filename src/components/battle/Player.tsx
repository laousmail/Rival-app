import { XPBar } from './XPBar.tsx'

export function Player() {
  return (
    <article aria-label="Player" className="min-w-0 border border-line bg-panel p-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">You</p>
      <p className="mt-2 truncate text-base font-semibold">Player</p>
      <p className="mt-1 text-xs text-muted">Level —</p>
      <div className="mt-3">
        <XPBar label="Player XP" tone="player" />
      </div>
    </article>
  )
}
