import api from "../api";
import { ApiResponse, PaginatedResponse } from "@/types";

export interface WilayahAdministratif {
  id: string;
  arah: string;
  detail: string;
  layer_class: string;
}

export async function getWilayahList(params?: { search?: string; page?: number }): Promise<PaginatedResponse<WilayahAdministratif>> {
  const response = await api.get<ApiResponse<PaginatedResponse<WilayahAdministratif>>>("wilayah-administratif", { params });
  return response.data.data;
}

export async function createWilayah(data: Partial<WilayahAdministratif>): Promise<WilayahAdministratif> {
  const response = await api.post<ApiResponse<WilayahAdministratif>>("wilayah-administratif", data);
  return response.data.data;
}

export async function updateWilayah(id: string, data: Partial<WilayahAdministratif>): Promise<WilayahAdministratif> {
  const response = await api.put<ApiResponse<WilayahAdministratif>>(`wilayah-administratif/${id}`, data);
  return response.data.data;
}

export async function deleteWilayah(id: string): Promise<void> {
  await api.delete(`wilayah-administratif/${id}`);
}
