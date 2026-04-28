"use client";

import React, { useState } from "react";
import { ArrowLeft, Send, Upload, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function SubmissionForm({ serviceSlug }: { serviceSlug: string }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    nik: "",
    phone: "",
    address: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3); // Success step
    setTimeout(() => {
      router.push("/layanan-masyarakat/status");
    }, 3000);
  };

  if (step === 3) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#009966]/10 text-[#009966] animate-bounce">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-3xl font-bold text-[#0B281F]">Pengajuan Berhasil Terkirim!</h2>
        <p className="mt-4 max-w-md text-[#0B281F]/50">
          Terima kasih. Pengajuan Anda sedang diproses oleh admin desa. Anda akan dialihkan ke halaman status dalam beberapa detik.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link 
        href="/layanan-masyarakat"
        className="mb-10 inline-flex items-center gap-2 text-[14px] font-bold text-[#0B281F]/40 hover:text-[#009966] transition-colors"
      >
        <ArrowLeft size={18} />
        Kembali ke Dashboard
      </Link>

      <div className="rounded-[40px] border border-white bg-white p-8 shadow-2xl md:p-12">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#0B281F]">Formulir Pengajuan</h1>
            <p className="mt-2 text-[#0B281F]/50 font-medium">Layanan: {serviceSlug.split('-').join(' ')}</p>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0B281F]/5 text-[#0B281F]">
            <FileText size={28} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-[13px] font-bold uppercase tracking-widest text-[#0B281F]/40 ml-1">Nama Lengkap</label>
              <input 
                type="text" required
                className="w-full h-14 rounded-2xl border border-[#0B281F]/5 bg-[#F6F8F7] px-6 text-[15px] font-medium outline-none focus:ring-4 focus:ring-[#0B281F]/5 transition-all"
                placeholder="Masukkan nama sesuai KTP"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-bold uppercase tracking-widest text-[#0B281F]/40 ml-1">NIK</label>
              <input 
                type="text" required
                className="w-full h-14 rounded-2xl border border-[#0B281F]/5 bg-[#F6F8F7] px-6 text-[15px] font-medium outline-none focus:ring-4 focus:ring-[#0B281F]/5 transition-all"
                placeholder="16 digit NIK"
                value={formData.nik}
                onChange={(e) => setFormData({...formData, nik: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-bold uppercase tracking-widest text-[#0B281F]/40 ml-1">Nomor HP / WhatsApp</label>
            <input 
              type="tel" required
              className="w-full h-14 rounded-2xl border border-[#0B281F]/5 bg-[#F6F8F7] px-6 text-[15px] font-medium outline-none focus:ring-4 focus:ring-[#0B281F]/5 transition-all"
              placeholder="08xxxxxxxxxx"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[13px] font-bold uppercase tracking-widest text-[#0B281F]/40 ml-1">Catatan Tambahan (Opsional)</label>
            <textarea 
              rows={4}
              className="w-full rounded-2xl border border-[#0B281F]/5 bg-[#F6F8F7] p-6 text-[15px] font-medium outline-none focus:ring-4 focus:ring-[#0B281F]/5 transition-all"
              placeholder="Jelaskan detail keperluan pengajuan Anda..."
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
            />
          </div>

          <div className="space-y-4">
            <label className="text-[13px] font-bold uppercase tracking-widest text-[#0B281F]/40 ml-1">Upload Dokumen Persyaratan (PDF/JPG)</label>
            <div className="group relative flex h-48 cursor-pointer flex-col items-center justify-center rounded-[32px] border-2 border-dashed border-[#0B281F]/10 bg-[#F6F8F7] transition-all hover:border-[#009966]/40 hover:bg-emerald-50">
              <Upload className="mb-4 text-[#0B281F]/20 group-hover:text-[#009966]" size={32} />
              <p className="text-[14px] font-bold text-[#0B281F]/60">Tarik berkas ke sini atau <span className="text-[#009966]">klik untuk mencari</span></p>
              <p className="mt-2 text-[11px] text-[#0B281F]/30 uppercase tracking-widest">KTP, KK, & Surat Pengantar RT/RW (Maks. 5MB)</p>
              <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
          </div>

          <button 
            type="submit"
            className="flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-[#009966] text-[15px] font-bold text-white shadow-xl transition-all hover:bg-[#00B373] hover:-translate-y-1"
          >
            <Send size={18} />
            Kirim Pengajuan Sekarang
          </button>
        </form>
      </div>
    </div>
  );
}
