import type { LookOption } from '../../data/appearance.ts'

type ChoicesProps = {
  legend: string
  name: string
  options: readonly LookOption[]
  value: string
  onChange: (id: string) => void
}

export function Choices({ legend, name, options, value, onChange }: ChoicesProps) {
  return (
    <fieldset className="mt-3">
      <legend className="text-xs uppercase tracking-wide text-muted">{legend}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = option.id === value
          return (
            <label
              key={option.id}
              className={`cursor-pointer border px-2 py-1.5 text-xs ${selected ? 'border-gold text-gold' : 'border-line text-cream'}`}
            >
              <input
                className="sr-only"
                type="radio"
                name={name}
                value={option.id}
                checked={selected}
                onChange={() => onChange(option.id)}
              />
              {option.label}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
