"use client";

import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import { toast } from "sonner";
import { 
  FileText,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Play,
  Download,
  Calendar,
  User,
  Hash,
  AlertCircle,
  Loader2,
  X,
  Plus
} from "lucide-react";

export default function PermohonanSuratAdminPage() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  
  // Selected detail modal
  const [selectedSub, setSelectedSub] = useState<any | null>(null);
  
  // Approval / rejection modal states
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [nomorSurat, setNomorSurat] = useState("");
  
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [catatanRejection, setCatatanRejection] = useState("");
  
  const [isActionSubmitting, setIsActionSubmitting] = useState(false);

  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("admin/pengajuan");
      setSubmissions(res.data.data || []);
    } catch (err: any) {
      console.error(err);
      toast.error("Gagal mengambil daftar pengajuan surat.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleProcess = async (id: string) => {
    try {
      toast.loading("Memperbarui status pengajuan...");
      await api.post(`admin/pengajuan/${id}/process`);
      toast.dismiss();
      toast.success("Pengajuan kini sedang diproses.");
      fetchSubmissions();
      setSelectedSub(null);
    } catch (err: any) {
      toast.dismiss();
      console.error(err);
      toast.error("Gagal memproses pengajuan.");
    }
  };

  const handleApprove = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomorSurat.trim()) {
      toast.error("Nomor surat wajib diisi.");
      return;
    }
    
    setIsActionSubmitting(true);
    try {
      await api.post(`admin/pengajuan/${selectedSub.id}/approve`, {
        nomor_surat: nomorSurat
      });
      
      toast.success("Pengajuan disetujui dan surat PDF berhasil diterbitkan!");
      setIsApproveOpen(false);
      setNomorSurat("");
      fetchSubmissions();
      
      // Auto-trigger PDF download for convenience!
      downloadApprovedPdf(selectedSub.id);
      
      setSelectedSub(null);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || err?.message || "Gagal menyetujui pengajuan.");
    } finally {
      setIsActionSubmitting(false);
    }
  };

  const handleReject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catatanRejection.trim()) {
      toast.error("Alasan penolakan wajib diisi.");
      return;
    }
    
    setIsActionSubmitting(true);
    try {
      await api.post(`admin/pengajuan/${selectedSub.id}/reject`, {
        catatan: catatanRejection
      });
      
      toast.success("Pengajuan berhasil ditolak.");
      setIsRejectOpen(false);
      setCatatanRejection("");
      fetchSubmissions();
      setSelectedSub(null);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || err?.message || "Gagal menolak pengajuan.");
    } finally {
      setIsActionSubmitting(false);
    }
  };

  const downloadApprovedPdf = async (id: string) => {
    try {
      toast.loading("Mempersiapkan unduhan PDF...");
      const response = await api.get(`admin/pengajuan/${id}/download`, {
        responseType: 'blob'
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Surat_Resmi_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      toast.dismiss();
      toast.success("PDF berhasil diunduh.");
    } catch (err) {
      console.error(err);
      toast.dismiss();
      toast.error("Gagal mengunduh berkas PDF.");
    }
  };

  // Filter lists based on status and search query
  const filteredSubmissions = submissions.filter(sub => {
    const matchesSearch = 
      sub.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.penduduk?.nama?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.penduduk?.nik?.includes(searchQuery) ||
      sub.layanan_surat?.nama_layanan?.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === "all" ? true : sub.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Header Block */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0B281F] tracking-tight font-[Georgia,serif]">
            Permohonan Pelayanan Surat
          </h1>
          <p className="text-sm text-[#0B281F]/60 mt-1.5 font-medium">
            Verifikasi berkas persyaratan warga, terbitkan nomor registrasi resmi, dan cetak PDF tanda tangan desa.
          </p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-[#009966]">
          <FileText size={24} />
        </div>
      </div>

      {/* Roster Controls */}
      <div className="grid gap-4 md:grid-cols-3 bg-white p-4 rounded-2xl shadow-sm border border-slate-50">
        <div className="relative md:col-span-2">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-[#0B281F]/30" />
          <input
            type="text"
            placeholder="Cari pengajuan berdasarkan ID, nama warga, NIK, atau jenis surat..."
            className="w-full pl-12 pr-4 h-12 text-[14px] bg-[#F6F8F7] border border-[#0B281F]/5 rounded-xl outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all font-semibold text-[#0B281F]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div>
          <select
            className="w-full px-4 h-12 text-[13px] bg-[#F6F8F7] border border-[#0B281F]/5 rounded-xl outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all font-bold text-[#0B281F]"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Semua Status</option>
            <option value="baru">Baru</option>
            <option value="diproses">Diproses</option>
            <option value="selesai">Selesai (Disetujui)</option>
            <option value="ditolak">Ditolak</option>
          </select>
        </div>
      </div>

      {/* Table & Cards */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="py-24 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#009966] mb-3" />
            <p className="text-sm font-bold text-[#0B281F]/50 uppercase tracking-widest">Memuat berkas pengajuan...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40">
                  <th className="p-5 pl-8">ID Pengajuan</th>
                  <th className="p-5">Warga Pemohon</th>
                  <th className="p-5">Jenis Surat</th>
                  <th className="p-5">Status</th>
                  <th className="p-5">Tanggal Masuk</th>
                  <th className="p-5 pr-8 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[13.5px] font-semibold text-[#0B281F]">
                {filteredSubmissions.map((sub) => {
                  let statusBg = "bg-amber-50 text-amber-700";
                  if (sub.status === "selesai") statusBg = "bg-emerald-50 text-emerald-700";
                  else if (sub.status === "ditolak") statusBg = "bg-red-50 text-red-700";
                  else if (sub.status === "diproses") statusBg = "bg-blue-50 text-blue-700";

                  return (
                    <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-5 pl-8 font-mono text-[12px] text-[#0B281F]/55">{sub.id}</td>
                      <td className="p-5">
                        <div className="flex flex-col">
                          <span className="font-bold">{sub.penduduk?.nama}</span>
                          <span className="text-[11px] text-[#0B281F]/40 font-mono mt-0.5">{sub.penduduk?.nik}</span>
                        </div>
                      </td>
                      <td className="p-5 font-bold text-[#0B281F]">{sub.layanan_surat?.nama_layanan}</td>
                      <td className="p-5">
                        <span className={`inline-flex px-3 py-1 rounded-full text-[11px] font-bold ${statusBg}`}>
                          {sub.status_label || sub.status}
                        </span>
                      </td>
                      <td className="p-5 text-[#0B281F]/60 font-medium">{sub.created_at}</td>
                      <td className="p-5 pr-8 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setSelectedSub(sub)}
                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0B281F]/5 text-[#0B281F] hover:bg-[#0B281F] hover:text-white transition-all shadow-sm"
                            title="Lihat Detail & Proses"
                          >
                            <Eye size={15} />
                          </button>
                          {sub.status === "selesai" && (
                            <button
                              onClick={() => downloadApprovedPdf(sub.id)}
                              className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 hover:bg-[#009966] hover:text-white transition-all shadow-sm"
                              title="Download Dokumen"
                            >
                              <Download size={15} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filteredSubmissions.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-20 text-center text-[#0B281F]/30 uppercase tracking-widest text-[11px] font-bold">
                      Tidak ada pengajuan surat yang cocok.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Submission Detail Modal */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl border border-white bg-white p-6 shadow-2xl animate-scaleUp my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0B281F]/30">{selectedSub.id}</span>
                <h4 className="text-lg font-bold text-[#0B281F] font-[Georgia,serif]">{selectedSub.layanan_surat?.nama_layanan}</h4>
              </div>
              <button 
                onClick={() => setSelectedSub(null)}
                className="text-[#0B281F]/40 hover:text-[#0B281F]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Status Section */}
              <div className="flex justify-between items-center bg-[#F6F8F7] p-4 rounded-2xl border border-slate-50">
                <span className="text-[12px] font-bold text-[#0B281F]/50">Status Saat Ini:</span>
                <span className={`text-[12.5px] font-bold px-3 py-1 rounded-full ${
                  selectedSub.status === "selesai" ? "bg-emerald-50 text-emerald-700" :
                  selectedSub.status === "ditolak" ? "bg-red-50 text-red-700" :
                  selectedSub.status === "diproses" ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"
                }`}>
                  {selectedSub.status_label || selectedSub.status}
                </span>
              </div>

              {/* Applicant Info */}
              <div className="space-y-3">
                <h5 className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/30 border-b border-slate-100 pb-1">Data Warga Pemohon</h5>
                <div className="grid gap-4 sm:grid-cols-2 text-[13px] font-semibold text-[#0B281F]">
                  <div className="flex items-center gap-2 bg-[#F6F8F7]/50 p-2.5 rounded-xl">
                    <User size={15} className="text-[#009966] shrink-0" />
                    <span className="truncate">{selectedSub.penduduk?.nama}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#F6F8F7]/50 p-2.5 rounded-xl">
                    <Hash size={15} className="text-[#009966] shrink-0" />
                    <span className="font-mono">{selectedSub.penduduk?.nik}</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Inputs Info */}
              <div className="space-y-3">
                <h5 className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/30 border-b border-slate-100 pb-1">Isian Formulir Digital</h5>
                <div className="bg-[#F6F8F7]/30 p-4 rounded-2xl border border-slate-50 space-y-3">
                  {Object.entries(selectedSub.isian_form || {}).map(([key, val]: any) => (
                    <div key={key} className="flex flex-col text-[13px]">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0B281F]/35">{key}</span>
                      <span className="text-[#0B281F] font-bold mt-0.5">{val}</span>
                    </div>
                  ))}
                  {Object.keys(selectedSub.isian_form || {}).length === 0 && (
                    <p className="text-[12px] text-[#0B281F]/40 italic">Tidak ada parameter isian khusus.</p>
                  )}
                </div>
              </div>

              {/* Persyaratan Files */}
              <div className="space-y-3">
                <h5 className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/30 border-b border-slate-100 pb-1">Dokumen Lampiran (Persyaratan)</h5>
                <div className="space-y-2">
                  {selectedSub.persyaratan_files?.map((file: any, index: number) => (
                    <div key={index} className="flex items-center justify-between bg-[#F6F8F7] p-2.5 rounded-xl border border-slate-50">
                      <span className="text-[12.5px] font-bold text-[#0B281F] truncate pr-4">{file.filename || "Lampiran Persyaratan"}</span>
                      <a
                        href={`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/admin/files/${file.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="h-8 px-3 rounded-lg bg-[#009966]/10 text-[#009966] hover:bg-[#009966] hover:text-white transition-all text-[11px] font-extrabold flex items-center gap-1.5 shrink-0"
                      >
                        <Eye size={12} />
                        Buka
                      </a>
                    </div>
                  ))}
                  {(!selectedSub.persyaratan_files || selectedSub.persyaratan_files.length === 0) && (
                    <p className="text-[12px] text-[#0B281F]/40 italic">Tidak ada berkas persyaratan yang diunggah.</p>
                  )}
                </div>
              </div>

              {/* Rejection / Note remarks */}
              {selectedSub.catatan && (
                <div className="bg-red-50 border border-red-200/50 rounded-2xl p-4 flex gap-3 text-red-800">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <div className="text-[12px]">
                    <span className="font-extrabold block">Catatan Penolakan / Alasan:</span>
                    <span className="font-semibold mt-0.5 block">{selectedSub.catatan}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Actions Block */}
            <div className="mt-8 border-t border-slate-100 pt-4 flex flex-wrap gap-3 justify-between items-center">
              <div>
                <button
                  onClick={() => setSelectedSub(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-[12px] font-bold text-[#0B281F]/60 hover:bg-[#F6F8F7]"
                >
                  Tutup
                </button>
              </div>

              {selectedSub.status !== "selesai" && selectedSub.status !== "ditolak" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsRejectOpen(true)}
                    className="px-4 py-2.5 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 text-[12px] font-bold flex items-center gap-1.5"
                  >
                    <XCircle size={14} />
                    Tolak
                  </button>

                  {selectedSub.status === "baru" && (
                    <button
                      onClick={() => handleProcess(selectedSub.id)}
                      className="px-4 py-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-[12px] font-bold flex items-center gap-1.5"
                    >
                      <Play size={14} />
                      Mulai Proses
                    </button>
                  )}

                  <button
                    onClick={() => setIsApproveOpen(true)}
                    className="px-4 py-2.5 rounded-xl bg-[#009966] text-white hover:bg-[#007f55] text-[12px] font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    <CheckCircle size={14} />
                    Setujui & Terbitkan
                  </button>
                </div>
              )}

              {selectedSub.status === "selesai" && (
                <button
                  onClick={() => downloadApprovedPdf(selectedSub.id)}
                  className="px-5 py-2.5 rounded-xl bg-[#0B281F] text-white hover:bg-black text-[12px] font-bold flex items-center gap-1.5"
                >
                  <Download size={14} />
                  Download Surat
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Approval Modal (Nomor Surat input) */}
      {isApproveOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-white bg-white p-6 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div>
                <h4 className="text-lg font-bold text-[#0B281F] font-[Georgia,serif]">Setujui & Terbitkan Surat</h4>
                <p className="text-xs text-[#0B281F]/50 font-medium">Layanan: {selectedSub?.layanan_surat?.nama_layanan}</p>
              </div>
              <button 
                onClick={() => setIsApproveOpen(false)}
                className="text-[#0B281F]/40 hover:text-[#0B281F]"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleApprove} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">Nomor Registrasi Surat Resmi</label>
                <div className="relative">
                  <Hash className="absolute left-3 top-3 h-5 w-5 text-[#0B281F]/30" />
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 140/08/Desa/VI/2026"
                    className="w-full pl-10 pr-4 h-11 text-[13px] bg-[#F6F8F7] border border-[#0B281F]/5 rounded-xl outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all font-semibold text-[#0B281F]"
                    value={nomorSurat}
                    onChange={(e) => setNomorSurat(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsApproveOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-[12px] font-bold text-[#0B281F]/60 hover:bg-[#F6F8F7]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isActionSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-[#009966] text-white hover:bg-[#007f55] text-[12px] font-bold shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {isActionSubmitting && <Loader2 size={14} className="animate-spin" />}
                  Setujui & Cetak PDF
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rejection Modal (Catatan input) */}
      {isRejectOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-white bg-white p-6 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div>
                <h4 className="text-lg font-bold text-[#0B281F] font-[Georgia,serif]">Tolak Pengajuan Surat</h4>
                <p className="text-xs text-[#0B281F]/50 font-medium">Pemohon: {selectedSub?.penduduk?.nama}</p>
              </div>
              <button 
                onClick={() => setIsRejectOpen(false)}
                className="text-[#0B281F]/40 hover:text-[#0B281F]"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleReject} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">Alasan Penolakan</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Sebutkan alasan penolakan berkas atau persyaratan yang belum lengkap..."
                  className="w-full p-4 text-[13px] bg-[#F6F8F7] border border-[#0B281F]/5 rounded-xl outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all font-semibold text-[#0B281F]"
                  value={catatanRejection}
                  onChange={(e) => setCatatanRejection(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsRejectOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-[12px] font-bold text-[#0B281F]/60 hover:bg-[#F6F8F7]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isActionSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-red-600 text-white hover:bg-red-700 text-[12px] font-bold shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {isActionSubmitting && <Loader2 size={14} className="animate-spin" />}
                  Tolak Pengajuan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
