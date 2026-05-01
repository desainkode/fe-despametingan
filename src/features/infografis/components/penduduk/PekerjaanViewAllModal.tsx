"use client";

import React from "react";
import { X } from "lucide-react";

interface PekerjaanItem {
  kode: string;
  nama: string;
  jumlah: string;
  persentase: number;
}

interface PekerjaanViewAllModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: PekerjaanItem[];
  bgColor: "yellow" | "green";
}

export function PekerjaanViewAllModal({
  isOpen,
  onClose,
  title,
  data,
  bgColor,
}: PekerjaanViewAllModalProps) {
  const gradients = {
    yellow: "from-[#F0B100] via-[#D4940A] to-[#B8860B]",
    green: "from-[#009966] via-[#005239] to-[#003d2e]",
  };

  const accentColors = {
    yellow: "#F0B100",
    green: "#00E0A1",
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        style={{
          animation: "fadeIn 0.3s ease-out",
        }}
      />

      {/* Modal */}
      <div
        className={`relative bg-linear-to-br ${gradients[bgColor]} rounded-[32px] shadow-2xl overflow-hidden max-h-[90vh] w-full max-w-2xl`}
        style={{
          animation: "slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Decorative elements */}
        <div className="absolute -right-24 -top-24 w-56 h-56 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full bg-white/5 blur-3xl" />

        {/* Content */}
        <div className="relative z-10 p-8 sm:p-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="font-[Georgia,serif] text-[36px] sm:text-[42px] font-bold leading-[1.1] text-white">
                {title}
              </h2>
              <p className="mt-2 text-[14px] sm:text-[15px] text-white/80">
                Daftar lengkap jenis pekerjaan penduduk di desa
              </p>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 ml-4 inline-flex items-center justify-center h-12 w-12 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-300 backdrop-blur-sm"
            >
              <X size={24} strokeWidth={2.2} />
            </button>
          </div>

          {/* Grid of items */}
          <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.map((item, idx) => (
                <div
                  key={`modal-${item.kode}-${idx}`}
                  className="group relative overflow-hidden rounded-[20px] bg-white/15 backdrop-blur-md border border-white/20 p-6 hover:bg-white/20 transition-all duration-300"
                  style={{
                    animation: `slideInUp 0.5s ease-out ${idx * 50}ms both`,
                  }}
                >
                  <div className="pointer-events-none absolute -right-12 -top-12 w-32 h-32 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition-all" />

                  <div className="relative z-10">
                    {/* Top row */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="inline-flex items-center justify-center h-10 w-10 rounded-full font-bold text-[12px]"
                          style={{
                            backgroundColor: `rgba(255, 255, 255, 0.2)`,
                            color: "#FFFFFF",
                            fontFamily: "var(--font-upakarti)",
                          }}
                        >
                          {item.kode}
                        </div>
                        <div>
                          <h3 className="font-[Georgia,serif] text-[16px] sm:text-[17px] font-bold text-white leading-tight">
                            {item.nama}
                          </h3>
                          <p className="mt-1 text-[12px] text-white/70">
                            {item.persentase}% dari total
                          </p>
                        </div>
                      </div>

                      <div
                        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-bold text-white border border-white/30"
                        style={{ backgroundColor: `rgba(255, 255, 255, 0.15)` }}
                      >
                        <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: accentColors[bgColor] }} />
                        {item.persentase}%
                      </div>
                    </div>

                    {/* Bottom row */}
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-[11px] text-white/70 mb-1">Jumlah</p>
                        <p
                          className="text-[28px] sm:text-[32px] font-bold text-white"
                          style={{ fontFamily: "var(--font-upakarti)" }}
                        >
                          {item.jumlah}
                        </p>
                      </div>
                      <div className="text-[11px] text-white/70 text-right">
                        <p>Orang</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes slideInUp {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
