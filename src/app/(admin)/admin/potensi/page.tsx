"use client";

import { useEffect, useState } from "react";
import { 
  Lightbulb, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Loader2,
  Plus,
  Edit,
  Trash2,
  ExternalLink
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
import { getPotensiList, Potensi, deletePotensi } from "@/lib/api/potensi";
import { PaginatedResponse } from "@/types";
import { toast } from "sonner";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { PotensiForm } from "@/components/admin/potensi/PotensiForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function PotensiAdminPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PaginatedResponse<Potensi> | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPotensi, setSelectedPotensi] = useState<Potensi | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(timer);
  }, [search, page]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getPotensiList({ search, page });
      setData(res);
    } catch (error) {
      toast.error("Gagal mengambil data potensi");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus potensi ini?")) return;
    
    try {
      await deletePotensi(id);
      toast.success("Potensi berhasil dihapus");
      fetchData();
    } catch (error) {
      toast.error("Gagal menghapus potensi");
    }
  };

  const handleEdit = (item: Potensi) => {
    setSelectedPotensi(item);
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setSelectedPotensi(null);
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
          <h1 className="text-2xl font-bold tracking-tight">Potensi Unggulan Desa</h1>
          <p className="text-sm text-muted-foreground">Kelola aset, wisata, dan potensi ekonomi desa</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Cari nama potensi..." 
              className="pl-10 h-11" 
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer font-bold h-11"
            onClick={handleCreate}
          >
            <Plus className="h-4 w-4 mr-2" />
            Tambah Potensi
          </Button>
        </div>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[120px] font-bold text-slate-700">Gambar</TableHead>
              <TableHead className="font-bold text-slate-700">Nama Potensi</TableHead>
              <TableHead className="font-bold text-slate-700">Deskripsi</TableHead>
              <TableHead className="font-bold text-slate-700">Aksen</TableHead>
              <TableHead className="text-right font-bold text-slate-700">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
                    <p className="text-sm text-muted-foreground font-medium">Memuat data potensi...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : data?.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Lightbulb className="h-12 w-12 text-muted-foreground/30" />
                    <p className="text-lg font-medium text-slate-400">Belum ada data potensi</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data?.data.map((item: Potensi) => (
                <TableRow key={item.id} className="group hover:bg-slate-50 transition-colors border-slate-100">
                  <TableCell>
                    <div className="relative h-12 w-20 overflow-hidden rounded-lg border border-slate-200 shadow-sm bg-slate-100">
                      {item.image ? (
                        <Image 
                          src={item.image} 
                          alt={item.title} 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Lightbulb className="h-5 w-5 text-slate-300" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-bold text-slate-700">
                    {item.title}
                  </TableCell>
                  <TableCell className="max-w-xs truncate text-slate-500 text-xs">
                    {item.description}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div 
                        className="h-3 w-3 rounded-full shadow-sm ring-2 ring-white" 
                        style={{ backgroundColor: item.accent_color }}
                      />
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-tighter">{item.accent_color}</span>
                    </div>
                  </TableCell>
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
          <p className="text-sm text-muted-foreground font-medium text-slate-500">
            Menampilkan <span className="text-slate-800">{data.meta.from}</span> - <span className="text-slate-800">{data.meta.to}</span> dari <span className="text-slate-800">{data.meta.total}</span> potensi
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(prev => Math.max(1, prev - 1))}
              disabled={page === 1 || loading}
              className="cursor-pointer rounded-lg font-bold"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Sebelumnya
            </Button>
            <div className="px-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Halaman {data.meta.current_page} / {data.meta.last_page}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(prev => Math.min(data.meta.last_page, prev + 1))}
              disabled={page === data.meta.last_page || loading}
              className="cursor-pointer rounded-lg font-bold"
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
                  <Lightbulb size={20} />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold text-slate-800">
                    {selectedPotensi ? "Edit Potensi Desa" : "Tambah Potensi Desa"}
                  </DialogTitle>
                  <DialogDescription className="text-slate-500 font-medium">
                    Kelola aset dan daya tarik unggulan desa
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
              <PotensiForm 
                initialData={selectedPotensi} 
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
