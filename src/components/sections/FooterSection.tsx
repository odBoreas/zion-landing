import Link from 'next/link'
import { Github, Twitter } from 'lucide-react'

const FOOTER_LINKS = {
  Product: [
    { label: 'Download',     href: '#hero' },
    { label: 'How it Works', href: '#how-it-works' },
    { label: 'Features',     href: '#features' },
  ],
  Community: [
    { label: 'GitHub',      href: '#' },
    { label: 'X / Twitter', href: '#' },
    { label: 'Forum',       href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Use',   href: '#' },
  ],
} as const

export function FooterSection() {
  return (
    <footer
      className="px-6 pb-12 pt-20"
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            {/* Wordmark */}
            <span
              className="text-2xl font-black tracking-[-0.05em]"
              style={{ color: '#F0F0F0', letterSpacing: '-0.05em' }}
            >
              ZION
              <span style={{ color: '#00E5FF' }}>.</span>
            </span>

            <p
              className="text-sm leading-relaxed"
              style={{ color: '#333340' }}
            >
              Private by design.
              <br />
              Yours by default.
            </p>

            <div className="flex gap-3 pt-1">
              <Link
                href="#"
                aria-label="ZION on GitHub"
                className="text-text-dim transition-colors duration-300 hover:text-accent"
              >
                <Github size={16} aria-hidden />
              </Link>
              <Link
                href="#"
                aria-label="ZION on X / Twitter"
                className="text-text-dim transition-colors duration-300 hover:text-accent"
              >
                <Twitter size={16} aria-hidden />
              </Link>
            </div>
          </div>

          {/* Link groups */}
          {(Object.entries(FOOTER_LINKS) as [string, readonly { label: string; href: string }[]][]).map(
            ([group, links]) => (
              <div key={group}>
                <h4 className="mb-5 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-text-dim">
                  {group}
                </h4>
                <ul className="flex flex-col gap-3">
                  {links.map(link => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-text-muted transition-colors duration-200 hover:text-text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
        >
          <p
            className="text-[0.65rem] uppercase tracking-[0.15em]"
            style={{ color: '#222228' }}
          >
            © 2026 ZION. All rights reserved.
          </p>
          <p
            className="text-[0.65rem] uppercase tracking-[0.15em]"
            style={{ color: '#222228' }}
          >
            End-to-end encrypted · Open protocol
          </p>
        </div>
      </div>
    </footer>
  )
}
