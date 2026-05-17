"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Search } from "lucide-react";
import { Penduduk } from "@/lib/api/penduduk";
import { getKartuKeluargaList, KartuKeluarga } from "@/lib/api/kartu-keluarga";

const formSchema = z.object({
  nik: z.string().length(16, { message: "NIK harus 16 digit" }),
  nama: z.string().min(3, { message: "Nama minimal 3 karakter" }),
  jenis_kelamin: z.enum(["L", "P"], { message: "Pilih jenis kelamin" }),
  tanggal_lahir: z.string().min(1, { message: "Tanggal lahir harus diisi" }),
  kartu_keluarga_id: z.string().min(1, { message: "Pilih Kartu Keluarga" }),
});

interface PendudukFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: z.infer<typeof formSchema>) => Promise<void>;
  initialData?: any | null; // Use any because detail might have more fields
  title: string;
  description: string;
}

export function PendudukForm({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  title,
  description,
}: PendudukFormProps) {
  const [loading, setLoading] = useState(false);
  const [kkList, setKkList] = useState<KartuKeluarga[]>([]);
  const [kkLoading, setKkLoading] = useState(false);
  const [kkSearch, setKkSearch] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nik: "",
      nama: "",
      jenis_kelamin: "L",
      tanggal_lahir: "",
      kartu_keluarga_id: "",
    },
  });

  // Fetch KK List for selection
  useEffect(() => {
    if (open) {
      fetchKK();
    }
  }, [open, kkSearch]);

  const fetchKK = async () => {
    try {
      setKkLoading(true);
      const res = await getKartuKeluargaList({ search: kkSearch });
      setKkList(res.data);
    } catch (error) {
      console.error("Gagal mengambil data KK", error);
    } finally {
      setKkLoading(false);
    }
  };

  useEffect(() => {
    if (initialData) {
      form.reset({
        nik: initialData.nik || "",
        nama: initialData.nama || "",
        jenis_kelamin: initialData.jenis_kelamin || "L",
        tanggal_lahir: initialData.tanggal_lahir || "",
        kartu_keluarga_id: initialData.kartu_keluarga_id || initialData.kartu_keluarga?.id || "",
      });
    } else {
      form.reset({
        nik: "",
        nama: "",
        jenis_kelamin: "L",
        tanggal_lahir: "",
        kartu_keluarga_id: "",
      });
    }
  }, [initialData, form, open]);

  const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await onSubmit(values);
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nik"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIK</FormLabel>
                    <FormControl>
                      <Input placeholder="16 digit NIK" {...field} maxLength={16} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jenis_kelamin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Kelamin</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="L">Laki-laki</SelectItem>
                        <SelectItem value="P">Perempuan</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama sesuai KTP" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tanggal_lahir"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal Lahir</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="kartu_keluarga_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kartu Keluarga (KK)</FormLabel>
                  <div className="flex flex-col gap-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                      <Input 
                        placeholder="Cari No KK..." 
                        className="h-8 pl-7 text-xs" 
                        onChange={(e) => setKkSearch(e.target.value)}
                      />
                    </div>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Kartu Keluarga" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {kkLoading ? (
                          <div className="flex items-center justify-center py-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                          </div>
                        ) : kkList.length === 0 ? (
                          <div className="text-center py-2 text-xs text-muted-foreground">Tidak ditemukan</div>
                        ) : (
                          kkList.map((kk) => (
                            <SelectItem key={kk.id} value={kk.id}>
                              {kk.no_kk} - {kk.alamat.substring(0, 20)}...
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Batal
              </Button>
              <Button type="submit" disabled={loading} className="bg-emerald-700 hover:bg-emerald-800">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Simpan
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
