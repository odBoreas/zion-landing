'use client'

import Link from 'next/link'
import { Github, Twitter } from 'lucide-react'
import { useLocale } from '@/lib/locale-context'

export function FooterSection() {
  const { t } = useLocale()
  const f = t.footer

  return (
    <footer
      className="px-6 pb-12 pt-20"
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <span
              className="text-2xl font-black text-text-primary"
              style={{ letterSpacing: '-0.05em' }}
            >
              ZION<span className="text-accent">.</span>
            </span>

            <p className="text-sm leading-relaxed text-text-muted">
              {f.tagline}
            </p>

            <div className="flex gap-3 pt-1">
              <Link
                href="#"
                aria-label="ZION on GitHub"
                className="text-text-muted transition-colors duration-300 hover:text-accent"
              >
                <Github size={16} aria-hidden />
              </Link>
              <Link
                href="#"
                aria-label="ZION on X / Twitter"
                className="text-text-muted transition-colors duration-300 hover:text-accent"
              >
                <Twitter size={16} aria-hidden />
              </Link>
            </div>
          </div>

          {/* Link groups */}
          {(Object.entries(f.groups) as [string, readonly { label: string; href: string }[]][]).map(
            ([group, links]) => (
              <div key={group}>
                <h4 className="mb-5 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-text-muted opacity-50">
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
          <p className="text-[0.65rem] uppercase tracking-[0.15em] text-text-muted opacity-40">
            {f.copyright}
          </p>
          <p className="text-[0.65rem] uppercase tracking-[0.15em] text-text-muted opacity-40">
            {f.protocol}
          </p>
        </div>
      </div>
    </footer>
  )
}
