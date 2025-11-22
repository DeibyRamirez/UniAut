"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ro } from "date-fns/locale"

export default function RegistroPage() {
  const API = "http://localhost:3000"
  const router = useRouter()
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    correoElectronico: "",
    telefono: "",
    rol: "aspirante",
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
        setFormData({ nombreCompleto: "", correoElectronico: "", telefono: "", rol: "aspirante" })

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="space-y-1 text-center">
          {/* Logo centrado */}
          <div className="flex justify-center mb-4">
            <Link href="/" className="group">
              <img
                src="/img/logouniboost.png"
                alt="Logo Uniboost"
                className="w-20 h-20 rounded-xl object-contain shadow-lg transition-transform group-hover:scale-105"
                loading="lazy"
              />
            </Link>
          </div>
          
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Únete a Nuestra Comunidad
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Regístrate para recibir información sobre nuestras carreras y eventos
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo Nombre Completo */}
            <div className="space-y-2">
              <Label htmlFor="nombreCompleto" className="text-sm font-medium">
                Nombre Completo
              </Label>
              <div className="relative">
                <Input
                  id="nombreCompleto"
                  name="nombreCompleto"
                  type="text"
                  placeholder="Juan Pérez García"
                  value={formData.nombreCompleto}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="pl-10 py-2.5 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>

            {/* Campo Correo Electrónico */}
            <div className="space-y-2">
              <Label htmlFor="correoElectronico" className="text-sm font-medium">
                Correo Electrónico
              </Label>
              <div className="relative">
                <Input
                  id="correoElectronico"
                  name="correoElectronico"
                  type="email"
                  placeholder="juan.perez@ejemplo.com"
                  value={formData.correoElectronico}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="pl-10 py-2.5 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            {/* Campo Teléfono */}
            <div className="space-y-2">
              <Label htmlFor="telefono" className="text-sm font-medium">
                Teléfono
              </Label>
              <div className="relative">
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  placeholder="300 123 4567"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="pl-10 py-2.5 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
            </div>

            {/* Mensaje de estado */}
            {message && (
              <div
                className={`p-3 rounded-lg text-sm border ${
                  message.type === "success"
                    ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200"
                    : "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200"
                }`}
              >
                {message.text}
              </div>
            )}

            {/* Botón de registro */}
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2.5 font-medium rounded-lg transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Registrando...
                </div>
              ) : (
                "Registrarme"
              )}
            </Button>

            {/* Enlace para volver al inicio */}
            <div className="text-center">
              <Link 
                href="/" 
                className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors font-medium inline-flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver al inicio
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}