"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { login as apiLogin, logout as apiLogout, getMe } from "@/lib/api/auth";
import type { User } from "@/types";

// ── Types ──────────────────────────────────────────────────────────────────
interface AuthContextValue {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// ── Context ────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextValue | null>(null);

// ── Provider ───────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("auth_token");
    if (!savedToken) {
      setIsLoading(false);
      return;
    }
    setToken(savedToken);
    // Verify token is still valid by calling /api/me
    getMe()
      .then((userData) => setUser(userData))
      .catch(() => {
        localStorage.removeItem("auth_token");
        document.cookie = "auth_token=; Max-Age=0; path=/";
        setToken(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const { user: userData, token: authToken } = await apiLogin(
        email,
        password
      );
      // Persist token in localStorage (client) AND cookie (for middleware)
      localStorage.setItem("auth_token", authToken);
      document.cookie = `auth_token=${authToken}; path=/; SameSite=Lax`;
      setToken(authToken);
      setUser(userData);
      router.push("/admin/dashboard");
    },
    [router]
  );

  const logout = useCallback(async () => {
    try {
      await apiLogout();
    } catch {
      // ignore network errors — clear local state regardless
    }
    localStorage.removeItem("auth_token");
    document.cookie = "auth_token=; Max-Age=0; path=/";
    setToken(null);
    setUser(null);
    router.push("/admin/login");
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user && !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ── Hook ───────────────────────────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
