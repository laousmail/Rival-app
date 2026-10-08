import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  tone?: 'primary' | 'quiet'
} & ButtonHTMLAttributes<HTMLButtonElement>

const tones: Record<NonNullable<ButtonProps['tone']>, string> = {
  primary: 'bg-gold text-ink hover:brightness-105',
  quiet: 'bg-transparent text-cream border border-line hover:border-cream',
}

/** Shared action control. Phase 1 does not wire it to game actions. */
export function Button({ children, tone = 'primary', className = '', type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-11 items-center justify-center px-4 text-sm font-semibold tracking-wide focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:cursor-not-allowed disabled:opacity-50 ${tones[tone]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
