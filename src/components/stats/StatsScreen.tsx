import { ACHIEVEMENTS } from '../../data/achievements.ts'
import { useGame } from '../../state/useGame.ts'
import { ScreenHeader } from '../common/ScreenHeader.tsx'

export function StatsScreen() {
  const { user, achievements } = useGame()
  const rate = achievements.goalsTotal === 0 ? '—' : `${Math.round((achievements.goalsCompleted / achievements.goalsTotal) * 100)}%`
  const rows = [
    ['Level', String(user.level)],
    ['Total XP', String(user.totalXP)],
    ['Current streak', String(user.currentStreak)],
    ['Best streak', String(user.bestStreak)],
    ['Wins', String(user.wins)],
    ['Losses', String(user.losses)],
    ['Draws', String(user.draws)],
    ['Goals completed', String(achievements.goalsCompleted)],
    ['Completion rate', rate],
  ] as const

  return (
    <section>
      <ScreenHeader
        titleId="stats-title"
        eyebrow="Stats"
        title="Stats"
        note="Lifetime numbers stay after a win or a loss. The streak is for showing up."
      />
      <dl className="border border-line">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-3 border-b border-line px-3 py-2.5 last:border-b-0">
            <dt className="text-sm text-muted">{label}</dt>
            <dd className="font-mono text-sm text-cream">{value}</dd>
          </div>
        ))}
      </dl>
      <section aria-labelledby="achievements-title" className="mt-5">
        <h2 id="achievements-title" className="text-sm font-semibold">
          Achievements
        </h2>
        <ul className="mt-2 border border-line">
          {ACHIEVEMENTS.map((achievement) => {
            const unlocked = achievements.unlocked.includes(achievement.id)
            return (
              <li key={achievement.id} className="border-b border-line px-3 py-2.5 last:border-b-0">
                <p className={`text-sm font-medium ${unlocked ? 'text-gold' : 'text-cream'}`}>{achievement.name}</p>
                <p className="mt-0.5 text-xs text-muted">
                  {achievement.detail} · {unlocked ? 'Unlocked' : 'Locked'}
                </p>
              </li>
            )
          })}
        </ul>
      </section>
    </section>
  )
}
