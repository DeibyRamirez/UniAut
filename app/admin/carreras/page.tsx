// app/admin/carreras/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, Video, Save, X } from "lucide-react"

interface Carrera {
    _id: string
    titulo: string
    descripcion: string
    modalidad: string
    duracion: string
    imagenR: string
    facultad: string
    videoUrl?: string
}

export default function AdminCarrerasPage() {
    const [carreras, setCarreras] = useState<Carrera[]>([])
    const [loading, setLoading] = useState(true)
    const [editingCarrera, setEditingCarrera] = useState<Carrera | null>(null)
    const [videoUrl, setVideoUrl] = useState("")
    const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false)
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

    // Estado para nueva carrera
    const [newCarrera, setNewCarrera] = useState({
        titulo: "",
        descripcion: "",
        modalidad: "Presencial",
        duracion: "",
        imagenR: "",
        facultad: "",
        videoUrl: ""
    })

    useEffect(() => {
        fetchCarreras()
    }, [])

    const fetchCarreras = async () => {
        try {
            const response = await fetch("/api/carreras")
            const { data } = await response.json()
            setCarreras(data)
        } catch (error) {
            console.error("Error fetching carreras:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleAddVideo = (carrera: Carrera) => {
        setEditingCarrera(carrera)
        setVideoUrl(carrera.videoUrl || "")
        setIsVideoDialogOpen(true)
    }

    const handleSaveVideo = async () => {
        if (!editingCarrera) return

        try {
            const response = await fetch(`/api/carreras/${editingCarrera._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ videoUrl })
            })

            const result = await response.json()

            if (response.ok && result.success) {
                setCarreras(prev => prev.map(c =>
                    c._id === editingCarrera._id ? { ...c, videoUrl } : c
                ))
                setIsVideoDialogOpen(false)
                setEditingCarrera(null)
                setVideoUrl("")
            } else {
                console.error("Error actualización:", result)
            }
        } catch (err) {
            console.error("Error updating carrera:", err)
        }
    }

    const handleCreateCarrera = async () => {
        try {
            const response = await fetch("/api/carreras", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCarrera)
            })

            const result = await response.json()

            if (response.ok && result.success) {
                setCarreras(prev => [...prev, result.data])
                setIsCreateDialogOpen(false)
                setNewCarrera({
                    titulo: "",
                    descripcion: "",
                    modalidad: "Presencial",
                    duracion: "",
                    imagenR: "",
                    facultad: "",
                    videoUrl: ""
                })
            }
        } catch (err) {
            console.error("Error creating carrera:", err)
        }
    }

    const handleEditCarrera = async () => {
        if (!editingCarrera) return

        // Enviar solo los campos necesarios
        const datosParaEnviar = {
            titulo: editingCarrera.titulo,
            descripcion: editingCarrera.descripcion,
            modalidad: editingCarrera.modalidad,
            duracion: editingCarrera.duracion,
            imagenR: editingCarrera.imagenR,
            facultad: editingCarrera.facultad
        }

        console.log("📤 Enviando:", datosParaEnviar);


        console.log("📤 Enviando datos al backend:", editingCarrera); // LOG PARA DEBUG}

        try {
            const response = await fetch(`/api/carreras/${editingCarrera._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datosParaEnviar)
            })

            console.log("📥 Respuesta del servidor:", response.status); // LOG PARA DEBUG

            const result = await response.json()

            if (response.ok && result.success) {
                setCarreras(prev => prev.map(c =>
                    c._id === editingCarrera._id ? editingCarrera : c
                ))
                setIsEditDialogOpen(false)
                setEditingCarrera(null)
                alert("Carrera actualizada correctamente") // Feedback al usuario
            } else {
                console.error("Error actualización:", result)
                alert(`Error: ${result.error}`) // Feedback al usuario
            }
        } catch (err) {
            console.error("Error updating carrera:", err)
            alert("Error al actualizar la carrera") // Feedback al usuario
        }
    }

    const handleDeleteCarrera = async (id: string) => {
        if (!confirm("¿Estás seguro de que quieres eliminar esta carrera?")) return

        try {
            const response = await fetch(`/api/carreras/${id}`, {
                method: "DELETE"
            })

            const result = await response.json()

            if (response.ok && result.success) {
                setCarreras(prev => prev.filter(c => c._id !== id))
            }
        } catch (err) {
            console.error("Error deleting carrera:", err)
        }
    }

    const handleEditClick = (carrera: Carrera) => {
        setEditingCarrera({ ...carrera })
        setIsEditDialogOpen(true)
    }

    const modalidadColors = {
        Presencial: "bg-blue-100 text-blue-800 border-blue-200",
        Virtual: "bg-green-100 text-green-800 border-green-200",
        Híbrida: "bg-purple-100 text-purple-800 border-purple-200",
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Administrar Carreras</h1>
                        <p className="text-gray-600 mt-2">Gestiona las carreras universitarias disponibles</p>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            onClick={() => window.location.href = "/"}
                            variant="outline"
                        >
                            Volver al Inicio
                        </Button>
                        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-blue-600 hover:bg-blue-700">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Agregar Carrera
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md bg-white rounded-lg shadow-lg">
                                <DialogHeader>
                                    <DialogTitle>Agregar Nueva Carrera</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="titulo">Título</Label>
                                        <Input
                                            id="titulo"
                                            value={newCarrera.titulo}
                                            onChange={(e) => setNewCarrera(prev => ({ ...prev, titulo: e.target.value }))}
                                            placeholder="Ingeniería en Sistemas"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="descripcion">Descripción</Label>
                                        <Textarea
                                            id="descripcion"
                                            value={newCarrera.descripcion}
                                            onChange={(e) => setNewCarrera(prev => ({ ...prev, descripcion: e.target.value }))}
                                            placeholder="Descripción de la carrera..."
                                            rows={3}
                                        />
                                    </div>

                                    <div>
                                        <div>
                                            <Label htmlFor="facultad">Facultad</Label>
                                            <Select
                                                value={newCarrera.facultad}
                                                onValueChange={(value) => setNewCarrera(prev => ({ ...prev, facultad: value }))}
                                            >
                                                <SelectTrigger className="bg-white">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white">
                                                    <SelectItem value="Facultad de Ingeniería">Facultad de Ingeniería</SelectItem>
                                                    <SelectItem value="Facultad de Ciencias Administrativas, Contables y Económicas">Facultad de Ciencias Administrativas, Contables y Económicas</SelectItem>
                                                    <SelectItem value="Facultad de Derecho, Ciencias Sociales y Políticas">Facultad de Derecho, Ciencias Sociales y Políticas</SelectItem>
                                                    <SelectItem value="Facultad de Ciencias del Deporte">Facultad de Ciencias del Deporte</SelectItem>
                                                    <SelectItem value="Facultad de Ciencias Ambientales y Desarrollo Sostenible">Facultad de Ciencias Ambientales y Desarrollo Sostenible</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="modalidad">Modalidad</Label>
                                            <Select
                                                value={newCarrera.modalidad}
                                                onValueChange={(value) => setNewCarrera(prev => ({ ...prev, modalidad: value }))}
                                            >
                                                <SelectTrigger className="bg-white">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white">
                                                    <SelectItem value="Presencial">Presencial</SelectItem>
                                                    <SelectItem value="Virtual">Virtual</SelectItem>
                                                    <SelectItem value="Híbrida">Híbrida</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>



                                        <div>
                                            <Label htmlFor="duracion">Duración</Label>
                                            <Input
                                                id="duracion"
                                                value={newCarrera.duracion}
                                                onChange={(e) => setNewCarrera(prev => ({ ...prev, duracion: e.target.value }))}
                                                placeholder="4 semestres"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="imagenR">URL de Imagen</Label>
                                        <Input
                                            id="imagenR"
                                            value={newCarrera.imagenR}
                                            onChange={(e) => setNewCarrera(prev => ({ ...prev, imagenR: e.target.value }))}
                                            placeholder="https://ejemplo.com/imagen.jpg"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                                        Cancelar
                                    </Button>
                                    <Button onClick={handleCreateCarrera}>
                                        <Save className="w-4 h-4 mr-2" />
                                        Crear Carrera
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Carreras Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {carreras.map((carrera) => (
                        <Card key={carrera._id} className="hover:shadow-xl transition-all duration-300 border border-gray-200">
                            {carrera.imagenR && (
                                <div className="h-48 overflow-hidden rounded-t-lg">
                                    <img
                                        src={carrera.imagenR}
                                        alt={carrera.titulo}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start mb-2">
                                    <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2">
                                        {carrera.titulo}
                                    </CardTitle>
                                    <Badge variant="outline" className={modalidadColors[carrera.modalidad as keyof typeof modalidadColors]}>
                                        {carrera.modalidad}
                                    </Badge>
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <span className="font-medium">{carrera.duracion}</span>
                                </div>
                            </CardHeader>

                            <CardContent className="pb-4">
                                <p className="text-gray-700 line-clamp-3 mb-4">{carrera.descripcion}</p>

                                {carrera.videoUrl && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                                        <p className="text-sm text-green-800 font-medium mb-2 flex items-center">
                                            <Video className="w-4 h-4 mr-1" />
                                            Video asignado:
                                        </p>
                                        <a
                                            href={carrera.videoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 text-sm break-all underline"
                                        >
                                            {carrera.videoUrl}
                                        </a>
                                    </div>
                                )}
                            </CardContent>

                            <CardFooter className="flex gap-2 pt-0">
                                <Button
                                    onClick={() => handleAddVideo(carrera)}
                                    variant={carrera.videoUrl ? "outline" : "default"}
                                    className="flex-1"
                                    size="sm"
                                >
                                    <Video className="w-4 h-4 mr-1" />
                                    {carrera.videoUrl ? "Editar Video" : "Agregar Video"}
                                </Button>

                                <Button
                                    onClick={() => handleEditClick(carrera)}
                                    variant="outline"
                                    size="sm"
                                >
                                    <Edit className="w-4 h-4" />
                                </Button>

                                <Button
                                    onClick={() => handleDeleteCarrera(carrera._id)}
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {carreras.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">🎓</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay carreras</h3>
                        <p className="text-gray-600 mb-6">Comienza agregando la primera carrera.</p>
                        <Button
                            onClick={() => setIsCreateDialogOpen(true)}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Agregar Primera Carrera
                        </Button>
                    </div>
                )}

                {/* Video Dialog */}
                <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
                    <DialogContent className="max-w-md bg-white rounded-lg shadow-lg">
                        <DialogHeader>
                            <DialogTitle className="flex items-center">
                                <Video className="w-5 h-5 mr-2" />
                                {editingCarrera?.videoUrl ? "Editar Video" : "Agregar Video"} - {editingCarrera?.titulo}
                            </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="videoUrl">URL del Video</Label>
                                <Input
                                    id="videoUrl"
                                    type="url"
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    value={videoUrl}
                                    onChange={(e) => setVideoUrl(e.target.value)}
                                />
                            </div>
                            {videoUrl && (
                                <div className="text-sm text-gray-600">
                                    <p>Ejemplos válidos:</p>
                                    <ul className="list-disc list-inside mt-1">
                                        <li>https://youtube.com/watch?v=...</li>
                                        <li>https://vimeo.com/...</li>
                                        <li>https://drive.google.com/file/d/...</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsVideoDialogOpen(false)}>
                                <X className="w-4 h-4 mr-2" />
                                Cancelar
                            </Button>
                            <Button onClick={handleSaveVideo} disabled={!videoUrl}>
                                <Save className="w-4 h-4 mr-2" />
                                Guardar Video
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Edit Carrera Dialog */}
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="max-w-md bg-white rounded-lg shadow-lg">
                        <DialogHeader>
                            <DialogTitle>Editar Carrera</DialogTitle>
                        </DialogHeader>
                        {editingCarrera && (
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="edit-titulo">Título</Label>
                                    <Input
                                        id="edit-titulo"
                                        value={editingCarrera.titulo}
                                        onChange={(e) => setEditingCarrera(prev => prev ? { ...prev, titulo: e.target.value } : null)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="edit-descripcion">Descripción</Label>
                                    <Textarea
                                        id="edit-descripcion"
                                        value={editingCarrera.descripcion}
                                        onChange={(e) => setEditingCarrera(prev => prev ? { ...prev, descripcion: e.target.value } : null)}
                                        rows={3}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="edit-modalidad">Modalidad</Label>
                                        <Select
                                            value={editingCarrera.modalidad}
                                            onValueChange={(value) => setEditingCarrera(prev => prev ? { ...prev, modalidad: value } : null)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Presencial">Presencial</SelectItem>
                                                <SelectItem value="Virtual">Virtual</SelectItem>
                                                <SelectItem value="Híbrida">Híbrida</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="edit-duracion">Duración</Label>
                                        <Input
                                            id="edit-duracion"
                                            value={editingCarrera.duracion}
                                            onChange={(e) => setEditingCarrera(prev => prev ? { ...prev, duracion: e.target.value } : null)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="edit-imagenR">URL de Imagen</Label>
                                    <Input
                                        id="edit-imagenR"
                                        value={editingCarrera.imagenR}
                                        onChange={(e) => setEditingCarrera(prev => prev ? { ...prev, imagenR: e.target.value } : null)}
                                    />
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                Cancelar
                            </Button>
                            <Button onClick={handleEditCarrera}>
                                <Save className="w-4 h-4 mr-2" />
                                Guardar Cambios
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}