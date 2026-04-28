"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  login: (nik: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("village_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (nik: string, password: string) => {
    // Simulate API call
    if (nik && password) {
      const mockUser: User = {
        id: "1",
        name: "Warga Pameutingan",
        nik: nik,
        email: "warga@desa.com"
      };
      setUser(mockUser);
      localStorage.setItem("village_user", JSON.stringify(mockUser));
      router.push("/layanan-masyarakat");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("village_user");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
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
