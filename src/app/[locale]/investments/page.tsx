'use client';

import { useAuth } from '@/lib/auth/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeftIcon,
  MapPinIcon,
  TrophyIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface Investment {
  id: string;
  vineyardName: string;
  region: string;
  country: string;
  vilesOwned: number;
  totalInvested: number;
  currentValue: number;
  returnPercentage: number;
  annualDividend: number;
  purchaseDate: string;
  rating: string;
  imageUrl?: string;
  status: 'active' | 'sold' | 'pending';
}

const mockInvestments: Investment[] = [
  {
    id: '1',
    vineyardName: 'Château Margaux',
    region: 'Bordeaux',
    country: 'France',
    vilesOwned: 15,
    totalInvested: 4500,
    currentValue: 5985,
    returnPercentage: 33.0,
    annualDividend: 450,
    purchaseDate: '2025-07-30',
    rating: 'AAA',
    status: 'active'
  },
  {
    id: '2',
    vineyardName: 'Opus One',
    region: 'Napa Valley',
    country: 'USA',
    vilesOwned: 20,
    totalInvested: 6000,
    currentValue: 5980,
    returnPercentage: -0.33,
    annualDividend: 520,
    purchaseDate: '2025-08-05',
    rating: 'AA+',
    status: 'active'
  },
  {
    id: '3',
    vineyardName: 'Tenuta San Guido',
    region: 'Tuscany',
    country: 'Italy',
    vilesOwned: 12,
    totalInvested: 2400,
    currentValue: 2388,
    returnPercentage: -0.5,
    annualDividend: 280,
    purchaseDate: '2025-08-15',
    rating: 'AA',
    status: 'active'
  }
];

export default function InvestmentsPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [investments] = useState<Investment[]>(mockInvestments);
  const [sortBy, setSortBy] = useState<string>('currentValue');
  const [filterStatus, setFilterStatus] = useState<string>('all');

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
          <p>Loading your investments...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const totalPortfolioValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalInvested = investments.reduce((sum, inv) => sum + inv.totalInvested, 0);
  const totalReturn = ((totalPortfolioValue - totalInvested) / totalInvested) * 100;
  const totalVines = investments.reduce((sum, inv) => sum + inv.vilesOwned, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'AAA':
        return 'text-green-400 bg-green-400/20';
      case 'AA+':
        return 'text-blue-400 bg-blue-400/20';
      case 'AA':
        return 'text-gold-400 bg-gold-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-wine-800 to-primary-800">
      {/* Navigation */}
      <nav className="border-b border-white/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors">
              <ArrowLeftIcon className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
          
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🍷</span>
            <span className="text-xl font-bold text-white">VineVault</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              My Investments
            </h1>
            <p className="text-white/80">
              Manage your premium vineyard investment portfolio
            </p>
          </div>

          {/* Portfolio Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="wine-card">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <CurrencyDollarIcon className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">Total Value</p>
                  <p className="text-2xl font-bold text-white">{formatCurrency(totalPortfolioValue)}</p>
                </div>
              </div>
            </div>

            <div className="wine-card">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-primary-500/20 rounded-lg">
                  <ChartBarIcon className="h-6 w-6 text-primary-400" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">Total Vines</p>
                  <p className="text-2xl font-bold text-white">{totalVines}</p>
                </div>
              </div>
            </div>

            <div className="wine-card">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gold-500/20 rounded-lg">
                  <ArrowTrendingUpIcon className="h-6 w-6 text-gold-400" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">Total Return</p>
                  <p className={`text-2xl font-bold ${totalReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {totalReturn >= 0 ? '+' : ''}{totalReturn.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>

            <div className="wine-card">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <TrophyIcon className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">Investments</p>
                  <p className="text-2xl font-bold text-white">{investments.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Investments List */}
          <div className="wine-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Investment Details</h2>
              <div className="flex items-center space-x-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
                >
                  <option value="currentValue">Sort by Value</option>
                  <option value="returnPercentage">Sort by Return</option>
                  <option value="purchaseDate">Sort by Date</option>
                  <option value="vilesOwned">Sort by Vines</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {investments.map((investment, index) => (
                <motion.div
                  key={investment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-white">
                          {investment.vineyardName}
                        </h3>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getRatingColor(investment.rating)}`}>
                          {investment.rating}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-white/70 mb-3">
                        <MapPinIcon className="h-4 w-4" />
                        <span className="text-sm">{investment.region}, {investment.country}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-white/70">
                        <CalendarIcon className="h-4 w-4" />
                        <span className="text-sm">Invested on {formatDate(investment.purchaseDate)}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-white mb-1">
                        {formatCurrency(investment.currentValue)}
                      </p>
                      <p className={`text-sm font-medium ${
                        investment.returnPercentage >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {investment.returnPercentage >= 0 ? '+' : ''}{investment.returnPercentage.toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/10">
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-wide">Vines Owned</p>
                      <p className="text-white font-semibold">{investment.vilesOwned}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-wide">Invested</p>
                      <p className="text-white font-semibold">{formatCurrency(investment.totalInvested)}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-wide">Annual Dividend</p>
                      <p className="text-white font-semibold">{formatCurrency(investment.annualDividend)}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-wide">Yield</p>
                      <p className="text-white font-semibold">
                        {((investment.annualDividend / investment.totalInvested) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        investment.status === 'active' ? 'bg-green-400' :
                        investment.status === 'pending' ? 'bg-yellow-400' : 'bg-red-400'
                      }`}></div>
                      <span className="text-white/80 text-sm capitalize">{investment.status}</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="btn-secondary text-xs px-3 py-1">
                        View Details
                      </button>
                      <button className="btn-primary text-xs px-3 py-1">
                        Add More Vines
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {investments.length === 0 && (
              <div className="text-center py-12">
                <ChartBarIcon className="h-12 w-12 text-white/40 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Investments Yet</h3>
                <p className="text-white/70 mb-4">
                  Start your wine investment journey by exploring our premium vineyards.
                </p>
                <Link href="/" className="btn-primary">
                  Explore Vineyards
                </Link>
              </div>
            )}
          </div>

          {/* Call to Action */}
          {investments.length > 0 && (
            <div className="mt-8 text-center">
              <div className="wine-card max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Ready to Expand Your Portfolio?
                </h3>
                <p className="text-white/80 mb-4">
                  Discover new premium vineyard investment opportunities
                </p>
                <Link href="/" className="btn-primary mr-3">
                  Explore Vineyards
                </Link>
                <Link href="/activity" className="btn-secondary">
                  View Activity
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}