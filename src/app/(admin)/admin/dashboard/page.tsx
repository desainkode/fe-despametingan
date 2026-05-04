"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Home,
  FileText,
  TrendingUp,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { getDashboardStats } from "@/lib/api/dashboard";
import type { DashboardStats } from "@/types";

// ── Stat Card ─────────────────────────────────────────────────────────────
function StatCard({
  title,
  value,
  icon: Icon,
  description,
  badge,
  color,
}: {
  title: string;
  value: number | string;
  icon: React.ElementType;
  description: string;
  badge?: string;
  color: string;
}) {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${color}`}
        >
          <Icon size={18} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold tracking-tight">
          {typeof value === "number" ? value.toLocaleString("id-ID") : value}
        </div>
        <div className="mt-1 flex items-center gap-2">
          <p className="text-xs text-muted-foreground">{description}</p>
          {badge && (
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
              {badge}
            </Badge>
          )}
        </div>
      </CardContent>
      {/* subtle decorative gradient */}
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-current opacity-[0.04]" />
    </Card>
  );
}

// ── Skeleton Stat Card ────────────────────────────────────────────────────
function StatCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-9 w-9 rounded-xl" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-9 w-24 mb-2" />
        <Skeleton className="h-3 w-36" />
      </CardContent>
    </Card>
  );
}

// ── Dashboard Page ────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getDashboardStats()
      .then(setStats)
      .catch(() => setError("Gagal memuat statistik. Coba refresh halaman."))
      .finally(() => setIsLoading(false));
  }, []);

  const desaName = user?.desa?.nama_desa ?? "Desa Pameutingan";

  return (
    <div className="flex flex-col gap-6">
      {/* ── Page Header ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <Badge
            variant="outline"
            className="gap-1 text-emerald-700 border-emerald-200 bg-emerald-50"
          >
            <Activity size={10} className="animate-pulse" />
            Live
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Selamat datang kembali,{" "}
          <span className="font-semibold text-foreground">{user?.name}</span>.
          Berikut ringkasan data {desaName}.
        </p>
      </div>

      {/* ── Error ───────────────────────────────────────────────── */}
      {error && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* ── Stats Grid ──────────────────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            <StatCard
              title="Total Penduduk"
              value={stats?.total_penduduk ?? 0}
              icon={Users}
              description="Warga terdaftar"
              color="bg-blue-100 text-blue-700"
            />
            <StatCard
              title="Kartu Keluarga"
              value={stats?.total_kartu_keluarga ?? 0}
              icon={Home}
              description="KK aktif terdaftar"
              color="bg-emerald-100 text-emerald-700"
            />
            <StatCard
              title="Surat & Dokumen"
              value={stats?.total_surat ?? 0}
              icon={FileText}
              description="Dokumen diproses"
              badge="Segera Tersedia"
              color="bg-amber-100 text-amber-700"
            />
          </>
        )}
      </div>

      {/* ── Info Cards Row ──────────────────────────────────────── */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Desa Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp size={16} className="text-emerald-600" />
              Informasi Desa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {isLoading ? (
              <>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-5/6" />
              </>
            ) : (
              <dl className="space-y-2 text-sm">
                {[
                  ["Nama Desa", user?.desa?.nama_desa],
                  ["Kecamatan", user?.desa?.kecamatan],
                  ["Kabupaten", user?.desa?.kabupaten],
                  ["Provinsi", user?.desa?.provinsi],
                  ["Kepala Desa", user?.desa?.nama_kepala_desa],
                ].map(([label, val]) =>
                  val ? (
                    <div key={label} className="flex justify-between gap-4">
                      <dt className="text-muted-foreground shrink-0">{label}</dt>
                      <dd className="font-medium text-right">{val}</dd>
                    </div>
                  ) : null
                )}
              </dl>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <ArrowUpRight size={16} className="text-emerald-600" />
              Akses Cepat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Data Penduduk", href: "/admin/penduduk", icon: Users },
                { label: "Kartu Keluarga", href: "/admin/kartu-keluarga", icon: Home },
                { label: "Profil Desa", href: "/admin/profil-desa", icon: TrendingUp },
                { label: "Surat (Segera)", href: "#", icon: FileText },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex flex-col items-center gap-2 rounded-xl border border-border bg-muted/30 p-4 text-center text-xs font-medium transition-colors hover:bg-muted/60 hover:border-emerald-200"
                >
                  <item.icon size={20} className="text-emerald-700" />
                  {item.label}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
