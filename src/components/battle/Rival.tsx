import { formatXp } from '../common/formatXp.ts'
import { XPBar } from './XPBar.tsx'

type RivalProps = {
  name: string
  xp: number
  max: number
  ticking: boolean
}

export function Rival({ name, xp, max, ticking }: RivalProps) {
  return (
    <article aria-label="Rival" className="min-w-0 border border-line bg-panel p-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-rival">Rival</p>
      <p className="mt-2 truncate text-base font-semibold">{name}</p>
      <p className={`mt-1 text-xs text-muted ${ticking ? 'xp-tick' : ''}`}>{formatXp(xp)} XP today</p>
      <div className="mt-3">
        <XPBar label="Rival XP" value={xp} max={max} tone="rival" />
      </div>
    </article>
  )
}
