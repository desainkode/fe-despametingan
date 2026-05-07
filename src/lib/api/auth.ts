import api from "@/lib/api";
import type { LoginResponse, User } from "@/types";

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const res = await api.post<{ user: { data: User }; token: string }>("login", {
    email,
    password,
  });
  return {
    user: res.data.user.data,
    token: res.data.token,
  };
}

export async function logout(): Promise<void> {
  await api.post("logout");
}

export async function getMe(): Promise<User> {
  const res = await api.get<{ data: User }>("me");
  // Laravel API Resource wraps data in a 'data' property by default
  return res.data.data;
}

export async function updateProfile(data: {
  name: string;
  email: string;
}): Promise<User> {
  const res = await api.put<{ user: { data: User } }>("profile", data);
  return res.data.user.data;
}

export async function updatePassword(data: any): Promise<void> {
  await api.put("password", data);
}
