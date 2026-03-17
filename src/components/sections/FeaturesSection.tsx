'use client'

import dynamic from 'next/dynamic'
import { Lock, EyeOff, UserX, Zap, Wifi, Code2 } from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FEATURES } from '@/lib/constants'

const AnimatedReveal = dynamic(
  () => import('@/components/ui/AnimatedReveal').then(m => m.AnimatedReveal),
  { ssr: false }
)
const RevealItem = dynamic(
  () => import('@/components/ui/AnimatedReveal').then(m => m.RevealItem),
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

      {/* Heading */}
      <AnimatedReveal className="mb-20 text-center">
        <p
          className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.3em]"
          style={{ color: '#00E5FF', opacity: 0.6 }}
        >
          Capabilities
        </p>
        <h2 id="features-heading" className="text-heading text-text-primary">
          Built different.
        </h2>
      </AnimatedReveal>

      {/* Staggered card grid */}
      <AnimatedReveal stagger className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => {
          const Icon = ICONS[feature.id]
          return (
            <RevealItem key={feature.id}>
              <div className="glass-card group h-full p-7">
                {/* Icon */}
                <div
                  className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    background: 'rgba(0, 229, 255, 0.06)',
                    border: '1px solid rgba(0, 229, 255, 0.12)',
                  }}
                >
                  <Icon
                    size={18}
                    aria-hidden
                    style={{ color: '#00E5FF', opacity: 0.85 }}
                  />
                </div>

                {/* Title */}
                <h3
                  className="mb-2 text-[0.95rem] font-semibold leading-snug"
                  style={{ color: '#F0F0F0', letterSpacing: '-0.02em' }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: '#555560' }}
                >
                  {feature.description}
                </p>

                {/* Bottom accent line on hover */}
                <div
                  aria-hidden="true"
                  className="mt-6 h-px w-0 transition-all duration-500 group-hover:w-full"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.3), transparent)' }}
                />
              </div>
            </RevealItem>
          )
        })}
      </AnimatedReveal>
    </SectionWrapper>
  )
}
