import { useEffect, useRef, useState } from 'react'
import { useGame } from '../../state/useGame.ts'
import { BattleStatus } from './BattleStatus.tsx'
import { Player } from './Player.tsx'
import { Rival } from './Rival.tsx'

export function BattleHUD() {
  const { user, rival, battle, state } = useGame()
  const scale = Math.max(battle.playerXP, battle.rivalXP, 1)
  const [ticking, setTicking] = useState(false)
  const seen = useRef(Math.floor(battle.rivalXP))

  useEffect(() => {
    const next = Math.floor(battle.rivalXP)
    if (next === seen.current) return
    seen.current = next
    setTicking(true)
    const id = window.setTimeout(() => setTicking(false), 450)
    return () => window.clearTimeout(id)
  }, [battle.rivalXP])

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <Player name={user.name} level={user.level} xp={battle.playerXP} max={scale} />
        <Rival name={rival.name} xp={battle.rivalXP} max={scale} ticking={ticking} />
      </div>
      <BattleStatus
        state={state}
        empty={battle.goals.length === 0}
        playerXp={battle.playerXP}
        rivalXp={battle.rivalXP}
      />
    </div>
  )
}
