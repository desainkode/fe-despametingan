"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Home,
  FileText,
  Settings,
  LogOut,
  Building2,
  ExternalLink,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";

const NAV_MAIN = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Data Penduduk",
    href: "/admin/penduduk",
    icon: Users,
  },
  {
    title: "Kartu Keluarga",
    href: "/admin/kartu-keluarga",
    icon: Home,
  },
  {
    title: "Surat & Dokumen",
    href: "/admin/surat",
    icon: FileText,
    badge: "Segera",
  },
];

const NAV_SETTINGS = [
  {
    title: "Profil Desa",
    href: "/admin/profil-desa",
    icon: Building2,
  },
  {
    title: "Pengaturan",
    href: "/admin/pengaturan",
    icon: Settings,
  },
];

function getInitials(name: string | undefined) {
  if (!name) return "?";
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0] ?? "")
    .join("")
    .toUpperCase();
}

export function AppSidebar() {
  const pathname = usePathname();
  const { user, logout, isLoading } = useAuth();

  return (
    <Sidebar>
      {/* ── Header: Logo & Desa ──────────────────────────────── */}
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-2 py-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
            <Building2 size={18} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold leading-tight text-sidebar-foreground">
              {isLoading
                ? "Memuat..."
                : (user?.desa?.nama_desa ?? "Desa Pameutingan")}
            </p>
            <p className="truncate text-[10px] font-medium uppercase tracking-wider text-sidebar-foreground/50">
              Panel Admin
            </p>
          </div>
        </div>
      </SidebarHeader>

      {/* ── Content: Navigation ─────────────────────────────── */}
      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarMenu>
            {NAV_MAIN.map((item) => {
              const isActive =
                item.href === "/admin/dashboard"
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className="ml-auto text-[10px] px-1.5 py-0"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Settings Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Pengaturan</SidebarGroupLabel>
          <SidebarMenu>
            {NAV_SETTINGS.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* ── Footer: User Menu ───────────────────────────────── */}
      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="w-full data-[state=open]:bg-sidebar-accent"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg bg-emerald-100 text-emerald-700 text-xs font-bold">
                      {getInitials(user?.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.name ?? "Admin"}
                    </span>
                    <span className="truncate text-xs text-sidebar-foreground/60">
                      {user?.email ?? ""}
                    </span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="min-w-56 rounded-lg"
                side="top"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem asChild>
                  <Link href="/" target="_blank" className="gap-2">
                    <ExternalLink size={14} />
                    Lihat Website Desa
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="gap-2 text-destructive focus:text-destructive"
                  onClick={() => logout()}
                >
                  <LogOut size={14} />
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
