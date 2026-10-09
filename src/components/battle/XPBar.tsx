import { ProgressBar } from '../common/ProgressBar.tsx'

type XPBarProps = {
  label: string
  value: number
  max: number
  tone: 'player' | 'rival'
}

export function XPBar({ label, value, max, tone }: XPBarProps) {
  return <ProgressBar label={label} value={value} max={max} tone={tone} />
}
