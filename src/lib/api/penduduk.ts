import api from "../api";
import { ApiResponse } from "@/types";

export interface Penduduk {
  id: string;
  nik: string;
  nama: string;
  jenis_kelamin: string;
  tanggal_lahir: string;
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

export async function getPendudukList(params?: { search?: string; page?: number }): Promise<PaginatedResponse<Penduduk>> {
  const response = await api.get<ApiResponse<PaginatedResponse<Penduduk>>>("penduduk", { params });
  return response.data.data;
}

export async function getPendudukDetail(id: string): Promise<Penduduk> {
  const response = await api.get<ApiResponse<Penduduk>>(`penduduk/${id}`);
  return response.data.data;
}
