const LOOKS = ['Skin tone', 'Hair', 'Hair color', 'Outfit', 'Accessories', 'Palette'] as const

/** Section 19 categories, listed so the editor has a home. Nothing is selectable yet. */
export function CharacterEditor() {
  return (
    <section aria-labelledby="character-editor-title" className="mt-4 border border-dashed border-line p-3">
      <h2 id="character-editor-title" className="text-sm font-semibold">
        Your look
      </h2>
      <ul className="mt-3 grid grid-cols-2 gap-2">
        {LOOKS.map((look) => (
          <li key={look} className="border border-line px-2 py-2 text-xs text-muted">
            {look}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-muted">Not editable yet.</p>
    </section>
  )
}
