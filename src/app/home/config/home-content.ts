import type {
  HeroSectionContent,
  DemografiSectionContent,
  APBDesSectionContent,
  LeadershipSectionContent,
  StrukturSectionContent,
  NewsSectionContent,
} from '../types'

// Image URLs
const FIGMA_ASSETS = {
  demografiBg: 'https://www.figma.com/api/mcp/asset/96e9bc4a-3d4f-4543-838f-e3be1685b00d',
  demografiIcon: 'https://www.figma.com/api/mcp/asset/21469863-0309-49b5-92b2-da4248a17030',
  kepalaDesaImage: 'https://www.figma.com/api/mcp/asset/54a3370e-5465-41c4-b4a4-52cb6b9a36f6',
  strukturKepalaDesaImg: 'https://www.figma.com/api/mcp/asset/0895496f-e839-41bf-8153-dd47d048090f',
  strukturSekDesImg: 'https://www.figma.com/api/mcp/asset/d14230b2-1a35-4453-b313-abd9c41dde1c',
  strukturKaPelImg1: 'https://www.figma.com/api/mcp/asset/c2f5f60e-b119-47f3-be75-eb6638d020f7',
  strukturKaPelImg2: 'https://www.figma.com/api/mcp/asset/88a11b2d-c2ee-47b3-9500-21d8ee9e0ac8',
  informasiTerkiniImage: 'https://www.figma.com/api/mcp/asset/a4641f83-6a04-4589-9a97-55016b8a2e2c',
  informasiTerkiniBadgeIcon: 'https://www.figma.com/api/mcp/asset/ff67f71c-6c82-4894-bf18-73bc3cf936fc',
  kepalaDesaFullImage: 'https://www.figma.com/api/mcp/asset/cf08a028-4907-4714-9bd2-aa3783b7175a',
}

const NEWS_IMAGES = [
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80&sat=-25',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
]

// ============================================================================
// HERO SECTION CONTENT
// ============================================================================

export const heroContent: HeroSectionContent = {
  badge: 'Website Resmi Pemerintah Desa',
  titleLines: ['Membangun Desa,', 'Mensejahterakan', 'Warga'],
  description:
    'Selamat datang di portal informasi digital Desa Asri. Kami berkomitmen memberikan pelayanan publik yang transparan, cepat, dan mudah diakses bagi seluruh masyarakat.',
  cta: [
    {
      label: 'Layanan Mandiri',
      href: '/layanan-masyarakat',
      variant: 'primary',
      icon: 'arrow',
    },
    {
      label: 'Profil Desa',
      href: '/profil',
      variant: 'secondary',
    },
  ],
  stats: [
    { label: 'Luas Wilayah', value: '12.5 km²' },
    { label: 'Batas Wilayah', value: '4 Desa' },
    { label: 'Jumlah Penduduk', value: '3.500+' },
  ],
}

// Hero section image and quote
export const heroImage = FIGMA_ASSETS.kepalaDesaFullImage
export const heroQuote = {
  name: 'Bapak Sutrisno',
  role: 'Kepala Desa Asri',
  text: 'Melayani dengan hati, membangun dengan inovasi untuk kemajuan bersama.',
}

// ============================================================================
// DEMOGRAFIS SECTION CONTENT
// ============================================================================

export const demografiContent: DemografiSectionContent = {
  heading: 'Demografi & Statistik Desa',
  description:
    'Menyajikan data kependudukan yang transparan, akurat, dan terintegrasi untuk mendukung perencanaan.',
  stats: [
    {
      angka: '3.542',
      label: 'Total Penduduk',
      detail: 'Tersebar di 4 Dusun',
    },
    {
      angka: '1.087',
      label: 'Kepala Keluarga',
      detail: 'Pembaruan Semester I',
    },
    {
      angka: '68%',
      label: 'Usia Produktif',
      detail: 'Rentang 18-55 Tahun',
    },
  ],
}

export const demografiImage = FIGMA_ASSETS.demografiBg
export const demografiIcon = FIGMA_ASSETS.demografiIcon

// ============================================================================
// APBDES SECTION CONTENT
// ============================================================================

export const apbdesYears = [2026, 2025, 2024, 2023, 2022]

export const apbdesContent: APBDesSectionContent = {
  heading: 'Anggaran Pendapatan Dan Belanja Daerah',
  description:
    'Kelompok Umur merupakan penyajian data penduduk berdasarkan rentang usia tertentu yang ditampilkan secara transparan, akurat, dan terintegrasi guna mendukung proses perencanaan pembangunan, pengambilan kebijakan, serta evaluasi program secara tepat sasaran.',
  years: apbdesYears.map((year) => ({ year, description: `Tahun ${year}` })),
  statistics: [
    { label: 'Total Pendapatan', value: '3.542' },
    { label: 'Total Belanja', value: '3.542' },
    { label: 'SiLPA', value: '3.542' },
  ],
}

// ============================================================================
// LEADERSHIP SECTION CONTENT
// ============================================================================

export const leadershipContent: LeadershipSectionContent = {
  heading: 'Mengenal Lebih Dekat Kepala Desa',
  description:
    'Menyajikan profil singkat pimpinan desa sebagai sumber informasi publik yang transparan, akurat, dan terintegrasi untuk mendukung perencanaan pembangunan serta pengambilan kebijakan yang tepat sasaran.',
  name: 'Majang Budi Budiana',
  role: 'Kepala Desa',
  bio: 'Kelompok Umur merupakan penyajian data penduduk berdasarkan rentang usia tertentu yang ditampilkan secara transparan, akurat, dan terintegrasi guna mendukung proses perencanaan pembangunan, pengambilan kebijakan, serta evaluasi program secara tepat sasaran.',
  ctaLink: '/profil',
  ctaLabel: 'Lihat Selengkapnya',
}

export const leadershipImage = FIGMA_ASSETS.kepalaDesaImage

// ============================================================================
// STRUKTUR SECTION CONTENT
// ============================================================================

export const strukturContent: StrukturSectionContent = {
  heading: 'Struktur Tata Kelola Desa',
  description: 'Struktur kepemimpinan Desa Pameutingan',
  ctaLink: '/struktur',
  ctaLabel: 'Lihat Selengkapnya',
  positions: [
    {
      jabatan: 'Kepala Desa',
      nama: 'Majang Dudi Budiana',
      image: FIGMA_ASSETS.strukturKepalaDesaImg,
      alt: 'Kepala Desa Majang Dudi Budiana',
      delay: 340,
      widthClass: 'w-56',
      hoverWidthClass: 'md:hover:w-64',
    },
    {
      jabatan: 'SekDes',
      nama: 'Dede Solehudin',
      image: FIGMA_ASSETS.strukturSekDesImg,
      alt: 'Sekretaris Desa Dede Solehudin',
      delay: 380,
      widthClass: 'w-48',
      hoverWidthClass: 'md:hover:w-56',
    },
    {
      jabatan: 'KaPel',
      nama: 'Ade Setiawan',
      image: FIGMA_ASSETS.strukturKaPelImg1,
      alt: 'Kaur Pemerintahan Ade Setiawan',
      delay: 420,
      widthClass: 'w-48',
      hoverWidthClass: 'md:hover:w-56',
    },
    {
      jabatan: 'KaPel',
      nama: 'Acep Yendi',
      image: FIGMA_ASSETS.strukturKaPelImg2,
      alt: 'Kaur Pemerintahan Acep Yendi',
      delay: 460,
      widthClass: 'w-48',
      hoverWidthClass: 'md:hover:w-56',
    },
  ],
}

// ============================================================================
// NEWS SECTION CONTENT
// ============================================================================

export const newsContent: NewsSectionContent = {
  heading: 'Informasi Terkini Desa Pameutingan',
  description:
    'Menyajikan ringkasan kabar terbaru desa secara transparan, akurat, dan mudah diakses agar warga dapat mengikuti aktivitas, program, serta perkembangan desa secara cepat.',
  cards: [
    {
      title: 'Gotong Royong Bersih Lingkungan RT 03',
      description: 'Warga bersama perangkat desa membersihkan saluran air dan area jalan utama.',
      image: NEWS_IMAGES[0],
      icon: FIGMA_ASSETS.informasiTerkiniBadgeIcon,
    },
    {
      title: 'Pelatihan UMKM untuk Ibu-Ibu PKK',
      description: 'Kegiatan pendampingan usaha kecil untuk meningkatkan kualitas produk lokal.',
      image: NEWS_IMAGES[1],
      icon: FIGMA_ASSETS.informasiTerkiniBadgeIcon,
    },
    {
      title: 'Musyawarah Desa Bahas Program Prioritas',
      description: 'Forum warga membahas rencana pembangunan dan kebutuhan layanan publik tahun berjalan.',
      image: NEWS_IMAGES[2],
      icon: FIGMA_ASSETS.informasiTerkiniBadgeIcon,
    },
    {
      title: 'Posyandu Balita Gelar Pemeriksaan Rutin',
      description: 'Pelayanan kesehatan anak dan ibu dilakukan bersama tenaga kesehatan setempat.',
      image: NEWS_IMAGES[3],
      icon: FIGMA_ASSETS.informasiTerkiniBadgeIcon,
    },
    {
      title: 'Layanan Administrasi Keliling Mempermudah Warga',
      description: 'Pengurusan dokumen kependudukan hadir lebih dekat untuk warga di dusun.',
      image: NEWS_IMAGES[4],
      icon: FIGMA_ASSETS.informasiTerkiniBadgeIcon,
    },
    {
      title: 'Perbaikan Jalan Usaha Tani Dimulai',
      description: 'Akses menuju lahan pertanian diperkuat agar distribusi hasil panen lebih lancar.',
      image: NEWS_IMAGES[5],
      icon: FIGMA_ASSETS.informasiTerkiniBadgeIcon,
    },
    {
      title: 'Pembinaan Karang Taruna dan Olahraga Desa',
      description: 'Generasi muda didorong aktif dalam kegiatan sosial, seni, dan olahraga desa.',
      image: NEWS_IMAGES[6],
      icon: FIGMA_ASSETS.informasiTerkiniBadgeIcon,
    },
    {
      title: 'Peringatan Hari Besar Nasional di Balai Desa',
      description: 'Kegiatan bersama masyarakat berlangsung tertib dan penuh semangat kebersamaan.',
      image: NEWS_IMAGES[7],
      icon: FIGMA_ASSETS.informasiTerkiniBadgeIcon,
    },
  ],
}

// ============================================================================
// ASSETS / IMAGES
// ============================================================================

export const ASSETS = {
  ...FIGMA_ASSETS,
  hero: heroImage,
  demografi: {
    bg: demografiImage,
    icon: demografiIcon,
  },
  leadership: leadershipImage,
  news: {
    image: FIGMA_ASSETS.informasiTerkiniImage,
    icon: FIGMA_ASSETS.informasiTerkiniBadgeIcon,
  },
}
