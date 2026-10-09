import { formatXp } from './formatXp.ts'
import { useGame } from '../../state/useGame.ts'
import { Button } from './Button.tsx'

const titles = {
  victory: 'You won',
  defeat: 'Defeat',
  draw: 'Draw',
  active: 'Still going',
} as const

export function DayResult() {
  const { dayResult, dismissDay } = useGame()
  if (!dayResult || dayResult.result === 'active') return null
  return (
    <div className="absolute inset-0 z-20 flex items-end bg-black/70 px-4 pb-6">
      <div role="dialog" aria-modal="true" aria-labelledby="day-result-title" className="w-full border border-line bg-panel p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">Day over</p>
        <h2 id="day-result-title" className="mt-2 text-3xl font-semibold">
          {titles[dayResult.result]}
        </h2>
        <p className="mt-3 text-lg">
          {formatXp(dayResult.playerXP)} XP vs {formatXp(dayResult.rivalXP)} XP
        </p>
        <Button className="mt-5 w-full" onClick={dismissDay}>
          Continue
        </Button>
      </div>
    </div>
  )
}
