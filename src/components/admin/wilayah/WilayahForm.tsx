"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Loader2, 
  Map as MapIcon,
  Navigation
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
  WilayahAdministratif, 
  createWilayah, 
  updateWilayah 
} from "@/lib/api/wilayah-administratif";
import { toast } from "sonner";

const formSchema = z.object({
  arah: z.string().min(1, "Arah wajib dipilih"),
  detail: z.string().min(5, "Detail perbatasan minimal 5 karakter"),
});

type FormValues = z.infer<typeof formSchema>;

interface WilayahFormProps {
  initialData?: WilayahAdministratif | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function WilayahForm({ initialData, onSuccess, onCancel }: WilayahFormProps) {
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    setValue,
    watch,
    register,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      arah: initialData?.arah || "",
      detail: initialData?.detail || "",
    }
  });

  const currentArah = watch("arah");

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await updateWilayah(initialData.id, values);
        toast.success("Batas wilayah berhasil diperbarui");
      } else {
        await createWilayah(values);
        toast.success("Batas wilayah berhasil ditambahkan");
      }
      onSuccess();
    } catch (error) {
      toast.error("Gagal menyimpan data batas wilayah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label className="text-sm font-semibold text-slate-700">Arah Mata Angin</Label>
        <Select 
          value={currentArah} 
          onValueChange={(val) => setValue("arah", val)}
        >
          <SelectTrigger className="h-12 bg-slate-50/50 border-slate-200 cursor-pointer">
            <SelectValue placeholder="Pilih arah perbatasan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Utara" className="cursor-pointer">Utara</SelectItem>
            <SelectItem value="Selatan" className="cursor-pointer">Selatan</SelectItem>
            <SelectItem value="Timur" className="cursor-pointer">Timur</SelectItem>
            <SelectItem value="Barat" className="cursor-pointer">Barat</SelectItem>
          </SelectContent>
        </Select>
        {errors.arah && <p className="text-xs text-red-500">{errors.arah.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="detail" className="text-sm font-semibold text-slate-700">Detail Perbatasan</Label>
        <Textarea 
          id="detail" 
          placeholder="Contoh: Berbatasan dengan Desa ABC di seberang Sungai Citarum" 
          {...register("detail")}
          className="h-32 bg-slate-50/50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 resize-none leading-relaxed"
        />
        {errors.detail && <p className="text-xs text-red-500">{errors.detail.message}</p>}
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
              Menyimpan...
            </>
          ) : (
            initialData ? "Simpan Perubahan" : "Simpan Batas"
          )}
        </Button>
      </div>
    </form>
  );
}
