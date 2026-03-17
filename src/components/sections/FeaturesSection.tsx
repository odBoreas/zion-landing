'use client'

import dynamic from 'next/dynamic'
import { Lock, EyeOff, UserX, Zap, Wifi, Code2 } from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import { useLocale } from '@/lib/locale-context'

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

// Bento grid span config per feature id
const SPANS: Record<string, string> = {
  'e2e':     'md:col-span-2 md:row-span-2',
  'no-logs': 'md:col-span-1 md:row-span-1',
  'no-id':   'md:col-span-1 md:row-span-1',
  'fast':    'md:col-span-2 md:row-span-1',
  'offline': 'md:col-span-2 md:row-span-1',
  'open':    'md:col-span-2 md:row-span-1',
}

export function FeaturesSection() {
  const { t } = useLocale()
  const f = t.features

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <AnimatedReveal className="mb-16 text-center">
          <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-accent opacity-60">
            {f.eyebrow}
          </p>
          <h2 id="features-heading" className="text-heading text-text-primary">
            {f.heading}
          </h2>
        </AnimatedReveal>

        {/* Bento Grid */}
        <AnimatedReveal stagger className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {f.items.map((feature) => {
            const Icon = ICONS[feature.id]
            const spanClass = SPANS[feature.id] ?? ''
            const isLarge = feature.id === 'e2e'

            return (
              <RevealItem key={feature.id} className={`${spanClass}`}>
                <div className={`glass-card group h-full p-7 ${isLarge ? 'flex flex-col justify-between' : ''}`}>
                  {/* Icon */}
                  <div
                    className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{
                      background: 'rgba(0, 229, 255, 0.06)',
                      border: '1px solid rgba(0, 229, 255, 0.12)',
                    }}
                  >
                    <Icon size={isLarge ? 20 : 18} aria-hidden className="text-accent opacity-85" />
                  </div>

                  <div>
                    {/* Title */}
                    <h3
                      className={`mb-2 font-semibold leading-snug text-text-primary ${isLarge ? 'text-[1.15rem]' : 'text-[0.95rem]'}`}
                      style={{ letterSpacing: '-0.02em' }}
                    >
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className={`leading-relaxed text-text-muted ${isLarge ? 'text-base' : 'text-sm'}`}>
                      {feature.description}
                    </p>
                  </div>

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
      </div>
    </section>
  )
}
