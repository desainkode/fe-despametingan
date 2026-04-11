import { Info } from "lucide-react";
import { Building2, House, MapPinned, Users } from "lucide-react";

import { sectionCardClass } from "./section-ui";

const kartuDemografi: Array<{
  label: string;
  angka: string;
  bgColor: string;
  textColor: string;
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
    icon: Users,
  },
  {
    label: "Total\nDusun",
    angka: "4",
    bgColor: "#F0B100",
    textColor: "#FEFEFE",
    icon: House,
  },
  {
    label: "Total\nKepala Keluarga",
    angka: "1.087",
    bgColor: "#009966",
    textColor: "#FEFEFE",
    icon: Building2,
  },
  {
    label: "Total\nWilayah RT/RW",
    angka: "12/5",
    bgColor: "#006045",
    textColor: "#FEFEFE",
    icon: MapPinned,
  },
];

function DemografiCard({
  label,
  angka,
  bgColor,
  textColor,
  icon: Icon,
  delayMs,
}: {
  label: string;
  angka: string;
  bgColor: string;
  textColor: string;
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
            className="whitespace-pre-line text-[27px] font-bold leading-[1.12]"
            style={{ fontFamily: "var(--font-upakarti)" }}
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

export function PendudukSection() {
  return (
    <div className={sectionCardClass + " bg-white"} id="penduduk">
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
              icon={item.icon}
              delayMs={300 + idx * 100}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
