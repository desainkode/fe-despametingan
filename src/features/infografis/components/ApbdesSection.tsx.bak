import { ArrowRight, ChevronDown } from 'lucide-react'

import { SectionHeader, StatPill } from './ui'
import { sectionCardClass } from '../constants/styles'
import { apbdesContent } from '../config/infografis-content'

export function ApbdesSection() {
  return (
    <div className={sectionCardClass + ' bg-[#006548] text-[#F4F3EF] shadow-[0_14px_28px_rgba(0,0,0,0.18)]'}>
      <SectionHeader
        title={apbdesContent.title}
        description={apbdesContent.description}
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.95fr)] lg:items-center">
        <div className="grid gap-3 sm:grid-cols-3">
          {apbdesContent.statistics.map((item) => (
            <StatPill key={item.label} label={item.label} value={item.value} />
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-[13px] leading-7 text-[#F4F3EF]/92 md:text-[14px]">
            Pencatatan dan pengelolaan Anggaran Pendapatan dan Belanja Desa (APBDes) yang disajikan ringkas, sehingga setiap perubahan anggaran bisa dipantau dengan cepat.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-[#F0B100] px-5 py-2.5 text-[12px] font-bold text-[#0B281F] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Lihat Anggaran
              <ArrowRight size={16} strokeWidth={2.5} />
            </button>

            <label className="relative inline-flex items-center">
              <span className="sr-only">Pilih tahun APBDes</span>
              <select className="min-w-40 appearance-none rounded-full bg-[#E8ECE9] px-5 py-2.5 pr-11 text-[12px] font-semibold text-[#20332F] focus:outline-none">
                <option>Tahun 2026</option>
                <option>Tahun 2025</option>
                <option>Tahun 2024</option>
              </select>
              <ChevronDown
                size={16}
                strokeWidth={2.5}
                className="pointer-events-none absolute right-4 text-[#20332F]"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
