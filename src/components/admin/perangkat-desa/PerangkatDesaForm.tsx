"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Loader2, 
  Upload, 
  X, 
  AlertCircle,
  User as UserIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  PerangkatDesa, 
  createPerangkatDesa, 
  updatePerangkatDesa 
} from "@/lib/api/perangkat-desa";
import { toast } from "sonner";
import Image from "next/image";

const formSchema = z.object({
  nama: z.string().min(3, "Nama minimal 3 karakter"),
  jabatan: z.string().min(3, "Jabatan minimal 3 karakter"),
  urutan: z.number().min(0, "Urutan minimal 0"),
});

type FormValues = z.infer<typeof formSchema>;

interface PerangkatDesaFormProps {
  initialData?: PerangkatDesa | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function PerangkatDesaForm({ initialData, onSuccess, onCancel }: PerangkatDesaFormProps) {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: initialData?.nama || "",
      jabatan: initialData?.jabatan || "",
      urutan: initialData?.urutan || 0,
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      
      const formData = new FormData();
      formData.append("nama", values.nama);
      formData.append("jabatan", values.jabatan);
      formData.append("urutan", values.urutan.toString());
      
      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (initialData) {
        await updatePerangkatDesa(initialData.id, formData);
        toast.success("Data perangkat desa berhasil diperbarui");
      } else {
        await createPerangkatDesa(formData);
        toast.success("Perangkat desa berhasil ditambahkan");
      }
      
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Gagal menyimpan data. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: Photo Upload */}
        <div className="md:col-span-4 space-y-4">
          <Label className="text-sm font-semibold text-slate-700">Foto Profil</Label>
          <div 
            className={`relative aspect-[3/4] rounded-2xl border-2 border-dashed overflow-hidden transition-all group ${
              imagePreview ? "border-emerald-500 bg-emerald-50/30" : "border-slate-200 bg-slate-50/50 hover:border-emerald-400 hover:bg-emerald-50/10"
            }`}
          >
            {imagePreview ? (
              <>
                <Image 
                  src={imagePreview} 
                  alt="Preview" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={removeImage}
                    className="p-2 bg-white/20 backdrop-blur-md text-white rounded-xl hover:bg-white/40 transition-all cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>
              </>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer py-8 px-4 text-center">
                <div className="p-4 rounded-2xl bg-white shadow-sm text-emerald-600 mb-3 group-hover:scale-110 transition-transform">
                  <Upload size={24} />
                </div>
                <p className="text-sm font-bold text-slate-700">Pilih Foto</p>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">PNG atau JPG (Max. 2MB).<br/>Rasio 3:4 direkomendasikan.</p>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>
        </div>

        {/* Right Column: Main Data */}
        <div className="md:col-span-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nama" className="text-sm font-semibold text-slate-700">Nama Lengkap</Label>
            <Input 
              id="nama" 
              placeholder="Contoh: Bpk. Mulyana, S.Pd." 
              {...register("nama")}
              className={`h-11 bg-slate-50/50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all ${errors.nama ? "border-red-500 ring-red-500/20" : ""}`}
            />
            {errors.nama && <p className="text-xs font-medium text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.nama.message}
            </p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="jabatan" className="text-sm font-semibold text-slate-700">Jabatan</Label>
            <Input 
              id="jabatan" 
              placeholder="Contoh: Kepala Desa / Sekretaris Desa" 
              {...register("jabatan")}
              className={`h-11 bg-slate-50/50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all ${errors.jabatan ? "border-red-500 ring-red-500/20" : ""}`}
            />
            {errors.jabatan && <p className="text-xs font-medium text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.jabatan.message}
            </p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="urutan" className="text-sm font-semibold text-slate-700">Urutan Tampilan (Sorting)</Label>
            <Input 
              id="urutan" 
              type="number"
              placeholder="0" 
              {...register("urutan", { valueAsNumber: true })}
              className={`h-11 bg-slate-50/50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all ${errors.urutan ? "border-red-500 ring-red-500/20" : ""}`}
            />
            <p className="text-[10px] text-slate-400 mt-1 italic">Angka lebih rendah akan muncul lebih awal di website.</p>
            {errors.urutan && <p className="text-xs font-medium text-red-500 mt-1">{errors.urutan.message}</p>}
          </div>

          <div className="pt-8 grid grid-cols-2 gap-4">
            <Button 
              type="button" 
              variant="ghost" 
              className="w-full cursor-pointer h-12 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all rounded-xl"
              onClick={onCancel}
              disabled={loading}
            >
              Batalkan
            </Button>
            <Button 
              type="submit" 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer h-12 text-sm font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                initialData ? "Simpan Perubahan" : "Tambah Perangkat"
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
