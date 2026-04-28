"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, CheckCircle2, XCircle, FileText, ExternalLink } from "lucide-react";

const mockSubmissions = [
  { id: "REQ-001", service: "Surat Keterangan Domisili", date: "24 Apr 2026", status: "Diproses", color: "text-amber-600", bg: "bg-amber-50" },
  { id: "REQ-002", service: "SKTM (Pendidikan)", date: "20 Apr 2026", status: "Disetujui", color: "text-emerald-600", bg: "bg-emerald-50" },
  { id: "REQ-003", service: "Surat Keterangan Usaha", date: "15 Apr 2026", status: "Ditolak", color: "text-red-600", bg: "bg-red-50" },
];

export default function StatusPengajuanPage() {
  return (
    <main className="min-h-screen bg-[#F6F8F7] pt-24 pb-20">
      <div className="mx-auto max-w-5xl px-4">
        <Link 
          href="/layanan-masyarakat"
          className="mb-10 inline-flex items-center gap-2 text-[14px] font-bold text-[#0B281F]/40 hover:text-[#009966] transition-colors"
        >
          <ArrowLeft size={18} />
          Kembali ke Dashboard
        </Link>

        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[#0B281F]">Status Pengajuan Anda</h1>
          <p className="mt-2 text-[#0B281F]/50 font-medium">Pantau progres permohonan dokumen Anda di sini.</p>
        </div>

        <div className="space-y-4">
          {mockSubmissions.map((sub) => (
            <div 
              key={sub.id}
              className="flex flex-col gap-6 rounded-[32px] border border-white bg-white p-6 shadow-sm transition-all hover:shadow-md md:flex-row md:items-center md:justify-between md:p-8"
            >
              <div className="flex items-center gap-6">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${sub.bg} ${sub.color}`}>
                  <FileText size={28} />
                </div>
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-widest text-[#0B281F]/30">{sub.id}</p>
                  <h3 className="text-[18px] font-bold text-[#0B281F]">{sub.service}</h3>
                  <p className="text-[13px] text-[#0B281F]/50">Diajukan pada {sub.date}</p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-8 border-t border-[#0B281F]/5 pt-6 md:border-t-0 md:pt-0">
                <div className="flex items-center gap-3">
                  <div className={`h-2.5 w-2.5 rounded-full ${sub.status === 'Diproses' ? 'bg-amber-500 animate-pulse' : sub.status === 'Disetujui' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                  <span className={`text-[14px] font-bold ${sub.color}`}>{sub.status}</span>
                </div>
                
                <button className="flex items-center gap-2 rounded-xl bg-[#0B281F]/5 px-5 py-3 text-[13px] font-bold text-[#0B281F] transition-all hover:bg-[#0B281F] hover:text-white">
                  Detail Pengajuan
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-[32px] bg-[#0B281F] p-8 text-white">
          <div className="flex flex-col gap-8 md:flex-row md:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[#F0B100]">
              <CheckCircle2 size={32} />
            </div>
            <div>
              <h4 className="text-xl font-bold">Informasi Pengambilan</h4>
              <p className="mt-1 text-[14px] text-white/60 leading-relaxed">
                Untuk pengajuan dengan status <span className="text-[#009966] font-bold">Disetujui</span>, silakan datang ke Balai Desa Pameutingan pada jam kerja dengan membawa dokumen fisik asli untuk verifikasi akhir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
