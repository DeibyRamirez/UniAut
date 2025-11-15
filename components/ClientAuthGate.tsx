// app/components/ClientAuthGate.tsx
"use client";

import { AuthProvider } from "@/app/context/AuthContext";
import { usePathname } from "next/navigation";
import React from "react";


interface Props {
  children: React.ReactNode;
}

export default function ClientAuthGate({ children }: Props) {
  const pathname = usePathname(); // disponible solo en cliente

  // Si pathname es null/undefined (mientras se hidrata), devolvemos children
  if (!pathname) return <>{children}</>;

  // Decide aquí qué rutas deben ser públicas:
  // - si quieres solo "/" pública:
  if (pathname === "/") {
    return <>{children}</>;
  }

  // - si quieres permitir varias públicas, por ejemplo:
  // const publicPrefixes = ["/", "/info", "/about"];
  // if (publicPrefixes.some(p => pathname.startsWith(p))) return <>{children}</>;

  // Por defecto, envolver con el provider para las demás rutas:
  return <AuthProvider>{children}</AuthProvider>;
}
