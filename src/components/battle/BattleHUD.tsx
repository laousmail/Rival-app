import { useEffect, useRef, useState } from 'react'
import { HAIR_COLORS, optionColor, OUTFITS, PALETTES, RIVAL_BODIES, RIVAL_COLORS, RIVAL_OUTFITS, SKINS } from '../../data/appearance.ts'
import { RIVAL_PERSONALITIES } from '../../data/rivals.ts'
import type { BattleState, RivalPersonality } from '../../types/game.ts'
import { useGame } from '../../state/useGame.ts'
import { PixelFigure } from '../common/PixelFigure.tsx'
import { BattleStatus } from './BattleStatus.tsx'
import { Player } from './Player.tsx'
import { Rival } from './Rival.tsx'

function rivalLine(personality: RivalPersonality, state: BattleState, openGoal: boolean): string | null {
  const preset = RIVAL_PERSONALITIES.find((option) => option.id === personality)
  if (!preset || personality === 'silent') return null
  if (personality === 'challenger' && (state === 'behind' || state === 'critical')) return preset.line
  if (personality === 'coach' && state !== 'dominating') return preset.line
  if (personality === 'menace' && openGoal) return preset.line
  return null
}

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
        <Player
          name={user.name}
          level={user.level}
          xp={battle.playerXP}
          max={scale}
          figure={
            <PixelFigure
              skin={optionColor(SKINS, user.character.skin, '#e6c3a1')}
              hair={optionColor(HAIR_COLORS, user.character.hairColor, '#1c2230')}
              outfit={optionColor(OUTFITS, user.character.outfit, '#3d6b8a')}
              accent={optionColor(PALETTES, user.character.palette, '#f2b544')}
              hairStyle={user.character.hair}
              accessory={user.character.accessory}
            />
          }
        />
        <Rival
          name={rival.name}
          xp={battle.rivalXP}
          max={scale}
          ticking={ticking}
          line={rivalLine(rival.personality, state, battle.goals.some((goal) => !goal.completed))}
          figure={
            <PixelFigure
              skin={optionColor(RIVAL_BODIES, rival.appearance.body, '#c48a6a')}
              hair={optionColor(RIVAL_COLORS, rival.appearance.color, '#1c2230')}
              outfit={optionColor(RIVAL_OUTFITS, rival.appearance.outfit, '#3a2a38')}
              accent={optionColor(RIVAL_COLORS, rival.appearance.color, '#ff5a6a')}
              hairStyle={rival.appearance.hair}
            />
          }
        />
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
