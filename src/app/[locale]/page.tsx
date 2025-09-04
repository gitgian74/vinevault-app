'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { 
  ShieldCheckIcon, 
  GlobeAltIcon, 
  TrophyIcon,
  ChartBarIcon,
  UserGroupIcon,
  LockClosedIcon 
} from '@heroicons/react/24/outline';
import { useAuth } from '@/lib/auth/AuthProvider';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();
  const t = useTranslations();
  const locale = useLocale();

  // Features using translations
  const features = [
    {
      icon: ShieldCheckIcon,
      title: t('features.blockchain_title'),
      description: t('features.blockchain_description'),
    },
    {
      icon: GlobeAltIcon,
      title: t('features.global_title'),
      description: t('features.global_description'),
    },
    {
      icon: TrophyIcon,
      title: t('features.expert_title'),
      description: t('features.expert_description'),
    },
    {
      icon: ChartBarIcon,
      title: t('features.returns_title'),
      description: t('features.returns_description'),
    },
    {
      icon: UserGroupIcon,
      title: t('features.fractional_title'),
      description: t('features.fractional_description'),
    },
    {
      icon: LockClosedIcon,
      title: t('features.liquidity_title'),
      description: t('features.liquidity_description'),
    },
  ];

  const vineyards = [
    {
      id: 1,
      name: 'Château Margaux Estate',
      location: 'Bordeaux, France',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3',
      price: '$2,500',
      shares: 120,
      yield: '12.5%',
      rating: 4.9,
    },
    {
      id: 2,
      name: 'Domaine de la Côte',
      location: 'Burgundy, France',
      image: 'https://images.unsplash.com/photo-1571722020726-c6e8108b3b8e?ixlib=rb-4.0.3',
      price: '$1,800',
      shares: 85,
      yield: '10.2%',
      rating: 4.7,
    },
    {
      id: 3,
      name: 'Screaming Eagle Vineyard',
      location: 'Napa Valley, USA',
      image: 'https://images.unsplash.com/photo-1574937677485-ae8e3b2d9e26?ixlib=rb-4.0.3',
      price: '$3,200',
      shares: 200,
      yield: '15.1%',
      rating: 5.0,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-900 via-wine-800 to-primary-800">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-primary-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-3xl">🍷</span>
              <span className="text-2xl font-bold text-white">VineVault</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#about" className="text-white/80 hover:text-white transition-colors">
                {t('navigation.about')}
              </Link>
              <Link href="#vineyards" className="text-white/80 hover:text-white transition-colors">
                {t('navigation.vineyards')}
              </Link>
              <Link href="#pricing" className="text-white/80 hover:text-white transition-colors">
                {t('navigation.pricing')}
              </Link>
              <Link href="#contact" className="text-white/80 hover:text-white transition-colors">
                {t('navigation.contact')}
              </Link>
            </div>

            {/* Right Side - Language Switcher & Auth */}
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              
              {user ? (
                <Link
                  href={`/${locale}/dashboard`}
                  className="btn-primary"
                >
                  {t('navigation.dashboard')}
                </Link>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    href={`/${locale}/auth/login`}
                    className="text-white/80 hover:text-white transition-colors px-4 py-2"
                  >
                    {t('navigation.login')}
                  </Link>
                  <Link
                    href={`/${locale}/auth/register`}
                    className="btn-primary"
                  >
                    {t('navigation.register')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-4 pt-20">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
            alt="Premium vineyard landscape"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
              <Link
                href={`/${locale}/auth/register`}
                className="btn-primary text-lg px-8 py-4"
              >
                {t('hero.cta_primary')}
              </Link>
              <Link
                href="#about"
                className="btn-secondary text-lg px-8 py-4"
              >
                {t('hero.cta_secondary')}
              </Link>
            </div>

            {/* Trust Badge */}
            <div className="flex items-center justify-center space-x-2 text-white/80">
              <ShieldCheckIcon className="w-5 h-5" />
              <span>{t('hero.trust_badge')}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">$2.5B+</div>
              <div className="text-white/80">{t('stats.total_value')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">12,000+</div>
              <div className="text-white/80">{t('stats.active_investors')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">150+</div>
              <div className="text-white/80">{t('stats.vineyards')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">18.3%</div>
              <div className="text-white/80">{t('stats.avg_returns')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('features.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-wine-600 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <Link
            href={`/${locale}/auth/register`}
            className="btn-secondary text-lg px-8 py-4"
          >
            {t('cta.button')}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <span className="text-3xl">🍷</span>
                <span className="text-2xl font-bold">VineVault</span>
              </div>
              <p className="text-gray-400 mb-4">
                {t('footer.disclaimer')}
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">{t('footer.company')}</h4>
              <div className="space-y-2">
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  {t('footer.about')}
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  {t('footer.careers')}
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  {t('footer.press')}
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  {t('footer.blog')}
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">{t('footer.invest')}</h4>
              <div className="space-y-2">
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  {t('footer.how_it_works')}
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  {t('footer.vineyards')}
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  {t('footer.returns')}
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">{t('footer.support')}</h4>
              <div className="space-y-2">
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  {t('footer.help_center')}
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  {t('footer.contact')}
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white transition-colors">
                  {t('footer.faq')}
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}