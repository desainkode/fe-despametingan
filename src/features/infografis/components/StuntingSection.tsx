import { stuntingContent } from '../config/infografis-content'
import { StuntingIndicatorCard } from './stunting/StuntingIndicatorCard'
import { StuntingAgeGroupCard } from './stunting/StuntingAgeGroupCard'
import { StuntingProgramCard } from './stunting/StuntingProgramCard'
import { StuntingBarChart } from './stunting/StuntingBarChart'
import { Activity, Share2, TrendingUp, ClipboardList } from 'lucide-react'

export function StuntingSection() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-24 py-8 px-4 md:px-0">
      {/* Statistik Stunting Section */}
      <section className="space-y-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold tracking-tight text-[#0B281F] md:text-4xl">
              Statistik <br className="hidden md:block" /> Stunting
            </h2>
          </div>
          <div className="flex flex-1 flex-col md:flex-row md:items-center justify-between gap-8">
            <p className="text-sm leading-relaxed text-[#0B281F]/70 md:text-base lg:max-w-lg md:text-center md:mx-auto">
              {stuntingContent.description}
            </p>
            <div className="hidden md:flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0B281F] text-white shadow-lg shadow-black/10">
              <Activity size={24} />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-4 md:grid md:grid-cols-4">
            {stuntingContent.indicators.map((indicator, index) => (
              <div key={index} className="w-[280px] shrink-0 md:w-full">
                <StuntingIndicatorCard indicator={indicator} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prevalensi Usia Section */}
      <section className="space-y-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold tracking-tight text-[#0B281F] md:text-4xl">
              Prevalensi <br className="hidden md:block" /> Usia
            </h2>
          </div>
          <div className="flex flex-1 flex-col md:flex-row md:items-center justify-between gap-8">
            <p className="text-sm leading-relaxed text-[#0B281F]/70 md:text-base lg:max-w-lg md:text-center md:mx-auto">
              Prevalensi Usia merupakan persentase kasus stunting yang dihitung berdasarkan kelompok usia tertentu, sebagai gambaran tingkat kejadian pada setiap rentang umur anak di suatu wilayah.
            </p>
            <div className="hidden md:flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0B281F] text-white shadow-lg shadow-black/10">
              <Share2 size={24} />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-4 w-max min-w-full">
            {stuntingContent.prevalenceByAge?.map((data, index) => (
              <div key={index} className="w-[260px] shrink-0">
                <StuntingAgeGroupCard data={data} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tren Stunting Section */}
      <section className="space-y-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold tracking-tight text-[#0B281F] md:text-4xl">
              Tren <br className="hidden md:block" /> Stunting
            </h2>
          </div>
          <div className="flex flex-1 flex-col md:flex-row md:items-center justify-between gap-8">
            <p className="text-sm leading-relaxed text-[#0B281F]/70 md:text-base lg:max-w-lg md:text-center md:mx-auto">
              Gambaran perubahan persentase stunting dalam suatu wilayah dari waktu ke waktu, yang menunjukkan peningkatan atau penurunan angka kejadian stunting.
            </p>
            <div className="hidden md:flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0B281F] text-white shadow-lg shadow-black/10">
              <TrendingUp size={24} />
            </div>
          </div>
        </div>

        {stuntingContent.trendData && (
          <StuntingBarChart data={stuntingContent.trendData} />
        )}
      </section>

      {/* Program Stunting Section */}
      <section className="space-y-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold tracking-tight text-[#0B281F] md:text-4xl">
              Program <br className="hidden md:block" /> Stunting
            </h2>
          </div>
          <div className="flex flex-1 flex-col md:flex-row md:items-center justify-between gap-8">
            <p className="text-sm leading-relaxed text-[#0B281F]/70 md:text-base lg:max-w-lg md:text-center md:mx-auto">
              Merupakan rangkaian kegiatan dan upaya yang dilaksanakan untuk mencegah dan menurunkan angka stunting melalui peningkatan gizi, pelayanan kesehatan, serta edukasi kepada masyarakat.
            </p>
            <div className="hidden md:flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0B281F] text-white shadow-lg shadow-black/10">
              <ClipboardList size={24} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stuntingContent.programs?.map((program, index) => (
            <StuntingProgramCard key={index} program={program} />
          ))}
        </div>
      </section>
    </div>
  )
}
