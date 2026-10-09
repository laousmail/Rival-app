import { rivalXpForGoal } from '../../game/xp.ts'
import { useGame } from '../../state/useGame.ts'
import { GoalCard } from './GoalCard.tsx'

export function GoalList() {
  const { battle, now, completeGoal } = useGame()

  return (
    <section aria-labelledby="goal-list-title">
      <h2 id="goal-list-title" className="text-sm font-semibold">
        Today
      </h2>
      {battle.goals.length === 0 ? (
        <p className="mt-2 border border-dashed border-line px-3 py-8 text-center text-sm text-muted">No goals yet.</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {battle.goals.map((goal) => (
            <li key={goal.id}>
              <GoalCard goal={goal} rivalXp={rivalXpForGoal(goal, now)} onComplete={() => completeGoal(goal.id)} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
