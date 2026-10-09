import type { BattleState } from '../../types/game.ts'
import { formatXp } from '../common/formatXp.ts'

const copy: Record<BattleState, string> = {
  dominating: 'Dominating. Keep the lead.',
  ahead: 'Ahead. Do not let it slip.',
  close: 'Close. One goal can swing this.',
  behind: 'Behind. Finish a goal to take it back.',
  critical: 'Critical. Your rival is taking the XP.',
}

const tone: Record<BattleState, string> = {
  dominating: 'border-gold text-gold',
  ahead: 'border-gold text-cream',
  close: 'border-line text-cream',
  behind: 'border-rival text-cream',
  critical: 'border-rival text-rival',
}

type BattleStatusProps = {
  state: BattleState
  empty: boolean
  playerXp: number
  rivalXp: number
}

export function BattleStatus({ state, empty, playerXp, rivalXp }: BattleStatusProps) {
  const justStarted = !empty && playerXp + rivalXp < 1
  const className = empty || justStarted ? 'border-line text-cream' : tone[state]
  const message = empty
    ? 'No goals yet. Your rival has nothing to steal.'
    : justStarted
      ? `Started. ${formatXp(playerXp)} vs ${formatXp(rivalXp)}. Finish before your rival does.`
      : `${copy[state]} ${formatXp(playerXp)} vs ${formatXp(rivalXp)}.`

  return (
    <p role="status" className={`border px-3 py-3 text-center text-sm ${className}`}>
      {message}
    </p>
  )
}
