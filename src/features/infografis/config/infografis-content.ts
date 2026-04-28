import type {
  InfografisTab,
  HeroContent,
  PendudukSectionContent,
  ApbdesSectionContent,
  BansosSectionContent,
  StuntingSectionContent,
  IdmSectionContent,
  SdgsSectionContent,
  InfografisKey,
} from '../types/infografis'

// ============================================================================
// TAB DEFINITIONS
// ============================================================================

export const infografisTabs: InfografisTab[] = [
  { key: 'penduduk', label: 'Penduduk' },
  { key: 'apbdes', label: 'APBDes' },
  { key: 'stunting', label: 'Stunting' },
  { key: 'bansos', label: 'Bansos' },
  { key: 'idm', label: 'IDM' },
  { key: 'sdgs', label: 'SDGs' },
]

// ============================================================================
// HERO CONTENT BY FEATURE
// ============================================================================

export const heroContentByFeature: Record<InfografisKey, HeroContent> = {
  penduduk: {
    eyebrow: 'Data Kependudukan',
    titleLines: ['Membangun Desa,', 'Penduduk Lebih', 'Tertata'],
    description:
      'Ringkasan data kependudukan yang rapi dan mudah dibaca untuk mendukung layanan publik, analisis usia, dan perencanaan pembangunan.',
    stats: [
      { label: 'Penduduk', value: '3.542' },
      { label: 'Kepala Keluarga', value: '1.087' },
      { label: 'Dusun', value: '4' },
    ],
    quoteName: 'Kepala Desa',
    quoteRole: 'Majang Dudi Budiana',
    quoteText:
      'Data penduduk yang akurat adalah fondasi perencanaan pembangunan yang tepat.',
  },
  apbdes: {
    eyebrow: 'Keuangan Desa',
    titleLines: ['Anggaran Desa,', 'Transparan &', 'Akuntabel'],
    description:
      'Penyajian APBDes secara detail untuk memastikan pengelolaan anggaran desa yang transparan dan sesuai dengan regulasi yang berlaku.',
    stats: [
      { label: 'Pendapatan', value: '3,54 M' },
      { label: 'Belanja', value: '3,10 M' },
      { label: 'SiLPA', value: '440 Jt' },
    ],
    quoteName: 'Bendahara Desa',
    quoteRole: 'Petugas Keuangan',
    quoteText:
      'Transparansi keuangan adalah komitmen kami kepada masyarakat desa.',
  },
  stunting: {
    eyebrow: 'WEBSITE RESMI PEMERINTAH DESA',
    titleLines: ['data stunting', 'desa pameutingan', ''],
    description:
      'Statistik Stunting Desa Pameutingan merupakan data jumlah dan persentase balita yang mengalami stunting sebagai gambaran kondisi gizi dan pertumbuhan anak.',
    stats: [
      { label: 'Balita', value: '3.542' },
      { label: 'Stunting', value: '3.542' },
      { label: 'Prevalensi', value: '3.542' },
    ],
    quoteName: 'Petugas Kesehatan',
    quoteRole: 'Puskesmas Desa',
    quoteText:
      'Anak yang sehat adalah investasi masa depan desa yang lebih baik.',
  },
  bansos: {
    eyebrow: 'Website Resmi Pemerintah Desa',
    titleLines: ['Data Bansos', 'Desa Pameutingan', ''],
    description:
      'Ringkasan Bantuan Sosial Desa Pameutingan merupakan data jumlah dan jenis bantuan sosial yang diterima masyarakat sebagai gambaran kondisi kesejahteraan warga serta dasar perencanaan dan penyaluran bantuan di desa.',
    stats: [
      { label: 'Penerima', value: '3.542' },
      { label: 'Kepala Keluarga', value: '1.087' },
      { label: 'Dusun', value: '4' },
    ],
    quoteName: 'Koordinator Bansos',
    quoteRole: 'Aparatur Desa',
    quoteText:
      'Setiap program bansos harus menyentuh mereka yang paling membutuhkan.',
  },
  idm: {
    eyebrow: 'Indeks Pembangunan',
    titleLines: ['Ukur Kemajuan,', 'Rencanakan', 'Masa Depan'],
    description:
      'Indeks Desa Membangun sebagai alat evaluasi komprehensif untuk mengetahui status pembangunan desa dan area yang perlu ditingkatkan.',
    stats: [
      { label: 'Status', value: 'Maju' },
      { label: 'Skor', value: '0,792' },
      { label: 'Fokus', value: 'Layanan' },
    ],
    quoteName: 'Kepala Desa',
    quoteRole: 'Majang Dudi Budiana',
    quoteText:
      'Dengan data IDM, kita tahu kemana desa harus berkembang ke depannya.',
  },
  sdgs: {
    eyebrow: 'Pembangunan Berkelanjutan',
    titleLines: ['SDGs Desa,', 'Komitmen untuk', 'Masa Depan'],
    description:
      'Pelacakan pencapaian SDGs di level desa untuk mendukung agenda pembangunan berkelanjutan dan meningkatkan kualitas hidup masyarakat.',
    stats: [
      { label: 'Indikator', value: '17' },
      { label: 'Prioritas', value: '6' },
      { label: 'Progress', value: '72%' },
    ],
    quoteName: 'Tim SDGs',
    quoteRole: 'Pendamping Desa',
    quoteText:
      'Pembangunan berkelanjutan adalah tanggung jawab bersama kita semua.',
  },
}

// ============================================================================
// PENDUDUK SECTION DATA
// ============================================================================

export const pendudukContent: PendudukSectionContent = {
  title: 'Demografi Penduduk',
  description:
    'Data demografi desa yang lengkap dan akurat untuk mendukung perencanaan pembangunan yang tepat sasaran.',
  cards: [
    {
      label: 'Total\nPenduduk',
      value: '3.542',
      unit: 'jiwa',
      icon: 'Users',
    },
    {
      label: 'Total\nDusun',
      value: '4',
      unit: 'dusun',
      icon: 'House',
    },
    {
      label: 'Total\nKepala Keluarga',
      value: '1.087',
      unit: 'kk',
      icon: 'Building2',
    },
    {
      label: 'Total\nWilayah RT/RW',
      value: '12/5',
      unit: 'wilayah',
      icon: 'MapPinned',
    },
  ],
}

// ============================================================================
// APBDES SECTION DATA
// ============================================================================

export const apbdesContent: ApbdesSectionContent = {
  title: 'APBDes Tahun 2026',
  description:
    'Rincian Anggaran Pendapatan dan Belanja Desa untuk periode tahun anggaran 2026.',
  statistics: [
    { label: 'Pendapatan', value: '3,54 M' },
    { label: 'Belanja', value: '3,10 M' },
    { label: 'SiLPA', value: '440 Jt' },
  ],
}

// ============================================================================
// BANSOS SECTION DATA
// ============================================================================

export const bansosContent: BansosSectionContent = {
  title: 'Bantuan Sosial',
  description: 'Ringkasan Bantuan Sosial Desa Pameutingan merupakan data jumlah and jenis bantuan sosial yang diterima masyarakat sebagai gambaran kondisi kesejahteraan warga serta dasar perencanaan and penyaluran bantuan di desa.',
  indicators: [
    {
      label: 'Total Penerima Bansos',
      value: '10',
      description: 'Jumlah keseluruhan masyarakat yang menerima bantuan sosial di desa.',
      color: 'bg-neutral-900',
    },
    {
      label: 'Jenis Bantuan',
      value: '10',
      description: 'Total program bantuan sosial yang dijalankan di desa.',
      color: 'bg-emerald-800',
    },
    {
      label: 'Total Anggaran Tahunan',
      value: '10',
      description: 'Jumlah dana dialokasikan untuk program bantuan sosial selama satu tahun.',
      color: 'bg-emerald-600',
    },
    {
      label: 'Jumlah Program Bantuan',
      value: '10',
      description: 'Jumlah keseluruhan masyarakat yang menerima bantuan sosial di desa.',
      color: 'bg-yellow-500',
    },
  ],
  summaries: [
    {
      label: 'Penerima Aktif',
      value: '3.542',
      unit: 'Orang',
      description: 'Jumlah warga yang masih terdaftar sebagai penerima bantuan sosial.',
      color: 'from-emerald-950 via-emerald-600 to-emerald-950',
    },
    {
      label: 'Penerima Baru',
      value: '3.542',
      unit: 'Orang',
      description: 'Jumlah warga yang baru terdaftar sebagai penerima bantuan.',
      color: 'bg-[#0B281F]',
    },
    {
      label: 'Alokasi Bantuan',
      value: '3.542',
      unit: 'RP.',
      description: 'Jumlah anggaran bantuan yang dialokasikan untuk masyarakat.',
      color: 'bg-[#0B281F]',
    },
    {
      label: 'Bantuan Tersalurkan',
      value: '3.542',
      unit: 'RP.',
      description: 'Jumlah bantuan yang telah disalurkan kepada penerima.',
      color: 'from-emerald-950 via-emerald-600 to-emerald-950',
    },
    {
      label: 'Sisa Alokasi Bantuan',
      value: '3.542',
      unit: 'RP.',
      description: 'Sisa anggaran bantuan yang belum disalurkan.',
      color: 'bg-[#0B281F]',
    },
    {
      label: 'Total Penerima',
      value: '3.542',
      unit: 'RP.',
      description: 'Jumlah keseluruhan warga yang menerima bantuan sosial.',
      color: 'bg-[#0B281F]',
    },
  ],
  distributions: [
    { dusun: 'Darmacaang', keluarga: 3542, alokasi: 'Menampilkan jumlah penerima bantuan sosial yang berada di Dusun Darmacaang' },
    { dusun: 'Mekarsari', keluarga: 3542, alokasi: 'Menampilkan jumlah penerima bantuan sosial yang berada di Dusun Mekarsari' },
    { dusun: 'Cibiru', keluarga: 3542, alokasi: 'Menampilkan jumlah penerima bantuan sosial yang berada di Dusun Cibiru' },
    { dusun: 'Sukamaju', keluarga: 3542, alokasi: 'Menampilkan jumlah penerima bantuan sosial yang berada di Dusun Sukamaju' },
    { dusun: 'Dago', keluarga: 3542, alokasi: 'Menampilkan jumlah penerima bantuan sosial yang berada di Dusun Dago' },
  ],
  benefitTypes: [
    { name: 'PKH', count: '3.542', color: 'bg-[#D9D9D9]' },
    { name: 'BPMT', count: '3.542', color: 'bg-[#F0B100]' },
    { name: 'BLT', count: '3.542', color: 'bg-[#D9D9D9]' },
    { name: 'Sembako', count: '3.542', color: 'bg-[#2D7A65]' },
    { name: 'Beasiswa', count: '3.542', color: 'bg-[#D9D9D9]' },
    { name: 'Rutilahu', count: '3.542', color: 'bg-[#00945E]' },
  ],
}

// ============================================================================
// STUNTING SECTION DATA
// ============================================================================

export const stuntingContent: StuntingSectionContent = {
  title: 'Statistik Stunting',
  description:
    'Statistik Stunting Desa Pameutingan merupakan data jumlah dan persentase balita yang mengalami stunting sebagai gambaran kondisi gizi dan pertumbuhan anak, yang menjadi dasar perencanaan program kesehatan dan pencegahan stunting di desa.',
  indicators: [
    {
      label: 'Total Anak',
      value: '3.542',
      description: 'Jumlah keseluruhan anak yang menjadi sasaran pendataan di desa.',
      icon: 'User',
      color: 'bg-linear-to-br from-[#0B281F] to-[#006045]',
    },
    {
      label: 'Anak Stunting',
      value: '3.542',
      description: 'Jumlah anak yang terdata mengalami stunting di desa.',
      icon: 'TrendingDown',
      color: 'bg-linear-to-br from-[#0B281F] to-[#008F5D]',
    },
    {
      label: 'Prevalensi',
      value: '3.542',
      description: 'Anak stunting dibandingkan dengan total anak yang didata.',
      icon: 'Activity',
      color: 'bg-linear-to-br from-[#008F5D] to-[#00C48C]',
    },
    {
      label: 'Target',
      value: '3.542',
      description: 'Target penurunan angka stunting dalam periode tertentu.',
      icon: 'Target',
      color: 'bg-[#F0B100]',
    },
  ],
  prevalenceByAge: [
    {
      ageGroup: '0-6 bulan',
      count: '3.542',
      targetPercentage: '14,0%',
      description: 'Kelompok usia bayi sejak lahir hingga 6 bulan.',
    },
    {
      ageGroup: '6-12 bulan',
      count: '3.542',
      targetPercentage: '14,0%',
      description: 'Kelompok usia bayi 6 bulan hingga 12 bulan.',
    },
    {
      ageGroup: '1-2 tahun',
      count: '3.542',
      targetPercentage: '14,0%',
      description: 'Kelompok usia bayi 1 tahun hingga 2 tahun.',
    },
    {
      ageGroup: '2-3 tahun',
      count: '3.542',
      targetPercentage: '14,0%',
      description: 'Kelompok usia bayi 2 tahun hingga 3 tahun.',
    },
    {
      ageGroup: '3-5 tahun',
      count: '3.542',
      targetPercentage: '14,0%',
      description: 'Kelompok usia bayi 3 tahun hingga 5 tahun.',
    },
  ],
  trendData: [
    { year: '2018', prevalence: 65 },
    { year: '2019', prevalence: 45 },
    { year: '2020', prevalence: 92 },
    { year: '2021', prevalence: 88 },
    { year: '2022', prevalence: 67 },
    { year: '2023', prevalence: 90 },
    { year: '2024', prevalence: 82 },
    { year: '2025', prevalence: 50 },
    { year: '2026', prevalence: 98 },
    { year: '2027', prevalence: 63 },
  ],
  programs: [
    {
      name: 'Posyandu Rutin Bulanan',
      coverage: 36,
      description: 'Pelayanan kesehatan ibu dan anak setiap bulan.',
      target: '275/227 sasaran',
    },
    {
      name: 'Tablet Tambah Darah',
      coverage: 66,
      description: 'Suplemen zat besi untuk mencegah dan mengatasi anemia.',
      target: '75/53 sasaran',
    },
    {
      name: 'Penyuluhan Gizi Keluarga',
      coverage: 26,
      description: 'Kegiatan edukasi tentang pemenuhan gizi seimbang bagi keluarga.',
      target: '147/118 sasaran',
    },
  ],
}

// ============================================================================
// IDM SECTION DATA
// ============================================================================

export const idmContent: IdmSectionContent = {
  title: 'Indeks Desa Membangun',
  description:
    'Ringkasan status perkembangan desa berdasarkan skor IDM, kategori kemajuan, dan ruang perbaikan utama yang perlu ditindaklanjuti.',
  indicators: [
    { label: 'Status Desa', value: 'Maju' },
    { label: 'Skor IDM', value: '0,792' },
    { label: 'Ruang Perbaikan', value: 'Layanan' },
  ],
}

// ============================================================================
// SDGS SECTION DATA
// ============================================================================

export const sdgsContent: SdgsSectionContent = {
  title: 'SDGs Desa',
  description:
    'Menampilkan progres indikator pembangunan berkelanjutan yang dipantau desa dalam satu panel ringkas dan mudah dibaca.',
  indicators: [
    { label: 'Indikator Dipantau', value: '17' },
    { label: 'Target Prioritas', value: '6' },
    { label: 'Progress', value: '72%' },
  ],
}
