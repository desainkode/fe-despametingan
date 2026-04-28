export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  requirements: string[];
  procedures: string[];
  processingTime: string;
  cost: string;
  icon: string;
  category: "Pelayanan" | "Pengajuan";
}

export interface Submission {
  id: string;
  serviceName: string;
  applicantName: string;
  nik: string;
  date: string;
  status: "Diproses" | "Disetujui" | "Ditolak";
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  nik: string;
  email: string;
}
