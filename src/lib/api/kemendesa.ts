import api from "@/lib/api";

export async function getIdmData(tahun?: number, kode?: string) {
  const response = await api.get("/infografis/idm", {
    params: { tahun, kode },
  });
  return response.data;
}

export async function getSdgsData(kode?: string) {
  const response = await api.get("/infografis/sdgs", {
    params: { kode }
  });
  return response.data;
}

export async function updateKemendesaSettings(data: { kode_desa_idm: string; kode_desa_sdgs: string }) {
  const response = await api.post("/kemendesa/settings", data);
  return response.data;
}
