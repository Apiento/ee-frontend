import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => {
  // Initialize auth state
  supabase.auth.getSession().then(({ data: { session } }) => {
    set({ user: session?.user ?? null, loading: false });
  });

  // Listen for auth changes
  supabase.auth.onAuthStateChange((_event, session) => {
    set({ user: session?.user ?? null });
  });

  return {
    user: null,
    loading: true,
    signIn: async (email: string, password: string) => {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      set({ user: data.user });
    },
    signUp: async (email: string, password: string) => {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      set({ user: data.user });
    },
    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null });
    },
  };
});