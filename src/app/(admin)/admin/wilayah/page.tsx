"use client";

import { useEffect, useState } from "react";
import { 
  Map, 
  Loader2,
  Plus,
  Edit,
  Trash2,
  MapPin,
  Home
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getDusunList, Dusun, deleteDusun } from "@/lib/api/dusun";
import { getRwList, Rw, deleteRw } from "@/lib/api/rw";
import { getRtList, Rt, deleteRt } from "@/lib/api/rt";
import { getWilayahList, WilayahAdministratif, deleteWilayah } from "@/lib/api/wilayah-administratif";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DusunForm } from "@/components/admin/wilayah/DusunForm";
import { RwForm } from "@/components/admin/wilayah/RwForm";
import { RtForm } from "@/components/admin/wilayah/RtForm";
import { WilayahForm } from "@/components/admin/wilayah/WilayahForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function WilayahAdminPage() {
  const [loading, setLoading] = useState(true);
  const [dusuns, setDusuns] = useState<Dusun[]>([]);
  const [rws, setRws] = useState<Rw[]>([]);
  const [rts, setRts] = useState<Rt[]>([]);
  const [boundaries, setBoundaries] = useState<WilayahAdministratif[]>([]);
  
  const [isDusunDialogOpen, setIsDusunDialogOpen] = useState(false);
  const [selectedDusun, setSelectedDusun] = useState<Dusun | null>(null);

  const [isRwDialogOpen, setIsRwDialogOpen] = useState(false);
  const [selectedRw, setSelectedRw] = useState<Rw | null>(null);

  const [isRtDialogOpen, setIsRtDialogOpen] = useState(false);
  const [selectedRt, setSelectedRt] = useState<Rt | null>(null);
  
  const [isBoundaryDialogOpen, setIsBoundaryDialogOpen] = useState(false);
  const [selectedBoundary, setSelectedBoundary] = useState<WilayahAdministratif | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [dusunRes, boundaryRes, rwRes, rtRes] = await Promise.all([
        getDusunList(),
        getWilayahList(),
        getRwList({ per_page: 100 }),
        getRtList({ per_page: 100 })
      ]);
      setDusuns(dusunRes.data);
      setBoundaries(boundaryRes.data);
      setRws(rwRes.data);
      setRts(rtRes.data);
    } catch (error) {
      toast.error("Gagal mengambil data wilayah");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDusun = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus dusun ini?")) return;
    try {
      await deleteDusun(id);
      toast.success("Dusun berhasil dihapus");
      fetchData();
    } catch (error) {
      toast.error("Gagal menghapus dusun");
    }
  };

  const handleDeleteRw = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus RW ini?")) return;
    try {
      await deleteRw(id);
      toast.success("RW berhasil dihapus");
      fetchData();
    } catch (error) {
      toast.error("Gagal menghapus RW");
    }
  };

  const handleDeleteRt = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus RT ini?")) return;
    try {
      await deleteRt(id);
      toast.success("RT berhasil dihapus");
      fetchData();
    } catch (error) {
      toast.error("Gagal menghapus RT");
    }
  };

  const handleDeleteBoundary = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus batas wilayah ini?")) return;
    try {
      await deleteWilayah(id);
      toast.success("Batas wilayah berhasil dihapus");
      fetchData();
    } catch (error) {
      toast.error("Gagal menghapus batas wilayah");
    }
  };

  const handleEditDusun = (dusun: Dusun) => {
    setSelectedDusun(dusun);
    setIsDusunDialogOpen(true);
  };

  const handleEditRw = (rw: Rw) => {
    setSelectedRw(rw);
    setIsRwDialogOpen(true);
  };

  const handleEditRt = (rt: Rt) => {
    setSelectedRt(rt);
    setIsRtDialogOpen(true);
  };

  const handleEditBoundary = (boundary: WilayahAdministratif) => {
    setSelectedBoundary(boundary);
    setIsBoundaryDialogOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Wilayah Administratif</h1>
          <p className="text-sm text-muted-foreground font-medium">Kelola data pemetaan dusun, RW, RT, dan batas geografi desa</p>
        </div>
      </div>

      <Tabs defaultValue="dusun" className="w-full">
        <TabsList className="bg-slate-100 p-1 rounded-xl h-auto gap-1">
          <TabsTrigger 
            value="dusun" 
            className="rounded-lg py-2.5 px-6 font-bold data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm transition-all"
          >
            Data Dusun
          </TabsTrigger>
          <TabsTrigger 
            value="rw" 
            className="rounded-lg py-2.5 px-6 font-bold data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm transition-all"
          >
            Data RW
          </TabsTrigger>
          <TabsTrigger 
            value="rt" 
            className="rounded-lg py-2.5 px-6 font-bold data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm transition-all"
          >
            Data RT
          </TabsTrigger>
          <TabsTrigger 
            value="batas" 
            className="rounded-lg py-2.5 px-6 font-bold data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm transition-all"
          >
            Batas Wilayah
          </TabsTrigger>
        </TabsList>
        
        {/* TAB DUSUN */}
        <TabsContent value="dusun" className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-800">Daftar Dusun & Statistik</h3>
            <Button 
              size="sm" 
              className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer font-bold rounded-xl h-10 px-5"
              onClick={() => {
                setSelectedDusun(null);
                setIsDusunDialogOpen(true);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Dusun
            </Button>
          </div>
          
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="font-bold text-slate-700">Nama Dusun</TableHead>
                  <TableHead className="font-bold text-slate-700">Kepala Dusun</TableHead>
                  <TableHead className="font-bold text-slate-700">Penduduk</TableHead>
                  <TableHead className="font-bold text-slate-700">Posisi (X,Y)</TableHead>
                  <TableHead className="text-right font-bold text-slate-700">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={5} className="h-48 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto text-emerald-600" /></TableCell></TableRow>
                ) : dusuns.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-48 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <MapPin className="h-10 w-10 text-slate-200" />
                        <p className="text-slate-400 font-medium">Belum ada data dusun</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  dusuns.map((item: Dusun) => (
                    <TableRow key={item.id} className="group hover:bg-slate-50 transition-colors border-slate-100">
                      <TableCell className="font-bold text-slate-700">
                        <div className="flex items-center gap-3">
                          <div className="h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white shadow-sm" />
                          {item.nama}
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600 font-medium">{item.kepala_dusun || "-"}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-bold border-none px-2.5">
                          {item.jml_penduduk ?? 0} Jiwa
                        </Badge>
                      </TableCell>
                      <TableCell className="text-[10px] font-mono font-bold text-slate-400 tracking-tighter">
                        {item.koordinat_x || "-"}, {item.koordinat_y || "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all cursor-pointer"
                            onClick={() => handleEditDusun(item)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                            onClick={() => handleDeleteDusun(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* TAB RW */}
        <TabsContent value="rw" className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-800">Daftar Rukun Warga (RW)</h3>
            <Button 
              size="sm" 
              className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer font-bold rounded-xl h-10 px-5"
              onClick={() => {
                setSelectedRw(null);
                setIsRwDialogOpen(true);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah RW
            </Button>
          </div>
          
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="font-bold text-slate-700">Nama RW</TableHead>
                  <TableHead className="font-bold text-slate-700">Ketua RW</TableHead>
                  <TableHead className="font-bold text-slate-700">Dusun Induk</TableHead>
                  <TableHead className="font-bold text-slate-700">Jumlah Penduduk</TableHead>
                  <TableHead className="text-right font-bold text-slate-700">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={5} className="h-48 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto text-emerald-600" /></TableCell></TableRow>
                ) : rws.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-48 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Home className="h-10 w-10 text-slate-200" />
                        <p className="text-slate-400 font-medium">Belum ada data RW</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  rws.map((item: Rw) => (
                    <TableRow key={item.id} className="group hover:bg-slate-50 transition-colors border-slate-100">
                      <TableCell className="font-bold text-slate-700">
                        {item.nama}
                      </TableCell>
                      <TableCell className="text-slate-600 font-medium">{item.ketua_rw || "-"}</TableCell>
                      <TableCell className="text-emerald-700 font-bold text-xs bg-emerald-50/50 rounded-lg px-2 py-1 inline-block mt-3.5">
                        {item.dusun?.nama || "-"}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-bold border-none px-2.5">
                          {item.jml_penduduk ?? 0} Jiwa
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all cursor-pointer"
                            onClick={() => handleEditRw(item)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                            onClick={() => handleDeleteRw(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* TAB RT */}
        <TabsContent value="rt" className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-800">Daftar Rukun Tetangga (RT)</h3>
            <Button 
              size="sm" 
              className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer font-bold rounded-xl h-10 px-5"
              onClick={() => {
                setSelectedRt(null);
                setIsRtDialogOpen(true);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah RT
            </Button>
          </div>
          
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="font-bold text-slate-700">Nama RT</TableHead>
                  <TableHead className="font-bold text-slate-700">Ketua RT</TableHead>
                  <TableHead className="font-bold text-slate-700">RW Induk</TableHead>
                  <TableHead className="font-bold text-slate-700">Dusun Induk</TableHead>
                  <TableHead className="font-bold text-slate-700">Jumlah Penduduk</TableHead>
                  <TableHead className="text-right font-bold text-slate-700">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={6} className="h-48 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto text-emerald-600" /></TableCell></TableRow>
                ) : rts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-48 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Home className="h-10 w-10 text-slate-200" />
                        <p className="text-slate-400 font-medium">Belum ada data RT</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  rts.map((item: Rt) => (
                    <TableRow key={item.id} className="group hover:bg-slate-50 transition-colors border-slate-100">
                      <TableCell className="font-bold text-slate-700">
                        {item.nama}
                      </TableCell>
                      <TableCell className="text-slate-600 font-medium">{item.ketua_rt || "-"}</TableCell>
                      <TableCell className="text-slate-600 font-semibold text-xs">
                        {item.rw?.nama || "-"}
                      </TableCell>
                      <TableCell className="text-emerald-700 font-bold text-xs bg-emerald-50/50 rounded-lg px-2 py-1 inline-block mt-3.5">
                        {item.rw?.dusun?.nama || "-"}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-bold border-none px-2.5">
                          {item.jml_penduduk ?? 0} Jiwa
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all cursor-pointer"
                            onClick={() => handleEditRt(item)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                            onClick={() => handleDeleteRt(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* TAB BATAS WILAYAH */}
        <TabsContent value="batas" className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-800">Batas Wilayah Geografis</h3>
            <Button 
              size="sm" 
              className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer font-bold rounded-xl h-10 px-5"
              onClick={() => {
                setSelectedBoundary(null);
                setIsBoundaryDialogOpen(true);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Batas
            </Button>
          </div>
          
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="w-[150px] font-bold text-slate-700">Arah</TableHead>
                  <TableHead className="font-bold text-slate-700">Detail Perbatasan</TableHead>
                  <TableHead className="text-right font-bold text-slate-700">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={3} className="h-48 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto text-emerald-600" /></TableCell></TableRow>
                ) : boundaries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="h-48 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Map className="h-10 w-10 text-slate-200" />
                        <p className="text-slate-400 font-medium">Belum ada data batas wilayah</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  boundaries.map((item: WilayahAdministratif) => (
                    <TableRow key={item.id} className="group hover:bg-slate-50 transition-colors border-slate-100">
                      <TableCell className="font-bold text-emerald-700 bg-emerald-50/30">
                        {item.arah}
                      </TableCell>
                      <TableCell className="text-slate-600 text-sm leading-relaxed">{item.detail}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all cursor-pointer"
                            onClick={() => handleEditBoundary(item)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                            onClick={() => handleDeleteBoundary(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Dusun Dialog */}
      <Dialog open={isDusunDialogOpen} onOpenChange={setIsDusunDialogOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden border-none shadow-2xl bg-white rounded-3xl">
          <div className="flex flex-col max-h-[90vh]">
            <DialogHeader className="px-8 pt-8 pb-4 bg-emerald-50/50 border-b border-emerald-100/50">
              <div className="flex items-center gap-3 mb-1">
                <div className="p-2 bg-emerald-600 text-white rounded-xl shadow-sm">
                  <MapPin size={20} />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold text-slate-800">
                    {selectedDusun ? "Edit Data Dusun" : "Tambah Dusun Baru"}
                  </DialogTitle>
                  <DialogDescription className="text-slate-500 font-medium">
                    Kelola statistik dan posisi geografis dusun
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
              <DusunForm 
                initialData={selectedDusun} 
                onSuccess={() => {
                  setIsDusunDialogOpen(false);
                  fetchData();
                }}
                onCancel={() => setIsDusunDialogOpen(false)}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* RW Dialog */}
      <Dialog open={isRwDialogOpen} onOpenChange={setIsRwDialogOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden border-none shadow-2xl bg-white rounded-3xl">
          <div className="flex flex-col max-h-[90vh]">
            <DialogHeader className="px-8 pt-8 pb-4 bg-emerald-50/50 border-b border-emerald-100/50">
              <div className="flex items-center gap-3 mb-1">
                <div className="p-2 bg-emerald-600 text-white rounded-xl shadow-sm">
                  <Home size={20} />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold text-slate-800">
                    {selectedRw ? "Edit Data RW" : "Tambah RW Baru"}
                  </DialogTitle>
                  <DialogDescription className="text-slate-500 font-medium">
                    Kelola data dan ketua Rukun Warga (RW)
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
              <RwForm 
                initialData={selectedRw} 
                onSuccess={() => {
                  setIsRwDialogOpen(false);
                  fetchData();
                }}
                onCancel={() => setIsRwDialogOpen(false)}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* RT Dialog */}
      <Dialog open={isRtDialogOpen} onOpenChange={setIsRtDialogOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden border-none shadow-2xl bg-white rounded-3xl">
          <div className="flex flex-col max-h-[90vh]">
            <DialogHeader className="px-8 pt-8 pb-4 bg-emerald-50/50 border-b border-emerald-100/50">
              <div className="flex items-center gap-3 mb-1">
                <div className="p-2 bg-emerald-600 text-white rounded-xl shadow-sm">
                  <Home size={20} />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold text-slate-800">
                    {selectedRt ? "Edit Data RT" : "Tambah RT Baru"}
                  </DialogTitle>
                  <DialogDescription className="text-slate-500 font-medium">
                    Kelola data dan ketua Rukun Tetangga (RT)
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
              <RtForm 
                initialData={selectedRt} 
                onSuccess={() => {
                  setIsRtDialogOpen(false);
                  fetchData();
                }}
                onCancel={() => setIsRtDialogOpen(false)}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Boundary Dialog */}
      <Dialog open={isBoundaryDialogOpen} onOpenChange={setIsBoundaryDialogOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden border-none shadow-2xl bg-white rounded-3xl">
          <div className="flex flex-col max-h-[90vh]">
            <DialogHeader className="px-8 pt-8 pb-4 bg-emerald-50/50 border-b border-emerald-100/50">
              <div className="flex items-center gap-3 mb-1">
                <div className="p-2 bg-emerald-600 text-white rounded-xl shadow-sm">
                  <Map size={20} />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold text-slate-800">
                    {selectedBoundary ? "Edit Batas Wilayah" : "Tambah Batas Wilayah"}
                  </DialogTitle>
                  <DialogDescription className="text-slate-500 font-medium">
                    Definisikan perbatasan desa di setiap mata angin
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
              <WilayahForm 
                initialData={selectedBoundary} 
                onSuccess={() => {
                  setIsBoundaryDialogOpen(false);
                  fetchData();
                }}
                onCancel={() => setIsBoundaryDialogOpen(false)}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
