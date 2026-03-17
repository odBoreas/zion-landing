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

  RU: {
    hero: {
      eyebrow:    'Анонимно · Зашифровано · Мгновенно',
      dataText:   'Приватные\nсообщения,\nбез лишнего.',
      line1:      'Приватные',
      line2:      'сообщения,',
      line3:      'без лишнего.',
      sub:        'Без аккаунта. Без номера телефона. Сгенерируй ключ, получи UUID, начни общаться —',
      subAccent:  'за пять секунд.',
      ctaIOS:     'App Store',
      ctaAndroid: 'Google Play',
      ctaDesktop: 'Десктоп',
      platforms:  'iOS · Android · macOS · Windows · Linux',
    },
    howItWorks: {
      eyebrow: 'Как это работает',
      heading: 'За секунды.',
      steps: [
        {
          id: 1,
          title: 'Генерация ключа',
          description: 'Устройство создаёт уникальный криптографический ключ. Ничего не покидает ваше устройство.',
        },
        {
          id: 2,
          title: 'Получи UUID',
          description: 'UUID генерируется из вашего ключа. Никакой почты, никакого номера телефона.',
        },
        {
          id: 3,
          title: 'Начни общаться',
          description: 'Поделись своим ID и подключайся мгновенно. Сквозное шифрование с первого сообщения.',
        },
      ],
    },
    features: {
      eyebrow: 'Возможности',
      heading: 'Сделано иначе.',
      items: [
        { id: 'e2e',     title: 'Сквозное шифрование',       description: 'Каждое сообщение шифруется до того, как покинет ваше устройство.' },
        { id: 'no-logs', title: 'Ноль логов, ноль слежки',   description: 'Мы ничего не храним. Ваши переписки принадлежат только вам.' },
        { id: 'no-id',   title: 'Без телефона. Без почты.',   description: 'UUID-идентификация. Никаких персональных данных. Никогда.' },
        { id: 'fast',    title: 'Молниеносная скорость',      description: 'Движок на Rust обеспечивает мгновенную доставку сообщений.' },
        { id: 'offline', title: 'Устойчивая сеть',            description: 'Работает при слабом соединении и восстанавливается после разрыва.' },
        { id: 'open',    title: 'Открытый протокол',          description: 'Построено на открытом, проверяемом протоколе. Никаких чёрных ящиков.' },
      ],
    },
    footer: {
      tagline:   'Приватность по умолчанию.',
      copyright: '© 2026 ZION. Все права защищены.',
      protocol:  'Сквозное шифрование · Открытый протокол',
      groups: {
        Product: [
          { label: 'Скачать',        href: '#hero' },
          { label: 'Как работает',   href: '#how-it-works' },
          { label: 'Возможности',    href: '#features' },
        ],
        Community: [
          { label: 'GitHub',         href: '#' },
          { label: 'X / Twitter',    href: '#' },
          { label: 'Форум',          href: '#' },
        ],
        Legal: [
          { label: 'Конфиденциальность', href: '#' },
          { label: 'Условия использования', href: '#' },
        ],
      },
    },
  },
} as const

export type Lang   = keyof typeof locales
export type Locale = typeof locales.EN
