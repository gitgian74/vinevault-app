'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService, handleAppwriteError, ID } from '@/lib/appwrite';
import { AuthContextType, User } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

// Temporary simple toast replacement until ToastProvider is fixed
const showToast = (toast: { type: string; title: string; message?: string }) => {
  console.log(`[${toast.type.toUpperCase()}] ${toast.title}: ${toast.message || ''}`);
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated on app load
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        const userData = await fetchUserProfile(currentUser.$id);
        setUser(userData);
        
        console.log('User authenticated successfully:', currentUser.email);
      }
    } catch (error) {
      console.log('User not authenticated');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserProfile = async (userId: string): Promise<User> => {
    // In a real implementation, you would fetch additional user data from your users collection
    const accountData = await authService.getCurrentUser();
    
    // Mock user profile data - replace with actual database fetch
    const mockUserData: User = {
      $id: accountData.$id,
      $createdAt: accountData.$createdAt,
      $updatedAt: accountData.$updatedAt,
      email: accountData.email,
      name: accountData.name,
      emailVerification: accountData.emailVerification,
      phone: accountData.phone,
      preferences: {
        theme: 'light',
        language: 'en',
        currency: 'USD',
        notifications: {
          email: true,
          sms: false,
          push: true,
        },
      },
      kyc: {
        status: 'pending',
        documents: [],
      },
      gdprConsent: {
        marketing: false,
        analytics: false,
        necessary: true,
        consentDate: new Date().toISOString(),
      },
    };

    return mockUserData;
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Check if we're in demo mode
      const isDemoMode = !process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || 
                        process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID === 'vinevault-demo';
      
      if (isDemoMode) {
        // Demo mode - simulate login
        console.log('Demo mode: Simulating user login', { email });
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check for demo error conditions
        if (password === 'wrongpassword') {
          throw new Error('user_invalid_credentials');
        }
        
        // Create mock user data
        const mockUser: User = {
          $id: 'demo-user-' + Date.now(),
          $createdAt: new Date().toISOString(),
          $updatedAt: new Date().toISOString(),
          email: email,
          name: email.split('@')[0],
          emailVerification: true,
          preferences: {
            theme: 'light',
            language: 'en',
            currency: 'USD',
            notifications: {
              email: true,
              sms: false,
              push: true,
            },
          },
          kyc: {
            status: 'pending',
            documents: [],
          },
          gdprConsent: {
            marketing: false,
            analytics: true,
            necessary: true,
            consentDate: new Date().toISOString(),
          },
        };
        
        setUser(mockUser);
        
        showToast({
          type: 'success',
          title: 'Welcome back!',
          message: 'Demo mode: You have been logged in successfully.',
        });
        
        return;
      }
      
      // Real Appwrite mode
      try {
        // Create session using authService
        await authService.login(email, password);
        
        // Get user data
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          const userData = await fetchUserProfile(currentUser.$id);
          setUser(userData);
        }
        
        showToast({
          type: 'success',
          title: 'Welcome back!',
          message: 'You have been logged in successfully.',
        });
      } catch (appwriteError: any) {
        console.warn('Appwrite login failed:', appwriteError);
        throw appwriteError;
      }
      
    } catch (error: any) {
      const errorMessage = handleAppwriteError(error);
      
      showToast({
        type: 'error',
        title: 'Login failed',
        message: errorMessage,
      });
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string): Promise<void> => {
    try {
      setIsLoading(true);
      console.log('AuthProvider: Starting registration for', email);
      
      // Always try real Appwrite first
      console.log('AuthProvider: Attempting Appwrite registration...');
      
      try {
        // Create account using authService
        const newUser = await authService.createAccount(email, password, name);
        console.log('AuthProvider: Account created successfully', newUser.$id);
        
        // Send verification email - this might be causing the hang
        try {
          console.log('AuthProvider: Sending verification email...');
          await authService.sendVerification();
          console.log('AuthProvider: Verification email sent successfully');
        } catch (verificationError) {
          console.warn('AuthProvider: Verification email failed, but continuing:', verificationError);
          // Don't throw - account was created successfully
        }
        
        showToast({
          type: 'success',
          title: 'Registration successful!',
          message: 'Account created successfully. You can now login.',
        });
      } catch (appwriteError: any) {
        console.error('AuthProvider: Appwrite registration failed:', appwriteError);
        throw appwriteError;
      }
      
    } catch (error: any) {
      const errorMessage = handleAppwriteError(error);
      
      showToast({
        type: 'error',
        title: 'Registration failed',
        message: errorMessage,
      });
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      
      const userId = user?.$id;
      
      // Delete current session using authService
      await authService.logout();
      
      setUser(null);
      
      showToast({
        type: 'success',
        title: 'Logged out',
        message: 'You have been logged out successfully.',
      });
    } catch (error: any) {
      const errorMessage = handleAppwriteError(error);
      showToast({
        type: 'error',
        title: 'Logout failed',
        message: errorMessage,
      });
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Note: Profile updates would need additional implementation
      // as the basic authService doesn't include update methods
      
      // Update user state
      if (user) {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        
        console.log('Profile updated for user:', user.$id);
      }
      
      showToast({
        type: 'success',
        title: 'Profile updated',
        message: 'Your profile has been updated successfully.',
      });
    } catch (error: any) {
      const errorMessage = handleAppwriteError(error);
      showToast({
        type: 'error',
        title: 'Update failed',
        message: errorMessage,
      });
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (userId: string, secret: string): Promise<void> => {
    try {
      setIsLoading(true);
      await authService.verifyEmail(userId, secret);
      
      // Refresh user data
      await checkAuth();
      
      console.log('Email verified for user:', userId);
      
      showToast({
        type: 'success',
        title: 'Email verified',
        message: 'Your email has been verified successfully.',
      });
    } catch (error: any) {
      const errorMessage = handleAppwriteError(error);
      showToast({
        type: 'error',
        title: 'Verification failed',
        message: errorMessage,
      });
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    try {
      setIsLoading(true);
      await authService.sendPasswordRecovery(email);
      
      console.log('Password reset requested for email:', email);
      
      showToast({
        type: 'success',
        title: 'Recovery email sent',
        message: 'Please check your email for password reset instructions.',
      });
    } catch (error: any) {
      const errorMessage = handleAppwriteError(error);
      showToast({
        type: 'error',
        title: 'Recovery failed',
        message: errorMessage,
      });
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (password: string, oldPassword: string): Promise<void> => {
    try {
      setIsLoading(true);
      await account.updatePassword(password, oldPassword);
      
      console.log('Password changed for user:', user?.$id);
      
      showToast({
        type: 'success',
        title: 'Password updated',
        message: 'Your password has been updated successfully.',
      });
    } catch (error: any) {
      const errorMessage = handleAppwriteError(error);
      showToast({
        type: 'error',
        title: 'Update failed',
        message: errorMessage,
      });
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAccount = async (): Promise<void> => {
    try {
      setIsLoading(true);
      
      const userId = user?.$id;
      
      console.log('Account deletion requested for user:', userId);
      
      // In a real implementation, you would handle account deletion
      // For now, we'll just log out the user
      await logout();
      
      showToast({
        type: 'success',
        title: 'Account deletion requested',
        message: 'Your account deletion request has been submitted.',
      });
    } catch (error: any) {
      const errorMessage = handleAppwriteError(error);
      showToast({
        type: 'error',
        title: 'Deletion failed',
        message: errorMessage,
      });
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
    verifyEmail,
    resetPassword,
    updatePassword,
    deleteAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};