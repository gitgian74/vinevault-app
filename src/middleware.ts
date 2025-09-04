import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['it', 'en', 'de', 'zh', 'ja', 'ru', 'ar'],
  
  // Used when no locale matches - MUST be Italian
  defaultLocale: 'it',
  
  // Hide default locale prefix for Italian only
  localePrefix: 'as-needed',
  
  // Disable automatic locale detection based on browser
  localeDetection: false
});

export const config = {
  // Match all pages except static files and api routes
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};