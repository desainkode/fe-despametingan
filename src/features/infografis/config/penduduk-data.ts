import { 
  Users, 
  House, 
  Building2, 
  MapPinned, 
  Mars, 
  Venus, 
  MoonStar, 
  Cross, 
  Church, 
  Flower2, 
  BookOpenText 
} from "lucide-react";
import React from "react";

export const KARTU_DEMOGRAFI = [
  {
    label: "Total\nPenduduk",
    angka: "3.542",
    bgColor: "#D9D9D9",
    textColor: "#070C10",
    labelColor: "#070C10",
    icon: Users,
  },
  {
    label: "Total\nDusun",
    angka: "4",
    bgColor: "#F0B100",
    textColor: "#FEFEFE",
    labelColor: "#FEFEFE",
    icon: House,
  },
  {
    label: "Total\nKepala Keluarga",
    angka: "1.087",
    bgColor: "#009966",
    textColor: "#FEFEFE",
    labelColor: "#FEFEFE",
    icon: Building2,
  },
  {
    label: "Total\nWilayah RT/RW",
    angka: "12/5",
    bgColor: "#006045",
    textColor: "#FEFEFE",
    labelColor: "#FEFEFE",
    icon: MapPinned,
  },
];

export const KARTU_JUMLAH_PENDUDUK = [
  {
    label: "Total Penduduk",
    angka: "3.542",
    tone: "light" as const,
    icon: Users,
  },
  {
    label: "Laki-laki",
    angka: "3.542",
    tone: "light" as const,
    icon: House,
  },
  {
    label: "Perempuan",
    angka: "3.542",
    tone: "dark" as const,
    icon: Building2,
  },
  {
    label: "Kepala Keluarga",
    angka: "3.542",
    tone: "light" as const,
    icon: House,
  },
  {
    label: "Mutasi Penduduk",
    angka: "3.542",
    tone: "light" as const,
    icon: MapPinned,
  },
  {
    label: "Penduduk Sementara",
    angka: "3.542",
    tone: "dark" as const,
    icon: Users,
  },
];

export const KELOMPOK_UMUR_LABELS = [
  "80-84", "70-74", "60-64", "50-54", "40-44", "30-34", "20-24", "10-14", "0-4"
];

export const DIAGRAM_KELOMPOK_UMUR = [
  {
    title: "Diagram Umur\nLaki - Laki",
    icon: Mars,
    bars: [100, 50, 83, 94, 67, 90, 97, 46, 64],
  },
  {
    title: "Diagram Umur\nPerempuan",
    icon: Venus,
    bars: [97, 48, 81, 91, 65, 87, 100, 45, 62],
  },
];

export const BERDASARKAN_DUSUN_CARDS = [
  {
    kode: "01",
    nama: "Dusun Pameutingan",
    deskripsi: "Sebaran umur warga untuk mendukung program desa.",
    persentase: 30,
  },
  {
    kode: "02",
    nama: "Dusun Citalem",
    deskripsi: "Jumlah warga berdasarkan usia untuk perencanaan dusun.",
    persentase: 18,
  },
  {
    kode: "03",
    nama: "Dusun Pencut",
    deskripsi: "Data usia warga untuk melihat kebutuhan masyarakat.",
    persentase: 24,
  },
  {
    kode: "04",
    nama: "Dusun Mekarjaya",
    deskripsi: "Kelompok usia warga sebagai dasar pembangunan dusun.",
    persentase: 28,
  },
];

export const DUSUN_CHART_DATA = [
  { dusun: "dusun1", label: "Dusun Pameutingan", value: 30, fill: "var(--color-dusun1)" },
  { dusun: "dusun2", label: "Dusun Citalem", value: 18, fill: "var(--color-dusun2)" },
  { dusun: "dusun4", label: "Dusun Mekarjaya", value: 28, fill: "var(--color-dusun4)" },
];

export const PENDIDIKAN_CHART_DATA = [
  { tingkat: "Tidak Sekolah", jumlah: 120 },
  { tingkat: "SD/MI", jumlah: 450 },
  { tingkat: "SMP/MTS", jumlah: 380 },
  { tingkat: "SMA/SMK/MA", jumlah: 520 },
  { tingkat: "D1", jumlah: 40 },
  { tingkat: "D2", jumlah: 35 },
  { tingkat: "D3", jumlah: 150 },
  { tingkat: "S1/D4", jumlah: 310 },
  { tingkat: "S2", jumlah: 45 },
  { tingkat: "S3", jumlah: 10 },
];

export const PEKERJAAN_TOP_CARDS = [
  {
    nama: "Belum Bekerja",
    jumlah: "3.542",
    rank: "TOP 1" as const,
    icon: Users,
  },
  {
    nama: "Petani",
    jumlah: "3.542",
    rank: "TOP 2" as const,
    icon: Users,
  },
  {
    nama: "Buruh",
    jumlah: "3.542",
    rank: "TOP 3" as const,
    icon: Users,
  },
];

export const PEKERJAAN_KIRI_BAHASAN = [
  { kode: "01", nama: "Tidak/Belum Bekerja", jumlah: "3.542", persentase: 88 },
  { kode: "02", nama: "Petani", jumlah: "3.542", persentase: 77 },
  { kode: "03", nama: "Buruh Tani", jumlah: "3.542", persentase: 89 },
  { kode: "04", nama: "Peternak", jumlah: "3.542", persentase: 85 },
  { kode: "05", nama: "Pedagang", jumlah: "3.542", persentase: 80 },
];

export const PEKERJAAN_KANAN_BAHASAN = [
  { kode: "01", nama: "Karyawan Swasta", jumlah: "3.542", persentase: 48 },
  { kode: "02", nama: "PNS", jumlah: "3.542", persentase: 40 },
  { kode: "03", nama: "TNI/Polri", jumlah: "3.542", persentase: 36 },
  { kode: "04", nama: "Guru/Dosen", jumlah: "3.542", persentase: 32 },
  { kode: "05", nama: "Tenaga Kesehatan", jumlah: "3.542", persentase: 24 },
];

export const STATUS_PERKAWINAN_IMAGE = "https://www.figma.com/api/mcp/asset/051b391e-0d2e-4961-9454-313757f454b0";

export const STATUS_PERKAWINAN_CARDS = [
  {
    title: "Data Sudah\nKawin",
    description: "Data sudah kawin merupakan jumlah keseluruhan penduduk yang tercatat berstatus kawin berdasarkan data administrasi kependudukan di wilayah desa.",
    jumlah: "3.542",
    icon: "kawin" as const,
  },
  {
    title: "Data Belum\nKawin",
    description: "Data belum kawin merupakan jumlah keseluruhan penduduk yang tercatat belum menikah berdasarkan data administrasi kependudukan di wilayah desa.",
    jumlah: "3.542",
    icon: "belum" as const,
  },
];

export const AGAMA_CARDS = [
  {
    nama: "Islam",
    deskripsi: "Penduduk beragama Islam adalah jumlah warga yang menganut agama Islam di suatu wilayah.",
    jumlah: "3.542",
    persentase: 89,
    tema: "yellow" as const,
    icon: MoonStar,
  },
  {
    nama: "Kristen",
    deskripsi: "Penduduk beragama Kristen adalah jumlah warga yang menganut agama Kristen di suatu wilayah.",
    jumlah: "3.542",
    persentase: 5,
    tema: "green" as const,
    icon: Cross,
  },
  {
    nama: "Katolik",
    deskripsi: "Penduduk beragama Katolik adalah jumlah warga yang menganut agama Katolik di suatu wilayah.",
    jumlah: "3.542",
    persentase: 2,
    tema: "yellow" as const,
    icon: Church,
  },
  {
    nama: "Hindu",
    deskripsi: "Penduduk beragama Hindu adalah jumlah warga yang menganut agama Hindu di suatu wilayah.",
    jumlah: "3.542",
    persentase: 2,
    tema: "green" as const,
    icon: Flower2,
  },
  {
    nama: "Konghucu",
    deskripsi: "Penduduk beragama Konghucu adalah jumlah warga yang menganut agama Konghucu di suatu wilayah.",
    jumlah: "3.542",
    persentase: 1,
    tema: "yellow" as const,
    icon: BookOpenText,
  },
  {
    nama: "Budha",
    deskripsi: "Penduduk beragama Budha adalah jumlah warga yang menganut agama Budha di suatu wilayah.",
    jumlah: "3.542",
    persentase: 1,
    tema: "green" as const,
    icon: Flower2,
  },
];
