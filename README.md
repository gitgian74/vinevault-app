# 🍷 VineVault™ - Premium Vineyard Heritage Marketplace

> **Curate Your Vineyard Heritage**

An institutional-grade wine investment platform featuring blockchain-secured provenance, authenticated vineyard partnerships, and premium terroir asset management. Built with Next.js 14, TypeScript, Appwrite, and deployed on Vercel.

## 🏆 **Professional Investment Platform**

VineVault represents the convergence of centuries-old viticultural expertise with cutting-edge blockchain technology. Our mission transcends investment—we are custodians of terroir heritage, ensuring authenticity and provenance for discerning collectors worldwide.

### **Premium Features**
- ✅ **Certified Premium Terroir Investments™** - Blockchain-verified authenticity
- ✅ **Institutional-Grade Security** - Multi-signature custody with $10M insurance coverage  
- ✅ **Accredited Investor Portal** - Minimum investment $999, target 12-18% annual returns
- ✅ **Master Sommelier Committee** - 200+ years combined expertise in wine curation

## ✨ Features

### 🔐 Security & Compliance
- **GDPR Compliant** - Full privacy controls and data portability
- **Bank-Level Security** - End-to-end encryption and secure storage
- **Advanced Authentication** - Multi-factor authentication with audit trails
- **Regulatory Compliance** - KYC/AML verification and financial regulations
- **Security Headers** - CSP, HSTS, and comprehensive security policies

### 🚀 Platform Features
- **Fractional Ownership** - Invest in premium vineyards starting from $199
- **Blockchain Certification** - NFT-based ownership certificates
- **Real-time Portfolio** - Live tracking of investment performance
- **Global Vineyards** - Curated selection from Bordeaux to Napa Valley
- **Transparent Returns** - Detailed ROI tracking and payout history

### 🎨 Modern UI/UX
- **Responsive Design** - Optimized for all devices
- **Interactive Components** - Framer Motion animations
- **Glass Morphism** - Modern design with backdrop blur effects
- **Dark/Light Themes** - User preference support
- **Accessibility** - WCAG 2.1 AA compliant

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - App Router with Server Components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation

### Backend
- **Appwrite** - Backend-as-a-Service
- **Real-time Database** - Live data synchronization
- **Authentication** - Secure user management
- **Storage** - File and image handling
- **Functions** - Serverless business logic

### Infrastructure
- **Vercel** - Edge deployment and hosting
- **Edge Functions** - Global performance optimization
- **Analytics** - Performance monitoring
- **CDN** - Global content delivery

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Appwrite account
- Vercel account (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/vinevault-app.git
   cd vinevault-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=vinevault-db
   # ... other variables
   ```

4. **Set up Appwrite**
   ```bash
   # Install Appwrite CLI
   npm install -g appwrite
   
   # Login to Appwrite
   appwrite login
   
   # Initialize project
   appwrite init project
   ```

5. **Database Setup**
   
   Follow the [Database Schema](./database-schema.md) guide to set up your collections.

6. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

7. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
vinevault-app/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── auth/              # Authentication pages
│   │   ├── dashboard/         # User dashboard
│   │   ├── privacy/           # Privacy policy
│   │   ├── terms/             # Terms of service
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   │   ├── auth/              # Authentication components
│   │   ├── legal/             # GDPR and legal components
│   │   └── ui/                # UI components
│   ├── lib/                   # Utilities and configurations
│   │   ├── appwrite/          # Appwrite configuration
│   │   ├── auth/              # Authentication providers
│   │   └── services/          # Business logic services
│   ├── types/                 # TypeScript type definitions
│   └── utils/                 # Helper functions
├── public/                    # Static assets
├── database-schema.md         # Database structure documentation
└── README.md                  # This file
```

## 🔧 Development

### Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # ESLint checking
npm run type-check   # TypeScript checking

# Testing
npm run test         # Run tests
npm run test:watch   # Watch mode testing
npm run test:coverage # Coverage report
```

### Code Style

- **ESLint** - Code linting with Next.js config
- **Prettier** - Code formatting
- **TypeScript** - Strict mode enabled
- **Tailwind** - Utility-first CSS

### Git Hooks

Pre-commit hooks ensure code quality:
- ESLint checking
- TypeScript validation
- Prettier formatting
- Test execution

## 🚀 Deployment

### Vercel Deployment

1. **Connect to Vercel**
   ```bash
   npx vercel
   ```

2. **Environment Variables**
   
   Set up your environment variables in Vercel dashboard.

3. **Deploy**
   ```bash
   npx vercel --prod
   ```

### Environment Configuration

Different environments require specific configurations:

- **Development**: Local Appwrite instance
- **Staging**: Staging Appwrite project  
- **Production**: Production Appwrite project

## 🔒 Security Features

### Authentication
- Secure password requirements
- Email verification
- Session management
- Account lockout protection

### Data Protection
- Field-level encryption
- GDPR compliance tools
- Data portability
- Right to erasure

### Infrastructure
- Security headers (CSP, HSTS)
- DDoS protection
- Rate limiting
- SSL/TLS encryption

## 📊 Monitoring & Analytics

- **Performance Monitoring** - Core Web Vitals tracking
- **Error Tracking** - Real-time error reporting
- **User Analytics** - Privacy-compliant usage analytics
- **Security Monitoring** - Audit trail and anomaly detection

## 🧪 Testing

### Test Types
- **Unit Tests** - Component and function testing
- **Integration Tests** - API and database testing
- **E2E Tests** - Full user journey testing
- **Security Tests** - Vulnerability scanning

### Running Tests
```bash
npm run test              # All tests
npm run test:unit         # Unit tests only
npm run test:integration  # Integration tests
npm run test:e2e          # End-to-end tests
```

## 📝 API Documentation

### Authentication Endpoints
- `POST /auth/register` - User registration
- `POST /auth/login` - User login  
- `POST /auth/logout` - User logout
- `POST /auth/verify` - Email verification

### Investment Endpoints
- `GET /api/vineyards` - List available vineyards
- `GET /api/vineyards/[id]` - Vineyard details
- `POST /api/investments` - Create investment
- `GET /api/portfolio` - User portfolio

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript strict mode
- Write tests for new features
- Update documentation
- Ensure GDPR compliance for data changes

## 📄 Legal & Compliance

- **GDPR Compliant** - Full European privacy law compliance
- **Financial Regulations** - Complies with investment regulations
- **Terms of Service** - Comprehensive legal framework
- **Privacy Policy** - Transparent data handling

## 🆘 Support

- **Documentation**: Check the docs folder
- **Issues**: [GitHub Issues](https://github.com/yourusername/vinevault-app/issues)
- **Email**: support@vinevault.com
- **Discord**: [VineVault Community](https://discord.gg/vinevault)

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Claude AI](https://claude.ai/code) assistance
- Inspired by modern fintech security practices
- Thanks to the open-source community

---

**VineVault** - Own Your Wine Legacy 🍷

*Invest in premium vineyards worldwide with blockchain-certified ownership.*