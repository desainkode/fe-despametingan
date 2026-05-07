"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { 
  FileText, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Loader2,
  Plus,
  Edit,
  Trash2,
  Eye
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
import { getBeritaList, Berita, deleteBerita } from "@/lib/api/berita";
import { PaginatedResponse } from "@/types";
import { toast } from "sonner";
import Image from "next/image";
import { BeritaForm } from "@/components/admin/berita/BeritaForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function BeritaAdminPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PaginatedResponse<Berita> | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBerita, setSelectedBerita] = useState<Berita | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(timer);
  }, [search, page]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getBeritaList({ search, page });
      setData(res);
    } catch (error) {
      toast.error("Gagal mengambil data berita");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus berita ini?")) return;
    
    try {
      await deleteBerita(id);
      toast.success("Berita berhasil dihapus");
      fetchData();
    } catch (error) {
      toast.error("Gagal menghapus berita");
    }
  };

  const handleEdit = (berita: Berita) => {
    setSelectedBerita(berita);
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setSelectedBerita(null);
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
          <h1 className="text-2xl font-bold tracking-tight">Manajemen Berita</h1>
          <p className="text-sm text-muted-foreground">Kelola kabar dan informasi terbaru desa</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Cari judul berita..." 
              className="pl-10" 
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
            onClick={handleCreate}
          >
            <Plus className="h-4 w-4 mr-2" />
            Tambah Berita
          </Button>
        </div>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[80px]">Gambar</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
                    <p className="text-sm text-muted-foreground">Memuat data...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : data?.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <FileText className="h-12 w-12 text-muted-foreground/30" />
                    <p className="text-lg font-medium">Belum ada berita</p>
                    <p className="text-sm text-muted-foreground">Klik tombol tambah untuk membuat berita pertama</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data?.data.map((item: Berita) => (
                <TableRow key={item.id} className="group hover:bg-slate-50 transition-colors border-slate-100">
                  <TableCell>
                    <div className="relative h-12 w-20 overflow-hidden rounded-lg border border-slate-200 shadow-sm">
                      {item.image ? (
                        <Image 
                          src={item.image} 
                          alt={item.title} 
                          fill 
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-slate-100">
                          <FileText className="h-5 w-5 text-slate-400" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-bold text-slate-700 max-w-xs">
                    <span className="block truncate">{item.title}</span>
                    <span className="block text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-0.5">Oleh: {item.author?.name}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors border-none font-semibold">
                      {item.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={item.status === 'published' ? 'default' : 'outline'}
                      className={cn(
                        "font-bold px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wide border-none",
                        item.status === 'published' 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-amber-100 text-amber-700'
                      )}
                    >
                      {item.status === 'published' ? 'Terbit' : 'Draft'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs font-medium text-slate-500">
                    {new Date(item.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all cursor-pointer">
                        <Eye className="h-4 w-4" />
                      </Button>
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

      {data && data.meta.last_page > 1 && (
        <div className="flex items-center justify-between py-4">
          <p className="text-sm text-muted-foreground">
            Menampilkan <span className="font-medium text-foreground">{data.meta.from}</span> sampai <span className="font-medium text-foreground">{data.meta.to}</span> dari <span className="font-medium text-foreground">{data.meta.total}</span> berita
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(prev => Math.max(1, prev - 1))}
              disabled={page === 1 || loading}
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
            >
              Selanjutnya
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden border-none shadow-2xl bg-white rounded-3xl">
          <div className="flex flex-col max-h-[90vh]">
            <DialogHeader className="px-8 pt-8 pb-4 bg-emerald-50/50">
              <div className="flex items-center gap-3 mb-1">
                <div className="p-2 bg-emerald-600 text-white rounded-xl shadow-sm">
                  <FileText size={20} />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold text-slate-800">
                    {selectedBerita ? "Edit Berita" : "Tambah Berita Baru"}
                  </DialogTitle>
                  <DialogDescription className="text-slate-500 font-medium">
                    {selectedBerita ? "Perbarui informasi berita desa Anda" : "Bagikan kabar terbaru untuk warga desa"}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
              <BeritaForm 
                initialData={selectedBerita} 
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
