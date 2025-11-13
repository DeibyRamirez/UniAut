// app/carreras/[id]/page.tsx
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

interface PageProps {
    params: Promise<{ id: string }> // 👈 params debe ser Promise
}

export default async function CarreraDetailPage({ params }: PageProps) {
    const { id } = await params // 👈 Esperar el parámetro
    const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

    try {
        const response = await fetch(`${API}/api/carreras/${id}`, {
            cache: "no-store",
        })

        if (!response.ok) notFound()

        const { data: carrera } = await response.json()

        if (!carrera) notFound()

        const modalidadColors: Record<string, string> = {
            Presencial: "bg-blue-100 text-blue-800",
            Virtual: "bg-green-100 text-green-800",
            Híbrida: "bg-purple-100 text-purple-800",
        }

        function getEmbedUrl(url: string): string {
            if (!url) return ""

            try {
                // Ejemplos soportados:
                // https://www.youtube.com/watch?v=abcd1234
                // https://youtu.be/abcd1234
                // https://www.youtube.com/embed/abcd1234
                const videoIdMatch = url.match(
                    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/
                )
                const videoId = videoIdMatch ? videoIdMatch[1] : null

                return videoId ? `https://www.youtube.com/embed/${videoId}` : ""
            } catch {
                return ""
            }
        }


        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Botón volver */}
                    <div className="mb-6">
                        <Link href="/">
                            <Button variant="outline" className="flex items-center gap-2">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                    />
                                </svg>
                                Volver a Carreras
                            </Button>
                        </Link>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            {/* Columna izquierda */}
                            <div className="p-8">
                                <div className="relative h-80 mb-6 rounded-xl overflow-hidden">
                                    <Image
                                        src={carrera.imagenR || "/placeholder.svg"}
                                        alt={carrera.titulo}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <Badge className={modalidadColors[carrera.modalidad] || ""}>
                                        {carrera.modalidad}
                                    </Badge>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span className="font-medium">{carrera.duracion}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Columna derecha */}
                            <div className="p-8 bg-gray-50">
                                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                    {carrera.titulo}
                                </h1>
                                <p className="text-gray-700 leading-relaxed mb-8">
                                    {carrera.descripcion}
                                </p>

                                {carrera.videoUrl && (
                                    <div className="mb-8">
                                        <h3 className="text-xl font-semibold mb-4">Video Informativo</h3>
                                        <div className="aspect-video bg-black rounded-lg overflow-hidden">
                                            <iframe
                                                src={getEmbedUrl(carrera.videoUrl)}
                                                className="w-full h-full"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                title={`Video de ${carrera.titulo}`}
                                            />
                                        </div>
                                    </div>
                                )}


                                <div className="flex gap-4">
                                    <Button className="bg-blue-600 hover:bg-blue-700 px-8">
                                        Más Información
                                    </Button>
                                    <Button variant="outline">Compartir</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } catch (error) {
        console.error("Error cargando carrera:", error)
        notFound()
    }
}
