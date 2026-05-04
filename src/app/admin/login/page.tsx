"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// ── Login Form ────────────────────────────────────────────────────────────
function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await login(email, password);
      // AuthContext.login() handles redirect to /admin/dashboard
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(
        axiosErr?.response?.data?.message ??
          "Email atau password salah. Silakan coba lagi."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-emerald-50 to-slate-100 p-4">
      {/* Background decorative blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 h-96 w-96 rounded-full bg-emerald-400/10 blur-[100px]" />
        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-emerald-600/10 blur-[100px]" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Card */}
        <div className="overflow-hidden rounded-2xl border border-white/80 bg-white shadow-xl shadow-emerald-900/5">
          {/* Header */}
          <div className="bg-gradient-to-b from-emerald-700 to-emerald-800 px-8 py-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm ring-1 ring-white/20">
              <Building2 size={26} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Panel Admin Desa</h1>
            <p className="mt-1 text-sm text-emerald-100/80">
              Masuk untuk mengelola data desa
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-7 space-y-5">
            {/* Error message */}
            {error && (
              <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@desapameutingan.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                autoComplete="email"
                className="h-10"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="current-password"
                  className="h-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-10 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Memverifikasi...
                </>
              ) : (
                <>
                  <LogIn size={16} />
                  Masuk
                </>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="border-t bg-slate-50/80 px-8 py-4 text-center">
            <p className="text-[11px] text-muted-foreground">
              Sistem Informasi Desa Pameutingan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page — wraps its own AuthProvider ────────────────────────────────────
export default function AdminLoginPage() {
  return (
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  );
}
