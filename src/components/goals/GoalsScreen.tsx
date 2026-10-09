import { ScreenHeader } from '../common/ScreenHeader.tsx'
import { GoalCreator } from './GoalCreator.tsx'
import { GoalList } from './GoalList.tsx'

export function GoalsScreen() {
  return (
    <section>
      <ScreenHeader
        titleId="goals-title"
        eyebrow="Goals"
        title="Goals"
        note="Layout only. Creating and completing goals is not active yet."
      />
      <GoalList />
      <GoalCreator />
    </section>
  )
}
