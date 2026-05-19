import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/api/`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ── Request interceptor: inject Bearer token ──────────────────────────────
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ── Response interceptor: handle errors ─────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Session expired or invalid token
    if (
      error.response?.status === 401 &&
      typeof window !== "undefined" &&
      !window.location.pathname.includes("/admin/login") &&
      !window.location.pathname.includes("/layanan-masyarakat/login")
    ) {
      localStorage.removeItem("auth_token");
      if (window.location.pathname.includes("/layanan-masyarakat")) {
        window.location.href = "/layanan-masyarakat/login";
      } else {
        window.location.href = "/admin/login";
      }
    }

    // Attach more info to error for debugging
    if (error.response?.data?.message) {
      error.message = error.response.data.message;
    }

    return Promise.reject(error);
  }
);

export default api;
