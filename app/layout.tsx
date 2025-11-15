// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import ClientAuthGate from "@/components/ClientAuthGate";


export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        {/* ClientAuthGate decide en el cliente si envuelve en AuthProvider */}
        <ClientAuthGate>
          {children}
        </ClientAuthGate>
      </body>
    </html>
  );
}
