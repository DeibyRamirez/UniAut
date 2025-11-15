import type { Carrera } from "@/types"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"


interface CarreraCardProps {
  carrera: Carrera
}

export function CarreraCard({ carrera }: CarreraCardProps) {
  const modalidadColors = {
    Presencial: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    Virtual: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    Híbrida: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-l-0">

      {/* Simulación de argollas en el lateral izquierdo */}
      <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-yellow-900 dark:to-yellow-800 border-r border-yellow-300 dark:border-yellow-600 flex flex-col items-center py-4 z-10">
        {/* Argollas - círculos simulando los agujeros */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full bg-white dark:bg-gray-700 border border-yellow-300 dark:border-yellow-600 shadow-sm mb-6"
          />
        ))}
      </div>

      {/* Línea vertical decorativa */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-yellow-300 via-yellow-200 to-yellow-300 dark:from-yellow-600 dark:via-yellow-700 dark:to-yellow-600 z-0" />

      {/* Contenido principal en dos columnas */}
      <div className="ml-8 relative z-20 flex flex-1">

        {/* Columna 1: SOLO Imagen (más ancha) */}
        <div className="w-2/5 flex flex-col border-r border-gray-200 dark:border-gray-700"> {/* Cambiado a w-2/5 para más espacio */}
          {/* Imagen */}
          <div className="relative w-full"> {/* Altura mejorada */}
            <Image
              src={carrera.imagenR || "/img/ingenieriaElectronica.png"}
              alt={carrera.titulo}
              width={600} // Ajusta según necesites
              height={400} // Ajusta según necesites
              className="w-full h-auto object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Columna 2: Todo el contenido (más estrecha) */}
        <div className="w-3/5 flex flex-col"> {/* Cambiado a w-3/5 */}

          {/* Título */}
          <CardHeader className="pb-3">
            <h3 className="font-bold text-2xl text-balance leading-tight font-serif mb-2">
              {carrera.titulo}
            </h3>
          </CardHeader>

          {/* Duración y Modalidad en la misma línea */}
          <div className="px-6 pb-4 flex items-center justify-between">
            {/* Duración */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-base font-medium">{carrera.duracion}</span>
            </div>

            {/* Modalidad */}
            <Badge className={`text-lg py-2 px-4 ${modalidadColors[carrera.modalidad]}`}>
              {carrera.modalidad}
            </Badge>
          </div>

          {/* Línea horizontal decorativa */}
          <div className="w-full h-px bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-200 dark:from-yellow-700 dark:via-yellow-600 dark:to-yellow-700 mx-3 mb-4" />

          {/* Descripción */}
          <CardContent className="flex-1 px-6 pb-6">
            <p className="text-base text-muted-foreground text-pretty leading-relaxed">
              {carrera.descripcion}
            </p>
          </CardContent>
          <div className="px-6 pb-6">
            <Link href={`/carreras/${carrera._id}`}>
              <Button className="bg-gradient-to-r from-yellow-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-pulse hover:animate-none w-full">
                Explorar
              </Button>
            </Link>
          </div>

        </div>
      </div>

      {/* Efecto de sombra en el borde izquierdo para profundidad */}
      <div className="absolute left-6 top-0 bottom-0 w-2 bg-gradient-to-r from-gray-200/50 to-transparent dark:from-gray-700/50 pointer-events-none" />
    </Card>
  )
}