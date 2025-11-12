import type { Carrera } from "@/types"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={carrera.imagen || "/placeholder.svg"}
          alt={carrera.titulo}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-xl text-balance leading-tight">{carrera.titulo}</h3>
          <Badge className={modalidadColors[carrera.modalidad]}>{carrera.modalidad}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{carrera.facultad}</p>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground text-pretty">{carrera.descripcion}</p>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{carrera.duracion}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
