import { AuthForm } from '@/components/auth/AuthForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Account - VineVault',
  description: 'Join VineVault and start investing in premium vineyards worldwide with blockchain-certified ownership.',
};

export default function RegisterPage() {
  return <AuthForm mode="register" />;
}