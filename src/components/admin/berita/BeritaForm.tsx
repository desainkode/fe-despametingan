"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Loader2, 
  Upload, 
  X, 
  CheckCircle2, 
  AlertCircle,
  Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Berita, createBerita, updateBerita } from "@/lib/api/berita";
import { toast } from "sonner";
import Image from "next/image";

const formSchema = z.object({
  title: z.string().min(5, "Judul minimal 5 karakter"),
  category: z.string().min(1, "Pilih kategori"),
  status: z.enum(["draft", "published"]),
  content: z.string().min(20, "Konten minimal 20 karakter"),
  excerpt: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface BeritaFormProps {
  initialData?: Berita | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const CATEGORIES = [
  "Pemerintahan",
  "Pembangunan",
  "Kemasyarakatan",
  "Ekonomi",
  "Kesehatan",
  "Pendidikan",
  "Keamanan",
  "Lainnya"
];

export function BeritaForm({ initialData, onSuccess, onCancel }: BeritaFormProps) {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      category: initialData?.category || "",
      status: initialData?.status || "draft",
      content: initialData?.content || "",
      excerpt: initialData?.excerpt || "",
    }
  });

  const currentCategory = watch("category");
  const currentStatus = watch("status");

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
      formData.append("category", values.category);
      formData.append("status", values.status);
      formData.append("content", values.content);
      if (values.excerpt) formData.append("excerpt", values.excerpt);
      
      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (initialData) {
        // Edit mode (API handles _method=PUT)
        await updateBerita(initialData.id, formData as any);
        toast.success("Berita berhasil diperbarui");
      } else {
        // Create mode
        await createBerita(formData as any);
        toast.success("Berita berhasil ditambahkan");
      }
      
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Gagal menyimpan berita. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Main Content */}
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold text-slate-700">Judul Berita</Label>
            <Input 
              id="title" 
              placeholder="Masukkan judul berita yang menarik..." 
              {...register("title")}
              className={`h-11 bg-slate-50/50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all ${errors.title ? "border-red-500 ring-red-500/20" : ""}`}
            />
            {errors.title && <p className="text-xs font-medium text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.title.message}
            </p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-sm font-semibold text-slate-700">Konten Berita</Label>
            <Textarea 
              id="content" 
              placeholder="Tulis isi berita di sini secara mendalam..." 
              className={`min-h-[350px] bg-slate-50/50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all resize-none leading-relaxed ${errors.content ? "border-red-500 ring-red-500/20" : ""}`}
              {...register("content")}
            />
            {errors.content && <p className="text-xs font-medium text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.content.message}
            </p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt" className="text-sm font-semibold text-slate-700">Ringkasan (Opsional)</Label>
            <Textarea 
              id="excerpt" 
              placeholder="Ringkasan singkat untuk menarik pembaca..." 
              className="h-24 bg-slate-50/50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all resize-none"
              {...register("excerpt")}
            />
          </div>
        </div>

        {/* Right Column: Sidebar/Settings */}
        <div className="lg:col-span-4 space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-700">Gambar Utama</Label>
            <div 
              className={`relative aspect-[4/3] rounded-2xl border-2 border-dashed overflow-hidden transition-all group ${
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
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">PNG atau JPG (Max. 2MB).<br/>Rasio 4:3 direkomendasikan.</p>
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

          {/* Category Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-700">Kategori</Label>
            <Select 
              value={currentCategory} 
              onValueChange={(val) => setValue("category", val)}
            >
              <SelectTrigger className="h-11 bg-slate-50/50 border-slate-200 cursor-pointer focus:ring-emerald-500/20">
                <SelectValue placeholder="Pilih kategori berita" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-200">
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat} className="cursor-pointer focus:bg-emerald-50 focus:text-emerald-700 py-2.5 rounded-lg">
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-xs font-medium text-red-500 mt-1">{errors.category.message}</p>}
          </div>

          {/* Status Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-700">Status Publikasi</Label>
            <div className="flex p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setValue("status", "draft")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  currentStatus === "draft" 
                    ? "bg-white shadow-sm text-slate-800" 
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <div className={`h-1.5 w-1.5 rounded-full ${currentStatus === "draft" ? "bg-amber-500" : "bg-slate-300"}`} />
                Draft
              </button>
              <button
                type="button"
                onClick={() => setValue("status", "published")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  currentStatus === "published" 
                    ? "bg-emerald-600 text-white shadow-sm" 
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <CheckCircle2 size={14} className={currentStatus === "published" ? "text-emerald-100" : "text-slate-300"} />
                Published
              </button>
            </div>
          </div>

          <div className="pt-6 space-y-3">
            <Button 
              type="submit" 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer h-12 text-sm font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Memproses...
                </>
              ) : (
                initialData ? "Simpan Perubahan" : "Terbitkan Sekarang"
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
