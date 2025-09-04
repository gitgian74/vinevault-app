export interface User {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  email: string;
  name: string;
  emailVerification: boolean;
  phone?: string;
  avatar?: string;
  preferences: {
    theme: 'light' | 'dark';
    language: string;
    currency: 'USD' | 'EUR' | 'GBP';
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };
  kyc: {
    status: 'pending' | 'approved' | 'rejected';
    documents: string[];
    verificationDate?: string;
  };
  gdprConsent: {
    marketing: boolean;
    analytics: boolean;
    necessary: boolean;
    consentDate: string;
  };
}

export interface Vineyard {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  name: string;
  location: {
    country: string;
    region: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  description: string;
  images: string[];
  specifications: {
    totalVines: number;
    availableVines: number;
    pricePerVine: number;
    expectedYield: number;
    wineType: string[];
    soilType: string;
    climate: string;
    certifications: string[];
  };
  financials: {
    totalInvestment: number;
    currentValuation: number;
    expectedROI: number;
    payoutHistory: PayoutHistory[];
  };
  blockchain: {
    contractAddress: string;
    tokenStandard: 'ERC-721' | 'ERC-1155';
    verificationHash: string;
  };
  status: 'active' | 'sold-out' | 'maintenance' | 'archived';
  featured: boolean;
  minimumInvestment: number;
  maximumInvestment?: number;
}

export interface Investment {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  userId: string;
  vineyardId: string;
  vineyard?: Vineyard;
  numberOfVines: number;
  totalAmount: number;
  pricePerVine: number;
  status: 'pending' | 'active' | 'sold' | 'cancelled';
  blockchain: {
    tokenId?: string;
    transactionHash?: string;
    ownershipCertificate?: string;
  };
  payouts: Payout[];
  documents: string[];
  metadata: {
    purchaseDate: string;
    certificateIssued: boolean;
    lastValuation: number;
    currentValue: number;
  };
}

export interface Transaction {
  $id: string;
  $createdAt: string;
  userId: string;
  investmentId?: string;
  type: 'purchase' | 'sale' | 'payout' | 'fee' | 'refund';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  paymentMethod: {
    type: 'card' | 'bank_transfer' | 'crypto' | 'wallet';
    details: string;
  };
  blockchain?: {
    network: string;
    transactionHash: string;
    blockNumber?: number;
    gasUsed?: number;
  };
  fees: {
    platform: number;
    payment: number;
    blockchain: number;
  };
  metadata: Record<string, any>;
}

export interface Payout {
  $id: string;
  date: string;
  amount: number;
  type: 'dividend' | 'harvest' | 'appreciation';
  status: 'pending' | 'paid' | 'cancelled';
  description: string;
  transactionId?: string;
}

export interface PayoutHistory {
  year: number;
  amount: number;
  roi: number;
}

export interface AuditLog {
  $id: string;
  $createdAt: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  verifyEmail: (userId: string, secret: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string, oldPassword: string) => Promise<void>;
  deleteAccount: () => Promise<void>;
}

export interface ToastType {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface SearchFilters {
  query?: string;
  location?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  wineType?: string[];
  minROI?: number;
  status?: string[];
}

export interface DashboardStats {
  totalInvestments: number;
  totalValue: number;
  totalROI: number;
  totalPayouts: number;
  portfolioGrowth: number;
  activeInvestments: number;
}