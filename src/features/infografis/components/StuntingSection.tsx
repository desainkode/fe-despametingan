import React from 'react'
import { StuntingSectionContent } from '../types/infografis'
import { StuntingIndicatorCard } from './stunting/StuntingIndicatorCard'
import { StuntingAgeGroupCard } from './stunting/StuntingAgeGroupCard'
import { StuntingProgramCard } from './stunting/StuntingProgramCard'
import { StuntingBarChart } from './stunting/StuntingBarChart'
import { sectionCardClass, SectionHeader } from './section-ui'

export function StuntingSection({ data }: { data: StuntingSectionContent }) {
  return (
    <div className="space-y-6 md:space-y-8" id="stunting">
      {/* 1. Statistik Stunting Section */}
      <section className={sectionCardClass + " bg-white"}>
        <SectionHeader 
          title={<>Statistik<br />Stunting</>} 
          description={data.description} 
        />

        <div className="mt-8 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.indicators.map((indicator, index) => (
            <div key={index} className="w-full">
              <StuntingIndicatorCard indicator={indicator} />
            </div>
          ))}
        </div>
      </section>

      {/* 2. Prevalensi Usia Section */}
      <section className={sectionCardClass + " bg-white"}>
        <SectionHeader 
          title={<>Prevalensi<br />Usia</>} 
          description="Prevalensi Usia merupakan persentase kasus stunting yang dihitung berdasarkan kelompok usia tertentu, sebagai gambaran tingkat kejadian pada setiap rentang umur anak di suatu wilayah." 
        />

        <div className="mt-8 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scrollbar-hide -mx-6 px-6 sm:mx-0 sm:px-0 sm:pb-0 sm:pt-0 sm:overflow-visible">
          <div className="flex snap-x snap-mandatory gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6 sm:overflow-visible">
            {data.prevalenceByAge?.map((item, index) => (
              <div key={index} className="w-[240px] xs:w-[260px] sm:w-full shrink-0 snap-start">
                <StuntingAgeGroupCard data={item} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Tren Stunting Section */}
      <section className={sectionCardClass + " bg-white"}>
        <SectionHeader 
          title={<>Tren<br />Stunting</>} 
          description="Gambaran perubahan persentase stunting dalam suatu wilayah dari waktu ke waktu, yang menunjukkan peningkatan atau penurunan angka kejadian stunting." 
        />

        <div className="mt-8">
          {data.trendData && (
            <StuntingBarChart data={data.trendData} />
          )}
        </div>
      </section>

      {/* 4. Program Stunting Section */}
      <section className={sectionCardClass + " bg-white"}>
        <SectionHeader 
          title={<>Program<br />Stunting</>} 
          description="Merupakan rangkaian kegiatan dan upaya yang dilaksanakan untuk mencegah dan menurunkan angka stunting melalui peningkatan gizi, pelayanan kesehatan, serta edukasi kepada masyarakat." 
        />

        <div className="mt-8 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {data.programs?.map((program, index) => (
            <StuntingProgramCard key={index} program={program} />
          ))}
        </div>
      </section>
    </div>
  )
}
