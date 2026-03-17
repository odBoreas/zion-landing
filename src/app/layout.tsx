import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const geist = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist',
  weight: '100 900',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://zion.chat'),
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
        {/* Global scanline — crawls top→bottom on every page */}
        <div className="scanline" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
