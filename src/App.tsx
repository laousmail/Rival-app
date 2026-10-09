import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { BattleScreen } from './components/battle/BattleScreen.tsx'
import { CharacterScreen } from './components/character/CharacterScreen.tsx'
import { AppShell } from './components/common/AppShell.tsx'
import { GoalsScreen } from './components/goals/GoalsScreen.tsx'
import { Onboarding } from './components/onboarding/Onboarding.tsx'
import { SettingsScreen } from './components/settings/SettingsScreen.tsx'
import { StatsScreen } from './components/stats/StatsScreen.tsx'
import { GameProvider } from './state/gameStore.tsx'
import { useGame } from './state/useGame.ts'

function Gate() {
  const { started } = useGame()
  if (!started) return <Onboarding />
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<BattleScreen />} />
        <Route path="goals" element={<GoalsScreen />} />
        <Route path="character" element={<CharacterScreen />} />
        <Route path="stats" element={<StatsScreen />} />
        <Route path="settings" element={<SettingsScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Gate />
      </BrowserRouter>
    </GameProvider>
  )
}
