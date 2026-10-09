import type { ReactNode } from 'react'
import { formatXp } from '../common/formatXp.ts'
import { XPBar } from './XPBar.tsx'

type PlayerProps = {
  name: string
  level: number
  xp: number
  max: number
  figure: ReactNode
}

export function Player({ name, level, xp, max, figure }: PlayerProps) {
  return (
    <article aria-label="Player" className="min-w-0 border border-line bg-panel p-3">
      <div className="flex items-start justify-between gap-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">You</p>
        {figure}
      </div>
      <p className="mt-2 truncate text-base font-semibold">{name}</p>
      <p className="mt-1 text-xs text-muted">Level {level}</p>
      <div className="mt-3">
        <XPBar label={`Today ${formatXp(xp)}`} value={xp} max={max} tone="player" />
      </div>
    </article>
  )
}
