export type InfografisKey =
  | "penduduk"
  | "apbdes"
  | "stunting"
  | "bansos"
  | "idm"
  | "sdgs";

export type InfografisTab = {
  key: InfografisKey;
  label: string;
};

export type HeroContent = {
  eyebrow: string;
  titleLines: [string, string, string];
  description: string;
  stats: Array<{
    label: string;
    value: string;
  }>;
  quoteName: string;
  quoteRole: string;
  quoteText: string;
};

export const infografisTabs: InfografisTab[] = [
  {
    key: "penduduk",
    label: "Penduduk",
  },
  {
    key: "apbdes",
    label: "APBDes",
  },
  {
    key: "stunting",
    label: "Stunting",
  },
  {
    key: "bansos",
    label: "Bansos",
  },
  {
    key: "idm",
    label: "IDM",
  },
  {
    key: "sdgs",
    label: "SDGs",
  },
];

export const heroContentByFeature: Record<InfografisKey, HeroContent> = {
  penduduk: {
    eyebrow: "Data Kependudukan",
    titleLines: ["Membangun Desa,", "Penduduk Lebih", "Tertata"],
    description:
      "Ringkasan data kependudukan yang rapi dan mudah dibaca untuk mendukung layanan publik, analisis usia, dan perencanaan pembangunan.",
    stats: [
      { label: "Total Penduduk", value: "3.542" },
      { label: "Kepala Keluarga", value: "1.087" },
      { label: "Usia Produktif", value: "68%" },
    ],
    quoteName: "Bapak Sutrisno",
    quoteRole: "Ringkasan Penduduk",
    quoteText:
      "Data yang tertata membantu pelayanan menjadi cepat, akurat, dan mudah dipahami.",
  },
  apbdes: {
    eyebrow: "Transparansi Anggaran",
    titleLines: ["Anggaran Desa", "Lebih Transparan", "Untuk Masyarakat"],
    description:
      "Cuplikan APBDes yang menampilkan arah anggaran desa secara ringkas agar mudah dipantau sebelum masuk ke rincian lengkap.",
    stats: [
      { label: "Pendapatan", value: "3,54 M" },
      { label: "Belanja", value: "3,10 M" },
      { label: "SiLPA", value: "440 Jt" },
    ],
    quoteName: "Tim Keuangan Desa",
    quoteRole: "APBDes 2026",
    quoteText:
      "Ringkasan anggaran yang jelas memudahkan warga memahami arah penggunaan dana desa.",
  },
  stunting: {
    eyebrow: "Pemantauan Kesehatan",
    titleLines: ["Kesehatan Anak,", "Pantau Stunting", "Lebih Cepat"],
    description:
      "Panel ini menonjolkan kondisi tumbuh kembang anak agar program intervensi gizi bisa dilihat dan ditindaklanjuti dengan cepat.",
    stats: [
      { label: "Balita Terpantau", value: "124" },
      { label: "Risiko Stunting", value: "18" },
      { label: "Intervensi Aktif", value: "96%" },
    ],
    quoteName: "Kader Posyandu",
    quoteRole: "Stunting",
    quoteText:
      "Data yang mudah dipantau membantu tindakan gizi lebih tepat sasaran.",
  },
  bansos: {
    eyebrow: "Bantuan Sosial",
    titleLines: ["Bantuan Sosial", "Lebih Tepat Sasaran", "Untuk Masyarakat"],
    description:
      "Ringkasan penerima, status penyaluran, dan validasi data agar distribusi bantuan lebih transparan.",
    stats: [
      { label: "Keluarga Penerima", value: "423" },
      { label: "Tersalurkan", value: "91%" },
      { label: "Validasi Data", value: "Aktif" },
    ],
    quoteName: "Petugas Data",
    quoteRole: "Bansos",
    quoteText:
      "Panel ini siap dipakai untuk memantau penyaluran dan memperbarui data penerima.",
  },
  idm: {
    eyebrow: "Indeks Desa Membangun",
    titleLines: ["Desa Maju,", "Indeks Meningkat", "Terukur Jelas"],
    description:
      "Ringkasan status perkembangan desa berdasarkan skor IDM, kategori kemajuan, dan ruang perbaikan utama.",
    stats: [
      { label: "Status Desa", value: "Maju" },
      { label: "Skor IDM", value: "0,792" },
      { label: "Ruang Perbaikan", value: "Layanan" },
    ],
    quoteName: "Perangkat Desa",
    quoteRole: "IDM",
    quoteText:
      "Skor yang jelas memudahkan desa menentukan prioritas pembangunan berikutnya.",
  },
  sdgs: {
    eyebrow: "Pembangunan Berkelanjutan",
    titleLines: ["SDGs Desa", "Target Lebih Terarah", "Pencapaian Jelas"],
    description:
      "Menampilkan progres indikator pembangunan berkelanjutan yang dipantau desa dalam satu panel ringkas.",
    stats: [
      { label: "Indikator Dipantau", value: "17" },
      { label: "Target Prioritas", value: "6" },
      { label: "Progress", value: "72%" },
    ],
    quoteName: "Tim Perencana",
    quoteRole: "SDGs",
    quoteText:
      "Ringkasan progres mempermudah evaluasi dan penentuan langkah lanjutan.",
  },
};
