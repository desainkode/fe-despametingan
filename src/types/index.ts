// ============================================================
// Auth & User Types
// ============================================================

export interface Desa {
  id: string;
  nama_desa: string;
  kode_desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  alamat_kantor: string | null;
  telepon: string | null;
  email: string | null;
  whatsapp: string | null;
  website: string | null;
  google_maps_url: string | null;
  visi: string | null;
  misi: string | null;
  sejarah: string | null;
  kata_sambutan: string | null;
  nama_kepala_desa: string | null;
  foto_kepala_desa: string | null;
  logo_desa: string | null;
  social_media: Record<string, string> | null;
  batas_utara: string | null;
  batas_timur: string | null;
  batas_selatan: string | null;
  batas_barat: string | null;
  luas_wilayah: string | null;
  koordinat: { lat: number | null; lng: number | null };
  created_at: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  desa: Desa | null;
}

// ============================================================
// API Response Types
// ============================================================

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface LoginResponse {
  user: User;
  token: string;
}

// ============================================================
// Dashboard Types
// ============================================================

export interface DashboardStats {
  total_penduduk: number;
  total_kartu_keluarga: number;
  total_surat: number;
}
