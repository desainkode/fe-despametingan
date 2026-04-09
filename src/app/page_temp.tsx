import Link from "next/link";
import { ChevronDown, ArrowRight, Info } from "lucide-react";

const demografiBg =
  "https://www.figma.com/api/mcp/asset/96e9bc4a-3d4f-4543-838f-e3be1685b00d";
const demografiIcon =
  "https://www.figma.com/api/mcp/asset/21469863-0309-49b5-92b2-da4248a17030";
const apbdesWaveShape =
  "https://www.figma.com/api/mcp/asset/c00a4eb9-18d2-4416-98da-fd458a7b0a75";

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

export default function Home() {
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

            <h1 className="hero-reveal mt-3 max-w-132 text-[33px] font-[Georgia,serif] font-semibold leading-[0.94] tracking-[0.03em] md:text-[44px] [animation-delay:120ms]">
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

      <section className="mt-6 bg-white px-4 pb-12 md:mt-0 md:px-10 md:pb-12 pt-12 md:pt-12 lg:mt-12 lg:px-12 lg:pb-16 lg:pt-16">
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

      <section className="bg-white px-4 pb-16 md:px-10 md:pb-16 lg:px-12 lg:pb-20">
        <div className="relative mx-auto w-full max-w-7xl rounded-4xl border border-[#0B281F]/10 bg-[#ECEDE9] p-5 sm:p-6 md:p-8 lg:p-10">
          {/* Header */}
          <div className="mb-8 grid gap-4 md:mb-10 md:gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="hero-reveal font-[Georgia,serif] text-[32px] font-semibold leading-tight text-[#0B281F] md:text-[42px]">
                <span className="block">Anggaran</span>
                <span className="block">Pendapatan & Belanja Daerah</span>
              </h2>
            </div>
            <button
              type="button"
              aria-label="Info APBDes"
              className="hero-reveal inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0B281F] text-[#F4F3EF] shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg [animation-delay:140ms] md:h-12 md:w-12"
            >
              <Info size={20} strokeWidth={2.5} />
            </button>
          </div>

          <p className="hero-reveal mb-6 max-w-2xl text-[11px] leading-5 text-[#0B281F]/85 md:mb-8 md:text-[12px] md:leading-6 [animation-delay:180ms]">
            Kelompok Umur merupakan penyajian data penduduk berdasarkan rentang
            usia tertentu yang ditampilkan secara transparan, akurat, dan
            terintegrasi guna mendukung proses perencanaan pembangunan,
            pengambilan kebijakan, serta evaluasi program secara tepat sasaran.
          </p>

          {/* APBDes Card */}
          <div className="relative overflow-hidden rounded-3xl bg-[#006548] p-6 text-[#F4F3EF] sm:p-7 md:p-8">
            <img
              src={apbdesWaveShape}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-8 left-0 w-full opacity-20"
              loading="lazy"
            />

            {/* Title & Year Dropdown */}
            <div className="relative mb-7 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center md:mb-8">
              <h3 className="font-[Georgia,serif] text-[28px] font-bold text-[#F4F3EF] md:text-[36px]">
                APBDes Tahun 2026
              </h3>
              <button
                type="button"
                aria-label="Pilih tahun APBDes"
                className="inline-flex items-center gap-2 rounded-full bg-[#E8ECE9] px-4 py-2.5 text-sm font-semibold text-[#0B281F] shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg md:px-5"
              >
                Tahun 2026
                <ChevronDown size={16} strokeWidth={2.5} />
              </button>
            </div>

            {/* Statistics Cards & Description */}
            <div className="relative grid gap-6 md:gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
              {/* Cards */}
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
                {apbdesStatistik.map((item, index) => (
                  <div
                    key={item.label}
                    className="hero-reveal flex flex-1 flex-col items-center justify-center rounded-2xl border border-white/25 bg-[#5B9589]/45 px-5 py-6 text-center shadow-[0_8px_16px_rgba(0,0,0,0.15)] backdrop-blur-sm md:py-7"
                    style={{ animationDelay: `${240 + index * 100}ms` }}
                  >
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-[#F4F3EF]/80">
                      Rp
                    </p>
                    <p className="mt-2 font-[Georgia,serif] text-[36px] font-bold leading-none md:text-[44px]">
                      {item.value}
                    </p>
                    <p className="mt-2 text-[13px] font-medium leading-snug text-[#F4F3EF]/95 md:mt-3">
                      {item.label.replace("Total ", "")}
                    </p>
                  </div>
                ))}
              </div>

              {/* Description & Button */}
              <div className="flex flex-col gap-4 md:gap-5">
                <p className="text-[11px] leading-5 text-[#F4F3EF]/90 md:text-[12px] md:leading-6">
                  Pencatatan dan pengelolaan Anggaran Pendapatan dan Belanja
                  Desa (APBDes) untuk periode Januari hingga Desember 2026,
                  desa selama satu tahun anggaran berjalan.
                </p>
                <Link
                  href="/apbdes"
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-[#F0B100] px-5 py-2.5 text-sm font-bold text-[#0B281F] shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg md:px-6 md:py-3 md:text-[13px]"
                >
                  Lihat Selengkapnya
                  <ArrowRight size={16} strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
