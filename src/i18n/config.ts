// Can be imported from a shared config  
export const locales = ['it', 'en', 'de', 'zh', 'ja', 'ru', 'ar'] as const;
export const defaultLocale = 'it' as const;

export type Locale = (typeof locales)[number];

// Language configurations with native names and direction
export const languageConfig = {
  en: {
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
    flag: '🇺🇸'
  },
  it: {
    name: 'Italian',
    nativeName: 'Italiano',
    dir: 'ltr',
    flag: '🇮🇹'
  },
  de: {
    name: 'German',
    nativeName: 'Deutsch',
    dir: 'ltr',
    flag: '🇩🇪'
  },
  zh: {
    name: 'Chinese',
    nativeName: '中文',
    dir: 'ltr',
    flag: '🇨🇳'
  },
  ja: {
    name: 'Japanese',
    nativeName: '日本語',
    dir: 'ltr',
    flag: '🇯🇵'
  },
  ru: {
    name: 'Russian',
    nativeName: 'Русский',
    dir: 'ltr',
    flag: '🇷🇺'
  },
  ar: {
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl',
    flag: '🇸🇦'
  }
} as const;