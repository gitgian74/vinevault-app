'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { languageConfig, type Locale } from '@/i18n/config';

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as Locale;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (newLocale: Locale) => {
    setIsOpen(false);
    
    // Get current pathname without locale
    const currentPath = pathname;
    
    // Remove current locale from path if present
    let pathWithoutLocale = currentPath;
    if (currentPath.startsWith(`/${locale}`)) {
      pathWithoutLocale = currentPath.slice(locale.length + 1) || '/';
    }
    
    // Build new URL based on whether it's the default locale
    let newUrl;
    if (newLocale === 'it') {
      // Italian (default) doesn't need prefix
      newUrl = pathWithoutLocale === '/' ? '/' : pathWithoutLocale;
    } else {
      // Other languages need prefix
      newUrl = `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
    }
    
    // Use window.location for full page reload to ensure proper locale loading
    window.location.href = newUrl;
  };

  const currentLanguage = languageConfig[locale];

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold-400/50"
        aria-label="Change language"
      >
        <GlobeAltIcon className="w-4 h-4" />
        <span className="text-sm font-medium">
          {currentLanguage.flag} {currentLanguage.nativeName}
        </span>
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 right-0 min-w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
          >
            {Object.entries(languageConfig).map(([code, config]) => {
              const isActive = code === locale;
              return (
                <button
                  key={code}
                  onClick={() => handleLanguageChange(code as Locale)}
                  className={`w-full px-4 py-3 text-left flex items-center space-x-3 hover:bg-gray-50 transition-colors duration-150 ${
                    isActive ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
                  }`}
                  dir={config.dir}
                >
                  <span className="text-lg">{config.flag}</span>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{config.nativeName}</span>
                    <span className="text-xs text-gray-500">{config.name}</span>
                  </div>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-primary-600 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};