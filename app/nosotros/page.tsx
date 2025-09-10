import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Award, Target, Clock, TrendingUp, Shield } from "lucide-react"

export default function NosotrosPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <Image src="/about-hero.jpg" alt="Sobre Matriz Inmobiliaria" fill className="object-cover brightness-[0.65]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Sobre Nosotros</h1>
          <p className="text-lg max-w-2xl">
            Conoce nuestra historia, misión y el equipo detrás de Matriz Inmobiliaria.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#0c4a7b] mb-6">Nuestra Historia</h2>
              <p className="text-gray-600 mb-4">
                Matriz Inmobiliaria nació en 2008 con la visión de transformar la experiencia de comprar, vender y
                alquilar propiedades en el mercado inmobiliario. Fundada por un grupo de profesionales con amplia
                experiencia en el sector, nuestra empresa ha crecido hasta convertirse en un referente en el mercado.
              </p>
              <p className="text-gray-600 mb-4">
                A lo largo de estos años, hemos ayudado a cientos de familias a encontrar el hogar de sus sueños y a
                inversionistas a maximizar el rendimiento de sus activos inmobiliarios. Nuestro compromiso con la
                excelencia y la satisfacción del cliente nos ha permitido crecer de manera sostenida.
              </p>
              <p className="text-gray-600">
                Hoy, con un equipo de más de 50 profesionales y una cartera diversificada de propiedades, seguimos
                comprometidos con nuestra misión original: ofrecer un servicio inmobiliario integral, transparente y de
                calidad.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image src="/about-image.jpg" alt="Historia de Matriz Inmobiliaria" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0c4a7b] mb-4">Misión, Visión y Valores</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Los pilares que guían nuestro trabajo diario y nos ayudan a ofrecer un servicio excepcional.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-[#0c4a7b]/10 flex items-center justify-center mb-4 mx-auto">
                  <Target className="h-6 w-6 text-[#0c4a7b]" />
                </div>
                <h3 className="text-xl font-bold text-center mb-4">Misión</h3>
                <p className="text-gray-600">
                  Brindar soluciones inmobiliarias integrales que satisfagan las necesidades de nuestros clientes,
                  ofreciendo un servicio personalizado, transparente y de calidad que genere confianza y tranquilidad en
                  cada transacción.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-[#0c4a7b]/10 flex items-center justify-center mb-4 mx-auto">
                  <TrendingUp className="h-6 w-6 text-[#0c4a7b]" />
                </div>
                <h3 className="text-xl font-bold text-center mb-4">Visión</h3>
                <p className="text-gray-600">
                  Ser la inmobiliaria líder y referente en el mercado, reconocida por su excelencia en el servicio,
                  innovación constante y compromiso con la satisfacción de nuestros clientes, colaboradores y la
                  comunidad.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-[#0c4a7b]/10 flex items-center justify-center mb-4 mx-auto">
                  <Shield className="h-6 w-6 text-[#0c4a7b]" />
                </div>
                <h3 className="text-xl font-bold text-center mb-4">Valores</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Integridad y transparencia en cada operación</li>
                  <li>• Excelencia en el servicio al cliente</li>
                  <li>• Compromiso con los resultados</li>
                  <li>• Trabajo en equipo y colaboración</li>
                  <li>• Innovación y mejora continua</li>
                  <li>• Responsabilidad social y ambiental</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0c4a7b] mb-4">Nuestro Equipo</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Contamos con un equipo de profesionales altamente calificados y comprometidos con brindar el mejor
              servicio.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden mb-4">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-[#0c4a7b] font-medium mb-2">{member.position}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0c4a7b] mb-4">¿Por qué elegirnos?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubre las razones por las que somos la mejor opción para tus necesidades inmobiliarias.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {reasons.map((reason, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#0c4a7b]/10 flex items-center justify-center mb-4">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0c4a7b] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para trabajar con nosotros?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Nuestro equipo está listo para ayudarte a encontrar la propiedad perfecta o a vender tu inmueble al mejor
            precio.
          </p>
          <Button asChild size="lg" className="bg-white text-[#0c4a7b] hover:bg-gray-100">
            <Link href="/contactanos">Contáctanos hoy</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}

// Data
const team = [
  {
    name: "Carlos Martínez",
    position: "Director General",
    description:
      "Con más de 20 años de experiencia en el sector inmobiliario, lidera nuestra empresa con visión y compromiso.",
    image: "/team-1.jpg",
  },
  {
    name: "Ana Rodríguez",
    position: "Directora Comercial",
    description:
      "Especialista en marketing inmobiliario y estrategias de venta que maximizan el valor de cada propiedad.",
    image: "/team-2.jpg",
  },
  {
    name: "Luis Gómez",
    position: "Asesor Inmobiliario Senior",
    description:
      "Experto en el mercado local con un historial comprobado de transacciones exitosas y clientes satisfechos.",
    image: "/team-3.jpg",
  },
  {
    name: "María Sánchez",
    position: "Asesora Legal",
    description: "Abogada especializada en derecho inmobiliario que garantiza la seguridad jurídica en cada operación.",
    image: "/team-4.jpg",
  },
]

const reasons = [
  {
    title: "Experiencia Comprobada",
    description:
      "Más de 15 años en el mercado inmobiliario nos respaldan, con cientos de transacciones exitosas y clientes satisfechos.",
    icon: <Clock className="h-8 w-8 text-[#0c4a7b]" />,
  },
  {
    title: "Equipo Profesional",
    description:
      "Contamos con un equipo de expertos en diferentes áreas del sector inmobiliario, listos para asesorarte en todo momento.",
    icon: <Users className="h-8 w-8 text-[#0c4a7b]" />,
  },
  {
    title: "Servicio Personalizado",
    description:
      "Entendemos que cada cliente es único, por eso ofrecemos soluciones adaptadas a tus necesidades específicas.",
    icon: <Award className="h-8 w-8 text-[#0c4a7b]" />,
  },
]
