export interface DusunMarker {
  id: string;
  nama: string;
  position: { left: string; top: string };
}

export const DUSUN_MARKERS: DusunMarker[] = [
  {
    id: "dusun-1",
    nama: "Dusun Cimawate",
    position: { left: "50%", top: "43%" },
  },
  {
    id: "dusun-2",
    nama: "Dusun Karang",
    position: { left: "56%", top: "50%" },
  },
  {
    id: "dusun-3",
    nama: "Dusun Pameutingan",
    position: { left: "51%", top: "58%" },
  },
  {
    id: "dusun-4",
    nama: "Dusun Cianjuang",
    position: { left: "45%", top: "50%" },
  },
];
