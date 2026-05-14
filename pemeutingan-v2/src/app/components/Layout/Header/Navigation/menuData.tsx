import { HeaderItem } from "../../../../types/menu";

export const headerData: HeaderItem[] = [
  { label: "Beranda", href: "/" },
  { 
    label: "Profil", 
    href: "/profil",
    submenu: [
      { label: "Sejarah Desa", href: "/profil/sejarah" },
      { label: "Visi & Misi", href: "/profil/visi-misi" },
      { label: "Struktur Organisasi", href: "/profil/struktur" },
      { label: "Perangkat Desa", href: "/profil/perangkat" },
    ]
  },
  { 
    label: "Potensi", 
    href: "/potensi",
    submenu: [
      { label: "Wisata Desa", href: "/potensi/wisata" },
      { label: "UMKM Desa", href: "/potensi/umkm" },
      { label: "Pertanian & Peternakan", href: "/potensi/pertanian" },
    ]
  },
  { label: "Berita", href: "/berita" },
  { label: "Galeri", href: "/galeri" },
  { label: "Infografis", href: "/infografis" },
  { label: "Kontak", href: "/kontak" },
];
