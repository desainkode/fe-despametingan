"use client";

import { useState, useRef, useEffect } from "react";
import { BATAS_WILAYAH, DUSUN_MARKERS } from "../config/home-data";

const markerPopupPlacementClass: Record<
  (typeof DUSUN_MARKERS)[number]["popupPlacement"],
  string
> = {
  left: "right-full mr-3 top-1/2 -translate-y-1/2",
  right: "left-full ml-3 top-1/2 -translate-y-1/2",
  top: "bottom-full left-1/2 mb-3 -translate-x-1/2",
};

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
    <section className="bg-white px-4 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12">
      <div className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-4xl border border-[#0A6A4E]/50 bg-linear-to-br from-[#0B281F] via-[#195B47] to-[#0B281F] px-5 py-6 text-white shadow-[0_18px_32px_rgba(11,40,31,0.22)] md:px-8 md:py-8 lg:px-10 lg:py-10">
        <div className="grid gap-5 border-b border-[#A4F4CF]/25 pb-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_auto] md:items-start md:gap-7">
          <h2 className="font-bold text-[34px] leading-[0.95] md:text-[42px] lg:text-[46px]">
            <span className="block">Peta &amp;</span>
            <span className="block">Batas Wilayah</span>
          </h2>

          <p className="max-w-none text-[13px] leading-6 text-white/90 md:pt-1 md:text-[15px] md:leading-7 lg:text-[16px]">
            Gambaran visual pembagian administratif per dusun beserta
            batas-batas geografis Desa Pameutingan yang strategis.
          </p>

          <div className="inline-flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-full border-[3px] border-[#F0B100] bg-[#F4F3EF] text-[#0B281F] shadow-[0_8px_16px_rgba(0,0,0,0.2)] md:h-24 md:w-24">
            <p className="text-[16px] font-bold leading-none md:text-[18px]">345</p>
            <p className="mt-1 text-center text-[9px] leading-tight text-[#0B281F]/75 md:text-[10px]">
              Migrasi
              <br />
              Penduduk
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-1">
            {BATAS_WILAYAH.map((item, index) => (
              <div
                key={item.arah}
                className="hero-reveal group rounded-2xl border border-white/14 bg-linear-to-br from-white/16 via-white/12 to-white/8 p-3.5 shadow-[inset_8px_-8px_14px_rgba(165,165,165,0.08),inset_-8px_8px_14px_rgba(255,255,255,0.08),0_10px_18px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[#B9FEE0]/35 hover:shadow-[0_20px_24px_rgba(0,0,0,0.2)]"
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
                style={{ animationDelay: `${120 + index * 70}ms` }}
              >
                <div className="inline-flex min-w-24 items-center justify-center rounded-lg bg-[#F0B100] px-4 py-1.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] group-hover:shadow-[0_8px_14px_rgba(240,177,0,0.34)]">
                  <span
                    className="text-[24px] leading-none text-white"
                  >
                    {item.arah}
                  </span>
                </div>
                <p className="mt-3 text-[13px] leading-6 text-white/92">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          <div className={`group/mapWrap relative overflow-hidden rounded-3xl border border-white/12 bg-transparent p-2 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_20px_30px_rgba(0,0,0,0.2)] md:p-4 ${isBoundaryCardHoverActive ? "shadow-[0_24px_34px_rgba(0,0,0,0.24)]" : ""}`}>
            <div className={`group/map relative z-10 mx-auto w-full max-w-180 aspect-[1081.5/1033.96] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.015] ${isBoundaryCardHoverActive ? "scale-[1.015]" : ""}`}>
              <object
                ref={combinedMapObjectRef}
                type="image/svg+xml"
                data="/img/peta-batas-wilayah-figma.svg?v=3"
                aria-label="Peta batas wilayah desa"
                className={`h-full w-full rounded-xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/map:drop-shadow-[0_20px_34px_rgba(11,40,31,0.28)] ${isMapLayerActive
                  ? "drop-shadow-[0_14px_28px_rgba(11,40,31,0.24)]"
                  : isBoundaryCardHoverActive
                    ? "drop-shadow-[0_18px_30px_rgba(11,40,31,0.22)]"
                    : ""
                  }`}
              >
                <img
                  src="/img/peta-batas-wilayah-figma.svg?v=3"
                  alt="Peta batas wilayah desa"
                  className="h-full w-full object-contain"
                  loading="lazy"
                />
              </object>

              <div className="pointer-events-none absolute inset-0 z-20">
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
                        aria-label={marker.nama}
                        aria-pressed={isActiveMarker}
                        className={`pointer-events-auto relative flex h-6 w-6 items-center justify-center rounded-full border-2 border-white shadow-[0_0_0_0_rgba(0,212,146,0.35)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A4F4CF]/80 ${isActiveMarker
                          ? "scale-125 bg-[#00D492] shadow-[0_0_0_10px_rgba(0,212,146,0.16),0_10px_20px_rgba(11,40,31,0.24)]"
                          : "bg-[#F0B100] hover:scale-110 hover:bg-[#00D492]"
                          }`}
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
                          setHoveredMapMarkerId(nextPinnedId ? marker.id : null);
                          setIsBoundaryCardHoverActive(Boolean(nextPinnedId));
                          setCombinedMapActiveLayer(nextPinnedId ? "layer-5" : null);
                        }}
                      >
                        <span className="h-2.5 w-2.5 rounded-full bg-white/95" />
                      </button>

                      {isActiveMarker && (
                        <div
                          className={`absolute z-30 w-54 rounded-2xl border border-white/14 bg-[#F4F3EF] px-4 py-3 text-[#0B281F] shadow-[0_18px_28px_rgba(0,0,0,0.24)] backdrop-blur-md ${markerPopupPlacementClass[marker.popupPlacement]}`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-[13px] font-semibold leading-4">{marker.nama}</p>
                              <p className="mt-1 text-[8px] text-[#0B281F]/65">{marker.kepala}</p>
                            </div>
                            <span
                              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                              style={{ backgroundColor: marker.warna }}
                            >
                              {marker.penduduk}
                            </span>
                          </div>
                          <p className="mt-2 text-[11px] leading-5 text-[#0B281F]/82">{marker.keterangan}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative z-20 mt-4 grid gap-4 md:mt-0">
              <div className={`rounded-xl bg-[#F4F3EF] text-[#0B281F] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:absolute md:left-[18%] md:top-6 md:z-30 md:w-73 ${isMapLayerActive ? "-translate-y-0.5 shadow-[0_18px_28px_rgba(0,0,0,0.24)]" : "shadow-[0_10px_18px_rgba(0,0,0,0.18)]"}`}>
                <div className="flex items-center justify-between gap-0">
                  <div className="px-4 py-2.5">
                    <p className="text-[14px] font-semibold leading-4">{activeDusunInfo.nama}</p>
                    <p className="mt-1 text-[8px] text-[#0B281F]/65">{activeDusunInfo.kepala}</p>
                  </div>
                  <div className="flex h-full items-center gap-2 rounded-r-xl bg-[#F0B100] px-3 py-2 text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                    <span className="text-[11px] font-bold">{activeDusunInfo.penduduk}</span>
                    <span className="text-[9px] leading-tight">Penduduk</span>
                  </div>
                </div>
              </div>

              <div className="rounded-[14px] border border-[#00A172]/45 bg-linear-to-r from-[#E0C02C]/36 via-[#1E7B5F]/72 to-[#2E9A70]/82 p-4 shadow-[0_12px_18px_rgba(0,0,0,0.2)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:absolute md:bottom-3 md:right-3 md:z-30 md:w-73 md:hover:-translate-y-1 md:hover:shadow-[0_20px_26px_rgba(0,0,0,0.24)]">
                <h3 className="text-[26px] font-bold leading-none text-[#F4F3EF] md:text-[34px]">Legenda Dusun</h3>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {DUSUN_MARKERS.map((marker) => {
                    const isActive = activeMapMarkerId === marker.id;
                    return (
                      <button
                        key={marker.id}
                        type="button"
                        className={`group/legend flex items-center gap-2 rounded-lg border p-1.5 text-left transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-[#0B281F]/18 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A4F4CF]/75 ${isActive ? "border-[#8EE7C5]/45 bg-[#0B281F]/22 shadow-[0_10px_16px_rgba(0,0,0,0.18)]" : "border-white/10 bg-transparent"}`}
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
                          setHoveredMapMarkerId(nextPinnedId ? marker.id : null);
                          setIsBoundaryCardHoverActive(Boolean(nextPinnedId));
                          setCombinedMapActiveLayer(nextPinnedId ? "layer-5" : null);
                        }}
                      >
                        <span className={`h-2.5 w-2.5 shrink-0 rounded-xs transition-all duration-500 ${isActive ? "scale-125" : "scale-100"}`} style={{ backgroundColor: marker.warna }} />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[11px] text-[#F4F3EF] transition-all duration-500 md:text-[12px]">{marker.nama}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3 md:gap-5">
          <div className="group/stat flex overflow-hidden rounded-md bg-[#0B281F]/50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-[#0B281F]/58 hover:shadow-[0_14px_20px_rgba(0,0,0,0.22)]">
            <div className="bg-[#F4F3EF] px-3 py-2 text-[#0B281F]">
              <p className="text-[12px] font-semibold">Total Penduduk</p>
              <p className="text-[9px] text-[#0B281F]/60">yang sudah terdata</p>
            </div>
            <div className="flex flex-1 items-center justify-between px-3">
              <div className="flex items-center gap-1.5 text-[#A4F4CF]">
                {[1, 2, 3, 4].map((i) => <span key={i} className="h-2.5 w-2.5 rounded-full bg-[#A4F4CF]" />)}
              </div>
              <p className="text-[14px] font-semibold text-[#A4F4CF]">{activeMapMarkerId ? activeDusunInfo.penduduk : "3520"}</p>
            </div>
          </div>

          <div className="group/stat flex overflow-hidden rounded-md bg-[#F0B100]/95 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-[#F3B400] hover:shadow-[0_14px_20px_rgba(0,0,0,0.22)]">
            <div className="bg-[#F4F3EF] px-3 py-2 text-[#0B281F]">
              <p className="text-[12px] font-semibold">Laki-laki</p>
              <p className="text-[9px] text-[#0B281F]/60">yang sudah terdata</p>
            </div>
            <div className="flex flex-1 items-center justify-between px-3 text-[#F4F3EF]">
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((i) => <span key={i} className="h-2.5 w-2.5 rounded-full bg-white" />)}
              </div>
              <p className="text-[14px] font-semibold">{activeMapMarkerId ? activeDusunInfo.laki_laki : "1408"}</p>
            </div>
          </div>

          <div className="group/stat flex overflow-hidden rounded-md bg-[#0B281F]/75 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-[#0B281F]/85 hover:shadow-[0_14px_20px_rgba(0,0,0,0.22)]">
            <div className="bg-[#F4F3EF] px-3 py-2 text-[#0B281F]">
              <p className="text-[12px] font-semibold">Perempuan</p>
              <p className="text-[9px] text-[#0B281F]/60">yang sudah terdata</p>
            </div>
            <div className="flex flex-1 items-center justify-between px-3 text-[#A4F4CF]">
              <div className="flex items-center gap-1.5 transition-transform duration-500 group-hover/stat:scale-[1.08]">
                {[1, 2, 3, 4, 5].map((i) => <span key={i} className="h-2.5 w-2.5 rounded-full bg-[#A4F4CF]" />)}
              </div>
              <p className="text-[14px] font-semibold">{activeMapMarkerId ? activeDusunInfo.perempuan : "2112"}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
