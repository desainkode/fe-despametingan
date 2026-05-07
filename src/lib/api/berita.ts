import api from "../api";
import { ApiResponse, PaginatedResponse } from "@/types";

export interface Berita {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  category: string;
  status: 'draft' | 'published';
  published_at: string;
  author: {
    id: string;
    name: string;
  };
  created_at: string;
}

export async function getBeritaList(params?: { search?: string; page?: number; category?: string; status?: string }): Promise<PaginatedResponse<Berita>> {
  const response = await api.get<ApiResponse<PaginatedResponse<Berita>>>("berita", { params });
  return response.data.data;
}

export async function getBeritaDetail(id: string): Promise<Berita> {
  const response = await api.get<ApiResponse<Berita>>(`berita/${id}`);
  return response.data.data;
}

export async function createBerita(data: FormData): Promise<Berita> {
  const response = await api.post<ApiResponse<Berita>>("berita", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data;
}

export async function updateBerita(id: string, data: FormData): Promise<Berita> {
  // Use POST with _method=PUT for multipart/form-data support in Laravel
  data.append("_method", "PUT");
  const response = await api.post<ApiResponse<Berita>>(`berita/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data;
}

export async function deleteBerita(id: string): Promise<void> {
  await api.delete(`berita/${id}`);
}
