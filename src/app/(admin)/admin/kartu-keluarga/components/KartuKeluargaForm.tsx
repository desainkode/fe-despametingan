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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { KartuKeluarga } from "@/lib/api/kartu-keluarga";

const formSchema = z.object({
  no_kk: z.string().length(16, { message: "No. KK harus 16 digit" }),
  alamat: z.string().min(5, { message: "Alamat minimal 5 karakter" }),
  rt: z.string().min(1, { message: "RT harus diisi" }),
  rw: z.string().min(1, { message: "RW harus diisi" }),
});

interface KartuKeluargaFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: z.infer<typeof formSchema>) => Promise<void>;
  initialData?: KartuKeluarga | null;
  title: string;
  description: string;
}

export function KartuKeluargaForm({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  title,
  description,
}: KartuKeluargaFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      no_kk: "",
      alamat: "",
      rt: "",
      rw: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        no_kk: initialData.no_kk || "",
        alamat: initialData.alamat || "",
        rt: initialData.rt || "",
        rw: initialData.rw || "",
      });
    } else {
      form.reset({
        no_kk: "",
        alamat: "",
        rt: "",
        rw: "",
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="no_kk"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Kartu Keluarga</FormLabel>
                  <FormControl>
                    <Input placeholder="16 digit nomor KK" {...field} maxLength={16} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="alamat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Alamat lengkap rumah"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="rt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RT</FormLabel>
                    <FormControl>
                      <Input placeholder="001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rw"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RW</FormLabel>
                    <FormControl>
                      <Input placeholder="002" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
