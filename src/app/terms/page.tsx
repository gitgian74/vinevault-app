import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service - VineVault',
  description: 'Review the terms and conditions for using VineVault wine investment platform.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-wine-800 to-primary-800">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center space-x-2 mb-8">
            <span className="text-3xl">🍷</span>
            <span className="text-2xl font-bold text-white">VineVault</span>
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-white/80 text-lg">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div className="glass rounded-2xl p-8 prose prose-invert max-w-none">
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              By accessing or using VineVault ("the Platform," "Service"), you agree to be bound 
              by these Terms of Service ("Terms"). If you do not agree to these Terms, you may 
              not use our Service.
            </p>
            <p className="text-white/80 leading-relaxed">
              These Terms constitute a legally binding agreement between you and VineVault Inc. 
              ("Company," "we," "us," or "our").
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">2. Eligibility and Account Registration</h2>
            
            <h3 className="text-xl font-medium text-gold-400 mb-3">2.1 Eligibility Requirements</h3>
            <ul className="text-white/80 space-y-2 mb-4">
              <li>• You must be at least 18 years old</li>
              <li>• You must be legally authorized to invest in alternative investments</li>
              <li>• You must not be located in a restricted jurisdiction</li>
              <li>• You must comply with all applicable local laws and regulations</li>
            </ul>

            <h3 className="text-xl font-medium text-gold-400 mb-3">2.2 Account Security</h3>
            <ul className="text-white/80 space-y-2">
              <li>• You are responsible for maintaining the confidentiality of your account credentials</li>
              <li>• You must notify us immediately of any unauthorized access</li>
              <li>• You are liable for all activities under your account</li>
              <li>• We may suspend or terminate accounts that violate these Terms</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">3. Investment Services</h2>
            
            <h3 className="text-xl font-medium text-gold-400 mb-3">3.1 Nature of Investments</h3>
            <p className="text-white/80 mb-4">
              VineVault facilitates fractional ownership investments in premium vineyards through 
              blockchain-certified ownership certificates. These are alternative investments that 
              carry inherent risks.
            </p>

            <h3 className="text-xl font-medium text-gold-400 mb-3">3.2 Investment Risks</h3>
            <ul className="text-white/80 space-y-2 mb-4">
              <li>• Wine investments are subject to market volatility</li>
              <li>• Agricultural risks including weather, pests, and crop failure</li>
              <li>• Liquidity constraints - investments may not be easily sellable</li>
              <li>• No guarantee of returns or principal protection</li>
              <li>• Regulatory changes may affect investment value</li>
            </ul>

            <h3 className="text-xl font-medium text-gold-400 mb-3">3.3 No Investment Advice</h3>
            <p className="text-white/80">
              We do not provide investment advice. All information is for educational purposes only. 
              You should consult with qualified financial advisors before making investment decisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">4. Platform Usage</h2>
            
            <h3 className="text-xl font-medium text-gold-400 mb-3">4.1 Permitted Use</h3>
            <ul className="text-white/80 space-y-2 mb-4">
              <li>• Access investment opportunities and manage your portfolio</li>
              <li>• Receive updates and communications about your investments</li>
              <li>• Use educational resources and market information</li>
              <li>• Transfer ownership certificates subject to platform rules</li>
            </ul>

            <h3 className="text-xl font-medium text-gold-400 mb-3">4.2 Prohibited Activities</h3>
            <ul className="text-white/80 space-y-2">
              <li>• Market manipulation or fraudulent activities</li>
              <li>• Circumventing security measures or platform controls</li>
              <li>• Sharing account credentials with third parties</li>
              <li>• Using automated systems without authorization</li>
              <li>• Violating applicable laws or regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">5. Fees and Payments</h2>
            <ul className="text-white/80 space-y-2">
              <li>• <strong className="text-white">Platform Fee:</strong> Annual fee of 1.5% of invested amount</li>
              <li>• <strong className="text-white">Transaction Fee:</strong> 2.5% on each investment transaction</li>
              <li>• <strong className="text-white">Transfer Fee:</strong> $25 for ownership certificate transfers</li>
              <li>• <strong className="text-white">Payment Processing:</strong> Third-party fees may apply</li>
            </ul>
            <p className="text-white/80 mt-4">
              All fees are clearly disclosed before transaction completion. 
              Fee structures may change with 30 days notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">6. Intellectual Property</h2>
            <p className="text-white/80 mb-4">
              All content, trademarks, and intellectual property on the Platform belong to 
              VineVault or our licensors. You may not copy, modify, or distribute our content 
              without permission.
            </p>
            <p className="text-white/80">
              By uploading content to the Platform, you grant us a non-exclusive license to 
              use, display, and distribute such content in connection with our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">7. Privacy and Data Protection</h2>
            <p className="text-white/80">
              Your privacy is important to us. Please review our{' '}
              <Link href="/privacy" className="text-gold-400 hover:text-gold-300 underline">
                Privacy Policy
              </Link>{' '}
              to understand how we collect, use, and protect your personal information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">8. Disclaimers and Limitation of Liability</h2>
            
            <h3 className="text-xl font-medium text-gold-400 mb-3">8.1 Service Disclaimer</h3>
            <p className="text-white/80 mb-4">
              THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM 
              ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A 
              PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>

            <h3 className="text-xl font-medium text-gold-400 mb-3">8.2 Limitation of Liability</h3>
            <p className="text-white/80">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, VINEVAULT SHALL NOT BE LIABLE FOR ANY 
              INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES, INCLUDING LOSS OF PROFITS 
              OR INVESTMENT LOSSES.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">9. Regulatory Compliance</h2>
            <p className="text-white/80 mb-4">
              VineVault operates in compliance with applicable securities laws and regulations. 
              We are registered as required and maintain appropriate licenses for our services.
            </p>
            <p className="text-white/80">
              You acknowledge that investment regulations vary by jurisdiction, and you are 
              responsible for compliance with your local laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">10. Termination</h2>
            <p className="text-white/80 mb-4">
              Either party may terminate this agreement at any time. Upon termination:
            </p>
            <ul className="text-white/80 space-y-2">
              <li>• Your access to the Platform will be suspended</li>
              <li>• Existing investments remain valid and transferable</li>
              <li>• Outstanding fees must be paid</li>
              <li>• Data retention follows our Privacy Policy</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">11. Dispute Resolution</h2>
            <p className="text-white/80 mb-4">
              Any disputes shall be resolved through binding arbitration under the rules of 
              the American Arbitration Association. The arbitration shall take place in 
              [Your Jurisdiction].
            </p>
            <p className="text-white/80">
              This agreement is governed by the laws of [Your Jurisdiction], without regard 
              to conflict of law principles.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">12. Changes to Terms</h2>
            <p className="text-white/80">
              We may modify these Terms at any time. Significant changes will be communicated 
              via email or platform notification. Continued use of the Platform after changes 
              constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">13. Contact Information</h2>
            <div className="text-white/80 space-y-2">
              <p><strong className="text-white">VineVault Inc.</strong></p>
              <p>Email: <a href="mailto:legal@vinevault.com" className="text-gold-400 hover:text-gold-300">legal@vinevault.com</a></p>
              <p>Address: [Your Business Address]</p>
              <p>Phone: [Your Phone Number]</p>
            </div>
          </section>
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="btn-secondary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}