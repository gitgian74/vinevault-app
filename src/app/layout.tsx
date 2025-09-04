import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth/AuthProvider';
import { ToastProvider } from '@/components/ui/ToastProvider';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#7c3aed" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className="font-sans">
        <ToastProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}