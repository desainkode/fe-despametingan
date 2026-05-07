"use client";

import { useEffect, useState } from "react";
import { 
  ShieldCheck, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Loader2,
  Plus,
  Edit,
  Trash2,
  FileDown
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
import { getPPIDList, PPID, deletePPID } from "@/lib/api/ppid";
import { PaginatedResponse } from "@/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { PPIDForm } from "@/components/admin/ppid/PPIDForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function PPIDAdminPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PaginatedResponse<PPID> | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPPID, setSelectedPPID] = useState<PPID | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(timer);
  }, [search, page]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getPPIDList({ search, page });
      setData(res);
    } catch (error) {
      toast.error("Gagal mengambil data PPID");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus dokumen ini?")) return;
    
    try {
      await deletePPID(id);
      toast.success("Dokumen berhasil dihapus");
      fetchData();
    } catch (error) {
      toast.error("Gagal menghapus dokumen");
    }
  };

  const handleEdit = (item: PPID) => {
    setSelectedPPID(item);
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setSelectedPPID(null);
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
          <h1 className="text-2xl font-bold tracking-tight">PPID & Transparansi</h1>
          <p className="text-sm text-muted-foreground font-medium">Kelola dokumen informasi publik dan keterbukaan informasi desa</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Cari nama dokumen..." 
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
            Tambah Dokumen
          </Button>
        </div>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-bold text-slate-700">Nama Dokumen</TableHead>
              <TableHead className="font-bold text-slate-700">Kategori</TableHead>
              <TableHead className="font-bold text-slate-700">Keterangan</TableHead>
              <TableHead className="font-bold text-slate-700">Tanggal</TableHead>
              <TableHead className="text-right font-bold text-slate-700">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
                    <p className="text-sm text-muted-foreground font-medium">Memuat data dokumen...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : data?.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <ShieldCheck className="h-12 w-12 text-muted-foreground/30" />
                    <p className="text-lg font-medium text-slate-400">Belum ada dokumen publik</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data?.data.map((item: PPID) => (
                <TableRow key={item.id} className="group hover:bg-slate-50 transition-colors border-slate-100">
                  <TableCell className="font-bold text-slate-700">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 rounded-lg transition-colors">
                        <FileDown size={18} />
                      </div>
                      <span className="truncate max-w-xs">{item.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-slate-50 text-slate-500 border-slate-200 font-bold px-2 py-0.5 rounded-lg text-[10px] uppercase">
                      {item.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate text-slate-500 text-xs italic">
                    {item.description || "-"}
                  </TableCell>
                  <TableCell className="text-xs font-bold text-slate-400">
                    {new Date(item.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
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
            Menampilkan <span className="text-slate-800">{data.meta.from}</span> - <span className="text-slate-800">{data.meta.to}</span> dari <span className="text-slate-800">{data.meta.total}</span> dokumen
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
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold text-slate-800">
                    {selectedPPID ? "Edit Dokumen PPID" : "Unggah Dokumen PPID"}
                  </DialogTitle>
                  <DialogDescription className="text-slate-500 font-medium">
                    Pastikan dokumen dalam format yang sesuai untuk publik
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
              <PPIDForm 
                initialData={selectedPPID} 
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
