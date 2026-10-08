import { ACHIEVEMENTS } from '../../data/achievements.ts'
import { ScreenHeader } from '../common/ScreenHeader.tsx'

const STATS = [
  'Level',
  'Total XP',
  'Current streak',
  'Best streak',
  'Wins',
  'Losses',
  'Draws',
  'Goals completed',
  'Completion rate',
] as const

export function StatsScreen() {
  return (
    <section>
      <ScreenHeader
        titleId="stats-title"
        eyebrow="Stats"
        title="Stats"
        note="Layout only. Lifetime stats and achievements are not calculated yet."
      />
      <dl className="border border-line">
        {STATS.map((stat) => (
          <div key={stat} className="flex items-center justify-between gap-3 border-b border-line px-3 py-2.5 last:border-b-0">
            <dt className="text-sm text-muted">{stat}</dt>
            <dd className="font-mono text-sm text-cream">—</dd>
          </div>
        ))}
      </dl>
      <section aria-labelledby="achievements-title" className="mt-5">
        <h2 id="achievements-title" className="text-sm font-semibold">
          Achievements
        </h2>
        <ul className="mt-2 border border-dashed border-line">
          {ACHIEVEMENTS.map((achievement) => (
            <li key={achievement.id} className="border-b border-line px-3 py-2.5 last:border-b-0">
              <p className="text-sm font-medium">{achievement.name}</p>
              <p className="mt-0.5 text-xs text-muted">
                {achievement.detail} · Not tracked yet
              </p>
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}
