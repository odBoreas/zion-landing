import Image from 'next/image'
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
    <footer className="border-t border-border bg-surface px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <Image
              src="/logo.svg"
              alt="ZION"
              width={80}
              height={22}
              unoptimized
            />
            <p className="text-sm text-text-muted">Private by design. Yours by default.</p>
            <div className="mt-2 flex gap-3">
              <Link
                href="#"
                aria-label="ZION on GitHub"
                className="text-text-muted transition-colors hover:text-accent-lime"
              >
                <Github size={18} aria-hidden />
              </Link>
              <Link
                href="#"
                aria-label="ZION on X / Twitter"
                className="text-text-muted transition-colors hover:text-accent-lime"
              >
                <Twitter size={18} aria-hidden />
              </Link>
            </div>
          </div>

          {/* Link Groups */}
          {(Object.entries(FOOTER_LINKS) as [string, readonly { label: string; href: string }[]][]).map(
            ([group, links]) => (
              <div key={group}>
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">
                  {group}
                </h4>
                <ul className="flex flex-col gap-2">
                  {links.map(link => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-text-muted transition-colors hover:text-text-primary"
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

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-xs text-text-muted">© 2026 ZION. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
