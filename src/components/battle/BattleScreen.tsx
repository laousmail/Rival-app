import { Link } from 'react-router'
import { useGame } from '../../state/useGame.ts'
import { Button } from '../common/Button.tsx'
import { ScreenHeader } from '../common/ScreenHeader.tsx'
import { CompletionBanner } from '../common/CompletionBanner.tsx'
import { GoalList } from '../goals/GoalList.tsx'
import { BattleHUD } from './BattleHUD.tsx'

export function BattleScreen() {
  const { endDay, battle } = useGame()
  return (
    <section aria-labelledby="battle-title">
      <ScreenHeader
        titleId="battle-title"
        eyebrow="Home"
        title="Today's battle"
        note="Finish a goal and you take the XP. Leave it open and your rival keeps earning."
      />
      <CompletionBanner />
      <BattleHUD />
      <div className="mt-5">
        <GoalList />
      </div>
      <Link
        to="/goals"
        className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        Add a goal
      </Link>
      <Button tone="quiet" className="mt-4 w-full" onClick={endDay} disabled={battle.goals.length === 0}>
        End today
      </Button>
    </section>
  )
}
