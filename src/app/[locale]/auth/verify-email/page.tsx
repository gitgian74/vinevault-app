import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Verify Email - VineVault',
  description: 'Please check your email to verify your VineVault account.',
};

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-wine-800 to-primary-800 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="glass rounded-2xl p-8 text-center">
          {/* Header */}
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <span className="text-3xl">🍷</span>
            <span className="text-2xl font-bold text-white">VineVault</span>
          </Link>
          
          {/* Success Icon */}
          <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
            <CheckCircleIcon className="w-8 h-8 text-green-400" />
          </div>

          {/* Content */}
          <h1 className="text-2xl font-bold text-white mb-4">
            Check Your Email
          </h1>
          
          <p className="text-white/80 mb-6 leading-relaxed">
            We've sent a verification link to your email address. Please check your inbox 
            and click the link to activate your VineVault account.
          </p>

          <div className="bg-white/10 border border-white/20 rounded-lg p-4 mb-6">
            <p className="text-white/90 text-sm">
              <strong>Didn't receive the email?</strong><br />
              Check your spam folder or contact support if you need assistance.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <Link 
              href="/auth/login" 
              className="btn-primary w-full inline-block text-center"
            >
              Back to Login
            </Link>
            
            <Link 
              href="/" 
              className="btn-secondary w-full inline-block text-center"
            >
              Return Home
            </Link>
          </div>

          {/* Help Text */}
          <p className="text-white/60 text-sm mt-6">
            Need help? Contact us at{' '}
            <a 
              href="mailto:support@vinevault.com" 
              className="text-gold-400 hover:text-gold-300"
            >
              support@vinevault.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}