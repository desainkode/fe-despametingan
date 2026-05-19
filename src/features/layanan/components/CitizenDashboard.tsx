"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { 
  LayoutDashboard, 
  FileText, 
  User, 
  HelpCircle, 
  LogOut, 
  ChevronDown, 
  Menu, 
  X, 
  ChevronRight, 
  Search, 
  Bell, 
  Plus, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Upload, 
  Eye, 
  Download,
  Info,
  MapPin,
  FileSpreadsheet,
  Users,
  IdCard,
  Baby,
  Megaphone,
  ClipboardList,
  Building2,
  Globe,
  Home,
  Settings,
  AlertTriangle,
  PlusCircle,
  Wrench,
  Edit,
  Milestone,
  Shield,
  Gift,
  Trash2,
  Activity
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

// Submissions structure
interface Submission {
  id: string;
  type: string;
  date: string;
  status: "Diproses" | "Disetujui" | "Ditolak";
  color: string;
  bg: string;
  details: Record<string, string>;
}

export function CitizenDashboard() {
  const { user, logout } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Sidebar active menu
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [isLayananSuratOpen, setIsLayananSuratOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isJenisPindahOpen, setIsJenisPindahOpen] = useState(false);
  const [isJenisKkOpen, setIsJenisKkOpen] = useState(false);
  const [isJenisKtpOpen, setIsJenisKtpOpen] = useState(false);
  const [isKategoriPengaduanOpen, setIsKategoriPengaduanOpen] = useState(false);

  // Notification states
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: "notif-1",
      title: "Pengajuan Disetujui",
      message: "Permohonan Layanan Kartu Keluarga Anda telah disetujui oleh Lurah. Silakan ambil fisik KK di Balai Desa.",
      time: "2 jam yang lalu",
      read: false,
      type: "success"
    },
    {
      id: "notif-2",
      title: "Pengajuan Baru Diproses",
      message: "Permohonan Layanan KTP-el sedang diteliti berkas persyaratannya oleh petugas pelayanan.",
      time: "1 hari yang lalu",
      read: true,
      type: "info"
    },
    {
      id: "notif-3",
      title: "Selamat Datang!",
      message: "Selamat datang di Portal Layanan Mandiri Desa Pameutingan. Mulai ajukan permohonan surat kependudukan secara online.",
      time: "3 hari yang lalu",
      read: true,
      type: "welcome"
    }
  ]);

  // Profile fields state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Warga Pameutingan",
    nik: "3204112345670001",
    kk: "3204119876540003",
    birthPlaceDate: "Bandung, 12 Agustus 1995",
    gender: "Laki-laki",
    address: "Jl. Raya Pameutingan No. 42, RT 03 / RW 07, Desa Pameutingan",
    job: "Wiraswasta",
    phone: "081234567890",
    email: "warga@desa.com",
    avatar: ""
  });

  // State-based submission log persisted in localStorage
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    // Load profile from localStorage if exists
    const storedProfile = localStorage.getItem("village_profile_data");
    if (storedProfile) {
      try {
        const parsed = JSON.parse(storedProfile);
        setProfileData(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        // Ignore parsing error
      }
    }

    // Sync default profile name with authenticated user context
    if (user?.name) {
      const cleanNik = user.nik && user.nik.includes("@") ? "3204112345670001" : (user.nik || "3204112345670001");
      setProfileData(prev => {
        const updated = { 
          ...prev, 
          name: user.name, 
          nik: cleanNik,
          email: user.email && user.email.includes("@") ? user.email : prev.email 
        };
        return updated;
      });
    }

    // Load submissions from local storage or set defaults
    const stored = localStorage.getItem("village_submissions");
    if (stored) {
      setSubmissions(JSON.parse(stored));
    } else {
      const defaultSubs: Submission[] = [
        { 
          id: "SUB-20260519-01", 
          type: "Layanan KTP-el", 
          date: "19 Mei 2026", 
          status: "Diproses", 
          color: "text-amber-600",
          bg: "bg-amber-50",
          details: { 
            "Nama Lengkap": user?.name || "Warga Pameutingan", 
            "NIK": user?.nik || "3204112345670001", 
            "Jenis Pengajuan": "Penggantian KTP Rusak", 
            "Keterangan": "KTP terkelupas dan tidak terbaca di chip scan." 
          } 
        },
        { 
          id: "SUB-20260515-04", 
          type: "Layanan Kartu Keluarga", 
          date: "15 Mei 2026", 
          status: "Disetujui", 
          color: "text-emerald-600",
          bg: "bg-emerald-50",
          details: { 
            "Nama Lengkap": user?.name || "Warga Pameutingan", 
            "NIK Kepala Keluarga": user?.nik || "3204112345670001", 
            "Alasan Pengajuan": "Penambahan Anggota Keluarga Baru", 
            "Keterangan": "Menambahkan akta kelahiran anak pertama ke KK." 
          } 
        }
      ];
      setSubmissions(defaultSubs);
      localStorage.setItem("village_submissions", JSON.stringify(defaultSubs));
    }
  }, [user]);

  // Read URL query params to switch tabs on page load
  useEffect(() => {
    const tab = searchParams.get("tab");
    const slug = searchParams.get("slug");
    if (tab) {
      setActiveTab(tab);
      if (tab === "surat" && slug) {
        // Map slug to proper sub-menu
        setActiveTab(slug);
      }
    }
  }, [searchParams]);

  // Form State Handlers
  const [submittingForm, setSubmittingForm] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  // Form data states
  const [pindahForm, setPindahForm] = useState({ alamatAsal: "", alamatTujuan: "", alasan: "", jenis: "Antar Desa" });
  const [aktaForm, setAktaForm] = useState({ jenisAkta: "Kelahiran", namaSubjek: "", tanggalKejadian: "", tempatKejadian: "", nikOrangTua: "" });
  const [kkForm, setKkForm] = useState({ jenisPengajuan: "Buat Baru", nikKepala: "", anggotaJumlah: "1", alasan: "" });
  const [ktpForm, setKtpForm] = useState({ jenisPengajuan: "Perekaman Baru", nik: "", alasan: "" });
  const [kiaForm, setKiaForm] = useState({ namaAnak: "", nikAnak: "", tempatTanggalLahir: "", nikOrangTua: "" });
  const [pengaduanForm, setPengaduanForm] = useState({ kategori: "Infrastruktur", judul: "", deskripsi: "", lokasi: "" });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArr = Array.from(e.target.files).map(f => f.name);
      setUploadedFiles(prev => [...prev, ...filesArr]);
      toast.success("Dokumen berhasil diunggah secara lokal.");
    }
  };

  const clearUploads = () => {
    setUploadedFiles([]);
    setFileInputKey(Date.now());
  };

  // Generic Submit Simulator
  const triggerSubmit = (serviceName: string, details: Record<string, string>) => {
    if (uploadedFiles.length === 0) {
      toast.error("Mohon unggah dokumen persyaratan terlebih dahulu.");
      return;
    }
    setSubmittingForm(true);

    setTimeout(() => {
      const newId = `SUB-${new Date().getFullYear()}${(new Date().getMonth() + 1).toString().padStart(2, "0")}${new Date().getDate().toString().padStart(2, "0")}-${Math.floor(100 + Math.random() * 900)}`;
      const newSubmission: Submission = {
        id: newId,
        type: serviceName,
        date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
        status: "Diproses",
        color: "text-amber-600",
        bg: "bg-amber-50",
        details: {
          ...details,
          "Nama Pengaju": profileData.name,
          "NIK": profileData.nik,
          "Dokumen Diunggah": uploadedFiles.join(", ")
        }
      };

      const updated = [newSubmission, ...submissions];
      setSubmissions(updated);
      localStorage.setItem("village_submissions", JSON.stringify(updated));

      // Add a notification when submission completes
      const newNotif = {
        id: `notif-${Date.now()}`,
        title: "Pengajuan Diproses",
        message: `Permohonan ${serviceName} Anda berhasil diajukan dan sedang diproses.`,
        time: "Baru saja",
        read: false,
        type: "info"
      };
      setNotifications(prev => [newNotif, ...prev]);

      // Reset states
      setSubmittingForm(false);
      setUploadedFiles([]);
      setFileInputKey(Date.now());
      toast.success(`Pengajuan ${serviceName} berhasil dikirim!`);
      setActiveTab("monitoring");
    }, 1500);
  };

  if (!user) return null;

  // Render navigation links dynamically
  const menuItems = [
    { id: "dashboard", label: "Dashboard Overview", icon: LayoutDashboard },
    {
      id: "layanan-surat",
      label: "Layanan Surat",
      icon: FileText,
      submenu: [
        { id: "surat-pindah-datang", label: "Surat Pindah / Datang", icon: MapPin },
        { id: "akta-kematian-kelahiran", label: "Akta Kelahiran / Kematian", icon: FileSpreadsheet },
        { id: "layanan-kartu-keluarga", label: "Layanan Kartu Keluarga", icon: Users },
        { id: "layanan-ktp-el", label: "Layanan KTP-el", icon: IdCard },
        { id: "kia", label: "Identitas Anak (KIA)", icon: Baby }
      ]
    },
    { id: "pengaduan", label: "Layanan Pengaduan", icon: Megaphone },
    { id: "monitoring", label: "Monitoring Pengajuan", icon: ClipboardList },
    { id: "profil", label: "Profil Saya", icon: User },
    { id: "bantuan", label: "Pusat Bantuan", icon: HelpCircle }
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F6F8F7]">
      {/* Scope CSS to hide scrollbar in sidebar nav */}
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
        .no-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}} />

      {/* Sidebar for Desktop */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-[#0B281F]/5 bg-[#0B281F] text-white transition-all duration-300 lg:static ${
        isSidebarCollapsed ? "lg:w-20" : "lg:w-72"
      } ${
        isMobileSidebarOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0"
      }`}>
        {/* Brand Header */}
        <div className={`flex h-20 items-center justify-between border-b border-white/5 transition-all duration-300 ${isSidebarCollapsed ? "px-4 justify-center" : "px-6"}`}>
          <Link 
            href="/" 
            className={`flex items-center hover:opacity-85 transition-opacity cursor-pointer transition-all duration-300 ${isSidebarCollapsed ? "gap-0" : "gap-3"} overflow-hidden`}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl overflow-hidden bg-transparent">
              <img src="/img/image.png" alt="Logo Pameutingan" className="h-full w-full object-contain" />
            </div>
            <div className={`transition-all duration-300 overflow-hidden flex flex-col ${isSidebarCollapsed ? "w-0 opacity-0 pointer-events-none" : "w-40 opacity-100"}`}>
              <span className="font-[Georgia,serif] text-[16px] font-bold block leading-none whitespace-nowrap">Pameutingan</span>
              <span className="text-[10px] tracking-widest text-[#00E0A1] font-bold uppercase mt-1 block whitespace-nowrap">Layanan Warga</span>
            </div>
          </Link>
          {!isSidebarCollapsed && (
            <button className="text-white/60 hover:text-white lg:hidden" onClick={() => setIsMobileSidebarOpen(false)}>
              <X size={20} />
            </button>
          )}
        </div>

        {/* Sidebar Nav Items */}
        <nav className="flex-1 space-y-1.5 px-4 overflow-y-auto no-scrollbar pt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            if (item.submenu) {
              return (
                <div key={item.id} className="space-y-1">
                  <button 
                    onClick={() => {
                      if (isSidebarCollapsed) {
                        setIsSidebarCollapsed(false);
                        setIsLayananSuratOpen(true);
                      } else {
                        setIsLayananSuratOpen(!isLayananSuratOpen);
                      }
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-[13px] font-bold text-white/70 transition-all hover:bg-white/5 hover:text-white ${isSidebarCollapsed ? "justify-center px-2" : "justify-start text-left"}`}
                    title={isSidebarCollapsed ? item.label : undefined}
                  >
                    <div className={`flex items-center transition-all duration-300 ${isSidebarCollapsed ? "gap-0" : "gap-3"} overflow-hidden`}>
                      <Icon size={16} className="text-[#009966] shrink-0" />
                      <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${isSidebarCollapsed ? "w-0 opacity-0 pointer-events-none" : "w-40 opacity-100"}`}>
                        {item.label}
                      </span>
                    </div>
                    <ChevronDown size={14} className={`transition-all duration-300 shrink-0 ${isLayananSuratOpen ? "rotate-180" : ""} ${isSidebarCollapsed ? "w-0 opacity-0 pointer-events-none" : "w-auto opacity-100"}`} />
                  </button>
                  
                  {isLayananSuratOpen && !isSidebarCollapsed && (
                    <div className="pl-6 pr-2 space-y-1 animate-fadeIn border-l border-white/10 ml-6">
                      {item.submenu.map((sub) => {
                        const SubIcon = sub.icon;
                        const isSubActive = activeTab === sub.id;
                        return (
                          <button
                            key={sub.id}
                            onClick={() => {
                              setActiveTab(sub.id);
                              setIsMobileSidebarOpen(false);
                            }}
                            className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[12px] font-semibold transition-all ${
                              isSubActive 
                                ? "bg-[#009966] text-white shadow-sm" 
                                : "text-white/60 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            <SubIcon size={13} className={isSubActive ? "text-white" : "text-[#009966]"} />
                            <span className="truncate">{sub.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileSidebarOpen(false);
                }}
                className={`flex w-full items-center rounded-xl px-4 py-3 text-[13px] font-bold transition-all ${activeTab === item.id ? "bg-[#009966] text-white shadow-md shadow-[#009966]/20" : "text-white/70 hover:bg-white/5 hover:text-white"} ${isSidebarCollapsed ? "justify-center px-2 gap-0" : "justify-start text-left gap-3"}`}
                title={isSidebarCollapsed ? item.label : undefined}
              >
                <Icon size={16} className={`shrink-0 ${activeTab === item.id ? "text-white" : "text-[#009966]"}`} />
                <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${isSidebarCollapsed ? "w-0 opacity-0 pointer-events-none" : "w-40 opacity-100"}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Logout Zone */}
        <div className="p-4 border-t border-white/5">
          <button 
            onClick={logout}
            className={`flex w-full items-center rounded-xl px-4 py-3 text-[13px] font-bold text-red-400 transition-all hover:bg-red-500/10 hover:text-red-300 ${isSidebarCollapsed ? "justify-center px-2 gap-0" : "justify-start text-left gap-3"}`}
            title={isSidebarCollapsed ? "Keluar Akun" : undefined}
          >
            <LogOut size={16} className="shrink-0" />
            <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${isSidebarCollapsed ? "w-0 opacity-0 pointer-events-none" : "w-40 opacity-100"}`}>
              Keluar Akun
            </span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay Backdrop */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-[#0B281F]/40 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Main Container */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex h-20 items-center justify-between border-b border-[#0B281F]/5 bg-white px-3 sm:px-6 shadow-sm">
          <div className="flex items-center gap-2 sm:gap-4 overflow-hidden">
            <button 
              className="text-[#0B281F] hover:text-[#009966] p-1.5 rounded-xl hover:bg-slate-50 transition-colors shrink-0"
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setIsMobileSidebarOpen(true);
                } else {
                  setIsSidebarCollapsed(!isSidebarCollapsed);
                }
              }}
            >
              <Menu size={20} className="sm:w-[22px] sm:h-[22px]" />
            </button>
            <h2 className="text-sm sm:text-lg font-bold text-[#0B281F] capitalize tracking-wide font-[Georgia,serif] truncate max-w-[130px] sm:max-w-none">
              {activeTab.split('-').join(' ')}
            </h2>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <div className="relative">
              <button 
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-1.5 sm:p-2 text-[#0B281F]/50 hover:text-[#0B281F] hover:bg-slate-50 rounded-xl transition-all"
              >
                <Bell size={18} className="sm:w-[20px] sm:h-[20px]" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-red-500 animate-pulse" />
                )}
              </button>

              {/* Notification Popover Dropdown */}
              {isNotificationOpen && (
                <>
                  {/* Backdrop overlay to click outside */}
                  <div className="fixed inset-0 z-40" onClick={() => setIsNotificationOpen(false)} />
                  <div className="absolute right-[-48px] sm:right-0 mt-2.5 z-50 w-[calc(100vw-32px)] sm:w-96 max-w-[360px] rounded-3xl border border-[#0B281F]/5 bg-white p-4 sm:p-5 shadow-2xl animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-[#0B281F]/5 pb-3">
                      <h4 className="font-bold text-[#0B281F] text-[13px] sm:text-[15px]">Notifikasi</h4>
                      {notifications.some(n => !n.read) && (
                        <button 
                          onClick={() => {
                            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                            toast.success("Semua notifikasi ditandai telah dibaca.");
                          }}
                          className="text-[10px] sm:text-[11px] font-bold text-[#009966] hover:underline"
                        >
                          Tandai dibaca semua
                        </button>
                      )}
                    </div>
                    <div className="mt-3 max-h-[250px] sm:max-h-[300px] overflow-y-auto no-scrollbar space-y-2.5">
                      {notifications.length === 0 ? (
                        <div className="py-8 text-center text-[12px] sm:text-[13px] text-[#0B281F]/40 font-medium">
                          Tidak ada notifikasi baru
                        </div>
                      ) : (
                        notifications.map((notif) => (
                          <div 
                            key={notif.id}
                            onClick={() => {
                              // Mark as read
                              setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
                              setIsNotificationOpen(false);
                            }}
                            className={`flex flex-col gap-1 rounded-2xl p-2.5 sm:p-3 text-left transition-all cursor-pointer border ${
                              notif.read ? "bg-white border-[#0B281F]/5 hover:bg-slate-50" : "bg-[#009966]/5 border-[#009966]/10 hover:bg-[#009966]/10"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] sm:text-[12px] font-bold text-[#0B281F] truncate max-w-[150px] sm:max-w-none">{notif.title}</span>
                              <span className="text-[9px] sm:text-[10px] text-[#0B281F]/40 font-semibold shrink-0">{notif.time}</span>
                            </div>
                            <p className="text-[10.5px] sm:text-[11.5px] text-[#0B281F]/60 font-medium leading-relaxed">{notif.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="hidden sm:block h-6 w-px bg-[#0B281F]/10" />
            <button 
              onClick={() => setActiveTab("profil")}
              className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-all cursor-pointer p-1 sm:p-1.5 rounded-xl hover:bg-slate-50"
            >
              <div className="hidden md:block text-right">
                <p className="text-[13px] font-bold text-[#0B281F]">{profileData.name}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#009966]">{profileData.nik}</p>
              </div>
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-[#0B281F]/5 text-[#0B281F] font-bold overflow-hidden shrink-0">
                {profileData.avatar ? (
                  <img src={profileData.avatar} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  profileData.name.charAt(0)
                )}
              </div>
            </button>
          </div>
        </header>

        {/* Dynamic Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === "dashboard" && (
            <div className="space-y-8 animate-fadeIn">
              {/* Welcome Alert */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0B281F] to-[#004f37] p-6 sm:p-8 text-white shadow-xl">
                <div className="relative z-10 max-w-lg space-y-3">
                  <span className="rounded-full bg-white/10 px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[#00E0A1]">
                    Selamat Datang
                  </span>
                  <h3 className="text-2xl font-bold font-[Georgia,serif] leading-tight md:text-3xl">
                    Halo, {profileData.name}!
                  </h3>
                  <p className="text-[13px] text-white/70 leading-relaxed">
                    Ajukan surat administrasi kependudukan, buat laporan pengaduan, dan pantau status dokumen Anda langsung secara digital.
                  </p>
                </div>
                {/* Visual decoration overlay */}
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/5" />
                <div className="absolute right-12 bottom-0 h-32 w-32 rounded-full bg-[#009966]/10 blur-xl" />
              </div>

              {/* Quick Status Statistics Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Total Pengajuan", val: submissions.length, icon: FileText, color: "text-[#0B281F]", bg: "bg-[#0B281F]/5" },
                  { label: "Sedang Diproses", val: submissions.filter(s => s.status === "Diproses").length, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
                  { label: "Telah Disetujui", val: submissions.filter(s => s.status === "Disetujui").length, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
                  { label: "Ditolak", val: submissions.filter(s => s.status === "Ditolak").length, icon: XCircle, color: "text-red-600", bg: "bg-red-50" }
                ].map((stat, idx) => {
                  const StatIcon = stat.icon;
                  return (
                    <div key={idx} className="rounded-2xl border border-white bg-white p-5 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0B281F]/40">{stat.label}</span>
                        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}>
                          <StatIcon size={16} />
                        </div>
                      </div>
                      <p className="mt-2 text-2xl font-black text-[#0B281F]">{stat.val}</p>
                    </div>
                  );
                })}
              </div>

              {/* Quick Access Menu */}
              <div className="space-y-4">
                <h4 className="text-[14px] font-extrabold uppercase tracking-widest text-[#0B281F]/40">
                  Layanan Cepat Administrasi
                </h4>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    { id: "surat-pindah-datang", name: "Surat Pindah / Datang", desc: "Urus berkas pindah keluar/masuk desa", icon: MapPin },
                    { id: "akta-kematian-kelahiran", name: "Akta Kelahiran / Kematian", desc: "Buat pelaporan kelahiran & kematian", icon: FileSpreadsheet },
                    { id: "layanan-kartu-keluarga", name: "Layanan Kartu Keluarga", desc: "Perubahan data KK atau cetak KK baru", icon: Users },
                    { id: "layanan-ktp-el", name: "Layanan KTP-el", desc: "Perekaman baru & penggantian KTP", icon: IdCard },
                    { id: "kia", name: "Identitas Anak (KIA)", desc: "Buat kartu identitas anak < 17 tahun", icon: Baby },
                    { id: "pengaduan", name: "Layanan Pengaduan", desc: "Laporkan gangguan ketertiban umum & fasilitas", icon: Megaphone }
                  ].map((service) => {
                    const ServiceIcon = service.icon;
                    return (
                      <button
                        key={service.id}
                        onClick={() => setActiveTab(service.id)}
                        className="group flex flex-col justify-between rounded-2xl border border-white bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <div>
                          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#009966]/5 text-[#009966] group-hover:bg-[#009966] group-hover:text-white transition-all">
                            <ServiceIcon size={16} />
                          </div>
                          <h5 className="font-bold text-[#0B281F] transition-colors group-hover:text-[#009966] text-[15px]">{service.name}</h5>
                          <p className="mt-1 text-[12px] text-[#0B281F]/50 leading-normal">{service.desc}</p>
                        </div>
                        <div className="mt-4 flex items-center gap-1 text-[11px] font-bold text-[#009966]">
                          <span>Buka Formulir</span>
                          <ChevronRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Announcement Banner */}
              <div className="rounded-2xl border border-[#009966]/10 bg-[#009966]/5 p-4 sm:p-5 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#009966] text-white">
                  <Info size={18} />
                </div>
                <div>
                  <h5 className="font-bold text-[#0B281F] text-[14px]">Informasi Pelayanan Offline</h5>
                  <p className="mt-1 text-[12px] leading-relaxed text-[#0B281F]/60">
                    Bagi warga yang ingin berkonsultasi langsung, loket fisik di Kantor Kepala Desa Pameutingan buka dari hari Senin s.d Jumat pukul 08:00 WIB s.d 15:00 WIB.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SURAT PINDAH / DATANG FORM */}
          {activeTab === "surat-pindah-datang" && (
            <div className="mx-auto max-w-3xl rounded-3xl border border-white bg-white p-6 shadow-sm md:p-8 animate-fadeIn">
              <h3 className="text-xl font-bold text-[#0B281F] font-[Georgia,serif] mb-6">Formulir Pengajuan Surat Pindah / Datang</h3>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  triggerSubmit("Surat Pindah / Datang", {
                    "Alamat Asal": pindahForm.alamatAsal,
                    "Alamat Tujuan": pindahForm.alamatTujuan,
                    "Alasan Kepindahan": pindahForm.alasan,
                    "Jenis Pindah": pindahForm.jenis
                  });
                }} 
                className="space-y-6"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">Nama Lengkap</label>
                    <input type="text" disabled className="w-full h-12 rounded-xl bg-slate-100 px-4 text-[13px] font-bold text-[#0B281F]/60 border border-[#0B281F]/5 outline-none cursor-not-allowed" value={profileData.name} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">NIK</label>
                    <input type="text" disabled className="w-full h-12 rounded-xl bg-slate-100 px-4 text-[13px] font-bold text-[#0B281F]/60 border border-[#0B281F]/5 outline-none cursor-not-allowed" value={profileData.nik} />
                  </div>
                </div>

                <div className="space-y-2 relative">
                  <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">Jenis Kepindahan</label>
                  
                  {/* Custom Dropdown Trigger */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsJenisPindahOpen(!isJenisPindahOpen)}
                      className="w-full h-12 rounded-xl bg-[#F6F8F7] px-4 text-[13px] font-semibold border border-[#0B281F]/5 outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all text-[#0B281F] flex items-center justify-between text-left"
                    >
                      <span>
                        {pindahForm.jenis === "Antar Desa" && (
                          <span className="flex items-center gap-2">
                            <MapPin size={15} className="text-[#009966]" /> Pindah Antar Desa / Kelurahan
                          </span>
                        )}
                        {pindahForm.jenis === "Antar Kecamatan" && (
                          <span className="flex items-center gap-2">
                            <Building2 size={15} className="text-[#009966]" /> Pindah Antar Kecamatan
                          </span>
                        )}
                        {pindahForm.jenis === "Antar Kabupaten" && (
                          <span className="flex items-center gap-2">
                            <Globe size={15} className="text-[#009966]" /> Pindah Antar Kabupaten / Provinsi
                          </span>
                        )}
                        {pindahForm.jenis === "Datang Ke Desa" && (
                          <span className="flex items-center gap-2">
                            <Home size={15} className="text-[#009966]" /> Penduduk Datang (Masuk ke Pameutingan)
                          </span>
                        )}
                        {!pindahForm.jenis && "Pilih Jenis Kepindahan"}
                      </span>
                      <ChevronDown size={15} className={`transition-transform duration-300 ${isJenisPindahOpen ? "rotate-180" : ""}`} />
                    </button>

                    {/* Custom Dropdown Options */}
                    {isJenisPindahOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsJenisPindahOpen(false)} />
                        <div className="absolute left-0 right-0 mt-2 z-50 rounded-2xl border border-[#0B281F]/5 bg-white p-2 shadow-xl animate-scaleUp">
                          {[
                            { value: "Antar Desa", label: "Pindah Antar Desa / Kelurahan", icon: MapPin },
                            { value: "Antar Kecamatan", label: "Pindah Antar Kecamatan", icon: Building2 },
                            { value: "Antar Kabupaten", label: "Pindah Antar Kabupaten / Provinsi", icon: Globe },
                            { value: "Datang Ke Desa", label: "Penduduk Datang (Masuk ke Pameutingan)", icon: Home }
                          ].map((opt) => {
                            const OptIcon = opt.icon;
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                  setPindahForm({ ...pindahForm, jenis: opt.value });
                                  setIsJenisPindahOpen(false);
                                }}
                                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[12.5px] font-semibold text-left transition-all ${
                                  pindahForm.jenis === opt.value
                                    ? "bg-[#009966]/10 text-[#009966]"
                                    : "text-[#0B281F]/80 hover:bg-slate-50 hover:text-[#0B281F]"
                                }`}
                              >
                                <OptIcon size={15} className="shrink-0" />
                                <span>{opt.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">Alamat Asal Lengkap</label>
                  <textarea required rows={2} placeholder="Masukkan detail alamat asal RT/RW, Kelurahan, Kecamatan" className="w-full rounded-xl bg-[#F6F8F7] p-4 text-[13px] font-medium border border-[#0B281F]/5 outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all text-[#0B281F]" value={pindahForm.alamatAsal} onChange={(e) => setPindahForm({...pindahForm, alamatAsal: e.target.value})} />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">Alamat Tujuan Lengkap</label>
                  <textarea required rows={2} placeholder="Masukkan detail alamat tujuan baru secara lengkap" className="w-full rounded-xl bg-[#F6F8F7] p-4 text-[13px] font-medium border border-[#0B281F]/5 outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all text-[#0B281F]" value={pindahForm.alamatTujuan} onChange={(e) => setPindahForm({...pindahForm, alamatTujuan: e.target.value})} />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">Alasan Kepindahan</label>
                  <input type="text" required placeholder="Contoh: Pekerjaan, Pernikahan, Ikut Keluarga" className="w-full h-12 rounded-xl bg-[#F6F8F7] px-4 text-[13px] font-medium border border-[#0B281F]/5 outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all text-[#0B281F]" value={pindahForm.alasan} onChange={(e) => setPindahForm({...pindahForm, alasan: e.target.value})} />
                </div>

                {/* Persyaratan Callout */}
                <div className="rounded-2xl border border-[#009966]/10 bg-[#009966]/5 p-4 space-y-2">
                  <h5 className="text-[12px] font-bold text-[#009966] uppercase tracking-wider">Persyaratan Dokumen:</h5>
                  <ul className="list-disc list-inside text-[11.5px] text-[#0B281F]/70 space-y-1 font-medium">
                    <li>Fotokopi KTP-el</li>
                    <li>Fotokopi Kartu Keluarga (KK)</li>
                    <li>Surat pengantar RT/RW</li>
                    <li>Surat keterangan pindah dari daerah asal (untuk pendatang)</li>
                    <li>Pas foto (jika diperlukan)</li>
                    <li>Mengisi formulir permohonan pindah/datang</li>
                  </ul>
                </div>

                {/* Upload Section */}
                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">Upload Berkas Persyaratan (KTP, KK, & Surat RT) - PDF/JPG</label>
                  <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#0B281F]/10 bg-[#F6F8F7] p-8 text-center transition-all hover:bg-emerald-50/20 hover:border-[#009966]/40">
                    <Upload className="mb-2 text-[#0B281F]/20" size={24} />
                    <p className="text-[12px] font-bold text-[#0B281F]/60">Pilih file scan KTP & KK</p>
                    <p className="text-[10px] text-[#0B281F]/30 uppercase tracking-widest mt-1">Maksimal 5MB</p>
                    <input key={fileInputKey} type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} />
                  </div>
                  {uploadedFiles.length > 0 && (
                    <div className="mt-2 rounded-xl bg-[#F6F8F7] p-3 flex justify-between items-center">
                      <span className="text-[12px] font-semibold text-[#0B281F]/70">{uploadedFiles.length} berkas dipilih.</span>
                      <button type="button" onClick={clearUploads} className="text-[11px] font-bold text-red-500">Hapus</button>
                    </div>
                  )}
                </div>

                <button 
                  type="submit" 
                  disabled={submittingForm}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#009966] text-[13px] font-bold text-white shadow-lg transition-all hover:bg-[#007f55] disabled:opacity-50"
                >
                  {submittingForm ? <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" /> : "Kirim Pengajuan Surat"}
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: AKTA KELAHIRAN / KEMATIAN FORM */}
          {activeTab === "akta-kematian-kelahiran" && (
            <div className="mx-auto max-w-3xl rounded-3xl border border-white bg-white p-6 shadow-sm md:p-8 animate-fadeIn">
              <h3 className="text-xl font-bold text-[#0B281F] font-[Georgia,serif] mb-6">Formulir Pelaporan Akta Kelahiran / Kematian</h3>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  triggerSubmit("Akta Kelahiran / Kematian", {
                    "Jenis Kejadian / Akta": aktaForm.jenisAkta,
                    "Nama Terlapor": aktaForm.namaSubjek,
                    "Tanggal Kejadian": aktaForm.tanggalKejadian,
                    "Tempat Kejadian": aktaForm.tempatKejadian,
                    "NIK Terkait / Orang Tua": aktaForm.nikOrangTua
                  });
                }} 
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">Jenis Laporan Kejadian</label>
                  <div className="flex gap-4">
                    {["Kelahiran", "Kematian"].map((j) => {
                      const isSelected = aktaForm.jenisAkta === j;
                      return (
                        <button
                          key={j}
                          type="button"
                          onClick={() => setAktaForm({...aktaForm, jenisAkta: j})}
                          className={`flex-1 h-12 rounded-xl border text-[13px] font-bold transition-all flex items-center justify-center gap-2 ${
                            isSelected 
                              ? "bg-[#0B281F] text-white border-[#0B281F] shadow-md" 
                              : "bg-transparent text-[#0B281F] border-[#0B281F]/10 hover:bg-[#0B281F]/5"
                          }`}
                        >
                          {j === "Kelahiran" ? (
                            <>
                              <Baby size={16} className={isSelected ? "text-[#00E0A1]" : "text-[#009966]"} />
                              <span>Kelahiran Bayi</span>
                            </>
                          ) : (
                            <>
                              <Activity size={16} className={isSelected ? "text-[#00E0A1]" : "text-[#009966]"} />
                              <span>Kematian Penduduk</span>
                            </>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">Nama Subjek Terlapor</label>
                  <input type="text" required placeholder={aktaForm.jenisAkta === "Kelahiran" ? "Masukkan nama bayi yang lahir" : "Masukkan nama almarhum/almarhumah"} className="w-full h-12 rounded-xl bg-[#F6F8F7] px-4 text-[13px] font-medium border border-[#0B281F]/5 outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all text-[#0B281F]" value={aktaForm.namaSubjek} onChange={(e) => setAktaForm({...aktaForm, namaSubjek: e.target.value})} />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">Tanggal Kejadian</label>
                    <input type="date" required className="w-full h-12 rounded-xl bg-[#F6F8F7] px-4 text-[13px] font-medium border border-[#0B281F]/5 outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all text-[#0B281F]" value={aktaForm.tanggalKejadian} onChange={(e) => setAktaForm({...aktaForm, tanggalKejadian: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">Tempat Kejadian</label>
                    <input type="text" required placeholder="Contoh: RS Al-Ihsan, Rumah Sakit, Bidan" className="w-full h-12 rounded-xl bg-[#F6F8F7] px-4 text-[13px] font-medium border border-[#0B281F]/5 outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all text-[#0B281F]" value={aktaForm.tempatKejadian} onChange={(e) => setAktaForm({...aktaForm, tempatKejadian: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">
                    {aktaForm.jenisAkta === "Kelahiran" ? "NIK Ibu / Ayah" : "NIK Almarhum"}
                  </label>
                  <input type="text" required placeholder="16 digit NIK" className="w-full h-12 rounded-xl bg-[#F6F8F7] px-4 text-[13px] font-medium border border-[#0B281F]/5 outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all text-[#0B281F]" value={aktaForm.nikOrangTua} onChange={(e) => setAktaForm({...aktaForm, nikOrangTua: e.target.value})} />
                </div>

                {/* Persyaratan Callout */}
                <div className="rounded-2xl border border-[#009966]/10 bg-[#009966]/5 p-4 space-y-2">
                  <h5 className="text-[12px] font-bold text-[#009966] uppercase tracking-wider">
                    Persyaratan Dokumen Akta {aktaForm.jenisAkta}:
                  </h5>
                  <ul className="list-disc list-inside text-[11.5px] text-[#0B281F]/70 space-y-1 font-medium">
                    {aktaForm.jenisAkta === "Kelahiran" ? (
                      <>
                        <li>Surat keterangan lahir dari bidan/rumah sakit</li>
                        <li>Fotokopi KK orang tua</li>
                        <li>Fotokopi KTP-el orang tua</li>
                        <li>Buku nikah / akta perkawinan orang tua</li>
                        <li>Fotokopi KTP saksi</li>
                      </>
                    ) : (
                      <>
                        <li>Surat keterangan kematian dari desa/rumah sakit</li>
                        <li>Fotokopi KK almarhum</li>
                        <li>Fotokopi KTP-el almarhum</li>
                        <li>Fotokopi KTP pelapor</li>
                        <li>Fotokopi KTP saksi</li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Upload Section */}
                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">Upload Surat Keterangan Bidan / RS / Keterangan Kematian (PDF/JPG)</label>
                  <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#0B281F]/10 bg-[#F6F8F7] p-8 text-center transition-all hover:bg-emerald-50/20 hover:border-[#009966]/40">
                    <Upload className="mb-2 text-[#0B281F]/20" size={24} />
                    <p className="text-[12px] font-bold text-[#0B281F]/60">Pilih file bukti kejadian kelahiran/kematian</p>
                    <p className="text-[10px] text-[#0B281F]/30 uppercase tracking-widest mt-1">Maksimal 5MB</p>
                    <input key={fileInputKey} type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} />
                  </div>
                  {uploadedFiles.length > 0 && (
                    <div className="mt-2 rounded-xl bg-[#F6F8F7] p-3 flex justify-between items-center">
                      <span className="text-[12px] font-semibold text-[#0B281F]/70">{uploadedFiles.length} berkas dipilih.</span>
                      <button type="button" onClick={clearUploads} className="text-[11px] font-bold text-red-500">Hapus</button>
                    </div>
                  )}
                </div>

                <button 
                  type="submit" 
                  disabled={submittingForm}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#009966] text-[13px] font-bold text-white shadow-lg transition-all hover:bg-[#007f55] disabled:opacity-50"
                >
                  {submittingForm ? <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" /> : "Kirim Laporan Kejadian"}
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: LAYANAN KARTU KELUARGA FORM */}
          {activeTab === "layanan-kartu-keluarga" && (
            <div className="mx-auto max-w-3xl rounded-3xl border border-white bg-white p-6 shadow-sm md:p-8 animate-fadeIn">
              <h3 className="text-xl font-bold text-[#0B281F] font-[Georgia,serif] mb-6">Formulir Pengajuan Layanan Kartu Keluarga</h3>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  triggerSubmit("Layanan Kartu Keluarga", {
                    "Jenis Pengajuan KK": kkForm.jenisPengajuan,
                    "NIK Kepala Keluarga": kkForm.nikKepala,
                    "Jumlah Anggota Baru": kkForm.anggotaJumlah,
                    "Alasan Pengajuan": kkForm.alasan
                  });
                }} 
                className="space-y-6"
              >
                <div className="space-y-2 relative">
                  <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">Jenis Pengajuan KK</label>
                  
                  {/* Custom Dropdown Trigger */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsJenisKkOpen(!isJenisKkOpen)}
                      className="w-full h-12 rounded-xl bg-[#F6F8F7] px-4 text-[13px] font-semibold border border-[#0B281F]/5 outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all text-[#0B281F] flex items-center justify-between text-left"
                    >
                      <span>
                        {kkForm.jenisPengajuan === "Buat Baru" && (
                          <span className="flex items-center gap-2">
                            <Users size={15} className="text-[#009966]" /> Penerbitan Baru (Keluarga Baru)
                          </span>
                        )}
                        {kkForm.jenisPengajuan === "Penambahan Anggota" && (
                          <span className="flex items-center gap-2">
                            <Baby size={15} className="text-[#009966]" /> Penambahan Anggota Keluarga (Lahir/Pindah Masuk)
                          </span>
                        )}
                        {kkForm.jenisPengajuan === "Perubahan Data" && (
                          <span className="flex items-center gap-2">
                            <Settings size={15} className="text-[#009966]" /> Perubahan Data (Gelar, Status Pekerjaan, etc)
                          </span>
                        )}
                        {kkForm.jenisPengajuan === "KK Rusak / Hilang" && (
                          <span className="flex items-center gap-2">
                            <AlertTriangle size={15} className="text-[#009966]" /> Kartu Keluarga Rusak / Hilang
                          </span>
                        )}
                        {!kkForm.jenisPengajuan && "Pilih Jenis Pengajuan KK"}
                      </span>
                      <ChevronDown size={15} className={`transition-transform duration-300 ${isJenisKkOpen ? "rotate-180" : ""}`} />
                    </button>

                    {/* Custom Dropdown Options */}
                    {isJenisKkOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsJenisKkOpen(false)} />
                        <div className="absolute left-0 right-0 mt-2 z-50 rounded-2xl border border-[#0B281F]/5 bg-white p-2 shadow-xl animate-scaleUp">
                          {[
                            { value: "Buat Baru", label: "Penerbitan Baru (Keluarga Baru)", icon: Users },
                            { value: "Penambahan Anggota", label: "Penambahan Anggota Keluarga (Lahir/Pindah Masuk)", icon: Baby },
                            { value: "Perubahan Data", label: "Perubahan Data (Gelar, Status Pekerjaan, etc)", icon: Settings },
                            { value: "KK Rusak / Hilang", label: "Kartu Keluarga Rusak / Hilang", icon: AlertTriangle }
                          ].map((opt) => {
                            const OptIcon = opt.icon;
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                  setKkForm({ ...kkForm, jenisPengajuan: opt.value });
                                  setIsJenisKkOpen(false);
                                }}
                                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[12.5px] font-semibold text-left transition-all ${
                                  kkForm.jenisPengajuan === opt.value
                                    ? "bg-[#009966]/10 text-[#009966]"
                                    : "text-[#0B281F]/80 hover:bg-slate-50 hover:text-[#0B281F]"
                                }`}
                              >
                                <OptIcon size={15} className="shrink-0" />
                                <span>{opt.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">NIK Kepala Keluarga</label>
                    <input type="text" required placeholder="16 digit NIK" className="w-full h-12 rounded-xl bg-[#F6F8F7] px-4 text-[13px] font-medium border border-[#0B281F]/5 outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all text-[#0B281F]" value={kkForm.nikKepala} onChange={(e) => setKkForm({...kkForm, nikKepala: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">Jumlah Anggota Terkait</label>
                    <input type="number" min="1" max="15" className="w-full h-12 rounded-xl bg-[#F6F8F7] px-4 text-[13px] font-medium border border-[#0B281F]/5 outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all text-[#0B281F]" value={kkForm.anggotaJumlah} onChange={(e) => setKkForm({...kkForm, anggotaJumlah: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">Alasan Detail Pengajuan</label>
                  <textarea required rows={3} placeholder="Jelaskan kebutuhan pengajuan perbaikan/cetak Kartu Keluarga baru" className="w-full rounded-xl bg-[#F6F8F7] p-4 text-[13px] font-medium border border-[#0B281F]/5 outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all text-[#0B281F]" value={kkForm.alasan} onChange={(e) => setKkForm({...kkForm, alasan: e.target.value})} />
                </div>

                {/* Persyaratan Callout */}
                <div className="rounded-2xl border border-[#009966]/10 bg-[#009966]/5 p-4 space-y-2">
                  <h5 className="text-[12px] font-bold text-[#009966] uppercase tracking-wider">Persyaratan Dokumen:</h5>
                  <ul className="list-disc list-inside text-[11.5px] text-[#0B281F]/70 space-y-1 font-medium">
                    <li>Fotokopi KK lama</li>
                    <li>Fotokopi buku nikah / akta perkawinan</li>
                    <li>Fotokopi akta kelahiran anggota keluarga</li>
                    <li>Fotokopi KTP-el kepala keluarga</li>
                    <li>Surat pindah (jika anggota keluarga pindahan)</li>
                    <li>Mengisi formulir permohonan KK</li>
                  </ul>
                </div>

                {/* Upload Section */}
                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">Upload Scan Dokumen (KK Lama/Buku Nikah/Surat Lahir) - PDF/JPG</label>
                  <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#0B281F]/10 bg-[#F6F8F7] p-8 text-center transition-all hover:bg-emerald-50/20 hover:border-[#009966]/40">
                    <Upload className="mb-2 text-[#0B281F]/20" size={24} />
                    <p className="text-[12px] font-bold text-[#0B281F]/60">Pilih berkas pendukung</p>
                    <p className="text-[10px] text-[#0B281F]/30 uppercase tracking-widest mt-1">Maksimal 5MB</p>
                    <input key={fileInputKey} type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} />
                  </div>
                  {uploadedFiles.length > 0 && (
                    <div className="mt-2 rounded-xl bg-[#F6F8F7] p-3 flex justify-between items-center">
                      <span className="text-[12px] font-semibold text-[#0B281F]/70">{uploadedFiles.length} berkas dipilih.</span>
                      <button type="button" onClick={clearUploads} className="text-[11px] font-bold text-red-500">Hapus</button>
                    </div>
                  )}
                </div>

                <button 
                  type="submit" 
                  disabled={submittingForm}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#009966] text-[13px] font-bold text-white shadow-lg transition-all hover:bg-[#007f55] disabled:opacity-50"
                >
                  {submittingForm ? <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" /> : "Kirim Pengajuan Kartu Keluarga"}
                </button>
              </form>
            </div>
          )}

          {/* TAB 5: LAYANAN KTP-el FORM */}
          {activeTab === "layanan-ktp-el" && (
            <div className="mx-auto max-w-3xl rounded-3xl border border-white bg-white p-6 shadow-sm md:p-8 animate-fadeIn">
              <h3 className="text-xl font-bold text-[#0B281F] font-[Georgia,serif] mb-6">Formulir Pengajuan Cetak KTP Elektronik</h3>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  triggerSubmit("Layanan KTP-el", {
                    "Jenis Permohonan": ktpForm.jenisPengajuan,
                    "NIK Terlapor": ktpForm.nik,
                    "Keterangan Keperluan": ktpForm.alasan
                  });
                }} 
                className="space-y-6"
              >
                <div className="space-y-2 relative">
                  <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">Jenis Permohonan KTP-el</label>
                  
                  {/* Custom Dropdown Trigger */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsJenisKtpOpen(!isJenisKtpOpen)}
                      className="w-full h-12 rounded-xl bg-[#F6F8F7] px-4 text-[13px] font-semibold border border-[#0B281F]/5 outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all text-[#0B281F] flex items-center justify-between text-left"
                    >
                      <span>
                        {ktpForm.jenisPengajuan === "Perekaman Baru" && (
                          <span className="flex items-center gap-2">
                            <PlusCircle size={15} className="text-[#009966]" /> Perekaman Baru (Baru Berusia 17 Tahun)
                          </span>
                        )}
                        {ktpForm.jenisPengajuan === "Ganti Rusak" && (
                          <span className="flex items-center gap-2">
                            <Wrench size={15} className="text-[#009966]" /> Cetak Ulang karena KTP-el Rusak
                          </span>
                        )}
                        {ktpForm.jenisPengajuan === "Ganti Hilang" && (
                          <span className="flex items-center gap-2">
                            <Search size={15} className="text-[#009966]" /> Cetak Ulang karena KTP-el Hilang
                          </span>
                        )}
                        {ktpForm.jenisPengajuan === "Perubahan Biodata" && (
                          <span className="flex items-center gap-2">
                            <Edit size={15} className="text-[#009966]" /> Perubahan Biodata Kependudukan
                          </span>
                        )}
                        {!ktpForm.jenisPengajuan && "Pilih Jenis Permohonan KTP-el"}
                      </span>
                      <ChevronDown size={15} className={`transition-transform duration-300 ${isJenisKtpOpen ? "rotate-180" : ""}`} />
                    </button>

                    {/* Custom Dropdown Options */}
                    {isJenisKtpOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsJenisKtpOpen(false)} />
                        <div className="absolute left-0 right-0 mt-2 z-50 rounded-2xl border border-[#0B281F]/5 bg-white p-2 shadow-xl animate-scaleUp">
                          {[
                            { value: "Perekaman Baru", label: "Perekaman Baru (Baru Berusia 17 Tahun)", icon: PlusCircle },
                            { value: "Ganti Rusak", label: "Cetak Ulang karena KTP-el Rusak", icon: Wrench },
                            { value: "Ganti Hilang", label: "Cetak Ulang karena KTP-el Hilang", icon: Search },
                            { value: "Perubahan Biodata", label: "Perubahan Biodata Kependudukan", icon: Edit }
                          ].map((opt) => {
                            const OptIcon = opt.icon;
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                  setKtpForm({ ...ktpForm, jenisPengajuan: opt.value });
                                  setIsJenisKtpOpen(false);
                                }}
                                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[12.5px] font-semibold text-left transition-all ${
                                  ktpForm.jenisPengajuan === opt.value
                                    ? "bg-[#009966]/10 text-[#009966]"
                                    : "text-[#0B281F]/80 hover:bg-slate-50 hover:text-[#0B281F]"
                                }`}
                              >
                                <OptIcon size={15} className="shrink-0" />
                                <span>{opt.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">Nama Lengkap Pemohon</label>
                    <input type="text" disabled className="w-full h-12 rounded-xl bg-slate-100 px-4 text-[13px] font-bold text-[#0B281F]/60 border border-[#0B281F]/5 outline-none cursor-not-allowed" value={profileData.name} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">NIK Pemohon</label>
                    <input type="text" required placeholder="Masukkan NIK Anda" className="w-full h-12 rounded-xl bg-[#F6F8F7] px-4 text-[13px] font-medium border border-[#0B281F]/5 outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all text-[#0B281F]" value={ktpForm.nik} onChange={(e) => setKtpForm({...ktpForm, nik: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">Keterangan Alasan Pengajuan</label>
                  <textarea required rows={3} placeholder="Contoh: KTP fisik terkelupas, KTP hilang di jalan raya, atau perekaman KTP-el pertama kali." className="w-full rounded-xl bg-[#F6F8F7] p-4 text-[13px] font-medium border border-[#0B281F]/5 outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all text-[#0B281F]" value={ktpForm.alasan} onChange={(e) => setKtpForm({...ktpForm, alasan: e.target.value})} />
                </div>

                {/* Persyaratan Callout */}
                <div className="rounded-2xl border border-[#009966]/10 bg-[#009966]/5 p-4 space-y-2">
                  <h5 className="text-[12px] font-bold text-[#009966] uppercase tracking-wider">Persyaratan Dokumen:</h5>
                  <ul className="list-disc list-inside text-[11.5px] text-[#0B281F]/70 space-y-1 font-medium">
                    <li>Fotokopi Kartu Keluarga (KK)</li>
                    <li>Usia minimal 17 tahun atau sudah menikah</li>
                    <li>Surat pengantar RT/RW (jika diperlukan)</li>
                    <li>KTP lama untuk perpanjangan/perubahan data</li>
                    <li>Surat kehilangan dari kepolisian (jika KTP hilang)</li>
                  </ul>
                </div>

                {/* Upload Section */}
                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">
                    Upload Berkas Pendukung (Scan KK, KTP Lama/Surat Kehilangan dari Kepolisian jika hilang) - PDF/JPG
                  </label>
                  <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#0B281F]/10 bg-[#F6F8F7] p-8 text-center transition-all hover:bg-emerald-50/20 hover:border-[#009966]/40">
                    <Upload className="mb-2 text-[#0B281F]/20" size={24} />
                    <p className="text-[12px] font-bold text-[#0B281F]/60">Pilih berkas lampiran</p>
                    <p className="text-[10px] text-[#0B281F]/30 uppercase tracking-widest mt-1">Maksimal 5MB</p>
                    <input key={fileInputKey} type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} />
                  </div>
                  {uploadedFiles.length > 0 && (
                    <div className="mt-2 rounded-xl bg-[#F6F8F7] p-3 flex justify-between items-center">
                      <span className="text-[12px] font-semibold text-[#0B281F]/70">{uploadedFiles.length} berkas dipilih.</span>
                      <button type="button" onClick={clearUploads} className="text-[11px] font-bold text-red-500">Hapus</button>
                    </div>
                  )}
                </div>

                <button 
                  type="submit" 
                  disabled={submittingForm}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#009966] text-[13px] font-bold text-white shadow-lg transition-all hover:bg-[#007f55] disabled:opacity-50"
                >
                  {submittingForm ? <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" /> : "Kirim Pengajuan KTP-el"}
                </button>
              </form>
            </div>
          )}

          {/* TAB 6: IDENTITAS ANAK (KIA) FORM */}
          {activeTab === "kia" && (
            <div className="mx-auto max-w-3xl rounded-3xl border border-white bg-white p-6 shadow-sm md:p-8 animate-fadeIn">
              <h3 className="text-xl font-bold text-[#0B281F] font-[Georgia,serif] mb-6">Formulir Pembuatan Kartu Identitas Anak (KIA)</h3>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  triggerSubmit("Identitas Anak (KIA)", {
                    "Nama Anak": kiaForm.namaAnak,
                    "NIK Anak": kiaForm.nikAnak || "Belum ada",
                    "Tempat Tanggal Lahir Anak": kiaForm.tempatTanggalLahir,
                    "NIK Orang Tua (Pelapor)": kiaForm.nikOrangTua
                  });
                }} 
                className="space-y-6"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">Nama Lengkap Anak</label>
                    <input type="text" required placeholder="Sesuai Akta Kelahiran" className="w-full h-12 rounded-xl bg-[#F6F8F7] px-4 text-[13px] font-medium border border-[#0B281F]/5 outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all text-[#0B281F]" value={kiaForm.namaAnak} onChange={(e) => setKiaForm({...kiaForm, namaAnak: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">NIK Anak (Jika Ada)</label>
                    <input type="text" placeholder="Lihat pada KK" className="w-full h-12 rounded-xl bg-[#F6F8F7] px-4 text-[13px] font-medium border border-[#0B281F]/5 outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all text-[#0B281F]" value={kiaForm.nikAnak} onChange={(e) => setKiaForm({...kiaForm, nikAnak: e.target.value})} />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">Tempat/Tanggal Lahir Anak</label>
                    <input type="text" required placeholder="Contoh: Bandung, 05-10-2015" className="w-full h-12 rounded-xl bg-[#F6F8F7] px-4 text-[13px] font-medium border border-[#0B281F]/5 outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all text-[#0B281F]" value={kiaForm.tempatTanggalLahir} onChange={(e) => setKiaForm({...kiaForm, tempatTanggalLahir: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">NIK Orang Tua / Wali</label>
                    <input type="text" required placeholder="16 digit NIK Orang Tua" className="w-full h-12 rounded-xl bg-[#F6F8F7] px-4 text-[13px] font-medium border border-[#0B281F]/5 outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all text-[#0B281F]" value={kiaForm.nikOrangTua} onChange={(e) => setKiaForm({...kiaForm, nikOrangTua: e.target.value})} />
                  </div>
                </div>

                {/* Persyaratan Callout */}
                <div className="rounded-2xl border border-[#009966]/10 bg-[#009966]/5 p-4 space-y-2">
                  <h5 className="text-[12px] font-bold text-[#009966] uppercase tracking-wider">Persyaratan Dokumen:</h5>
                  <ul className="list-disc list-inside text-[11.5px] text-[#0B281F]/70 space-y-1 font-medium">
                    <li>Fotokopi akta kelahiran anak</li>
                    <li>Fotokopi KK orang tua</li>
                    <li>Fotokopi KTP-el orang tua</li>
                    <li>Pas foto anak ukuran 2x3 (untuk usia di atas 5 tahun)</li>
                    <li>Mengisi formulir permohonan KIA</li>
                  </ul>
                </div>

                {/* Upload Section */}
                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">
                    Upload Berkas (Scan Akta Kelahiran Anak, Kartu Keluarga Orang Tua, & Foto Anak ukuran 2x3 jika usia &gt; 5 tahun) - PDF/JPG
                  </label>
                  <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#0B281F]/10 bg-[#F6F8F7] p-8 text-center transition-all hover:bg-emerald-50/20 hover:border-[#009966]/40">
                    <Upload className="mb-2 text-[#0B281F]/20" size={24} />
                    <p className="text-[12px] font-bold text-[#0B281F]/60">Pilih berkas persyaratan KIA</p>
                    <p className="text-[10px] text-[#0B281F]/30 uppercase tracking-widest mt-1">Maksimal 5MB</p>
                    <input key={fileInputKey} type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} />
                  </div>
                  {uploadedFiles.length > 0 && (
                    <div className="mt-2 rounded-xl bg-[#F6F8F7] p-3 flex justify-between items-center">
                      <span className="text-[12px] font-semibold text-[#0B281F]/70">{uploadedFiles.length} berkas dipilih.</span>
                      <button type="button" onClick={clearUploads} className="text-[11px] font-bold text-red-500">Hapus</button>
                    </div>
                  )}
                </div>

                <button 
                  type="submit" 
                  disabled={submittingForm}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#009966] text-[13px] font-bold text-white shadow-lg transition-all hover:bg-[#007f55] disabled:opacity-50"
                >
                  {submittingForm ? <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" /> : "Kirim Pengajuan KIA"}
                </button>
              </form>
            </div>
          )}

          {/* TAB 7: LAYANAN PENGADUAN FORM */}
          {activeTab === "pengaduan" && (
            <div className="mx-auto max-w-3xl rounded-3xl border border-white bg-white p-6 shadow-sm md:p-8 animate-fadeIn">
              <h3 className="text-xl font-bold text-[#0B281F] font-[Georgia,serif] mb-6">Formulir Laporan Pengaduan Masyarakat</h3>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  triggerSubmit("Layanan Pengaduan", {
                    "Kategori Pengaduan": pengaduanForm.kategori,
                    "Judul Laporan": pengaduanForm.judul,
                    "Lokasi Kejadian": pengaduanForm.lokasi,
                    "Kronologi": pengaduanForm.deskripsi
                  });
                }} 
                className="space-y-6"
              >
                <div className="space-y-2 relative">
                  <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">Kategori Masalah / Pengaduan</label>
                  
                  {/* Custom Dropdown Trigger */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsKategoriPengaduanOpen(!isKategoriPengaduanOpen)}
                      className="w-full h-12 rounded-xl bg-[#F6F8F7] px-4 text-[13px] font-semibold border border-[#0B281F]/5 outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all text-[#0B281F] flex items-center justify-between text-left"
                    >
                      <span>
                        {pengaduanForm.kategori === "Infrastruktur / Jalan" && (
                          <span className="flex items-center gap-2">
                            <Milestone size={15} className="text-[#009966]" /> Infrastruktur & Jalan Rusak
                          </span>
                        )}
                        {pengaduanForm.kategori === "Pelayanan Publik" && (
                          <span className="flex items-center gap-2">
                            <Building2 size={15} className="text-[#009966]" /> Kualitas Pelayanan Administrasi Desa
                          </span>
                        )}
                        {pengaduanForm.kategori === "Keamanan / Ketertiban" && (
                          <span className="flex items-center gap-2">
                            <Shield size={15} className="text-[#009966]" /> Gangguan Keamanan & Ketertiban Umum
                          </span>
                        )}
                        {pengaduanForm.kategori === "Bantuan Sosial" && (
                          <span className="flex items-center gap-2">
                            <Gift size={15} className="text-[#009966]" /> Keluhan Penyaluran Bansos
                          </span>
                        )}
                        {pengaduanForm.kategori === "Sampah / Kebersihan" && (
                          <span className="flex items-center gap-2">
                            <Trash2 size={15} className="text-[#009966]" /> Kondisi Kebersihan & Masalah Sampah
                          </span>
                        )}
                        {!pengaduanForm.kategori && "Pilih Kategori Masalah / Pengaduan"}
                      </span>
                      <ChevronDown size={15} className={`transition-transform duration-300 ${isKategoriPengaduanOpen ? "rotate-180" : ""}`} />
                    </button>

                    {/* Custom Dropdown Options */}
                    {isKategoriPengaduanOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsKategoriPengaduanOpen(false)} />
                        <div className="absolute left-0 right-0 mt-2 z-50 rounded-2xl border border-[#0B281F]/5 bg-white p-2 shadow-xl animate-scaleUp">
                          {[
                            { value: "Infrastruktur / Jalan", label: "Infrastruktur & Jalan Rusak", icon: Milestone },
                            { value: "Pelayanan Publik", label: "Kualitas Pelayanan Administrasi Desa", icon: Building2 },
                            { value: "Keamanan / Ketertiban", label: "Gangguan Keamanan & Ketertiban Umum", icon: Shield },
                            { value: "Bantuan Sosial", label: "Keluhan Penyaluran Bansos", icon: Gift },
                            { value: "Sampah / Kebersihan", label: "Kondisi Kebersihan & Masalah Sampah", icon: Trash2 }
                          ].map((opt) => {
                            const OptIcon = opt.icon;
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                  setPengaduanForm({ ...pengaduanForm, kategori: opt.value });
                                  setIsKategoriPengaduanOpen(false);
                                }}
                                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[12.5px] font-semibold text-left transition-all ${
                                  pengaduanForm.kategori === opt.value
                                    ? "bg-[#009966]/10 text-[#009966]"
                                    : "text-[#0B281F]/80 hover:bg-slate-50 hover:text-[#0B281F]"
                                }`}
                              >
                                <OptIcon size={15} className="shrink-0" />
                                <span>{opt.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">Judul Laporan Pengaduan</label>
                  <input type="text" required placeholder="Contoh: Lampu Penerangan Jalan RT 03 Mati Total" className="w-full h-12 rounded-xl bg-[#F6F8F7] px-4 text-[13px] font-medium border border-[#0B281F]/5 outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all text-[#0B281F]" value={pengaduanForm.judul} onChange={(e) => setPengaduanForm({...pengaduanForm, judul: e.target.value})} />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">Lokasi Detail Kejadian</label>
                  <input type="text" required placeholder="Contoh: Gang Masjid No 10, RT 03 / RW 07" className="w-full h-12 rounded-xl bg-[#F6F8F7] px-4 text-[13px] font-medium border border-[#0B281F]/5 outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all text-[#0B281F]" value={pengaduanForm.lokasi} onChange={(e) => setPengaduanForm({...pengaduanForm, lokasi: e.target.value})} />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">Kronologi / Penjelasan Kejadian</label>
                  <textarea required rows={4} placeholder="Jelaskan detail kejadian, waktu kejadian, dan dampak dari masalah tersebut..." className="w-full rounded-xl bg-[#F6F8F7] p-4 text-[13px] font-medium border border-[#0B281F]/5 outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all text-[#0B281F]" value={pengaduanForm.deskripsi} onChange={(e) => setPengaduanForm({...pengaduanForm, deskripsi: e.target.value})} />
                </div>

                {/* Upload Section */}
                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">Upload Foto Bukti Kejadian (Maks. 3 Berkas) - JPG/PNG</label>
                  <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#0B281F]/10 bg-[#F6F8F7] p-8 text-center transition-all hover:bg-emerald-50/20 hover:border-[#009966]/40">
                    <Upload className="mb-2 text-[#0B281F]/20" size={24} />
                    <p className="text-[12px] font-bold text-[#0B281F]/60">Pilih foto bukti pengaduan</p>
                    <p className="text-[10px] text-[#0B281F]/30 uppercase tracking-widest mt-1">Maksimal 5MB</p>
                    <input key={fileInputKey} type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} />
                  </div>
                  {uploadedFiles.length > 0 && (
                    <div className="mt-2 rounded-xl bg-[#F6F8F7] p-3 flex justify-between items-center">
                      <span className="text-[12px] font-semibold text-[#0B281F]/70">{uploadedFiles.length} berkas dipilih.</span>
                      <button type="button" onClick={clearUploads} className="text-[11px] font-bold text-red-500">Hapus</button>
                    </div>
                  )}
                </div>

                <button 
                  type="submit" 
                  disabled={submittingForm}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#009966] text-[13px] font-bold text-white shadow-lg transition-all hover:bg-[#007f55] disabled:opacity-50"
                >
                  {submittingForm ? <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" /> : "Kirim Laporan Pengaduan"}
                </button>
              </form>
            </div>
          )}

          {/* TAB 8: MONITORING RIWAYAT PENGAJUAN */}
          {activeTab === "monitoring" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#0B281F] font-[Georgia,serif]">Riwayat Pengajuan Dokumen</h3>
                  <p className="text-[12px] text-[#0B281F]/50">Pantau progres pengajuan administrasi kependudukan Anda secara berkala.</p>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white bg-white shadow-sm">
                <div className="overflow-x-auto">
                  {/* Desktop View Table */}
                  <table className="hidden sm:table w-full border-collapse text-left">
                    <thead>
                      <tr className="border-b border-[#0B281F]/5 bg-slate-50 text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40">
                        <th className="p-4 pl-6">ID Pengajuan</th>
                        <th className="p-4">Jenis Layanan</th>
                        <th className="p-4">Tanggal Pengajuan</th>
                        <th className="p-4">Status Progres</th>
                        <th className="p-4 pr-6 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#0B281F]/5 text-[13px] font-semibold text-[#0B281F]">
                      {submissions.map((sub) => (
                        <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 pl-6 font-mono text-[12px] text-[#0B281F]/50">{sub.id}</td>
                          <td className="p-4 font-bold">{sub.type}</td>
                          <td className="p-4 text-[#0B281F]/60">{sub.date}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <span className={`h-2 w-2 rounded-full ${sub.status === "Diproses" ? "bg-amber-500 animate-pulse" : sub.status === "Disetujui" ? "bg-emerald-500" : "bg-red-500"}`} />
                              <span className={`text-[12.5px] font-bold ${sub.color}`}>{sub.status}</span>
                            </div>
                          </td>
                          <td className="p-4 pr-6 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button 
                                onClick={() => setSelectedSubmission(sub)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0B281F]/5 text-[#0B281F] hover:bg-[#0B281F] hover:text-white transition-all"
                                title="Lihat Detail"
                              >
                                <Eye size={14} />
                              </button>
                              {sub.status === "Disetujui" && (
                                <button 
                                  onClick={() => toast.success(`Mendownload tanda terima untuk ${sub.id}`)}
                                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-[#009966] hover:bg-[#009966] hover:text-white transition-all"
                                  title="Unduh Dokumen / Tanda Terima"
                                >
                                  <Download size={14} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                      {submissions.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-12 text-center text-[#0B281F]/30 font-bold uppercase tracking-widest text-[11px]">
                            Belum ada riwayat pengajuan.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  {/* Mobile View Cards */}
                  <div className="block sm:hidden divide-y divide-[#0B281F]/5">
                    {submissions.map((sub) => (
                      <div key={sub.id} className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[11px] text-[#0B281F]/55">{sub.id}</span>
                          <div className="flex items-center gap-1.5">
                            <span className={`h-1.5 w-1.5 rounded-full ${sub.status === "Diproses" ? "bg-amber-500 animate-pulse" : sub.status === "Disetujui" ? "bg-emerald-500" : "bg-red-500"}`} />
                            <span className={`text-[11.5px] font-bold ${sub.color}`}>{sub.status}</span>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-bold text-[#0B281F] text-[14px]">{sub.type}</h5>
                          <p className="text-[11px] text-[#0B281F]/50 mt-0.5">Diajukan: {sub.date}</p>
                        </div>
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => setSelectedSubmission(sub)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0B281F]/5 text-[#0B281F] text-[11px] font-bold active:scale-95 transition-all"
                          >
                            <Eye size={12} />
                            <span>Detail</span>
                          </button>
                          {sub.status === "Disetujui" && (
                            <button 
                              onClick={() => toast.success(`Mendownload tanda terima untuk ${sub.id}`)}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 text-[#009966] text-[11px] font-bold active:scale-95 transition-all"
                            >
                              <Download size={12} />
                              <span>Unduh</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    {submissions.length === 0 && (
                      <div className="py-12 text-center text-[#0B281F]/30 font-bold uppercase tracking-widest text-[11px]">
                        Belum ada riwayat pengajuan.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Info panel */}
              <div className="rounded-2xl border border-white bg-white p-6 shadow-sm">
                <h4 className="text-[14px] font-bold text-[#0B281F] mb-2">💡 Alur Status Pengajuan</h4>
                <div className="grid gap-4 md:grid-cols-3 text-[12px] text-[#0B281F]/60">
                  <div className="p-3 bg-[#F6F8F7] rounded-xl space-y-1">
                    <span className="font-bold text-amber-600 block">🟡 Diproses</span>
                    <span>Admin desa sedang memverifikasi kelengkapan berkas Anda secara online.</span>
                  </div>
                  <div className="p-3 bg-[#F6F8F7] rounded-xl space-y-1">
                    <span className="font-bold text-emerald-600 block">🟢 Disetujui</span>
                    <span>Verifikasi selesai. Dokumen fisik dapat diambil di Kantor Desa atau tanda terima diunduh.</span>
                  </div>
                  <div className="p-3 bg-[#F6F8F7] rounded-xl space-y-1">
                    <span className="font-bold text-red-600 block">🔴 Ditolak</span>
                    <span>Berkas kurang lengkap atau salah data. Silakan lihat catatan detail dan ajukan kembali.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: PROFIL SAYA */}
          {activeTab === "profil" && (
            <div className="mx-auto max-w-3xl rounded-3xl border border-white bg-white p-6 shadow-sm md:p-8 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#0B281F]/5 pb-6 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#0B281F] font-[Georgia,serif]">Informasi Profil Penduduk</h3>
                  <p className="text-[12px] text-[#0B281F]/50 mt-1">Data resmi terdaftar pada database sistem informasi Desa Pameutingan.</p>
                </div>
                <button 
                  onClick={() => {
                    if (isEditingProfile) {
                      localStorage.setItem("village_profile_data", JSON.stringify(profileData));
                      toast.success("Profil berhasil diperbarui.");
                    }
                    setIsEditingProfile(!isEditingProfile);
                  }}
                  className={`mt-4 sm:mt-0 px-6 py-2.5 rounded-xl text-[12.5px] font-bold transition-all ${isEditingProfile ? "bg-[#009966] text-white shadow-md shadow-[#009966]/20" : "bg-[#0B281F] text-white"}`}
                >
                  {isEditingProfile ? "Simpan Perubahan" : "Edit Profil"}
                </button>
              </div>

              <div className="space-y-6">
                {/* Avatar Profile Section */}
                <div className="flex flex-col items-center gap-3 mb-6 pb-6 border-b border-[#0B281F]/5">
                  <div className="relative group">
                    <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-[#009966]/10 bg-[#0B281F]/5 flex items-center justify-center text-[36px] font-black text-[#0B281F]">
                      {profileData.avatar ? (
                        <img src={profileData.avatar} alt="Profile" className="h-full w-full object-cover" />
                      ) : (
                        <span>{profileData.name.charAt(0)}</span>
                      )}
                    </div>
                    {isEditingProfile && (
                      <label className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <Upload size={18} />
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              if (file.size > 2 * 1024 * 1024) {
                                toast.error("Ukuran foto maksimal 2MB!");
                                return;
                              }
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                const base64 = reader.result as string;
                                setProfileData(prev => ({ ...prev, avatar: base64 }));
                                toast.success("Foto profil terpilih! Silakan simpan perubahan.");
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    )}
                  </div>
                  {isEditingProfile ? (
                    <p className="text-[11px] text-[#0B281F]/40 font-semibold uppercase tracking-wider">Klik foto untuk mengganti (Maks. 2MB)</p>
                  ) : (
                    <p className="text-[11px] text-[#0B281F]/40 font-semibold uppercase tracking-wider">Foto Profil</p>
                  )}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">Nama Lengkap</label>
                    <input 
                      type="text" 
                      disabled={!isEditingProfile} 
                      className={`w-full h-12 rounded-xl px-4 text-[13px] font-medium border border-[#0B281F]/5 outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all ${isEditingProfile ? "bg-[#F6F8F7] text-[#0B281F]" : "bg-slate-100 text-[#0B281F]/60 cursor-not-allowed"}`}
                      value={profileData.name} 
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">NIK (Nomor Induk Kependudukan)</label>
                    <input 
                      type="text" 
                      disabled 
                      className="w-full h-12 rounded-xl bg-slate-100 px-4 text-[13px] font-bold text-[#0B281F]/60 border border-[#0B281F]/5 outline-none cursor-not-allowed"
                      value={profileData.nik} 
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">Nomor Kartu Keluarga (KK)</label>
                    <input 
                      type="text" 
                      disabled 
                      className="w-full h-12 rounded-xl bg-slate-100 px-4 text-[13px] font-bold text-[#0B281F]/60 border border-[#0B281F]/5 outline-none cursor-not-allowed"
                      value={profileData.kk} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">Tempat, Tanggal Lahir</label>
                    <input 
                      type="text" 
                      disabled={!isEditingProfile} 
                      className={`w-full h-12 rounded-xl px-4 text-[13px] font-medium border border-[#0B281F]/5 outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all ${isEditingProfile ? "bg-[#F6F8F7] text-[#0B281F]" : "bg-slate-100 text-[#0B281F]/60 cursor-not-allowed"}`}
                      value={profileData.birthPlaceDate} 
                      onChange={(e) => setProfileData({...profileData, birthPlaceDate: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">Jenis Kelamin</label>
                    <input 
                      type="text" 
                      disabled={!isEditingProfile} 
                      className={`w-full h-12 rounded-xl px-4 text-[13px] font-medium border border-[#0B281F]/5 outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all ${isEditingProfile ? "bg-[#F6F8F7] text-[#0B281F]" : "bg-slate-100 text-[#0B281F]/60 cursor-not-allowed"}`}
                      value={profileData.gender} 
                      onChange={(e) => setProfileData({...profileData, gender: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">Pekerjaan</label>
                    <input 
                      type="text" 
                      disabled={!isEditingProfile} 
                      className={`w-full h-12 rounded-xl px-4 text-[13px] font-medium border border-[#0B281F]/5 outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all ${isEditingProfile ? "bg-[#F6F8F7] text-[#0B281F]" : "bg-slate-100 text-[#0B281F]/60 cursor-not-allowed"}`}
                      value={profileData.job} 
                      onChange={(e) => setProfileData({...profileData, job: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">No. HP / WhatsApp</label>
                    <input 
                      type="text" 
                      disabled={!isEditingProfile} 
                      className={`w-full h-12 rounded-xl px-4 text-[13px] font-medium border border-[#0B281F]/5 outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all ${isEditingProfile ? "bg-[#F6F8F7] text-[#0B281F]" : "bg-slate-100 text-[#0B281F]/60 cursor-not-allowed"}`}
                      value={profileData.phone} 
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">Email</label>
                    <input 
                      type="email" 
                      disabled={!isEditingProfile} 
                      className={`w-full h-12 rounded-xl px-4 text-[13px] font-medium border border-[#0B281F]/5 outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all ${isEditingProfile ? "bg-[#F6F8F7] text-[#0B281F]" : "bg-slate-100 text-[#0B281F]/60 cursor-not-allowed"}`}
                      value={profileData.email} 
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B281F]/40 ml-1">Alamat Terdaftar</label>
                  <textarea 
                    rows={2} 
                    disabled={!isEditingProfile} 
                    className={`w-full rounded-xl p-4 text-[13px] font-medium border border-[#0B281F]/5 outline-none focus:ring-2 focus:ring-[#009966]/20 transition-all ${isEditingProfile ? "bg-[#F6F8F7] text-[#0B281F]" : "bg-slate-100 text-[#0B281F]/60 cursor-not-allowed"}`}
                    value={profileData.address} 
                    onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: PUSAT BANTUAN FAQ */}
          {activeTab === "bantuan" && (
            <div className="space-y-8 animate-fadeIn">
              <div className="rounded-3xl border border-white bg-white p-6 shadow-sm md:p-8">
                <h3 className="text-xl font-bold text-[#0B281F] font-[Georgia,serif] mb-6">Pertanyaan Populer (FAQ)</h3>
                
                <div className="divide-y divide-[#0B281F]/5">
                  {[
                    { q: "Berapa lama proses verifikasi berkas pengajuan online?", a: "Proses verifikasi berkas kependudukan di Desa Pameutingan memakan waktu berkisar antara 1 s.d 3 hari kerja tergantung jenis surat yang Anda ajukan." },
                    { q: "Dokumen fisik apa saja yang harus dibawa saat pengambilan?", a: "Anda diharuskan membawa dokumen asli seperti KK Lama (untuk cetak KK baru), Surat Pengantar RT/RW asli, dan fotokopi berkas pendukung lainnya sebagai validasi fisik." },
                    { q: "Bagaimana cara melacak pengaduan masyarakat yang saya kirim?", a: "Setiap laporan pengaduan masuk langsung ke tab 'Monitoring Pengajuan'. Status 'Diproses' berarti sedang dipetakan ke dinas/RT terkait." },
                    { q: "Mengapa berkas pengajuan saya ditolak?", a: "Penolakan terjadi apabila berkas scan dokumen yang diupload buram/tidak terbaca, data NIK salah input, atau lampiran dokumen wajib tidak lengkap. Periksa detail di modal riwayat." }
                  ].map((faq, idx) => (
                    <details key={idx} className="group py-4">
                      <summary className="flex cursor-pointer items-center justify-between font-bold text-[#0B281F] hover:text-[#009966] text-[13.5px]">
                        <span>{faq.q}</span>
                        <ChevronDown size={16} className="transition-transform group-open:rotate-180 text-[#0B281F]/30" />
                      </summary>
                      <p className="mt-3 text-[12.5px] leading-relaxed text-[#0B281F]/60 pl-1">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </div>

              {/* Call Center contact card */}
              <div className="rounded-3xl bg-[#0B281F] p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="text-lg font-bold">Butuh Bantuan IT atau Konsultasi Cepat?</h4>
                  <p className="text-[13px] text-white/60 mt-1 max-w-lg leading-relaxed">
                    Hubungi tim pelayanan admin IT Desa Pameutingan di nomor pelayanan resmi desa untuk respon cepat masalah akun dan status data kependudukan.
                  </p>
                </div>
                <button 
                  onClick={() => window.open("https://wa.me/6281234567890", "_blank")}
                  className="rounded-xl bg-[#009966] px-6 py-3.5 text-[13px] font-bold text-white shadow-lg hover:bg-[#007f55] transition-all shrink-0"
                >
                  WhatsApp Pelayanan Desa
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Submission Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xl rounded-3xl border border-white bg-white p-6 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between border-b border-[#0B281F]/5 pb-4 mb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0B281F]/30">{selectedSubmission.id}</span>
                <h4 className="text-lg font-bold text-[#0B281F] font-[Georgia,serif]">{selectedSubmission.type}</h4>
              </div>
              <button 
                onClick={() => setSelectedSubmission(null)}
                className="text-[#0B281F]/40 hover:text-[#0B281F]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center bg-[#F6F8F7] p-3 rounded-xl">
                <span className="text-[12px] font-bold text-[#0B281F]/50">Status Pengajuan</span>
                <span className={`text-[12.5px] font-bold px-3 py-1 rounded-full ${selectedSubmission.bg} ${selectedSubmission.color}`}>
                  {selectedSubmission.status}
                </span>
              </div>

              <div className="space-y-3">
                {Object.entries(selectedSubmission.details).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0B281F]/30">{key}</span>
                    <span className="text-[13px] font-semibold text-[#0B281F] mt-0.5 leading-relaxed">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 border-t border-[#0B281F]/5 pt-4 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedSubmission(null)}
                className="rounded-xl border border-[#0B281F]/10 px-5 py-2.5 text-[12px] font-bold text-[#0B281F]/60 hover:bg-[#0B281F]/5"
              >
                Tutup
              </button>
              {selectedSubmission.status === "Disetujui" && (
                <button 
                  onClick={() => {
                    toast.success("Tanda terima terunduh secara otomatis.");
                    setSelectedSubmission(null);
                  }}
                  className="rounded-xl bg-[#009966] px-5 py-2.5 text-[12px] font-bold text-white shadow-md hover:bg-[#007f55]"
                >
                  Unduh Tanda Terima
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
