"use client";

import Image from "next/image";
import { DUSUN_MARKERS } from "./mapData";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function MapComponent() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="relative w-full aspect-[1081.5/1033.96] flex items-center justify-center bg-transparent group mx-auto max-w-2xl">
      <div className="relative w-full h-full">
        {/* The Map Asset */}
        <Image
          src="/images/peta-batas-wilayah-figma.svg"
          alt="Peta Desa"
          width={1082}
          height={1034}
          className="w-full h-full object-contain pointer-events-none"
          priority
        />

        {/* Interactive Markers Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {DUSUN_MARKERS.map((marker) => (
            <div
              key={marker.id}
              className="absolute"
              style={{
                left: marker.position.left,
                top: marker.position.top,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="relative flex items-center justify-center cursor-pointer pointer-events-auto"
                onMouseEnter={() => setHoveredId(marker.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Pulsing Aura */}
                <div className="absolute h-6 w-6 rounded-full bg-success/30 animate-ping" />

                {/* Center Dot */}
                <div className={`h-2.5 w-2.5 rounded-full border-2 border-white shadow-lg transition-all duration-300 ${hoveredId === marker.id ? 'bg-primary scale-125' : 'bg-success'}`} />

                {/* Premium Tooltip */}
                <AnimatePresence>
                  {hoveredId === marker.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                    >
                      <div className="px-4 py-2 rounded-xl bg-white/90 dark:bg-darklight/90 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-2xl shadow-black/20 whitespace-nowrap">
                        <span className="text-xs font-bold text-dark dark:text-white tracking-wide">
                          {marker.nama}
                        </span>
                        {/* Tooltip Arrow */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white/90 dark:border-t-darklight/90" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
