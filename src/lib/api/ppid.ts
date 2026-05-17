import api from "../api";
import { ApiResponse, PaginatedResponse } from "@/types";

export interface PPID {
  id: string;
  title: string;
  category: 'Serta Merta' | 'Berkala' | 'Setiap Saat';
  file_path: string;
  description: string;
  created_at: string;
}

export async function getPPIDList(params?: { search?: string; page?: number; category?: string }): Promise<PaginatedResponse<PPID>> {
  const response = await api.get<ApiResponse<PaginatedResponse<PPID>>>("ppid", { params });
  return response.data.data;
}

export async function getPPIDDetail(id: string): Promise<PPID> {
  const response = await api.get<ApiResponse<PPID>>(`ppid/${id}`);
  return response.data.data;
}

export async function createPPID(data: FormData): Promise<PPID> {
  const response = await api.post<ApiResponse<PPID>>("ppid", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data;
}

export async function updatePPID(id: string, data: FormData): Promise<PPID> {
  data.append("_method", "PUT");
  const response = await api.post<ApiResponse<PPID>>(`ppid/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data;
}

export async function deletePPID(id: string): Promise<void> {
  await api.delete(`ppid/${id}`);
}
