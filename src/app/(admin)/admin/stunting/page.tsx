"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit, ExternalLink, Loader2, Target, Users } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getStuntingRecords, createStuntingRecord, updateStuntingRecord, deleteStuntingRecord, StuntingRecord } from "@/lib/api/stunting";
import Link from "next/link";

export default function StuntingAdminPage() {
  const [records, setRecords] = useState<StuntingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState<Partial<StuntingRecord>>({
    year: new Date().getFullYear(),
    target_rate: 14.0,
    total_children: 0,
    stunted_children: 0,
    status: 'draft',
    keterangan: ''
  });

  const loadRecords = async () => {
    try {
      setLoading(true);
      const data = await getStuntingRecords();
      setRecords(data);
    } catch (error) {
      toast.error("Gagal memuat data stunting");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const resetForm = () => {
    setFormData({
      year: new Date().getFullYear(),
      target_rate: 14.0,
      total_children: 0,
      stunted_children: 0,
      status: 'draft',
      keterangan: ''
    });
    setIsEditing(false);
  };

  const handleEdit = (record: StuntingRecord) => {
    setFormData({
      id: record.id,
      year: record.year,
      target_rate: record.target_rate,
      total_children: record.total_children,
      stunted_children: record.stunted_children,
      status: record.status,
      keterangan: record.keterangan || ''
    });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && formData.id) {
        await updateStuntingRecord(formData.id, formData);
        toast.success("Data berhasil diperbarui");
      } else {
        await createStuntingRecord(formData);
        toast.success("Data berhasil ditambahkan");
      }
      setIsDialogOpen(false);
      resetForm();
      loadRecords();
    } catch (error) {
      toast.error("Gagal menyimpan data");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus rekaman ini?")) {
      try {
        await deleteStuntingRecord(id);
        toast.success("Data berhasil dihapus");
        loadRecords();
      } catch (error) {
        toast.error("Gagal menghapus data");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manajemen Stunting</h1>
          <p className="text-sm text-muted-foreground">Kelola data agregasi dan rekap tahunan stunting</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-700 hover:bg-emerald-800">
              <Plus className="mr-2 h-4 w-4" /> Tambah Data Tahun
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit' : 'Tambah'} Rekap Stunting</DialogTitle>
              <DialogDescription>
                Masukkan data agregat tahunan untuk stunting. Total anak dan anak stunting dapat diisi manual atau dihitung otomatis nanti.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Tahun</Label>
                  <Input id="year" type="number" required value={formData.year} onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target_rate">Target Nasional (%)</Label>
                  <Input id="target_rate" type="number" step="0.1" required value={formData.target_rate} onChange={(e) => setFormData({...formData, target_rate: parseFloat(e.target.value)})} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="total_children">Total Balita Didata</Label>
                  <Input id="total_children" type="number" required value={formData.total_children} onChange={(e) => setFormData({...formData, total_children: parseInt(e.target.value)})} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stunted_children">Jumlah Stunting</Label>
                  <Input id="stunted_children" type="number" required value={formData.stunted_children} onChange={(e) => setFormData({...formData, stunted_children: parseInt(e.target.value)})} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value: any) => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="ditetapkan">Ditetapkan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
                <Button type="submit" className="bg-emerald-700 hover:bg-emerald-800">Simpan</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rekapitulasi Stunting Tahunan</CardTitle>
          <CardDescription>Pilih salah satu tahun untuk mengelola data detail anak dan intervensi</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="w-[100px] text-center">Tahun</TableHead>
                  <TableHead className="text-center">Total Anak</TableHead>
                  <TableHead className="text-center">Stunting</TableHead>
                  <TableHead className="text-center">Prevalensi</TableHead>
                  <TableHead className="text-center">Target</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.length > 0 ? (
                  records.map((record) => {
                    const prevalensi = record.total_children > 0 ? ((record.stunted_children / record.total_children) * 100).toFixed(1) : "0.0";
                    return (
                      <TableRow key={record.id}>
                        <TableCell className="text-center font-bold">{record.year}</TableCell>
                        <TableCell className="text-center">{record.total_children}</TableCell>
                        <TableCell className="text-center text-rose-600 font-semibold">{record.stunted_children}</TableCell>
                        <TableCell className="text-center font-mono">{prevalensi}%</TableCell>
                        <TableCell className="text-center text-emerald-600">{record.target_rate}%</TableCell>
                        <TableCell className="text-center">
                          <Badge variant={record.status === 'ditetapkan' ? 'default' : 'secondary'} className={record.status === 'ditetapkan' ? 'bg-emerald-600' : ''}>
                            {record.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right flex items-center justify-end gap-2">
                          <Link href={`/admin/stunting/${record.id}`}>
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-4 w-4 mr-2" /> Detail
                            </Button>
                          </Link>
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(record)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-rose-500 hover:text-rose-600 hover:bg-rose-50" onClick={() => handleDelete(record.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">Belum ada data</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
