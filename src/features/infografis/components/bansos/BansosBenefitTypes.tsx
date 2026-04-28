'use client'

import type { BansosBenefitType } from '../../types/infografis'

interface BansosBenefitTypesProps {
    benefitTypes: BansosBenefitType[]
}

export function BansosBenefitTypes({ benefitTypes }: BansosBenefitTypesProps) {
    // Create grid layout - 2 columns on mobile, 3 columns on tablet, 6 on desktop
    const gridCols = 'grid-cols-2 sm:grid-cols-3 md:grid-cols-6'

    return (
        <div className="rounded-3xl bg-white p-6">
            <h3 className="mb-6 text-xl font-bold text-[#0B281F]">Penerima Bantuan per Jenis</h3>

            <div className={`grid ${gridCols} gap-3`}>
                {benefitTypes.map((benefit) => (
                    <div
                        key={benefit.name}
                        className="flex flex-col items-center gap-3 rounded-2xl p-4 text-center"
                        style={{ backgroundColor: benefit.color + '15', borderLeft: `4px solid ${benefit.color}` }}
                    >
                        <div
                            className="flex h-12 w-12 items-center justify-center rounded-full text-white text-lg font-bold"
                            style={{ backgroundColor: benefit.color }}
                        >
                            {benefit.name.charAt(0)}
                        </div>
                        <div>
                            <p className="text-[28px] font-bold leading-none" style={{ color: benefit.color }}>
                                {benefit.count}
                            </p>
                            <p className="mt-2 text-xs font-medium text-[#666]">{benefit.name}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Info box */}
            <div className="mt-8 rounded-2xl border border-[#00B373]/20 bg-[#F0FFF8] p-5">
                <p className="text-sm font-medium text-[#0B281F]">Informasi Penting</p>
                <ul className="mt-3 space-y-2 text-xs text-[#666]">
                    <li>✓ PKH (Program Keluarga Harapan) - untuk pemberdayaan keluarga</li>
                    <li>✓ BPNT (Bantuan Pangan Non Tunai) - untuk pangan</li>
                    <li>✓ BLSM (Bantuan Langsung Sementara Masyarakat)</li>
                    <li>✓ Bantuan Rastra - untuk pangan keluarga</li>
                </ul>
            </div>
        </div>
    )
}
