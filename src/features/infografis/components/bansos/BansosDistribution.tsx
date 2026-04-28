'use client'

import type { BansosDistributionData } from '../../types/infografis'

interface BansosDistributionProps {
    distributions: BansosDistributionData[]
}

export function BansosDistribution({ distributions }: BansosDistributionProps) {
    const maxKeluarga = Math.max(...distributions.map(d => d.keluarga))

    return (
        <div className="rounded-3xl bg-white p-6">
            <h3 className="mb-6 text-xl font-bold text-[#0B281F]">Distribusi Bantuan per Dusun</h3>
            <div className="space-y-5">
                {distributions.map((dist) => (
                    <div key={dist.dusun} className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-[#0B281F]">{dist.dusun}</p>
                                <p className="text-sm text-[#999]">{dist.keluarga} Keluarga • {dist.alokasi}</p>
                            </div>
                            <p className="text-lg font-bold text-[#004F3B]">{dist.keluarga}</p>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-[#E0E0E0]">
                            <div
                                className="h-full bg-gradient-to-r from-[#004F3B] to-[#009966]"
                                style={{ width: `${(dist.keluarga / maxKeluarga) * 100}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary stats */}
            <div className="mt-8 rounded-2xl border border-[#E0E0E0] bg-[#F5F7F6] p-5">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div>
                        <p className="text-xs text-[#999]">Total Dusun</p>
                        <p className="mt-2 text-2xl font-bold text-[#0B281F]">{distributions.length}</p>
                    </div>
                    <div>
                        <p className="text-xs text-[#999]">Total Keluarga</p>
                        <p className="mt-2 text-2xl font-bold text-[#0B281F]">
                            {distributions.reduce((sum, d) => sum + d.keluarga, 0)}
                        </p>
                    </div>
                    <div className="md:col-span-2">
                        <p className="text-xs text-[#999]">Rata-rata per Dusun</p>
                        <p className="mt-2 text-2xl font-bold text-[#0B281F]">
                            {Math.round(distributions.reduce((sum, d) => sum + d.keluarga, 0) / distributions.length)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
