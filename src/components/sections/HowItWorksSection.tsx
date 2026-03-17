'use client'

import dynamic from 'next/dynamic'
import { useLocale } from '@/lib/locale-context'

const AnimatedReveal = dynamic(
  () => import('@/components/ui/AnimatedReveal').then(m => m.AnimatedReveal),
  { ssr: false }
)
const RevealItem = dynamic(
  () => import('@/components/ui/AnimatedReveal').then(m => m.RevealItem),
  { ssr: false }
)

export function HowItWorksSection() {
  const { t } = useLocale()
  const h = t.howItWorks

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="section-skewed section-fade px-6"
    >
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <AnimatedReveal className="mb-16 text-center">
          <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-accent opacity-60">
            {h.eyebrow}
          </p>
          <h2 id="how-heading" className="text-heading text-text-primary">
            {h.heading}
          </h2>
        </AnimatedReveal>

        {/* Steps */}
        <AnimatedReveal stagger className="relative grid grid-cols-1 gap-4 md:grid-cols-3">

{h.steps.map((step) => (
            <RevealItem key={step.id}>
              <div className="glass-card flex flex-col items-center gap-4 p-8 text-center">
                {/* Step number */}
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-accent"
                  style={{
                    background: 'rgba(0, 229, 255, 0.06)',
                    border: '1px solid rgba(0, 229, 255, 0.2)',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {String(step.id).padStart(2, '0')}
                </div>

                <h3
                  className="text-[0.95rem] font-semibold text-text-primary"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {step.title}
                </h3>

                <p className="text-sm leading-relaxed text-text-muted">
                  {step.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </AnimatedReveal>
      </div>
    </section>
  )
}
