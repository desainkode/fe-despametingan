"use client";

import { useState, useRef, useEffect } from "react";
import { MapPin, Info, ArrowRight } from "lucide-react";
import { BATAS_WILAYAH, DUSUN_MARKERS } from "../config/home-data";

export default function MapSection() {
  const [combinedMapActiveLayer, setCombinedMapActiveLayerState] = useState<string | null>(null);
  const [hoveredMapMarkerId, setHoveredMapMarkerId] = useState<string | null>(null);
  const [pinnedMapMarkerId, setPinnedMapMarkerId] = useState<string | null>(null);
  const [isBoundaryCardHoverActive, setIsBoundaryCardHoverActive] = useState<boolean>(false);
  const combinedMapObjectRef = useRef<HTMLObjectElement | null>(null);

  const activeMapMarkerId = pinnedMapMarkerId ?? hoveredMapMarkerId;
  const activeDusunInfo =
    DUSUN_MARKERS.find((item) => item.id === activeMapMarkerId) ??
    DUSUN_MARKERS[0];
  const isMapLayerActive = Boolean(activeMapMarkerId || combinedMapActiveLayer);

  const setCombinedMapActiveLayer = (layerClass: string | null) => {
    setCombinedMapActiveLayerState(layerClass);
    const svgDocument = combinedMapObjectRef.current?.contentDocument;
    const svgRoot = svgDocument?.documentElement;
    if (!svgRoot) return;

    const mapLayers: Element[] = Array.from(svgRoot.querySelectorAll(".map-layer"));
    if (!mapLayers.length) return;

    if (!layerClass) {
      svgRoot.classList.remove("has-active");
      mapLayers.forEach((layer) => layer.classList.remove("is-active"));
      return;
    }

    svgRoot.classList.add("has-active");
    mapLayers.forEach((layer) => {
      layer.classList.toggle("is-active", layer.classList.contains(layerClass));
    });

    const activeLayer = mapLayers.find((layer) => layer.classList.contains(layerClass));
    if (activeLayer?.parentElement) {
      activeLayer.parentElement.appendChild(activeLayer);
    }
  };

  useEffect(() => {
    const mapObject = combinedMapObjectRef.current;
    if (!mapObject) return;
    const handleMapLoad = () => {
      setCombinedMapActiveLayer(null);
      setHoveredMapMarkerId(null);
      setPinnedMapMarkerId(null);
    };
    mapObject.addEventListener("load", handleMapLoad);
    return () => mapObject.removeEventListener("load", handleMapLoad);
  }, []);

  return (
    <section className="bg-white px-4 py-8 md:px-10 lg:px-12">
      <div className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-[40px] bg-[#052119] px-6 py-8 text-white shadow-2xl md:px-10 md:py-10 lg:rounded-[60px]">
        {/* Header Section */}
        <div className="flex flex-col gap-6 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <h2 className="font-upakarti text-[38px] font-bold leading-[1.05] tracking-tight md:text-[52px] lg:text-[64px]">
              <span className="block opacity-90">Peta &</span>
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-[#00D492] to-[#A4F4CF]">Batas Wilayah</span>
            </h2>
            <p className="mt-6 text-[14px] leading-relaxed text-[#D0FAE5]/70 md:text-[16px]">
              Gambaran visual pembagian administratif per dusun beserta batas-batas geografis Desa Pameutingan yang strategis dan terdokumentasi secara digital.
            </p>
          </div>

          <div className="hidden h-28 w-28 shrink-0 flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md md:flex">
            <MapPin className="mb-2 text-[#F0B100]" size={24} />
            <p className="text-[20px] font-black leading-none">345</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#00D492]/60">Migrasi</p>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[340px_1fr] lg:gap-12">
          {/* Boundary Cards Column */}
          <div className="order-2 grid grid-cols-2 gap-3 sm:gap-4 lg:order-1 lg:grid-cols-1">
            {BATAS_WILAYAH.map((item, index) => (
              <div
                key={item.arah}
                className="hero-reveal group rounded-2xl border border-white/5 bg-white/2 p-4 transition-all duration-500 hover:bg-white/5 hover:border-white/10 sm:p-5"
                onMouseEnter={() => {
                  setIsBoundaryCardHoverActive(true);
                  setHoveredMapMarkerId(null);
                  setCombinedMapActiveLayer(item.layerClass);
                }}
                onMouseLeave={() => {
                  const hasPinned = Boolean(pinnedMapMarkerId);
                  setIsBoundaryCardHoverActive(hasPinned);
                  setCombinedMapActiveLayer(hasPinned ? "layer-5" : null);
                }}
                style={{ animationDelay: `${100 + index * 100}ms` }}
              >
                <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0B100] text-[#052119] shadow-lg transition-transform group-hover:scale-110 sm:h-12 sm:w-12">
                    <span className="text-[16px] font-black tracking-tighter uppercase sm:text-[18px]">{item.arah.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-white sm:text-[16px]">{item.arah}</h4>
                    <p className="mt-1 text-[10px] leading-relaxed text-[#D0FAE5]/50 sm:text-[12px]">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Map Column */}
          <div className="order-1 flex flex-col gap-6 lg:order-2">
            <div className={`relative aspect-square w-full overflow-hidden rounded-[40px] border border-white/5 bg-white/2 p-4 transition-all duration-500 md:p-8 ${isMapLayerActive ? "shadow-[0_24px_48px_rgba(0,0,0,0.3)] bg-white/5" : ""}`}>
              <div className="relative z-10 mx-auto h-full w-full max-w-2xl">
                <object
                  ref={combinedMapObjectRef}
                  type="image/svg+xml"
                  data="/img/peta-batas-wilayah-figma.svg?v=3"
                  className="h-full w-full object-contain drop-shadow-2xl"
                >
                  <img src="/img/peta-batas-wilayah-figma.svg?v=3" alt="Peta Desa" className="h-full w-full object-contain" />
                </object>

                {/* Map Markers Overlay */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                  {DUSUN_MARKERS.map((marker) => {
                    const isActiveMarker = activeMapMarkerId === marker.id;
                    return (
                      <div
                        key={marker.id}
                        className={`absolute ${isActiveMarker ? "z-50" : "z-10"}`}
                        style={{
                          left: marker.position.left,
                          top: marker.position.top,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <button
                          type="button"
                          className={`pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/20 transition-all duration-500 shadow-xl ${isActiveMarker ? "scale-125 bg-[#00D492] ring-8 ring-[#00D492]/20" : "bg-[#F0B100] hover:scale-110 hover:bg-[#00D492]"}`}
                          onMouseEnter={() => {
                            setIsBoundaryCardHoverActive(true);
                            setHoveredMapMarkerId(marker.id);
                            setCombinedMapActiveLayer("layer-5");
                          }}
                          onMouseLeave={() => {
                            setIsBoundaryCardHoverActive(Boolean(pinnedMapMarkerId));
                            setHoveredMapMarkerId(null);
                            setCombinedMapActiveLayer(pinnedMapMarkerId ? "layer-5" : null);
                          }}
                          onClick={() => {
                            const nextPinnedId = pinnedMapMarkerId === marker.id ? null : marker.id;
                            setPinnedMapMarkerId(nextPinnedId);
                            setIsBoundaryCardHoverActive(Boolean(nextPinnedId));
                          }}
                        >
                          <div className="h-2 w-2 rounded-full bg-white" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mobile/Tablet Dusun Info Card */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[22px] font-black tracking-tight text-white">{activeDusunInfo.nama}</h3>
                    <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-[#00D492]">{activeDusunInfo.kepala}</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F0B100] text-[18px] font-black text-[#052119]">
                    {activeDusunInfo.id.split('-')[1]}
                  </div>
                </div>
                <p className="mt-4 text-[13px] leading-relaxed text-[#D0FAE5]/60">
                  {activeDusunInfo.keterangan}
                </p>
                <div className="mt-6 flex items-center gap-4 border-t border-white/5 pt-5">
                  <div className="flex flex-1 flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Penduduk</span>
                    <span className="text-[18px] font-black text-white">{activeDusunInfo.penduduk} Jiwa</span>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div className="flex flex-1 flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Distribusi</span>
                    <span className="text-[18px] font-black text-[#F0B100]">{Math.round(parseInt(activeDusunInfo.penduduk)/35.42)}%</span>
                  </div>
                </div>
              </div>

              {/* Legend Grid */}
              <div className="rounded-3xl border border-white/5 bg-white/2 p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Info size={16} className="text-[#00D492]" />
                  <h4 className="text-[12px] font-black uppercase tracking-widest text-white/40">Daftar Dusun</h4>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {DUSUN_MARKERS.map((marker) => (
                    <button
                      key={marker.id}
                      onClick={() => setPinnedMapMarkerId(marker.id)}
                      className={`flex items-center gap-3 rounded-xl border p-2.5 text-left transition-all ${activeMapMarkerId === marker.id ? "bg-[#00D492]/10 border-[#00D492]/30" : "bg-white/2 border-white/5 hover:bg-white/5"}`}
                    >
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: marker.warna }} />
                      <span className="truncate text-[11px] font-bold text-white/80">{marker.nama}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Quick Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Laki-laki", val: activeDusunInfo.laki_laki || "1,408", icon: Users2, color: "text-[#F0B100]" },
            { label: "Perempuan", val: activeDusunInfo.perempuan || "2,112", icon: Users2, color: "text-[#00D492]" },
            { label: "Total Unit", val: "1,087", icon: LayoutGrid, color: "text-white" }
          ].map((stat, i) => (
            <div key={i} className="flex items-center justify-between rounded-2xl bg-white/2 border border-white/5 px-6 py-4 transition-all hover:bg-white/5">
              <span className="text-[12px] font-bold text-white/40">{stat.label}</span>
              <span className={`text-[18px] font-black ${stat.color}`}>{stat.val}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Add missing icons
import { Users2, LayoutGrid } from "lucide-react";
