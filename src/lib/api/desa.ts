import api from "../api";
import { Desa, ApiResponse } from "@/types";

/**
 * Mengambil profil desa untuk publik (tanpa login).
 * @param kode Kode desa opsional untuk multi-tenant
 */
export async function getPublicDesaProfile(kode?: string): Promise<Desa> {
  const url = kode ? `public/desa?kode=${kode}` : "public/desa";
  const response = await api.get<ApiResponse<Desa>>(url);
  return response.data.data;
}

/**
 * Mengambil profil desa untuk admin (memerlukan login).
 */
export async function getDesaProfile(): Promise<Desa> {
  const response = await api.get<ApiResponse<Desa>>("desa/profile");
  return response.data.data;
}

/**
 * Memperbarui profil desa.
 * Menggunakan FormData karena mendukung upload file (logo/foto).
 */
export async function updateDesaProfile(data: FormData): Promise<Desa> {
  // Laravel mewajibkan POST untuk upload file, meskipun secara logic ini adalah update (PUT/PATCH)
  const response = await api.post<ApiResponse<Desa>>("desa/profile", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
}

/**
 * Mengambil list semua desa (ringkas) untuk dropdown.
 * Hanya bisa diakses superadmin.
 */
export async function getAllDesas(): Promise<Pick<Desa, "id" | "nama_desa">[]> {
  const response = await api.get<{ data: Pick<Desa, "id" | "nama_desa">[] }>("desas");
  return response.data.data;
}
