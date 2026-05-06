"use client";

import { useEffect, useState } from "react";
import { 
  CreditCard, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Loader2,
  MapPin
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
import { getKartuKeluargaList, KartuKeluarga } from "@/lib/api/kartu-keluarga";
import { PaginatedResponse } from "@/lib/api/penduduk";
import { toast } from "sonner";

export default function KartuKeluargaPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PaginatedResponse<KartuKeluarga> | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Data Kartu Keluarga</h1>
          <p className="text-sm text-muted-foreground">Kelola basis data keluarga di wilayah desa</p>
        </div>
        <div className="relative w-full md:w-80">
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
                <TableRow key={item.id} className="hover:bg-muted/30 transition-colors">
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
                    <Button variant="ghost" size="sm" className="text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50">
                      Lihat Anggota
                    </Button>
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
    </div>
  );
}
