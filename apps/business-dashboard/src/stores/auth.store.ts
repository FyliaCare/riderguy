import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Business {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: 'individual' | 'enterprise';
  businessType?: string;
  address?: string;
  logoUrl?: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: 'owner' | 'admin' | 'member';
  businessId: string;
}

interface AuthState {
  user: User | null;
  business: Business | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (googleToken: string) => Promise<void>;
  logout: () => void;
  updateBusiness: (business: Partial<Business>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      business: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // TODO: Connect to auth service at http://localhost:4001/api/auth/login
        console.log('Business Login:', { email, password });
        
        // Mock login for now
        const mockUser: User = {
          id: '1',
          email,
          name: 'Business Owner',
          role: 'owner',
          businessId: 'biz_1'
        };

        const mockBusiness: Business = {
          id: 'biz_1',
          name: 'Test Business',
          email,
          phone: '+234 123 456 7890',
          tier: 'individual'
        };

        set({
          user: mockUser,
          business: mockBusiness,
          token: 'mock_token_123',
          isAuthenticated: true
        });
      },

      logout: () => {
        set({
          user: null,
          business: null,
          token: null,
          isAuthenticated: false
        });
      },

      loginWithGoogle: async (googleToken: string) => {
        // TODO: Send Google token to auth service at http://localhost:4001/api/auth/google
        console.log('Google OAuth Login:', { googleToken });
        
        // Mock login for now
        const mockUser: User = {
          id: '1',
          email: 'business@gmail.com',
          name: 'Google Business User',
          role: 'owner',
          businessId: 'biz_1'
        };

        const mockBusiness: Business = {
          id: 'biz_1',
          name: 'Google Business',
          email: 'business@gmail.com',
          phone: '+234 123 456 7890',
          tier: 'individual'
        };

        set({
          user: mockUser,
          business: mockBusiness,
          token: googleToken,
          isAuthenticated: true
        });
      },

      updateBusiness: (updates: Partial<Business>) => {
        set((state) => ({
          business: state.business ? { ...state.business, ...updates } : null
        }));
      }
    }),
    {
      name: 'business-auth-storage'
    }
  )
);
