export type GlobalRole = 'USER' | 'SUPER_ADMIN';

export type UserStatus = 'ACTIVE' | 'SUSPENDED';

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  globalRole: GlobalRole;
  status: UserStatus;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface AuthResponse {
  message: string;
  tokenType: 'Bearer';
  expiresIn: number;
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

export interface RefreshResponse {
  message: string;
  tokenType: 'Bearer';
  expiresIn: number;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterResponse {
  message: string;
  user: AuthUser & {
    createdAt: string;
  };
}

export interface LogoutResponse {
  message: string;
}