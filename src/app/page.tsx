"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight, Info, BarChart, Leaf, Sprout, Store, Mountain, Camera, Images } from "lucide-react";

const kepalaDesaImage = "/img/unsplash_jiOJQF5xEdw.png";
const strukturKepalaDesaImg = "/img/unsplash_jiOJQF5xEdw.png";
const strukturSekDesImg = "/img/unsplash_bBuUjB98PPY.png";
const strukturKaPelImg1 = "/img/unsplash_tB5ZZtHZ_tI.png";
const strukturKaPelImg2 = "/img/unsplash_KIPqvvTOC1s.png";
const informasiTerkiniCards = [
  {
    title: "Gotong Royong Bersih Lingkungan RT 03",
    description: "Warga bersama perangkat desa membersihkan saluran air dan jalan utama.",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Pelatihan UMKM untuk Ibu-Ibu PKK",
    description: "Pendampingan usaha kecil untuk memperkuat produk lokal desa.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Musyawarah Desa Bahas Program Prioritas",
    description: "Warga berdiskusi tentang rencana pembangunan dan kebutuhan layanan publik.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Posyandu Balita Gelar Pemeriksaan Rutin",
    description: "Pelayanan kesehatan ibu dan anak berjalan tertib bersama tenaga kesehatan.",
    image:
      "https://images.unsplash.com/photo-1511688878354-3a2f5be94cd7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Layanan Administrasi Keliling Mempermudah Warga",
    description: "Pengurusan dokumen kependudukan hadir lebih dekat untuk masyarakat.",
    image:
      "https://images.unsplash.com/photo-1529421308418-eab98863cee5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Perbaikan Jalan Usaha Tani Dimulai",
    description: "Akses menuju lahan pertanian diperkuat agar distribusi hasil panen lancar.",
    image:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Pembinaan Karang Taruna dan Olahraga Desa",
    description: "Generasi muda didorong aktif dalam kegiatan sosial dan olahraga desa.",
    image:
      "https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Peringatan Hari Besar Nasional di Balai Desa",
    description: "Kegiatan bersama masyarakat berlangsung tertib dan penuh kebersamaan.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  },
];

const potensiPreviewCards = [
  {
    title: "Pertanian Unggulan",
    description: "Lahan produktif mendukung hasil tani, hortikultura, dan penguatan ketahanan pangan warga.",
    image: "/img/unsplash_jiOJQF5xEdw.png",
    icon: Sprout,
    accent: "#00E0A1",
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
    accent: "#55D4B1",
  },
] as const;

const galeriPreviewCards = [
  {
    title: "Festival Desa & Seni Warga",
    description: "Cuplikan suasana kegiatan budaya dan kebersamaan masyarakat.",
    image: "/img/hero-kepala-desa.png",
    tag: "Utama",
    spanClass: "xl:col-span-2 xl:row-span-2 min-h-[24rem]",
    accent: "#F0B100",
  },
  {
    title: "Gotong Royong Kampung",
    description: "Dokumentasi aksi warga menjaga kebersihan lingkungan desa.",
    image: "/img/unsplash_tB5ZZtHZ_tI.png",
    tag: "Kegiatan",
    spanClass: "min-h-56",
    accent: "#00E0A1",
  },
  {
    title: "Pelayanan dan Administrasi",
    description: "Momen layanan publik yang dekat dan mudah dijangkau warga.",
    image: "/img/unsplash_bBuUjB98PPY.png",
    tag: "Layanan",
    spanClass: "min-h-56",
    accent: "#55D4B1",
  },
  {
    title: "Ruang Pertemuan Desa",
    description: "Suasana musyawarah dan koordinasi program kerja bersama perangkat desa.",
    image: "/img/unsplash_KIPqvvTOC1s.png",
    tag: "Musyawarah",
    spanClass: "xl:col-span-2 min-h-56",
    accent: "#0B281F",
  },
  {
    title: "Dokumentasi Lapangan",
    description: "Cuplikan aktivitas di luar ruangan yang menunjukkan dinamika desa.",
    image: "/img/unsplash_jiOJQF5xEdw.png",
    tag: "Lapangan",
    spanClass: "min-h-56",
    accent: "#7DCBFF",
  },
] as const;

const statistikDemografi = [
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

const apbdesStatistik = [
  {
    label: "Total Pendapatan",
    value: "3.542",
  },
  {
    label: "Total Belanja",
    value: "3.542",
  },
  {
    label: "SiLPA",
    value: "3.542",
  },
];

const apbdesYears = [2026, 2025, 2024, 2023, 2022];

const batasWilayahCards = [
  {
    arah: "Utara",
    detail: "Bagian utara berbatasan langsung dengan kawasan hutan lindung.",
    markerId: "dusun-1",
    layerClass: "layer-1",
  },
  {
    arah: "Timur",
    detail: "Wilayah timur berbatasan dengan jalur penghubung antar desa.",
    markerId: "dusun-2",
    layerClass: "layer-2",
  },
  {
    arah: "Selatan",
    detail: "Sisi selatan berbatasan dengan area persawahan produktif warga.",
    markerId: "dusun-3",
    layerClass: "layer-3",
  },
  {
    arah: "Barat",
    detail: "Batas barat terhubung dengan kawasan perbukitan dan kebun rakyat.",
    markerId: "dusun-4",
    layerClass: "layer-4",
  },
];

const dusunLegendItems = [
  {
    nama: "Dusun Cimawate",
    kepala: "Koordinator Dusun",
    penduduk: "845",
    warna: "#9FEFD4",
    layerClass: "layer-1",
    vectorPath: "/img/peta-vector-345-302.svg",
  },
  {
    nama: "Dusun Karang",
    kepala: "Koordinator Dusun",
    penduduk: "772",
    warna: "#74DFC0",
    layerClass: "layer-2",
    vectorPath: "/img/peta-vector-345-313.svg",
  },
  {
    nama: "Dusun Pameutingan",
    kepala: "Koordinator Dusun",
    penduduk: "988",
    warna: "#55D4B1",
    layerClass: "layer-3",
    vectorPath: "/img/peta-vector-345-320.svg",
  },
  {
    nama: "Dusun Cianjuang",
    kepala: "Koordinator Dusun",
    penduduk: "915",
    warna: "#35C89F",
    layerClass: "layer-4",
    vectorPath: "/img/peta-vector-345-334.svg",
  },
  {
    nama: "Dusun 5",
    kepala: "Koordinator Dusun",
    penduduk: "345",
    warna: "#F0B100",
    layerClass: "layer-5",
    vectorPath: "/img/peta-vector-355-567.svg",
  },
] as const;

const dusunMapMarkers = [
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

const markerPopupPlacementClass: Record<
  (typeof dusunMapMarkers)[number]["popupPlacement"],
  string
> = {
  left: "right-full mr-3 top-1/2 -translate-y-1/2",
  right: "left-full ml-3 top-1/2 -translate-y-1/2",
  top: "bottom-full left-1/2 mb-3 -translate-x-1/2",
};

const strukturTataKelola = [
  {
    jabatan: "Kepala Desa",
    nama: "Majang Dudi Budiana",
    image: strukturKepalaDesaImg,
    alt: "Kepala Desa Majang Dudi Budiana",
    delay: 340,
    widthClass: "w-56",
    hoverWidthClass: "md:hover:w-64",
  },
  {
    jabatan: "SekDes",
    nama: "Dede Solehudin",
    image: strukturSekDesImg,
    alt: "Sekretaris Desa Dede Solehudin",
    delay: 380,
    widthClass: "w-48",
    hoverWidthClass: "md:hover:w-56",
  },
  {
    jabatan: "KaPel",
    nama: "Ade Setiawan",
    image: strukturKaPelImg1,
    alt: "Kaur Pemerintahan Ade Setiawan",
    delay: 420,
    widthClass: "w-48",
    hoverWidthClass: "md:hover:w-56",
  },
  {
    jabatan: "KaPel",
    nama: "Acep Yendi",
    image: strukturKaPelImg2,
    alt: "Kaur Pemerintahan Acep Yendi",
    delay: 460,
    widthClass: "w-48",
    hoverWidthClass: "md:hover:w-56",
  },
] as const;

type InformasiTerkiniCardProps = {
  title: string;
  description: string;
  image: string;
};

type PotensiPreviewCardProps = {
  title: string;
  description: string;
  image: string;
  icon: typeof Sprout;
  accent: string;
};

type GaleriPreviewCardProps = {
  title: string;
  description: string;
  image: string;
  tag: string;
  spanClass: string;
  accent: string;
};

function InformasiTerkiniCard({ title, description, image }: InformasiTerkiniCardProps) {
  return (
    <button
      type="button"
      className="group relative flex h-93.25 w-full max-w-72 flex-col items-start gap-3 rounded-[17px] bg-[#D9D9D9] px-5.75 py-5.5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_32px_rgba(11,40,31,0.12)]"
    >
      <div className="flex w-full items-start justify-between gap-4">
        <h3 className="font-timeless max-w-43 text-[20px] font-bold leading-[1.28] text-[#004F3B]">
          {title}
        </h3>

        <span className="inline-flex h-11.25 w-11.25 shrink-0 items-center justify-center rounded-full border border-[#004F3B]/80 text-[#004F3B] transition-colors duration-300 group-hover:bg-[#004F3B] group-hover:text-white">
          <ArrowRight size={20} strokeWidth={2} />
        </span>
      </div>

      <p className="max-w-52.5 text-[14px] leading-5 text-[#0B281F]">
        {description}
      </p>

      <div className="relative mt-auto h-43.5 w-full overflow-hidden rounded-[7px]">
        <img
          src={image}
          alt={title}
          className="h-full w-full rounded-[7px] object-cover"
          loading="lazy"
        />

        <span className="absolute bottom-5 left-5 inline-flex h-11.25 w-11.25 items-center justify-center rounded-full bg-[#004F3B] text-white shadow-[0_10px_18px_rgba(0,0,0,0.18)]">
          <Leaf size={16} strokeWidth={2.2} aria-hidden="true" />
        </span>
      </div>
    </button>
  );
}

function PotensiPreviewCard({ title, description, image, icon: Icon, accent }: PotensiPreviewCardProps) {
  return (
    <article className="hero-reveal group relative overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(160deg,rgba(0,43,34,0.98)_0%,rgba(0,61,48,0.96)_55%,rgba(0,29,23,0.99)_100%)] p-4 shadow-[0_18px_38px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(0,0,0,0.24)]">
      <div
        className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full blur-3xl"
        style={{ backgroundColor: `${accent}22` }}
      />

      <div className="relative flex h-full flex-col gap-4">
        <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-[#001A14]">
          <img
            src={image}
            alt={title}
            className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />

          <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/35 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
            <Icon size={14} strokeWidth={2.4} />
            Preview
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <h3 className="max-w-[12ch] text-[22px] font-bold leading-[1.05] text-white" style={{ fontFamily: 'var(--font-heading)' }}>
              {title}
            </h3>
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/8 text-white/90">
              <ArrowRight size={18} strokeWidth={2.4} />
            </span>
          </div>

          <p className="text-[13px] leading-6 text-[#D4FBEA]/82">{description}</p>
        </div>
      </div>
    </article>
  );
}

function PotensiSection() {
  return (
    <section className="bg-[#FFFFFF] px-4 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 lg:gap-10">
        <div className="flex flex-col gap-6 border-b border-[#0B281F]/10 pb-8 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <h2 className="hero-reveal font-timeless max-w-99 text-[26px] font-bold leading-[1.06] text-[#0B281F] md:text-[34px] lg:text-[42px] [animation-delay:80ms]">
            <span className="block">Potensi Desa</span>
            <span className="block">Pameutingan</span>
          </h2>

          <p className="hero-reveal max-w-147 pt-0.5 text-[12px] leading-6 text-[#0B281F]/80 md:text-[13px] md:leading-7 lg:pt-1 [animation-delay:150ms]">
            Menampilkan sebagian potensi desa seperti pertanian, UMKM, dan daya tarik alam sebagai preview sebelum melihat detail
            lengkap di halaman potensi.
          </p>

          <div className="hero-reveal inline-flex h-11 w-11 shrink-0 items-center justify-center self-start rounded-full bg-[#0B281F] text-[#F4F3EF] shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg [animation-delay:180ms] md:h-12 md:w-12">
            <Sprout size={18} strokeWidth={2.3} />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
          {potensiPreviewCards.map((item, index) => (
            <div
              key={item.title}
              className="hero-reveal w-full"
              style={{ animationDelay: `${240 + index * 80}ms` }}
            >
              <PotensiPreviewCard
                title={item.title}
                description={item.description}
                image={item.image}
                icon={item.icon}
                accent={item.accent}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-start pt-1">
          <Link
            href="/potensi"
            className="hero-reveal inline-flex h-11 w-fit items-center gap-2 rounded-full bg-[#F0B100] px-5 py-2.5 text-[13px] font-bold text-[#0B281F] shadow-[0_10px_20px_rgba(240,177,0,0.34)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_13px_24px_rgba(240,177,0,0.46)] [animation-delay:520ms]"
          >
            Lihat Selengkapnya
            <ArrowRight size={17} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function GaleriPreviewCard({ title, description, image, tag, spanClass, accent }: GaleriPreviewCardProps) {
  return (
    <article className={`hero-reveal group relative overflow-hidden rounded-[28px] border border-[#0B281F]/10 bg-white shadow-[0_16px_34px_rgba(11,40,31,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_rgba(11,40,31,0.14)] ${spanClass}`}>
      <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: accent }} />
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl"
        style={{ backgroundColor: `${accent}18` }}
      />

      <div className="relative flex h-full flex-col">
        <div className="relative h-full min-h-40 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/18 to-transparent" />

          <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/34 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
            <Camera size={13} strokeWidth={2.4} />
            {tag}
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="max-w-[12ch] text-[22px] font-bold leading-[1.06] text-white" style={{ fontFamily: 'var(--font-heading)' }}>
              {title}
            </h3>
            <p className="mt-2 max-w-72 text-[12px] leading-5 text-white/80">
              {description}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function GaleriSection() {
  return (
    <section className="bg-[#F5F1E8] px-4 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 lg:gap-10">
        <div className="grid gap-4 border-b border-[#0B281F]/10 pb-8 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.45fr)_auto] md:items-start md:gap-6">
          <h2 className="hero-reveal font-timeless max-w-99 text-[26px] font-bold leading-[1.06] text-[#0B281F] md:text-[34px] lg:text-[42px] [animation-delay:80ms]">
            <span className="block">Galeri Desa</span>
            <span className="block">Pameutingan</span>
          </h2>

          <p className="hero-reveal max-w-147 pt-0.5 text-[12px] leading-6 text-[#0B281F]/80 md:text-[13px] md:leading-7 lg:pt-1 [animation-delay:150ms]">
            Menampilkan sebagian dokumentasi kegiatan desa, suasana layanan, dan momen kebersamaan warga sebagai preview sebelum melihat
            galeri lengkap.
          </p>

          <div className="hero-reveal inline-flex h-11 w-11 shrink-0 items-center justify-center self-start rounded-full bg-[#0B281F] text-[#F4F3EF] shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg [animation-delay:180ms] md:h-12 md:w-12">
            <Images size={18} strokeWidth={2.2} />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 xl:auto-rows-[14rem] xl:gap-5">
          {galeriPreviewCards.map((item, index) => (
            <div
              key={item.title}
              className="hero-reveal w-full"
              style={{ animationDelay: `${220 + index * 80}ms` }}
            >
              <GaleriPreviewCard
                title={item.title}
                description={item.description}
                image={item.image}
                tag={item.tag}
                spanClass={item.spanClass}
                accent={item.accent}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-start pt-2">
          <Link
            href="/galeri"
            className="hero-reveal inline-flex h-11 w-fit items-center gap-2 rounded-full bg-[#0B281F] px-5 py-2.5 text-[13px] font-bold text-[#F4F3EF] shadow-[0_10px_20px_rgba(11,40,31,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_13px_24px_rgba(11,40,31,0.22)] [animation-delay:560ms]"
          >
            Lihat Selengkapnya
            <ArrowRight size={17} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [selectedApbdesYear, setSelectedApbdesYear] = useState<number>(2026);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState<boolean>(false);
  const [activeStrukturPage, setActiveStrukturPage] = useState<number>(0);
  const [strukturTotalPages, setStrukturTotalPages] = useState<number>(1);
  const [combinedMapActiveLayer, setCombinedMapActiveLayerState] = useState<string | null>(
    null,
  );
  const [hoveredMapMarkerId, setHoveredMapMarkerId] = useState<string | null>(null);
  const [pinnedMapMarkerId, setPinnedMapMarkerId] = useState<string | null>(null);
  const [isBoundaryCardHoverActive, setIsBoundaryCardHoverActive] = useState<boolean>(false);
  const strukturSliderRef = useRef<HTMLDivElement | null>(null);
  const yearDropdownRef = useRef<HTMLDivElement | null>(null);
  const combinedMapObjectRef = useRef<HTMLObjectElement | null>(null);

  const activeMapMarkerId = pinnedMapMarkerId ?? hoveredMapMarkerId;
  const activeDusunInfo =
    dusunMapMarkers.find((item) => item.id === activeMapMarkerId) ??
    dusunMapMarkers[0];
  const isMapLayerActive = Boolean(activeMapMarkerId || combinedMapActiveLayer);

  const setCombinedMapActiveLayer = (layerClass: string | null) => {
    setCombinedMapActiveLayerState(layerClass);

    const svgDocument = combinedMapObjectRef.current?.contentDocument;
    const svgRoot = svgDocument?.documentElement;
    if (!svgRoot) {
      return;
    }

    const mapLayers: Element[] = Array.from(svgRoot.querySelectorAll(".map-layer"));
    if (!mapLayers.length) {
      return;
    }

    if (!layerClass) {
      svgRoot.classList.remove("has-active");
      mapLayers.forEach((layer) => layer.classList.remove("is-active"));
      return;
    }

    svgRoot.classList.add("has-active");
    mapLayers.forEach((layer) => {
      layer.classList.toggle("is-active", layer.classList.contains(layerClass));
    });

    const activeLayer = mapLayers.find((layer) => layer.classList.contains(layerClass));
    if (activeLayer?.parentElement) {
      activeLayer.parentElement.appendChild(activeLayer);
    }
  };

  const updateStrukturPagination = () => {
    const slider = strukturSliderRef.current;
    if (!slider) return;

    const totalPages = Math.max(1, Math.ceil(slider.scrollWidth / slider.clientWidth));
    const maxScroll = slider.scrollWidth - slider.clientWidth;

    setStrukturTotalPages(totalPages);

    if (maxScroll <= 0 || totalPages === 1) {
      setActiveStrukturPage(0);
      return;
    }

    const ratio = slider.scrollLeft / maxScroll;
    const page = Math.round(ratio * (totalPages - 1));
    setActiveStrukturPage(Math.min(totalPages - 1, Math.max(0, page)));
  };

  const handleStrukturScroll = (
    event: React.UIEvent<HTMLDivElement, UIEvent>,
  ) => {
    const { scrollLeft, scrollWidth, clientWidth } = event.currentTarget;
    const totalPages = Math.max(1, Math.ceil(scrollWidth / clientWidth));
    const maxScroll = scrollWidth - clientWidth;

    if (maxScroll <= 0 || totalPages === 1) {
      setStrukturTotalPages(totalPages);
      setActiveStrukturPage(0);
      return;
    }

    const ratio = scrollLeft / maxScroll;
    const page = Math.round(ratio * (totalPages - 1));

    setStrukturTotalPages(totalPages);
    setActiveStrukturPage(Math.min(totalPages - 1, Math.max(0, page)));
  };

  const goToStrukturPage = (page: number) => {
    const slider = strukturSliderRef.current;
    if (!slider) return;

    const maxScroll = slider.scrollWidth - slider.clientWidth;
    const boundedPage = Math.min(strukturTotalPages - 1, Math.max(0, page));
    const divisor = Math.max(1, strukturTotalPages - 1);
    const targetLeft = (boundedPage / divisor) * maxScroll;

    slider.scrollTo({
      left: targetLeft,
      behavior: "smooth",
    });
  };

  const goToPrevStrukturPage = () => {
    goToStrukturPage(activeStrukturPage - 1);
  };

  const goToNextStrukturPage = () => {
    goToStrukturPage(activeStrukturPage + 1);
  };

  useEffect(() => {
    updateStrukturPagination();

    const onResize = () => updateStrukturPagination();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const mapObject = combinedMapObjectRef.current;
    if (!mapObject) {
      return;
    }

    const handleMapLoad = () => {
      setCombinedMapActiveLayer(null);
      setHoveredMapMarkerId(null);
      setPinnedMapMarkerId(null);
    };

    mapObject.addEventListener("load", handleMapLoad);

    return () => {
      mapObject.removeEventListener("load", handleMapLoad);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        yearDropdownRef.current &&
        !yearDropdownRef.current.contains(event.target as Node)
      ) {
        setIsYearDropdownOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsYearDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-[#0B281F] pb-5 pt-6 text-[#F4F3EF] h-screen md:pb-0 md:pt-0">
        <div className="hero-float pointer-events-none absolute -right-28 -top-44 h-130 w-130 rounded-full bg-[#006045]/30 blur-[110px]" />
        <div className="hero-float pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-[#F0B100]/16 blur-[90px] [animation-delay:900ms]" />

        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 px-4 md:h-full md:items-center md:px-10 md:py-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,400px)] lg:gap-10">
          <div className="max-w-155 pt-0 md:pt-1">
            <div className="hero-reveal inline-flex items-center rounded-full border border-[#006045] bg-[#004F3B]/55 px-3 py-1">
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#FDC700]/70" />
              <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-[#A4F4CF] md:text-[10px]">
                Website Resmi Pemerintah Desa
              </span>
            </div>

            <h1
              className="hero-reveal mt-3 max-w-132 text-[40px] font-bold leading-[1.02] tracking-[0.052em] md:text-[56px] lg:text-[64px] [animation-delay:120ms]"
              style={{ fontFamily: "var(--font-upakarti)" }}
            >
              <span className="block">Membangun Desa,</span>
              <span className="relative mt-2 block text-[#00D492]">
                Mensejahterakan
                <span className="absolute -bottom-1 left-[34%] h-0.75 w-[44%] rounded-full bg-[#F0B100] md:h-1" />
              </span>
              <span className="mt-2 block">Warga</span>
            </h1>

            <p className="hero-reveal mt-3 max-w-140 text-[11px] font-light leading-5 text-[#A4F4CF]/80 md:text-[13px] md:leading-6 [animation-delay:220ms]">
              Selamat datang di portal informasi digital Desa Asri. Kami
              berkomitmen memberikan pelayanan publik yang transparan, cepat,
              dan mudah diakses bagi seluruh masyarakat.
            </p>

            <div className="hero-reveal mt-4 flex flex-wrap items-center gap-2.5 [animation-delay:320ms]">
              <Link
                href="/layanan-masyarakat"
                className="inline-flex h-9 items-center rounded-full bg-[#F0B100] px-4.5 text-[12px] font-bold text-[#0B281F] shadow-[0_8px_12px_rgba(240,177,0,0.18),0_3px_5px_rgba(240,177,0,0.14)] transition-transform duration-300 hover:-translate-y-0.5 md:h-10 md:px-5 md:text-[13px]"
              >
                Layanan Mandiri <span className="ml-2">→</span>
              </Link>
              <Link
                href="/profil"
                className="inline-flex h-9 items-center rounded-full border border-[#007A55] px-4.5 text-[12px] font-medium text-[#F4F3EF] transition-colors duration-300 hover:bg-[#007A55]/25 md:h-10 md:px-5 md:text-[13px]"
              >
                Profil Desa
              </Link>
            </div>

            <div className="hero-reveal mt-5 grid grid-cols-1 gap-2.5 border-t border-[#006045]/55 pt-3 [animation-delay:420ms] sm:grid-cols-3 sm:gap-3">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#00D492]/70 md:text-[11px]">
                  Luas Wilayah
                </p>
                <p className="mt-1 font-[Georgia,serif] text-[22px] leading-tight md:text-[24px]">
                  12.5 km²
                </p>
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#00D492]/70 md:text-[11px]">
                  Batas Wilayah
                </p>
                <p className="mt-1 font-[Georgia,serif] text-[22px] leading-tight md:text-[24px]">
                  4 Desa
                </p>
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#00D492]/70 md:text-[11px]">
                  Jumlah Penduduk
                </p>
                <p className="mt-1 font-[Georgia,serif] text-[22px] leading-tight md:text-[24px]">
                  3.500+
                </p>
              </div>
            </div>
          </div>

          <div className="hero-reveal relative mx-auto w-full max-w-sm pt-2 [animation-delay:180ms] lg:pt-0">
            <div className="absolute -right-2 top-4 h-full w-full rotate-2 rounded-4xl bg-[#006045]/30" />
            <div className="absolute -left-3 -top-2 h-full w-full -rotate-2 rounded-4xl border border-[#007A55]/70" />

            <div className="relative h-88 overflow-hidden rounded-4xl bg-linear-to-b from-[#006045] to-[#0B281F] shadow-[0_18px_36px_-12px_rgba(0,0,0,0.25)] md:h-112">
              <img
                src="/img/hero-kepala-desa.png"
                alt="Kepala Desa"
                className="hero-zoom h-full w-full object-cover"
                loading="eager"
              />

              <div className="hero-pulse absolute bottom-3 left-3 right-3 rounded-2xl border border-white/20 bg-black/35 p-2.5 shadow-[0_10px_15px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)] backdrop-blur-[2px] md:bottom-4 md:left-4 md:right-4 md:p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[13px] font-bold leading-5 md:text-sm">Bapak Sutrisno</p>
                    <p className="mt-1 text-[10px] text-[#A4F4CF] md:text-[11px]">Kepala Desa Asri</p>
                  </div>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#F0B100] text-xs font-bold text-[#0B281F]">
                    &quot;
                  </span>
                </div>
                <p className="mt-1.5 text-[10px] italic leading-4 text-[#D0FAE5]/80">
                  &quot;Melayani dengan hati, membangun dengan inovasi untuk
                  kemajuan bersama.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12">
        <div className="relative mx-auto h-80 w-full max-w-7xl overflow-hidden rounded-4xl border border-[#007A55]/40 md:h-96 lg:h-105">
          <div className="absolute inset-0 bg-linear-to-r from-[#005E45] via-[#006548] to-[#005C44]" />
          <svg
            className="pointer-events-none absolute bottom-0 left-0 h-30 w-full md:h-34 lg:h-38"
            viewBox="0 0 1300 220"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0 92 C190 178 375 22 640 84 C905 146 1090 190 1300 132 L1300 220 L0 220 Z"
              fill="#2D7C67"
              fillOpacity="0.9"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col justify-center gap-5 px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-10 lg:py-8">
            <div className="hero-reveal w-full max-w-76 rounded-3xl border border-[#00A172]/35 bg-linear-to-br from-[#0B281F]/98 via-[#004F3B]/96 to-[#006548]/95 p-4 shadow-[0_12px_30px_rgba(0,0,0,0.25)] [animation-delay:120ms] md:p-5 lg:p-6">
              <div className="flex items-center gap-3">
                <div className="hero-float inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0B100] text-[#0B281F] animation-duration-[6s]">
                  <BarChart size={22} strokeWidth={2.5} aria-hidden="true" />
                </div>
                <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#A4F4CF] md:text-xs">
                  Data Terkini 2024
                </p>
              </div>

              <h2 className="font-timeless mt-3 text-[24px] font-bold leading-[1.03] tracking-[0.01em] text-white md:text-[28px]">
                Demografi &amp;
                <br />
                Statistik Desa
              </h2>

              <p className="mt-2.5 max-w-56 text-[11px] leading-5 text-[#A4F4CF]/75 md:text-[13px] md:leading-6">
                Menyajikan data kependudukan yang transparan, akurat, dan
                terintegrasi untuk mendukung perencanaan.
              </p>
            </div>

            <div className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-5 lg:max-w-132 lg:gap-7">
              {statistikDemografi.map((item, index) => (
                <div
                  key={item.label}
                  className={`hero-reveal min-w-0 rounded-xl bg-[#0B281F]/30 p-3 text-center sm:rounded-none sm:bg-transparent sm:p-0 sm:text-left ${
                    index > 0
                      ? "sm:border-l sm:border-[#5EE9B5]/20 sm:pl-4 lg:pl-5"
                      : ""
                  }`}
                  style={{ animationDelay: `${260 + index * 120}ms` }}
                >
                  <p className="font-[Georgia,serif] text-[30px] leading-none tracking-[0.01em] text-white md:text-[36px] md:leading-9">
                    {item.angka}
                  </p>
                  <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-[#FFFFFF] md:text-xs">
                    {item.label}
                  </p>
                  <p className="mt-1 text-[10px] leading-4 text-[#FFFFFF]/55 md:text-[11px]">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12">
        <div className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-4xl border border-[#0A6A4E]/50 bg-linear-to-br from-[#0B281F] via-[#195B47] to-[#0B281F] px-5 py-6 text-white shadow-[0_18px_32px_rgba(11,40,31,0.22)] md:px-8 md:py-8 lg:px-10 lg:py-10">
          <div className="grid gap-5 border-b border-[#A4F4CF]/25 pb-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_auto] md:items-start md:gap-7">
            <h2 className="font-timeless font-bold text-[34px] leading-[0.95] md:text-[42px] lg:text-[46px]">
              <span className="block">Peta &amp;</span>
              <span className="block">Batas Wilayah</span>
            </h2>

            <p className="max-w-none text-[13px] leading-6 text-white/90 md:pt-1 md:text-[15px] md:leading-7 lg:text-[16px]">
              Gambaran visual pembagian administratif per dusun beserta
              batas-batas geografis Desa Asri yang strategis.
            </p>

            <div className="inline-flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-full border-[3px] border-[#F0B100] bg-[#F4F3EF] text-[#0B281F] shadow-[0_8px_16px_rgba(0,0,0,0.2)] md:h-24 md:w-24">
              <p className="text-[16px] font-bold leading-none md:text-[18px]">345</p>
              <p className="mt-1 text-center text-[9px] leading-tight text-[#0B281F]/75 md:text-[10px]">
                Migrasi
                <br />
                Penduduk
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-1">
              {batasWilayahCards.map((item, index) => (
                <div
                  key={item.arah}
                  className="hero-reveal group rounded-2xl border border-white/14 bg-linear-to-br from-white/16 via-white/12 to-white/8 p-3.5 shadow-[inset_8px_-8px_14px_rgba(165,165,165,0.08),inset_-8px_8px_14px_rgba(255,255,255,0.08),0_10px_18px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[#B9FEE0]/35 hover:shadow-[0_20px_24px_rgba(0,0,0,0.2)]"
                  onMouseEnter={() => {
                    setIsBoundaryCardHoverActive(true);
                    setHoveredMapMarkerId(null);
                    setCombinedMapActiveLayer(item.layerClass);
                  }}
                  onMouseLeave={() => {
                    const hasPinned = Boolean(pinnedMapMarkerId);
                    setIsBoundaryCardHoverActive(hasPinned);
                    setCombinedMapActiveLayer(hasPinned ? "layer-5" : null);
                  }}
                  onFocus={() => {
                    setIsBoundaryCardHoverActive(true);
                    setHoveredMapMarkerId(null);
                    setCombinedMapActiveLayer(item.layerClass);
                  }}
                  onBlur={() => {
                    const hasPinned = Boolean(pinnedMapMarkerId);
                    setIsBoundaryCardHoverActive(hasPinned);
                    setCombinedMapActiveLayer(hasPinned ? "layer-5" : null);
                  }}
                  style={{ animationDelay: `${120 + index * 70}ms` }}
                >
                  <div className="inline-flex min-w-24 items-center justify-center rounded-lg bg-[#F0B100] px-4 py-1.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] group-hover:shadow-[0_8px_14px_rgba(240,177,0,0.34)]">
                    <span
                      className="text-[24px] leading-none text-white"
                      style={{ fontFamily: "var(--font-upakarti)" }}
                    >
                      {item.arah}
                    </span>
                  </div>
                  <p className="mt-3 text-[13px] leading-6 text-white/92">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className={`group/mapWrap relative overflow-hidden rounded-3xl border border-white/12 bg-transparent p-2 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_20px_30px_rgba(0,0,0,0.2)] md:p-4 ${isBoundaryCardHoverActive ? "shadow-[0_24px_34px_rgba(0,0,0,0.24)]" : ""}`}>

              <div className={`group/map relative z-10 mx-auto w-full max-w-180 aspect-[1081.5/1033.96] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.015] ${isBoundaryCardHoverActive ? "scale-[1.015]" : ""}`}>
                <object
                  ref={combinedMapObjectRef}
                  type="image/svg+xml"
                  data="/img/peta-batas-wilayah-figma.svg?v=3"
                  aria-label="Peta batas wilayah desa"
                  className={`h-full w-full rounded-xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/map:drop-shadow-[0_20px_34px_rgba(11,40,31,0.28)] ${
                    isMapLayerActive
                      ? "drop-shadow-[0_14px_28px_rgba(11,40,31,0.24)]"
                      : isBoundaryCardHoverActive
                        ? "drop-shadow-[0_18px_30px_rgba(11,40,31,0.22)]"
                      : ""
                  }`}
                >
                  <img
                    src="/img/peta-batas-wilayah-figma.svg?v=3"
                    alt="Peta batas wilayah desa"
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </object>

                <div className="pointer-events-none absolute inset-0 z-20">
                  {dusunMapMarkers.map((marker) => {
                    const isActiveMarker =
                      activeMapMarkerId === marker.id;

                    return (
                      <div
                        key={marker.id}
                        className={`absolute ${isActiveMarker ? "z-50" : "z-10"}`}
                        style={{
                          left: marker.position.left,
                          top: marker.position.top,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <button
                          type="button"
                          aria-label={marker.nama}
                          aria-pressed={isActiveMarker}
                          className={`pointer-events-auto relative flex h-6 w-6 items-center justify-center rounded-full border-2 border-white shadow-[0_0_0_0_rgba(0,212,146,0.35)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A4F4CF]/80 ${
                            isActiveMarker
                              ? "scale-125 bg-[#00D492] shadow-[0_0_0_10px_rgba(0,212,146,0.16),0_10px_20px_rgba(11,40,31,0.24)]"
                              : "bg-[#F0B100] hover:scale-110 hover:bg-[#00D492]"
                          }`}
                          onMouseEnter={() => {
                            setIsBoundaryCardHoverActive(true);
                            setHoveredMapMarkerId(marker.id);
                            setCombinedMapActiveLayer("layer-5");
                          }}
                          onMouseLeave={() => {
                            setIsBoundaryCardHoverActive(Boolean(pinnedMapMarkerId));
                            setHoveredMapMarkerId(null);
                            setCombinedMapActiveLayer(pinnedMapMarkerId ? "layer-5" : null);
                          }}
                          onFocus={() => {
                            setIsBoundaryCardHoverActive(true);
                            setHoveredMapMarkerId(marker.id);
                            setCombinedMapActiveLayer("layer-5");
                          }}
                          onBlur={() => {
                            setIsBoundaryCardHoverActive(Boolean(pinnedMapMarkerId));
                            setHoveredMapMarkerId(null);
                            setCombinedMapActiveLayer(pinnedMapMarkerId ? "layer-5" : null);
                          }}
                          onClick={() => {
                            const nextPinnedId = pinnedMapMarkerId === marker.id ? null : marker.id;
                            setPinnedMapMarkerId(nextPinnedId);
                            setHoveredMapMarkerId(nextPinnedId ? marker.id : null);
                            setIsBoundaryCardHoverActive(Boolean(nextPinnedId));
                            setCombinedMapActiveLayer(nextPinnedId ? "layer-5" : null);
                          }}
                        >
                          <span className="h-2.5 w-2.5 rounded-full bg-white/95" />
                        </button>

                        {isActiveMarker ? (
                          <div
                            className={`absolute z-30 w-54 rounded-2xl border border-white/14 bg-[#F4F3EF] px-4 py-3 text-[#0B281F] shadow-[0_18px_28px_rgba(0,0,0,0.24)] backdrop-blur-md ${markerPopupPlacementClass[marker.popupPlacement]}`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-[13px] font-semibold leading-4">
                                  {marker.nama}
                                </p>
                                <p className="mt-1 text-[8px] text-[#0B281F]/65">
                                  {marker.kepala}
                                </p>
                              </div>
                              <span
                                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                                style={{ backgroundColor: marker.warna }}
                              >
                                {marker.penduduk}
                              </span>
                            </div>
                            <p className="mt-2 text-[11px] leading-5 text-[#0B281F]/82">
                              {marker.keterangan}
                            </p>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="relative z-20 mt-4 grid gap-4 md:mt-0">
                <div
                  className={`rounded-xl bg-[#F4F3EF] text-[#0B281F] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:absolute md:left-[18%] md:top-6 md:z-30 md:w-73 ${
                    isMapLayerActive
                      ? "-translate-y-0.5 shadow-[0_18px_28px_rgba(0,0,0,0.24)]"
                      : "shadow-[0_10px_18px_rgba(0,0,0,0.18)]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-0">
                    <div className="px-4 py-2.5">
                      <p className="text-[14px] font-semibold leading-4 transition-colors duration-500">{activeDusunInfo.nama}</p>
                      <p className="mt-1 text-[8px] text-[#0B281F]/65">{activeDusunInfo.kepala}</p>
                    </div>
                    <div className="flex h-full items-center gap-2 rounded-r-xl bg-[#F0B100] px-3 py-2 text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                      <span className="text-[11px] font-bold">{activeDusunInfo.penduduk}</span>
                      <span className="text-[9px] leading-tight">Penduduk</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-[14px] border border-[#00A172]/45 bg-linear-to-r from-[#E0C02C]/36 via-[#1E7B5F]/72 to-[#2E9A70]/82 p-4 shadow-[0_12px_18px_rgba(0,0,0,0.2)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:absolute md:bottom-3 md:right-3 md:z-30 md:w-73 md:hover:-translate-y-1 md:hover:shadow-[0_20px_26px_rgba(0,0,0,0.24)]">
                  <h3 className="font-timeless text-[26px] leading-none text-[#F4F3EF] md:text-[34px]">
                    Legenda Dusun
                  </h3>
                  <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                    {dusunMapMarkers.map((marker) => {
                      const isActive = activeMapMarkerId === marker.id;

                      return (
                        <button
                          key={marker.id}
                          type="button"
                          className={`group/legend flex items-center gap-2 rounded-lg border p-1.5 text-left transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-[#0B281F]/18 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A4F4CF]/75 ${
                            isActive
                              ? "border-[#8EE7C5]/45 bg-[#0B281F]/22 shadow-[0_10px_16px_rgba(0,0,0,0.18)]"
                              : "border-white/10 bg-transparent"
                          }`}
                          aria-label={`Legenda ${marker.nama}`}
                          aria-pressed={isActive}
                          onMouseEnter={() => {
                            setIsBoundaryCardHoverActive(true);
                            setHoveredMapMarkerId(marker.id);
                            setCombinedMapActiveLayer("layer-5");
                          }}
                          onMouseLeave={() => {
                            setIsBoundaryCardHoverActive(Boolean(pinnedMapMarkerId));
                            setHoveredMapMarkerId(null);
                            setCombinedMapActiveLayer(pinnedMapMarkerId ? "layer-5" : null);
                          }}
                          onFocus={() => {
                            setIsBoundaryCardHoverActive(true);
                            setHoveredMapMarkerId(marker.id);
                            setCombinedMapActiveLayer("layer-5");
                          }}
                          onBlur={() => {
                            setIsBoundaryCardHoverActive(Boolean(pinnedMapMarkerId));
                            setHoveredMapMarkerId(null);
                            setCombinedMapActiveLayer(pinnedMapMarkerId ? "layer-5" : null);
                          }}
                          onClick={() => {
                            const nextPinnedId = pinnedMapMarkerId === marker.id ? null : marker.id;
                            setPinnedMapMarkerId(nextPinnedId);
                            setHoveredMapMarkerId(nextPinnedId ? marker.id : null);
                            setIsBoundaryCardHoverActive(Boolean(nextPinnedId));
                            setCombinedMapActiveLayer(nextPinnedId ? "layer-5" : null);
                          }}
                        >
                          <span
                            className={`h-2.5 w-2.5 shrink-0 rounded-xs transition-all duration-500 ${
                              isActive ? "scale-125" : "scale-100"
                            }`}
                            style={{ backgroundColor: marker.warna }}
                          />

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[11px] text-[#F4F3EF] transition-all duration-500 md:text-[12px]">
                              {marker.nama}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3 md:gap-5">
            <div className="group/stat flex overflow-hidden rounded-md bg-[#0B281F]/50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-[#0B281F]/58 hover:shadow-[0_14px_20px_rgba(0,0,0,0.22)]">
              <div className="bg-[#F4F3EF] px-3 py-2 text-[#0B281F]">
                <p className="text-[12px] font-semibold">Total Penduduk</p>
                <p className="text-[9px] text-[#0B281F]/60">yang sudah terdata</p>
              </div>
              <div className="flex flex-1 items-center justify-between px-3">
                <div className="flex items-center gap-1.5 text-[#A4F4CF] transition-transform duration-500 group-hover/stat:scale-[1.08]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#A4F4CF]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#A4F4CF]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#A4F4CF]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#A4F4CF]" />
                </div>
                <p className="text-[14px] font-semibold text-[#A4F4CF] transition-all duration-500">{activeMapMarkerId ? activeDusunInfo.penduduk : "3520"}</p>
              </div>
            </div>

            <div className="group/stat flex overflow-hidden rounded-md bg-[#F0B100]/95 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-[#F3B400] hover:shadow-[0_14px_20px_rgba(0,0,0,0.22)]">
              <div className="bg-[#F4F3EF] px-3 py-2 text-[#0B281F]">
                <p className="text-[12px] font-semibold">Laki-laki</p>
                <p className="text-[9px] text-[#0B281F]/60">yang sudah terdata</p>
              </div>
              <div className="flex flex-1 items-center justify-between px-3 text-[#F4F3EF]">
                <div className="flex items-center gap-1.5 transition-transform duration-500 group-hover/stat:scale-[1.08]">
                  <span className="h-2.5 w-2.5 rounded-full bg-white" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white" />
                </div>
                <p className="text-[14px] font-semibold transition-all duration-500">{activeMapMarkerId ? activeDusunInfo.laki_laki : "1408"}</p>
              </div>
            </div>

            <div className="group/stat flex overflow-hidden rounded-md bg-[#0B281F]/75 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-[#0B281F]/85 hover:shadow-[0_14px_20px_rgba(0,0,0,0.22)]">
              <div className="bg-[#F4F3EF] px-3 py-2 text-[#0B281F]">
                <p className="text-[12px] font-semibold">Perempuan</p>
                <p className="text-[9px] text-[#0B281F]/60">yang sudah terdata</p>
              </div>
              <div className="flex flex-1 items-center justify-between px-3 text-[#A4F4CF]">
                <div className="flex items-center gap-1.5 transition-transform duration-500 group-hover/stat:scale-[1.08]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#A4F4CF]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#A4F4CF]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#A4F4CF]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#A4F4CF]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#A4F4CF]" />
                </div>
                <p className="text-[14px] font-semibold transition-all duration-500">{activeMapMarkerId ? activeDusunInfo.perempuan : "2112"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="bg-white px-4 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12">
        <div className="mx-auto w-full max-w-7xl">
          {/* Header */}
          <div className="mb-8 grid gap-4 border-b border-[#0B281F]/10 pb-8 md:mb-10 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.45fr)_auto] md:items-start md:gap-6">
            <h2 className="hero-reveal font-timeless text-[26px] font-bold leading-[1.06] text-[#0B281F] md:text-[34px] lg:text-[42px]">
              <span className="block">Anggaran Pendapatan</span>
              <span className="block">Dan Belanja Daerah</span>
            </h2>

            <p className="hero-reveal max-w-none pt-0.5 text-[12px] leading-6 text-[#0B281F]/80 md:text-[13px] md:leading-7 [animation-delay:120ms]">
              Kelompok Umur merupakan penyajian data penduduk berdasarkan
              rentang usia tertentu yang ditampilkan secara transparan, akurat,
              dan terintegrasi guna mendukung proses perencanaan pembangunan,
              pengambilan kebijakan, serta evaluasi program secara tepat
              sasaran.
            </p>

            <button
              type="button"
              aria-label="Informasi APBDes"
              className="hero-reveal inline-flex h-11 w-11 shrink-0 items-center justify-center self-start rounded-full bg-[#0B281F] text-[#F4F3EF] shadow-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-lg [animation-delay:180ms] md:h-12 md:w-12"
            >
              <Info size={20} strokeWidth={2.5} />
            </button>
          </div>

          {/* APBDes Card */}
          <div className="hero-reveal group/apbdes relative overflow-visible rounded-3xl p-6 text-[#F4F3EF] shadow-[0_14px_28px_rgba(0,0,0,0.18)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_20px_34px_rgba(0,0,0,0.2)] [animation-delay:200ms] sm:p-7 md:p-8 lg:p-9">
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-linear-to-r from-[#005E45] via-[#006548] to-[#005C44] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/apbdes:scale-[1.01]" />
              <svg
                className="apbdes-wave absolute bottom-0 left-0 h-26 w-full md:h-30"
                viewBox="0 0 1300 220"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M0 96 C180 176 390 18 650 86 C920 156 1110 184 1300 136 L1300 220 L0 220 Z"
                  fill="#2D7C67"
                  fillOpacity="0.88"
                />
              </svg>
            </div>
            {/* Title & Year Selector */}
            <div className="relative z-30 mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center md:gap-6">
              <h3 className="hero-reveal font-timeless text-[28px] font-bold leading-tight [animation-delay:260ms] md:text-[34px]">
                APBDes Tahun {selectedApbdesYear}
              </h3>

              <div
                ref={yearDropdownRef}
                className="hero-reveal relative inline-flex items-center [animation-delay:320ms]"
              >
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={isYearDropdownOpen}
                  aria-label="Pilih tahun APBDes"
                  onClick={() => setIsYearDropdownOpen((prev) => !prev)}
                  className="group/year inline-flex min-w-42 items-center justify-between gap-3 rounded-full border border-[#D3E7DE]/70 bg-linear-to-b from-[#F2F7F4] to-[#E0ECE6] px-5 py-2.5 text-[12px] font-semibold text-[#20332F] shadow-[0_8px_16px_rgba(0,0,0,0.2)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_11px_20px_rgba(0,0,0,0.24)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4F4CF] md:text-[13px]"
                >
                  <span>Tahun {selectedApbdesYear}</span>
                  <ChevronDown
                    size={16}
                    strokeWidth={2.5}
                    className={`text-[#20332F] transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isYearDropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                <div
                  className={`absolute right-0 top-[calc(100%+12px)] z-60 w-44 origin-top-right rounded-2xl border border-[#D3E7DE]/70 bg-[#EEF5F1]/95 p-2 shadow-[0_18px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isYearDropdownOpen
                      ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                      : "pointer-events-none -translate-y-1 scale-95 opacity-0"
                  }`}
                >
                  <ul role="listbox" aria-label="Daftar tahun APBDes" className="space-y-1">
                    {apbdesYears.map((year, index) => {
                      const isActive = selectedApbdesYear === year;

                      return (
                        <li key={year}>
                          <button
                            type="button"
                            role="option"
                            aria-selected={isActive}
                            onClick={() => {
                              setSelectedApbdesYear(year);
                              setIsYearDropdownOpen(false);
                            }}
                            className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[12px] font-medium transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:text-[13px] ${
                              isActive
                                ? "bg-[#0B281F] text-[#A4F4CF]"
                                : "text-[#26423B] hover:bg-[#DCEBE4]"
                            }`}
                            style={{ transitionDelay: isYearDropdownOpen ? `${index * 24}ms` : "0ms" }}
                          >
                            <span>Tahun {year}</span>
                            {isActive ? (
                              <span className="h-1.75 w-1.75 rounded-full bg-[#00D492]" />
                            ) : null}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,0.95fr)] lg:items-center lg:gap-8">
              {/* Glass Statistics */}
              <div className="relative">
                <div className="pointer-events-none absolute left-8 right-8 top-1/2 hidden h-10 -translate-y-1/2 rounded-full bg-white/10 blur-xl md:block" />

                <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:gap-0">
                  {apbdesStatistik.map((item, index) => (
                    <div
                      key={item.label}
                      className={`hero-reveal relative flex h-40 flex-1 flex-col items-center justify-center rounded-full border border-white/22 bg-white/20 px-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_12px_24px_rgba(0,0,0,0.16)] backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:z-20 hover:-translate-y-1 hover:scale-[1.015] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_18px_30px_rgba(0,0,0,0.24)] md:h-44 ${
                        index > 0 ? "md:-ml-5" : ""
                      }`}
                      style={{ animationDelay: `${420 + index * 120}ms` }}
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#F4F3EF]/82">
                        Rp.
                      </p>
                      <p className="mt-1 font-[Georgia,serif] text-[38px] font-bold leading-none md:text-[42px]">
                        {item.value}
                      </p>
                      <p className="mt-2 text-[13px] font-semibold leading-[1.2] text-[#F4F3EF]/95 md:text-[14px]">
                        {item.label.replace("Total ", "")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description & Button */}
              <div className="flex flex-col items-start gap-5 lg:pl-2">
                <p className="hero-reveal max-w-80 text-[12px] leading-6 text-[#F4F3EF]/92 [animation-delay:560ms] md:text-[13px] md:leading-7">
                  Pencatatan dan pengelolaan Anggaran Pendapatan dan Belanja
                  Desa (APBDes) untuk periode Januari {selectedApbdesYear}
                  hingga Desember {selectedApbdesYear}, desa selama satu tahun
                  anggaran berjalan.
                </p>

                <Link
                  href="/apbdes"
                  className="hero-reveal inline-flex w-fit items-center gap-2 rounded-full bg-[#F0B100] px-6 py-2.5 text-[12px] font-bold text-[#0B281F] shadow-[0_10px_20px_rgba(240,177,0,0.42)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_13px_24px_rgba(240,177,0,0.5)] [animation-delay:660ms] md:px-7 md:py-3 md:text-[13px]"
                >
                  Lihat Selengkapnya
                  <ArrowRight size={17} strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-8 grid gap-4 border-b border-[#0B281F]/10 pb-8 md:mb-10 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.45fr)_auto] md:items-start md:gap-6">
            <h2 className="hero-reveal font-timeless text-[26px] font-bold leading-[1.06] text-[#0B281F] md:text-[34px] lg:text-[42px]">
              <span className="block">Mengenal Lebih</span>
              <span className="block">Dekat Kepala Desa</span>
            </h2>

            <p className="hero-reveal max-w-none pt-0.5 text-[12px] leading-6 text-[#0B281F]/80 md:text-[13px] md:leading-7 [animation-delay:120ms]">
              Menyajikan profil singkat pimpinan desa sebagai sumber informasi
              publik yang transparan, akurat, dan terintegrasi untuk mendukung
              perencanaan pembangunan serta pengambilan kebijakan yang tepat
              sasaran.
            </p>

            <button
              type="button"
              aria-label="Informasi kepala desa"
              className="hero-reveal inline-flex h-11 w-11 shrink-0 items-center justify-center self-start rounded-full bg-[#0B281F] text-[#F4F3EF] shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg [animation-delay:180ms] md:h-12 md:w-12"
            >
              <Info size={20} strokeWidth={2.5} />
            </button>
          </div>

          <div className="hero-reveal relative overflow-visible rounded-3xl bg-[#006548] px-6 py-7 text-[#F4F3EF] shadow-[0_14px_28px_rgba(0,0,0,0.18)] [animation-delay:220ms] sm:px-7 sm:py-8 md:px-8 lg:px-8 lg:py-0">
            <div className="grid items-end gap-6 lg:min-h-90 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-8">
              <div className="hero-reveal max-w-xl pb-0 [animation-delay:300ms] lg:pb-10">
                <p className="hero-reveal text-[14px] font-semibold text-[#D4FBEA] [animation-delay:320ms]">Kepala Desa</p>
                <h3
                  className="hero-reveal mt-2 text-[42px] font-bold leading-[1.08] tracking-[0.052em] md:text-[56px] lg:text-[66px] [animation-delay:360ms]"
                  style={{ fontFamily: "var(--font-upakarti)" }}
                >
                  Majang Budi Budiana
                </h3>
                <p className="hero-reveal mt-4 text-[13px] leading-7 text-[#F4F3EF]/92 [animation-delay:400ms]">
                  Kelompok Umur merupakan penyajian data penduduk berdasarkan
                  rentang usia tertentu yang ditampilkan secara transparan,
                  akurat, dan terintegrasi guna mendukung proses perencanaan
                  pembangunan, pengambilan kebijakan, serta evaluasi program
                  secara tepat sasaran.
                </p>

                <Link
                  href="/profil"
                  className="hero-reveal mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#F0B100] px-6 py-2.5 text-[13px] font-bold text-[#0B281F] shadow-[0_10px_20px_rgba(240,177,0,0.42)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_13px_24px_rgba(240,177,0,0.5)] [animation-delay:460ms]"
                >
                  Lihat Selengkapnya
                  <ArrowRight size={17} strokeWidth={2.5} />
                </Link>
              </div>

              <div className="hero-reveal relative mx-auto h-72 w-full max-w-xs transition-all duration-300 hover:-translate-y-3 hover:scale-105 [animation-delay:300ms] sm:h-80 sm:max-w-sm md:h-90 md:max-w-md lg:h-full lg:max-w-none">
                <img
                  src={kepalaDesaImage}
                  alt="Foto Kepala Desa"
                  className="absolute -bottom-8 -left-6 z-10 h-[116%] w-auto max-w-none object-contain sm:-left-4 lg:left-0 lg:-top-12 lg:bottom-auto lg:h-[114%]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-white px-4 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-12">
            <div className="hero-reveal flex flex-col gap-8 [animation-delay:220ms]">
              <div className="flex flex-col gap-4">
                <h2 className="hero-reveal font-timeless text-[32px] font-bold leading-tight text-[#0B281F] md:text-[42px] [animation-delay:240ms]">
                  <span className="block">Struktur</span>
                  <span className="block">Tata Kelola</span>
                  <span className="block">Desa</span>
                </h2>
                <p className="hero-reveal text-[13px] leading-6 text-[#0B281F]/80 md:text-[14px] [animation-delay:280ms]">
                  Struktur kepemimpinan Desa Pameutingan
                </p>
              </div>
              <Link
                href="/struktur"
                className="hero-reveal inline-flex w-fit items-center gap-2 rounded-full bg-[#F0B100] px-6 py-2.5 text-[12px] font-bold text-[#0B281F] shadow-[0_10px_15px_rgba(240,177,0,0.2),0_4px_6px_rgba(240,177,0,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_13px_24px_rgba(240,177,0,0.5)] [animation-delay:320ms] md:text-[13px]"
              >
                Lihat Selengkapnya
                <ArrowRight size={18} strokeWidth={2.5} />
              </Link>
            </div>

            <div className="flex flex-col">
              <div
                ref={strukturSliderRef}
                onScroll={handleStrukturScroll}
                className="hero-reveal relative -mb-2 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto overflow-y-visible px-4 pb-10 pt-6 [animation-delay:300ms] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:gap-6"
              >
                {strukturTataKelola.map((item) => (
                  <div
                    key={item.nama}
                    className="hero-reveal flex shrink-0 snap-start flex-col items-center"
                    style={{ animationDelay: `${item.delay}ms` }}
                  >
                    <div
                      className={`group relative h-72 ${item.widthClass} ${item.hoverWidthClass} origin-center overflow-visible rounded-3xl transition-[width,transform] duration-400 will-change-transform sm:h-80 md:h-90 lg:h-90`}
                    >
                      <div className="absolute inset-0 rounded-3xl border border-[#D4FBEA]/25 bg-linear-to-b from-[#004F3B] to-[#006548] shadow-lg transition-shadow duration-500 ease-out group-hover:shadow-2xl" />
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="absolute inset-0 z-10 h-full w-full rounded-3xl object-cover transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 z-20 rounded-3xl bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute bottom-0 z-30 flex min-h-18 w-full flex-col items-center justify-end px-3 pb-4 text-center text-white">
                        <p className="font-[Georgia,serif] text-xl font-bold md:text-2xl">{item.jabatan}</p>
                        <p className="text-sm font-medium text-[#D4FBEA] md:text-base">{item.nama}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-[#FFFFFF] px-4 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14 ">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 lg:gap-10 ">
          <div className="mb-8 flex flex-col gap-6 border-b border-[#0B281F]/10 pb-8 md:mb-10 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
            <h2 className="hero-reveal font-timeless max-w-99 text-[26px] font-bold leading-[1.06] text-[#0B281F] md:text-[34px] lg:text-[42px] [animation-delay:80ms]">
              <span className="block">Informasi Terkini</span>
              <span className="block">Desa Pameutingan</span>
            </h2>

            <p className="hero-reveal max-w-147 pt-0.5 text-[12px] leading-6 text-[#0B281F]/80 md:text-[13px] md:leading-7 lg:pt-1 [animation-delay:150ms]">
              Menyajikan ringkasan kabar terbaru desa secara transparan,
              akurat, dan mudah diakses agar warga dapat mengikuti aktivitas,
              program, serta perkembangan desa secara cepat.
            </p>

            <button
              type="button"
              aria-label="Lihat informasi terkini"
              className="hero-reveal inline-flex h-11 w-11 shrink-0 items-center justify-center self-start rounded-full bg-[#0B281F] text-[#F4F3EF] shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg [animation-delay:180ms] md:h-12 md:w-12"
            >
              <ArrowRight size={20} strokeWidth={2.5} />
            </button>
          </div>

          <div className="grid justify-items-center gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-x-8 xl:gap-y-8">
            {informasiTerkiniCards.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="hero-reveal w-full max-w-[288px]"
                style={{ animationDelay: `${220 + index * 70}ms` }}
              >
                <InformasiTerkiniCard
                  title={item.title}
                  description={item.description}
                  image={item.image}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <PotensiSection />

      <GaleriSection />
    </>
  );
}
