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
import type { StuntingTrendData } from '../../types/infografis'

interface StuntingBarChartProps {
  data: StuntingTrendData[]
}

export function StuntingBarChart({ data }: StuntingBarChartProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-linear-to-b from-[#0B281F] via-[#1a3a2f] to-[#0B281F] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
      {/* Spotlight Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.08)_0%,_transparent_60%)] pointer-events-none" />
      
      <div className="relative h-[450px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F0B100" />
                <stop offset="40%" stopColor="#D49C00" />
                <stop offset="100%" stopColor="#0B281F" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.03)" strokeDasharray="0" />
            
            <XAxis
              dataKey="year"
              axisLine={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1 }}
              tickLine={false}
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 500 }}
              dy={15}
            />
            
            <YAxis
              axisLine={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1 }}
              tickLine={false}
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 500 }}
              ticks={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
              domain={[0, 100]}
              dx={-10}
            />
            
            <Tooltip
              cursor={{ fill: 'rgba(255,255,255,0.03)' }}
              contentStyle={{
                backgroundColor: '#0B281F',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                color: '#fff',
                fontSize: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
              }}
              itemStyle={{ color: '#F0B100', fontWeight: 'bold' }}
              labelStyle={{ color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}
              formatter={(value) => [`${value}%`, 'Prevalensi']}
            />
            
            <Bar
              dataKey="prevalence"
              radius={[4, 4, 0, 0]}
              barSize={45}
              animationDuration={2000}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="url(#barGradient)" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
