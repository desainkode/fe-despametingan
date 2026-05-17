"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Loader2, 
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dusun, 
  createDusun, 
  updateDusun 
} from "@/lib/api/dusun";
import { getPendudukList } from "@/lib/api/penduduk";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { toast } from "sonner";

const formSchema = z.object({
  nama: z.string().min(3, "Nama dusun minimal 3 karakter"),
  kepala_dusun: z.string().optional().or(z.literal("")),
  koordinat_x: z.string().optional(),
  koordinat_y: z.string().optional(),
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
    control,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: initialData?.nama || "",
      kepala_dusun: initialData?.kepala_dusun || "",
      koordinat_x: initialData?.koordinat_x || "",
      koordinat_y: initialData?.koordinat_y || "",
    }
  });

  const handleSearchPenduduk = async (query: string) => {
    try {
      const res = await getPendudukList({ search: query });
      return res.data.map((p) => ({
        value: p.nama, // Use name since kepala_dusun column in BE is a string name
        label: p.nama,
        sublabel: `NIK: ${p.nik} - ${p.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"}`
      }));
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      
      // Submit data - let backend handle stat calculations
      const data = {
        nama: values.nama,
        kepala_dusun: values.kepala_dusun || null,
        koordinat_x: values.koordinat_x || null,
        koordinat_y: values.koordinat_y || null,
        // Send defaults for BE columns that might have non-null constraints
        warna: initialData?.warna || "#10b981",
        jml_penduduk: initialData?.jml_penduduk || 0,
        laki_laki: initialData?.laki_laki || 0,
        perempuan: initialData?.perempuan || 0,
      };

      if (initialData) {
        await updateDusun(initialData.id, data as any);
        toast.success("Data dusun berhasil diperbarui");
      } else {
        await createDusun(data as any);
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
          <Label htmlFor="kepala_dusun" className="text-sm font-semibold text-slate-700">Kepala Dusun (Opsional)</Label>
          <Controller
            name="kepala_dusun"
            control={control}
            render={({ field }) => (
              <SearchableSelect
                value={field.value}
                onChange={field.onChange}
                placeholder="Pilih Kepala Dusun..."
                searchPlaceholder="Cari dari data penduduk..."
                onSearchAsync={handleSearchPenduduk}
              />
            )}
          />
          <p className="text-[11px] text-slate-400 font-medium">
            Ketik nama penduduk untuk mencari. Kosongkan jika belum ditentukan.
          </p>
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
