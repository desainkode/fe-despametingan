// ============================================================
// Auth & User Types
// ============================================================

export interface Desa {
  id: string;
  nama_desa: string;
  kode_desa?: string;
  kecamatan?: string;
  kabupaten?: string;
  provinsi?: string;
  alamat_kantor?: string;
  telepon?: string;
  email?: string;
  whatsapp?: string;
  website?: string;
  google_maps_url?: string;
  visi?: string;
  misi?: string;
  sejarah?: string;
  kata_sambutan?: string;
  nama_kepala_desa?: string;
  foto_kepala_desa?: string | null;
  logo_desa?: string | null;
  social_media?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  } | null;
  batas_utara?: string;
  batas_timur?: string;
  batas_selatan?: string;
  batas_barat?: string;
  luas_wilayah?: string;
  koordinat?: {
    lat: number | null;
    lng: number | null;
  };
  created_at?: string;
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
