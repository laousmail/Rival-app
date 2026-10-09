import { useState, type FormEvent } from 'react'
import { DIFFICULTIES } from '../../data/difficulties.ts'
import type { GoalDifficulty } from '../../types/game.ts'
import { useGame } from '../../state/useGame.ts'
import { Button } from '../common/Button.tsx'

export function GoalCreator() {
  const { addGoal } = useGame()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [difficulty, setDifficulty] = useState<GoalDifficulty | null>(null)
  const [error, setError] = useState<string | null>(null)
  const ready = title.trim().length > 0 && category.trim().length > 0 && difficulty !== null

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!difficulty || !ready) {
      setError('A goal needs a name, a category, and a difficulty.')
      return
    }
    const failure = addGoal({ title, category, difficulty })
    if (failure) {
      setError(failure)
      return
    }
    setTitle('')
    setError(null)
  }

  return (
    <form onSubmit={onSubmit} className="border border-line bg-panel p-3">
      <h2 className="text-sm font-semibold">New goal</h2>
      <p className="mt-1 text-xs text-muted">The game sets the XP from the difficulty.</p>
      <label className="mt-3 block text-xs uppercase tracking-wide text-muted" htmlFor="goal-name">
        Name
        <input
          id="goal-name"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="mt-1 w-full border border-line bg-ink px-3 py-2 text-sm text-cream outline-none focus:border-gold"
          autoComplete="off"
        />
      </label>
      <label className="mt-3 block text-xs uppercase tracking-wide text-muted" htmlFor="goal-category">
        Category
        <input
          id="goal-category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          placeholder="Study"
          className="mt-1 w-full border border-line bg-ink px-3 py-2 text-sm text-cream outline-none placeholder:text-muted focus:border-gold"
          autoComplete="off"
        />
      </label>
      <fieldset className="mt-3">
        <legend className="text-xs uppercase tracking-wide text-muted">Difficulty</legend>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {DIFFICULTIES.map((preset) => {
            const selected = difficulty === preset.id
            return (
              <label
                key={preset.id}
                className={`flex cursor-pointer items-center justify-between gap-2 border px-2 py-2 text-sm ${selected ? 'border-gold text-gold' : 'border-line text-cream'}`}
              >
                <span className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="difficulty"
                    value={preset.id}
                    checked={selected}
                    onChange={() => setDifficulty(preset.id)}
                    className="accent-gold"
                  />
                  {preset.label}
                </span>
                <span className="font-mono text-[10px]">+{preset.xpReward}</span>
              </label>
            )
          })}
        </div>
      </fieldset>
      {error ? <p className="mt-3 text-sm text-rival">{error}</p> : null}
      <Button type="submit" className="mt-3 w-full" disabled={!ready}>
        Add goal
      </Button>
    </form>
  )
}
