"use client";

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { mockServices } from "../config/mock-data";
import { ServiceCard } from "./ServiceCard";
import { 
  Search, 
  LayoutGrid, 
  LogOut, 
  ClipboardList,
  User as UserIcon
} from "lucide-react";
import Link from "next/link";

export function ServiceDashboard() {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  if (!user) return null;

  // Filter services based on search query
  const filteredServices = mockServices.filter(service => 
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pelayananServices = filteredServices.filter(s => s.category === "Pelayanan");
  const pengajuanServices = filteredServices.filter(s => s.category === "Pengajuan");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Top Profile Bar - Now positioned prominently below hero */}
      <div className="mb-12 flex flex-col gap-6 rounded-[32px] bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0B281F] text-white">
            <UserIcon size={28} />
          </div>
          <div>
            <h1 
              className="text-2xl font-bold text-[#0B281F] md:text-3xl"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Halo, {user.name}
            </h1>
            <p className="text-[#0B281F]/50 font-medium">Apa yang bisa kami bantu hari ini?</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link 
            href="/layanan-masyarakat/status"
            className="flex items-center gap-2 rounded-xl bg-[#009966]/10 px-6 py-3.5 text-[14px] font-bold text-[#009966] transition-all hover:bg-[#009966] hover:text-white shadow-sm"
          >
            <ClipboardList size={18} />
            Status Pengajuan
          </Link>
          <button 
            onClick={logout}
            className="flex items-center gap-2 rounded-xl bg-red-50 px-6 py-3.5 text-[14px] font-bold text-red-600 transition-all hover:bg-red-600 hover:text-white shadow-sm"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Search Bar Area */}
      <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#0B281F]/20" size={22} />
          <input 
            type="text" 
            placeholder="Cari layanan yang Anda butuhkan (contoh: KTP, KK, Akta)..."
            className="h-16 w-full rounded-2xl border border-white bg-white pl-16 pr-6 text-[16px] font-medium shadow-sm outline-none focus:ring-4 focus:ring-[#0B281F]/5 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-white p-2 shadow-sm border border-white">
          <div className="flex h-12 px-4 items-center gap-2 rounded-xl bg-[#0B281F] text-white font-bold text-[13px]">
            <LayoutGrid size={18} />
            Semua Layanan
          </div>
        </div>
      </div>

      {/* Grid Services Grouped */}
      <div className="space-y-24 mb-24">
        {pelayananServices.length > 0 && (
          <section className="space-y-10">
            <div className="flex items-center gap-4">
              <div className="h-10 w-2 bg-[#009966] rounded-full" />
              <h2 className="text-2xl font-bold text-[#0B281F] md:text-3xl" style={{ fontFamily: 'var(--font-timeless)' }}>
                Pelayanan Administrasi
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {pelayananServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </section>
        )}

        {pengajuanServices.length > 0 && (
          <section className="space-y-10">
            <div className="flex items-center gap-4">
              <div className="h-10 w-2 bg-[#F0B100] rounded-full" />
              <h2 className="text-2xl font-bold text-[#0B281F] md:text-3xl" style={{ fontFamily: 'var(--font-timeless)' }}>
                Pusat Pengaduan & Aspirasi
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {pengajuanServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </section>
        )}

        {filteredServices.length === 0 && (
          <div className="py-20 text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-[#0B281F]/5 p-6 text-[#0B281F]/20">
                <Search size={48} />
              </div>
            </div>
            <h3 className="text-xl font-bold text-[#0B281F]">Layanan Tidak Ditemukan</h3>
            <p className="mt-2 text-[#0B281F]/50">Coba gunakan kata kunci lain untuk mencari layanan.</p>
          </div>
        )}
      </div>
    </div>
  );
}
