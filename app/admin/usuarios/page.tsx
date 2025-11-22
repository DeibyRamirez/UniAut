"use client"

import { useAuth } from "@/app/context/AuthContext"
import { Button } from "@/components/ui/button"
import { UserDialog } from "@/components/UserDialog"
import { UsuarioRegistro } from "@/types"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function DashboardAdmin() {
    const [usuarios, setUsuarios] = useState<UsuarioRegistro[]>([])
    const [error, setError] = useState("")
    // Estados del dialog
    const [dialogOpen, setDialogOpen] = useState(false)
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<any>(null)
    const [modoDialog, setModoDialog] = useState<"editar" | "eliminar">("editar")

    // Auth
    const { user, loading: authLoading, logout, isAuthenticated } = useAuth()
    const router = useRouter()

    const fetchUsuarios = async () => {
        try {
            const response = await fetch("/api/registro")
            const data = await response.json()

            if (data.success) {
                setUsuarios(data.data)
            } else {
                setError("No se pudieron cargar los usuarios")
            }
        } catch (error) {
            setError("Error al obtener usuarios")
        }
    }


    useEffect(() => {
        fetchUsuarios()
    }, [])


    // Abrir dialog
    const abrirDialog = (usuario: any, modo: "editar" | "eliminar") => {
        setUsuarioSeleccionado(usuarios.find(u => u._id === usuario._id))
        setModoDialog(modo)
        setDialogOpen(true)
    }

    const handleLogout = async () => {
        await logout()
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-6xl mx-auto">

                {/* Encabezado mejorado */}
                <div className="mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                Panel de Administración
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Bienvenido, <span className="font-semibold text-blue-600">{user?.nombreCompleto}</span>
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                Gestiona usuarios, edita o elimina cuentas y revisa estadísticas rápidas.
                            </p>
                        </div>

                        <div className="flex items-center gap-2">

                            <Button
                                onClick={() => (window.location.href = "/")}
                                variant="outline"
                                className="hidden sm:inline-flex"
                            >
                                Volver al Inicio
                            </Button>

                            <Button
                                onClick={handleLogout}
                                variant="outline"
                                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Cerrar Sesión
                            </Button>
                        </div>
                    </div>

                    {/* Estadísticas rápidas */}
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-4 bg-white rounded-lg shadow-sm border flex flex-col">
                            <span className="text-sm text-gray-500">Usuarios totales</span>
                            <span className="text-2xl font-bold text-gray-800">{usuarios.length}</span>
                        </div>

                        <div className="p-4 bg-white rounded-lg shadow-sm border flex flex-col">
                            <span className="text-sm text-gray-500">Administradores</span>
                            <span className="text-2xl font-bold text-gray-800">
                                {usuarios.filter((u: any) => String(u.rol || "").toLowerCase() === "admin").length}
                            </span>
                        </div>

                        <div className="p-4 bg-white rounded-lg shadow-sm border flex flex-col">
                            <span className="text-sm text-gray-500">Roles distintos</span>
                            <span className="text-2xl font-bold text-gray-800">
                                {Array.from(new Set(usuarios.map((u: any) => String(u.rol || "")))).filter(Boolean).length}
                            </span>
                        </div>
                    </div>
                </div>

                {error && (
                    <p className="text-red-500 text-center mb-4 text-lg">{error}</p>
                )}

                {/* Contenedor tabla */}
                <div className="overflow-hidden rounded-2xl shadow-2xl bg-white border border-gray-200">
                    <table className="w-full border-collapse">
                        <thead className="bg-gradient-to-r from-primary via-primary/80 to-accent text-white">
                            <tr>
                                <th className="py-4 px-6 text-left text-lg font-semibold">Nombre</th>
                                <th className="py-4 px-6 text-left text-lg font-semibold">Correo</th>
                                <th className="py-4 px-6 text-left text-lg font-semibold">Teléfono</th>
                                <th className="py-4 px-6 text-left text-lg font-semibold">Rol</th>
                                <th className="py-4 px-6 text-left text-lg font-semibold">Acciones</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {usuarios.map((u: any, i) => (
                                <tr
                                    key={u._id}
                                    className="hover:bg-gray-100 transition-all duration-200"
                                >
                                    <td className="py-4 px-6 text-gray-800">{u.nombreCompleto}</td>
                                    <td className="py-4 px-6 text-gray-600">{u.correoElectronico}</td>
                                    <td className="py-4 px-6 text-gray-600">{u.telefono}</td>
                                    <td className="py-4 px-6">
                                        <span
                                            className="px-4 py-2 rounded-full text-sm font-semibold bg-primary/10 
                                            text-primary border border-primary/20 shadow-sm"
                                        >
                                            {u.rol}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => abrirDialog(u, "editar")}
                                                className="text-yellow-600 hover:text-yellow-800 font-medium"
                                            >
                                                Editar
                                            </button>

                                            <button
                                                onClick={() => abrirDialog(u, "eliminar")}
                                                className="text-red-600 hover:text-red-800 font-medium"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* DIALOG IMPORTADO */}
                <UserDialog
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    onSuccess={fetchUsuarios}
                    usuario={usuarioSeleccionado}
                    modo={modoDialog}
                />

            </div>
        </div>
    )
}
