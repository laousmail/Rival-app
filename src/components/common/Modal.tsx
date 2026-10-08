import type { ReactNode } from 'react'

type ModalProps = {
  title: string
  children: ReactNode
}

/**
 * Dialog shell for later phases. Not mounted in Phase 1.
 * Focus trapping arrives with the first real modal.
 */
export function Modal({ title, children }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 px-4 pb-6 sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="rival-modal-title"
        className="w-full max-w-[358px] border border-line bg-panel p-4 shadow-[4px_4px_0_0_#07080d]"
      >
        <h2 id="rival-modal-title" className="text-base font-semibold">
          {title}
        </h2>
        <div className="mt-3 text-sm leading-relaxed text-muted">{children}</div>
      </div>
    </div>
  )
}
