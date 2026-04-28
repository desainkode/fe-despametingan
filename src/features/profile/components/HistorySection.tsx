import React from "react";
import { History, Milestone } from "lucide-react";

export function HistorySection({ history, establishedYear }: { history: string, establishedYear: string }) {
  return (
    <section className="mx-auto max-w-5xl py-12">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        <div className="md:w-1/3 sticky top-32">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F0B100]/10 px-4 py-1.5 text-[12px] font-bold uppercase tracking-widest text-[#F0B100]">
              <History size={16} />
              Sejarah Desa
            </div>
            <h2 className="font-[Georgia,serif] text-[32px] font-bold leading-tight text-[#0B281F]">
              Jejak Langkah Sejak <span className="text-[#F0B100]">{establishedYear}</span>
            </h2>
            <div className="h-1 w-20 bg-[#F0B100]" />
            <div className="relative aspect-square overflow-hidden rounded-[32px] shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop" 
                alt="Sejarah Desa" 
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          </div>
        </div>
        
        <div className="md:w-2/3">
          <div className="relative border-l-2 border-[#0B281F]/5 pl-8 space-y-12">
            <div className="relative">
              <div className="absolute -left-[41px] top-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#0B281F] ring-8 ring-[#F6F8F7]" />
              <div className="prose prose-lg max-w-none text-[17px] leading-relaxed text-[#0B281F]/70">
                <p>{history}</p>
              </div>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-[32px] bg-white p-8 shadow-sm border border-[#0B281F]/5">
                <Milestone size={24} className="mb-4 text-[#009966]" />
                <h4 className="font-bold text-[#0B281F]">Asal Usul Nama</h4>
                <p className="mt-2 text-[14px] text-[#0B281F]/50 leading-relaxed">
                  Berasal dari kata "Pameutingan" yang berarti tempat singgah bagi para pedagang kuno.
                </p>
              </div>
              <div className="rounded-[32px] bg-white p-8 shadow-sm border border-[#0B281F]/5">
                <Milestone size={24} className="mb-4 text-[#009966]" />
                <h4 className="font-bold text-[#0B281F]">Titik Balik</h4>
                <p className="mt-2 text-[14px] text-[#0B281F]/50 leading-relaxed">
                  Tahun 1945, Desa Pameutingan menjadi basis pertahanan pejuang di wilayah selatan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
