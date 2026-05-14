'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
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
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Plus, Search, Trash2 } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { toast } from 'sonner'
import { bansosApi, BansosProgram, BansosRecipient } from '@/lib/api/bansos'
import { pendudukApi } from '@/lib/api/penduduk'
import { kkApi } from '@/lib/api/kartu-keluarga'

export default function DetailProgramBansosPage() {
  const router = useRouter()
  const params = useParams()
  const programId = params.id as string

  const [program, setProgram] = useState<BansosProgram | null>(null)
  const [recipients, setRecipients] = useState<BansosRecipient[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  // Dialog States
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Input Method for Recipient
  const [inputType, setInputType] = useState<'nik' | 'kk' | 'manual'>('nik')
  
  const [formData, setFormData] = useState({
    identitas: '',
    nama_penerima: '',
    jumlah_bantuan: 0,
    keterangan: '',
  })

  // Penduduk / KK Lookup
  const [isSearchingIdentitas, setIsSearchingIdentitas] = useState(false)
  const [foundId, setFoundId] = useState<string | null>(null) // penduduk_id or kartu_keluarga_id

  const loadData = async () => {
    setIsLoading(true)
    try {
      const data = await bansosApi.getRecipients(programId)
      setProgram(data.program)
      setRecipients(data.recipients)
    } catch (error) {
      toast.error('Gagal memuat detail program')
      router.push('/admin/bansos')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [programId])

  const handleSearchIdentitas = async () => {
    if (!formData.identitas) return
    
    setIsSearchingIdentitas(true)
    setFoundId(null)
    setFormData(prev => ({ ...prev, nama_penerima: '' }))
    
    try {
      if (inputType === 'nik') {
        // We could fetch penduduk by NIK here if API supports it, or fetch all and find
        const data = await pendudukApi.getAll()
        const match = data.data.find((p: any) => p.nik === formData.identitas)
        if (match) {
          setFoundId(match.id)
          setFormData(prev => ({ ...prev, nama_penerima: match.nama }))
          toast.success(`Penduduk: ${match.nama}`)
        } else {
          toast.error('NIK tidak ada di database')
        }
      } else if (inputType === 'kk') {
        const data = await kkApi.getAll()
        const match = data.data.find((k: any) => k.no_kk === formData.identitas)
        if (match) {
          setFoundId(match.id)
          // Asumsi ada kepala keluarga atau minimal No KK
          setFormData(prev => ({ ...prev, nama_penerima: 'Keluarga Bpk/Ibu dari KK ' + match.no_kk }))
          toast.success('Data Kartu Keluarga ditemukan.')
        } else {
          toast.error('Nomor KK tidak ada di database')
        }
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat mencari data')
    } finally {
      setIsSearchingIdentitas(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const payload: any = {
        jumlah_bantuan: formData.jumlah_bantuan,
        keterangan: formData.keterangan,
      }
      
      if (inputType === 'nik' && foundId) {
        payload.penduduk_id = foundId
      } else if (inputType === 'kk' && foundId) {
        payload.kartu_keluarga_id = foundId
      } else {
        payload.nama_penerima = formData.nama_penerima
        payload.identitas_penerima = formData.identitas
      }
      
      await bansosApi.addRecipient(programId, payload)
      toast.success('Penerima berhasil ditambahkan')
      setIsFormOpen(false)
      loadData()
      
      // Reset form
      setFormData({ identitas: '', nama_penerima: '', jumlah_bantuan: 0, keterangan: '' })
      setFoundId(null)
    } catch (error) {
      toast.error('Gagal menambah penerima')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (recipientId: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus penerima ini?')) return
    
    try {
      await bansosApi.deleteRecipient(programId, recipientId)
      toast.success('Penerima berhasil dihapus')
      loadData()
    } catch (error) {
      toast.error('Gagal menghapus penerima')
    }
  }

  const filteredRecipients = recipients.filter(r => 
    r.nama_penerima?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.identitas_penerima?.includes(searchQuery)
  )

  if (isLoading && !program) {
    return <div className="p-8 text-center">Memuat data...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.push('/admin/bansos')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Detail Program: {program?.nama}</h1>
            <p className="text-muted-foreground">Tahun {program?.tahun} • Target: {formatCurrency(program?.target_jumlah || 0)}</p>
          </div>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Tambah Penerima
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Penerima</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recipients.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Realisasi Bantuan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(program?.realisasi_jumlah || 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Sisa Target</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(Math.max(0, (program?.target_jumlah || 0) - (program?.realisasi_jumlah || 0)))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Daftar Penerima Bansos</CardTitle>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama atau NIK/KK..."
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
                <TableHead>Identitas (NIK/KK)</TableHead>
                <TableHead>Nama Penerima</TableHead>
                <TableHead>Jumlah Bantuan</TableHead>
                <TableHead>Keterangan</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecipients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Belum ada data penerima
                  </TableCell>
                </TableRow>
              ) : (
                filteredRecipients.map((recipient) => (
                  <TableRow key={recipient.id}>
                    <TableCell>{recipient.identitas_penerima || '-'}</TableCell>
                    <TableCell className="font-medium">{recipient.nama_penerima}</TableCell>
                    <TableCell>{formatCurrency(recipient.jumlah_bantuan)}</TableCell>
                    <TableCell>{recipient.keterangan || '-'}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(recipient.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Form Tambah Penerima */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Tambah Penerima Bansos</DialogTitle>
            <DialogDescription>
              Masukkan NIK atau No KK untuk menarik data, atau input manual.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4 mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={inputType === 'nik'} onChange={() => { setInputType('nik'); setFoundId(null); }} /> NIK
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={inputType === 'kk'} onChange={() => { setInputType('kk'); setFoundId(null); }} /> No KK
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={inputType === 'manual'} onChange={() => { setInputType('manual'); setFoundId(null); }} /> Manual
              </label>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="identitas">
                {inputType === 'nik' ? 'Nomor Induk Kependudukan (NIK)' : inputType === 'kk' ? 'Nomor Kartu Keluarga (KK)' : 'Identitas (Opsional)'}
              </Label>
              <div className="flex gap-2">
                <Input
                  id="identitas"
                  value={formData.identitas}
                  onChange={(e) => setFormData({ ...formData, identitas: e.target.value })}
                  placeholder={`Masukkan ${inputType.toUpperCase()}`}
                  required={inputType !== 'manual'}
                />
                {inputType !== 'manual' && (
                  <Button type="button" variant="secondary" onClick={handleSearchIdentitas} disabled={isSearchingIdentitas}>
                    Cari
                  </Button>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="nama_penerima">Nama Penerima</Label>
              <Input
                id="nama_penerima"
                value={formData.nama_penerima}
                onChange={(e) => setFormData({ ...formData, nama_penerima: e.target.value })}
                required
                disabled={inputType !== 'manual' && !!foundId}
                placeholder={inputType !== 'manual' ? 'Ditarik otomatis dari database' : 'Nama Lengkap'}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="jumlah_bantuan">Jumlah Bantuan (Rp)</Label>
              <Input
                id="jumlah_bantuan"
                type="number"
                value={formData.jumlah_bantuan}
                onChange={(e) => setFormData({ ...formData, jumlah_bantuan: parseInt(e.target.value) || 0 })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="keterangan">Keterangan (Opsional)</Label>
              <Textarea
                id="keterangan"
                value={formData.keterangan}
                onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                rows={2}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                Batal
              </Button>
              <Button type="submit" disabled={isSubmitting || (inputType !== 'manual' && !foundId)}>
                {isSubmitting ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
