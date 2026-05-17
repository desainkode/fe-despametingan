import api from "../api";
import { ApiResponse, PaginatedResponse } from "@/types";

export interface Rw {
  id: string;
  dusun_id: string;
  nama: string;
  ketua_rw: string;
  dusun?: {
    id: string;
    nama: string;
  };
  jml_penduduk?: number;
  laki_laki?: number;
  perempuan?: number;
  created_at?: string;
  updated_at?: string;
}

export async function getRwList(params?: { search?: string; page?: number; dusun_id?: string; per_page?: number }): Promise<PaginatedResponse<Rw>> {
  const response = await api.get<ApiResponse<PaginatedResponse<Rw>>>("rw", { params });
  return response.data.data;
}

export async function getRwDetail(id: string): Promise<Rw> {
  const response = await api.get<ApiResponse<Rw>>(`rw/${id}`);
  return response.data.data;
}

export async function createRw(data: Partial<Rw>): Promise<Rw> {
  const response = await api.post<ApiResponse<Rw>>("rw", data);
  return response.data.data;
}

export async function updateRw(id: string, data: Partial<Rw>): Promise<Rw> {
  const response = await api.put<ApiResponse<Rw>>(`rw/${id}`, data);
  return response.data.data;
}

export async function deleteRw(id: string): Promise<void> {
  await api.delete(`rw/${id}`);
}
