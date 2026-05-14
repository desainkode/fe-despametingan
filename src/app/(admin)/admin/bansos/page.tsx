'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Plus, Search, Eye, Edit, Trash2, MapPin } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { toast } from 'sonner'
import { bansosApi, BansosProgram } from '@/lib/api/bansos'

export default function AdminBansosPage() {
  const router = useRouter()
  
  const [programs, setPrograms] = useState<BansosProgram[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  // Dialog states
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const defaultCategories = ['PKH', 'BNPT', 'BLT DD', 'BST', 'PIP', 'BPNT']

  const [formData, setFormData] = useState({
    tahun: new Date().getFullYear(),
    nama: '',
    keterangan: '',
    target_jumlah: 0,
    status: 'aktif' as 'aktif' | 'selesai',
  })
  
  const [customNama, setCustomNama] = useState(false)

  const loadData = async () => {
    setIsLoading(true)
    try {
      const data = await bansosApi.getPrograms()
      setPrograms(data)
    } catch (error) {
      toast.error('Gagal memuat data program bansos')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleOpenForm = (program?: BansosProgram) => {
    if (program) {
      setEditingId(program.id)
      setFormData({
        tahun: program.tahun,
        nama: program.nama,
        keterangan: program.keterangan || '',
        target_jumlah: program.target_jumlah,
        status: program.status,
      })
      if (!defaultCategories.includes(program.nama)) {
        setCustomNama(true)
      } else {
        setCustomNama(false)
      }
    } else {
      setEditingId(null)
      setFormData({
        tahun: new Date().getFullYear(),
        nama: '',
        keterangan: '',
        target_jumlah: 0,
        status: 'aktif',
      })
      setCustomNama(false)
    }
    setIsFormOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      if (editingId) {
        await bansosApi.updateProgram(editingId, formData)
        toast.success('Program bansos berhasil diperbarui')
      } else {
        await bansosApi.createProgram(formData)
        toast.success('Program bansos berhasil ditambahkan')
      }
      setIsFormOpen(false)
      loadData()
    } catch (error) {
      toast.error('Gagal menyimpan program bansos')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deletingId) return
    
    try {
      await bansosApi.deleteProgram(deletingId)
      toast.success('Program bansos berhasil dihapus')
      setIsDeleteDialogOpen(false)
      loadData()
    } catch (error) {
      toast.error('Gagal menghapus program bansos')
    }
  }

  const filteredPrograms = programs.filter(p => 
    p.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tahun.toString().includes(searchQuery)
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manajemen Bansos</h1>
          <p className="text-muted-foreground">Kelola program bantuan sosial dan penerima.</p>
        </div>
        <Button onClick={() => handleOpenForm()}>
          <Plus className="mr-2 h-4 w-4" /> Tambah Program
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Daftar Program Bansos</CardTitle>
              <CardDescription>Semua program bantuan sosial yang tercatat.</CardDescription>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari program..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tahun</TableHead>
                <TableHead>Nama Program</TableHead>
                <TableHead>Target Bantuan</TableHead>
                <TableHead>Realisasi Bantuan</TableHead>
                <TableHead>Total Penerima</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Memuat data...
                  </TableCell>
                </TableRow>
              ) : filteredPrograms.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Belum ada program bansos
                  </TableCell>
                </TableRow>
              ) : (
                filteredPrograms.map((program) => (
                  <TableRow key={program.id}>
                    <TableCell className="font-medium">{program.tahun}</TableCell>
                    <TableCell>
                      {program.nama}
                      {program.keterangan && (
                        <p className="text-xs text-muted-foreground line-clamp-1">{program.keterangan}</p>
                      )}
                    </TableCell>
                    <TableCell>{formatCurrency(program.target_jumlah)}</TableCell>
                    <TableCell>{formatCurrency(program.realisasi_jumlah)}</TableCell>
                    <TableCell>{program.recipients_count || 0} Keluarga/Orang</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        program.status === 'aktif' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {program.status === 'aktif' ? 'Aktif' : 'Selesai'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => router.push(`/admin/bansos/${program.id}`)}
                          title="Lihat Penerima"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleOpenForm(program)}
                          title="Edit Program"
                        >
                          <Edit className="h-4 w-4 text-blue-500" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setDeletingId(program.id)
                            setIsDeleteDialogOpen(true)
                          }}
                          title="Hapus Program"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Program Bansos' : 'Tambah Program Bansos'}</DialogTitle>
            <DialogDescription>
              Isi detail program bantuan sosial.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="tahun">Tahun Anggaran</Label>
              <Input
                id="tahun"
                type="number"
                value={formData.tahun}
                onChange={(e) => setFormData({ ...formData, tahun: parseInt(e.target.value) || new Date().getFullYear() })}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="nama">Kategori Program</Label>
              {!customNama ? (
                <Select
                  value={defaultCategories.includes(formData.nama) ? formData.nama : ''}
                  onValueChange={(val) => {
                    if (val === 'custom') {
                      setCustomNama(true)
                      setFormData({ ...formData, nama: '' })
                    } else {
                      setFormData({ ...formData, nama: val })
                    }
                  }}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kategori Program" />
                  </SelectTrigger>
                  <SelectContent>
                    {defaultCategories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                    <SelectItem value="custom">Lainnya (Custom)</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="flex gap-2">
                  <Input
                    placeholder="Masukkan nama program"
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    required
                  />
                  <Button type="button" variant="outline" onClick={() => {
                    setCustomNama(false)
                    setFormData({ ...formData, nama: '' })
                  }}>Batal</Button>
                </div>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="target_jumlah">Target Budget (Rp)</Label>
              <Input
                id="target_jumlah"
                type="number"
                value={formData.target_jumlah}
                onChange={(e) => setFormData({ ...formData, target_jumlah: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">Status Program</Label>
              <Select
                value={formData.status}
                onValueChange={(val: 'aktif'|'selesai') => setFormData({ ...formData, status: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aktif">Aktif</SelectItem>
                  <SelectItem value="selesai">Selesai</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="keterangan">Keterangan (Opsional)</Label>
              <Textarea
                id="keterangan"
                value={formData.keterangan}
                onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                rows={3}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                Batal
              </Button>
              <Button type="submit" disabled={isSubmitting || !formData.nama}>
                {isSubmitting ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Program Bansos</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus program ini? Semua data penerima bansos terkait juga akan terhapus. Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Ya, Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
