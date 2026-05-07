"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Loader2, 
  AlertCircle,
  MapPin,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dusun, 
  createDusun, 
  updateDusun 
} from "@/lib/api/dusun";
import { toast } from "sonner";

const formSchema = z.object({
  nama: z.string().min(3, "Nama dusun minimal 3 karakter"),
  kepala_dusun: z.string().min(3, "Nama kepala dusun minimal 3 karakter"),
  laki_laki: z.number().min(0),
  perempuan: z.number().min(0),
  warna: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Warna tidak valid"),
  koordinat_x: z.string().optional(),
  koordinat_y: z.string().optional(),
  keterangan: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface DusunFormProps {
  initialData?: Dusun | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function DusunForm({ initialData, onSuccess, onCancel }: DusunFormProps) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: initialData?.nama || "",
      kepala_dusun: initialData?.kepala_dusun || "",
      laki_laki: initialData?.laki_laki || 0,
      perempuan: initialData?.perempuan || 0,
      warna: initialData?.warna || "#10b981",
      koordinat_x: initialData?.koordinat_x || "",
      koordinat_y: initialData?.koordinat_y || "",
      keterangan: initialData?.keterangan || "",
    }
  });

  const currentWarna = watch("warna");

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      const data = {
        ...values,
        jml_penduduk: values.laki_laki + values.perempuan
      };

      if (initialData) {
        await updateDusun(initialData.id, data);
        toast.success("Data dusun berhasil diperbarui");
      } else {
        await createDusun(data);
        toast.success("Dusun baru berhasil ditambahkan");
      }
      
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Gagal menyimpan data dusun");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="nama" className="text-sm font-semibold text-slate-700">Nama Dusun</Label>
          <Input 
            id="nama" 
            placeholder="Contoh: Dusun Krajan" 
            {...register("nama")}
            className="h-11 bg-slate-50/50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
          />
          {errors.nama && <p className="text-xs text-red-500">{errors.nama.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="kepala_dusun" className="text-sm font-semibold text-slate-700">Kepala Dusun</Label>
          <Input 
            id="kepala_dusun" 
            placeholder="Nama lengkap kepala dusun" 
            {...register("kepala_dusun")}
            className="h-11 bg-slate-50/50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
          />
          {errors.kepala_dusun && <p className="text-xs text-red-500">{errors.kepala_dusun.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-slate-700">Penduduk (Laki-laki)</Label>
          <Input 
            type="number"
            {...register("laki_laki", { valueAsNumber: true })}
            className="h-11 bg-slate-50/50 border-slate-200"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-slate-700">Penduduk (Perempuan)</Label>
          <Input 
            type="number"
            {...register("perempuan", { valueAsNumber: true })}
            className="h-11 bg-slate-50/50 border-slate-200"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-slate-700">Warna Marker</Label>
          <div className="flex gap-2">
            <Input 
              type="color"
              {...register("warna")}
              className="w-12 h-11 p-1 bg-white cursor-pointer border-slate-200"
            />
            <Input 
              value={currentWarna}
              onChange={(e) => setValue("warna", e.target.value)}
              className="h-11 flex-1 bg-slate-50/50 border-slate-200 font-mono text-xs"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <MapPin size={14} className="text-emerald-600" /> Koordinat X (Longitude)
          </Label>
          <Input 
            placeholder="Contoh: 107.12345" 
            {...register("koordinat_x")}
            className="h-11 bg-slate-50/50 border-slate-200"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <MapPin size={14} className="text-emerald-600" /> Koordinat Y (Latitude)
          </Label>
          <Input 
            placeholder="Contoh: -7.12345" 
            {...register("koordinat_y")}
            className="h-11 bg-slate-50/50 border-slate-200"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="keterangan" className="text-sm font-semibold text-slate-700">Keterangan Wilayah</Label>
        <Textarea 
          id="keterangan" 
          placeholder="Tambahkan detail wilayah dusun jika ada..." 
          className="h-24 bg-slate-50/50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all resize-none"
          {...register("keterangan")}
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
              Menyimpan...
            </>
          ) : (
            initialData ? "Simpan Perubahan" : "Tambah Dusun"
          )}
        </Button>
      </div>
    </form>
  );
}
