"use client";

import { useEffect, useState } from "react";
import { 
  Contact, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Loader2,
  Plus,
  Edit,
  Trash2,
  GripVertical
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getPerangkatDesaList, PerangkatDesa, deletePerangkatDesa } from "@/lib/api/perangkat-desa";
import { PaginatedResponse } from "@/types";
import { toast } from "sonner";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { PerangkatDesaForm } from "@/components/admin/perangkat-desa/PerangkatDesaForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function PerangkatDesaAdminPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PaginatedResponse<PerangkatDesa> | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPerangkat, setSelectedPerangkat] = useState<PerangkatDesa | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(timer);
  }, [search, page]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getPerangkatDesaList({ search, page });
      setData(res);
    } catch (error) {
      toast.error("Gagal mengambil data perangkat desa");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus perangkat desa ini?")) return;
    try {
      await deletePerangkatDesa(id);
      toast.success("Data berhasil dihapus");
      fetchData();
    } catch (error) {
      toast.error("Gagal menghapus data");
    }
  };

  const handleEdit = (item: PerangkatDesa) => {
    setSelectedPerangkat(item);
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setSelectedPerangkat(null);
    setIsDialogOpen(true);
  };

  const handleFormSuccess = () => {
    setIsDialogOpen(false);
    fetchData();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Struktur Perangkat Desa</h1>
          <p className="text-sm text-muted-foreground">Kelola profil dan jabatan aparatur pemerintahan desa</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Cari nama atau jabatan..." 
              className="pl-10" 
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer font-bold"
            onClick={handleCreate}
          >
            <Plus className="h-4 w-4 mr-2" />
            Tambah Perangkat
          </Button>
        </div>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[80px] font-bold text-slate-700">Foto</TableHead>
              <TableHead className="font-bold text-slate-700">Nama Lengkap</TableHead>
              <TableHead className="font-bold text-slate-700">Jabatan</TableHead>
              <TableHead className="font-bold text-slate-700">Urutan</TableHead>
              <TableHead className="text-right font-bold text-slate-700">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-64 text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-emerald-600" />
                </TableCell>
              </TableRow>
            ) : data?.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Contact className="h-12 w-12 text-muted-foreground/30" />
                    <p className="text-lg font-medium">Belum ada data perangkat desa</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data?.data.map((item: PerangkatDesa) => (
                <TableRow key={item.id} className="group hover:bg-slate-50 transition-colors border-slate-100">
                  <TableCell>
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-slate-200 shadow-sm bg-slate-100">
                      {item.image ? (
                        <Image src={item.image} alt={item.nama} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <Contact className="h-6 w-6 m-3 text-slate-300" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-bold text-slate-700">{item.nama}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-none font-bold px-3 py-1">
                      {item.jabatan}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-bold text-slate-400">#{item.urutan}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-9 w-9 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all cursor-pointer"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-9 w-9 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer" 
                        onClick={() => handleDelete(item.id)}
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
      
      {/* Pagination */}
      {data && data.meta.last_page > 1 && (
        <div className="flex items-center justify-between py-4">
          <p className="text-sm text-muted-foreground">
            Menampilkan <span className="font-medium text-foreground">{data.meta.from}</span> sampai <span className="font-medium text-foreground">{data.meta.to}</span> dari <span className="font-medium text-foreground">{data.meta.total}</span> data
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(prev => Math.max(1, prev - 1))}
              disabled={page === 1 || loading}
              className="cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Sebelumnya
            </Button>
            <div className="flex items-center gap-1 mx-2">
              <span className="text-sm font-medium">Halaman {data.meta.current_page} dari {data.meta.last_page}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(prev => Math.min(data.meta.last_page, prev + 1))}
              disabled={page === data.meta.last_page || loading}
              className="cursor-pointer"
            >
              Selanjutnya
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden border-none shadow-2xl bg-white rounded-3xl">
          <div className="flex flex-col max-h-[90vh]">
            <DialogHeader className="px-8 pt-8 pb-4 bg-emerald-50/50 border-b border-emerald-100/50">
              <div className="flex items-center gap-3 mb-1">
                <div className="p-2 bg-emerald-600 text-white rounded-xl shadow-sm">
                  <Contact size={20} />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold text-slate-800">
                    {selectedPerangkat ? "Edit Perangkat Desa" : "Tambah Perangkat Desa"}
                  </DialogTitle>
                  <DialogDescription className="text-slate-500 font-medium">
                    Lengkapi profil aparatur pemerintahan desa
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
              <PerangkatDesaForm 
                initialData={selectedPerangkat} 
                onSuccess={handleFormSuccess}
                onCancel={() => setIsDialogOpen(false)}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
