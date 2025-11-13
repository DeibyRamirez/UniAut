"use client";

import useEmblaCarousel from "embla-carousel-react";
// Evita errores de tipos de TypeScript
// @ts-ignore
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useEffect } from "react";

interface Carrera {
  _id: string;
  titulo: string;
  descripcion: string;
  imagen?: string;
  imagenR? : string;
}

interface CarruselCarrerasProps {
  carreras: Carrera[];
}

export function CarruselCarreras({ carreras }: CarruselCarrerasProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [
      Autoplay({
        delay: 3500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  useEffect(() => {
    if (emblaApi) {
      console.log("✅ Carrusel inicializado");
    }
  }, [emblaApi]);

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {carreras.map((carrera) => (
          <div
            key={carrera._id}
            className="flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_30%] mx-3 rounded-2xl shadow-xl bg-white/10 backdrop-blur-lg border border-white/20 overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="relative w-full h-100 md:h-[32rem]">
              <Image
              src={carrera.imagenR || "/img/default.jpg"}
              alt={carrera.titulo}
              fill
              className="object-cover"
              loading="lazy"
              />
            </div>
            <div className="p-5 text-left text-white">
              <h3 className="text-lg font-semibold mb-2">{carrera.titulo}</h3>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
