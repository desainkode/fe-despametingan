import api from "@/lib/api";
import type { PaginatedResponse, User } from "@/types";

export interface UserFilters {
  search?: string;
  role?: string;
  desa_id?: string;
  per_page?: number;
  page?: number;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role: string;
  desa_id?: string | null;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  desa_id?: string | null;
}

export async function getUsers(
  filters: UserFilters = {}
): Promise<PaginatedResponse<User>> {
  const params = new URLSearchParams();
  if (filters.search) params.set("search", filters.search);
  if (filters.role) params.set("role", filters.role);
  if (filters.desa_id) params.set("desa_id", filters.desa_id);
  if (filters.per_page) params.set("per_page", String(filters.per_page));
  if (filters.page) params.set("page", String(filters.page));

  const res = await api.get<PaginatedResponse<User>>(
    `users?${params.toString()}`
  );
  return res.data;
}

export async function createUser(payload: CreateUserPayload): Promise<User> {
  const res = await api.post<{ message: string; data: User }>("users", payload);
  return res.data.data;
}

export async function updateUser(
  id: string,
  payload: UpdateUserPayload
): Promise<User> {
  const res = await api.put<{ message: string; data: User }>(
    `users/${id}`,
    payload
  );
  return res.data.data;
}

export async function deleteUser(id: string): Promise<void> {
  await api.delete(`users/${id}`);
}
