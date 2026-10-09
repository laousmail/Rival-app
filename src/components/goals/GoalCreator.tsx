import { DIFFICULTIES } from '../../data/difficulties.ts'

/** Static preview of the required fields. The form itself is a later phase. */
export function GoalCreator() {
  return (
    <section aria-labelledby="goal-creator-title" className="mt-5 border border-dashed border-line p-3">
      <h2 id="goal-creator-title" className="text-sm font-semibold">
        New goal
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Not open yet. A goal asks for a name, a category, and a difficulty. The game assigns the XP.
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {DIFFICULTIES.map((difficulty) => (
          <li
            key={difficulty.id}
            className="border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-cream"
          >
            {difficulty.label}
          </li>
        ))}
      </ul>
    </section>
  )
}
