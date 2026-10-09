import { ScreenHeader } from '../common/ScreenHeader.tsx'
import { CompletionBanner } from '../common/CompletionBanner.tsx'
import { GoalCreator } from './GoalCreator.tsx'
import { GoalList } from './GoalList.tsx'

export function GoalsScreen() {
  return (
    <section>
      <ScreenHeader
        titleId="goals-title"
        eyebrow="Goals"
        title="Goals"
        note="A name, a category, and a difficulty. You never type the XP."
      />
      <CompletionBanner />
      <GoalCreator />
      <div className="mt-5">
        <GoalList />
      </div>
    </section>
  )
}
