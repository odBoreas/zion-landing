# ZION — Landing Page Design Spec
**Date:** 2026-03-17
**Status:** Approved
**Architecture:** Next.js Static Export · TypeScript · Tailwind CSS · Framer Motion

---

## 1. Project Overview

A high-performance, purely static multi-block landing page for **ZION** — an anonymous messenger. The page showcases the product and drives cross-platform downloads. No backend calls, no registration flows, no references to underlying protocols on the public surface.

**Core message:** Zero friction. Generate a seed. Get an ID. Start chatting. Private by default.

---

## 2. Architecture

### Stack
| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router) | Static export, `next/image`, `<Metadata>` SEO, file-based routing |
| Export mode | `output: 'export'` | Flat HTML/CSS/JS, deployable anywhere |
| Language | TypeScript (strict) | Type safety throughout |
| Styling | Tailwind CSS v3 + CSS custom properties | Design token system, utility-first |
| Fonts | Geist Sans via `next/font/local` | Font files committed to `public/fonts/`; zero runtime CDN requests; privacy-consistent |
| Animation | Framer Motion | Scroll reveals, staggered entries |
| Background FX | Canvas API (plain `useEffect`) | DataFlowBackground particle animation; `aria-hidden`; no SSR |
| Images | `next/image` with `unoptimized: true` | Static export requires this; **all source assets must be pre-converted to WebP ≤ 200KB before committing** |

### Project Structure
```
src/
  app/
    layout.tsx          # Root layout, font injection, metadata
    page.tsx            # Page composition (imports all sections)
    globals.css         # CSS custom properties + Tailwind base
  components/
    sections/
      HeroSection.tsx
      HowItWorksSection.tsx
      FeaturesSection.tsx
      FooterSection.tsx
    ui/
      Button.tsx
      SectionWrapper.tsx    # Handles padding, max-width, centering
      AnimatedReveal.tsx    # Framer Motion scroll-reveal wrapper (dynamic import)
      DataFlowBackground.tsx  # Canvas particle animation (lazy via next/dynamic)
  lib/
    constants.ts        # Download URLs, copy strings
next.config.ts
tailwind.config.ts
```

### Download URL Constants (`lib/constants.ts`)
```ts
export const DOWNLOAD_URL_IOS     = 'https://apps.apple.com/app/zion'      // placeholder
export const DOWNLOAD_URL_ANDROID = 'https://play.google.com/store/apps/zion' // placeholder
export const DOWNLOAD_URL_DESKTOP = 'https://zion.chat/download'             // placeholder
```
These are the canonical constant names. Replace placeholder values when URLs are live.

### Asset Inventory
| Asset | Location | Notes |
|---|---|---|
| Logo (SVG) | `public/logo.svg` | To be provided; used in Hero and Footer |
| OG Image | `public/og-image.webp` | 1200×630, dark card, pre-optimized |
| Geist Sans font files | `public/fonts/` | Variable font, woff2 format |
| Feature icons | Lucide React (`lucide-react` package) | No custom SVGs needed |
| Hero background | `DataFlowBackground` canvas | No image file — generated at runtime |

---

## 3. Design Language — Luxury Dark Tech

### Color Palette
```
Background:     #080808  (near-black, primary surfaces)
Surface:        #111111  (cards, elevated elements)
Border:         #1F1F1F  (subtle separators)
Accent Primary: #BFFF00  (cyber-lime — CTAs, highlights, active states)
Accent Alt:     #00D4FF  (electric-blue — secondary highlights, icons)
Text Primary:   #F5F5F5  (body, headings)
Text Muted:     #6B6B6B  (captions, labels)
```

### Typography
- **Font:** Geist Sans (variable weight 400–800), loaded via `next/font/local`
- **Scale:**
  - Hero heading: `clamp(3rem, 8vw, 7rem)` / weight 800
  - Section heading: `clamp(2rem, 4vw, 3.5rem)` / weight 700
  - Body: `1rem` / weight 400
  - Labels/captions: `0.75rem` / weight 500 / uppercase + letter-spacing

### Breakpoints
Use Tailwind CSS v3 defaults:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

All "mobile" references in this spec mean `< md (768px)`. All "desktop" references mean `≥ lg (1024px)`.

### Motion Principles
- **Scroll reveals:** Framer Motion `useInView` + `AnimatedReveal` wrapper — fade-up on enter, `once: true`
- **Stagger:** Section children stagger 80ms apart via `variants` + `staggerChildren`
- **`AnimatedReveal`** is loaded via `next/dynamic` with `{ ssr: false }` to avoid hydration mismatch
- **`DataFlowBackground`** is loaded via `next/dynamic` with `{ ssr: false }` — plain Canvas API, not Framer Motion. Small nodes connected by lines, slow drift, cyber-lime color, opacity 0.15
- **CTA button:** subtle `box-shadow` glow pulse on hover (CSS transition, no JS)
- No autoplay video, no heavy GIFs

---

## 4. Page Sections

### 4.1 Hero Section
- **Full viewport height**, centered content
- Headline: bold, large, white — e.g. *"Private. Instant. Yours."*
- Subheadline: one sentence value prop — no technical jargon
- CTA group: 3 download buttons using `DOWNLOAD_URL_IOS`, `DOWNLOAD_URL_ANDROID`, `DOWNLOAD_URL_DESKTOP`
  — primary style (cyber-lime bg, black text) for iOS; ghost/outline style for Android and Desktop
- Background: `DataFlowBackground` canvas, `position: fixed`, full bleed, `aria-hidden="true"`
- Scroll-indicator chevron at bottom (SVG icon, `aria-hidden="true"`)

### 4.2 How It Works (3-Step)
- Section heading: *"Up in seconds."*
- **Exactly 3 cards** in a horizontal row (single column on `< md`):
  1. **Generate Seed** — icon + short description
  2. **Get Your ID** — icon + short description
  3. **Start Chatting** — icon + short description
- Visual connector line between cards on `≥ lg` only (CSS `::after` pseudo-element)
- Staggered `AnimatedReveal` entrance

### 4.3 Features
- Section heading: *"Built different."*
- **Exactly 6 feature cards** in a 2-column grid (`grid-cols-1` on mobile, `grid-cols-2` on `≥ md`)
- 6 fixed items (no variation):
  1. End-to-end encrypted
  2. Zero logs, zero tracking
  3. No phone number, no email
  4. Blazing fast (Rust-powered engine)
  5. Works offline · resilient network
  6. Open protocol
- Each card: Lucide icon, title, 1-line description
- Card style: `Surface` background, `Border` border; hover → border brightens to `Accent Primary`

### 4.4 Footer
- Logo (`public/logo.svg`) + tagline
- 3 link groups: Product · Community · Legal
- Social icons: GitHub, X/Twitter (Lucide)
- Copyright line: `© 2026 ZION`
- No heavy visuals

---

## 5. Performance Targets
- Lighthouse Performance: ≥ 95
- Geist Sans self-hosted via `next/font/local` — zero runtime CDN requests
- All source images committed as WebP, ≤ 200KB (developer responsibility; `unoptimized: true` skips Next.js processing)
- `AnimatedReveal` and `DataFlowBackground` loaded with `next/dynamic` + `ssr: false`

---

## 6. Accessibility (WCAG 2.1 AA)
- All interactive elements (buttons, links) must have visible focus rings — use Tailwind `focus-visible:ring-2 focus-visible:ring-[#BFFF00]`
- `DataFlowBackground` canvas: `aria-hidden="true"` — purely decorative
- Scroll chevron SVG: `aria-hidden="true"`
- All Lucide icons used decoratively: `aria-hidden={true}`
- CTAs: descriptive `aria-label` where icon-only, e.g. `aria-label="Download for iOS"`
- Color contrast: Text Primary (`#F5F5F5`) on Background (`#080808`) = 19.3:1 ✓; Accent on Background = check at implementation
- Semantic HTML: `<main>`, `<section>` with `aria-labelledby`, `<footer>`, `<nav>`

---

## 7. SEO & Meta
- `<title>`: "ZION — Private Messenger"
- `<meta description>`: "No sign-up. No tracking. Just chat."
- OG image: `public/og-image.webp` (1200×630)
- `robots.txt`: allow all
- `sitemap.xml`: single entry

---

## 8. Deployment
- `next build` → `out/` directory
- Compatible with: Vercel (static), Netlify, Cloudflare Pages, any static host
- No environment variables required for production

---

## 9. Out of Scope
- Actual messenger functionality
- API routes / server components with runtime data
- User accounts, forms, analytics SDK
- Internationalisation (i18n) — English only for v1
