import api from "../api";
import { ApiResponse, PaginatedResponse } from "@/types";

export interface PerangkatDesa {
  id: string;
  nama: string;
  jabatan: string;
  image: string;
  urutan: number;
}

export async function getPerangkatDesaList(params?: { search?: string; page?: number }): Promise<PaginatedResponse<PerangkatDesa>> {
  const response = await api.get<ApiResponse<PaginatedResponse<PerangkatDesa>>>("perangkat-desa", { params });
  return response.data.data;
}

export async function getPerangkatDesaDetail(id: string): Promise<PerangkatDesa> {
  const response = await api.get<ApiResponse<PerangkatDesa>>(`perangkat-desa/${id}`);
  return response.data.data;
}

export async function createPerangkatDesa(data: FormData): Promise<PerangkatDesa> {
  const response = await api.post<ApiResponse<PerangkatDesa>>("perangkat-desa", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data;
}

export async function updatePerangkatDesa(id: string, data: FormData): Promise<PerangkatDesa> {
  data.append("_method", "PUT");
  const response = await api.post<ApiResponse<PerangkatDesa>>(`perangkat-desa/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data;
}

export async function deletePerangkatDesa(id: string): Promise<void> {
  await api.delete(`perangkat-desa/${id}`);
}
