import Link from "next/link";

const demografiBg =
  "https://www.figma.com/api/mcp/asset/96e9bc4a-3d4f-4543-838f-e3be1685b00d";
const demografiIcon =
  "https://www.figma.com/api/mcp/asset/21469863-0309-49b5-92b2-da4248a17030";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#0B281F] pb-5 pt-6 text-[#F4F3EF] md:h-[calc(100dvh-4.5rem)] md:pb-0 md:pt-0">
        <div className="pointer-events-none absolute -right-28 -top-44 h-130 w-130 rounded-full bg-[#006045]/30 blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-[#F0B100]/16 blur-[90px]" />

        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 px-4 md:h-full md:items-center md:px-10 md:py-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,400px)] lg:gap-10">
          <div className="max-w-155 pt-0 md:pt-1">
            <div className="inline-flex items-center rounded-full border border-[#006045] bg-[#004F3B]/55 px-3 py-1">
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#FDC700]/70" />
              <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-[#A4F4CF] md:text-[10px]">
                Website Resmi Pemerintah Desa
              </span>
            </div>

            <h1 className="mt-3 max-w-132 text-[33px] font-[Georgia,serif] font-semibold leading-[0.94] tracking-[0.03em] md:text-[44px]">
              <span className="block">Membangun Desa,</span>
              <span className="relative mt-2 block text-[#00D492]">
                Mensejahterakan
                <span className="absolute -bottom-1 left-[34%] h-0.75 w-[44%] rounded-full bg-[#F0B100] md:h-1" />
              </span>
              <span className="mt-2 block">Warga</span>
            </h1>

            <p className="mt-3 max-w-140 text-[11px] font-light leading-5 text-[#A4F4CF]/80 md:text-[13px] md:leading-6">
              Selamat datang di portal informasi digital Desa Asri. Kami
              berkomitmen memberikan pelayanan publik yang transparan, cepat,
              dan mudah diakses bagi seluruh masyarakat.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <Link
                href="/layanan-masyarakat"
                className="inline-flex h-9 items-center rounded-full bg-[#F0B100] px-4.5 text-[12px] font-bold text-[#0B281F] shadow-[0_8px_12px_rgba(240,177,0,0.18),0_3px_5px_rgba(240,177,0,0.14)] md:h-10 md:px-5 md:text-[13px]"
              >
                Layanan Mandiri <span className="ml-2">→</span>
              </Link>
              <Link
                href="/profil"
                className="inline-flex h-9 items-center rounded-full border border-[#007A55] px-4.5 text-[12px] font-medium text-[#F4F3EF] md:h-10 md:px-5 md:text-[13px]"
              >
                Profil Desa
              </Link>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-2.5 border-t border-[#006045]/55 pt-3 sm:grid-cols-3 sm:gap-3">
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

          <div className="relative mx-auto w-full max-w-sm pt-2 lg:pt-0">
            <div className="absolute -right-2 top-4 h-full w-full rotate-2 rounded-4xl bg-[#006045]/30" />
            <div className="absolute -left-3 -top-2 h-full w-full -rotate-2 rounded-4xl border border-[#007A55]/70" />

            <div className="relative h-88 overflow-hidden rounded-4xl bg-linear-to-b from-[#006045] to-[#0B281F] shadow-[0_18px_36px_-12px_rgba(0,0,0,0.25)] md:h-112">
              <img
                src="https://www.figma.com/api/mcp/asset/cf08a028-4907-4714-9bd2-aa3783b7175a"
                alt="Kepala Desa"
                className="h-full w-full object-cover"
                loading="eager"
              />

              <div className="absolute bottom-3 left-3 right-3 rounded-2xl border border-white/20 bg-black/35 p-2.5 shadow-[0_10px_15px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)] backdrop-blur-[2px] md:bottom-4 md:left-4 md:right-4 md:p-3">
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

      <section className="mt-6 bg-[#0B281F] px-4 pb-12 md:mt-8 md:px-10 md:pb-16">
        <div className="relative mx-auto h-80 w-full max-w-7xl overflow-hidden rounded-4xl border border-[#007A55]/40 md:h-96 lg:h-105">
          <img
            src={demografiBg}
            alt="Latar demografi"
            className="h-full w-full object-cover"
            loading="lazy"
          />

          <div className="absolute inset-0 flex flex-col justify-center gap-4 px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-10 lg:py-8">
            <div className="w-full max-w-72 rounded-3xl bg-[#0B281F] p-4 shadow-[0_12px_30px_rgba(0,0,0,0.25)] md:p-5 lg:p-6">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0B100]">
                  <img
                    src={demografiIcon}
                    alt="Ikon data"
                    className="h-6 w-6 object-contain"
                    loading="lazy"
                  />
                </div>
                <p className="text-xs font-medium uppercase tracking-[0.02em] text-[#A4F4CF] md:text-sm">
                  Data Terkini 2024
                </p>
              </div>

              <h2 className="mt-3 font-[Georgia,serif] text-[24px] font-bold leading-[1.08] text-white md:text-[28px]">
                Demografi &amp;
                <br />
                Statistik Desa
              </h2>

              <p className="mt-2.5 max-w-56 text-xs leading-5 text-[#A4F4CF]/70 md:text-sm md:leading-6">
                Menyajikan data kependudukan yang transparan, akurat, dan
                terintegrasi untuk mendukung perencanaan.
              </p>
            </div>

            <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-6 lg:max-w-132 lg:gap-8">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="min-w-0">
                  <p className="font-[Georgia,serif] text-[30px] leading-none text-white md:text-[36px] md:leading-9">
                    3.542
                  </p>
                  <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.02em] text-[#5EE9B5] md:text-xs">
                    Total Penduduk
                  </p>
                  <p className="mt-1 text-[10px] text-[#00D492]/50 md:text-[11px]">
                    Tersebar di 4 Dusun
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
