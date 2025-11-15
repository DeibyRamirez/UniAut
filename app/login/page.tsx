// app/login/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

import { useRouter } from "next/navigation"
import { useAuth } from "../context/AuthContext"

export default function Login() {
    const [formData, setFormData] = useState({
        correoElectronico: "",
        password: ""
    })
    const [error, setError] = useState("")
    const { login, user, loading } = useAuth()
    const router = useRouter()

    // Redirigir si ya está autenticado
    useEffect(() => {
        if (user) {
            router.push("/admin/carreras")
        }
    }, [user, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        const success = await login(formData.correoElectronico, formData.password)

        if (success) {
            // La redirección se maneja automáticamente en el useEffect
        } else {
            setError("Credenciales incorrectas. Por favor, verifica tus datos.")
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    // Mostrar loading mientras verifica autenticación
    if (loading && !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Verificando...</p>
                </div>
            </div>
        )
    }

    // Si ya está autenticado, mostrar loading de redirección
    if (user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Redirigiendo...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900 p-4">
            <Card className="w-full max-w-md shadow-2xl border-0">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Iniciar Sesión
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                        Ingresa tus credenciales para acceder a tu cuenta
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3 dark:bg-red-900/20 dark:border-red-800">
                                <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="correoElectronico" className="text-sm font-medium">
                                Correo
                            </Label>
                            <div className="relative">
                                <Input
                                    id="correoElectronico"
                                    name="correoElectronico"
                                    type="email"
                                    placeholder="Ingresa tu Correo"
                                    value={formData.correoElectronico}
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

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium">
                                Contraseña
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Ingresa tu contraseña"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                    className="pl-10 py-2.5 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                                />
                                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center">
                                {/* Opcional: Checkbox para recordar sesión */}
                            </label>
                            <a href="#" className="text-blue-600 hover:text-blue-500 transition-colors font-medium">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2.5 font-medium rounded-lg transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] disabled:opacity-50"
                        >
                            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                        </Button>

                        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                            ¿No tienes una cuenta?{" "}
                            <a href="/registro" className="text-blue-600 hover:text-blue-500 transition-colors font-medium">
                                Regístrate
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}