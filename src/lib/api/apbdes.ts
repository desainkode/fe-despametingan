import api from '../api';

export interface ApbdesTahunAnggaran {
  id: number;
  tahun: number;
  status: 'draft' | 'ditetapkan' | 'perubahan' | 'selesai';
  keterangan: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface ApbdesRealisasi {
  id: number;
  apbdes_item_id: number;
  tanggal: string;
  jumlah: number | string;
  keterangan: string | null;
  foto_url: string | null;
  created_at: string;
}

export interface ApbdesItem {
  id: number;
  tahun_anggaran_id: number;
  parent_id: number | null;
  kode_rekening: string;
  uraian: string;
  anggaran: string | number;
  realisasi: string | number;
  urutan: number;
  is_header: boolean;
  foto_url?: string | null;
  keterangan_realisasi?: string | null;
  children_recursive?: ApbdesItem[];
  realisasis?: ApbdesRealisasi[];
}

export interface ApbdesPublicSummary {
  tahun: number;
  status: string;
  ringkasan: {
    pendapatan: ApbdesItem | null;
    belanja: ApbdesItem | null;
    pembiayaan: ApbdesItem | null;
  };
  rincian_pendapatan: ApbdesItem[];
  rincian_belanja: ApbdesItem[];
  dokumentasi: ApbdesItem[];
}

export const apbdesService = {
  // Tahun Anggaran
  getTahunAnggaran: async () => {
    const response = await api.get('/apbdes/tahun');
    return response.data as ApbdesTahunAnggaran[];
  },
  storeTahunAnggaran: async (data: Partial<ApbdesTahunAnggaran>) => {
    const response = await api.post('/apbdes/tahun', data);
    return response.data as ApbdesTahunAnggaran;
  },
  updateTahunAnggaran: async (id: number, data: Partial<ApbdesTahunAnggaran>) => {
    const response = await api.put(`/apbdes/tahun/${id}`, data);
    return response.data as ApbdesTahunAnggaran;
  },
  deleteTahunAnggaran: async (id: number) => {
    const response = await api.delete(`/apbdes/tahun/${id}`);
    return response.data;
  },

  // Items
  getItems: async (tahunId: number) => {
    const response = await api.get(`/apbdes/items/${tahunId}`);
    return response.data as ApbdesItem[];
  },
  storeItem: async (data: Partial<ApbdesItem>) => {
    const response = await api.post('/apbdes/items', data);
    return response.data as ApbdesItem;
  },
  updateItem: async (id: number, data: Partial<ApbdesItem> | FormData) => {
    let response;
    if (data instanceof FormData) {
      data.append('_method', 'PUT');
      response = await api.post(`/apbdes/items/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    } else {
      response = await api.put(`/apbdes/items/${id}`, data);
    }
    return response.data as ApbdesItem;
  },
  deleteItem: async (id: number) => {
    const response = await api.delete(`/apbdes/items/${id}`);
    return response.data;
  },
  
  // Realisasi History
  getRealisasiHistory: async (itemId: number) => {
    const response = await api.get(`/apbdes/items/${itemId}/realisasi`);
    return response.data as ApbdesRealisasi[];
  },
  addRealisasi: async (itemId: number, data: FormData) => {
    const response = await api.post(`/apbdes/items/${itemId}/realisasi`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data as ApbdesRealisasi;
  },
  deleteRealisasi: async (itemId: number, realisasiId: number) => {
    const response = await api.delete(`/apbdes/items/${itemId}/realisasi/${realisasiId}`);
    return response.data;
  },

  // Public
  getPublicSummary: async () => {
    const response = await api.get('/public/apbdes/summary');
    return response.data as ApbdesPublicSummary;
  }
};
