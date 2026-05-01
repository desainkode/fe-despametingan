"use client";

import { useState, useRef, useEffect } from "react";
import { MapPin, Info, Users2, LayoutGrid } from "lucide-react";
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

        <div className="mt-6 grid gap-5 lg:grid-cols-[260px_1fr_320px] lg:items-stretch xl:gap-6">
          {/* 1. Left: Boundary Wilayah (Super Compact) */}
          <div className="order-2 flex flex-col gap-4 lg:order-1">
            <div className="flex items-center gap-2 px-1">
              <LayoutGrid size={14} className="text-[#00D492]" />
              <h4 className="text-[11px] font-black uppercase tracking-widest text-white/30">Batas Wilayah</h4>
            </div>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
              {BATAS_WILAYAH.map((item, index) => (
                <button
                  key={item.arah}
                  className="hero-reveal group flex items-center gap-3 rounded-xl border border-white/5 bg-white/2 p-2.5 text-left transition-all duration-300 hover:bg-white/5 hover:border-[#00D492]/40"
                  onMouseEnter={() => {
                    setIsBoundaryCardHoverActive(true);
                    setCombinedMapActiveLayer(item.layerClass);
                  }}
                  onMouseLeave={() => {
                    const hasPinned = Boolean(pinnedMapMarkerId);
                    setIsBoundaryCardHoverActive(hasPinned);
                    setCombinedMapActiveLayer(hasPinned ? "layer-5" : null);
                  }}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F0B100] text-[#052119] text-[14px] font-black group-hover:scale-110 transition-transform">
                    {item.arah.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="truncate text-[12px] font-bold text-white/90">{item.arah}</h4>
                    <p className="line-clamp-2 text-[9px] leading-relaxed text-[#D0FAE5]/40">{item.detail}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Legend inside Left Column to save space */}
            <div className="mt-auto hidden flex-col gap-3 rounded-2xl border border-white/5 bg-white/2 p-4 lg:flex">
              <div className="flex items-center gap-2">
                <Info size={14} className="text-[#00D492]" />
                <h4 className="text-[10px] font-black uppercase tracking-widest text-white/30">Dusun</h4>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {DUSUN_MARKERS.slice(0, 4).map((marker) => (
                  <div key={marker.id} className="flex items-center gap-2 opacity-60">
                    <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: marker.warna }} />
                    <span className="truncate text-[10px] font-bold text-white">{marker.nama.replace('Dusun ', '')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Center: Landscape Map */}
          <div className="order-1 lg:order-2">
            <div className={`relative flex h-full min-h-[400px] flex-col items-center justify-center rounded-[40px] border border-white/10 bg-white/5 p-4 transition-all duration-700 ${isMapLayerActive ? "bg-white/10 shadow-2xl" : ""}`}>
              <div className="relative z-10 h-full w-full">
                <object
                  ref={combinedMapObjectRef}
                  type="image/svg+xml"
                  data="/img/peta-batas-wilayah-figma.svg?v=3"
                  className="h-full w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
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
                          className={`pointer-events-auto group/marker relative flex h-6 w-6 items-center justify-center rounded-full border-2 border-white/20 transition-all duration-500 shadow-xl ${isActiveMarker ? "scale-125 bg-[#00D492] ring-4 ring-[#00D492]/20" : "bg-[#F0B100] hover:scale-110 hover:bg-[#00D492]"}`}
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
                          onClick={() => setPinnedMapMarkerId(pinnedMapMarkerId === marker.id ? null : marker.id)}
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-white" />

                          <div className={`absolute invisible opacity-0 group-hover/marker:visible group-hover/marker:opacity-100 transition-all duration-300 whitespace-nowrap rounded-lg bg-[#052119]/90 backdrop-blur-md px-2.5 py-1.5 text-[10px] font-bold text-white shadow-2xl border border-white/20 pointer-events-none z-50 -translate-x-1/2 bottom-full mb-3 left-1/2 ${isActiveMarker ? '!visible !opacity-100' : ''}`}>
                            {marker.nama}
                            <div className="absolute border-4 border-transparent top-full left-1/2 -translate-x-1/2 border-t-[#052119]/90" />
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Legend Hint */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-black/20 px-3 py-1.5 backdrop-blur-md text-[9px] font-bold text-white/50 border border-white/5">
                <span className="h-1 w-1 rounded-full bg-[#00D492]" />
                Interactive Map
              </div>
            </div>
          </div>

          {/* 3. Right: Info Panel & Legend */}
          <div className="order-3 flex flex-col gap-4">
            {/* Active Dusun Card */}
            <div className="rounded-3xl border border-[#00D492]/30 bg-linear-to-br from-[#00D492]/10 to-transparent p-5 backdrop-blur-xl shadow-xl">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="truncate text-[20px] font-black tracking-tight text-white">{activeDusunInfo.nama}</h3>
                  <p className="truncate text-[10px] font-bold uppercase tracking-widest text-[#00D492]">{activeDusunInfo.kepala}</p>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0B100] text-[18px] font-black text-[#052119]">
                  {activeDusunInfo.id.split('-')[1]}
                </div>
              </div>

              <p className="mt-4 text-[12px] leading-relaxed text-[#D0FAE5]/50 line-clamp-2">
                {activeDusunInfo.keterangan}
              </p>

              {/* Compact Stats inside Right Panel */}
              <div className="mt-5 grid grid-cols-2 gap-2 border-t border-white/10 pt-5">
                {[
                  { label: "Penduduk", val: activeDusunInfo.penduduk, color: "text-white" },
                  { label: "Laki-laki", val: activeDusunInfo.laki_laki || "1.408", color: "text-[#F0B100]" },
                  { label: "Perempuan", val: activeDusunInfo.perempuan || "2.112", color: "text-[#00D492]" },
                  { label: "Total Unit", val: "1.087", color: "text-white" }
                ].map((stat, i) => (
                  <div key={i} className="rounded-xl bg-white/5 border border-white/5 p-2.5">
                    <p className="text-[8px] font-bold uppercase tracking-widest text-white/30">{stat.label}</p>
                    <p className={`text-[14px] font-black ${stat.color}`}>{stat.val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick List (Interactive Legend) */}
            <div className="flex-1 rounded-3xl border border-white/5 bg-white/2 p-5">
              <div className="mb-3 flex items-center gap-2">
                <Users2 size={14} className="text-[#00D492]" />
                <h4 className="text-[10px] font-black uppercase tracking-widest text-white/30">Pilih Dusun</h4>
              </div>
              <div className="grid gap-1.5">
                {DUSUN_MARKERS.map((marker) => (
                  <button
                    key={marker.id}
                    onClick={() => setPinnedMapMarkerId(marker.id)}
                    className={`flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left transition-all ${activeMapMarkerId === marker.id ? "bg-[#00D492]/20 border-[#00D492]/40" : "bg-white/5 border-white/5 hover:bg-white/10"}`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: marker.warna }} />
                      <span className="truncate text-[11px] font-bold text-white/80">{marker.nama.replace('Dusun ', '')}</span>
                    </div>
                    <span className="text-[9px] font-black text-white/20">#{marker.id.split('-')[1]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
