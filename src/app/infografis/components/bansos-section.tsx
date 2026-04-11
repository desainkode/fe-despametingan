import { SectionHeader, sectionCardClass } from "./section-ui";

const bansosStatuses = [
  { label: "Keluarga Penerima", value: "423" },
  { label: "Tersalurkan", value: "91%" },
  { label: "Validasi Data", value: "Aktif" },
];

export function BansosSection() {
  return (
    <div className={sectionCardClass + " bg-white"}>
      <SectionHeader
        title="Bantuan Sosial"
        description="Ringkasan penerima, status penyaluran, dan validasi data agar distribusi bantuan lebih transparan dan tepat sasaran."
      />

      <div className="grid gap-3 md:grid-cols-3">
        {bansosStatuses.map((item) => (
          <div key={item.label} className="rounded-3xl border border-[#F0B100]/20 bg-[#F5F7F6] p-5 md:p-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#004F3B]/65">
              {item.label}
            </p>
            <p className="mt-3 font-[Georgia,serif] text-[28px] font-bold leading-none text-[#0B281F] md:text-[30px]">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
