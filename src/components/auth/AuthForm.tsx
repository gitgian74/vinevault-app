'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/lib/auth/AuthProvider';
import { GDPRConsent } from '@/components/legal/GDPRConsent';

// Validation schemas
const loginSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
});

const registerSchema = loginSchema.extend({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions',
  }),
  gdprConsent: z.object({
    necessary: z.boolean().refine(val => val === true, {
      message: 'Necessary cookies are required for the platform to function',
    }),
    analytics: z.boolean(),
    marketing: z.boolean(),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

interface AuthFormProps {
  mode: 'login' | 'register';
}

export const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [gdprConsent, setGdprConsent] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  const router = useRouter();
  const { login, register } = useAuth();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(mode === 'login' ? loginSchema : registerSchema),
    defaultValues: {
      gdprConsent,
    },
  });

  const handleGdprChange = (consent: typeof gdprConsent) => {
    setGdprConsent(consent);
    setValue('gdprConsent', consent);
  };

  const onSubmit = async (data: RegisterFormData | LoginFormData) => {
    try {
      setIsLoading(true);
      console.log('Form submitted:', { mode, email: data.email });

      if (mode === 'login') {
        console.log('Attempting login...');
        await login(data.email, data.password);
        router.push('/dashboard');
      } else {
        const registerData = data as RegisterFormData;
        console.log('Attempting registration for:', registerData.email);
        
        await register(registerData.email, registerData.password, registerData.name);
        
        console.log('Registration successful, redirecting to login...');
        // Always redirect to login after successful registration
        router.push('/auth/login');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      
      // Show error to user
      alert(`Error: ${error instanceof Error ? error.message : 'Something went wrong'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const isRegisterMode = mode === 'register';

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-wine-800 to-primary-800 flex items-center justify-center px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        <div className="glass rounded-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-2 mb-6">
              <span className="text-3xl">🍷</span>
              <span className="text-2xl font-bold text-white">VineVault</span>
            </Link>
            
            <h1 className="text-2xl font-bold text-white mb-2">
              {isRegisterMode ? 'Create Your Account' : 'Welcome Back'}
            </h1>
            <p className="text-white/80">
              {isRegisterMode 
                ? 'Start your wine investment journey today'
                : 'Sign in to manage your wine portfolio'
              }
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field (Register only) */}
            {isRegisterMode && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                  Full Name
                </label>
                <input
                  {...formRegister('name')}
                  type="text"
                  id="name"
                  className="input-field"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-300">{errors.name.message}</p>
                )}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <input
                {...formRegister('email')}
                type="email"
                id="email"
                className="input-field"
                placeholder="Enter your email"
                autoComplete="email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-300">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  {...formRegister('password')}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="input-field pr-12"
                  placeholder="Enter your password"
                  autoComplete={isRegisterMode ? 'new-password' : 'current-password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-300">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password Field (Register only) */}
            {isRegisterMode && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    {...formRegister('confirmPassword')}
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    className="input-field pr-12"
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-300">{errors.confirmPassword.message}</p>
                )}
              </div>
            )}

            {/* GDPR Consent (Register only) */}
            {isRegisterMode && (
              <div className="space-y-4">
                <GDPRConsent
                  consent={gdprConsent}
                  onChange={handleGdprChange}
                />
                {errors.gdprConsent?.necessary && (
                  <p className="text-sm text-red-300">{errors.gdprConsent.necessary.message}</p>
                )}
              </div>
            )}

            {/* Terms and Conditions (Register only) */}
            {isRegisterMode && (
              <div className="flex items-start space-x-3">
                <input
                  {...formRegister('acceptTerms')}
                  type="checkbox"
                  id="acceptTerms"
                  className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="acceptTerms" className="text-sm text-white/80">
                  I agree to the{' '}
                  <Link href="/terms" className="text-gold-400 hover:text-gold-300 underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-gold-400 hover:text-gold-300 underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            )}
            {errors.acceptTerms && (
              <p className="text-sm text-red-300">{errors.acceptTerms.message}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => console.log('Submit button clicked')}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                isRegisterMode ? 'Create Account' : 'Sign In'
              )}
            </button>

            {/* Forgot Password Link (Login only) */}
            {!isRegisterMode && (
              <div className="text-center">
                <Link 
                  href="/auth/forgot-password" 
                  className="text-gold-400 hover:text-gold-300 text-sm"
                >
                  Forgot your password?
                </Link>
              </div>
            )}

            {/* Switch Mode */}
            <div className="text-center pt-6 border-t border-white/20">
              <p className="text-white/80">
                {isRegisterMode ? 'Already have an account?' : "Don't have an account?"}{' '}
                <Link 
                  href={isRegisterMode ? '/auth/login' : '/auth/register'}
                  className="text-gold-400 hover:text-gold-300 font-medium"
                >
                  {isRegisterMode ? 'Sign In' : 'Create Account'}
                </Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};