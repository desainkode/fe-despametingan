"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { User } from "@/types";
import { useRouter } from "next/navigation";
import { login as apiLogin, logout as apiLogout, getMe } from "@/lib/api/auth";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (nik: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Restore session on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("auth_token");
    if (!savedToken) {
      setIsLoading(false);
      return;
    }
    setToken(savedToken);
    
    getMe()
      .then((userData) => {
        if (userData && userData.role === "warga") {
          setUser(userData);
        } else {
          setUser(null);
        }
      })
      .catch((err) => {
        console.error("Sesi warga tidak valid:", err);
        localStorage.removeItem("auth_token");
        document.cookie = "auth_token=; Max-Age=0; path=/";
        setToken(null);
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(
    async (nik: string, password: string) => {
      const { user: userData, token: authToken } = await apiLogin(nik, password);
      
      if (userData.role !== "warga") {
        throw new Error("Kredensial Anda bukan akun warga.");
      }

      localStorage.setItem("auth_token", authToken);
      document.cookie = `auth_token=${authToken}; path=/; SameSite=Lax`;
      setToken(authToken);
      setUser(userData);
      router.push("/layanan-masyarakat");
    },
    [router]
  );

  const logout = useCallback(async () => {
    try {
      await apiLogout();
    } catch {
      // ignore
    }
    localStorage.removeItem("auth_token");
    document.cookie = "auth_token=; Max-Age=0; path=/";
    setToken(null);
    setUser(null);
    router.push("/layanan-masyarakat/login");
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!user && !!token,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
