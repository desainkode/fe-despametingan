"use client";

import React, { useState } from "react";
import { Lock, User as UserIcon, ShieldCheck, ArrowRight, Home, Mail, Smartphone, CreditCard } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    nik: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate registration
    setTimeout(() => {
      setLoading(false);
      router.push("/layanan-masyarakat/login");
    }, 1500);
  };

  return (
    <main className="h-screen w-full bg-gradient-to-br from-[#0B281F] via-[#004F3B] to-[#0B281F] relative flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Decorative Background Accents */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-[#00E0A1]/10 blur-[120px] animate-pulse" />
      <div className="pointer-events-none absolute -left-32 -bottom-32 h-[400px] w-[400px] rounded-full bg-[#F0B100]/10 blur-[100px] animate-pulse" />
      
      {/* Glassmorphism Register Card */}
      <div className="relative z-20 w-full max-w-5xl overflow-hidden rounded-3xl border border-white/30 bg-white/70 shadow-[0_40px_100px_rgba(0,0,0,0.12)] backdrop-blur-2xl flex flex-col md:flex-row transition-all max-h-[95vh]">
        
        {/* Left Side: Visual/Branding (Smaller on Register) */}
        <div className="relative hidden md:flex w-1/3 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop" 
            alt="Pendaftaran" 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0B281F]/80 backdrop-blur-[2px]" />
          
          <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-xl border border-white/20 shadow-lg">
              <ShieldCheck className="text-[#00E0A1]" size={20} />
            </div>
            <h2 className="font-[Georgia,serif] text-xl font-bold leading-tight lg:text-2xl">
              Gabung Bersama <br />
              <span className="text-[#00E0A1]">Warga Digital</span>
            </h2>
            <p className="mt-3 text-[12px] text-white/50 leading-relaxed">
              Daftarkan diri Anda untuk menikmati kemudahan layanan desa secara online.
            </p>
          </div>
        </div>

        {/* Right Side: Form Area - Optimizing space to avoid scroll */}
        <div className="w-full md:w-2/3 p-6 md:p-10 lg:p-12 flex flex-col justify-center bg-white/40 overflow-y-auto">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 
                className="text-2xl font-bold text-[#0B281F]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Buat Akun Baru
              </h3>
              <p className="mt-1 text-[13px] text-[#0B281F]/50 font-medium">Lengkapi formulir pendaftaran warga.</p>
            </div>
            <div className="h-10 w-10 overflow-hidden rounded-xl bg-white p-1.5 shadow-sm border border-[#0B281F]/5">
               <img src="/img/image.png" alt="Logo" className="h-full w-full object-contain" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-widest text-[#0B281F]/40 ml-1">Nama Lengkap</label>
                <div className="group relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0B281F]/20 group-focus-within:text-[#009966]" size={16} />
                  <input 
                    type="text" required
                    className="w-full h-11 rounded-xl border border-white bg-white/60 px-4 pl-11 text-[13px] font-bold text-[#0B281F] shadow-sm outline-none focus:ring-4 focus:ring-[#009966]/10 transition-all"
                    placeholder="Sesuai KTP"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-widest text-[#0B281F]/40 ml-1">NIK</label>
                <div className="group relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0B281F]/20 group-focus-within:text-[#009966]" size={16} />
                  <input 
                    type="text" required
                    className="w-full h-11 rounded-xl border border-white bg-white/60 px-4 pl-11 text-[13px] font-bold text-[#0B281F] shadow-sm outline-none focus:ring-4 focus:ring-[#009966]/10 transition-all"
                    placeholder="16 Digit NIK"
                    value={formData.nik}
                    onChange={(e) => setFormData({...formData, nik: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-widest text-[#0B281F]/40 ml-1">Email</label>
                <div className="group relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0B281F]/20 group-focus-within:text-[#009966]" size={16} />
                  <input 
                    type="email" required
                    className="w-full h-11 rounded-xl border border-white bg-white/60 px-4 pl-11 text-[13px] font-bold text-[#0B281F] shadow-sm outline-none focus:ring-4 focus:ring-[#009966]/10 transition-all"
                    placeholder="contoh@mail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-widest text-[#0B281F]/40 ml-1">No. WhatsApp</label>
                <div className="group relative">
                  <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0B281F]/20 group-focus-within:text-[#009966]" size={16} />
                  <input 
                    type="tel" required
                    className="w-full h-11 rounded-xl border border-white bg-white/60 px-4 pl-11 text-[13px] font-bold text-[#0B281F] shadow-sm outline-none focus:ring-4 focus:ring-[#009966]/10 transition-all"
                    placeholder="08xxxxxxxxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-widest text-[#0B281F]/40 ml-1">Password</label>
                <div className="group relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0B281F]/20 group-focus-within:text-[#009966]" size={16} />
                  <input 
                    type="password" required
                    className="w-full h-11 rounded-xl border border-white bg-white/60 px-4 pl-11 text-[13px] font-bold text-[#0B281F] shadow-sm outline-none focus:ring-4 focus:ring-[#009966]/10 transition-all"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-widest text-[#0B281F]/40 ml-1">Konfirmasi</label>
                <div className="group relative">
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0B281F]/20 group-focus-within:text-[#009966]" size={16} />
                  <input 
                    type="password" required
                    className="w-full h-11 rounded-xl border border-white bg-white/60 px-4 pl-11 text-[13px] font-bold text-[#0B281F] shadow-sm outline-none focus:ring-4 focus:ring-[#009966]/10 transition-all"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="group relative w-full h-12 rounded-xl bg-[#0B281F] text-white font-bold shadow-xl transition-all hover:bg-[#004F3B] active:scale-[0.98] disabled:opacity-50"
            >
              <span className="flex items-center justify-center gap-2 text-[14px]">
                {loading ? "Mendaftar..." : "Daftar Akun"}
                {!loading && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
              </span>
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#0B281F]/5 text-center">
            <p className="text-[13px] text-[#0B281F]/40 font-medium">
              Sudah punya akun? {" "}
              <Link href="/layanan-masyarakat/login" className="font-bold text-[#009966] hover:underline">Masuk</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Back to Home Button */}
      <Link 
        href="/"
        className="mt-6 z-30 flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-[11px] font-bold text-white hover:bg-white/20 transition-all shadow-sm"
      >
        <Home size={12} />
        Kembali ke Beranda
      </Link>
    </main>
  );
}
