'use client'

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts'
import type { StuntingPrevalenceData } from '../../types/infografis'

interface StuntingPrevalenceChartProps {
    data: StuntingPrevalenceData[]
}

export function StuntingPrevalenceChart({ data }: StuntingPrevalenceChartProps) {
    const colors = [
        '#004F3B',
        '#006045',
        '#009966',
        '#00B373',
        '#00CC80',
    ]

    return (
        <div className="rounded-3xl bg-white p-6">
            <h3 className="mb-6 text-xl font-bold text-[#0B281F]">Prevalensi Stunting per Kelompok Usia</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                    <XAxis
                        dataKey="ageGroup"
                        stroke="#0B281F"
                        style={{ fontSize: '12px' }}
                    />
                    <YAxis
                        stroke="#0B281F"
                        style={{ fontSize: '12px' }}
                        label={{ value: 'Persentase (%)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #ccc',
                            borderRadius: '8px'
                        }}
                        formatter={(value) => `${value}%`}
                    />
                    <Bar dataKey="percentage" fill="#004F3B" radius={[8, 8, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
            <div className="mt-6 grid grid-cols-5 gap-2">
                {data.map((item, index) => (
                    <div key={item.ageGroup} className="rounded-lg border border-[#E0E0E0] p-3 text-center">
                        <p className="text-xs text-[#666]">{item.ageGroup}</p>
                        <p className="mt-2 text-lg font-bold text-[#0B281F]">{item.percentage}%</p>
                        <p className="mt-1 text-xs text-[#999]">{item.count} balita</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
