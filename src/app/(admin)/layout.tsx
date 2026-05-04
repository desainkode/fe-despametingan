"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/admin/AppSidebar";
import { AuthProvider, useAuth } from "@/context/AuthContext";

// ── Inner layout — needs AuthContext ──────────────────────────────────────
function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // Show nothing while loading or unauthenticated (middleware handles redirect,
  // this is a client-side fallback)
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
          <p className="text-sm text-muted-foreground">Memuat sesi...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {/* ── Header Bar ──────────────────────────────────── */}
          <header className="sticky top-0 z-10 flex h-14 items-center gap-2 border-b bg-background/95 backdrop-blur-sm px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <span className="text-sm text-muted-foreground">
              Sistem Informasi Desa
            </span>
          </header>
          {/* ── Page Content ─────────────────────────────────── */}
          <main className="flex flex-1 flex-col gap-4 p-4 md:p-6">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}

// ── Exported layout — wraps AuthProvider ─────────────────────────────────
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AuthProvider>
  );
}
