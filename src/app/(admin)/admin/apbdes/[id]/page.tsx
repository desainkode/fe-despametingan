'use client';

import React, { useState, useEffect } from 'react';
import { apbdesService, ApbdesItem, ApbdesTahunAnggaran, ApbdesRealisasi } from '@/lib/api/apbdes';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Plus, Edit, Trash2, ChevronRight, ChevronDown, ImageIcon, ClipboardCheck, History, Calendar, Image as ImageIcon2 } from 'lucide-react';
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
    is_header: false,
    keterangan_realisasi: ''
  });
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [hapusFoto, setHapusFoto] = useState(false);
  const [fotoUrl, setFotoUrl] = useState<string | null>(null);

  // Realisasi Dialog state
  const [isRealisasiDialogOpen, setIsRealisasiDialogOpen] = useState(false);
  const [realisasiFormData, setRealisasiFormData] = useState({
    jumlah: 0,
    tanggal: new Date().toISOString().split('T')[0],
    keterangan: '',
  });

  // History Dialog state
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [historyItems, setHistoryItems] = useState<ApbdesRealisasi[]>([]);
  const [selectedItem, setSelectedItem] = useState<ApbdesItem | null>(null);
  const [loadingHistory, setLoadingHistory] = useState(false);

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
      setIsRealisasiDialogOpen(false);
      fetchItems();
      resetForm();
    } catch (error: any) {
      toast.error('Gagal menyimpan: ' + error.message);
    }
  };

  const handleUpdateRealisasi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;

    try {
      const payload = new FormData();
      payload.append('jumlah', realisasiFormData.jumlah.toString());
      payload.append('tanggal', realisasiFormData.tanggal);
      payload.append('keterangan', realisasiFormData.keterangan);
      if (fotoFile) payload.append('foto', fotoFile);

      await apbdesService.addRealisasi(editingId, payload);
      toast.success('Riwayat realisasi berhasil ditambahkan');
      setIsRealisasiDialogOpen(false);
      fetchItems();
      resetForm();
    } catch (error: any) {
      toast.error('Gagal menambah realisasi: ' + error.message);
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
    setFormData({ kode_rekening: '', uraian: '', anggaran: 0, realisasi: 0, urutan: 0, is_header: false, keterangan_realisasi: '' });
    setRealisasiFormData({ jumlah: 0, tanggal: new Date().toISOString().split('T')[0], keterangan: '' });
    setEditingId(null);
    setParentId(null);
    setFotoFile(null);
    setHapusFoto(false);
    setFotoUrl(null);
  };

  const openAddDialog = (parent: ApbdesItem | null = null) => {
    resetForm();
    if (parent) {
      setParentId(parent.id);
      setFormData(prev => ({ ...prev, kode_rekening: parent.kode_rekening + '.' }));
    } else {
      setParentId(null);
    }
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: ApbdesItem) => {
    setFormData({
      kode_rekening: item.kode_rekening,
      uraian: item.uraian,
      anggaran: item.anggaran,
      realisasi: item.realisasi,
      urutan: item.urutan,
      is_header: item.is_header,
      keterangan_realisasi: item.keterangan_realisasi || ''
    });
    setEditingId(item.id);
    setParentId(item.parent_id);
    setFotoUrl(item.foto_url || null);
    setIsDialogOpen(true);
  };

  const openRealisasiDialog = (item: ApbdesItem) => {
    setEditingId(item.id);
    setFormData({
      kode_rekening: item.kode_rekening,
      uraian: item.uraian,
      anggaran: item.anggaran,
    });
    setRealisasiFormData({
      jumlah: 0,
      tanggal: new Date().toISOString().split('T')[0],
      keterangan: '',
    });
    setFotoUrl(null);
    setIsRealisasiDialogOpen(true);
  };

  const openHistoryDialog = async (item: ApbdesItem) => {
    setSelectedItem(item);
    setIsHistoryDialogOpen(true);
    try {
      setLoadingHistory(true);
      const history = await apbdesService.getRealisasiHistory(item.id);
      setHistoryItems(history);
    } catch (error) {
      toast.error('Gagal memuat riwayat realisasi');
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleDeleteHistory = async (realisasiId: number) => {
    if (!selectedItem || !confirm('Yakin ingin menghapus catatan realisasi ini?')) return;
    try {
      await apbdesService.deleteRealisasi(selectedItem.id, realisasiId);
      toast.success('Berhasil dihapus');
      // Refresh history and main list
      const history = await apbdesService.getRealisasiHistory(selectedItem.id);
      setHistoryItems(history);
      fetchItems();
    } catch (error) {
      toast.error('Gagal menghapus');
    }
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
          <TableCell className="p-2">
            <div style={{ paddingLeft: `${level * 1.5}rem` }} className="flex items-center text-xs md:text-sm">
              {node.children_recursive && node.children_recursive.length > 0 ? (
                <ChevronDown className="h-3 w-3 mr-1.5" />
              ) : (
                <span className="w-4.5 inline-block"></span>
              )}
              <span className="truncate">{node.kode_rekening}</span>
              {node.foto_url && (
                <ImageIcon className="h-3 w-3 ml-1.5 text-emerald-600 shrink-0" />
              )}
            </div>
          </TableCell>
          <TableCell className="p-2 text-xs md:text-sm max-w-[200px] truncate">{node.uraian}</TableCell>
          <TableCell className="text-right p-2 text-xs md:text-sm">{formatCurrency(node.anggaran)}</TableCell>
          <TableCell className="text-right p-2 text-xs md:text-sm">{formatCurrency(node.realisasi)}</TableCell>
          <TableCell className="text-right p-2 space-x-1">
            {!node.is_header && (
              <>
                <Button variant="outline" size="sm" title="Lihat Riwayat" onClick={() => openHistoryDialog(node)} className="h-8 w-8 text-blue-600 border-blue-200 hover:bg-blue-50">
                  <History className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" title="Tambah Realisasi" onClick={() => openRealisasiDialog(node)} className="h-8 w-8 text-emerald-600 border-emerald-200 hover:bg-emerald-50">
                  <ClipboardCheck className="h-4 w-4" />
                </Button>
              </>
            )}
            <Button variant="outline" size="sm" title="Tambah Sub-item" onClick={() => openAddDialog(node)} className="h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" title="Edit" onClick={() => openEditDialog(node)} className="h-8 w-8">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="destructive" size="sm" title="Hapus" onClick={() => handleDelete(node.id)} className="h-8 w-8">
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
    <div className="p-4 md:p-6 space-y-4 max-w-full overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={() => router.push('/admin/apbdes')} className="h-9 w-9">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Rincian APBDes {tahunInfo?.tahun}</h1>
            <p className="text-sm text-muted-foreground hidden md:block">Kelola rincian rekening pendapatan, belanja, dan pembiayaan.</p>
          </div>
        </div>
        <div className="md:ml-auto">
          <Button size="sm" onClick={() => openAddDialog(null)}><Plus className="mr-2 h-4 w-4" /> Header Utama</Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={(open) => {
        setIsDialogOpen(open);
        if (!open) resetForm();
      }}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-2 border-b">
            <DialogTitle>{editingId ? 'Edit' : 'Tambah'} Item APBDes</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Kode Rekening</Label>
                <Input required value={formData.kode_rekening} onChange={e => setFormData({ ...formData, kode_rekening: e.target.value })} placeholder="Misal: 4.1.1" />
              </div>
              <div className="space-y-2">
                <Label>Nomor Urut</Label>
                <Input type="number" value={isNaN(formData.urutan as number) ? '' : formData.urutan} onChange={e => setFormData({ ...formData, urutan: parseInt(e.target.value) || 0 })} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Uraian</Label>
              <Input required value={formData.uraian} onChange={e => setFormData({ ...formData, uraian: e.target.value })} placeholder="Nama akun/kegiatan" />
            </div>

            <div className="flex items-center space-x-2 my-4">
              <Checkbox id="is_header" checked={formData.is_header} onCheckedChange={(checked) => setFormData({ ...formData, is_header: checked as boolean })} />
              <Label htmlFor="is_header">Item ini adalah Header (Tidak memiliki nilai anggaran sendiri, hanya kalkulasi dari sub-item)</Label>
            </div>

            {!formData.is_header && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Anggaran (Rp)</Label>
                    <Input type="number" required value={isNaN(formData.anggaran as number) ? '' : formData.anggaran} onChange={e => setFormData({ ...formData, anggaran: parseFloat(e.target.value) || 0 })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Realisasi (Rp)</Label>
                    <Input type="number" required value={isNaN(formData.realisasi as number) ? '' : formData.realisasi} onChange={e => setFormData({ ...formData, realisasi: parseFloat(e.target.value) || 0 })} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Keterangan Realisasi</Label>
                  <Input value={formData.keterangan_realisasi ?? ''} onChange={e => setFormData({ ...formData, keterangan_realisasi: e.target.value })} placeholder="Catatan tambahan realisasi" />
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

      {/* Realisasi Add Dialog */}
      <Dialog open={isRealisasiDialogOpen} onOpenChange={(open) => {
        setIsRealisasiDialogOpen(open);
        if (!open) resetForm();
      }}>
        <DialogContent className="sm:max-w-[450px] max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-2 border-b">
            <DialogTitle>Tambah Realisasi Anggaran</DialogTitle>
          </DialogHeader>
          <div className="bg-muted/50 p-3 rounded-lg text-sm mb-4">
            <p className="font-bold">{formData.kode_rekening} - {formData.uraian}</p>
            <p className="text-muted-foreground">Anggaran: {formatCurrency(formData.anggaran || 0)}</p>
          </div>
          <form onSubmit={handleUpdateRealisasi} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tanggal</Label>
                <Input
                  type="date"
                  required
                  value={realisasiFormData.tanggal}
                  onChange={e => setRealisasiFormData({ ...realisasiFormData, tanggal: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Jumlah (Rp)</Label>
                <Input
                  type="number"
                  required
                  value={isNaN(realisasiFormData.jumlah) ? '' : realisasiFormData.jumlah}
                  onChange={e => setRealisasiFormData({ ...realisasiFormData, jumlah: parseFloat(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Keterangan / Catatan</Label>
              <Input
                value={realisasiFormData.keterangan}
                onChange={e => setRealisasiFormData({ ...realisasiFormData, keterangan: e.target.value })}
                placeholder="Catatan progres kegiatan..."
              />
            </div>

            <div className="space-y-2 pt-2 border-t mt-4">
              <Label>Foto Dokumentasi (Opsional)</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={e => setFotoFile(e.target.files?.[0] || null)}
              />
              <p className="text-xs text-muted-foreground">Maksimal 5MB.</p>
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit">Tambah Realisasi</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* History Dialog */}
      <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
        <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-2 border-b">
            <DialogTitle>Riwayat Realisasi</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="bg-muted/50 p-3 rounded-lg text-sm mb-4">
              <p className="font-bold">{selectedItem.kode_rekening} - {selectedItem.uraian}</p>
              <div className="flex justify-between mt-1">
                <span>Anggaran: {formatCurrency(selectedItem.anggaran)}</span>
                <span className="font-semibold">Total Realisasi: {formatCurrency(selectedItem.realisasi)}</span>
              </div>
            </div>
          )}

          {loadingHistory ? (
            <div className="text-center py-8">Memuat riwayat...</div>
          ) : historyItems.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">Belum ada riwayat realisasi.</div>
          ) : (
            <div className="space-y-4">
              {historyItems.map((h) => (
                <div key={h.id} className="border rounded-lg p-4 flex gap-4 items-start relative group">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {new Date(h.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                      <span className="font-bold text-emerald-700">{formatCurrency(h.jumlah)}</span>
                    </div>
                    {h.keterangan && <p className="text-sm text-muted-foreground">{h.keterangan}</p>}
                    {h.foto_url && (
                      <div className="mt-2">
                        <img src={`http://localhost:8000${h.foto_url}`} alt="Dokumentasi" className="h-32 w-auto rounded object-cover border" />
                      </div>
                    )}
                  </div>
                  <Button variant="ghost" size="icon" className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleDeleteHistory(h.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Card className="overflow-hidden border-none shadow-md min-w-0 w-full">
        <CardContent className="p-0">
          <div className="overflow-x-auto w-full scrollbar-thin">
            <Table className="w-full">
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[120px] py-3 text-xs md:text-sm">Kode</TableHead>
                  <TableHead className="min-w-[180px] py-3 text-xs md:text-sm">Uraian</TableHead>
                  <TableHead className="text-right py-3 text-xs md:text-sm">Anggaran</TableHead>
                  <TableHead className="text-right py-3 text-xs md:text-sm">Realisasi</TableHead>
                  <TableHead className="text-right w-[180px] py-3 text-xs md:text-sm">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-10">Loading...</TableCell></TableRow>
                ) : items.length === 0 ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-10">Belum ada item rincian.</TableCell></TableRow>
                ) : (
                  renderRows(items)
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
