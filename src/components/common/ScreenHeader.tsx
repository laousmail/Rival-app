type ScreenHeaderProps = {
  titleId: string
  eyebrow: string
  title: string
  note: string
}

export function ScreenHeader({ titleId, eyebrow, title, note }: ScreenHeaderProps) {
  return (
    <header className="mb-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">{eyebrow}</p>
      <h1 id={titleId} className="mt-1 text-2xl font-semibold tracking-tight">
        {title}
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-muted">{note}</p>
    </header>
  )
}
