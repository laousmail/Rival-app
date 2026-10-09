import { RIVAL_PERSONALITIES } from '../../data/rivals.ts'

/** Section 20. Personalities are shown, not chosen, until Phase 5. */
export function RivalEditor() {
  return (
    <section aria-labelledby="rival-editor-title" className="mt-4 border border-dashed border-line p-3">
      <h2 id="rival-editor-title" className="text-sm font-semibold">
        Rival
      </h2>
      <p className="mt-2 text-sm text-muted">Name, body, hair, outfit, and color come later.</p>
      <ul className="mt-3 space-y-2">
        {RIVAL_PERSONALITIES.map((personality) => (
          <li key={personality.id} className="border border-line px-2 py-2">
            <p className="text-sm font-medium">{personality.label}</p>
            <p className="mt-0.5 text-xs text-muted">{personality.line}</p>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-muted">Not selectable yet.</p>
    </section>
  )
}
