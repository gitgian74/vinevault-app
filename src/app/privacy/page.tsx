import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - VineVault',
  description: 'Learn how VineVault protects your privacy and handles your personal data in compliance with GDPR.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-wine-800 to-primary-800">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center space-x-2 mb-8">
            <span className="text-3xl">🍷</span>
            <span className="text-2xl font-bold text-white">VineVault</span>
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-white/80 text-lg">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content */}
        <div className="glass rounded-2xl p-8 prose prose-invert max-w-none">
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              VineVault ("we," "our," or "us") is committed to protecting your privacy and personal data. 
              This Privacy Policy explains how we collect, use, process, and safeguard your information 
              when you use our wine investment platform.
            </p>
            <p className="text-white/80 leading-relaxed">
              We comply with the General Data Protection Regulation (GDPR) and other applicable 
              data protection laws to ensure your personal information is handled securely and transparently.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-medium text-gold-400 mb-3">2.1 Personal Information</h3>
            <ul className="text-white/80 space-y-2 mb-4">
              <li>• Full name and contact information (email, phone number, address)</li>
              <li>• Government-issued identification for KYC (Know Your Customer) compliance</li>
              <li>• Financial information for investment transactions</li>
              <li>• Employment and income information for investment suitability assessment</li>
            </ul>

            <h3 className="text-xl font-medium text-gold-400 mb-3">2.2 Technical Information</h3>
            <ul className="text-white/80 space-y-2 mb-4">
              <li>• IP address, browser type, and device information</li>
              <li>• Usage data and interaction patterns on our platform</li>
              <li>• Cookies and similar tracking technologies</li>
              <li>• Blockchain wallet addresses and transaction data</li>
            </ul>

            <h3 className="text-xl font-medium text-gold-400 mb-3">2.3 Investment Data</h3>
            <ul className="text-white/80 space-y-2">
              <li>• Investment history and portfolio information</li>
              <li>• Transaction records and payment details</li>
              <li>• Risk assessment and investment preferences</li>
              <li>• Communication records related to investments</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
            <ul className="text-white/80 space-y-3">
              <li>
                <strong className="text-white">Platform Services:</strong> To provide, maintain, and improve our wine investment platform
              </li>
              <li>
                <strong className="text-white">Legal Compliance:</strong> To comply with KYC, AML, and other regulatory requirements
              </li>
              <li>
                <strong className="text-white">Security:</strong> To protect against fraud, unauthorized access, and security threats
              </li>
              <li>
                <strong className="text-white">Communication:</strong> To send important updates about your investments and platform changes
              </li>
              <li>
                <strong className="text-white">Analytics:</strong> To understand user behavior and improve our services (with your consent)
              </li>
              <li>
                <strong className="text-white">Marketing:</strong> To send promotional materials about new investment opportunities (with your consent)
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">4. Legal Basis for Processing</h2>
            <p className="text-white/80 mb-4">Under GDPR, we process your personal data based on the following legal grounds:</p>
            <ul className="text-white/80 space-y-2">
              <li>• <strong className="text-white">Contract:</strong> Processing necessary for providing investment services</li>
              <li>• <strong className="text-white">Legal Obligation:</strong> Compliance with financial regulations and KYC requirements</li>
              <li>• <strong className="text-white">Consent:</strong> Marketing communications and optional analytics</li>
              <li>• <strong className="text-white">Legitimate Interest:</strong> Platform security and fraud prevention</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">5. Data Sharing and Disclosure</h2>
            <p className="text-white/80 mb-4">We may share your information with:</p>
            <ul className="text-white/80 space-y-2">
              <li>• <strong className="text-white">Service Providers:</strong> Third-party vendors who help us operate our platform</li>
              <li>• <strong className="text-white">Financial Partners:</strong> Payment processors and financial institutions</li>
              <li>• <strong className="text-white">Regulatory Authorities:</strong> When required by law or regulation</li>
              <li>• <strong className="text-white">Vineyard Partners:</strong> Information necessary for investment execution</li>
              <li>• <strong className="text-white">Legal Requirements:</strong> To comply with court orders or legal processes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">6. Your Rights Under GDPR</h2>
            <p className="text-white/80 mb-4">You have the following rights regarding your personal data:</p>
            <ul className="text-white/80 space-y-2">
              <li>• <strong className="text-white">Access:</strong> Request a copy of your personal data</li>
              <li>• <strong className="text-white">Rectification:</strong> Correct inaccurate or incomplete data</li>
              <li>• <strong className="text-white">Erasure:</strong> Request deletion of your data (subject to legal obligations)</li>
              <li>• <strong className="text-white">Portability:</strong> Receive your data in a structured, machine-readable format</li>
              <li>• <strong className="text-white">Restriction:</strong> Limit how we process your data</li>
              <li>• <strong className="text-white">Objection:</strong> Object to processing based on legitimate interests</li>
              <li>• <strong className="text-white">Withdraw Consent:</strong> Remove consent for marketing and analytics</li>
            </ul>
            <p className="text-white/80 mt-4">
              To exercise these rights, contact us at{' '}
              <a href="mailto:privacy@vinevault.com" className="text-gold-400 hover:text-gold-300">
                privacy@vinevault.com
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">7. Data Security</h2>
            <p className="text-white/80 mb-4">We implement robust security measures including:</p>
            <ul className="text-white/80 space-y-2">
              <li>• End-to-end encryption for sensitive data</li>
              <li>• Multi-factor authentication for account access</li>
              <li>• Regular security audits and penetration testing</li>
              <li>• SOC 2 Type II certified data centers</li>
              <li>• Blockchain technology for immutable transaction records</li>
              <li>• Employee background checks and security training</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">8. Data Retention</h2>
            <p className="text-white/80 mb-4">
              We retain your personal data for different periods based on the type of information:
            </p>
            <ul className="text-white/80 space-y-2">
              <li>• <strong className="text-white">Account Data:</strong> Until account closure plus 7 years for regulatory compliance</li>
              <li>• <strong className="text-white">Transaction Records:</strong> 10 years as required by financial regulations</li>
              <li>• <strong className="text-white">Marketing Data:</strong> Until you withdraw consent or 2 years of inactivity</li>
              <li>• <strong className="text-white">Technical Logs:</strong> 12 months for security and debugging purposes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">9. International Transfers</h2>
            <p className="text-white/80">
              Your data may be processed in countries outside the European Economic Area. 
              We ensure adequate protection through appropriate safeguards such as Standard 
              Contractual Clauses and adequacy decisions by the European Commission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">10. Changes to This Policy</h2>
            <p className="text-white/80">
              We may update this Privacy Policy periodically. We will notify you of significant 
              changes via email or platform notification. The "Last updated" date indicates 
              when the policy was last modified.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">11. Contact Information</h2>
            <div className="text-white/80 space-y-2">
              <p><strong className="text-white">Data Protection Officer:</strong></p>
              <p>Email: <a href="mailto:dpo@vinevault.com" className="text-gold-400 hover:text-gold-300">dpo@vinevault.com</a></p>
              <p>Address: VineVault Privacy Office, [Your Address]</p>
              <p className="mt-4">
                <strong className="text-white">Supervisory Authority:</strong><br />
                You have the right to lodge a complaint with your local data protection authority.
              </p>
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