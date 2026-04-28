import { PotensiItem, PotensiStats } from "../types";

export const potensiStats: PotensiStats[] = [
  { label: "Total UMKM", value: "124", unit: "Unit Usaha", icon: "Store" },
  { label: "Lahan Pertanian", value: "450", unit: "Hektar", icon: "Sprout" },
  { label: "Penduduk Produktif", value: "2.450", unit: "Jiwa", icon: "Users" },
  { label: "Objek Wisata", value: "5", unit: "Destinasi", icon: "Palmtree" },
];

export const mockPotensi: PotensiItem[] = [
  {
    id: "1",
    slug: "pertanian-padi-unggulan",
    name: "Pertanian Padi Unggulan",
    category: "Sumber Daya Alam",
    shortDesc: "Lahan persawahan produktif dengan sistem irigasi teknis yang menghasilkan padi kualitas premium.",
    longDesc: "Desa Pameutingan memiliki potensi pertanian yang sangat besar, terutama dalam komoditas padi. Dengan luas lahan mencapai ratusan hektar, wilayah ini menjadi salah satu lumbung pangan di kabupaten. Didukung oleh sistem irigasi yang tertata dan tanah yang subur, hasil panen padi di sini memiliki kualitas yang diakui oleh pasar luas. Kelompok tani desa juga aktif melakukan inovasi dalam pemilihan bibit dan teknik pemupukan organik.",
    image: "https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=800&auto=format&fit=crop"
    ],
    highlights: [
      { label: "Luas Lahan", value: "320 Ha" },
      { label: "Produksi", value: "1.200 Ton/Tahun" }
    ],
    details: [
      { subCategory: "Padi Ciherang", amount: "150 Ha", production: "6 Ton/Ha", location: "Dusun Darmacaang", group: "Poktan Makmur" },
      { subCategory: "Padi Pandan Wangi", amount: "100 Ha", production: "5 Ton/Ha", location: "Dusun Mekarsari", group: "Poktan Sejahtera" }
    ],
    investmentInfo: "Tersedia peluang pengembangan penggilingan padi modern dan pengemasan beras premium.",
    accessInfo: "Lokasi sawah dapat diakses dengan kendaraan roda empat melalui jalan desa yang sudah diaspal."
  },
  {
    id: "2",
    slug: "umkm-anyaman-bambu",
    name: "UMKM Anyaman Bambu",
    category: "Ekonomi & UMKM",
    shortDesc: "Produk kerajinan tangan berbahan dasar bambu yang bernilai seni tinggi dan ramah lingkungan.",
    longDesc: "Kerajinan anyaman bambu merupakan warisan turun-temurun di Desa Pameutingan. Saat ini, terdapat puluhan perajin yang tergabung dalam koperasi desa. Produk yang dihasilkan mulai dari alat rumah tangga hingga dekorasi interior modern yang sudah merambah pasar ekspor. Inovasi desain dan ketahanan produk menjadi keunggulan utama kerajinan bambu dari desa kami.",
    image: "https://images.unsplash.com/photo-1590483736622-39da8af75bba?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1590483736622-39da8af75bba?q=80&w=800&auto=format&fit=crop"
    ],
    highlights: [
      { label: "Pelaku Usaha", value: "45 Orang" },
      { label: "Kapasitas", value: "500 Pcs/Bulan" }
    ],
    details: [
      { subCategory: "Perabot Rumah", amount: "25 Perajin", production: "300 Pcs", location: "Dusun Cibiru", group: "Koperasi Bambu Jaya" },
      { subCategory: "Cenderamata", amount: "20 Perajin", production: "200 Pcs", location: "Dusun Sukamaju", group: "Koperasi Bambu Jaya" }
    ],
    investmentInfo: "Dibutuhkan kemitraan untuk pemasaran digital dan ekspor skala besar.",
    accessInfo: "Workshop perajin terletak di sepanjang jalan utama Dusun Cibiru."
  },
  {
    id: "3",
    slug: "wisata-curug-pameutingan",
    name: "Wisata Curug Pameutingan",
    category: "Wisata",
    shortDesc: "Keindahan alam air terjun tersembunyi dengan suasana hutan yang masih asri dan udara sejuk.",
    longDesc: "Curug Pameutingan adalah permata tersembunyi yang menawarkan pesona air terjun setinggi 15 meter. Dikelilingi oleh vegetasi hijau yang rimbun, lokasi ini menjadi destinasi favorit untuk healing dan fotografi alam. Pengelolaan dilakukan secara swadaya oleh Kelompok Sadar Wisata (Pokdarwis) desa dengan tetap menjaga kelestarian ekosistem sekitar.",
    image: "https://images.unsplash.com/photo-1434725039720-abb26e22ebe8?q=80&w=800&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1434725039720-abb26e22ebe8?q=80&w=800&auto=format&fit=crop"
    ],
    highlights: [
      { label: "Kunjungan", value: "800 Orang/Bulan" },
      { label: "Fasilitas", value: "Lengkap" }
    ],
    details: [
      { subCategory: "Area Camping", amount: "2 Lokasi", production: "N/A", location: "Dusun Dago", group: "Pokdarwis Alam Asri" },
      { subCategory: "Spot Foto", amount: "5 Area", production: "N/A", location: "Area Curug", group: "Pokdarwis Alam Asri" }
    ],
    investmentInfo: "Terbuka peluang pembangunan homestay ramah lingkungan dan area glamping.",
    accessInfo: "Dapat ditempuh dengan trekking ringan selama 15 menit dari area parkir terakhir."
  }
];
