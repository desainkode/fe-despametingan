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
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Potensi, 
  createPotensi, 
  updatePotensi 
} from "@/lib/api/potensi";
import { toast } from "sonner";
import Image from "next/image";

const formSchema = z.object({
  title: z.string().min(5, "Judul minimal 5 karakter"),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  icon: z.string().min(1, "Icon wajib diisi (contoh: shop, farm, water)"),
  accent_color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Warna tidak valid"),
});

type FormValues = z.infer<typeof formSchema>;

interface PotensiFormProps {
  initialData?: Potensi | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function PotensiForm({ initialData, onSuccess, onCancel }: PotensiFormProps) {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      icon: initialData?.icon || "star",
      accent_color: initialData?.accent_color || "#10b981",
    }
  });

  const currentAccent = watch("accent_color");

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
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("icon", values.icon);
      formData.append("accent_color", values.accent_color);
      
      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (initialData) {
        await updatePotensi(initialData.id, formData);
        toast.success("Data potensi berhasil diperbarui");
      } else {
        await createPotensi(formData);
        toast.success("Potensi baru berhasil ditambahkan");
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Info & Description */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold text-slate-700">Nama Potensi</Label>
            <Input 
              id="title" 
              placeholder="Contoh: Wisata Curug Indah" 
              {...register("title")}
              className={`h-11 bg-slate-50/50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all ${errors.title ? "border-red-500 ring-red-500/20" : ""}`}
            />
            {errors.title && <p className="text-xs font-medium text-red-500 mt-1">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold text-slate-700">Deskripsi Singkat</Label>
            <Textarea 
              id="description" 
              placeholder="Jelaskan keunggulan potensi desa ini..." 
              className={`h-32 bg-slate-50/50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all resize-none leading-relaxed ${errors.description ? "border-red-500 ring-red-500/20" : ""}`}
              {...register("description")}
            />
            {errors.description && <p className="text-xs font-medium text-red-500 mt-1">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="icon" className="text-sm font-semibold text-slate-700">Icon (Slug)</Label>
              <Input 
                id="icon" 
                placeholder="star, water, leaf, etc." 
                {...register("icon")}
                className="h-11 bg-slate-50/50 border-slate-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accent_color" className="text-sm font-semibold text-slate-700">Warna Aksen</Label>
              <div className="flex gap-2">
                <Input 
                  id="accent_color" 
                  type="color"
                  {...register("accent_color")}
                  className="w-12 h-11 p-1 bg-white cursor-pointer border-slate-200"
                />
                <Input 
                  value={currentAccent}
                  onChange={(e) => setValue("accent_color", e.target.value)}
                  className="h-11 flex-1 bg-slate-50/50 border-slate-200 uppercase font-mono text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Image & Preview */}
        <div className="lg:col-span-5 space-y-6">
          <Label className="text-sm font-semibold text-slate-700">Foto Potensi</Label>
          <div 
            className={`relative aspect-video rounded-2xl border-2 border-dashed overflow-hidden transition-all group ${
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
                <p className="text-sm font-bold text-slate-700">Unggah Foto Potensi</p>
                <p className="text-[11px] text-slate-500 mt-1">PNG/JPG (Max. 2MB)</p>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>

          <div className="pt-4 space-y-3">
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
                initialData ? "Simpan Perubahan" : "Tambah Potensi"
              )}
            </Button>
            <Button 
              type="button" 
              variant="ghost" 
              className="w-full cursor-pointer h-12 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all rounded-xl"
              onClick={onCancel}
              disabled={loading}
            >
              Batalkan
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
