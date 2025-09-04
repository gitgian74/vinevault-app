import { Inter, Playfair_Display } from 'next/font/google';
import { locales } from '@/i18n/config';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  preload: false, // Solo quando necessario
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This root layout only provides font variables to the locale layout
  // The actual html/body structure is handled by [locale]/layout.tsx
  return children;
}