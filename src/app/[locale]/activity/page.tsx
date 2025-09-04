'use client';

import { useAuth } from '@/lib/auth/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeftIcon,
  ChartBarIcon, 
  CurrencyDollarIcon, 
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarIcon,
  FilterIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface ActivityItem {
  id: string;
  type: 'investment' | 'dividend' | 'valuation' | 'sale' | 'system';
  title: string;
  description: string;
  amount?: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

const mockActivityData: ActivityItem[] = [
  {
    id: '1',
    type: 'dividend',
    title: 'Dividend Payment Received',
    description: 'Quarterly dividend from Château Margaux vineyard investment',
    amount: '+$245.00',
    date: '2025-09-02T10:30:00Z',
    status: 'completed'
  },
  {
    id: '2',
    type: 'investment',
    title: 'New Investment Purchase',
    description: 'Purchased 5 additional vines in Opus One vineyard',
    amount: '-$1,500.00',
    date: '2025-08-28T14:15:00Z',
    status: 'completed'
  },
  {
    id: '3',
    type: 'valuation',
    title: 'Portfolio Valuation Update',
    description: 'Monthly portfolio revaluation completed',
    amount: '+8.2%',
    date: '2025-08-25T09:00:00Z',
    status: 'completed'
  },
  {
    id: '4',
    type: 'dividend',
    title: 'Dividend Payment Received',
    description: 'Semi-annual dividend from Tenuta San Guido investment',
    amount: '+$189.50',
    date: '2025-08-20T11:45:00Z',
    status: 'completed'
  },
  {
    id: '5',
    type: 'investment',
    title: 'Investment Purchase',
    description: 'Initial purchase of 12 vines in Tenuta San Guido vineyard',
    amount: '-$2,400.00',
    date: '2025-08-15T16:20:00Z',
    status: 'completed'
  },
  {
    id: '6',
    type: 'system',
    title: 'Account Verification Completed',
    description: 'Your account has been fully verified and activated',
    date: '2025-08-10T08:30:00Z',
    status: 'completed'
  },
  {
    id: '7',
    type: 'investment',
    title: 'Investment Purchase',
    description: 'Purchased 20 vines in Opus One vineyard',
    amount: '-$6,000.00',
    date: '2025-08-05T13:10:00Z',
    status: 'completed'
  },
  {
    id: '8',
    type: 'investment',
    title: 'Initial Investment',
    description: 'First investment in Château Margaux vineyard - 15 vines',
    amount: '-$4,500.00',
    date: '2025-07-30T15:45:00Z',
    status: 'completed'
  }
];

export default function ActivityPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [filter, setFilter] = useState<string>('all');
  const [filteredActivity, setFilteredActivity] = useState<ActivityItem[]>(mockActivityData);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredActivity(mockActivityData);
    } else {
      setFilteredActivity(mockActivityData.filter(item => item.type === filter));
    }
  }, [filter]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-900 via-wine-800 to-primary-800 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading your activity...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'investment':
        return <ChartBarIcon className="h-5 w-5" />;
      case 'dividend':
        return <CurrencyDollarIcon className="h-5 w-5" />;
      case 'valuation':
        return <ArrowTrendingUpIcon className="h-5 w-5" />;
      case 'sale':
        return <ArrowTrendingDownIcon className="h-5 w-5" />;
      default:
        return <CalendarIcon className="h-5 w-5" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'investment':
        return 'text-blue-400 bg-blue-400/20';
      case 'dividend':
        return 'text-green-400 bg-green-400/20';
      case 'valuation':
        return 'text-gold-400 bg-gold-400/20';
      case 'sale':
        return 'text-red-400 bg-red-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const filterOptions = [
    { value: 'all', label: 'All Activity' },
    { value: 'investment', label: 'Investments' },
    { value: 'dividend', label: 'Dividends' },
    { value: 'valuation', label: 'Valuations' },
    { value: 'system', label: 'System' }
  ];

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
      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Account Activity
            </h1>
            <p className="text-white/80">
              Track all your investment activity and account changes
            </p>
          </div>

          {/* Filter Controls */}
          <div className="wine-card mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <FilterIcon className="h-5 w-5 text-white/80" />
              <h3 className="text-lg font-semibold text-white">Filter Activity</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilter(option.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filter === option.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Activity List */}
          <div className="space-y-4">
            {filteredActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="wine-card"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${getActivityColor(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-white font-semibold mb-1">
                          {activity.title}
                        </h3>
                        <p className="text-white/70 text-sm mb-2">
                          {activity.description}
                        </p>
                        <p className="text-white/50 text-xs">
                          {formatDate(activity.date)}
                        </p>
                      </div>
                      
                      {activity.amount && (
                        <div className="text-right">
                          <p className={`font-semibold ${
                            activity.amount.startsWith('+') ? 'text-green-400' : 
                            activity.amount.startsWith('-') ? 'text-red-400' : 'text-gold-400'
                          }`}>
                            {activity.amount}
                          </p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            activity.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                            activity.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-red-500/20 text-red-300'
                          }`}>
                            {activity.status}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredActivity.length === 0 && (
            <div className="wine-card text-center py-12">
              <CalendarIcon className="h-12 w-12 text-white/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Activity Found</h3>
              <p className="text-white/70">
                No activities match your current filter selection.
              </p>
            </div>
          )}

          {/* Load More */}
          {filteredActivity.length > 0 && (
            <div className="text-center mt-8">
              <button className="btn-secondary">
                Load More Activity
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}