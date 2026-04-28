"use client";

import React, { useState } from "react";
import { useAuth } from "@/features/layanan/context/AuthContext";
import { Lock, User as UserIcon, ShieldCheck, ArrowRight, Home } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(nik, password);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-screen w-full bg-gradient-to-br from-[#0B281F] via-[#004F3B] to-[#0B281F] relative flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Decorative Background Accents with Yellow Effect */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-[#00E0A1]/10 blur-[120px] animate-pulse" />
      <div className="pointer-events-none absolute -left-32 -bottom-32 h-[400px] w-[400px] rounded-full bg-[#F0B100]/10 blur-[100px] animate-pulse" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#F0B100]/5 blur-[150px] opacity-30" />
      
      {/* Glassmorphism Login Card - Moderate Rounded Corners */}
      <div className="relative z-20 w-full max-w-4xl overflow-hidden rounded-3xl border border-white/30 bg-white/70 shadow-[0_40px_100px_rgba(0,0,0,0.12)] backdrop-blur-2xl flex flex-col md:flex-row transition-all">
        
        {/* Left Side: Visual Image */}
        <div className="relative hidden md:flex w-1/2 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop" 
            alt="Pelayanan Desa" 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0B281F] via-[#0B281F]/40 to-transparent" />
          
          <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-xl border border-white/20 shadow-lg">
              <ShieldCheck className="text-[#00E0A1]" size={24} />
            </div>
            <h2 className="font-[Georgia,serif] text-2xl font-bold leading-tight lg:text-3xl">
              Portal <br />
              <span className="text-[#00E0A1]">Pelayanan Desa</span>
            </h2>
          </div>
        </div>

        {/* Right Side: Form Area - No Internal Scroll */}
        <div className="w-full md:w-1/2 p-8 md:p-10 lg:p-12 flex flex-col justify-center bg-white/40">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-7 w-7 overflow-hidden rounded-lg bg-white p-1 shadow-sm border border-[#0B281F]/5">
                 <img src="/img/image.png" alt="Logo" className="h-full w-full object-contain" />
              </div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#0B281F]/40">Desa Pameutingan</h3>
            </div>
            <h3 
              className="text-3xl font-bold text-[#0B281F]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Masuk Akun
            </h3>
            <p className="mt-2 text-[14px] text-[#0B281F]/50 font-medium">Lengkapi data autentikasi Anda.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[12px] font-bold uppercase tracking-widest text-[#0B281F]/40 ml-1">NIK / Email</label>
              <div className="group relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#0B281F]/20 group-focus-within:text-[#009966] transition-colors">
                  <UserIcon size={18} />
                </div>
                <input 
                  type="text" required
                  placeholder="NIK atau Email"
                  className="w-full h-12 rounded-xl border border-white bg-white/60 px-5 pl-12 text-[14px] font-bold text-[#0B281F] shadow-sm outline-none focus:ring-4 focus:ring-[#009966]/10 transition-all"
                  value={nik}
                  onChange={(e) => setNik(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[12px] font-bold uppercase tracking-widest text-[#0B281F]/40">Password</label>
                <button type="button" className="text-[11px] font-bold text-[#009966] hover:underline">Lupa?</button>
              </div>
              <div className="group relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#0B281F]/20 group-focus-within:text-[#009966] transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" required
                  placeholder="Password"
                  className="w-full h-12 rounded-xl border border-white bg-white/60 px-5 pl-12 text-[14px] font-bold text-[#0B281F] shadow-sm outline-none focus:ring-4 focus:ring-[#009966]/10 transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="group relative w-full h-12 rounded-xl bg-[#0B281F] text-white font-bold shadow-xl transition-all hover:bg-[#004F3B] active:scale-[0.98] disabled:opacity-50"
            >
              <span className="flex items-center justify-center gap-2 text-[14px]">
                {loading ? "Memproses..." : "Masuk Sekarang"}
                {!loading && <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />}
              </span>
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-[#0B281F]/5 text-center">
            <p className="text-[13px] text-[#0B281F]/40 font-medium">
              Belum punya akun? {" "}
              <Link href="/layanan-masyarakat/daftar" className="font-bold text-[#009966] hover:underline">Daftar</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Back to Home Button Below the Card */}
      <Link 
        href="/"
        className="mt-8 z-30 flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 text-[12px] font-bold text-white hover:bg-white/20 transition-all shadow-lg"
      >
        <Home size={14} />
        Kembali ke Beranda
      </Link>
      
      {/* Footer text */}
      <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
        Digital Government &bull; 2026
      </p>
    </main>
  );
}
