import { CarreraCard } from "@/components/carrera-card"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CarruselCarreras } from "@/components/carrusel-carreras"


export default async function HomePage() {
  const API = "http://localhost:3000"
  const response = await fetch(`${API}/api/carreras`, { cache: "no-store" });
  const { data: carreras } = await response.json();

  // Agrupar carreras por facultad
  const carrerasPorFacultad = carreras.reduce((acc: any, carrera: any) => {
    const facultad = carrera.facultad || "General";
    if (!acc[facultad]) acc[facultad] = [];
    acc[facultad].push(carrera);
    return acc;
  }, {});

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header más corto */}
      <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-lg backdrop-blur-md">
        <div className="container mx-auto px-4 py-2"> {/* Cambiado de py-4 a py-2 */}
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src="/img/logouniboost.png"
                alt="Logo Uniboost"
                className="w-12 h-12 rounded-xl object-contain shadow-lg transition-transform group-hover:scale-105"
              />
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="https://www.uniautonoma.edu.co"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-all duration-300 hover:scale-105 text-sm"
              >
                Sitio Oficial
              </Link>
              <Link href="/registro">
                <Button variant="secondary" size="sm" className="shadow-lg hover:shadow-xl transition-all text-sm"> {/* Agregado text-sm */}
                  Únete a la Comunidad
                </Button>
              </Link>
              
                <Link href="/login">
                  <Button variant="secondary" size="sm" className="shadow-lg hover:shadow-xl transition-all text-sm"> {/* Agregado text-sm */}
                    Iniciar Sesion
                  </Button>
                </Link>
              

            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground py-20 overflow-hidden"> {/* Reducido py-24 a py-20 */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-br from-white to-secondary bg-clip-text text-transparent">
            Descubre Tu Futuro Profesional
          </h1>
          <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-4xl mx-auto leading-relaxed">
            Explora las carreras de la Corporación Universitaria Autónoma del Cauca y da el primer paso hacia tu éxito
          </p>

          {/* ✅ Carrusel agregado aquí */}
          <div className="mb-12">
            <CarruselCarreras carreras={carreras.slice(0, 6)} />
          </div>

          <Link href="/registro">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-10 py-7 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 bg-gradient-to-r from-secondary to-accent"
            >
              Únete a Nuestra Comunidad
            </Button>
          </Link>
        </div>
      </section>

      {/* Carreras por Facultad */}
      <main className="flex-1 container mx-auto px-4 py-16"> {/* Reducido py-20 a py-16 */}
        <div className="text-center mb-12"> {/* Reducido mb-16 a mb-12 */}
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Nuestras Carreras
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Programas académicos organizados por facultad para que encuentres tu camino ideal
          </p>
        </div>

        <div className="space-y-12"> {/* Reducido space-y-16 a space-y-12 */}
          {Object.entries(carrerasPorFacultad).map(([facultad, carrerasFacultad]: [string, any]) => (
            <section key={facultad} className="space-y-6"> {/* Reducido space-y-8 a space-y-6 */}
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent mb-3">
                  {facultad}
                </h3>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6"> {/* Reducido gap-8 a gap-6 */}
                {carrerasFacultad.map((carrera: any) => (
                  <div
                    key={carrera._id}
                    className="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                  >
                    <CarreraCard carrera={carrera} />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}