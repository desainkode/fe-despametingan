import { Info } from "lucide-react";

export const sectionCardClass =
  "mx-auto w-full max-w-7xl rounded-4xl px-5 py-6 sm:px-6 md:px-7 md:py-7 lg:px-8 lg:py-8";

export function SectionHeader({
  title,
  description,
  ariaLabel,
}: {
  title: React.ReactNode;
  description: string;
  ariaLabel?: string;
}) {
  const cleanAriaLabel = ariaLabel || (typeof title === "string" ? title : "Detail Informasi");

  return (
    <div className="relative grid gap-4 border-b border-[#0B281F]/10 pb-6 pr-14 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.45fr)] md:items-start md:gap-6 md:pr-16 mb-6">
      <h2
        className="font-[Georgia,serif] text-[26px] font-bold leading-[1.06] tracking-[0.02em] text-[#0B281F] md:text-[34px] lg:text-[42px]"
      >
        {title}
      </h2>

      <p className="max-w-none pt-0.5 text-[12px] leading-6 text-[#0B281F]/80 md:text-[13px] md:leading-7">
        {description}
      </p>

      <button
        type="button"
        aria-label={`Informasi ${cleanAriaLabel}`}
        className="absolute right-0 top-0 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0B281F] text-white transition-transform duration-300 hover:-translate-y-0.5 md:h-14 md:w-14"
      >
        <Info size={20} strokeWidth={2.5} />
      </button>
    </div>
  );
}

export function StatPill({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-white/18 bg-white/15 px-4 py-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_12px_24px_rgba(0,0,0,0.12)] backdrop-blur-sm">
      <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/76">
        {label}
      </p>
      <p className="mt-2 font-[Georgia,serif] text-[30px] font-bold leading-none text-white md:text-[34px]">
        {value}
      </p>
    </div>
  );
}

export function MiniMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[#0B281F]/10 bg-white px-4 py-4 shadow-[0_10px_24px_rgba(11,40,31,0.06)]">
      <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#004F3B]/65">
        {label}
      </p>
      <p className="mt-2 font-[Georgia,serif] text-[26px] font-bold leading-none text-[#0B281F] md:text-[28px]">
        {value}
      </p>
    </div>
  );
}
