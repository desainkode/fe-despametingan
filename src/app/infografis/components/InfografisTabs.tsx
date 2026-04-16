'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import type { InfografisKey } from '../types/infografis'

import { HeroSection } from './HeroSection'
import { ApbdesSection } from './ApbdesSection'
import { BansosSection } from './BansosSection'
import { IdmSection } from './IdmSection'
import { PendudukSection } from './PendudukSection'
import { SdgsSection } from './SdgsSection'
import { StuntingSection } from './StuntingSection'

export default function InfografisTabs() {
  const [activeTab, setActiveTab] = useState<InfografisKey>('penduduk')

  const featurePanels: Record<InfografisKey, ReactNode> = {
    penduduk: <PendudukSection />,
    apbdes: <ApbdesSection />,
    stunting: <StuntingSection />,
    bansos: <BansosSection />,
    idm: <IdmSection />,
    sdgs: <SdgsSection />,
  }

  return (
    <div className="bg-linear-to-b from-[#0B281F] via-[#0B281F] to-[#004F3B]">
      <HeroSection activeTab={activeTab} onChangeTab={setActiveTab} />

      <section className="bg-[#FFFFFF] px-4 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12 transition-colors duration-300 ease-out">
        <div className="animate-fade-in">
          {featurePanels[activeTab]}
        </div>
      </section>
    </div>
  )
}
