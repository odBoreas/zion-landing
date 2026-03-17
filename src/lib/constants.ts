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
