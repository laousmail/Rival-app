import type { Goal } from '../../types/game.ts'
import { Button } from '../common/Button.tsx'
import { formatXp } from '../common/formatXp.ts'
import { ProgressBar } from '../common/ProgressBar.tsx'

type GoalCardProps = {
  goal: Goal
  rivalXp: number
  onComplete: () => void
}

export function GoalCard({ goal, rivalXp, onComplete }: GoalCardProps) {
  return (
    <article className="border border-line bg-panel p-3">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold break-words">{goal.title}</h3>
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted">{goal.difficulty}</span>
      </div>
      <p className="mt-2 text-xs text-gold">You +{goal.xpReward} XP</p>
      <p className={`mt-1 text-xs ${goal.completed ? 'text-muted' : 'text-rival'}`}>
        {goal.completed ? 'Rival stopped' : 'Rival'} {formatXp(rivalXp)} / {goal.rivalMaxXP} XP
      </p>
      <div className="mt-2">
        <ProgressBar label="Rival" value={rivalXp} max={goal.rivalMaxXP} tone="rival" />
      </div>
      <div className="mt-3">
        {goal.completed ? (
          <p className="text-xs font-semibold uppercase tracking-wide text-mint">Completed</p>
        ) : (
          <Button className="w-full" onClick={onComplete}>
            Complete
          </Button>
        )}
      </div>
    </article>
  )
}
