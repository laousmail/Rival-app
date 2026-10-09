# RIVAL

A mobile-first daily-goal battle. Finish your goals and you get stronger. Leave them open and your rival takes the XP.

This repository is **Phase 1 — Foundation** only. The app launches, routes across five tabs, and holds the folder boundaries for later phases. There is no battle math, no saving, and no character art yet.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

Canonical layout width is 390px. On a desktop the shell stays that width and centers on the page.

## Layout

```
src/
├── components/
│   ├── battle/
│   ├── goals/
│   ├── character/
│   ├── stats/
│   ├── settings/
│   └── common/
├── game/            calculations arrive in Phase 2
├── data/            fixed presets from the specification
├── state/           empty until the store exists
├── persistence/     empty until saveGame / loadGame / resetGame
├── types/
└── App.tsx
```

Tabs: Battle, Goals, Character, Stats, Settings. Battle is the index route.

## Phase 1 boundary

- UI does not calculate XP, levels, streaks, or battle results.
- Nothing reads or writes `localStorage`.
- Difficulty bands in `src/data/difficulties.ts` are the specification ranges. Exact rewards are chosen in Phase 2.
- Level examples in the specification are not locked in as the curve.
