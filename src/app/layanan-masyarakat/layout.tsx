import { AuthProvider } from "@/features/layanan/context/AuthContext";

export default function LayananLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
