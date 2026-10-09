import { ProgressBar } from '../common/ProgressBar.tsx'

type XPBarProps = {
  label: string
  tone: 'player' | 'rival'
}

/** Empty battle meter. Phase 3 feeds it live XP. Phase 1 always shows an empty bar. */
export function XPBar({ label, tone }: XPBarProps) {
  return <ProgressBar label={label} value={0} max={1} tone={tone} />
}
