import api from "../api";
import { ApiResponse, PaginatedResponse } from "@/types";

export interface Dusun {
  id: string;
  nama: string;
  kepala_dusun: string;
  jml_penduduk: number;
  laki_laki: number;
  perempuan: number;
  keterangan: string;
  warna: string;
  koordinat_x: string;
  koordinat_y: string;
  popup_placement: string;
}

export async function getDusunList(params?: { search?: string; page?: number }): Promise<PaginatedResponse<Dusun>> {
  const response = await api.get<ApiResponse<PaginatedResponse<Dusun>>>("dusun", { params });
  return response.data.data;
}

export async function getDusunDetail(id: string): Promise<Dusun> {
  const response = await api.get<ApiResponse<Dusun>>(`dusun/${id}`);
  return response.data.data;
}

export async function createDusun(data: Partial<Dusun>): Promise<Dusun> {
  const response = await api.post<ApiResponse<Dusun>>("dusun", data);
  return response.data.data;
}

export async function updateDusun(id: string, data: Partial<Dusun>): Promise<Dusun> {
  const response = await api.put<ApiResponse<Dusun>>(`dusun/${id}`, data);
  return response.data.data;
}

export async function deleteDusun(id: string): Promise<void> {
  await api.delete(`dusun/${id}`);
}
