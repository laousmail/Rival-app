import { BattleStatus } from './BattleStatus.tsx'
import { Player } from './Player.tsx'
import { Rival } from './Rival.tsx'

export function BattleHUD() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <Player />
        <Rival />
      </div>
      <BattleStatus />
    </div>
  )
}
