import dynamic from 'next/dynamic'
import { ChevronDown, Smartphone, Monitor, Apple } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { DOWNLOAD_URL_IOS, DOWNLOAD_URL_ANDROID, DOWNLOAD_URL_DESKTOP } from '@/lib/constants'

const DataFlowBackground = dynamic(
  () => import('@/components/ui/DataFlowBackground').then(m => m.DataFlowBackground),
  { ssr: false }
)

const AnimatedReveal = dynamic(
  () => import('@/components/ui/AnimatedReveal').then(m => m.AnimatedReveal),
  { ssr: false }
)

export function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <DataFlowBackground />

      <AnimatedReveal className="flex flex-col items-center gap-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-lime">
          Anonymous · Encrypted · Instant
        </p>

        <h1
          id="hero-heading"
          className="max-w-4xl text-text-primary"
          style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 800, lineHeight: 1.05 }}
        >
          Private.{' '}
          <span className="text-accent-lime">Instant.</span>{' '}
          Yours.
        </h1>

        <p className="max-w-xl text-lg text-text-muted">
          No sign-up. No phone number. No email. Generate a seed, get your ID, start chatting — in seconds.
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <Button href={DOWNLOAD_URL_IOS} variant="primary" aria-label="Download ZION for iOS">
            <Apple size={16} aria-hidden />
            App Store
          </Button>
          <Button href={DOWNLOAD_URL_ANDROID} variant="ghost" aria-label="Download ZION for Android">
            <Smartphone size={16} aria-hidden />
            Google Play
          </Button>
          <Button href={DOWNLOAD_URL_DESKTOP} variant="ghost" aria-label="Download ZION for Desktop">
            <Monitor size={16} aria-hidden />
            Desktop
          </Button>
        </div>
      </AnimatedReveal>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown size={24} className="text-text-muted" aria-hidden />
      </div>
    </section>
  )
}
