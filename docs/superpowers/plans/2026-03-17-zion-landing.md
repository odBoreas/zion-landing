# ZION Landing Page Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a high-performance, purely static Next.js 14 landing page for ZION — an anonymous messenger — with Luxury Dark Tech design, Geist Sans, Framer Motion animations, and 4 page sections (Hero, How It Works, Features, Footer).

**Architecture:** Next.js 14 App Router with `output: 'export'` for flat static HTML/CSS/JS. All animation components use `next/dynamic` with `ssr: false`. The `DataFlowBackground` is a plain Canvas API particle animation. Framer Motion scroll-reveal is wrapped in a single `AnimatedReveal` component reused across all sections.

**Tech Stack:** Next.js 14, TypeScript (strict), Tailwind CSS v3, Framer Motion, Lucide React, `next/font/local` (Geist Sans)

**Spec:** `docs/superpowers/specs/2026-03-17-zion-landing-design.md`

---

## File Map

| File | Responsibility |
|---|---|
| `next.config.ts` | Static export config, image unoptimized |
| `tailwind.config.ts` | Design tokens: colors, fonts, custom utilities |
| `src/app/globals.css` | CSS custom properties, Tailwind base/components/utilities |
| `src/app/layout.tsx` | Root layout: Geist font injection, `<html>`, metadata |
| `src/app/page.tsx` | Page composition: imports all 4 section components |
| `src/lib/constants.ts` | Download URLs, copy strings, feature list data |
| `src/components/ui/Button.tsx` | Reusable CTA button (primary + ghost variants) |
| `src/components/ui/SectionWrapper.tsx` | Padding, max-width, centering wrapper |
| `src/components/ui/AnimatedReveal.tsx` | Framer Motion fade-up scroll-reveal (dynamic, no SSR) |
| `src/components/ui/DataFlowBackground.tsx` | Canvas particle animation (dynamic, no SSR) |
| `src/components/sections/HeroSection.tsx` | Full-viewport hero: headline, subheadline, 3 CTAs, background |
| `src/components/sections/HowItWorksSection.tsx` | 3-step visual: Generate → Get ID → Chat |
| `src/components/sections/FeaturesSection.tsx` | 6-feature grid with Lucide icons |
| `src/components/sections/FooterSection.tsx` | Logo, link groups, social icons, copyright |
| `public/fonts/` | Geist Sans variable font files (woff2) |
| `public/logo.svg` | ZION logo (placeholder SVG until asset provided) |
| `public/og-image.webp` | OG image 1200×630 (placeholder until asset provided) |
| `.gitignore` | Standard Next.js + `.superpowers/` |

---

## Task 1: Scaffold Next.js Project

**Files:**
- Create: `next.config.ts`
- Create: `package.json` (via CLI)
- Create: `.gitignore`

- [ ] **Step 1: Initialise the project**

```bash
cd /Users/bk/Desktop/ZION_LAND
npx create-next-app@14 . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-turbopack
```

Expected: project files generated in current directory.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install framer-motion lucide-react
```

- [ ] **Step 3: Verify dev server starts**

```bash
npm run dev
```

Expected: server running at `http://localhost:3000` with default Next.js page. Stop with Ctrl+C.

- [ ] **Step 4: Configure static export in `next.config.ts`**

Replace generated file with:

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
```

- [ ] **Step 5: Add `.superpowers/` to `.gitignore`**

Append to `.gitignore`:
```
.superpowers/
```

- [ ] **Step 6: Verify build succeeds**

```bash
npm run build
```

Expected: `out/` directory created. No errors.

- [ ] **Step 7: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js 14 static export with TypeScript, Tailwind, Framer Motion"
```

---

## Task 2: Install Geist Font

**Files:**
- Create: `public/fonts/GeistVF.woff2`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Download Geist Sans variable font**

```bash
mkdir -p public/fonts
curl -L "https://github.com/vercel/geist-font/releases/latest/download/Geist.zip" -o /tmp/geist.zip
unzip /tmp/geist.zip -d /tmp/geist
# Copy variable font file
cp /tmp/geist/Geist-1.*/fonts/variable/GeistVF.woff2 public/fonts/GeistVF.woff2
```

If the above URL fails, visit https://vercel.com/font and download manually, placing `GeistVF.woff2` in `public/fonts/`.

- [ ] **Step 2: Create root layout with font**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const geist = localFont({
  src: '../../public/fonts/GeistVF.woff2',
  variable: '--font-geist',
  weight: '100 900',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ZION — Private Messenger',
  description: 'No sign-up. No tracking. Just chat.',
  openGraph: {
    title: 'ZION — Private Messenger',
    description: 'No sign-up. No tracking. Just chat.',
    images: [{ url: '/og-image.webp', width: 1200, height: 630 }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="bg-background text-text-primary antialiased">
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Verify font loads**

```bash
npm run dev
```

Open `http://localhost:3000`. Open DevTools → Network → filter by "font". Confirm `GeistVF.woff2` is served from localhost (not Google CDN). Stop server.

- [ ] **Step 4: Commit**

```bash
git add public/fonts/ src/app/layout.tsx
git commit -m "feat: add Geist Sans variable font via next/font/local"
```

---

## Task 3: Tailwind Config + Global Styles

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace `tailwind.config.ts` with design token config**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background:    '#080808',
        surface:       '#111111',
        border:        '#1F1F1F',
        'accent-lime': '#BFFF00',
        'accent-blue': '#00D4FF',
        'text-primary': '#F5F5F5',
        'text-muted':   '#6B6B6B',
      },
      fontFamily: {
        sans: ['var(--font-geist)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero':    ['clamp(3rem, 8vw, 7rem)',   { lineHeight: '1.05', fontWeight: '800' }],
        'section': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.1',  fontWeight: '700' }],
      },
      boxShadow: {
        'lime-glow':  '0 0 24px 4px rgba(191, 255, 0, 0.35)',
        'lime-glow-sm': '0 0 12px 2px rgba(191, 255, 0, 0.2)',
        'blue-glow':  '0 0 24px 4px rgba(0, 212, 255, 0.3)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 12px 2px rgba(191, 255, 0, 0.2)' },
          '50%':      { boxShadow: '0 0 28px 6px rgba(191, 255, 0, 0.45)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Write `src/app/globals.css`**

Replace the generated file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ─── CSS Custom Properties ──────────────────────────────────── */
:root {
  --color-background:    #080808;
  --color-surface:       #111111;
  --color-border:        #1F1F1F;
  --color-accent-lime:   #BFFF00;
  --color-accent-blue:   #00D4FF;
  --color-text-primary:  #F5F5F5;
  --color-text-muted:    #6B6B6B;
}

/* ─── Base Reset ─────────────────────────────────────────────── */
@layer base {
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: var(--color-background);
    color: var(--color-text-primary);
    font-family: var(--font-geist), system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Focus ring — WCAG 2.1 AA */
  :focus-visible {
    outline: 2px solid var(--color-accent-lime);
    outline-offset: 3px;
    border-radius: 2px;
  }

  /* Scrollbar styling (optional, Webkit) */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: var(--color-background);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--color-border);
    border-radius: 3px;
  }
}

/* ─── Component Utilities ────────────────────────────────────── */
@layer components {
  .section-heading {
    @apply text-section text-text-primary font-bold leading-tight;
  }

  .card-base {
    @apply bg-surface border border-border rounded-xl p-6
           transition-colors duration-200
           hover:border-accent-lime/50;
  }
}
```

- [ ] **Step 3: Verify styles compile**

```bash
npm run build
```

Expected: build succeeds, no Tailwind errors. Check `out/` contains CSS with the custom colour values.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts src/app/globals.css
git commit -m "feat: add Luxury Dark Tech design tokens to Tailwind config and global styles"
```

---

## Task 4: Shared Constants & UI Primitives

**Files:**
- Create: `src/lib/constants.ts`
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/SectionWrapper.tsx`

- [ ] **Step 1: Create `src/lib/constants.ts`**

```ts
// Download URLs — replace with live URLs when available
export const DOWNLOAD_URL_IOS     = 'https://apps.apple.com/app/zion'
export const DOWNLOAD_URL_ANDROID = 'https://play.google.com/store/apps/zion'
export const DOWNLOAD_URL_DESKTOP = 'https://zion.chat/download'

// How It Works steps
export const HOW_IT_WORKS_STEPS = [
  {
    id: 1,
    title: 'Generate Seed',
    description: 'Your device creates a unique cryptographic seed. Nothing leaves your device.',
  },
  {
    id: 2,
    title: 'Get Your ID',
    description: 'A UUID is derived from your seed. No email, no phone number required.',
  },
  {
    id: 3,
    title: 'Start Chatting',
    description: 'Share your ID and connect instantly. End-to-end encrypted from the first message.',
  },
] as const

// Feature cards
export const FEATURES = [
  {
    id: 'e2e',
    title: 'End-to-End Encrypted',
    description: 'Every message is encrypted before it leaves your device.',
  },
  {
    id: 'no-logs',
    title: 'Zero Logs, Zero Tracking',
    description: 'We store nothing. Your conversations are yours alone.',
  },
  {
    id: 'no-id',
    title: 'No Phone. No Email.',
    description: 'No personal data required. Ever.',
  },
  {
    id: 'fast',
    title: 'Blazing Fast',
    description: 'Powered by a Rust-based engine for near-instant message delivery.',
  },
  {
    id: 'offline',
    title: 'Resilient Network',
    description: 'Works in low-connectivity environments and recovers gracefully offline.',
  },
  {
    id: 'open',
    title: 'Open Protocol',
    description: 'Built on an open, auditable protocol. No black boxes.',
  },
] as const
```

- [ ] **Step 2: Create `src/components/ui/Button.tsx`**

```tsx
import Link from 'next/link'

type ButtonVariant = 'primary' | 'ghost'

interface ButtonProps {
  href: string
  variant?: ButtonVariant
  children: React.ReactNode
  'aria-label'?: string
  className?: string
}

export function Button({
  href,
  variant = 'primary',
  children,
  'aria-label': ariaLabel,
  className = '',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-200 focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:outline-none'

  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-accent-lime text-background hover:shadow-lime-glow hover:brightness-110 active:scale-95',
    ghost:
      'border border-border text-text-primary hover:border-accent-lime/60 hover:text-accent-lime active:scale-95',
  }

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  )
}
```

- [ ] **Step 3: Create `src/components/ui/SectionWrapper.tsx`**

```tsx
interface SectionWrapperProps {
  id?: string
  'aria-labelledby'?: string
  children: React.ReactNode
  className?: string
}

export function SectionWrapper({
  id,
  'aria-labelledby': ariaLabelledby,
  children,
  className = '',
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      className={`relative w-full px-6 py-24 md:py-32 ${className}`}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/constants.ts src/components/ui/Button.tsx src/components/ui/SectionWrapper.tsx
git commit -m "feat: add constants, Button, and SectionWrapper UI primitives"
```

---

## Task 5: AnimatedReveal + DataFlowBackground

**Files:**
- Create: `src/components/ui/AnimatedReveal.tsx`
- Create: `src/components/ui/DataFlowBackground.tsx`

- [ ] **Step 1: Create `src/components/ui/AnimatedReveal.tsx`**

```tsx
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
```

- [ ] **Step 2: Create `src/components/ui/DataFlowBackground.tsx`**

```tsx
'use client'

import { useEffect, useRef } from 'react'

const NODE_COUNT = 60
const MAX_DIST = 160
const ACCENT = '191, 255, 0' // cyber-lime RGB

interface Node {
  x: number
  y: number
  vx: number
  vy: number
}

export function DataFlowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let nodes: Node[] = []

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function initNodes() {
      if (!canvas) return
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      }))
    }

    function draw() {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update positions
      for (const node of nodes) {
        node.x += node.vx
        node.y += node.vy
        if (node.x < 0 || node.x > canvas.width)  node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.15
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${ACCENT}, ${alpha})`
            ctx.lineWidth = 1
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        ctx.beginPath()
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${ACCENT}, 0.25)`
        ctx.fill()
      }

      animationId = requestAnimationFrame(draw)
    }

    resize()
    initNodes()
    draw()

    const handleResize = () => { resize(); initNodes() }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 h-full w-full"
    />
  )
}
```

- [ ] **Step 3: Create dynamic export wrappers in `src/app/page.tsx` (placeholder)**

This file will be completed in Task 9, but create it now so the build doesn't error:

```tsx
export default function Home() {
  return <main />
}
```

- [ ] **Step 4: Verify build still passes**

```bash
npm run build
```

Expected: clean build, `out/index.html` exists.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/AnimatedReveal.tsx src/components/ui/DataFlowBackground.tsx src/app/page.tsx
git commit -m "feat: add AnimatedReveal scroll-reveal and DataFlowBackground canvas components"
```

---

## Task 6: HeroSection

**Files:**
- Create: `src/components/sections/HeroSection.tsx`

- [ ] **Step 1: Create `src/components/sections/HeroSection.tsx`**

```tsx
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
          className="text-hero max-w-4xl text-text-primary"
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
```

- [ ] **Step 2: Wire into page temporarily and verify visually**

Update `src/app/page.tsx`:

```tsx
import { HeroSection } from '@/components/sections/HeroSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
    </main>
  )
}
```

```bash
npm run dev
```

Open `http://localhost:3000`. Verify: dark background, particle canvas, headline, 3 CTA buttons. Stop server.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/HeroSection.tsx src/app/page.tsx
git commit -m "feat: add HeroSection with DataFlowBackground and CTA buttons"
```

---

## Task 7: HowItWorksSection

**Files:**
- Create: `src/components/sections/HowItWorksSection.tsx`

- [ ] **Step 1: Create `src/components/sections/HowItWorksSection.tsx`**

```tsx
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
        <h2
          id="how-heading"
          className="section-heading mb-16 text-center"
        >
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
```

- [ ] **Step 2: Add to page and verify**

Update `src/app/page.tsx`:

```tsx
import { HeroSection } from '@/components/sections/HeroSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <HowItWorksSection />
    </main>
  )
}
```

```bash
npm run dev
```

Verify: 3 step cards with staggered animation on scroll. Connector line visible on desktop. Stop server.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/HowItWorksSection.tsx src/app/page.tsx
git commit -m "feat: add HowItWorksSection with 3-step cards and connector line"
```

---

## Task 8: FeaturesSection

**Files:**
- Create: `src/components/sections/FeaturesSection.tsx`

- [ ] **Step 1: Create `src/components/sections/FeaturesSection.tsx`**

```tsx
import dynamic from 'next/dynamic'
import { Lock, EyeOff, UserX, Zap, Wifi, Code2 } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FEATURES } from '@/lib/constants'

const AnimatedReveal = dynamic(
  () => import('@/components/ui/AnimatedReveal').then(m => m.AnimatedReveal),
  { ssr: false }
)

// Map feature id → Lucide icon
const ICONS: Record<string, React.ComponentType<{ size?: number; 'aria-hidden'?: boolean | 'true' }>> = {
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
        <h2
          id="features-heading"
          className="section-heading mb-16 text-center"
        >
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
```

- [ ] **Step 2: Add to page and verify**

Update `src/app/page.tsx`:

```tsx
import { HeroSection } from '@/components/sections/HeroSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
    </main>
  )
}
```

```bash
npm run dev
```

Verify: 6 feature cards in 2-column grid (desktop), single column (mobile). Icons in electric-blue. Stop server.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/FeaturesSection.tsx src/app/page.tsx
git commit -m "feat: add FeaturesSection with 6 feature cards and Lucide icons"
```

---

## Task 9: FooterSection + Final Page Assembly

**Files:**
- Create: `src/components/sections/FooterSection.tsx`
- Modify: `src/app/page.tsx` (final)
- Create: `public/logo.svg` (placeholder)

- [ ] **Step 1: Create placeholder `public/logo.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 32" fill="none">
  <text x="0" y="26" font-family="system-ui, sans-serif" font-size="28" font-weight="800" fill="#BFFF00">ZION</text>
</svg>
```

Write to `public/logo.svg`. Replace with final branded asset when available.

- [ ] **Step 2: Create `src/components/sections/FooterSection.tsx`**

```tsx
import Image from 'next/image'
import Link from 'next/link'
import { Github, Twitter } from 'lucide-react'

const FOOTER_LINKS = {
  Product:   [
    { label: 'Download',      href: '#' },
    { label: 'How it Works',  href: '#how-it-works' },
    { label: 'Features',      href: '#features' },
  ],
  Community: [
    { label: 'GitHub',     href: '#' },
    { label: 'X / Twitter', href: '#' },
    { label: 'Forum',      href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Use',   href: '#' },
  ],
}

export function FooterSection() {
  return (
    <footer className="border-t border-border bg-surface px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <Image
              src="/logo.svg"
              alt="ZION"
              width={80}
              height={22}
              unoptimized
            />
            <p className="text-sm text-text-muted">Private by design. Yours by default.</p>
            <div className="mt-2 flex gap-3">
              <Link href="#" aria-label="ZION on GitHub" className="text-text-muted hover:text-accent-lime transition-colors">
                <Github size={18} aria-hidden />
              </Link>
              <Link href="#" aria-label="ZION on X / Twitter" className="text-text-muted hover:text-accent-lime transition-colors">
                <Twitter size={18} aria-hidden />
              </Link>
            </div>
          </div>

          {/* Link Groups */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">
                {group}
              </h4>
              <ul className="flex flex-col gap-2">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted hover:text-text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-xs text-text-muted">© 2026 ZION. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Assemble final `src/app/page.tsx`**

```tsx
import { HeroSection }        from '@/components/sections/HeroSection'
import { HowItWorksSection }  from '@/components/sections/HowItWorksSection'
import { FeaturesSection }    from '@/components/sections/FeaturesSection'
import { FooterSection }      from '@/components/sections/FooterSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <FooterSection />
    </main>
  )
}
```

- [ ] **Step 4: Final build + verify**

```bash
npm run build
```

Expected: clean build, `out/` contains `index.html`, CSS, JS bundles.

```bash
npx serve out
```

Open `http://localhost:3000` (or port shown). Walk through all 4 sections. Verify:
- [ ] Particle canvas visible in hero
- [ ] All 3 download CTAs present
- [ ] 3 How It Works cards animate on scroll
- [ ] 6 feature cards in correct grid
- [ ] Footer renders with link groups

- [ ] **Step 5: Create placeholder `public/og-image.webp`**

The OG metadata in `layout.tsx` references `/og-image.webp`. Create a minimal placeholder so the link is not broken during development:

```bash
# Generate a 1200x630 dark placeholder WebP (requires ImageMagick)
convert -size 1200x630 xc:#080808 -fill "#BFFF00" \
  -font Helvetica -pointsize 72 -gravity center \
  -annotate 0 "ZION" public/og-image.webp

# If ImageMagick is not available, copy any WebP or JPEG as a placeholder:
# cp /path/to/any-image.webp public/og-image.webp
```

Replace with final branded asset before launch.

- [ ] **Step 6: Final commit**

```bash
git add src/components/sections/FooterSection.tsx src/app/page.tsx public/logo.svg public/og-image.webp
git commit -m "feat: add FooterSection and assemble final page — ZION landing page complete"
```
