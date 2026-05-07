"use client";

import type { UserRole } from "@/types";
import { useAuth } from "@/context/AuthContext";

interface RoleGuardProps {
  /** Roles that are allowed to see the children */
  roles: UserRole[];
  /** Fallback content shown when role does not match */
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Wraps content that should only be visible to users with specific roles.
 * If the current user's role does not match, renders `fallback` (default: null).
 *
 * Usage:
 *   <RoleGuard roles={["superadmin"]}>
 *     <ManajemenUserButton />
 *   </RoleGuard>
 */
export function RoleGuard({ roles, fallback = null, children }: RoleGuardProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;
  if (!user || !roles.includes(user.role)) return <>{fallback}</>;

  return <>{children}</>;
}
