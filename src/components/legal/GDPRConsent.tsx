'use client';

import { useState } from 'react';
import Link from 'next/link';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

interface ConsentOptions {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface GDPRConsentProps {
  consent: ConsentOptions;
  onChange: (consent: ConsentOptions) => void;
}

export const GDPRConsent: React.FC<GDPRConsentProps> = ({ consent, onChange }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleConsentChange = (key: keyof ConsentOptions, value: boolean) => {
    onChange({
      ...consent,
      [key]: value,
    });
  };

  return (
    <div className="space-y-4 p-4 bg-white/5 rounded-lg border border-white/10">
      <div className="flex items-center space-x-2">
        <InformationCircleIcon className="h-5 w-5 text-gold-400" />
        <h3 className="text-white font-medium">Privacy & Cookies</h3>
        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className="text-gold-400 hover:text-gold-300 text-sm underline"
        >
          {showDetails ? 'Hide Details' : 'Learn More'}
        </button>
      </div>

      {showDetails && (
        <div className="text-sm text-white/80 space-y-3 border-t border-white/10 pt-3">
          <p>
            We use cookies to enhance your experience and provide our services. 
            Please choose your preferences below.
          </p>
          <p>
            For more information, please read our{' '}
            <Link href="/privacy" className="text-gold-400 hover:text-gold-300 underline">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link href="/cookies" className="text-gold-400 hover:text-gold-300 underline">
              Cookie Policy
            </Link>.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {/* Necessary Cookies - Required */}
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="necessary"
            checked={consent.necessary}
            onChange={(e) => handleConsentChange('necessary', e.target.checked)}
            disabled
            className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded opacity-50"
          />
          <div className="flex-1">
            <label htmlFor="necessary" className="text-white text-sm font-medium">
              Essential Cookies <span className="text-red-400">*</span>
            </label>
            <p className="text-white/70 text-xs mt-1">
              Required for authentication, security, and core platform functionality. 
              These cannot be disabled.
            </p>
          </div>
        </div>

        {/* Analytics Cookies - Optional */}
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="analytics"
            checked={consent.analytics}
            onChange={(e) => handleConsentChange('analytics', e.target.checked)}
            className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <div className="flex-1">
            <label htmlFor="analytics" className="text-white text-sm font-medium">
              Analytics Cookies
            </label>
            <p className="text-white/70 text-xs mt-1">
              Help us understand how you use our platform to improve user experience. 
              Data is anonymized and used for statistical purposes only.
            </p>
          </div>
        </div>

        {/* Marketing Cookies - Optional */}
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="marketing"
            checked={consent.marketing}
            onChange={(e) => handleConsentChange('marketing', e.target.checked)}
            className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <div className="flex-1">
            <label htmlFor="marketing" className="text-white text-sm font-medium">
              Marketing Cookies
            </label>
            <p className="text-white/70 text-xs mt-1">
              Used to personalize content and show relevant offers. 
              You can withdraw consent at any time in your account settings.
            </p>
          </div>
        </div>
      </div>

      <div className="text-xs text-white/60 border-t border-white/10 pt-3">
        <p>
          🔒 Your privacy is important to us. We comply with GDPR regulations and 
          give you full control over your data. You can change these preferences 
          anytime in your account settings.
        </p>
      </div>
    </div>
  );
};