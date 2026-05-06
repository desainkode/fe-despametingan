import api from "../api";
import { ApiResponse } from "@/types";
import { Penduduk, PaginatedResponse } from "./penduduk";

export interface KartuKeluarga {
  id: string;
  no_kk: string;
  alamat: string;
  rt: string;
  rw: string;
  anggota_keluarga?: Penduduk[];
}

export async function getKartuKeluargaList(params?: { search?: string; page?: number }): Promise<PaginatedResponse<KartuKeluarga>> {
  const response = await api.get<ApiResponse<PaginatedResponse<KartuKeluarga>>>("kartu-keluarga", { params });
  return response.data.data;
}

export async function getKartuKeluargaDetail(id: string): Promise<KartuKeluarga> {
  const response = await api.get<ApiResponse<KartuKeluarga>>(`kartu-keluarga/${id}`);
  return response.data.data;
}

export async function createKartuKeluarga(data: Partial<KartuKeluarga>): Promise<KartuKeluarga> {
  const response = await api.post<ApiResponse<KartuKeluarga>>("kartu-keluarga", data);
  return response.data.data;
}

export async function updateKartuKeluarga(id: string, data: Partial<KartuKeluarga>): Promise<KartuKeluarga> {
  const response = await api.put<ApiResponse<KartuKeluarga>>(`kartu-keluarga/${id}`, data);
  return response.data.data;
}

export async function deleteKartuKeluarga(id: string): Promise<void> {
  await api.delete(`kartu-keluarga/${id}`);
}
