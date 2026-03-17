import dynamic from 'next/dynamic'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { HOW_IT_WORKS_STEPS } from '@/lib/constants'

const AnimatedReveal = dynamic(
  () => import('@/components/ui/AnimatedReveal').then(m => m.AnimatedReveal),
  { ssr: false }
)

export function HowItWorksSection() {
  return (
    <SectionWrapper id="how-it-works" aria-labelledby="how-heading">
      <AnimatedReveal>
        <h2 id="how-heading" className="section-heading mb-16 text-center">
          Up in seconds.
        </h2>
      </AnimatedReveal>

      <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Connector line — desktop only */}
        <div
          aria-hidden="true"
          className="absolute left-[16.67%] right-[16.67%] top-8 hidden h-px bg-gradient-to-r from-border via-accent-lime/30 to-border lg:block"
        />

        {HOW_IT_WORKS_STEPS.map((step, i) => (
          <AnimatedReveal key={step.id} delay={i * 0.08}>
            <div className="card-base flex flex-col items-center gap-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent-lime/30 bg-accent-lime/10 text-lg font-bold text-accent-lime">
                {step.id}
              </div>
              <h3 className="text-lg font-semibold text-text-primary">{step.title}</h3>
              <p className="text-sm text-text-muted">{step.description}</p>
            </div>
          </AnimatedReveal>
        ))}
      </div>
    </SectionWrapper>
  )
}
