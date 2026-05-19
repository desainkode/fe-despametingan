// ============================================================
// Auth & User Types
// ============================================================

export interface Desa {
  id: string;
  nama_desa: string;
  kode_desa?: string;
  kode_desa_idm?: string;
  kode_desa_sdgs?: string;
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

export type UserRole = "superadmin" | "admin_desa" | "warga";

export interface User {
  id: string;
  name: string;
  email: string | null;
  role: UserRole;
  desa_id?: string | null;
  desa: Desa | null;
  penduduk_id?: string | null;
  nik?: string | null;
  is_active?: boolean;
  created_at?: string;
}

// ============================================================
// API Response Types
// ============================================================

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
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
