# RIVAL

A mobile-first daily-goal battle. Finish your goals and you get stronger. Leave them open and your rival takes the XP.

RIVAL saves on this device. Name yourself, name a rival, set three goals, and the battle starts. Finish a goal before your rival takes the XP. End the day to see the result. A refresh keeps the save.

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

## iPhone

The `ios/` folder is an Xcode project. It installs this same app on an iPhone. Building it needs a Mac with Xcode, and the iPhone signed in with your Apple ID.

On the Mac:

```bash
npm install
npm run ios:sync
open ios/App/App.xcodeproj
```

In Xcode, select your iPhone as the run destination. Open the App target, then Signing & Capabilities, and choose your Team. Press Run. The first time, the phone asks you to trust the developer under Settings, General, VPN & Device Management.

The bundle id is `app.rival.daily`. Change it in Xcode if Apple says it is already taken. After you change the web app, run `npm run ios:sync` again before the next Run.

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
