'use client';

import { useAuth } from '@/lib/auth/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { 
  ChartBarIcon, 
  CurrencyDollarIcon, 
  TrophyIcon,
  UserIcon,
  ArrowRightOnRectangleIcon 
} from '@heroicons/react/24/outline';

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-900 via-wine-800 to-primary-800 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null; // Redirect will happen in useEffect
  }

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-wine-800 to-primary-800">
      {/* Navigation */}
      <nav className="border-b border-white/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🍷</span>
            <span className="text-xl font-bold text-white">VineVault</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-white">
              <UserIcon className="h-5 w-5" />
              <span>Welcome, {user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome to Your Wine Portfolio
          </h1>
          <p className="text-white/80">
            Manage your premium vineyard investments and track your returns
          </p>
        </div>

        {/* Demo Notice */}
        <div className="glass rounded-lg p-4 mb-8 border border-gold-400/30">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-gold-400 text-lg">🧪</span>
            <h3 className="text-gold-400 font-semibold">Demo Mode</h3>
          </div>
          <p className="text-white/90 text-sm">
            You're currently using VineVault in demo mode. All data shown is simulated. 
            To access real vineyard investments, contact our team to set up your production account.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="wine-card">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <CurrencyDollarIcon className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Portfolio Value</p>
                <p className="text-2xl font-bold text-white">$12,450</p>
                <p className="text-green-400 text-sm">+8.5% this month</p>
              </div>
            </div>
          </div>

          <div className="wine-card">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-primary-500/20 rounded-lg">
                <ChartBarIcon className="h-6 w-6 text-primary-400" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Total Vines Owned</p>
                <p className="text-2xl font-bold text-white">47</p>
                <p className="text-primary-400 text-sm">Across 3 vineyards</p>
              </div>
            </div>
          </div>

          <div className="wine-card">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gold-500/20 rounded-lg">
                <TrophyIcon className="h-6 w-6 text-gold-400" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Expected Annual Return</p>
                <p className="text-2xl font-bold text-white">12.3%</p>
                <p className="text-gold-400 text-sm">Above market average</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="wine-card">
            <h3 className="text-xl font-semibold text-white mb-4">My Investments</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <div>
                  <p className="text-white font-medium">Château Margaux</p>
                  <p className="text-white/60 text-sm">15 vines • Bordeaux, France</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">$5,985</p>
                  <p className="text-green-400 text-sm">+12.4%</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <div>
                  <p className="text-white font-medium">Opus One</p>
                  <p className="text-white/60 text-sm">20 vines • Napa Valley, USA</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">$5,980</p>
                  <p className="text-green-400 text-sm">+10.8%</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <div>
                  <p className="text-white font-medium">Tenuta San Guido</p>
                  <p className="text-white/60 text-sm">12 vines • Tuscany, Italy</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">$2,388</p>
                  <p className="text-green-400 text-sm">+15.2%</p>
                </div>
              </div>
            </div>
            
            <Link 
              href="/investments" 
              className="btn-secondary w-full mt-4 text-center inline-block"
            >
              View All Investments
            </Link>
          </div>

          <div className="wine-card">
            <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 py-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-white text-sm">Dividend received from Château Margaux</p>
                  <p className="text-white/60 text-xs">2 days ago</p>
                </div>
                <p className="text-green-400 font-medium">+$245</p>
              </div>
              
              <div className="flex items-center space-x-3 py-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-white text-sm">New investment in Opus One</p>
                  <p className="text-white/60 text-xs">1 week ago</p>
                </div>
                <p className="text-blue-400 font-medium">5 vines</p>
              </div>
              
              <div className="flex items-center space-x-3 py-2">
                <div className="w-2 h-2 bg-gold-400 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-white text-sm">Portfolio valuation updated</p>
                  <p className="text-white/60 text-xs">2 weeks ago</p>
                </div>
                <p className="text-gold-400 font-medium">+8.2%</p>
              </div>
            </div>
            
            <Link 
              href="/activity" 
              className="btn-secondary w-full mt-4 text-center inline-block"
            >
              View Full Activity
            </Link>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <div className="wine-card max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-white mb-2">
              Ready to Expand Your Portfolio?
            </h3>
            <p className="text-white/80 mb-4">
              Discover new premium vineyard investment opportunities
            </p>
            <Link href="/" className="btn-primary">
              Explore Vineyards
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}