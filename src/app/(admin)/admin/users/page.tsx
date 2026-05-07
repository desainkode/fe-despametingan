"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getUsers, createUser, updateUser, deleteUser } from "@/lib/api/users";
import { getAllDesas } from "@/lib/api/desa";
import { UserFormDialog } from "@/components/admin/users/UserFormDialog";
import { DeleteUserDialog } from "@/components/admin/users/DeleteUserDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  UserCog,
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Building2,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import type { User, Desa } from "@/types";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

// ── Helpers ───────────────────────────────────────────────────────────────────
function RoleBadge({ role }: { role: string }) {
  if (role === "superadmin") {
    return (
      <Badge className="gap-1 bg-violet-100 text-violet-700 hover:bg-violet-100 border-violet-200">
        <ShieldCheck className="h-3 w-3" />
        Super Admin
      </Badge>
    );
  }
  return (
    <Badge className="gap-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-emerald-200">
      <Building2 className="h-3 w-3" />
      Admin Desa
    </Badge>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ManajemenUserPage() {
  const router = useRouter();
  const { user, isSuperAdmin, isLoading: authLoading } = useAuth();

  // State
  const [users, setUsers] = useState<User[]>([]);
  const [desaList, setDesaList] = useState<Pick<Desa, "id" | "nama_desa">[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);

  // Filter
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);

  // Dialog state
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // ── Sync with auth ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/admin/login");
    }
  }, [authLoading, user, router]);

  // ── Fetch users ───────────────────────────────────────────────────────────
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getUsers({
        search: search || undefined,
        role: roleFilter || undefined,
        page,
        per_page: 15,
      });
      setUsers(res.data);
      setLastPage(res.meta.last_page);
      setTotal(res.meta.total);
    } catch {
      toast.error("Gagal memuat data user.");
    } finally {
      setIsLoading(false);
    }
  }, [search, roleFilter, page]);

  // ── Fetch desa list for form dropdown ─────────────────────────────────────
  const fetchDesaList = useCallback(async () => {
    try {
      const data = await getAllDesas();
      setDesaList(data);
    } catch {
      // silently fail
    }
  }, []);

  useEffect(() => {
    if (!authLoading && user) {
      fetchUsers();
    }
  }, [fetchUsers, authLoading, user]);

  useEffect(() => {
    if (!authLoading && user) {
      fetchDesaList();
    }
  }, [fetchDesaList, authLoading, user]);

  // Reset page when filter changes
  useEffect(() => {
    setPage(1);
  }, [search, roleFilter]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  function openCreate() {
    setSelectedUser(null);
    setFormOpen(true);
  }

  function openEdit(user: User) {
    setSelectedUser(user);
    setFormOpen(true);
  }

  function openDelete(user: User) {
    setSelectedUser(user);
    setDeleteOpen(true);
  }

  async function handleFormSubmit(data: any) {
    setIsMutating(true);
    try {
      // Jika Superadmin membuat user baru, otomatis masukkan ke desa saat ini
      const payload = { ...data };
      if (!selectedUser && isSuperAdmin && user?.desa?.id) {
        payload.desa_id = user.desa.id;
      }

      if (selectedUser) {
        await updateUser(selectedUser.id, payload);
        toast.success("User berhasil diperbarui.");
      } else {
        await createUser(payload);
        toast.success("User baru berhasil dibuat.");
      }
      setFormOpen(false);
      fetchUsers();
    } catch (err: any) {
      toast.error(err.message ?? "Terjadi kesalahan.");
    } finally {
      setIsMutating(false);
    }
  }

  async function handleDelete() {
    if (!selectedUser) return;
    setIsMutating(true);
    try {
      await deleteUser(selectedUser.id);
      toast.success("User berhasil dihapus.");
      setDeleteOpen(false);
      fetchUsers();
    } catch (err: any) {
      toast.error(err.message ?? "Gagal menghapus user.");
    } finally {
      setIsMutating(false);
    }
  }

  // ── Loading / Guard ───────────────────────────────────────────────────────
  if (authLoading || !user) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
              <UserCog className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Manajemen User</h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Kelola akun pengguna dan hak akses sistem.
          </p>
        </div>
        <Button
          onClick={openCreate}
          className="gap-2 bg-violet-600 hover:bg-violet-700 text-white shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Tambah User
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="border-l-4 border-l-violet-400">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardDescription className="text-xs">Total User</CardDescription>
            <CardTitle className="text-2xl">{total}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-l-4 border-l-emerald-400">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardDescription className="text-xs">Admin Desa</CardDescription>
            <CardTitle className="text-2xl">
              {users.filter((u) => u.role === "admin_desa").length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Filter row */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Cari nama atau email..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select
              value={roleFilter || "all"}
              onValueChange={(v) => setRoleFilter(v === "all" ? "" : v)}
            >
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue placeholder="Semua role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Role</SelectItem>
                <SelectItem value="superadmin">Super Admin</SelectItem>
                <SelectItem value="admin_desa">Admin Desa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b bg-muted/30">
                <TableHead className="pl-6">Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Dibuat</TableHead>
                <TableHead className="text-right pr-4">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-32 text-center text-muted-foreground"
                  >
                    Tidak ada user ditemukan.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id} className="group">
                    <TableCell className="pl-6 font-medium">{user.name}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>
                      <RoleBadge role={user.role} />
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {user.created_at
                        ? format(new Date(user.created_at), "d MMM yyyy", { locale: idLocale })
                        : "—"}
                    </TableCell>
                    <TableCell className="text-right pr-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEdit(user)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => openDelete(user)}
                            className="text-destructive focus:text-destructive focus:bg-destructive/10"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>

        {/* Pagination */}
        {lastPage > 1 && (
          <div className="flex items-center justify-between border-t px-6 py-3">
            <p className="text-xs text-muted-foreground">
              Halaman {page} dari {lastPage}
            </p>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
                disabled={page >= lastPage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Dialogs */}
      <UserFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        user={selectedUser}
        onSubmit={handleFormSubmit}
        isLoading={isMutating}
      />

      <DeleteUserDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        user={selectedUser}
        onConfirm={handleDelete}
        isLoading={isMutating}
      />
    </div>
  );
}
