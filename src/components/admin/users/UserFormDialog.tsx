"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";
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
import { Loader2 } from "lucide-react";
import type { User, Desa } from "@/types";

// ── Schema ────────────────────────────────────────────────────────────────────
const createSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi").max(255),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
  role: z.enum(["superadmin", "admin_desa"], {
    message: "Role wajib dipilih",
  }),
  desa_id: z.string().nullable().optional(),
});

const editSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi").max(255),
  email: z.string().email("Format email tidak valid"),
  password: z
    .string()
    .optional()
    .transform((v) => (v === "" ? undefined : v))
    .refine((v) => v === undefined || v.length >= 8, {
      message: "Password minimal 8 karakter",
    }),
  role: z.enum(["superadmin", "admin_desa"], {
    message: "Role wajib dipilih",
  }),
  desa_id: z.string().nullable().optional(),
});

type CreateFormValues = z.infer<typeof createSchema>;
type EditFormValues = z.infer<typeof editSchema>;

// ── Props ─────────────────────────────────────────────────────────────────────
interface UserFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User | null;
  onSubmit: (data: CreateFormValues | EditFormValues) => Promise<void>;
  isLoading: boolean;
}

// ── Component ─────────────────────────────────────────────────────────────────
export function UserFormDialog({
  open,
  onOpenChange,
  user,
  onSubmit,
  isLoading,
}: UserFormDialogProps) {
  const { isSuperAdmin } = useAuth();
  const isEdit = !!user;
  const schema = isEdit ? editSchema : createSchema;

  const form = useForm<CreateFormValues>({
    resolver: zodResolver(schema as any),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "admin_desa",
      desa_id: null,
    },
  });

  const watchedRole = form.watch("role");

  // Pre-populate form when editing
  useEffect(() => {
    if (open && user) {
      form.reset({
        name: user.name,
        email: user.email,
        password: "",
        role: user.role,
        desa_id: user.desa_id ?? null,
      });
    } else if (open && !user) {
      form.reset({
        name: "",
        email: "",
        password: "",
        role: "admin_desa",
        desa_id: null,
      });
    }
  }, [open, user, form]);

  // When role changes to superadmin, clear desa_id
  useEffect(() => {
    if (watchedRole === "superadmin") {
      form.setValue("desa_id", null);
    }
  }, [watchedRole, form]);

  // Force role to admin_desa if not superadmin
  useEffect(() => {
    if (!isSuperAdmin) {
      form.setValue("role", "admin_desa");
    }
  }, [isSuperAdmin, form]);

  const handleSubmit = form.handleSubmit(async (data) => {
    await onSubmit(data);
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit User" : "Tambah User Baru"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Perbarui informasi akun user. Kosongkan password jika tidak ingin mengubahnya."
              : "Isi data untuk membuat akun user baru."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nama */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama lengkap" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email@desa.go.id" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Password{" "}
                    {isEdit && (
                      <span className="text-xs text-muted-foreground font-normal">
                        (kosongkan jika tidak ingin diubah)
                      </span>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={isEdit ? "••••••••" : "Minimal 8 karakter"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Role - Only for Superadmin */}
            {isSuperAdmin && (
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="superadmin">Super Admin</SelectItem>
                        <SelectItem value="admin_desa">Admin Desa</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Field Desa dihapus karena frontend ini khusus satu desa */}

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Batal
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEdit ? "Simpan Perubahan" : "Buat User"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
