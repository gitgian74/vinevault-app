import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import '../globals.css';
import { AuthProvider } from '@/lib/auth/AuthProvider';
import { ToastProvider } from '@/components/ui/ToastProvider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, languageConfig } from '@/i18n/config';

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
  preload: false,
});

export const metadata: Metadata = {
  title: 'VineVault - Premium Wine Investment Platform',
  description: 'Invest in premium vineyards worldwide with blockchain-certified ownership. Secure, transparent, and profitable wine investments.',
  keywords: 'wine investment, vineyard ownership, blockchain certification, premium wines, investment platform',
  authors: [{ name: 'VineVault Team' }],
  creator: 'VineVault',
  publisher: 'VineVault',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vinevault.com',
    siteName: 'VineVault',
    title: 'VineVault - Premium Wine Investment Platform',
    description: 'Invest in premium vineyards worldwide with blockchain-certified ownership.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VineVault - Wine Investment Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VineVault - Premium Wine Investment Platform',
    description: 'Invest in premium vineyards worldwide with blockchain-certified ownership.',
    images: ['/og-image.jpg'],
  },
};

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#7c3aed',
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages({ locale });
  
  const currentLangConfig = languageConfig[locale as keyof typeof languageConfig];

  return (
    <html 
      lang={locale} 
      dir={currentLangConfig?.dir || 'ltr'}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#7c3aed" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <ToastProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </ToastProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}