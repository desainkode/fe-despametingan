import { SectionHeader, MiniMetric, sectionCardClass } from "./section-ui";

const stuntingIndicators = [
  { label: "Balita Terpantau", value: "124" },
  { label: "Risiko Stunting", value: "18" },
  { label: "Intervensi Aktif", value: "96%" },
];

export function StuntingSection() {
  return (
    <div className={sectionCardClass + " bg-white"}>
      <SectionHeader
        title="Pemantauan Stunting"
        description="Menyajikan data tumbuh kembang anak, risiko stunting, dan tindak lanjut intervensi gizi dalam format yang mudah dipantau."
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="rounded-3xl bg-[#0B281F] p-5 text-white md:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#A4F4CF]">
            Ringkasan Program
          </p>
          <p className="mt-3 font-[Georgia,serif] text-[28px] font-bold leading-tight md:text-[30px]">
            Stunting Jadi Prioritas
          </p>
          <p className="mt-3 max-w-xl text-[13px] leading-6 text-[#D0FAE5]/80 md:text-[14px]">
            Data ini akan membantu kader dan perangkat desa melihat status risiko, cakupan intervensi, serta prioritas aksi yang harus dijalankan setiap bulan.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {stuntingIndicators.map((item) => (
            <MiniMetric key={item.label} label={item.label} value={item.value} />
          ))}
        </div>
      </div>
    </div>
  );
}
