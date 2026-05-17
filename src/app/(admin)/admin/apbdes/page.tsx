'use client';

import { useState, useEffect } from 'react';
import { apbdesService, ApbdesTahunAnggaran } from '@/lib/api/apbdes';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function ApbdesAdminPage() {
  const [tahunList, setTahunList] = useState<ApbdesTahunAnggaran[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<ApbdesTahunAnggaran>>({
    tahun: new Date().getFullYear(),
    status: 'draft',
    keterangan: ''
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const router = useRouter();

  const fetchTahunList = async () => {
    try {
      setLoading(true);
      const data = await apbdesService.getTahunAnggaran();
      setTahunList(data);
    } catch (error) {
      toast.error('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTahunList();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await apbdesService.updateTahunAnggaran(editingId, formData);
        toast.success('Tahun Anggaran berhasil diperbarui');
      } else {
        await apbdesService.storeTahunAnggaran(formData);
        toast.success('Tahun Anggaran berhasil ditambahkan');
      }
      setIsDialogOpen(false);
      fetchTahunList();
      resetForm();
    } catch (error: any) {
      toast.error('Gagal menyimpan: ' + error.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Yakin ingin menghapus tahun anggaran ini? Semua item APBDes di dalamnya juga akan terhapus.')) {
      try {
        await apbdesService.deleteTahunAnggaran(id);
        toast.success('Berhasil dihapus');
        fetchTahunList();
      } catch (error) {
        toast.error('Gagal menghapus');
      }
    }
  };

  const resetForm = () => {
    setFormData({ tahun: new Date().getFullYear(), status: 'draft', keterangan: '' });
    setEditingId(null);
  };

  const openEditDialog = (item: ApbdesTahunAnggaran) => {
    setFormData({
      tahun: item.tahun,
      status: item.status,
      keterangan: item.keterangan || ''
    });
    setEditingId(item.id);
    setIsDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kelola APBDes</h1>
          <p className="text-muted-foreground">Kelola Tahun Anggaran dan Rincian APBDes.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Tambah Tahun</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit' : 'Tambah'} Tahun Anggaran</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Tahun</Label>
                <Input 
                  type="number" 
                  value={formData.tahun} 
                  onChange={(e) => setFormData({...formData, tahun: parseInt(e.target.value)})} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={formData.status} onValueChange={(val: any) => setFormData({...formData, status: val})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="ditetapkan">Ditetapkan (Awal)</SelectItem>
                    <SelectItem value="perubahan">Perubahan</SelectItem>
                    <SelectItem value="selesai">Selesai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Keterangan</Label>
                <Input 
                  value={formData.keterangan || ''} 
                  onChange={(e) => setFormData({...formData, keterangan: e.target.value})} 
                />
              </div>
              <div className="flex justify-end pt-4">
                <Button type="submit">{editingId ? 'Simpan Perubahan' : 'Tambahkan'}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tahun</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Keterangan</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={4} className="text-center">Loading...</TableCell></TableRow>
              ) : tahunList.length === 0 ? (
                <TableRow><TableCell colSpan={4} className="text-center">Belum ada data APBDes.</TableCell></TableRow>
              ) : (
                tahunList.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.tahun}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        item.status === 'ditetapkan' ? 'bg-green-100 text-green-800' :
                        item.status === 'perubahan' ? 'bg-blue-100 text-blue-800' :
                        item.status === 'selesai' ? 'bg-gray-100 text-gray-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status.toUpperCase()}
                      </span>
                    </TableCell>
                    <TableCell>{item.keterangan || '-'}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" onClick={() => router.push(`/admin/apbdes/${item.id}`)}>
                        <ChevronRight className="h-4 w-4 mr-1" /> Rincian
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => openEditDialog(item)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
