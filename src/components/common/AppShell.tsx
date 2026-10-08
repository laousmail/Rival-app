import { useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router'
import { BottomNav } from './BottomNav.tsx'

export function AppShell() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.getElementById('content')?.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-dvh bg-stage text-cream">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-panel focus:px-3 focus:py-2 focus:text-cream"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-dvh w-full max-w-[390px] flex-col bg-ink shadow-[0_0_0_1px_#343c50]">
        <header className="flex shrink-0 items-center justify-between border-b border-line px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3">
          <Link
            to="/"
            className="font-mono text-sm tracking-[0.42em] text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            RIVAL
          </Link>
          <span className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-3 w-2 bg-gold" />
            <span className="h-3 w-2 bg-rival" />
          </span>
        </header>
        <main id="content" tabIndex={-1} className="min-h-0 flex-1 overflow-y-auto px-4 py-5 outline-none">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>
  )
}
