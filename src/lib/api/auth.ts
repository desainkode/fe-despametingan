import api from "@/lib/api";
import type { LoginResponse, User } from "@/types";

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  // No longer needed for token-based auth
  // await api.get("/sanctum/csrf-cookie");
  
  const res = await api.post<LoginResponse>("login", { email, password });
  return res.data;
}

export async function logout(): Promise<void> {
  await api.post("logout");
}

export async function getMe(): Promise<User> {
  const res = await api.get<{ user: User }>("me");
  // Backend returns UserResource which IS the user object directly (no wrapper)
  return res.data as unknown as User;
}
