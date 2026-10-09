# RIVAL

A mobile-first daily-goal battle. Finish your goals and you get stronger. Leave them open and your rival takes the XP.

Phase 1 is the five-tab shell. Phase 2 is the game engine in `src/game`. Phase 3 is the battle screen: create a goal, watch rival XP, complete it once. A refresh still clears the session. Character art is not in yet.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
npm test
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
├── game/            XP, battles, levels, streaks
├── data/            fixed presets from the specification
├── state/           empty until the store exists
├── persistence/     empty until saveGame / loadGame / resetGame
├── types/
└── App.tsx
```

Tabs: Battle, Goals, Character, Stats, Settings. Battle is the index route.

## Engine notes

- UI does not calculate XP, levels, streaks, or battle results.
- Nothing reads or writes `localStorage`.
- Difficulty rewards are fixed inside the specification bands. Hard is the calculus example: 300 XP, 4 per minute, cap 300.
- Levels use 0, 500, 1,200, 2,000, and 3,000. After level 5, each level costs 1,000 XP more.
- A day counts toward the streak when it has at least one goal. A loss still counts. A missed day resets the current streak. There is no recovery day yet.
