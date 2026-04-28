'use client'

import type { StuntingProgramData } from '../../types/infografis'

interface StuntingProgramsProps {
    programs: StuntingProgramData[]
}

export function StuntingPrograms({ programs }: StuntingProgramsProps) {
    return (
        <div className="rounded-3xl bg-white p-6">
            <h3 className="mb-6 text-xl font-bold text-[#0B281F]">Cakupan Program Stunting</h3>
            <div className="space-y-6">
                {programs.map((program) => (
                    <div key={program.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                            <p className="font-medium text-[#0B281F]">{program.name}</p>
                            <p className="text-lg font-bold" style={{ color: program.color }}>
                                {program.coverage}%
                            </p>
                        </div>
                        <div className="h-3 overflow-hidden rounded-full bg-[#E0E0E0]">
                            <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                    width: `${program.coverage}%`,
                                    backgroundColor: program.color
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 rounded-2xl border border-[#F0B100]/20 bg-[#FFFEF0] p-5">
                <p className="text-sm font-medium text-[#0B281F]">Rekomendasi Tindak Lanjut</p>
                <ul className="mt-3 space-y-2 text-xs text-[#666]">
                    <li>✓ Tingkatkan cakupan program makanan sehat hingga 100%</li>
                    <li>✓ Perluas jangkauan pendampingan keluarga ke area terpencil</li>
                    <li>✓ Intensifkan edukasi gizi di posyandu dan sekolah</li>
                </ul>
            </div>
        </div>
    )
}
