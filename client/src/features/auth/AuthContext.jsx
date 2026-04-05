import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { authService } from './authService';
;

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);


  useEffect(() => {
    let isMounted = true;

    authService
      .getSessionUser()
      .then((sessionUser) => {
        if (isMounted) {
          setUser(sessionUser);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsInitializing(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const signIn = async (payload) => {
    const nextUser = await authService.signIn(payload);
    setUser(nextUser);
  };

  const signUp = async (payload) => {
    const nextUser = await authService.signUp(payload);
    setUser(nextUser);
  };

  // Synchronous — guest session is written to localStorage immediately.
  const signInAsGuest = useCallback(() => {
    const guestUser = authService.signInAsGuest();
    setUser(guestUser);
  }, []);

  const signOut = async () => {
    await authService.signOut();
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isInitializing,
      signIn,
      signUp,
      signInAsGuest,
      signOut,
    }),
    [isInitializing, signInAsGuest, user],
  );

  return {children};
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};