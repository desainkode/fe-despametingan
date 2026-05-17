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
  FileText,
  File as FileIcon
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
import { 
  PPID, 
  createPPID, 
  updatePPID 
} from "@/lib/api/ppid";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(5, "Judul minimal 5 karakter"),
  category: z.enum(["Serta Merta", "Berkala", "Setiap Saat"]),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface PPIDFormProps {
  initialData?: PPID | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function PPIDForm({ initialData, onSuccess, onCancel }: PPIDFormProps) {
  const [loading, setLoading] = useState(false);
  const [docFile, setDocFile] = useState<File | null>(null);

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
      category: initialData?.category || "Berkala",
      description: initialData?.description || "",
    }
  });

  const currentCategory = watch("category");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocFile(file);
    }
  };

  const removeFile = () => {
    setDocFile(null);
  };

  const onSubmit = async (values: FormValues) => {
    try {
      if (!initialData && !docFile) {
        toast.error("Silakan pilih file dokumen terlebih dahulu");
        return;
      }

      setLoading(true);
      
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("category", values.category);
      if (values.description) formData.append("description", values.description);
      
      if (docFile) {
        formData.append("file", docFile);
      }

      if (initialData) {
        await updatePPID(initialData.id, formData);
        toast.success("Dokumen PPID berhasil diperbarui");
      } else {
        await createPPID(formData);
        toast.success("Dokumen PPID baru berhasil ditambahkan");
      }
      
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Gagal menyimpan dokumen. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-semibold text-slate-700">Judul Dokumen</Label>
          <Input 
            id="title" 
            placeholder="Contoh: Laporan Realisasi APBDes 2025" 
            {...register("title")}
            className={`h-11 bg-slate-50/50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all ${errors.title ? "border-red-500 ring-red-500/20" : ""}`}
          />
          {errors.title && <p className="text-xs font-medium text-red-500 mt-1">{errors.title.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-700">Kategori Informasi</Label>
            <Select 
              value={currentCategory} 
              onValueChange={(val: any) => setValue("category", val)}
            >
              <SelectTrigger className="h-11 bg-slate-50/50 border-slate-200 cursor-pointer">
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Serta Merta" className="cursor-pointer">Informasi Serta Merta</SelectItem>
                <SelectItem value="Berkala" className="cursor-pointer">Informasi Berkala</SelectItem>
                <SelectItem value="Setiap Saat" className="cursor-pointer">Informasi Setiap Saat</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-700">File Dokumen (PDF/DOC/XLS)</Label>
            <div className="relative">
              {docFile || initialData?.file_path ? (
                <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                  <div className="p-2 bg-emerald-600 text-white rounded-lg">
                    <FileIcon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-emerald-900 truncate">
                      {docFile ? docFile.name : initialData?.file_path.split('/').pop()}
                    </p>
                    <p className="text-[10px] text-emerald-600 font-medium">Dokumen siap diunggah</p>
                  </div>
                  <button 
                    type="button" 
                    onClick={removeFile}
                    className="p-1.5 hover:bg-emerald-200 rounded-lg text-emerald-600 transition-colors cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <label className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 border-dashed rounded-xl cursor-pointer hover:bg-slate-100 transition-colors group">
                  <div className="p-2 bg-slate-200 text-slate-500 rounded-lg group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                    <Upload size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-600">Klik untuk pilih file</p>
                    <p className="text-[10px] text-slate-400">PDF, Word, atau Excel (Max. 5MB)</p>
                  </div>
                  <input type="file" className="hidden" onChange={handleFileChange} />
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-semibold text-slate-700">Keterangan Tambahan (Opsional)</Label>
          <Textarea 
            id="description" 
            placeholder="Tambahkan informasi pendukung tentang dokumen ini..." 
            className="h-24 bg-slate-50/50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all resize-none"
            {...register("description")}
          />
        </div>

        <div className="pt-4 flex gap-3">
          <Button 
            type="button" 
            variant="ghost" 
            className="flex-1 cursor-pointer h-12 text-slate-500 font-bold rounded-xl"
            onClick={onCancel}
            disabled={loading}
          >
            Batal
          </Button>
          <Button 
            type="submit" 
            className="flex-[2] bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer h-12 text-sm font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Mengunggah...
              </>
            ) : (
              initialData ? "Simpan Perubahan" : "Unggah Dokumen"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
