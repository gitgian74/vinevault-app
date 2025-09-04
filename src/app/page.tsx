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
      {/* Professional Navigation */}
      <nav className="relative z-10 px-6 py-4 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Premium Brand Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white font-serif">VineVault</span>
                <span className="text-xs text-gold-400 tracking-wider uppercase">Premium Wine Investments</span>
              </div>
            </div>
          </div>
          
          {/* Professional Navigation Menu */}
          <div className="hidden lg:flex items-center space-x-10">
            <a href="#heritage" className="text-white/90 hover:text-gold-400 transition-colors text-sm font-medium tracking-wide">Heritage</a>
            <a href="#vineyards" className="text-white/90 hover:text-gold-400 transition-colors text-sm font-medium tracking-wide">Vineyards</a>
            <a href="#expertise" className="text-white/90 hover:text-gold-400 transition-colors text-sm font-medium tracking-wide">Expertise</a>
            <a href="#insights" className="text-white/90 hover:text-gold-400 transition-colors text-sm font-medium tracking-wide">Market Insights</a>
            <a href="#about" className="text-white/90 hover:text-gold-400 transition-colors text-sm font-medium tracking-wide">About</a>
          </div>

          {/* Account Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="hidden md:flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white text-sm font-medium">{user?.name}</span>
                    <span className="text-white/60 text-xs">Portfolio Manager</span>
                  </div>
                </div>
                <Link href="/dashboard" className="btn-secondary px-6 py-2">
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-white/90 hover:text-gold-400 transition-colors text-sm font-medium">
                  Member Access
                </Link>
                <Link href="/auth/register" className="btn-primary px-6 py-2">
                  Begin Investment Journey
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1920&h=1080&fit=crop&crop=center"
          >
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
            {/* Alternative vineyard video sources */}
            <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" type="video/mp4" />
          </video>
          
          {/* Enhanced fallback for when video doesn't load */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary-900 via-wine-800 to-primary-800 opacity-90">
            <div 
              className="w-full h-full bg-center bg-cover mix-blend-overlay opacity-60"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1920&h=1080&fit=crop&crop=center')",
              }}
            ></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-black/30 backdrop-blur-sm border border-gold-400/30 text-gold-200 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse"></span>
              Certified Premium Terroir Investments™
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-serif leading-tight"
          >
            Curate Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600">
              Vineyard Heritage
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 mb-4 max-w-3xl mx-auto leading-relaxed"
          >
            Exclusive access to authenticated vineyard partnerships worldwide. 
            <br className="hidden md:block" />
            Blockchain-secured provenance meets institutional-grade wine asset management.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-center mb-12"
          >
            <p className="text-white/70 text-sm">
              Minimum investment: <span className="text-gold-400 font-semibold">$999</span> | 
              <span className="mx-2">•</span> 
              Average annual returns: <span className="text-gold-400 font-semibold">12-18%</span> | 
              <span className="mx-2">•</span> 
              Accredited investors only
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            {!isAuthenticated ? (
              <>
                <Link href="/auth/register" className="btn-primary text-lg px-10 py-4 shadow-2xl hover:shadow-gold-500/20 transition-all duration-300">
                  <span>Request Invitation</span>
                  <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="#vineyards" className="btn-secondary text-lg px-10 py-4 backdrop-blur-sm border-2 border-white/20 hover:border-gold-400/50 transition-all duration-300">
                  <span>Explore Portfolio</span>
                  <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </Link>
              </>
            ) : (
              <Link href="/dashboard" className="btn-primary text-lg px-10 py-4 shadow-2xl hover:shadow-gold-500/20 transition-all duration-300">
                <span>Portfolio Management</span>
                <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </Link>
            )}
          </motion.div>

          {/* Key Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">15,000+</div>
              <div className="text-white/80 text-sm uppercase tracking-wider">Vines Owned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">$2.3M+</div>
              <div className="text-white/80 text-sm uppercase tracking-wider">Total Invested</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">47</div>
              <div className="text-white/80 text-sm uppercase tracking-wider">Partner Vineyards</div>
            </div>
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="flex flex-col items-center text-white/60">
            <span className="text-sm mb-2 uppercase tracking-wider">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Heritage Section */}
      <section id="heritage" className="px-6 py-24 bg-gradient-to-b from-black/40 to-primary-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-8">
                <span className="text-gold-400 text-sm font-medium tracking-widest uppercase">Est. 2024</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif leading-tight">
                  Preserving
                  <br />
                  <span className="text-gold-400">Terroir Legacy</span>
                </h2>
                <p className="text-lg text-white/80 leading-relaxed mb-8">
                  VineVault represents the convergence of centuries-old viticultural expertise 
                  with cutting-edge blockchain technology. Our mission transcends investment—we are 
                  custodians of terroir heritage, ensuring authenticity and provenance 
                  for discerning collectors worldwide.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-gold-400 rounded-full mt-3"></div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Authenticated Provenance</h4>
                      <p className="text-white/70 text-sm">Blockchain-verified chain of custody from vineyard to vault</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-gold-400 rounded-full mt-3"></div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Institutional-Grade Security</h4>
                      <p className="text-white/70 text-sm">Multi-signature custody with insurance coverage up to $10M</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-gold-400 rounded-full mt-3"></div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Expert Curation</h4>
                      <p className="text-white/70 text-sm">Master Sommelier committee with 200+ years combined experience</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1574755393849-623942496936?w=600&h=600&fit=crop&crop=center"
                  alt="VineVault Heritage - Ancient wine cellar"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gold-500 text-white px-6 py-4 rounded-xl shadow-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-xs uppercase tracking-wider">Years Heritage</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="px-6 py-20 bg-gradient-to-b from-primary-900/50 to-transparent">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Trusted by Wine Investors Worldwide
            </h2>
            <p className="text-white/80 mb-12 max-w-2xl mx-auto">
              Join a community of sophisticated investors who understand the value of premium wine assets.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-gold-400 mb-2">15K+</div>
              <div className="text-white/80 text-sm uppercase tracking-wider">Vines Owned</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-gold-400 mb-2">47</div>
              <div className="text-white/80 text-sm uppercase tracking-wider">Partner Vineyards</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-gold-400 mb-2">4.9★</div>
              <div className="text-white/80 text-sm uppercase tracking-wider">Customer Rating</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-gold-400 mb-2">$2.3M</div>
              <div className="text-white/80 text-sm uppercase tracking-wider">Total Invested</div>
            </motion.div>
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
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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