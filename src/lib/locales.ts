export const DOWNLOAD_URL_IOS     = 'https://apps.apple.com/app/zion'
export const DOWNLOAD_URL_ANDROID = 'https://play.google.com/store/apps/zion'
export const DOWNLOAD_URL_DESKTOP = 'https://zion.chat/download'

export const locales = {
  EN: {
    hero: {
      eyebrow:    'Anonymous · Encrypted · Instant',
      // data-text flat string (no HTML) for glitch ::before/::after
      dataText:   'Private\nmessaging,\nwithout the noise.',
      line1:      'Private',
      line2:      'messaging,',
      line3:      'without the noise.',
      sub:        'No account. No phone number. Generate a seed, get a UUID, start chatting —',
      subAccent:  'in under five seconds.',
      ctaIOS:     'App Store',
      ctaAndroid: 'Google Play',
      ctaDesktop: 'Desktop',
      platforms:  'iOS · Android · macOS · Windows · Linux',
    },
    howItWorks: {
      eyebrow: 'How it works',
      heading: 'Up in seconds.',
      steps: [
        {
          id: 1,
          title: 'Generate Seed',
          description: 'Your device creates a unique cryptographic seed. Nothing leaves your device.',
        },
        {
          id: 2,
          title: 'Get Your UUID',
          description: 'A UUID is derived from your seed. No email, no phone number. Ever.',
        },
        {
          id: 3,
          title: 'Start Chatting',
          description: 'Share your ID and connect instantly. End-to-end encrypted from message one.',
        },
      ],
    },
    features: {
      eyebrow: 'Capabilities',
      heading: 'Built different.',
      items: [
        { id: 'e2e',     title: 'End-to-End Encrypted',    description: 'Every message is encrypted before it leaves your device. No exceptions.' },
        { id: 'no-logs', title: 'Zero Logs, Zero Tracking', description: 'We store nothing. Your conversations are yours alone.' },
        { id: 'no-id',   title: 'No Phone. No Email.',      description: 'UUID-based identity. No personal data required. Ever.' },
        { id: 'fast',    title: 'Blazing Fast',             description: 'Powered by a Rust-based engine for near-instant delivery.' },
        { id: 'offline', title: 'Resilient Network',        description: 'Works in low-connectivity environments. Recovers gracefully offline.' },
        { id: 'open',    title: 'Open Protocol',            description: 'Built on an open, auditable protocol. No black boxes.' },
      ],
    },
    footer: {
      tagline:   'Private by design. Yours by default.',
      copyright: '© 2026 ZION. All rights reserved.',
      protocol:  'End-to-end encrypted · Open protocol',
      groups: {
        Product: [
          { label: 'Download',     href: '#hero' },
          { label: 'How it Works', href: '#how-it-works' },
          { label: 'Features',     href: '#features' },
        ],
        Community: [
          { label: 'GitHub',      href: '#' },
          { label: 'X / Twitter', href: '#' },
          { label: 'Forum',       href: '#' },
        ],
        Legal: [
          { label: 'Privacy Policy', href: '#' },
          { label: 'Terms of Use',   href: '#' },
        ],
      },
    },
  },

  UA: {
    hero: {
      eyebrow:    'Анонімно · Зашифровано · Миттєво',
      dataText:   'Приватні\nповідомлення,\nбез зайвого.',
      line1:      'Приватні',
      line2:      'повідомлення,',
      line3:      'без зайвого.',
      sub:        'Без акаунту. Без номера. Згенеруй ключ, отримай UUID, починай спілкуватись —',
      subAccent:  'за п\'ять секунд.',
      ctaIOS:     'App Store',
      ctaAndroid: 'Google Play',
      ctaDesktop: 'Десктоп',
      platforms:  'iOS · Android · macOS · Windows · Linux',
    },
    howItWorks: {
      eyebrow: 'Як це працює',
      heading: 'За секунди.',
      steps: [
        {
          id: 1,
          title: 'Генерація ключа',
          description: 'Пристрій створює унікальний криптографічний ключ. Нічого не залишає ваш пристрій.',
        },
        {
          id: 2,
          title: 'Отримай UUID',
          description: 'UUID генерується з вашого ключа. Жодної пошти, жодного номера телефону.',
        },
        {
          id: 3,
          title: 'Починай спілкуватись',
          description: 'Поділись своїм ID та підключайся миттєво. Наскрізне шифрування від першого повідомлення.',
        },
      ],
    },
    features: {
      eyebrow: 'Можливості',
      heading: 'Зроблено інакше.',
      items: [
        { id: 'e2e',     title: 'Наскрізне шифрування',     description: 'Кожне повідомлення шифрується до того, як залишить ваш пристрій.' },
        { id: 'no-logs', title: 'Нуль логів, нуль стеження', description: 'Ми нічого не зберігаємо. Ваші розмови належать лише вам.' },
        { id: 'no-id',   title: 'Без телефону. Без пошти.',  description: 'UUID-ідентифікація. Ніяких персональних даних. Ніколи.' },
        { id: 'fast',    title: 'Блискавично швидко',        description: 'Двигун на Rust забезпечує миттєву доставку повідомлень.' },
        { id: 'offline', title: 'Стійка мережа',             description: 'Працює при поганому з\'єднанні та відновлюється після розриву.' },
        { id: 'open',    title: 'Відкритий протокол',        description: 'Побудовано на відкритому, перевіреному протоколі. Ніяких чорних скринь.' },
      ],
    },
    footer: {
      tagline:   'Приватність за замовчуванням.',
      copyright: '© 2026 ZION. Усі права захищені.',
      protocol:  'Наскрізне шифрування · Відкритий протокол',
      groups: {
        Product: [
          { label: 'Завантажити',    href: '#hero' },
          { label: 'Як це працює',   href: '#how-it-works' },
          { label: 'Можливості',     href: '#features' },
        ],
        Community: [
          { label: 'GitHub',         href: '#' },
          { label: 'X / Twitter',    href: '#' },
          { label: 'Форум',          href: '#' },
        ],
        Legal: [
          { label: 'Конфіденційність',    href: '#' },
          { label: 'Умови використання',  href: '#' },
        ],
      },
    },
  },
} as const

export type Lang   = keyof typeof locales
export type Locale = typeof locales.EN
