import dynamic from 'next/dynamic'
import { Lock, EyeOff, UserX, Zap, Wifi, Code2 } from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FEATURES } from '@/lib/constants'

const AnimatedReveal = dynamic(
  () => import('@/components/ui/AnimatedReveal').then(m => m.AnimatedReveal),
  { ssr: false }
)

type IconComponent = React.ComponentType<LucideProps>

const ICONS: Record<string, IconComponent> = {
  'e2e':     Lock,
  'no-logs': EyeOff,
  'no-id':   UserX,
  'fast':    Zap,
  'offline': Wifi,
  'open':    Code2,
}

export function FeaturesSection() {
  return (
    <SectionWrapper id="features" aria-labelledby="features-heading">
      <AnimatedReveal>
        <h2 id="features-heading" className="section-heading mb-16 text-center">
          Built different.
        </h2>
      </AnimatedReveal>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {FEATURES.map((feature, i) => {
          const Icon = ICONS[feature.id]
          return (
            <AnimatedReveal key={feature.id} delay={i * 0.08}>
              <div className="card-base flex items-start gap-4">
                <div className="mt-0.5 flex-shrink-0 text-accent-blue">
                  <Icon size={20} aria-hidden />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-text-primary">{feature.title}</h3>
                  <p className="text-sm text-text-muted">{feature.description}</p>
                </div>
              </div>
            </AnimatedReveal>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
