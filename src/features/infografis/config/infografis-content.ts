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
    eyebrow: 'Kesehatan Anak',
    titleLines: ['Jaga Gizi,', 'Cegah', 'Stunting'],
    description:
      'Monitoring terpadu untuk pencegahan stunting melalui data balita terpantau, identifikasi risiko, dan intervensi gizi yang efektif.',
    stats: [
      { label: 'Balita', value: '124' },
      { label: 'Risiko', value: '18' },
      { label: 'Intervensi', value: '96%' },
    ],
    quoteName: 'Petugas Kesehatan',
    quoteRole: 'Puskesmas Desa',
    quoteText:
      'Anak yang sehat adalah investasi masa depan desa yang lebih baik.',
  },
  bansos: {
    eyebrow: 'Bantuan Sosial',
    titleLines: ['Layanan Sosial,', 'Tepat', 'Sasaran'],
    description:
      'Manajemen program bantuan sosial dengan sistem validasi data berbasis teknologi untuk memastikan bantuan tepat sasaran dan akuntabel.',
    stats: [
      { label: 'Penerima', value: '423' },
      { label: 'Tersalurkan', value: '91%' },
      { label: 'Validasi', value: 'Aktif' },
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
  description:
    'Ringkasan penerima, status penyaluran, dan validasi data agar distribusi bantuan lebih transparan dan tepat sasaran.',
  statuses: [
    { label: 'Keluarga Penerima', value: '423' },
    { label: 'Tersalurkan', value: '91%' },
    { label: 'Validasi Data', value: 'Aktif' },
  ],
}

// ============================================================================
// STUNTING SECTION DATA
// ============================================================================

export const stuntingContent: StuntingSectionContent = {
  title: 'Pemantauan Stunting',
  description:
    'Menyajikan data tumbuh kembang anak, risiko stunting, dan tindak lanjut intervensi gizi dalam format yang mudah dipantau.',
  indicators: [
    { label: 'Balita Terpantau', value: '124', description : 'Jumlah balita yang terdata dalam sistem pemantauan tumbuh kembang anak' },
    { label: 'Risiko Stunting', value: '18', description: 'Jumlah balita yang teridentifikasi memiliki risiko stunting berdasarkan data yang terkumpul' },
    { label: 'Intervensi Aktif', value: '96%', description: 'Persentase balita yang mendapatkan intervensi gizi aktif untuk pencegahan stunting' },
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
