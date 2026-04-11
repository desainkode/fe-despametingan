import { SectionHeader, StatPill, sectionCardClass } from "./section-ui";

const sdgsIndicators = [
  { label: "Indikator Dipantau", value: "17" },
  { label: "Target Prioritas", value: "6" },
  { label: "Progress", value: "72%" },
];

export function SdgsSection() {
  return (
    <div className={sectionCardClass + " bg-[#006548] text-[#F4F3EF] shadow-[0_14px_28px_rgba(0,0,0,0.18)]"}>
      <SectionHeader
        title="SDGs Desa"
        description="Menampilkan progres indikator pembangunan berkelanjutan yang dipantau desa dalam satu panel ringkas dan mudah dibaca."
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
        <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm md:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#A4F4CF]">
            Fokus Target
          </p>
          <p className="mt-3 font-[Georgia,serif] text-[28px] font-bold leading-tight md:text-[30px]">
            17 Tujuan Pembangunan
          </p>
          <p className="mt-3 text-[13px] leading-6 text-[#D0FAE5]/80 md:text-[14px]">
            Panel ini siap diisi grafik, capaian, dan indikator prioritas agar evaluasi program pembangunan lebih mudah dilakukan.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {sdgsIndicators.map((item) => (
            <StatPill key={item.label} label={item.label} value={item.value} />
          ))}
        </div>
      </div>
    </div>
  );
}
