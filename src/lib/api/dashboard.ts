import api from "@/lib/api";
import type { ApiResponse, DashboardStats, Desa } from "@/types";

export async function getDashboardStats(): Promise<DashboardStats> {
  const res = await api.get<ApiResponse<DashboardStats>>("/api/dashboard");
  return res.data.data;
}

export async function getDesaProfile(): Promise<Desa> {
  const res = await api.get<ApiResponse<Desa>>("/api/desa/profile");
  return res.data.data;
}
