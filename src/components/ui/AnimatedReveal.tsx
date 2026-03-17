'use client'

import { motion, useInView, type Variants } from 'framer-motion'
import { useRef } from 'react'

// easeOutExpo — the only easing we use
const EASE_OUT_EXPO = [0.23, 1, 0.32, 1] as const

// Container variant — orchestrates staggered children
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
}

// Child variant — used by AnimatedReveal children individually
export const revealItem: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE_OUT_EXPO,
    },
  },
}

interface AnimatedRevealProps {
  children: React.ReactNode
  /** Extra delay before this element animates (seconds) */
  delay?: number
  /** If true, wraps children in a stagger container so they animate in sequence */
  stagger?: boolean
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export function AnimatedReveal({
  children,
  delay = 0,
  stagger = false,
  className = '',
  as,
}: AnimatedRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-8% 0px' })

  if (stagger) {
    const Tag = (as ? motion[as as 'div'] : motion.div) as typeof motion.div
    return (
      <Tag
        ref={ref as React.RefObject<HTMLDivElement>}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'show' : 'hidden'}
        className={className}
      >
        {children}
      </Tag>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Wrap direct children with this to get staggered reveal */
export function RevealItem({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div variants={revealItem} className={className}>
      {children}
    </motion.div>
  )
}
