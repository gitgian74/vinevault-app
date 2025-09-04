import { AuthForm } from '@/components/auth/AuthForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - VineVault',
  description: 'Sign in to your VineVault account to manage your wine investment portfolio.',
};

export default function LoginPage() {
  return <AuthForm mode="login" />;
}