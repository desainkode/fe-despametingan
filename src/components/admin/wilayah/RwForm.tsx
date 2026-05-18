"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Rw, createRw, updateRw } from "@/lib/api/rw";
import { getDusunList, Dusun } from "@/lib/api/dusun";
import { getPendudukList } from "@/lib/api/penduduk";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { toast } from "sonner";

const formSchema = z.object({
  dusun_id: z.string().min(1, "Dusun induk wajib dipilih"),
  nama: z.string().min(1, "Nama/Nomor RW wajib diisi"),
  ketua_rw: z.string().optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

interface RwFormProps {
  initialData?: Rw | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function RwForm({ initialData, onSuccess, onCancel }: RwFormProps) {
  const [loading, setLoading] = useState(false);
  const [dusuns, setDusuns] = useState<Dusun[]>([]);
  const [loadingDusuns, setLoadingDusuns] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dusun_id: initialData?.dusun_id || "",
      nama: initialData?.nama || "",
      ketua_rw: initialData?.ketua_rw || "",
    }
  });

  // Load all dusuns for dropdown
  useEffect(() => {
    const fetchDusuns = async () => {
      try {
        setLoadingDusuns(true);
        const res = await getDusunList();
        setDusuns(res.data);
      } catch (error) {
        toast.error("Gagal mengambil data dusun");
      } finally {
        setLoadingDusuns(false);
      }
    };
    fetchDusuns();
  }, []);

  const handleSearchPenduduk = async (query: string) => {
    try {
      const res = await getPendudukList({ search: query });
      return res.data.map((p) => ({
        value: p.nama,
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
      const data = {
        dusun_id: values.dusun_id,
        nama: values.nama,
        ketua_rw: values.ketua_rw || null,
      };

      if (initialData) {
        await updateRw(initialData.id, data);
        toast.success("Data RW berhasil diperbarui");
      } else {
        await createRw(data);
        toast.success("RW baru berhasil ditambahkan");
      }
      
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Gagal menyimpan data RW");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="dusun_id" className="text-sm font-semibold text-slate-700">Dusun Induk</Label>
          {loadingDusuns ? (
            <div className="h-11 flex items-center px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 text-xs gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
              Memuat dusun...
            </div>
          ) : (
            <Controller
              name="dusun_id"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="h-11 bg-slate-50/50 border-slate-200 rounded-xl">
                    <SelectValue placeholder="Pilih dusun induk..." />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-100 shadow-xl bg-white p-1">
                    {dusuns.map((dusun) => (
                      <SelectItem key={dusun.id} value={dusun.id} className="rounded-lg py-2">
                        {dusun.nama}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          )}
          {errors.dusun_id && <p className="text-xs text-red-500">{errors.dusun_id.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="nama" className="text-sm font-semibold text-slate-700">Nama / Nomor RW</Label>
          <Input 
            id="nama" 
            placeholder="Contoh: RW 01 atau RW 001" 
            {...register("nama")}
            className="h-11 bg-slate-50/50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
          />
          {errors.nama && <p className="text-xs text-red-500">{errors.nama.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ketua_rw" className="text-sm font-semibold text-slate-700">Ketua RW (Opsional)</Label>
        <Controller
          name="ketua_rw"
          control={control}
          render={({ field }) => (
            <SearchableSelect
              value={field.value}
              onChange={field.onChange}
              placeholder="Pilih Ketua RW..."
              searchPlaceholder="Cari dari data penduduk..."
              onSearchAsync={handleSearchPenduduk}
            />
          )}
        />
        <p className="text-[11px] text-slate-400 font-medium">
          Ketik nama penduduk untuk mencari. Kosongkan jika belum ditentukan.
        </p>
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
            initialData ? "Simpan Perubahan" : "Tambah RW"
          )}
        </Button>
      </div>
    </form>
  );
}
