import { NavLink } from 'react-router'

const items = [
  { to: '/', label: 'Battle', end: true },
  { to: '/goals', label: 'Goals', end: false },
  { to: '/character', label: 'Character', end: false },
  { to: '/stats', label: 'Stats', end: false },
  { to: '/settings', label: 'Settings', end: false },
] as const

export function BottomNav() {
  return (
    <nav
      aria-label="Primary"
      className="grid shrink-0 grid-cols-5 border-t border-line bg-ink pb-[env(safe-area-inset-bottom)]"
    >
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            [
              'flex min-h-14 flex-col items-center justify-center gap-1 px-0.5 text-[10px] font-semibold uppercase tracking-wide focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gold',
              isActive ? 'text-gold shadow-[inset_0_2px_0_0_#f2b544]' : 'text-muted',
            ].join(' ')
          }
        >
          <NavMark label={item.label} />
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

function NavMark({ label }: { label: (typeof items)[number]['label'] }) {
  const paths: Record<(typeof items)[number]['label'], string> = {
    Battle: 'M6 9h3.5v8H6V9zM14.5 5H18v12h-3.5V5z',
    Goals: 'M5 6h14v12H5V6zm3 3h8M8 12h8M8 15h5',
    Character: 'M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-6 7c1-3 3-4 6-4s5 1 6 4',
    Stats: 'M5 16V10h3v6H5zm5 0V6h3v10h-3zm5 0v-4h3v4h-3z',
    Settings: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0-4v2m0 12v2m8-8h-2M6 12H4m12.5-6.5-1.4 1.4M8.9 15.1 7.5 16.5m0-11 1.4 1.4m6.2 6.2 1.4 1.4',
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-none stroke-current stroke-[1.75]">
      <path d={paths[label]} />
    </svg>
  )
}
