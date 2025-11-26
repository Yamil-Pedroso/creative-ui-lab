"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, hydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!hydrated) return; // 👈 espera a que Zustand cargue
    if (!token) router.replace("/login");
  }, [hydrated, token, router]);

  if (!hydrated) return null; // evita parpadeo
  if (!token) return null; // evita pantalla auth parpadeando

  return <>{children}</>;
}
