"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RegistroPage() {
  const API = "http://localhost:3000"
  const router = useRouter()
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    correoElectronico: "",
    telefono: "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch(`${API}/api/registro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setMessage({ type: "success", text: "¡Registro exitoso! Bienvenido a la comunidad Uniboost." })
        setFormData({ nombreCompleto: "", correoElectronico: "", telefono: "" })

        // Redirigir después de 2 segundos
        setTimeout(() => {
          router.push("/")
        }, 2000)
      } else {
        setMessage({ type: "error", text: data.error || "Error al registrar. Intenta nuevamente." })
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error de conexión. Intenta nuevamente." })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center gap-3 mx-auto mb-4 group w-fit">
            <img
              src="/img/logouniboost.png"
              alt="Logo Uniboost"
              className="w-30 h-30 rounded-xl object-contain shadow-lg transition-transform group-hover:scale-105"
              loading="lazy"
            />
            <span className="sr-only">Uniboost</span>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Únete a Nuestra Comunidad</CardTitle>
            <CardDescription className="text-center text-pretty">
              Regístrate para recibir información sobre nuestras carreras y eventos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nombreCompleto">Nombre Completo</Label>
                <Input
                  id="nombreCompleto"
                  name="nombreCompleto"
                  type="text"
                  placeholder="Juan Pérez García"
                  value={formData.nombreCompleto}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="correoElectronico">Correo Electrónico</Label>
                <Input
                  id="correoElectronico"
                  name="correoElectronico"
                  type="email"
                  placeholder="juan.perez@ejemplo.com"
                  value={formData.correoElectronico}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  placeholder="3001234567"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              {message && (
                <div
                  className={`p-3 rounded-md text-sm ${message.type === "success"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                    }`}
                >
                  {message.text}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Registrando..." : "Registrarme"}
              </Button>

              <div className="text-center">
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Volver al inicio
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
