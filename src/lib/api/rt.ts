import api from "../api";
import { ApiResponse, PaginatedResponse } from "@/types";

export interface Rt {
  id: string;
  rw_id: string;
  nama: string;
  ketua_rt?: string | null;
  rw?: {
    id: string;
    nama: string;
    dusun_id: string;
    dusun?: {
      id: string;
      nama: string;
    };
  };
  jml_penduduk?: number;
  laki_laki?: number;
  perempuan?: number;
  created_at?: string;
  updated_at?: string;
}

export async function getRtList(params?: { search?: string; page?: number; rw_id?: string; per_page?: number }): Promise<PaginatedResponse<Rt>> {
  const response = await api.get<ApiResponse<PaginatedResponse<Rt>>>("rt", { params });
  return response.data.data;
}

export async function getRtDetail(id: string): Promise<Rt> {
  const response = await api.get<ApiResponse<Rt>>(`rt/${id}`);
  return response.data.data;
}

export async function createRt(data: Partial<Rt>): Promise<Rt> {
  const response = await api.post<ApiResponse<Rt>>("rt", data);
  return response.data.data;
}

export async function updateRt(id: string, data: Partial<Rt>): Promise<Rt> {
  const response = await api.put<ApiResponse<Rt>>(`rt/${id}`, data);
  return response.data.data;
}

export async function deleteRt(id: string): Promise<void> {
  await api.delete(`rt/${id}`);
}
