"use client";

import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import { toast } from "sonner";
import { 
  Users, 
  Search, 
  UserCheck, 
  UserX, 
  Key, 
  Copy, 
  Check, 
  X, 
  Loader2,
  AlertCircle
} from "lucide-react";

export default function AktivasiWargaPage() {
  const [residents, setResidents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  // Activation modal states
  const [selectedResident, setSelectedResident] = useState<any | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Credentials modal (success) states
  const [createdCredentials, setCreatedCredentials] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);

  const fetchResidents = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("admin/warga");
      setResidents(res.data.data || []);
    } catch (err: any) {
      console.error(err);
      toast.error("Gagal mengambil data penduduk dari server.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResidents();
  }, []);

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Kata sandi harus minimal 6 karakter.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Konfirmasi kata sandi tidak cocok.");
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post(`admin/warga/${selectedResident.id}/activate`, {
        password,
        password_confirmation: confirmPassword
      });

      toast.success(`Akun portal warga ${selectedResident.nama} berhasil diaktifkan!`);
      
      // Save credentials to display to the admin
      setCreatedCredentials({
        nama: selectedResident.nama,
        nik: selectedResident.nik,
        password: password
      });

      setSelectedResident(null);
      setPassword("");
      setConfirmPassword("");
      fetchResidents();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || err?.message || "Gagal mengaktifkan akun warga.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = () => {
    if (!createdCredentials) return;
    const text = `INFO PORTAL WARGA DESA PAMEUTINGAN\n\nNama: ${createdCredentials.nama}\nNIK (Username): ${createdCredentials.nik}\nKata Sandi: ${createdCredentials.password}\n\nSilakan masuk melalui portal layanan mandiri warga.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Kredensial berhasil disalin!");
    setTimeout(() => setCopied(false), 2000);
  };

  // Filter residents based on search
  const filteredResidents = residents.filter(res => 
    res.nama?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    res.nik?.includes(searchQuery)
  );

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Header Block */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0B281F] tracking-tight font-[Georgia,serif]">
            Aktivasi Portal Warga
          </h1>
          <p className="text-sm text-[#0B281F]/60 mt-1.5 font-medium">
            Kelola akses portal mandiri warga dengan mencocokkan data penduduk desa yang valid.
          </p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#009966]/10 text-[#009966]">
          <Users size={24} />
        </div>
      </div>

      {/* Roster Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-50">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-[#0B281F]/30" />
          <input
            type="text"
            placeholder="Cari warga berdasarkan Nama atau NIK..."
            className="w-full pl-12 pr-4 h-12 text-[14px] bg-[#F6F8F7] border border-[#0B281F]/5 rounded-xl outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all font-semibold text-[#0B281F]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          onClick={fetchResidents}
          className="w-full sm:w-auto h-12 px-6 bg-[#0B281F]/5 text-[#0B281F] hover:bg-[#0B281F]/10 font-bold text-[13px] rounded-xl transition-all flex items-center justify-center gap-2"
        >
          Penyelarasan Data
        </button>
      </div>

      {/* Table & Cards */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="py-24 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#009966] mb-3" />
            <p className="text-sm font-bold text-[#0B281F]/50 uppercase tracking-widest">Memuat database warga...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40">
                  <th className="p-5 pl-8">Nama Lengkap</th>
                  <th className="p-5">NIK</th>
                  <th className="p-5">Status Portal</th>
                  <th className="p-5">Email Terdaftar</th>
                  <th className="p-5 pr-8 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[13.5px] font-semibold text-[#0B281F]">
                {filteredResidents.map((res) => (
                  <tr key={res.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-5 pl-8">
                      <div className="flex flex-col">
                        <span className="font-bold">{res.nama}</span>
                        <span className="text-[11px] text-[#0B281F]/40 font-medium uppercase mt-0.5">{res.tempat_lahir}, {res.tanggal_lahir}</span>
                      </div>
                    </td>
                    <td className="p-5 font-mono text-[12.5px] text-[#0B281F]/60">{res.nik}</td>
                    <td className="p-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${
                        res.user_is_active 
                          ? "bg-emerald-50 text-emerald-700" 
                          : "bg-amber-50 text-amber-700"
                      }`}>
                        {res.user_is_active ? (
                          <>
                            <UserCheck size={12} />
                            <span>Aktif</span>
                          </>
                        ) : (
                          <>
                            <UserX size={12} />
                            <span>Belum Aktif</span>
                          </>
                        )}
                      </span>
                    </td>
                    <td className="p-5 text-[#0B281F]/60 font-medium">{res.user_email || "-"}</td>
                    <td className="p-5 pr-8 text-center">
                      {res.user_is_active ? (
                        <button
                          disabled
                          className="h-9 px-4 rounded-xl border border-slate-100 bg-slate-50 text-[#0B281F]/30 text-[12px] font-bold cursor-not-allowed"
                        >
                          Sudah Aktif
                        </button>
                      ) : (
                        <button
                          onClick={() => setSelectedResident(res)}
                          className="h-9 px-4 rounded-xl bg-[#009966] text-white hover:bg-[#007f55] text-[12px] font-bold shadow-sm transition-all"
                        >
                          Aktifkan Portal
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredResidents.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-20 text-center text-[#0B281F]/30 uppercase tracking-widest text-[11px] font-bold">
                      Tidak ada data penduduk yang cocok.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Activation Dialog Modal */}
      {selectedResident && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-white bg-white p-6 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div>
                <h4 className="text-lg font-bold text-[#0B281F] font-[Georgia,serif]">Aktifkan Portal Warga</h4>
                <p className="text-xs text-[#0B281F]/50 font-medium">Pemohon: {selectedResident.nama}</p>
              </div>
              <button 
                onClick={() => setSelectedResident(null)}
                className="text-[#0B281F]/40 hover:text-[#0B281F]"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleActivate} className="space-y-4">
              <div className="bg-amber-50 border border-amber-200/50 rounded-2xl p-4 flex gap-3 text-amber-800">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <p className="text-[11.5px] leading-relaxed font-semibold">
                  Warga akan login menggunakan NIK mereka (<span className="font-mono">{selectedResident.nik}</span>) dan kata sandi sementara yang Anda tetapkan di bawah.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">Kata Sandi Sementara</label>
                <div className="relative">
                  <Key className="absolute left-3 top-3 h-5 w-5 text-[#0B281F]/30" />
                  <input
                    type="password"
                    required
                    placeholder="Minimal 6 karakter..."
                    className="w-full pl-10 pr-4 h-11 text-[13px] bg-[#F6F8F7] border border-[#0B281F]/5 rounded-xl outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all font-semibold text-[#0B281F]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">Konfirmasi Kata Sandi</label>
                <div className="relative">
                  <Key className="absolute left-3 top-3 h-5 w-5 text-[#0B281F]/30" />
                  <input
                    type="password"
                    required
                    placeholder="Ketik ulang kata sandi..."
                    className="w-full pl-10 pr-4 h-11 text-[13px] bg-[#F6F8F7] border border-[#0B281F]/5 rounded-xl outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all font-semibold text-[#0B281F]"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedResident(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-[12px] font-bold text-[#0B281F]/60 hover:bg-[#F6F8F7]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-[#009966] text-white hover:bg-[#007f55] text-[12px] font-bold shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting && <Loader2 size={14} className="animate-spin" />}
                  Simpan & Aktifkan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Credentials modal */}
      {createdCredentials && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-white bg-white p-6 shadow-2xl animate-scaleUp text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-4 animate-bounce">
              <UserCheck size={28} />
            </div>

            <h4 className="text-xl font-bold text-[#0B281F] font-[Georgia,serif]">Portal Berhasil Diaktifkan!</h4>
            <p className="text-[12.5px] text-[#0B281F]/50 mt-1 font-medium">Berikan kredensial berikut secara rahasia kepada warga.</p>

            <div className="my-6 bg-[#F6F8F7] p-4 rounded-2xl border border-slate-100 text-left space-y-3 font-semibold">
              <div className="flex flex-col">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0B281F]/30">Nama Warga</span>
                <span className="text-[13px] text-[#0B281F] mt-0.5">{createdCredentials.nama}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0B281F]/30">NIK (Username)</span>
                <span className="text-[13px] text-[#0B281F] font-mono mt-0.5">{createdCredentials.nik}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0B281F]/30">Kata Sandi Sementara</span>
                <span className="text-[13px] text-[#0B281F] font-mono mt-0.5">{createdCredentials.password}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={copyToClipboard}
                className="flex-1 h-11 rounded-xl border border-slate-200 text-[12px] font-bold text-[#0B281F]/70 hover:bg-[#F6F8F7] transition-all flex items-center justify-center gap-2"
              >
                {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                {copied ? "Tersalin" : "Salin Info Portal"}
              </button>
              <button
                type="button"
                onClick={() => setCreatedCredentials(null)}
                className="flex-1 h-11 rounded-xl bg-[#0B281F] text-white hover:bg-black text-[12px] font-bold transition-all"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
