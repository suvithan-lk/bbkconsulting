import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api, ApiError, getToken, setToken } from '../lib/api';
import type { User } from '../types/database.types';

interface AuthState {
  user: User | null;
  profile: User | null;
  loading: boolean;
  error: string | null;
}

interface AuthResult {
  error: Error | null;
}

interface AuthContextType extends AuthState {
  signUp: (email: string, password: string, name: string, role?: 'client' | 'consultant') => Promise<AuthResult>;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<AuthResult>;
  refreshProfile: () => Promise<void>;
  isAdmin: boolean;
  isConsultant: boolean;
  isClient: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    loading: true,
    error: null,
  });

  const loadProfile = useCallback(async () => {
    if (!getToken()) {
      setState({ user: null, profile: null, loading: false, error: null });
      return;
    }

    try {
      const { user } = await api.get<{ user: User }>('/auth/me');
      setState({ user, profile: user, loading: false, error: null });
    } catch {
      setToken(null);
      setState({ user: null, profile: null, loading: false, error: null });
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const refreshProfile = useCallback(async () => {
    await loadProfile();
  }, [loadProfile]);

  const signUp = async (email: string, password: string, name: string, role: 'client' | 'consultant' = 'client') => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const { token, user } = await api.post<{ token: string; user: User }>('/auth/register', {
        name,
        email,
        password,
        role,
      });
      setToken(token);
      setState({ user, profile: user, loading: false, error: null });
      return { error: null };
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Registration failed';
      setState((prev) => ({ ...prev, loading: false, error: message }));
      return { error: new Error(message) };
    }
  };

  const signIn = async (email: string, password: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const { token, user } = await api.post<{ token: string; user: User }>('/auth/login', { email, password });
      setToken(token);
      setState({ user, profile: user, loading: false, error: null });
      return { error: null };
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Login failed';
      setState((prev) => ({ ...prev, loading: false, error: message }));
      return { error: new Error(message) };
    }
  };

  const signOut = async () => {
    setToken(null);
    setState({ user: null, profile: null, loading: false, error: null });
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!state.user) {
      return { error: new Error('No user logged in') };
    }

    try {
      const { user } = await api.patch<{ user: User }>('/auth/me', updates);
      setState((prev) => ({ ...prev, user, profile: user }));
      return { error: null };
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Update failed';
      return { error: new Error(message) };
    }
  };

  const value: AuthContextType = {
    ...state,
    signUp,
    signIn,
    signOut,
    updateProfile,
    refreshProfile,
    isAdmin: state.profile?.role === 'admin',
    isConsultant: state.profile?.role === 'consultant',
    isClient: state.profile?.role === 'client' || !state.profile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
