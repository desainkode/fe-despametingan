'use client'

import { usePathname } from 'next/navigation'
import { HeroSection } from '@/features/infografis/components/HeroSection'
import type { InfografisKey } from '@/features/infografis/types/infografis'

export default function InfografisLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Determine active tab from pathname
  // Pathname is expected to be "/infografis/[key]"
  const segments = pathname.split('/')
  const lastSegment = segments[segments.length - 1]

  const validKeys: InfografisKey[] = ['penduduk', 'apbdes', 'stunting', 'bansos', 'idm', 'sdgs']
  const activeTab = (validKeys.includes(lastSegment as InfografisKey)
    ? lastSegment
    : 'penduduk') as InfografisKey

  return (
    <div className="bg-linear-to-b from-[#0B281F] via-[#0B281F] to-[#004F3B]">
      <HeroSection activeTab={activeTab} />

      <section className="bg-[#FFFFFF] px-4 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12 transition-colors duration-300 ease-out">
        <div className="animate-fade-in">
          {children}
        </div>
      </section>
    </div>
  )
}
