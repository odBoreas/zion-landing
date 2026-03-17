'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface AnimatedRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function AnimatedReveal({
  children,
  delay = 0,
  className = '',
}: AnimatedRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
