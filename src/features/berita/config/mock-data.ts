import { NewsItem, NewsCategory } from "../types";

export const newsCategories: NewsCategory[] = [
  { id: "1", name: "Semua", slug: "semua" },
  { id: "6", name: "Terbaru", slug: "terbaru" },
  { id: "2", name: "Pembangunan", slug: "pembangunan" },
  { id: "3", name: "Kegiatan", slug: "kegiatan" },
  { id: "4", name: "Ekonomi", slug: "ekonomi" },
  { id: "5", name: "Kesehatan", slug: "kesehatan" },
];

export const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "Pembangunan Jalan Desa Pameutingan Tahap 1 Selesai Tepat Waktu",
    slug: "pembangunan-jalan-desa-pameutingan-tahap-1",
    excerpt: "Proyek pengerasan jalan penghubung antar dusun di Desa Pameutingan telah mencapai 100% untuk tahap pertama tahun anggaran 2026.",
    content: "Pemerintah Desa Pameutingan secara resmi mengumumkan selesainya pembangunan jalan desa tahap pertama. Proyek ini meliputi pengerasan jalan sepanjang 1.2 KM yang menghubungkan Dusun Darmacaang dan Dusun Mekarsari.\n\nKepala Desa Pameutingan menyatakan bahwa percepatan ini berkat kerjasama warga yang sangat antusias membantu tenaga dan konsumsi untuk para pekerja. 'Ini adalah bukti nyata bahwa gotong royong masih sangat kuat di desa kita,' ujarnya.\n\nDengan selesainya jalan ini, mobilitas ekonomi warga diharapkan meningkat drastis, terutama bagi para petani yang sering mengangkut hasil bumi.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=800&auto=format&fit=crop",
    category: newsCategories[1],
    author: {
      name: "Admin Desa",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
      role: "Sekretaris Desa"
    },
    publishedAt: "2026-04-25",
    readingTime: "5 menit"
  },
  {
    id: "2",
    title: "Pelatihan Digital Marketing untuk UMKM Desa Pameutingan",
    slug: "pelatihan-digital-marketing-umkm",
    excerpt: "Guna meningkatkan daya saing produk lokal, Desa Pameutingan menggelar pelatihan pemasaran digital bagi pelaku usaha mikro.",
    content: "Dalam upaya mendorong transformasi ekonomi digital di tingkat desa, Pemerintah Desa Pameutingan menyelenggarakan workshop intensif digital marketing. Pelatihan ini diikuti oleh lebih dari 30 pelaku UMKM lokal, mulai dari pengrajin hingga pengusaha kuliner.\n\nMateri yang diberikan mencakup penggunaan media sosial untuk bisnis, fotografi produk sederhana menggunakan smartphone, hingga teknik copy-writing yang menarik minat pembeli daring.\n\nDiharapkan setelah pelatihan ini, produk-produk unggulan Desa Pameutingan seperti Keripik Singkong Spesial dan Anyaman Bambu dapat merambah pasar yang lebih luas melalui platform e-commerce.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=800&auto=format&fit=crop",
    category: newsCategories[3],
    author: {
      name: "Budi Santoso",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=budi",
      role: "Pendamping UMKM"
    },
    publishedAt: "2026-04-22",
    readingTime: "4 menit"
  },
  {
    id: "3",
    title: "Posyandu Mawar Merah Raih Penghargaan Desa Sehat 2026",
    slug: "posyandu-mawar-merah-raih-penghargaan",
    excerpt: "Dedikasi para kader kesehatan di Dusun Cibiru membuahkan hasil dengan diraihnya predikat Posyandu Teraktif tingkat Kabupaten.",
    content: "Kabar membanggakan datang dari bidang kesehatan. Posyandu Mawar Merah yang berlokasi di Dusun Cibiru baru saja dinobatkan sebagai Posyandu Teraktif dan Inovatif dalam pencegahan stunting tahun 2026.\n\nInovasi yang diunggulkan adalah program 'Kebun Gizi Mandiri' di mana setiap ibu hamil dibekali bibit sayuran untuk ditanam di pekarangan rumah masing-masing.\n\nPenghargaan ini menjadi motivasi bagi dusun-dusun lain di Desa Pameutingan untuk terus meningkatkan kualitas layanan kesehatan dasar bagi masyarakat.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop",
    category: newsCategories[4],
    author: {
      name: "Siti Aminah",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=siti",
      role: "Kader Kesehatan"
    },
    publishedAt: "2026-04-20",
    readingTime: "6 menit"
  }
];
