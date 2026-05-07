'use client';

import React, { useState, useEffect } from 'react';
import { apbdesService, ApbdesItem, ApbdesTahunAnggaran } from '@/lib/api/apbdes';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Plus, Edit, Trash2, ChevronRight, ChevronDown, ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter, useParams } from 'next/navigation';

export default function ApbdesDetailPage() {
  const params = useParams();
  const id = parseInt(params.id as string);
  const router = useRouter();

  const [items, setItems] = useState<ApbdesItem[]>([]);
  const [tahunInfo, setTahunInfo] = useState<ApbdesTahunAnggaran | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [parentId, setParentId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<ApbdesItem>>({
    kode_rekening: '',
    uraian: '',
    anggaran: 0,
    realisasi: 0,
    urutan: 0,
    is_header: false
  });
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [hapusFoto, setHapusFoto] = useState(false);
  const [fotoUrl, setFotoUrl] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await apbdesService.getItems(id);
      setItems(data);
      
      // Fetch tahun info
      const tahunData = await apbdesService.getTahunAnggaran();
      const current = tahunData.find(t => t.id === id);
      if (current) setTahunInfo(current);
      
    } catch (error) {
      toast.error('Gagal memuat data item');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchItems();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let payload: any;
      
      if (fotoFile || hapusFoto) {
        payload = new FormData();
        Object.entries(formData).forEach(([key, val]) => {
          if (val !== undefined && val !== null) {
             payload.append(key, val.toString());
          }
        });
        payload.append('tahun_anggaran_id', id.toString());
        if (parentId) payload.append('parent_id', parentId.toString());
        
        if (fotoFile) payload.append('foto', fotoFile);
        if (hapusFoto) payload.append('hapus_foto', '1');
      } else {
        payload = {
          ...formData,
          tahun_anggaran_id: id,
          parent_id: parentId
        };
      }

      if (editingId) {
        await apbdesService.updateItem(editingId, payload);
        toast.success('Berhasil diperbarui');
      } else {
        await apbdesService.storeItem(payload);
        toast.success('Berhasil ditambahkan');
      }
      setIsDialogOpen(false);
      fetchItems();
      resetForm();
    } catch (error: any) {
      toast.error('Gagal menyimpan: ' + error.message);
    }
  };

  const handleDelete = async (itemId: number) => {
    if (confirm('Yakin ingin menghapus item ini? Sub-item juga akan ikut terhapus.')) {
      try {
        await apbdesService.deleteItem(itemId);
        toast.success('Berhasil dihapus');
        fetchItems();
      } catch (error) {
        toast.error('Gagal menghapus');
      }
    }
  };

  const resetForm = () => {
    setFormData({ kode_rekening: '', uraian: '', anggaran: 0, realisasi: 0, urutan: 0, is_header: false });
    setEditingId(null);
    setParentId(null);
    setFotoFile(null);
    setHapusFoto(false);
    setFotoUrl(null);
  };

  const openAddDialog = (parent: number | null = null) => {
    resetForm();
    setParentId(parent);
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: ApbdesItem) => {
    setFormData({
      kode_rekening: item.kode_rekening,
      uraian: item.uraian,
      anggaran: item.anggaran,
      realisasi: item.realisasi,
      urutan: item.urutan,
      is_header: item.is_header
    });
    setEditingId(item.id);
    setParentId(item.parent_id);
    setFotoUrl(item.foto_url || null);
    setIsDialogOpen(true);
  };

  // Helper for formatting currency
  const formatCurrency = (val: string | number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(val));
  };

  // Recursive render
  const renderRows = (nodes: ApbdesItem[], level = 0) => {
    let rows: React.ReactNode[] = [];
    nodes.forEach(node => {
      rows.push(
        <TableRow key={node.id} className={node.is_header ? 'bg-muted/30 font-semibold' : ''}>
          <TableCell>
            <div style={{ paddingLeft: `${level * 2}rem` }} className="flex items-center">
              {node.children_recursive && node.children_recursive.length > 0 ? (
                <ChevronDown className="h-4 w-4 mr-2" />
              ) : (
                <span className="w-6 inline-block"></span>
              )}
              {node.kode_rekening}
              {node.foto_url && (
                <ImageIcon className="h-3 w-3 ml-2 text-emerald-600" />
              )}
            </div>
          </TableCell>
          <TableCell>{node.uraian}</TableCell>
          <TableCell className="text-right">{formatCurrency(node.anggaran)}</TableCell>
          <TableCell className="text-right">{formatCurrency(node.realisasi)}</TableCell>
          <TableCell className="text-right space-x-2">
            <Button variant="outline" size="icon" title="Tambah Sub-item" onClick={() => openAddDialog(node.id)}>
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => openEditDialog(node)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="destructive" size="icon" onClick={() => handleDelete(node.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </TableCell>
        </TableRow>
      );
      if (node.children_recursive && node.children_recursive.length > 0) {
        rows = rows.concat(renderRows(node.children_recursive, level + 1));
      }
    });
    return rows;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" onClick={() => router.push('/admin/apbdes')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rincian APBDes {tahunInfo?.tahun}</h1>
          <p className="text-muted-foreground">Kelola rincian rekening pendapatan, belanja, dan pembiayaan.</p>
        </div>
        <div className="ml-auto">
          <Button onClick={() => openAddDialog(null)}><Plus className="mr-2 h-4 w-4" /> Tambah Header Utama</Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={(open) => {
        setIsDialogOpen(open);
        if (!open) resetForm();
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit' : 'Tambah'} Item APBDes</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Kode Rekening</Label>
                <Input required value={formData.kode_rekening} onChange={e => setFormData({...formData, kode_rekening: e.target.value})} placeholder="Misal: 4.1.1" />
              </div>
              <div className="space-y-2">
                <Label>Nomor Urut</Label>
                <Input type="number" value={formData.urutan} onChange={e => setFormData({...formData, urutan: parseInt(e.target.value)})} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Uraian</Label>
              <Input required value={formData.uraian} onChange={e => setFormData({...formData, uraian: e.target.value})} placeholder="Nama akun/kegiatan" />
            </div>

            <div className="flex items-center space-x-2 my-4">
              <Checkbox id="is_header" checked={formData.is_header} onCheckedChange={(checked) => setFormData({...formData, is_header: checked as boolean})} />
              <Label htmlFor="is_header">Item ini adalah Header (Tidak memiliki nilai anggaran sendiri, hanya kalkulasi dari sub-item)</Label>
            </div>

            {!formData.is_header && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Anggaran (Rp)</Label>
                    <Input type="number" required value={formData.anggaran} onChange={e => setFormData({...formData, anggaran: parseFloat(e.target.value)})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Realisasi (Rp)</Label>
                    <Input type="number" required value={formData.realisasi} onChange={e => setFormData({...formData, realisasi: parseFloat(e.target.value)})} />
                  </div>
                </div>
                
                <div className="space-y-2 pt-2 border-t mt-4">
                  <Label>Foto Dokumentasi Realisasi (Opsional)</Label>
                  {fotoUrl && !hapusFoto && (
                    <div className="mb-2">
                      <img src={`http://localhost:8000${fotoUrl}`} alt="Dokumentasi" className="h-20 w-auto rounded border" />
                      <div className="flex items-center space-x-2 mt-2">
                        <Checkbox id="hapus_foto" checked={hapusFoto} onCheckedChange={(c) => setHapusFoto(c as boolean)} />
                        <Label htmlFor="hapus_foto" className="text-red-600 text-xs">Hapus foto saat ini</Label>
                      </div>
                    </div>
                  )}
                  <Input 
                    type="file" 
                    accept="image/*" 
                    onChange={e => setFotoFile(e.target.files?.[0] || null)} 
                    disabled={hapusFoto}
                  />
                  <p className="text-xs text-muted-foreground">Maksimal 5MB. Muncul di infografis publik.</p>
                </div>
              </>
            )}

            <div className="flex justify-end pt-4">
              <Button type="submit">{editingId ? 'Simpan' : 'Tambahkan'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kode Rekening</TableHead>
                <TableHead>Uraian</TableHead>
                <TableHead className="text-right">Anggaran</TableHead>
                <TableHead className="text-right">Realisasi</TableHead>
                <TableHead className="text-right w-[200px]">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={5} className="text-center">Loading...</TableCell></TableRow>
              ) : items.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-center">Belum ada item rincian.</TableCell></TableRow>
              ) : (
                renderRows(items)
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
