"use client";

import { useEffect, useState } from "react";
import { 
  Users, 
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
import { 
  getPendudukList, 
  Penduduk, 
  PaginatedResponse,
  createPenduduk,
  updatePenduduk,
  deletePenduduk,
  getPendudukDetail
} from "@/lib/api/penduduk";
import { toast } from "sonner";
import { PendudukForm } from "./components/PendudukForm";
import { ConfirmDeleteDialog } from "./components/ConfirmDeleteDialog";

export default function PendudukPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PaginatedResponse<Penduduk> | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // CRUD State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedPenduduk, setSelectedPenduduk] = useState<any | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 500); // Debounce search

    return () => clearTimeout(timer);
  }, [search, page]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getPendudukList({ search, page });
      setData(res);
    } catch (error) {
      toast.error("Gagal mengambil data penduduk");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedPenduduk(null);
    setIsFormOpen(true);
  };

  const handleEdit = async (penduduk: Penduduk) => {
    try {
      setIsActionLoading(true);
      const detail = await getPendudukDetail(penduduk.id);
      setSelectedPenduduk(detail);
      setIsFormOpen(true);
    } catch (error) {
      toast.error("Gagal mengambil detail penduduk");
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDeleteClick = (penduduk: Penduduk) => {
    setSelectedPenduduk(penduduk);
    setIsDeleteOpen(true);
  };

  const onFormSubmit = async (values: any) => {
    try {
      if (selectedPenduduk) {
        await updatePenduduk(selectedPenduduk.id, values);
        toast.success("Data penduduk berhasil diperbarui");
      } else {
        await createPenduduk(values);
        toast.success("Data penduduk berhasil ditambahkan");
      }
      fetchData();
    } catch (error) {
      toast.error(selectedPenduduk ? "Gagal memperbarui data" : "Gagal menambahkan data");
      throw error;
    }
  };

  const onConfirmDelete = async () => {
    if (!selectedPenduduk) return;
    try {
      setIsActionLoading(true);
      await deletePenduduk(selectedPenduduk.id);
      toast.success("Data penduduk berhasil dihapus");
      setIsDeleteOpen(false);
      fetchData();
    } catch (error) {
      toast.error("Gagal menghapus data");
    } finally {
      setIsActionLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Data Penduduk</h1>
          <p className="text-sm text-muted-foreground">Kelola dan pantau seluruh data warga desa</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Cari nama atau NIK..." 
              className="pl-10" 
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1); // Reset to page 1 on search
              }}
            />
          </div>
          <Button onClick={handleAdd} className="bg-emerald-700 hover:bg-emerald-800">
            <Plus className="h-4 w-4 mr-1.5" />
            Tambah Penduduk
          </Button>
        </div>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[100px]">NIK</TableHead>
              <TableHead>Nama Lengkap</TableHead>
              <TableHead>Jenis Kelamin</TableHead>
              <TableHead>Tanggal Lahir</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
                    <p className="text-sm text-muted-foreground">Memuat data...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : data?.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Users className="h-12 w-12 text-muted-foreground/30" />
                    <p className="text-lg font-medium">Data Tidak Ditemukan</p>
                    <p className="text-sm text-muted-foreground">Coba gunakan kata kunci pencarian yang berbeda</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data?.data.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/30 transition-colors group">
                  <TableCell className="font-mono text-xs font-semibold">
                    {item.nik}
                  </TableCell>
                  <TableCell className="font-medium">{item.nama}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={item.jenis_kelamin === 'L' ? 'border-blue-200 bg-blue-50 text-blue-700' : 'border-pink-200 bg-pink-50 text-pink-700'}>
                      {item.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.tanggal_lahir}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                        onClick={() => handleEdit(item)}
                        disabled={isActionLoading}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDeleteClick(item)}
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
            Menampilkan <span className="font-medium text-foreground">{data.meta.from}</span> sampai <span className="font-medium text-foreground">{data.meta.to}</span> dari <span className="font-medium text-foreground">{data.meta.total}</span> penduduk
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

      {/* CRUD Dialogs */}
      <PendudukForm 
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={onFormSubmit}
        initialData={selectedPenduduk}
        title={selectedPenduduk ? "Edit Data Penduduk" : "Tambah Penduduk Baru"}
        description={selectedPenduduk ? "Perbarui informasi penduduk yang sudah terdaftar." : "Masukkan data lengkap penduduk sesuai KTP."}
      />

      <ConfirmDeleteDialog 
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={onConfirmDelete}
        title="Hapus Data Penduduk"
        description={`Apakah Anda yakin ingin menghapus data penduduk dengan nama ${selectedPenduduk?.nama}? Tindakan ini tidak dapat dibatalkan.`}
        loading={isActionLoading}
      />
    </div>
  );
}

