import { stuntingContent } from '../config/infografis-content'
import { StuntingIndicatorCard } from './stunting/StuntingIndicatorCard'
import { StuntingAgeGroupCard } from './stunting/StuntingAgeGroupCard'
import { StuntingProgramCard } from './stunting/StuntingProgramCard'
import { StuntingBarChart } from './stunting/StuntingBarChart'
import { Activity, Share2, TrendingUp, ClipboardList } from 'lucide-react'

export function StuntingSection() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-12 px-4 py-6 md:space-y-24 md:px-0 md:py-8">
      {/* Statistik Stunting Section */}
      <section className="space-y-10">
        <div className="relative flex flex-col gap-6 pr-14 md:flex-row md:items-center md:justify-between md:pr-16">
          <div className="max-w-md">
            <h2 className="text-2xl font-bold tracking-tight text-[#0B281F] sm:text-3xl md:text-4xl">
              Statistik <br className="hidden md:block" /> Stunting
            </h2>
          </div>
          <div className="flex flex-1 flex-col md:flex-row md:items-center justify-between gap-8">
            <p className="text-sm leading-relaxed text-[#0B281F]/70 md:text-base lg:max-w-lg md:text-center md:mx-auto">
              {stuntingContent.description}
            </p>
            <div className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-full bg-[#0B281F] text-white shadow-lg shadow-black/10 md:h-12 md:w-12">
              <Activity size={24} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {stuntingContent.indicators.map((indicator, index) => (
            <div key={index} className="w-full">
              <StuntingIndicatorCard indicator={indicator} />
            </div>
          ))}
        </div>
      </section>

      {/* Prevalensi Usia Section */}
      <section className="space-y-10">
        <div className="relative flex flex-col gap-6 pr-14 md:flex-row md:items-center md:justify-between md:pr-16">
          <div className="max-w-md">
            <h2 className="text-2xl font-bold tracking-tight text-[#0B281F] sm:text-3xl md:text-4xl">
              Prevalensi <br className="hidden md:block" /> Usia
            </h2>
          </div>
          <div className="flex flex-1 flex-col md:flex-row md:items-center justify-between gap-8">
            <p className="text-sm leading-relaxed text-[#0B281F]/70 md:text-base lg:max-w-lg md:text-center md:mx-auto">
              Prevalensi Usia merupakan persentase kasus stunting yang dihitung berdasarkan kelompok usia tertentu, sebagai gambaran tingkat kejadian pada setiap rentang umur anak di suatu wilayah.
            </p>
            <div className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-full bg-[#0B281F] text-white shadow-lg shadow-black/10 md:h-12 md:w-12">
              <Share2 size={24} />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-4 w-max min-w-full">
            {stuntingContent.prevalenceByAge?.map((data, index) => (
              <div key={index} className="w-[200px] shrink-0 sm:w-[260px]">
                <StuntingAgeGroupCard data={data} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tren Stunting Section */}
      <section className="space-y-10">
        <div className="relative flex flex-col gap-6 pr-14 md:flex-row md:items-center md:justify-between md:pr-16">
          <div className="max-w-md">
            <h2 className="text-2xl font-bold tracking-tight text-[#0B281F] sm:text-3xl md:text-4xl">
              Tren <br className="hidden md:block" /> Stunting
            </h2>
          </div>
          <div className="flex flex-1 flex-col md:flex-row md:items-center justify-between gap-8">
            <p className="text-sm leading-relaxed text-[#0B281F]/70 md:text-base lg:max-w-lg md:text-center md:mx-auto">
              Gambaran perubahan persentase stunting dalam suatu wilayah dari waktu ke waktu, yang menunjukkan peningkatan atau penurunan angka kejadian stunting.
            </p>
            <div className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-full bg-[#0B281F] text-white shadow-lg shadow-black/10 md:h-12 md:w-12">
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
        <div className="relative flex flex-col gap-6 pr-14 md:flex-row md:items-center md:justify-between md:pr-16">
          <div className="max-w-md">
            <h2 className="text-2xl font-bold tracking-tight text-[#0B281F] sm:text-3xl md:text-4xl">
              Program <br className="hidden md:block" /> Stunting
            </h2>
          </div>
          <div className="flex flex-1 flex-col md:flex-row md:items-center justify-between gap-8">
            <p className="text-sm leading-relaxed text-[#0B281F]/70 md:text-base lg:max-w-lg md:text-center md:mx-auto">
              Merupakan rangkaian kegiatan dan upaya yang dilaksanakan untuk mencegah dan menurunkan angka stunting melalui peningkatan gizi, pelayanan kesehatan, serta edukasi kepada masyarakat.
            </p>
            <div className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-full bg-[#0B281F] text-white shadow-lg shadow-black/10 md:h-12 md:w-12">
              <ClipboardList size={24} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {stuntingContent.programs?.map((program, index) => (
            <StuntingProgramCard key={index} program={program} />
          ))}
        </div>
      </section>
    </div>
  )
}
