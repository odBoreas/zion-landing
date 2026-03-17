import Link from 'next/link'

type ButtonVariant = 'primary' | 'ghost'

interface ButtonProps {
  href: string
  variant?: ButtonVariant
  children: React.ReactNode
  'aria-label'?: string
  className?: string
}

export function Button({
  href,
  variant = 'primary',
  children,
  'aria-label': ariaLabel,
  className = '',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-200 focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:outline-none'

  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-accent-lime text-background hover:shadow-lime-glow hover:brightness-110 active:scale-95',
    ghost:
      'border border-border text-text-primary hover:border-accent-lime/60 hover:text-accent-lime active:scale-95',
  }

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  )
}
