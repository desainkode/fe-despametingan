"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight, Info } from "lucide-react";

const demografiBg =
  "https://www.figma.com/api/mcp/asset/96e9bc4a-3d4f-4543-838f-e3be1685b00d";
const demografiIcon =
  "https://www.figma.com/api/mcp/asset/21469863-0309-49b5-92b2-da4248a17030";
const kepalaDesaImage =
  "https://www.figma.com/api/mcp/asset/54a3370e-5465-41c4-b4a4-52cb6b9a36f6";
const strukturKepalaDesaImg =
  "https://www.figma.com/api/mcp/asset/0895496f-e839-41bf-8153-dd47d048090f";
const strukturSekDesImg =
  "https://www.figma.com/api/mcp/asset/d14230b2-1a35-4453-b313-abd9c41dde1c";
const strukturKaPelImg1 =
  "https://www.figma.com/api/mcp/asset/c2f5f60e-b119-47f3-be75-eb6638d020f7";
const strukturKaPelImg2 =
  "https://www.figma.com/api/mcp/asset/88a11b2d-c2ee-47b3-9500-21d8ee9e0ac8";
const informasiTerkiniImage =
  "https://www.figma.com/api/mcp/asset/a4641f83-6a04-4589-9a97-55016b8a2e2c";
const informasiTerkiniBadgeIcon =
  "https://www.figma.com/api/mcp/asset/ff67f71c-6c82-4894-bf18-73bc3cf936fc";

const informasiTerkiniCards = Array.from({ length: 8 }, () => ({
  title: "Panen Raya Bulan Januari Melimpah",
  description:
    "Tanah yang subur jadi faktor utama melimpahnya hasil tani",
}));

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
};

function InformasiTerkiniCard({ title, description }: InformasiTerkiniCardProps) {
  return (
    <button
      type="button"
      className="group relative flex h-93.25 w-full max-w-72 flex-col items-start gap-3 rounded-[17px] bg-[#D9D9D9] px-5.75 py-5.5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_32px_rgba(11,40,31,0.12)]"
    >
      <div className="flex w-full items-start justify-between gap-4">
        <h3 className="max-w-43 font-[Georgia,serif] text-[20px] font-bold leading-[1.28] text-[#004F3B]">
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
          src={informasiTerkiniImage}
          alt="Panen raya dan hasil tani"
          className="h-full w-full rounded-[7px] object-cover"
          loading="lazy"
        />

        <span className="absolute bottom-5 left-5 inline-flex h-11.25 w-11.25 items-center justify-center rounded-full bg-[#004F3B] text-white shadow-[0_10px_18px_rgba(0,0,0,0.18)]">
          <img
            src={informasiTerkiniBadgeIcon}
            alt="Ikon pertanian"
            className="h-4 w-4 object-contain"
            loading="lazy"
          />
        </span>
      </div>
    </button>
  );
}

export default function Home() {
  const [selectedApbdesYear, setSelectedApbdesYear] = useState<number>(2026);
  const [activeStrukturPage, setActiveStrukturPage] = useState<number>(0);
  const [strukturTotalPages, setStrukturTotalPages] = useState<number>(1);
  const strukturSliderRef = useRef<HTMLDivElement | null>(null);

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
                src="https://www.figma.com/api/mcp/asset/cf08a028-4907-4714-9bd2-aa3783b7175a"
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
          <img
            src={demografiBg}
            alt="Latar demografi"
            className="hero-pan h-full w-full object-cover"
            loading="lazy"
          />

          <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/45 via-transparent to-black/25" />

          <div className="absolute inset-0 flex flex-col justify-center gap-5 px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-10 lg:py-8">
            <div className="hero-reveal w-full max-w-76 rounded-3xl border border-[#007A55]/35 bg-[#0B281F]/92 p-4 shadow-[0_12px_30px_rgba(0,0,0,0.25)] [animation-delay:120ms] md:p-5 lg:p-6">
              <div className="flex items-center gap-3">
                <div className="hero-float inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0B100] [animation-duration:6s]">
                  <img
                    src={demografiIcon}
                    alt="Ikon data"
                    className="h-6 w-6 object-contain"
                    loading="lazy"
                  />
                </div>
                <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#A4F4CF] md:text-xs">
                  Data Terkini 2024
                </p>
              </div>

              <h2 className="mt-3 font-[Georgia,serif] text-[24px] font-bold leading-[1.03] tracking-[0.01em] text-white md:text-[28px]">
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
        <div className="mx-auto w-full max-w-7xl">
          {/* Header */}
          <div className="mb-8 grid gap-4 border-b border-[#0B281F]/10 pb-8 md:mb-10 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.45fr)_auto] md:items-start md:gap-6">
            <h2 className="hero-reveal font-[Georgia,serif] text-[26px] font-bold leading-[1.06] text-[#0B281F] md:text-[34px] lg:text-[42px]">
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
              className="hero-reveal inline-flex h-11 w-11 shrink-0 items-center justify-center self-start rounded-full bg-[#0B281F] text-[#F4F3EF] shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg [animation-delay:180ms] md:h-12 md:w-12"
            >
              <Info size={20} strokeWidth={2.5} />
            </button>
          </div>

          {/* APBDes Card */}
          <div className="hero-reveal rounded-3xl bg-[#006548] p-6 text-[#F4F3EF] shadow-[0_14px_28px_rgba(0,0,0,0.18)] [animation-delay:200ms] sm:p-7 md:p-8 lg:p-9">
            {/* Title & Year Selector */}
            <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center md:gap-6">
              <h3 className="hero-reveal font-[Georgia,serif] text-[28px] font-bold leading-tight [animation-delay:260ms] md:text-[34px]">
                APBDes Tahun {selectedApbdesYear}
              </h3>

              <label className="hero-reveal relative inline-flex items-center [animation-delay:320ms]">
                <span className="sr-only">Pilih tahun APBDes</span>
                <select
                  aria-label="Pilih tahun APBDes"
                  value={selectedApbdesYear}
                  onChange={(event) =>
                    setSelectedApbdesYear(Number(event.target.value))
                  }
                  className="min-w-39 appearance-none rounded-full bg-[#E8ECE9] px-5 py-2.5 pr-11 text-[12px] font-semibold text-[#20332F] shadow-[0_8px_16px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_11px_20px_rgba(0,0,0,0.24)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4F4CF] md:text-[13px]"
                >
                  {apbdesYears.map((year) => (
                    <option key={year} value={year}>
                      Tahun {year}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  strokeWidth={2.5}
                  className="pointer-events-none absolute right-4 text-[#20332F]"
                />
              </label>
            </div>

            {/* Content */}
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,0.95fr)] lg:items-center lg:gap-8">
              {/* Glass Statistics */}
              <div className="relative">
                <div className="pointer-events-none absolute left-8 right-8 top-1/2 hidden h-10 -translate-y-1/2 rounded-full bg-white/10 blur-xl md:block" />

                <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:gap-0">
                  {apbdesStatistik.map((item, index) => (
                    <div
                      key={item.label}
                      className={`hero-reveal relative flex h-40 flex-1 flex-col items-center justify-center rounded-full border border-white/22 bg-white/20 px-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_12px_24px_rgba(0,0,0,0.16)] backdrop-blur-sm transition-all duration-300 will-change-transform hover:z-20 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_18px_30px_rgba(0,0,0,0.24)] md:h-44 ${
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
                  className="hero-reveal inline-flex w-fit items-center gap-2 rounded-full bg-[#F0B100] px-6 py-2.5 text-[12px] font-bold text-[#0B281F] shadow-[0_10px_20px_rgba(240,177,0,0.42)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_13px_24px_rgba(240,177,0,0.5)] [animation-delay:660ms] md:px-7 md:py-3 md:text-[13px]"
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
            <h2 className="hero-reveal font-[Georgia,serif] text-[26px] font-bold leading-[1.06] text-[#0B281F] md:text-[34px] lg:text-[42px]">
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
                  className="absolute -bottom-8 -right-6 z-10 h-[116%] w-auto max-w-none object-contain sm:-right-4 lg:-right-12 lg:-top-12 lg:bottom-auto lg:h-[114%]"
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
                <h2 className="hero-reveal font-[Georgia,serif] text-[32px] font-bold leading-tight text-[#0B281F] md:text-[42px] [animation-delay:240ms]">
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
            <h2 className="hero-reveal max-w-99 font-[Georgia,serif] text-[26px] font-bold leading-[1.06] text-[#0B281F] md:text-[34px] lg:text-[42px] [animation-delay:80ms]">
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
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
