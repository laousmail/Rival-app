import { ScreenHeader } from '../common/ScreenHeader.tsx'
import { BattleHUD } from './BattleHUD.tsx'

export function BattleScreen() {
  return (
    <section aria-labelledby="battle-title">
      <ScreenHeader
        titleId="battle-title"
        eyebrow="Home"
        title="Today's battle"
        note="Layout only. Rival XP, battle states, and goal completion arrive in later phases."
      />
      <BattleHUD />
      <section aria-labelledby="today-goals-title" className="mt-5">
        <h2 id="today-goals-title" className="text-sm font-semibold">
          Today's goals
        </h2>
        <p className="mt-2 border border-dashed border-line px-3 py-8 text-center text-sm text-muted">
          Goals show up here once the battle screen is built.
        </p>
      </section>
    </section>
  )
}
