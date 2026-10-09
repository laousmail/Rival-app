type ProgressBarProps = {
  label: string
  value: number
  max: number
  tone?: 'player' | 'rival'
}

/** Presentational meter. Callers pass numbers; this component does not derive XP. */
export function ProgressBar({ label, value, max, tone = 'player' }: ProgressBarProps) {
  const safeMax = max > 0 ? max : 1
  const clamped = Math.min(Math.max(value, 0), safeMax)
  const ratio = (clamped / safeMax) * 100
  const percentLabel = ratio > 0 && ratio < 1 ? '<1%' : `${Math.round(ratio)}%`
  const fill = tone === 'rival' ? 'bg-rival' : 'bg-gold'

  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-2 text-[11px] uppercase tracking-wide">
        <span className="text-muted">{label}</span>
        <span className="text-cream">{percentLabel}</span>
      </div>
      <div
        role="meter"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={clamped}
        aria-valuetext={percentLabel}
        className="h-2 border border-line bg-ink"
      >
        <div className={`h-full ${fill}`} style={{ width: `${Math.min(100, ratio)}%` }} />
      </div>
    </div>
  )
}
