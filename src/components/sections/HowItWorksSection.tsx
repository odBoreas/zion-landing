'use client'

import dynamic from 'next/dynamic'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { HOW_IT_WORKS_STEPS } from '@/lib/constants'

const AnimatedReveal = dynamic(
  () => import('@/components/ui/AnimatedReveal').then(m => m.AnimatedReveal),
  { ssr: false }
)
const RevealItem = dynamic(
  () => import('@/components/ui/AnimatedReveal').then(m => m.RevealItem),
  { ssr: false }
)

export function HowItWorksSection() {
  return (
    <SectionWrapper id="how-it-works" aria-labelledby="how-heading">

      {/* Heading */}
      <AnimatedReveal className="mb-20 text-center">
        <p
          className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.3em]"
          style={{ color: '#00E5FF', opacity: 0.6 }}
        >
          How it works
        </p>
        <h2 id="how-heading" className="text-heading text-text-primary">
          Up in seconds.
        </h2>
      </AnimatedReveal>

      {/* Steps */}
      <AnimatedReveal stagger className="relative grid grid-cols-1 gap-4 md:grid-cols-3">

        {/* Connector — desktop only */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[16.67%] right-[16.67%] top-[2.75rem] hidden h-px md:block"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.15), rgba(0, 229, 255, 0.15), transparent)',
          }}
        />

        {HOW_IT_WORKS_STEPS.map((step) => (
          <RevealItem key={step.id}>
            <div className="glass-card flex flex-col items-center gap-4 p-8 text-center">
              {/* Step number */}
              <div
                className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold"
                style={{
                  background: 'rgba(0, 229, 255, 0.06)',
                  border: '1px solid rgba(0, 229, 255, 0.2)',
                  color: '#00E5FF',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {String(step.id).padStart(2, '0')}
              </div>

              <h3
                className="text-[0.95rem] font-semibold"
                style={{ color: '#F0F0F0', letterSpacing: '-0.02em' }}
              >
                {step.title}
              </h3>

              <p
                className="text-sm leading-relaxed"
                style={{ color: '#555560' }}
              >
                {step.description}
              </p>
            </div>
          </RevealItem>
        ))}
      </AnimatedReveal>
    </SectionWrapper>
  )
}
