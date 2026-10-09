type PixelFigureProps = {
  skin: string
  hair: string
  outfit: string
  accent: string
  hairStyle: string
  accessory?: string
}

/** Original block figure. Not a copy of any game's sprites. */
export function PixelFigure({ skin, hair, outfit, accent, hairStyle, accessory }: PixelFigureProps) {
  const hairWidth = hairStyle === 'bun' ? 10 : hairStyle === 'long' ? 24 : 22
  const hairHeight = hairStyle === 'long' || hairStyle === 'hood' ? 10 : 6

  return (
    <div aria-hidden="true" className="grid w-10 shrink-0 justify-items-center">
      {hairStyle !== 'none' ? <div style={{ background: hair, width: hairWidth, height: hairHeight }} /> : <div className="h-1.5" />}
      <div className="relative h-4 w-5" style={{ background: skin }}>
        {accessory === 'glasses' ? (
          <span className="absolute inset-x-0.5 top-1 h-1 border-y border-current" style={{ color: accent }} />
        ) : null}
      </div>
      <div className="h-5 w-6" style={{ background: outfit }} />
      {accessory === 'scarf' || accessory === 'band' ? <div className="h-1 w-6" style={{ background: accent }} /> : null}
    </div>
  )
}
