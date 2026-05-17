import api from "../api";
import { ApiResponse, PaginatedResponse } from "@/types";

export interface Potensi {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  accent_color: string;
}

export async function getPotensiList(params?: { search?: string; page?: number }): Promise<PaginatedResponse<Potensi>> {
  const response = await api.get<ApiResponse<PaginatedResponse<Potensi>>>("potensi", { params });
  return response.data.data;
}

export async function getPotensiDetail(id: string): Promise<Potensi> {
  const response = await api.get<ApiResponse<Potensi>>(`potensi/${id}`);
  return response.data.data;
}

export async function createPotensi(data: FormData): Promise<Potensi> {
  const response = await api.post<ApiResponse<Potensi>>("potensi", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data;
}

export async function updatePotensi(id: string, data: FormData): Promise<Potensi> {
  data.append("_method", "PUT");
  const response = await api.post<ApiResponse<Potensi>>(`potensi/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data;
}

export async function deletePotensi(id: string): Promise<void> {
  await api.delete(`potensi/${id}`);
}
