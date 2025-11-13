// app/admin/carreras/page.tsx
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Carrera {
    _id: string
    titulo: string
    descripcion: string
    modalidad: string
    duracion: string
    imagenR: string
    videoUrl?: string
}

export default function AdminCarrerasPage() {
    const [carreras, setCarreras] = useState<Carrera[]>([])
    const [loading, setLoading] = useState(true)
    const [editingCarrera, setEditingCarrera] = useState<Carrera | null>(null)
    const [videoUrl, setVideoUrl] = useState("")

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
    }



    const handleSaveVideo = async () => {
        if (!editingCarrera) return;

        console.log("Guardando video para id:", editingCarrera._id, "videoUrl:", videoUrl);

        try {
            const response = await fetch(`/api/carreras/${editingCarrera._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ videoUrl })
            });

            const result = await response.json();
            console.log("Resultado PUT:", result);

            if (response.ok && result.success) {
                setCarreras(prev => prev.map(c => c._id === editingCarrera._id ? { ...c, videoUrl } : c));
                setEditingCarrera(null);
                setVideoUrl("");
            } else {
                console.error("Error actualización:", result);
            }
        } catch (err) {
            console.error("Error updating carrera:", err);
        }
    };


    const modalidadColors = {
        Presencial: "bg-blue-100 text-blue-800",
        Virtual: "bg-green-100 text-green-800",
        Híbrida: "bg-purple-100 text-purple-800",
    }

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Cargando...</div>
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Administrar Carreras</h1>
                    <Button onClick={() => window.location.href = "/"}>
                        Volver al Inicio
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {carreras.map((carrera) => (
                        <Card key={carrera._id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex justify-between items-start mb-2">
                                    <CardTitle className="text-xl">{carrera.titulo}</CardTitle>
                                    <Badge>
                                        {carrera.modalidad}
                                    </Badge>
                                </div>
                                <p className="text-sm text-gray-600">{carrera.duracion}</p>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <p className="text-gray-700 line-clamp-3">{carrera.descripcion}</p>

                                {carrera.videoUrl && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                        <p className="text-sm text-green-800 font-medium mb-2">Video asignado:</p>
                                        <a
                                            href={carrera.videoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 text-sm break-all"
                                        >
                                            {carrera.videoUrl}
                                        </a>
                                    </div>
                                )}

                                <Button
                                    onClick={() => handleAddVideo(carrera)}
                                    className="w-full bg-blue-600 hover:bg-blue-700"
                                >
                                    {carrera.videoUrl ? "Editar Video" : "Agregar Video"}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Modal para agregar/editar video */}
                {editingCarrera && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md">
                            <h3 className="text-lg font-semibold mb-4">
                                {editingCarrera.videoUrl ? "Editar" : "Agregar"} Video - {editingCarrera.titulo}
                            </h3>

                            <Input
                                type="url"
                                placeholder="https://www.youtube.com/watch?v=..."
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                className="mb-4"
                            />

                            <div className="flex gap-2 justify-end">
                                <Button
                                    variant="outline"
                                    onClick={() => setEditingCarrera(null)}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    onClick={handleSaveVideo}
                                    disabled={!videoUrl}
                                >
                                    Guardar
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}