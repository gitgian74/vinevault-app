'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, GlobeAltIcon, CheckIcon } from '@heroicons/react/24/outline';
import { languageConfig, type Locale, locales } from '@/i18n/config';

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
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
    
    // Don't do anything if selecting the same language
    if (newLocale === locale) return;
    
    // Get the current pathname segments
    const segments = pathname.split('/').filter(Boolean);
    
    // Check if first segment is a locale
    const hasLocalePrefix = segments.length > 0 && locales.includes(segments[0] as Locale);
    
    // Build path without locale
    let pathWithoutLocale = pathname;
    if (hasLocalePrefix) {
      pathWithoutLocale = '/' + segments.slice(1).join('/');
    }
    
    // Ensure pathWithoutLocale is at least '/'
    if (!pathWithoutLocale || pathWithoutLocale === '') {
      pathWithoutLocale = '/';
    }
    
    // Create new path with correct locale handling
    let newPath;
    if (newLocale === 'it') {
      // Italian doesn't need prefix
      newPath = pathWithoutLocale;
    } else {
      // Other languages need prefix
      newPath = `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
    }
    
    // Use window.location for a full page refresh to ensure locale is properly loaded
    window.location.href = newPath;
  };

  const currentLanguage = languageConfig[locale];

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold-400/50"
        aria-label="Change language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
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
            className="absolute top-full mt-2 right-0 min-w-52 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50"
            role="listbox"
            aria-label="Select language"
          >
            <div className="py-1">
              {Object.entries(languageConfig).map(([code, config]) => {
                const isActive = code === locale;
                const isRTL = config.dir === 'rtl';
                
                return (
                  <button
                    key={code}
                    onClick={() => handleLanguageChange(code as Locale)}
                    disabled={isActive}
                    className={`
                      w-full px-4 py-3 flex items-center gap-3 transition-all duration-150
                      ${isActive 
                        ? 'bg-primary-50 text-primary-700 cursor-default' 
                        : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                      }
                    `}
                    dir={config.dir}
                    role="option"
                    aria-selected={isActive}
                  >
                    <span className="text-xl flex-shrink-0">{config.flag}</span>
                    <div className={`flex flex-col flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                      <span className="font-medium text-sm leading-tight">
                        {config.nativeName}
                      </span>
                      <span className="text-xs text-gray-500 leading-tight">
                        {config.name}
                      </span>
                    </div>
                    {isActive && (
                      <CheckIcon className="w-4 h-4 text-primary-600 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
            
            <div className="border-t border-gray-100 px-4 py-2 bg-gray-50">
              <p className="text-xs text-gray-500 text-center">
                {Object.keys(languageConfig).length} languages available
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};