"use client";

import { useEffect, useState } from "react";
import { 
  CreditCard, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Loader2,
  MapPin,
  Plus,
  Edit,
  Trash2,
  Users as UsersIcon
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
  getKartuKeluargaList, 
  KartuKeluarga, 
  createKartuKeluarga, 
  updateKartuKeluarga, 
  deleteKartuKeluarga,
  getKartuKeluargaDetail
} from "@/lib/api/kartu-keluarga";
import { PaginatedResponse } from "@/lib/api/penduduk";
import { toast } from "sonner";
import { KartuKeluargaForm } from "./components/KartuKeluargaForm";
import { ConfirmDeleteDialog } from "../penduduk/components/ConfirmDeleteDialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export default function KartuKeluargaPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PaginatedResponse<KartuKeluarga> | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // CRUD State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedKK, setSelectedKK] = useState<KartuKeluarga | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(timer);
  }, [search, page]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getKartuKeluargaList({ search, page });
      setData(res);
    } catch (error) {
      toast.error("Gagal mengambil data kartu keluarga");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedKK(null);
    setIsFormOpen(true);
  };

  const handleEdit = (kk: KartuKeluarga) => {
    setSelectedKK(kk);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (kk: KartuKeluarga) => {
    setSelectedKK(kk);
    setIsDeleteOpen(true);
  };

  const handleViewMembers = async (kk: KartuKeluarga) => {
    try {
      setIsActionLoading(true);
      const detail = await getKartuKeluargaDetail(kk.id);
      setSelectedKK(detail);
      setIsDetailOpen(true);
    } catch (error) {
      toast.error("Gagal mengambil detail anggota keluarga");
    } finally {
      setIsActionLoading(false);
    }
  };

  const onFormSubmit = async (values: any) => {
    try {
      if (selectedKK) {
        await updateKartuKeluarga(selectedKK.id, values);
        toast.success("Data kartu keluarga berhasil diperbarui");
      } else {
        await createKartuKeluarga(values);
        toast.success("Data kartu keluarga berhasil ditambahkan");
      }
      fetchData();
    } catch (error) {
      toast.error(selectedKK ? "Gagal memperbarui data" : "Gagal menambahkan data");
      throw error;
    }
  };

  const onConfirmDelete = async () => {
    if (!selectedKK) return;
    try {
      setIsActionLoading(true);
      await deleteKartuKeluarga(selectedKK.id);
      toast.success("Data kartu keluarga berhasil dihapus");
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
          <h1 className="text-2xl font-bold tracking-tight">Data Kartu Keluarga</h1>
          <p className="text-sm text-muted-foreground">Kelola basis data keluarga di wilayah desa</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Cari No KK atau Alamat..." 
              className="pl-10" 
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <Button onClick={handleAdd} className="bg-emerald-700 hover:bg-emerald-800">
            <Plus className="h-4 w-4 mr-1.5" />
            Tambah KK
          </Button>
        </div>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[150px]">No. KK</TableHead>
              <TableHead>Alamat</TableHead>
              <TableHead className="w-[100px]">RT / RW</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
                    <p className="text-sm text-muted-foreground">Memuat data...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : data?.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <CreditCard className="h-12 w-12 text-muted-foreground/30" />
                    <p className="text-lg font-medium">Data Tidak Ditemukan</p>
                    <p className="text-sm text-muted-foreground">Coba gunakan kata kunci pencarian yang berbeda</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data?.data.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/30 transition-colors group">
                  <TableCell className="font-mono text-xs font-semibold">
                    {item.no_kk}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-muted-foreground shrink-0" />
                      <span className="text-sm line-clamp-1">{item.alamat}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1.5">
                      <Badge variant="secondary" className="font-mono text-[10px]">RT {item.rt}</Badge>
                      <Badge variant="secondary" className="font-mono text-[10px]">RW {item.rw}</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        onClick={() => handleViewMembers(item)}
                        disabled={isActionLoading}
                      >
                        <UsersIcon className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                        onClick={() => handleEdit(item)}
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
            Menampilkan <span className="font-medium text-foreground">{data.meta.from}</span> sampai <span className="font-medium text-foreground">{data.meta.to}</span> dari <span className="font-medium text-foreground">{data.meta.total}</span> KK
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
      <KartuKeluargaForm 
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={onFormSubmit}
        initialData={selectedKK}
        title={selectedKK ? "Edit Kartu Keluarga" : "Tambah Kartu Keluarga"}
        description={selectedKK ? "Perbarui informasi kartu keluarga yang sudah ada." : "Masukkan informasi kartu keluarga baru."}
      />

      <ConfirmDeleteDialog 
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={onConfirmDelete}
        title="Hapus Kartu Keluarga"
        description={`Apakah Anda yakin ingin menghapus data KK dengan nomor ${selectedKK?.no_kk}? Tindakan ini tidak dapat dibatalkan.`}
        loading={isActionLoading}
      />

      {/* Member Details Sheet */}
      <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Anggota Keluarga</SheetTitle>
            <SheetDescription>
              Daftar penduduk yang terdaftar dalam KK No. {selectedKK?.no_kk}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            {selectedKK?.anggota_keluarga?.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-10">Belum ada anggota keluarga terdaftar.</p>
            ) : (
              selectedKK?.anggota_keluarga?.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
                  <div>
                    <p className="font-medium text-sm">{member.nama}</p>
                    <p className="text-xs text-muted-foreground font-mono">{member.nik}</p>
                  </div>
                  <Badge variant="outline" className="text-[10px]">
                    {member.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

