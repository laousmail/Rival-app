import type { GoalDifficulty } from '../../types/game.ts'

type GoalCardProps = {
  title: string
  difficulty: GoalDifficulty
  xpReward: number
  rivalPercent: number
  completed: boolean
}

/**
 * Presentational goal row (specification section 17).
 * Phase 3 supplies a real goal and a complete action.
 * This phase does not render cards, so nothing can be completed by mistake.
 */
export function GoalCard({ title, difficulty, xpReward, rivalPercent, completed }: GoalCardProps) {
  return (
    <article className="border border-line bg-panel p-3">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold">{title}</h3>
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted">{difficulty}</span>
      </div>
      <p className="mt-2 text-xs text-gold">+{xpReward} XP</p>
      <p className="mt-1 text-xs text-rival">Rival {rivalPercent}%</p>
      <p className="mt-2 text-xs text-muted">{completed ? 'Completed' : 'Open'}</p>
    </article>
  )
}
