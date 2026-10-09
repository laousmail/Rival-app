type CharacterProps = {
  label: string
  name: string
  detail: string
  tone: 'player' | 'rival'
}

/** Geometric stand-in. Pixel-art characters arrive in Phase 7. */
export function Character({ label, name, detail, tone }: CharacterProps) {
  const mark = tone === 'player' ? 'bg-gold text-ink' : 'bg-rival text-ink'

  return (
    <article className="flex items-center gap-3 border border-line bg-panel p-3">
      <div aria-hidden="true" className={`grid size-14 shrink-0 place-items-center font-mono text-[10px] font-bold ${mark}`}>
        {label}
      </div>
      <div className="min-w-0">
        <h2 className="truncate text-base font-semibold">{name}</h2>
        <p className="mt-1 text-sm text-muted">{detail}</p>
      </div>
    </article>
  )
}
