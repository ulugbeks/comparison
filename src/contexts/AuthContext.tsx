import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isShopOwner: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isShopOwner, setIsShopOwner] = useState(false);

  // Check if user is a shop owner
  const checkShopOwnerStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('shop_owners')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) throw error;
      setIsShopOwner(!!data);
    } catch (error) {
      console.error('Error checking shop owner status:', error);
      setIsShopOwner(false);
    }
  };

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkShopOwnerStatus(session.user.id);
      }
      setLoading(false);
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await checkShopOwnerStatus(session.user.id);
      } else {
        setIsShopOwner(false);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    });

    if (error) {
      throw new Error('Invalid email or password');
    }

    if (!data.user) {
      throw new Error('No user data returned');
    }

    await checkShopOwnerStatus(data.user.id);
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ 
      email, 
      password 
    });
    
    if (error) {
      throw new Error(`Registration failed: ${error.message}`);
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw new Error(`Sign out failed: ${error.message}`);
    }
    
    setIsShopOwner(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isShopOwner, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};