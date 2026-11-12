import { api } from '../../../lib/axios';

import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
  RefreshTokenRequest,
  RefreshResponse,
  LogoutResponse,
} from '../types/auth.types';

export const authService = {
  async register(
    data: RegisterRequest,
  ): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>(
      '/auth/register',
      data,
    );

    return response.data;
  },

  async login(
    data: LoginRequest,
  ): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
      '/auth/login',
      data,
    );

    return response.data;
  },

  async refresh(
    data: RefreshTokenRequest,
  ): Promise<RefreshResponse> {
    const response = await api.post<RefreshResponse>(
      '/auth/refresh',
      data,
    );

    return response.data;
  },

  async logout(
    data: RefreshTokenRequest,
  ): Promise<LogoutResponse> {
    const response = await api.post<LogoutResponse>(
      '/auth/logout',
      data,
    );

    return response.data;
  },
};