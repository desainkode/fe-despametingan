import { Info } from "lucide-react";
import {
  Building2,
  House,
  MapPinned,
  Users,
} from "lucide-react";

import { sectionCardClass } from "./section-ui";

const kartuDemografi: Array<{
  label: string;
  angka: string;
  bgColor: string;
  textColor: string;
  labelColor: string;
  icon: React.ComponentType<{
    size?: number | string;
    strokeWidth?: number;
    className?: string;
  }>;
}> = [
  {
    label: "Total\nPenduduk",
    angka: "3.542",
    bgColor: "#D9D9D9",
    textColor: "#070C10",
    labelColor: "#070C10",
    icon: Users,
  },
  {
    label: "Total\nDusun",
    angka: "4",
    bgColor: "#F0B100",
    textColor: "#FEFEFE",
    labelColor: "#FEFEFE",
    icon: House,
  },
  {
    label: "Total\nKepala Keluarga",
    angka: "1.087",
    bgColor: "#009966",
    textColor: "#FEFEFE",
    labelColor: "#FEFEFE",
    icon: Building2,
  },
  {
    label: "Total\nWilayah RT/RW",
    angka: "12/5",
    bgColor: "#006045",
    textColor: "#FEFEFE",
    labelColor: "#FEFEFE",
    icon: MapPinned,
  },
];

const kartuJumlahPenduduk: Array<{
  label: string;
  angka: string;
  tone: "light" | "dark";
  icon: React.ComponentType<{
    size?: number | string;
    strokeWidth?: number;
    className?: string;
  }>;
}> = [
  {
    label: "Total Penduduk",
    angka: "3.542",
    tone: "light",
    icon: Users,
  },
  {
    label: "Laki-laki",
    angka: "3.542",
    tone: "light",
    icon: House,
  },
  {
    label: "Perempuan",
    angka: "3.542",
    tone: "dark",
    icon: Building2,
  },
  {
    label: "Kepala Keluarga",
    angka: "3.542",
    tone: "light",
    icon: House,
  },
  {
    label: "Mutasi Penduduk",
    angka: "3.542",
    tone: "light",
    icon: MapPinned,
  },
  {
    label: "Penduduk Sementara",
    angka: "3.542",
    tone: "dark",
    icon: Users,
  },
];

function DemografiCard({
  label,
  angka,
  bgColor,
  textColor,
  labelColor,
  icon: Icon,
  delayMs,
}: {
  label: string;
  angka: string;
  bgColor: string;
  textColor: string;
  labelColor: string;
  icon: React.ComponentType<{
    size?: number | string;
    strokeWidth?: number;
    className?: string;
  }>;
  delayMs: number;
}) {
  return (
    <article
      className="hero-reveal relative h-75.5 w-62.5 shrink-0 transform-gpu transition-transform duration-300 ease-out hover:-translate-y-1"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <svg
        viewBox="0 0 288 347"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 17C0 7.61117 7.61116 0 17 0H182.991C196.74 0 206.049 17.9028 206.049 31.652C206.049 59.4921 228.588 82.0608 256.39 82.0608C270.113 82.0608 288 91.3484 288 105.071V330C288 339.389 280.389 347 271 347H17C7.61116 347 0 339.389 0 330V17Z"
          fill={bgColor}
        />
      </svg>

      <div className="absolute left-[8%] top-[8.6%] h-[84.4%] w-[84.7%] rounded-[14px] border border-white/20 bg-linear-to-br from-white/24 via-white/13 to-white/8 backdrop-blur-[2px] shadow-[inset_0_10px_20px_rgba(255,255,255,0.16),inset_0_-10px_18px_rgba(0,0,0,0.14)]" />
      <div className="pointer-events-none absolute left-[13%] top-[13%] h-[21%] w-[60%] rounded-xl bg-linear-to-b from-white/26 to-transparent blur-[1px]" />
      <div className="pointer-events-none absolute bottom-[11%] right-[8%] h-[22%] w-[34%] rounded-full bg-[#6FF2C9]/12 blur-[14px]" />

      <div className="absolute left-[17%] top-[20.5%]">
        <div className="flex flex-col items-start justify-center gap-8" style={{ color: textColor }}>
          <h3
            className="whitespace-pre-line font-[Georgia,serif] text-[19px] font-bold leading-[1.2]"
            style={{ color: labelColor }}
          >
            {label}
          </h3>

          <p
            className="text-[60px] leading-[0.9]"
            style={{ fontFamily: "var(--font-upakarti)" }}
          >
            {angka}
          </p>
        </div>
      </div>

      <div className="absolute left-[76.5%] top-0 z-10 flex h-14.5 w-14.5 items-center justify-center rounded-full bg-black text-white shadow-[0_10px_20px_rgba(0,0,0,0.22)]">
        <Icon size={21} strokeWidth={2.2} />
      </div>
    </article>
  );
}

function JumlahPendudukCard({
  label,
  angka,
  tone,
  icon: Icon,
  delayMs,
}: {
  label: string;
  angka: string;
  tone: "light" | "dark";
  icon: React.ComponentType<{
    size?: number | string;
    strokeWidth?: number;
    className?: string;
  }>;
  delayMs: number;
}) {
  const isDark = tone === "dark";

  return (
    <article
      className={`hero-reveal relative isolate h-67.5 overflow-hidden rounded-tl-[28px] rounded-br-[28px]  p-6 sm:h-75 md:h-80 ${
        isDark
          ? "bg-linear-to-br from-[#001F18] via-[#003326] to-[#005239] text-[#F3F8F6]"
          : "bg-[#D9D9D9] text-[#070C10]"
      }`}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <div className="pointer-events-none absolute -right-14 -top-14 h-28 w-28 rotate-45 bg-[#FFFFFF]" />
      <div className="pointer-events-none absolute -bottom-14 -left-14 h-28 w-28 rotate-45 bg-[#FFFFFF]" />

      <div
        className={`relative inline-flex h-11 w-11 items-center justify-center rounded-full border shadow-[0_6px_14px_rgba(11,40,31,0.12)] ${
          isDark
            ? "border-white/18 bg-[#0B281F]/48 text-[#EAF7F1]"
            : "border-[#0B281F]/8 bg-white/42 text-[#0B281F]"
        }`}
      >
        <Icon size={18} strokeWidth={2.1} />
      </div>

      <div className="relative mt-6 flex h-[calc(100%-4.75rem)] flex-col justify-between">
        <div>
          <div className={`mb-3 inline-flex items-center gap-1.5 rounded-md px-2 py-1 ${isDark ? "bg-[#009966] text-white" : "bg-[#0B281F] text-white"}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-[#F0B100]" />
            <span className="text-[11px] leading-none" style={{ fontFamily: "var(--font-upakarti)" }}>
              Jiwa
            </span>
          </div>

          <p
            className="text-[54px] leading-[0.9] sm:text-[58px]"
            style={{ fontFamily: "var(--font-upakarti)" }}
          >
            {angka}
          </p>

          <h3 className="mt-3 font-[Georgia,serif] text-[19px] font-bold leading-[1.15] sm:text-[21px] md:text-[23px]">
            {label}
          </h3>
        </div>

        <p className={`self-end text-right text-[12px] leading-tight ${isDark ? "text-[#F5F7F6]/85" : "text-[#070C10]/72"}`}>
          Terdata
          <br />
          oleh sistem
        </p>
      </div>
    </article>
  );
}

export function PendudukSection() {
  return (
    <div className="space-y-8" id="penduduk">
      <div className={sectionCardClass + " bg-white"}>
        <div className="grid gap-4 border-b border-[#0B281F]/10 pb-6 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.45fr)_auto] md:items-start md:gap-6">
          <h2
            className="hero-reveal font-[Georgia,serif] text-[26px] font-bold leading-[1.06] text-[#0B281F] md:text-[34px] lg:text-[42px]"
            style={{ animationDelay: "40ms" }}
          >
            Demografi
            <br />
            Penduduk
          </h2>

          <p
            className="hero-reveal max-w-none pt-0.5 text-[12px] leading-6 text-[#0B281F]/80 md:text-[13px] md:leading-7"
            style={{ animationDelay: "140ms" }}
          >
            Demografi Penduduk merupakan penyajian data kependudukan yang
            transparan, akurat, dan terintegrasi guna mendukung proses
            perencanaan pembangunan, pengambilan kebijakan, serta evaluasi
            program secara tepat sasaran.
          </p>

          <button
            type="button"
            aria-label="Informasi demografi penduduk"
            className="hero-reveal inline-flex h-14 w-14 shrink-0 items-center justify-center self-start rounded-full bg-[#0B281F] text-white transition-transform duration-300 hover:-translate-y-0.5"
            style={{ animationDelay: "220ms" }}
          >
            <Info size={22} strokeWidth={2.2} />
          </button>
        </div>

        <div className="mt-7 overflow-x-auto px-2 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div
            className="mx-auto flex w-max min-w-full items-start justify-start xl:justify-center"
            style={{
              maxWidth: 1120,
              minHeight: 308,
              paddingTop: 4,
              paddingBottom: 4,
              gap: 65,
            }}
          >
            {kartuDemografi.map((item, idx) => (
              <DemografiCard
                key={`${item.label}-${idx}`}
                label={item.label}
                angka={item.angka}
                bgColor={item.bgColor}
                textColor={item.textColor}
                labelColor={item.labelColor}
                icon={item.icon}
                delayMs={300 + idx * 100}
              />
            ))}
          </div>
        </div>
      </div>

      <section className={sectionCardClass + " bg-[#FFFFFF]"}>
        <div className="flex flex-col gap-7">
          <div className="grid gap-4 border-b border-[#0B281F]/10 pb-6 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.45fr)_auto] md:items-start md:gap-6">
            <h2 className="hero-reveal font-[Georgia,serif] text-[26px] font-bold leading-[1.06] text-[#0B281F] md:text-[34px] lg:text-[42px]">
              Jumlah
              <br />
              Penduduk
            </h2>

            <p className="hero-reveal max-w-none pt-0.5 text-[12px] leading-6 text-[#0B281F]/80 md:text-[13px] md:leading-7">
              Jumlah Penduduk merupakan penyajian data mengenai total populasi
              yang ditampilkan secara transparan, akurat, dan terintegrasi guna
              mendukung proses perencanaan pembangunan, pengambilan kebijakan,
              serta evaluasi program secara tepat sasaran.
            </p>

            <button
              type="button"
              aria-label="Informasi jumlah penduduk"
              className="hero-reveal inline-flex h-14 w-14 shrink-0 items-center justify-center self-start rounded-full bg-[#0B281F] text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              <Info size={22} strokeWidth={2.2} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {kartuJumlahPenduduk.map((item, idx) => (
              <JumlahPendudukCard
                key={`${item.label}-${idx}`}
                label={item.label}
                angka={item.angka}
                tone={item.tone}
                icon={item.icon}
                delayMs={120 + idx * 80}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
