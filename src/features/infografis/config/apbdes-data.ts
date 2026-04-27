import { Coins, Landmark, PiggyBank, Wallet } from 'lucide-react'
import type { ChartConfig } from '@/components/ui/chart'

export const apbdesCards = [
  {
    title: 'Total Pendapatan',
    description:
      'Total Pendapatan adalah jumlah seluruh penerimaan desa dalam satu tahun anggaran.',
    amount: '3,542',
    tone: 'emerald' as const,
  },
  {
    title: 'Total Belanja',
    description: 'Total Belanja adalah jumlah seluruh pengeluaran desa dalam satu tahun anggaran.',
    amount: '3,542',
    tone: 'dark' as const,
  },
  {
    title: 'Surplus/Defisit',
    description: 'Surplus/Defisit adalah selisih pendapatan dan belanja desa.',
    amount: '3,542',
    tone: 'dark' as const,
  },
  {
    title: 'Penerimaan Pembiayaan',
    description: 'Penerimaan Pembiayaan adalah dana masuk untuk pembiayaan desa.',
    amount: '3,542',
    tone: 'emerald' as const,
  },
  {
    title: 'Pengeluaran Pembiayaan',
    description: 'Pengeluaran Pembiayaan adalah dana keluar untuk pembiayaan desa.',
    amount: '3,542',
    tone: 'dark' as const,
  },
  {
    title: 'SiLPA',
    description: 'SiLPA adalah sisa lebih anggaran tahun sebelumnya yang digunakan pada tahun berjalan.',
    amount: '3,542',
    tone: 'dark' as const,
  },
]

export const pendapatanCards = [
  {
    nama: 'Dana Desa',
    deskripsi:
      'Alokasi utama dari pemerintah pusat yang menjadi penopang program prioritas, pembangunan infrastruktur, dan pemberdayaan masyarakat.',
    nominal: 'Rp 1,60 M',
    persentase: 45,
    icon: Coins,
  },
  {
    nama: 'Alokasi Dana Desa',
    deskripsi:
      'Transfer dukungan dari pemerintah daerah untuk operasional desa, layanan publik, dan kegiatan administrasi pemerintahan.',
    nominal: 'Rp 1,00 M',
    persentase: 28,
    icon: Landmark,
  },
  {
    nama: 'Pendapatan Asli Desa',
    deskripsi:
      'Bersumber dari hasil usaha desa, aset yang dikelola, jasa layanan, dan potensi ekonomi lokal yang dikuatkan secara berkelanjutan.',
    nominal: 'Rp 610 Jt',
    persentase: 17,
    icon: Wallet,
  },
  {
    nama: 'Lain-lain Pendapatan',
    deskripsi:
      'Mencakup bantuan keuangan, hibah, dan pendapatan sah lain yang mendukung kebutuhan pembangunan desa.',
    nominal: 'Rp 360 Jt',
    persentase: 10,
    icon: PiggyBank,
  },
] as const

export const pendapatanChartData = pendapatanCards.map((item) => ({
  source: item.nama,
  label: item.nama,
  value: item.persentase,
  nominal: item.nominal,
}))

export const pendapatanChartGradientIds = Object.fromEntries(
  pendapatanChartData.map((item) => [item.source, `pendapatan-${item.source.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`]),
) as Record<(typeof pendapatanChartData)[number]['source'], string>

export const pendapatanChartConfig = {
  'Dana Desa': { label: 'Dana Desa', color: '#00E0A1' },
  'Alokasi Dana Desa': { label: 'Alokasi Dana Desa', color: '#F0B100' },
  'Pendapatan Asli Desa': { label: 'Pendapatan Asli Desa', color: '#8FE8C8' },
  'Lain-lain Pendapatan': { label: 'Lain-lain Pendapatan', color: '#2DCB8C' },
} satisfies ChartConfig
