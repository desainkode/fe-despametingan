import axios from 'axios'
import { getCookie } from 'cookies-next'

const API_URL = process.env.NEXT_PUBLIC_API_URL

const getAuthHeaders = () => {
  const token = getCookie('token')
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }
}

// ----------------------------------------------------------------------
// TYPES
// ----------------------------------------------------------------------

export interface BansosProgram {
  id: string
  desa_id: string
  tahun: number
  nama: string
  keterangan: string | null
  target_jumlah: number
  realisasi_jumlah: number
  status: 'aktif' | 'selesai'
  recipients_count?: number
  created_at: string
  updated_at: string
}

export interface BansosRecipient {
  id: string
  bansos_program_id: string
  penduduk_id: string | null
  kartu_keluarga_id: string | null
  nama_penerima: string
  identitas_penerima: string | null
  jumlah_bantuan: number
  status_penerima: 'aktif' | 'nonaktif'
  keterangan: string | null
  created_at: string
  updated_at: string
  penduduk?: {
    id: string
    nik: string
    nama: string
    jenis_kelamin: string
  }
  kartu_keluarga?: {
    id: string
    no_kk: string
    kepala_keluarga_id: string | null
  }
}

export interface BansosProgramInput {
  tahun: number
  nama: string
  keterangan?: string
  target_jumlah?: number
  status?: 'aktif' | 'selesai'
}

export interface BansosRecipientInput {
  penduduk_id?: string
  kartu_keluarga_id?: string
  nama_penerima?: string
  identitas_penerima?: string
  jumlah_bantuan: number
  keterangan?: string
  status_penerima?: 'aktif' | 'nonaktif'
}

export interface BansosStatistics {
  total_penerima: number
  total_program: number
  total_bantuan: number
  program_terbesar: { nama: string; jumlah: number } | null
  programs: {
    nama: string
    total_penerima: number
    total_bantuan: number
  }[]
  distributions: {
    nama: string
    total: number
  }[]
}

// ----------------------------------------------------------------------
// ADMIN API
// ----------------------------------------------------------------------

export const bansosApi = {
  // Programs
  getPrograms: async () => {
    const response = await axios.get(`${API_URL}/bansos`, getAuthHeaders())
    return response.data.data as BansosProgram[]
  },

  createProgram: async (data: BansosProgramInput) => {
    const response = await axios.post(`${API_URL}/bansos`, data, getAuthHeaders())
    return response.data.data as BansosProgram
  },

  updateProgram: async (id: string, data: Partial<BansosProgramInput>) => {
    const response = await axios.put(`${API_URL}/bansos/${id}`, data, getAuthHeaders())
    return response.data.data as BansosProgram
  },

  deleteProgram: async (id: string) => {
    const response = await axios.delete(`${API_URL}/bansos/${id}`, getAuthHeaders())
    return response.data
  },

  // Recipients
  getRecipients: async (programId: string) => {
    const response = await axios.get(
      `${API_URL}/bansos/${programId}/recipients`,
      getAuthHeaders()
    )
    return response.data.data as {
      program: BansosProgram
      recipients: BansosRecipient[]
    }
  },

  addRecipient: async (programId: string, data: BansosRecipientInput) => {
    const response = await axios.post(
      `${API_URL}/bansos/${programId}/recipients`,
      data,
      getAuthHeaders()
    )
    return response.data.data as BansosRecipient
  },

  deleteRecipient: async (programId: string, recipientId: string) => {
    const response = await axios.delete(
      `${API_URL}/bansos/${programId}/recipients/${recipientId}`,
      getAuthHeaders()
    )
    return response.data
  },

  // Public API
  getPublicStatistics: async () => {
    const response = await axios.get(`${API_URL}/public/bansos`)
    return response.data.data as BansosStatistics
  },
}
