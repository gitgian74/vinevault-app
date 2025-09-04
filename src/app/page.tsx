'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon, 
  GlobeAltIcon, 
  TrophyIcon,
  ChartBarIcon,
  UserGroupIcon,
  LockClosedIcon 
} from '@heroicons/react/24/outline';
import { useAuth } from '@/lib/auth/AuthProvider';

const features = [
  {
    icon: ShieldCheckIcon,
    title: 'Blockchain Certified',
    description: 'Every investment is secured with blockchain technology and NFT ownership certificates.',
  },
  {
    icon: GlobeAltIcon,
    title: 'Global Vineyards',
    description: 'Access premium vineyards from Bordeaux to Napa Valley, all in one platform.',
  },
  {
    icon: TrophyIcon,
    title: 'Premium Selection',
    description: 'Curated collection of award-winning vineyards with proven track records.',
  },
  {
    icon: ChartBarIcon,
    title: 'Transparent Returns',
    description: 'Real-time portfolio tracking with detailed performance analytics.',
  },
  {
    icon: UserGroupIcon,
    title: 'Expert Curation',
    description: 'Our sommelier team selects only the finest investment opportunities.',
  },
  {
    icon: LockClosedIcon,
    title: 'Secure Platform',
    description: 'Bank-level security with GDPR compliance and encrypted data storage.',
  },
];

const vineyards = [
  {
    id: 1,
    name: 'Château Margaux',
    location: 'Bordeaux, France',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&h=400&fit=crop',
    price: 399,
    roi: 12.5,
    availability: 250,
    rating: 4.9,
  },
  {
    id: 2,
    name: 'Opus One',
    location: 'Napa Valley, USA',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&h=400&fit=crop',
    price: 299,
    roi: 10.8,
    availability: 180,
    rating: 4.8,
  },
  {
    id: 3,
    name: 'Tenuta San Guido',
    location: 'Tuscany, Italy',
    image: 'https://images.unsplash.com/photo-1566995541428-f2246c17cda1?w=600&h=400&fit=crop',
    price: 199,
    roi: 15.2,
    availability: 320,
    rating: 4.7,
  },
];

const stats = [
  { label: 'Vines Owned', value: '15,000+' },
  { label: 'Partner Vineyards', value: '47' },
  { label: 'Customer Rating', value: '4.9★' },
  { label: 'Total Invested', value: '$2.3M' },
];

export default function HomePage() {
  const { isAuthenticated, user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-wine-800 to-primary-800">
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🍷</span>
            <span className="text-2xl font-bold text-white">VineVault</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
            <a href="#vineyards" className="text-white/80 hover:text-white transition-colors">Vineyards</a>
            <a href="#about" className="text-white/80 hover:text-white transition-colors">About</a>
            <a href="#contact" className="text-white/80 hover:text-white transition-colors">Contact</a>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="btn-secondary">
                  Dashboard
                </Link>
                <div className="text-white/80">
                  Welcome, {user?.name}
                </div>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-white/80 hover:text-white transition-colors">
                  Login
                </Link>
                <Link href="/auth/register" className="btn-primary">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 font-serif"
          >
            Own Your Wine Legacy
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Invest in premium vineyards worldwide with blockchain-certified ownership. 
            Secure, transparent, and profitable wine investments.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {!isAuthenticated ? (
              <>
                <Link href="/auth/register" className="btn-primary text-lg px-8 py-4">
                  Start Investing
                </Link>
                <Link href="#vineyards" className="btn-secondary text-lg px-8 py-4">
                  Explore Vineyards
                </Link>
              </>
            ) : (
              <Link href="/dashboard" className="btn-primary text-lg px-8 py-4">
                View My Portfolio
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="wine-card text-center"
              >
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-white/80">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 font-serif">
              Why Choose VineVault?
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with wine expertise 
              to deliver the ultimate investment experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="wine-card"
              >
                <feature.icon className="h-8 w-8 text-gold-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/80">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vineyards Section */}
      <section id="vineyards" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 font-serif">
              Featured Vineyards
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Handpicked premium investment opportunities from the world's 
              most prestigious wine regions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vineyards.map((vineyard, index) => (
              <motion.div 
                key={vineyard.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={vineyard.image}
                    alt={vineyard.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {vineyard.rating}★
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{vineyard.name}</h3>
                  <p className="text-gray-600 mb-4">📍 {vineyard.location}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-2xl font-bold text-primary-600">
                      ${vineyard.price}/vine
                    </div>
                    <div className="text-green-600 font-medium">
                      {vineyard.roi}% ROI
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-4">
                    {vineyard.availability} vines available
                  </div>
                  
                  <button className="w-full btn-primary">
                    {isAuthenticated ? 'Invest Now' : 'View Details'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href={isAuthenticated ? "/vineyards" : "/auth/register"} className="btn-secondary">
              View All Vineyards
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6 font-serif">
            Ready to Start Your Wine Investment Journey?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of investors who are building wealth through 
            premium wine investments. Start with as little as $199.
          </p>
          
          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth/register" className="btn-primary text-lg px-8 py-4">
                Create Account
              </Link>
              <Link href="/auth/login" className="btn-secondary text-lg px-8 py-4">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-white/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🍷</span>
                <span className="text-2xl font-bold text-white">VineVault</span>
              </div>
              <p className="text-white/80 mb-4 max-w-md">
                The premier platform for secure wine investments with blockchain 
                certification and global vineyard access.
              </p>
              <div className="text-white/60">
                © 2024 VineVault. All rights reserved.
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Platform</h3>
              <div className="space-y-2">
                <Link href="/vineyards" className="block text-white/80 hover:text-white">
                  Browse Vineyards
                </Link>
                <Link href="/dashboard" className="block text-white/80 hover:text-white">
                  Dashboard
                </Link>
                <Link href="/portfolio" className="block text-white/80 hover:text-white">
                  My Portfolio
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <div className="space-y-2">
                <Link href="/privacy" className="block text-white/80 hover:text-white">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="block text-white/80 hover:text-white">
                  Terms of Service
                </Link>
                <Link href="/gdpr" className="block text-white/80 hover:text-white">
                  GDPR Compliance
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}