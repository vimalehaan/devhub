import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

import type { User } from "../types/auth";
import { getCurrentUser, login } from "../services/auth.service";
import { authStorage } from "../services/auth.storage";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  loginUser: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreUser = async () => {
      const token = authStorage.getToken();

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        authStorage.clearToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreUser();
  }, []);

  const loginUser = async (email: string, password: string): Promise<void> => {
    const result = await login({
      email,
      password,
    });

    authStorage.setToken(result.token);

    const currentUser = await getCurrentUser();

    setUser(currentUser);
  };

  const logout = () => {
    authStorage.clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }

  return context;
}
