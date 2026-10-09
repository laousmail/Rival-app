import { useGame } from '../../state/useGame.ts'

export function CompletionBanner() {
  const { notice } = useGame()
  if (!notice) return null
  return (
    <p role="status" className="mb-4 border border-gold bg-panel px-3 py-3 text-sm font-semibold text-gold">
      Critical hit. +{notice.xp} XP on {notice.title}.
    </p>
  )
}
