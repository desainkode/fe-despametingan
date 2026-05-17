import api from '../api'

export interface StuntingRecord {
  id: string
  year: number
  total_children: number
  stunted_children: number
  target_rate: number
  keterangan: string | null
  status: 'draft' | 'ditetapkan'
  created_at: string
  updated_at: string
}

export interface StuntingChild {
  id: string
  stunting_record_id: string
  penduduk_id: string | null
  nama_anak: string
  nik: string | null
  jenis_kelamin: 'L' | 'P'
  tanggal_lahir: string
  usia_bulan: number
  tinggi_badan: number | null
  berat_badan: number | null
  status_gizi: 'normal' | 'stunting' | 'severely_stunting'
  nama_ortu: string | null
  dusun_id: string | null
  keterangan: string | null
  created_at: string
  updated_at: string
  // relations
  penduduk?: any
  dusun?: any
}

export interface StuntingIntervention {
  id: string
  stunting_record_id: string
  title: string
  target: number
  coverage: number
  status: 'aktif' | 'selesai' | 'direncanakan'
  keterangan: string | null
  created_at: string
  updated_at: string
}

export interface StuntingRecordDetail extends StuntingRecord {
  children: StuntingChild[]
  interventions: StuntingIntervention[]
}

// -----------------------------------------------------------------------------
// Admin API
// -----------------------------------------------------------------------------

export const getStuntingRecords = async (): Promise<StuntingRecord[]> => {
  const { data } = await api.get('/stunting')
  return data
}

export const getStuntingRecord = async (id: string): Promise<StuntingRecordDetail> => {
  const { data } = await api.get(`/stunting/${id}`)
  return data
}

export const createStuntingRecord = async (
  payload: Partial<StuntingRecord>
): Promise<StuntingRecord> => {
  const { data } = await api.post('/stunting', payload)
  return data
}

export const updateStuntingRecord = async (
  id: string,
  payload: Partial<StuntingRecord>
): Promise<StuntingRecord> => {
  const { data } = await api.put(`/stunting/${id}`, payload)
  return data
}

export const deleteStuntingRecord = async (id: string): Promise<void> => {
  await api.delete(`/stunting/${id}`)
}

// Children
export const createStuntingChild = async (
  recordId: string,
  payload: Partial<StuntingChild>
): Promise<StuntingChild> => {
  const { data } = await api.post(`/stunting/${recordId}/children`, payload)
  return data
}

export const updateStuntingChild = async (
  recordId: string,
  childId: string,
  payload: Partial<StuntingChild>
): Promise<StuntingChild> => {
  const { data } = await api.put(`/stunting/${recordId}/children/${childId}`, payload)
  return data
}

export const deleteStuntingChild = async (
  recordId: string,
  childId: string
): Promise<void> => {
  await api.delete(`/stunting/${recordId}/children/${childId}`)
}

// Interventions
export const createStuntingIntervention = async (
  recordId: string,
  payload: Partial<StuntingIntervention>
): Promise<StuntingIntervention> => {
  const { data } = await api.post(`/stunting/${recordId}/interventions`, payload)
  return data
}

export const updateStuntingIntervention = async (
  recordId: string,
  interventionId: string,
  payload: Partial<StuntingIntervention>
): Promise<StuntingIntervention> => {
  const { data } = await api.put(`/stunting/${recordId}/interventions/${interventionId}`, payload)
  return data
}

export const deleteStuntingIntervention = async (
  recordId: string,
  interventionId: string
): Promise<void> => {
  await api.delete(`/stunting/${recordId}/interventions/${interventionId}`)
}

// -----------------------------------------------------------------------------
// Public API
// -----------------------------------------------------------------------------

import { StuntingSectionContent } from '@/features/infografis/types/infografis'

export const getPublicStuntingData = async (): Promise<StuntingSectionContent> => {
  const { data } = await api.get('/public/stunting')
  return data
}
