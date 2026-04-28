import { GaleriItem } from "../types";

export const galleryCategories = [
  "Semua",
  "Kegiatan Desa",
  "Pembangunan Desa",
  "Acara & Festival",
  "Aktivitas Masyarakat",
  "Wisata Desa"
];

export const mockGallery: GaleriItem[] = [
  {
    id: "1",
    slug: "pestival-budaya-pameutingan-2026",
    title: "Festival Budaya Pameutingan 2026",
    category: "Acara & Festival",
    date: "12 April 2026",
    location: "Alun-alun Desa",
    shortDesc: "Kemeriahan festival tahunan yang menampilkan kesenian tradisional dan bazar produk lokal.",
    longDesc: "Festival Budaya Pameutingan 2026 merupakan acara puncak peringatan hari jadi desa yang ke-125. Acara ini dihadiri oleh ribuan warga dan wisatawan dari luar daerah. Berbagai pertunjukan mulai dari tari Jaipong massal hingga wayang golek semalam suntuk disuguhkan untuk melestarikan budaya leluhur.",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514525253361-bee243870eb2?q=80&w=800&auto=format&fit=crop"
    ],
    participants: "Seluruh warga Desa Pameutingan dan tamu undangan",
    objective: "Melestarikan adat istiadat desa dan mempromosikan UMKM lokal."
  },
  {
    id: "2",
    slug: "pembangunan-jembatan-penghubung-dusun",
    title: "Peresmian Jembatan Penghubung Dusun",
    category: "Pembangunan Desa",
    date: "05 April 2026",
    location: "Dusun Darmacaang",
    shortDesc: "Penyelesaian pembangunan jembatan beton yang memudahkan akses transportasi warga antar dusun.",
    longDesc: "Setelah melalui proses pembangunan selama 4 bulan, jembatan penghubung antara Dusun Darmacaang dan Dusun Mekarsari akhirnya resmi digunakan. Jembatan ini menggantikan jembatan gantung lama yang kondisinya sudah mengkhawatirkan.",
    image: "https://images.unsplash.com/photo-1545147418-4f1e62740987?q=80&w=800&auto=format&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1545147418-4f1e62740987?q=80&w=800&auto=format&fit=crop"
    ],
    participants: "Perwakilan Dinas PUPR, Pemerintah Desa, dan Tokoh Masyarakat",
    objective: "Meningkatkan konektivitas antar wilayah untuk mendukung distribusi hasil pertanian."
  },
  {
    id: "3",
    slug: "senam-sehat-mingguan-warga",
    title: "Senam Sehat Mingguan Bersama Warga",
    category: "Aktivitas Masyarakat",
    date: "28 Maret 2026",
    location: "Halaman Kantor Desa",
    shortDesc: "Rutin dilakukan setiap minggu pagi untuk menjaga kebugaran dan mempererat tali silaturahmi.",
    longDesc: "Kegiatan senam sehat ini merupakan program rutin setiap hari Minggu pagi yang diikuti oleh berbagai lapisan usia, mulai dari anak-anak hingga lansia. Selain olahraga, kegiatan ini juga menjadi ajang warga untuk berkumpul dan berdiskusi santai.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop"
    ],
    participants: "Ibu-ibu PKK dan Warga Desa Umum",
    objective: "Mewujudkan masyarakat yang sehat secara jasmani dan harmonis secara sosial."
  }
];
