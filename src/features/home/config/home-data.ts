import { Sprout, Store, Mountain } from "lucide-react";

export const INFORMASI_TERKINI = [
  {
    title: "Gotong Royong Bersih Lingkungan RT 03",
    description: "Warga bersama perangkat desa membersihkan saluran air dan jalan utama.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Pelatihan UMKM untuk Ibu-Ibu PKK",
    description: "Pendampingan usaha kecil untuk memperkuat produk lokal desa.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Musyawarah Desa Bahas Program Prioritas",
    description: "Warga berdiskusi tentang rencana pembangunan dan kebutuhan layanan publik.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Posyandu Balita Gelar Pemeriksaan Rutin",
    description: "Pelayanan kesehatan ibu dan anak berjalan tertib bersama tenaga kesehatan.",
    image: "https://images.unsplash.com/photo-1511688878354-3a2f5be94cd7?auto=format&fit=crop&w=1200&q=80",
  },
];

export const POTENSI_PREVIEW = [
  {
    title: "Pertanian Unggulan",
    description: "Lahan produktif mendukung hasil tani, hortikultura, dan penguatan ketahanan pangan warga.",
    image: "/img/unsplash_jiOJQF5xEdw.png",
    icon: Sprout,
    accent: "#009966",
  },
  {
    title: "UMKM & Produk Lokal",
    description: "Kerajinan, olahan pangan, dan usaha rumahan tumbuh sebagai penggerak ekonomi desa.",
    image: "/img/unsplash_bBuUjB98PPY.png",
    icon: Store,
    accent: "#F0B100",
  },
  {
    title: "Alam & Daya Tarik Desa",
    description: "Potensi panorama alam dan ruang terbuka yang dapat dikembangkan secara bertahap.",
    image: "/img/unsplash_KIPqvvTOC1s.png",
    icon: Mountain,
    accent: "#009966",
  },
] as const;

export const GALERI_PREVIEW = [
  {
    title: "Festival Desa & Seni Warga",
    description: "Cuplikan suasana kegiatan budaya dan kebersamaan masyarakat.",
    image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=1200&q=80",
    tag: "Seni Budaya",
    accent: "#F0B100",
  },
  {
    title: "Gotong Royong Kampung",
    description: "Dokumentasi aksi warga menjaga kebersihan lingkungan desa.",
    image: "https://images.unsplash.com/photo-1593113511432-84da4528ce05?auto=format&fit=crop&w=1200&q=80",
    tag: "Kegiatan",
    accent: "#00E0A1",
  },
  {
    title: "Pelayanan dan Administrasi",
    description: "Momen layanan publik yang dekat dan mudah dijangkau warga.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    tag: "Layanan",
    accent: "#55D4B1",
  },
] as const;

export const STATISTIK_DEMOGRAFI = [
  {
    angka: "3.542",
    label: "Total Penduduk",
    detail: "Tersebar di 4 Dusun",
  },
  {
    angka: "1.087",
    label: "Kepala Keluarga",
    detail: "Pembaruan Semester I",
  },
  {
    angka: "68%",
    label: "Usia Produktif",
    detail: "Rentang 18-55 Tahun",
  },
];

export const BATAS_WILAYAH = [
  {
    arah: "Utara",
    detail: "Bagian utara berbatasan langsung dengan kawasan hutan lindung.",
    layerClass: "layer-1",
  },
  {
    arah: "Timur",
    detail: "Wilayah timur berbatasan dengan jalur penghubung antar desa.",
    layerClass: "layer-2",
  },
  {
    arah: "Selatan",
    detail: "Sisi selatan berbatasan dengan area persawahan produktif warga.",
    layerClass: "layer-3",
  },
  {
    arah: "Barat",
    detail: "Batas barat terhubung dengan kawasan perbukitan dan kebun rakyat.",
    layerClass: "layer-4",
  },
];

export const DUSUN_MARKERS = [
  {
    id: "dusun-1",
    nama: "Dusun Cimawate",
    kepala: "Koordinator Dusun",
    penduduk: "845",
    laki_laki: "338",
    perempuan: "507",
    keterangan: "Dusun Cimawate berada di sisi utara dengan akses utama ke kawasan lindung.",
    warna: "#9FEFD4",
    position: { left: "50%", top: "43%" },
    popupPlacement: "right",
  },
  {
    id: "dusun-2",
    nama: "Dusun Karang",
    kepala: "Koordinator Dusun",
    penduduk: "772",
    laki_laki: "309",
    perempuan: "463",
    keterangan: "Dusun Karang berada di sisi timur dan terhubung langsung ke jalur antar desa.",
    warna: "#74DFC0",
    position: { left: "56%", top: "50%" },
    popupPlacement: "left",
  },
  {
    id: "dusun-3",
    nama: "Dusun Pameutingan",
    kepala: "Koordinator Dusun",
    penduduk: "988",
    laki_laki: "395",
    perempuan: "593",
    keterangan: "Dusun Pameutingan terletak di sisi selatan dengan dominasi lahan produktif warga.",
    warna: "#55D4B1",
    position: { left: "51%", top: "58%" },
    popupPlacement: "top",
  },
  {
    id: "dusun-4",
    nama: "Dusun Cianjuang",
    kepala: "Koordinator Dusun",
    penduduk: "915",
    laki_laki: "366",
    perempuan: "549",
    keterangan: "Dusun Cianjuang berada di sisi barat yang berbatasan dengan perbukitan dan kebun rakyat.",
    warna: "#35C89F",
    position: { left: "45%", top: "50%" },
    popupPlacement: "right",
  },
] as const;

export const STRUKTUR_TATA_KELOLA = [
  {
    jabatan: "Kepala Desa",
    nama: "Majang Dudi Budiana",
    image: "/img/unsplash_jiOJQF5xEdw.png",
    alt: "Kepala Desa Majang Dudi Budiana",
    delay: 340,
    widthClass: "w-56",
    hoverWidthClass: "md:hover:w-64",
  },
  {
    jabatan: "SekDes",
    nama: "Dede Solehudin",
    image: "/img/unsplash_bBuUjB98PPY.png",
    alt: "Sekretaris Desa Dede Solehudin",
    delay: 380,
    widthClass: "w-48",
    hoverWidthClass: "md:hover:w-56",
  },
  {
    jabatan: "KaPel",
    nama: "Ade Setiawan",
    image: "/img/unsplash_tB5ZZtHZ_tI.png",
    alt: "Kaur Pemerintahan Ade Setiawan",
    delay: 420,
    widthClass: "w-48",
    hoverWidthClass: "md:hover:w-56",
  },
  {
    jabatan: "KaPel",
    nama: "Acep Yendi",
    image: "/img/unsplash_KIPqvvTOC1s.png",
    alt: "Kaur Pemerintahan Acep Yendi",
    delay: 460,
    widthClass: "w-48",
    hoverWidthClass: "md:hover:w-56",
  },
] as const;
