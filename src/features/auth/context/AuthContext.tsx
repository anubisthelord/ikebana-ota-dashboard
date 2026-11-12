
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import { api } from '../../../lib/axios';
import { tokenStore } from '../../../lib/token-store';
import { authService } from '../services/auth.service';
import { vendorService } from '../../vendors/services/vendor.service';

import type {
  AuthUser,
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
} from '../types/auth.types';

import type {
  VendorMembership,
} from '../../vendors/types/vendor.types';

interface AuthContextType {
  user: AuthUser | null;
  vendorMemberships: VendorMembership[];
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<RegisterResponse>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

const REFRESH_TOKEN_KEY = 'ikebana_refresh_token';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const [vendorMemberships, setVendorMemberships] = useState<
    VendorMembership[]
  >([]);

  const [isLoading, setIsLoading] = useState(true);

  // Prevent duplicate session restoration in React StrictMode.
  const restorationStarted = useRef(false);

  // Load the logged-in user's vendor memberships.
  const loadVendorMemberships = useCallback(async () => {
    try {
      const response = await vendorService.getMyVendors();
      setVendorMemberships(response.vendors);
    } catch (error) {
      console.error('Failed to load vendor memberships:', error);
      setVendorMemberships([]);
    }
  }, []);

  // Login
  const login = useCallback(
    async (data: LoginRequest) => {
      setIsLoading(true);

      try {
        const response = await authService.login(data);

        tokenStore.setAccessToken(response.accessToken);

        sessionStorage.setItem(
          REFRESH_TOKEN_KEY,
          response.refreshToken,
        );

        setUser(response.user);

        await loadVendorMemberships();
      } finally {
        setIsLoading(false);
      }
    },
    [loadVendorMemberships],
  );

  // Register
  const register = useCallback(
    async (data: RegisterRequest) => {
      return authService.register(data);
    },
    [],
  );

  // Logout
  const logout = useCallback(async () => {
    const refreshToken = sessionStorage.getItem(REFRESH_TOKEN_KEY);

    setIsLoading(true);

    try {
      if (refreshToken) {
        await authService.logout({ refreshToken });
      }
    } finally {
      tokenStore.clearAccessToken();
      sessionStorage.removeItem(REFRESH_TOKEN_KEY);

      setUser(null);
      setVendorMemberships([]);

      setIsLoading(false);
    }
  }, []);

  // Restore existing session when the application loads.
  useEffect(() => {
    if (restorationStarted.current) return;

    restorationStarted.current = true;

    const restoreSession = async () => {
      const refreshToken = sessionStorage.getItem(REFRESH_TOKEN_KEY);

      if (!refreshToken) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await authService.refresh({
          refreshToken,
        });

        tokenStore.setAccessToken(response.accessToken);

        sessionStorage.setItem(
          REFRESH_TOKEN_KEY,
          response.refreshToken,
        );

        // Backend returns { message, user }, not the user directly.
        const profileResponse = await api.get<{
          message: string;
          user: AuthUser;
        }>('/users/me');

        setUser(profileResponse.data.user);

        await loadVendorMemberships();
      } catch (error) {
        console.error('Session restoration failed:', error);

        tokenStore.clearAccessToken();
        sessionStorage.removeItem(REFRESH_TOKEN_KEY);

        setUser(null);
        setVendorMemberships([]);
      } finally {
        setIsLoading(false);
      }
    };

    void restoreSession();
  }, [loadVendorMemberships]);

  return (
    <AuthContext.Provider
      value={{
        user,
        vendorMemberships,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used inside an AuthProvider',
    );
  }

  return context;
}
