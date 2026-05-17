"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";
import { updateProfile, updatePassword } from "@/lib/api/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Lock, 
  Loader2, 
  CheckCircle2, 
  ShieldCheck, 
  Settings 
} from "lucide-react";
import { toast } from "sonner";

// ── Schemas ──────────────────────────────────────────────────────────────────
const profileSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi").max(255),
  email: z.string().email("Format email tidak valid"),
});

const passwordSchema = z.object({
  current_password: z.string().min(1, "Password saat ini wajib diisi"),
  password: z.string().min(8, "Password baru minimal 8 karakter"),
  password_confirmation: z.string().min(1, "Konfirmasi password wajib diisi"),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Konfirmasi password tidak cocok",
  path: ["password_confirmation"],
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

// ── Component ────────────────────────────────────────────────────────────────
export default function AccountSettingsPage() {
  const { user, updateUser } = useAuth();
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  // Profile Form
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  // Password Form
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      current_password: "",
      password: "",
      password_confirmation: "",
    },
  });

  // ── Sync form with user data ───────────────────────────────────────────────
  // Re-sync profile form values whenever the user object changes (e.g. after loading)
  useEffect(() => {
    if (user) {
      profileForm.reset({
        name: user.name,
        email: user.email,
      });
    }
  }, [user, profileForm]);

  // Handlers
  const onProfileSubmit = async (data: ProfileFormValues) => {
    setIsProfileLoading(true);
    try {
      const updatedUser = await updateProfile(data);
      updateUser(updatedUser);
      toast.success("Profil berhasil diperbarui.");
    } catch (err: any) {
      toast.error(err.message || "Gagal memperbarui profil.");
    } finally {
      setIsProfileLoading(false);
    }
  };

  const onPasswordSubmit = async (data: PasswordFormValues) => {
    setIsPasswordLoading(true);
    try {
      await updatePassword(data);
      passwordForm.reset();
      toast.success("Password berhasil diubah.");
    } catch (err: any) {
      toast.error(err.message || "Gagal mengubah password.");
    } finally {
      setIsPasswordLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <Settings className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Pengaturan Akun</h1>
            <p className="text-sm text-muted-foreground">
              Kelola informasi profil dan keamanan akun Anda.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8">
        {/* Profile Settings */}
        <Card className="overflow-hidden border-none shadow-md bg-white">
          <CardHeader className="bg-slate-50/50 border-b">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-emerald-600" />
              <CardTitle className="text-lg">Informasi Profil</CardTitle>
            </div>
            <CardDescription>
              Perbarui nama dan alamat email akun Anda.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...profileForm}>
              <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={profileForm.control}
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
                  <FormField
                    control={profileForm.control}
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
                </div>
                <div className="flex justify-end pt-2">
                  <Button type="submit" disabled={isProfileLoading} className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[140px]">
                    {isProfileLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                    )}
                    Simpan Perubahan
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="overflow-hidden border-none shadow-md bg-white">
          <CardHeader className="bg-slate-50/50 border-b">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-emerald-600" />
              <CardTitle className="text-lg">Keamanan Akun</CardTitle>
            </div>
            <CardDescription>
              Ubah password Anda untuk menjaga keamanan akun.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                <FormField
                  control={passwordForm.control}
                  name="current_password"
                  render={({ field }) => (
                    <FormItem className="max-w-md">
                      <FormLabel>Password Saat Ini</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Separator className="my-4" />
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={passwordForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password Baru</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Minimal 8 karakter" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="password_confirmation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Konfirmasi Password Baru</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Ulangi password baru" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex justify-end pt-2">
                  <Button type="submit" disabled={isPasswordLoading} className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[140px]">
                    {isPasswordLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <ShieldCheck className="mr-2 h-4 w-4" />
                    )}
                    Ganti Password
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
