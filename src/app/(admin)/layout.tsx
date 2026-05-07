"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LayoutDashboard } from "lucide-react";
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
          <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-4 bg-background/60 backdrop-blur-xl px-6 transition-all duration-300">
            <SidebarTrigger className="-ml-2 h-9 w-9 rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition-colors" />
            <Separator orientation="vertical" className="h-4 bg-border/60" />
            
            <div className="flex flex-1 items-center gap-2 overflow-hidden">
              <span className="truncate text-sm font-semibold tracking-tight text-foreground/80">
                Sistem Informasi Desa
              </span>
              <span className="text-muted-foreground/30 font-light">/</span>
              <span className="truncate text-xs font-medium text-emerald-600/80 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Admin Panel
              </span>
            </div>

            <div className="flex items-center gap-3">
               {/* Add any right-side header actions here if needed */}
               <div className="hidden md:flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <LayoutDashboard size={16} />
               </div>
            </div>
          </header>
          {/* ── Page Content ─────────────────────────────────── */}
          <main className="flex-1 overflow-y-auto p-4 md:p-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
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
      <div className="admin-theme h-full">
        <AdminLayoutInner>{children}</AdminLayoutInner>
      </div>
    </AuthProvider>
  );
}
