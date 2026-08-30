/**
 * InternLab Authentication Service Types
 * Compatible with Supabase Auth schema & local state fallback
 */

export interface UserAuthData {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  university?: string;
  createdAt: string;
  emailConfirmedAt?: string;
  userMetadata?: Record<string, any>;
  appMetadata?: {
    provider?: string;
    providers?: string[];
  };
}

export interface SessionData {
  accessToken: string;
  refreshToken?: string;
  tokenType: string;
  expiresIn: number;
  expiresAt: number;
  user: UserAuthData;
}

export interface SignUpParams {
  fullName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  university?: string;
  agreedToTerms: boolean;
}

export interface SignInParams {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface ResetPasswordParams {
  email: string;
}

export interface AuthError {
  message: string;
  code?: string;
  status?: number;
  field?: 'email' | 'password' | 'confirmPassword' | 'fullName' | 'terms' | 'general';
}

export interface AuthResponse<T = SessionData> {
  data: T | null;
  error: AuthError | null;
}

export interface IAuthService {
  signUp(params: SignUpParams): Promise<AuthResponse<SessionData>>;
  signIn(params: SignInParams): Promise<AuthResponse<SessionData>>;
  signInWithGoogle(): Promise<AuthResponse<SessionData>>;
  signOut(): Promise<{ error: AuthError | null }>;
  resetPassword(params: ResetPasswordParams): Promise<AuthResponse<{ message: string; email: string }>>;
  getSession(): SessionData | null;
  isSupabaseConfigured(): boolean;
}
