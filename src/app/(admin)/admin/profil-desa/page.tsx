"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Save,
  User as UserIcon,
  Info,
  ChevronRight,
  Upload,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDesaProfile, updateDesaProfile } from "@/lib/api/desa";
import { Desa } from "@/types";

export default function ProfilDesaPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [desa, setDesa] = useState<Desa | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Desa>>({});
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [headPhotoFile, setHeadPhotoFile] = useState<File | null>(null);

  // Previews
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [headPhotoPreview, setHeadPhotoPreview] = useState<string | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await getDesaProfile();
      setDesa(data);
      setFormData(data);
      setLogoPreview(data.logo_desa || null);
      setHeadPhotoPreview(data.foto_kepala_desa || null);
    } catch (error) {
      toast.error("Gagal memuat profil desa");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'head') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'logo') {
          setLogoFile(file);
          setLogoPreview(reader.result as string);
        } else {
          setHeadPhotoFile(file);
          setHeadPhotoPreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const data = new FormData();

      // Append text fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && typeof value !== 'object') {
          data.append(key, value.toString());
        }
      });

      // Append files
      if (logoFile) data.append("logo_desa", logoFile);
      if (headPhotoFile) data.append("foto_kepala_desa", headPhotoFile);

      const updatedDesa = await updateDesaProfile(data);
      setDesa(updatedDesa);
      toast.success("Profil desa berhasil diperbarui");
    } catch (error) {
      toast.error("Gagal memperbarui profil desa");
    } finally {
      setSaving(false);
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
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Profil Desa</h1>
          <p className="text-sm text-muted-foreground">Kelola informasi identitas dan profil resmi desa</p>
        </div>
        <Button
          onClick={handleSubmit}
          className="bg-emerald-700 hover:bg-emerald-800"
          disabled={saving}
        >
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Simpan Perubahan
        </Button>
      </div>

      <Tabs defaultValue="identitas" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-5 h-auto gap-1 p-1 bg-muted/50">
          <TabsTrigger value="identitas" className="py-2.5">Identitas</TabsTrigger>
          <TabsTrigger value="kontak" className="py-2.5">Kontak</TabsTrigger>
          <TabsTrigger value="pimpinan" className="py-2.5">Kepemimpinan</TabsTrigger>
          <TabsTrigger value="narasi" className="py-2.5">Visi & Misi</TabsTrigger>
          <TabsTrigger value="geografis" className="py-2.5 hidden lg:inline-flex">Geografis</TabsTrigger>
        </TabsList>

        {/* ── IDENTITAS ─────────────────────────────────── */}
        <TabsContent value="identitas" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Building2 size={18} className="text-emerald-600" />
                Data Wilayah
              </CardTitle>
              <CardDescription>Informasi administratif dasar desa</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nama_desa">Nama Desa</Label>
                  <Input id="nama_desa" name="nama_desa" value={formData.nama_desa || ""} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kode_desa">Kode Desa</Label>
                  <Input id="kode_desa" name="kode_desa" value={formData.kode_desa || ""} onChange={handleInputChange} />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="kecamatan">Kecamatan</Label>
                  <Input id="kecamatan" name="kecamatan" value={formData.kecamatan || ""} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kabupaten">Kabupaten</Label>
                  <Input id="kabupaten" name="kabupaten" value={formData.kabupaten || ""} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="provinsi">Provinsi</Label>
                  <Input id="provinsi" name="provinsi" value={formData.provinsi || ""} onChange={handleInputChange} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Upload size={18} className="text-emerald-600" />
                Logo Desa
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/50 overflow-hidden">
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo Preview" className="h-full w-full object-contain p-2" />
                ) : (
                  <Building2 size={32} className="text-muted-foreground/40" />
                )}
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="logo_desa">Ganti Logo Desa</Label>
                <Input id="logo_desa" type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'logo')} />
                <p className="text-[10px] text-muted-foreground">Format: JPG, PNG. Maksimal 1MB.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── KONTAK ────────────────────────────────────── */}
        <TabsContent value="kontak" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Phone size={18} className="text-emerald-600" />
                Informasi Kontak
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="telepon">Telepon Kantor</Label>
                  <Input id="telepon" name="telepon" value={formData.telepon || ""} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp Service</Label>
                  <Input id="whatsapp" name="whatsapp" value={formData.whatsapp || ""} onChange={handleInputChange} />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Desa</Label>
                  <Input id="email" name="email" type="email" value={formData.email || ""} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website Resmi</Label>
                  <Input id="website" name="website" value={formData.website || ""} onChange={handleInputChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="alamat_kantor">Alamat Kantor</Label>
                <Textarea id="alamat_kantor" name="alamat_kantor" rows={3} value={formData.alamat_kantor || ""} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="google_maps_url">Google Maps Embed/URL</Label>
                <Input id="google_maps_url" name="google_maps_url" value={formData.google_maps_url || ""} onChange={handleInputChange} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── KEPEMIMPINAN ──────────────────────────────── */}
        <TabsContent value="pimpinan" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <UserIcon size={18} className="text-emerald-600" />
                Kepala Desa
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="flex h-56 w-44 shrink-0 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-muted-foreground/25 bg-muted/50 overflow-hidden relative group">
                  {headPhotoPreview ? (
                    <img src={headPhotoPreview} alt="Kades Preview" className="h-full w-full object-cover" />
                  ) : (
                    <UserIcon size={48} className="text-muted-foreground/40" />
                  )}
                </div>
                <div className="space-y-6 flex-1 w-full">
                  <div className="space-y-2">
                    <Label htmlFor="nama_kepala_desa">Nama Lengkap Kepala Desa</Label>
                    <Input id="nama_kepala_desa" name="nama_kepala_desa" value={formData.nama_kepala_desa || ""} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="foto_kepala_desa">Ganti Foto Resmi</Label>
                    <Input id="foto_kepala_desa" type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'head')} />
                    <p className="text-[10px] text-muted-foreground">Format: JPG, PNG. Rekomendasi rasio 4:5 (Portrait).</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2 border-t pt-6">
                <Label htmlFor="kata_sambutan">Kata Sambutan</Label>
                <Textarea id="kata_sambutan" name="kata_sambutan" rows={6} value={formData.kata_sambutan || ""} onChange={handleInputChange} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── VISI MISI ─────────────────────────────────── */}
        <TabsContent value="narasi" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Info size={18} className="text-emerald-600" />
                Visi & Misi Desa
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="space-y-2">
                <Label htmlFor="visi">Visi Desa</Label>
                <Textarea id="visi" name="visi" rows={3} value={formData.visi || ""} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="misi">Misi Desa</Label>
                <Textarea id="misi" name="misi" rows={8} value={formData.misi || ""} onChange={handleInputChange} placeholder="Gunakan list atau poin-poin..." />
              </div>
              <div className="space-y-2 border-t pt-6">
                <Label htmlFor="sejarah">Sejarah Singkat</Label>
                <Textarea id="sejarah" name="sejarah" rows={8} value={formData.sejarah || ""} onChange={handleInputChange} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── GEOGRAFIS ─────────────────────────────────── */}
        <TabsContent value="geografis" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin size={18} className="text-emerald-600" />
                Batas & Luas Wilayah
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="batas_utara">Batas Utara</Label>
                  <Input id="batas_utara" name="batas_utara" value={formData.batas_utara || ""} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="batas_selatan">Batas Selatan</Label>
                  <Input id="batas_selatan" name="batas_selatan" value={formData.batas_selatan || ""} onChange={handleInputChange} />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="batas_timur">Batas Timur</Label>
                  <Input id="batas_timur" name="batas_timur" value={formData.batas_timur || ""} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="batas_barat">Batas Barat</Label>
                  <Input id="batas_barat" name="batas_barat" value={formData.batas_barat || ""} onChange={handleInputChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="luas_wilayah">Luas Wilayah (Hektar/km²)</Label>
                <Input id="luas_wilayah" name="luas_wilayah" value={formData.luas_wilayah || ""} onChange={handleInputChange} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
