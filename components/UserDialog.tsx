"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface UserDialogProps {
    open: boolean
    onClose: () => void
    onSuccess: () => void    // ← nuevo
    usuario: any
    modo: "editar" | "eliminar"
}

export function UserDialog({ open, onClose, onSuccess, usuario, modo }: UserDialogProps) {
    if (!usuario) return null

    // ============================
    // 📌 Estados controlados
    // ============================
    const [nombre, setNombre] = useState(usuario.nombreCompleto)
    const [correo, setCorreo] = useState(usuario.correoElectronico)
    const [telefono, setTelefono] = useState(usuario.telefono)
    const [rol, setRol] = useState(usuario.rol)
    const [password, setPassword] = useState("")
    const router = useRouter()

    useEffect(() => {
        setNombre(usuario.nombreCompleto)
        setCorreo(usuario.correoElectronico)
        setTelefono(usuario.telefono)
        setRol(usuario.rol)
        setPassword("")
    }, [usuario])


    // ============================
    // 📌 PUT - Actualizar usuario
    // ============================
    const actualizarUsuario = async () => {
        try {
            const response = await fetch(`/api/registro/${usuario._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nombreCompleto: nombre,
                    correoElectronico: correo,
                    telefono: telefono,
                    rol: rol,
                    password: password || undefined,
                }),
            })

            if (!response.ok) {
                console.error(await response.json())
                return
            }
            onClose()        // Cerrar dialog
            onSuccess() // ← refresca la tabla

        } catch (error) {
            console.error("Error actualizando usuario:", error)
        }
    }

    // ============================
    // 📌 DELETE - Eliminar usuario
    // ============================
    const eliminarUsuario = async () => {
        try {
            const response = await fetch(`/api/registro/${usuario._id}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                console.error(await response.json())
                return
            }
            onClose()        // Cerrar dialog
            onSuccess() // ← refresca la tabla

        } catch (error) {
            console.error("Error eliminando usuario:", error)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg bg-white rounded-lg p-6 shadow-lg">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        {modo === "editar" ? "Editar Usuario" : "Eliminar Usuario"}
                    </DialogTitle>
                </DialogHeader>

                {modo === "eliminar" && (
                    <div className="space-y-4 py-4">
                        <p><b>Nombre:</b> {usuario.nombreCompleto}</p>
                        <p><b>Correo:</b> {usuario.correoElectronico}</p>
                        <p><b>Teléfono:</b> {usuario.telefono}</p>
                        <p><b>Rol:</b> {usuario.rol}</p>
                    </div>
                )}

                {/* FORMULARIO PARA EDITAR */}
                {modo === "editar" && (
                    <div className="space-y-4 py-4">

                        <div>
                            <label className="font-semibold">Nombre</label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                className="w-full mt-1 px-3 py-2 border rounded-md"
                            />
                        </div>

                        <div>
                            <label className="font-semibold">Correo</label>
                            <input
                                type="email"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                className="w-full mt-1 px-3 py-2 border rounded-md"
                            />
                        </div>

                        <div>
                            <label className="font-semibold">Teléfono</label>
                            <input
                                type="tel"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                                className="w-full mt-1 px-3 py-2 border rounded-md"
                            />
                        </div>

                        <div>
                            <label className="font-semibold">Rol</label>
                            <select
                                value={rol}
                                onChange={(e) => setRol(e.target.value)}
                                className="w-full mt-1 px-3 py-2 border rounded-md"
                            >
                                <option value="aspirante">Aspirante</option>
                                <option value="admisiones">Admisiones</option>
                                <option value="admin">Admin</option>

                            </select>
                        </div>

                        {(usuario.rol === "admin" || usuario.rol === "admisiones") && (
                            <div>
                                <label className="font-semibold">Nueva contraseña</label>
                                <input
                                    type="password"
                                    placeholder="Nueva contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full mt-1 px-3 py-2 border rounded-md"
                                />
                            </div>
                        )}
                    </div>
                )}

                {/* BOTONES */}
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancelar
                    </Button>

                    {modo === "editar" && (
                        <Button onClick={actualizarUsuario} className="bg-primary text-white">
                            Guardar cambios
                        </Button>
                    )}

                    {modo === "eliminar" && (
                        <Button onClick={eliminarUsuario} className="bg-red-600 text-white">
                            Eliminar usuario
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
