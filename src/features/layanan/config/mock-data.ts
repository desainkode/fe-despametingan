import { ServiceItem } from "../types";

export const mockServices: ServiceItem[] = [
  // PELAYANAN
  {
    id: "1",
    slug: "surat-pindah-datang",
    name: "Surat Pindah / Datang",
    description: "Layanan pengurusan administrasi kepindahan penduduk keluar atau masuk ke wilayah Desa Pameutingan.",
    requirements: ["Fotokopi KK", "KTP Asli", "Surat Pengantar RT/RW", "Alamat Tujuan Lengkap"],
    procedures: ["Login", "Isi formulir", "Upload berkas", "Verifikasi admin", "Penerbitan surat"],
    processingTime: "2-3 Hari Kerja",
    cost: "Gratis",
    icon: "Home",
    category: "Pelayanan"
  },
  {
    id: "2",
    slug: "akta-kematian-kelahiran",
    name: "Akta Kematian / Kelahiran",
    description: "Pelaporan peristiwa kelahiran atau kematian untuk penerbitan kutipan akta resmi.",
    requirements: ["Surat RS/Bidan", "KTP Orang Tua/Almarhum", "Kartu Keluarga", "KTP Saksi"],
    procedures: ["Isi data kejadian", "Upload dokumen", "Verifikasi", "Pengambilan surat keterangan desa"],
    processingTime: "1-2 Hari Kerja",
    cost: "Gratis",
    icon: "Baby",
    category: "Pelayanan"
  },
  {
    id: "3",
    slug: "layanan-kartu-keluarga",
    name: "Layanan Kartu Keluarga",
    description: "Pengurusan perubahan data KK, penambahan anggota keluarga, atau pembuatan KK baru.",
    requirements: ["KK Lama (Asli)", "Buku Nikah/Akta Cerai", "Surat Keterangan Lahir", "Surat Pindah"],
    procedures: ["Pengajuan perubahan", "Verifikasi berkas", "Penerbitan pengantar", "Sinkronisasi Disdukcapil"],
    processingTime: "3-5 Hari Kerja",
    cost: "Gratis",
    icon: "Users",
    category: "Pelayanan"
  },
  {
    id: "4",
    slug: "layanan-ktp-el",
    name: "Layanan KTP-el",
    description: "Perekaman baru, ganti rusak/hilang, atau perubahan data pada Kartu Tanda Penduduk Elektronik.",
    requirements: ["Fotokopi KK", "KTP Lama (jika rusak)", "Surat Kehilangan (jika hilang)", "Ijazah"],
    procedures: ["Isi form pengajuan", "Pengecekan NIK", "Pemberian pengantar perekaman/cetak"],
    processingTime: "1-2 Hari Kerja",
    cost: "Gratis",
    icon: "IdCard",
    category: "Pelayanan"
  },
  {
    id: "5",
    slug: "kia",
    name: "Kartu Identitas Anak (KIA)",
    description: "Identitas resmi anak yang berumur kurang dari 17 tahun dan belum menikah.",
    requirements: ["Fotokopi Akta Kelahiran", "Fotokopi KK Orang Tua", "Pas Foto 2x3 (untuk usia >5 thn)"],
    procedures: ["Pengajuan data anak", "Upload berkas", "Verifikasi", "Penerbitan KIA"],
    processingTime: "2-4 Hari Kerja",
    cost: "Gratis",
    icon: "ShieldCheck",
    category: "Pelayanan"
  },
  {
    id: "6",
    slug: "disampo-sansil",
    name: "Rekomendasi Dispensasi Nikah (Disampo Sansil)",
    description: "Layanan rekomendasi pernikahan untuk warga yang akan melangsungkan pernikahan di luar wilayah atau kondisi khusus.",
    requirements: ["KTP Calon Pengantin", "Fotokopi KK", "Izin Orang Tua", "Surat Pengantar RT/RW"],
    procedures: ["Isi form pernikahan", "Verifikasi dokumen", "Sidang verifikasi desa", "Penerbitan rekomendasi"],
    processingTime: "2-3 Hari Kerja",
    cost: "Gratis",
    icon: "Heart",
    category: "Pelayanan"
  },

  // PENGADUAN
  {
    id: "7",
    slug: "pengaduan-pelayanan",
    name: "Pengaduan Pelayanan",
    description: "Sampaikan keluhan atau masukan terkait kualitas pelayanan publik di lingkungan Desa Pameutingan.",
    requirements: ["Identitas Pelapor", "Detail Kronologi", "Bukti Pendukung (jika ada)"],
    procedures: ["Tulis laporan", "Kirim bukti", "Tindak lanjut admin", "Pemberian solusi"],
    processingTime: "3-7 Hari Kerja",
    cost: "Gratis",
    icon: "MessageCircle",
    category: "Pengajuan"
  },
  {
    id: "8",
    slug: "pengaduan-data-kependudukan",
    name: "Pengaduan Data Kependudukan",
    description: "Melaporkan ketidaksesuaian data NIK, alamat, atau status kependudukan lainnya.",
    requirements: ["KTP/KK yang bermasalah", "Dokumen pendukung data benar", "Identitas pelapor"],
    procedures: ["Pilih jenis data salah", "Upload bukti benar", "Verifikasi & Update sistem"],
    processingTime: "2-5 Hari Kerja",
    cost: "Gratis",
    icon: "FileSearch",
    category: "Pengajuan"
  }
];
