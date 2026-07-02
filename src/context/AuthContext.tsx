import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Session, User as SupabaseUser, AuthError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { User } from '../types/database.types';

interface AuthState {
  session: Session | null;
  user: SupabaseUser | null;
  profile: User | null;
  loading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  signUp: (email: string, password: string, name: string) => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<{ error: Error | null }>;
  refreshProfile: () => Promise<void>;
  isAdmin: boolean;
  isConsultant: boolean;
  isClient: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    session: null,
    user: null,
    profile: null,
    loading: true,
    error: null,
  });

  const fetchProfile = useCallback(async (userId: string): Promise<User | null> => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    return data;
  }, []);

  const refreshProfile = useCallback(async () => {
    if (state.user?.id) {
      const profile = await fetchProfile(state.user.id);
      setState(prev => ({ ...prev, profile }));
    }
  }, [state.user?.id, fetchProfile]);

  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) throw error;

        let profile: User | null = null;
        if (session?.user) {
          profile = await fetchProfile(session.user.id);
        }

        if (mounted) {
          setState({
            session,
            user: session?.user ?? null,
            profile,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        if (mounted) {
          setState(prev => ({
            ...prev,
            loading: false,
            error: error instanceof Error ? error.message : 'Authentication error',
          }));
        }
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      (async () => {
        if (event === 'SIGNED_OUT' || !session) {
          setState({
            session: null,
            user: null,
            profile: null,
            loading: false,
            error: null,
          });
          return;
        }

        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          const profile = await fetchProfile(session.user.id);
          if (mounted) {
            setState({
              session,
              user: session.user,
              profile,
              loading: false,
              error: null,
            });
          }
        }
      })();
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const signUp = async (email: string, password: string, name: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (error) {
      setState(prev => ({ ...prev, loading: false, error: error.message }));
      return { error };
    }

    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setState(prev => ({ ...prev, loading: false, error: error.message }));
      return { error };
    }

    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setState({
      session: null,
      user: null,
      profile: null,
      loading: false,
      error: null,
    });
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!state.user) {
      return { error: new Error('No user logged in') };
    }

    const { error } = await supabase
      .from('users')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', state.user.id);

    if (error) {
      return { error: new Error(error.message) };
    }

    await refreshProfile();
    return { error: null };
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
