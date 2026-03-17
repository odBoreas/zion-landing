'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronDown, Smartphone, Monitor } from 'lucide-react'
import { useLocale } from '@/lib/locale-context'
import { DOWNLOAD_URL_IOS, DOWNLOAD_URL_ANDROID, DOWNLOAD_URL_DESKTOP } from '@/lib/locales'

const AnimatedReveal = dynamic(
  () => import('@/components/ui/AnimatedReveal').then(m => m.AnimatedReveal),
  { ssr: false }
)

const EASE = [0.23, 1, 0.32, 1] as const

const GLITCH_BARS = [
  { top: '18%' }, { top: '34%' }, { top: '52%' },
  { top: '67%' }, { top: '81%' },
]

export function HeroSection() {
  const { t } = useLocale()
  const h = t.hero

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* Glitch bars — raw CSS, no Framer Motion */}
      {GLITCH_BARS.map((bar, i) => (
        <div key={i} className="glitch-bar" aria-hidden="true" style={{ top: bar.top, height: '2px' }} />
      ))}

      {/* Radial glow from top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh]"
        style={{
          background: 'radial-gradient(ellipse 70% 55% at 50% -5%, rgba(0,229,255,0.16) 0%, rgba(0,229,255,0.05) 40%, transparent 70%)',
        }}
      />

      {/* Slashed background block — clip-path diagonal */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[15%] h-[60vh]"
        style={{
          background: 'linear-gradient(135deg, rgba(0,229,255,0.04) 0%, transparent 60%)',
          clipPath: 'polygon(0 8%, 100% 0%, 100% 92%, 0% 100%)',
        }}
      />

      {/* Hairline accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[600px] max-w-full -translate-x-1/2 opacity-25"
        style={{ background: 'linear-gradient(90deg, transparent, #00E5FF, transparent)' }}
      />

      {/* Content */}
      <div className="relative z-10 flex max-w-5xl flex-col items-center gap-8">

        <AnimatedReveal delay={0.05}>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-accent opacity-65">
            {h.eyebrow}
          </p>
        </AnimatedReveal>

        {/* Glitch headline — data-text must match visible text */}
        <AnimatedReveal delay={0.15}>
          <h1
            id="hero-heading"
            className="glitch text-display text-text-primary"
            data-text={h.dataText}
          >
            {h.line1}
            <br />
            <span className="text-accent">{h.line2}</span>
            <br />
            <span className="text-text-primary opacity-40">{h.line3}</span>
          </h1>
        </AnimatedReveal>

        <AnimatedReveal delay={0.25}>
          <p className="max-w-md text-base leading-relaxed text-text-primary" style={{ letterSpacing: '-0.01em', opacity: 0.85 }}>
            {h.sub}{' '}
            <span className="text-accent" style={{ opacity: 1 }}>{h.subAccent}</span>
          </p>
        </AnimatedReveal>

        <AnimatedReveal delay={0.35}>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href={DOWNLOAD_URL_IOS} aria-label="Download ZION for iOS" className="btn-cyan">
              <svg width="14" height="17" viewBox="0 0 14 17" fill="currentColor" aria-hidden>
                <path d="M11.55 8.72c-.02-2.13 1.74-3.16 1.82-3.21-1-1.46-2.55-1.65-3.1-1.67-1.31-.13-2.57.77-3.24.77-.67 0-1.69-.75-2.79-.73C2.65 3.9 1.14 4.83.38 6.27c-1.55 2.69-.4 6.67 1.1 8.85.74 1.07 1.62 2.27 2.77 2.23 1.12-.05 1.54-.72 2.89-.72 1.35 0 1.73.72 2.9.7 1.2-.02 1.96-1.08 2.69-2.16.85-1.24 1.2-2.44 1.22-2.5-.03-.01-2.37-.9-2.4-3.95zm-2.24-7.27C10.01.65 10.66-.33 11.27-1.29a4.37 4.37 0 0 0-1.04-.11c-.99 0-2.07.67-2.74 1.71-.6.93-1.13 2.43-.98 3.86 1.1.08 2.23-.62 2.8-1.72z"/>
              </svg>
              {h.ctaIOS}
            </Link>
            <Link href={DOWNLOAD_URL_ANDROID} aria-label="Download ZION for Android" className="btn-ghost">
              <Smartphone size={14} aria-hidden />
              {h.ctaAndroid}
            </Link>
            <Link href={DOWNLOAD_URL_DESKTOP} aria-label="Download ZION for Desktop" className="btn-ghost">
              <Monitor size={14} aria-hidden />
              {h.ctaDesktop}
            </Link>
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={0.42}>
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-text-muted opacity-40">
            {h.platforms}
          </p>
        </AnimatedReveal>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8, ease: EASE }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} aria-hidden className="text-text-muted opacity-40" />
        </motion.div>
      </motion.div>
    </section>
  )
}
