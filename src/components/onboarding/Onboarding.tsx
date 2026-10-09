import { useState, type FormEvent } from 'react'
import { DIFFICULTIES } from '../../data/difficulties.ts'
import { RIVAL_PERSONALITIES } from '../../data/rivals.ts'
import type { GoalDifficulty, RivalPersonality } from '../../types/game.ts'
import { useGame } from '../../state/useGame.ts'
import { Button } from '../common/Button.tsx'

interface DraftGoal {
  title: string
  category: string
  difficulty: GoalDifficulty | null
}

const emptyGoal = (): DraftGoal => ({ title: '', category: '', difficulty: null })

export function Onboarding() {
  const { begin } = useGame()
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [rivalName, setRivalName] = useState('')
  const [personality, setPersonality] = useState<RivalPersonality | null>(null)
  const [goals, setGoals] = useState<DraftGoal[]>([emptyGoal(), emptyGoal(), emptyGoal()])

  const goalReady = goals.every((goal) => goal.title.trim() && goal.category.trim() && goal.difficulty)
  const ready =
    name.trim().length > 0 && rivalName.trim().length > 0 && personality !== null && goalReady

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!ready || !personality) return
    begin({
      name,
      rivalName,
      personality,
      goals: goals.map((goal) => ({
        title: goal.title,
        category: goal.category,
        difficulty: goal.difficulty as GoalDifficulty,
      })),
    })
  }

  return (
    <div className="min-h-dvh bg-stage text-cream">
      <form onSubmit={submit} className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col bg-ink px-4 py-6">
        <p className="font-mono text-sm tracking-[0.42em]">RIVAL</p>
        <h1 className="mt-6 text-2xl font-semibold">The battle starts with you.</h1>
        <p className="mt-2 text-sm text-muted">Name yourself, name your rival, then set three goals.</p>

        {step === 0 ? (
          <label className="mt-6 block text-xs uppercase tracking-wide text-muted">
            Your name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-1 w-full border border-line bg-panel px-3 py-2 text-sm text-cream outline-none focus:border-gold"
              autoComplete="nickname"
            />
          </label>
        ) : null}

        {step === 1 ? (
          <label className="mt-6 block text-xs uppercase tracking-wide text-muted">
            Rival name
            <input
              value={rivalName}
              onChange={(event) => setRivalName(event.target.value)}
              className="mt-1 w-full border border-line bg-panel px-3 py-2 text-sm text-cream outline-none focus:border-gold"
            />
          </label>
        ) : null}

        {step === 2 ? (
          <fieldset className="mt-6 space-y-2">
            <legend className="text-xs uppercase tracking-wide text-muted">Personality</legend>
            {RIVAL_PERSONALITIES.map((option) => (
              <label
                key={option.id}
                className={`mt-2 block cursor-pointer border px-3 py-2 ${personality === option.id ? 'border-gold' : 'border-line'}`}
              >
                <input
                  className="sr-only"
                  type="radio"
                  name="personality"
                  value={option.id}
                  checked={personality === option.id}
                  onChange={() => setPersonality(option.id)}
                />
                <span className="text-sm font-semibold">{option.label}</span>
                <span className="mt-1 block text-xs text-muted">{option.line}</span>
              </label>
            ))}
          </fieldset>
        ) : null}

        {step === 3
          ? goals.map((goal, index) => (
              <fieldset key={index} className="mt-5 border border-line p-3">
                <legend className="px-1 text-xs uppercase tracking-wide text-muted">Goal {index + 1}</legend>
                <input
                  aria-label={`Goal ${index + 1} name`}
                  value={goal.title}
                  onChange={(event) =>
                    setGoals((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, title: event.target.value } : item)))
                  }
                  placeholder="Name"
                  className="mt-2 w-full border border-line bg-panel px-3 py-2 text-sm outline-none focus:border-gold"
                />
                <input
                  aria-label={`Goal ${index + 1} category`}
                  value={goal.category}
                  onChange={(event) =>
                    setGoals((current) =>
                      current.map((item, itemIndex) => (itemIndex === index ? { ...item, category: event.target.value } : item)),
                    )
                  }
                  placeholder="Category"
                  className="mt-2 w-full border border-line bg-panel px-3 py-2 text-sm outline-none focus:border-gold"
                />
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {DIFFICULTIES.map((preset) => (
                    <label
                      key={preset.id}
                      className={`border px-2 py-1.5 text-xs ${goal.difficulty === preset.id ? 'border-gold text-gold' : 'border-line'}`}
                    >
                        <input
                        className="sr-only"
                        type="radio"
                        name={`difficulty-${index}`}
                        value={preset.id}
                        checked={goal.difficulty === preset.id}
                        onChange={() =>
                          setGoals((current) =>
                            current.map((item, itemIndex) => (itemIndex === index ? { ...item, difficulty: preset.id } : item)),
                          )
                        }
                      />
                      {preset.label} +{preset.xpReward}
                    </label>
                  ))}
                </div>
              </fieldset>
            ))
          : null}

        <div className="mt-auto flex gap-2 pt-6">
          {step > 0 ? (
            <Button type="button" tone="quiet" className="flex-1" onClick={() => setStep((current) => current - 1)}>
              Back
            </Button>
          ) : null}
          {step < 3 ? (
            <Button
              type="button"
              className="flex-1"
              disabled={(step === 0 && !name.trim()) || (step === 1 && !rivalName.trim()) || (step === 2 && !personality)}
              onClick={() => setStep((current) => current + 1)}
            >
              Next
            </Button>
          ) : (
            <Button type="submit" className="flex-1" disabled={!ready}>
              The battle has begun
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
