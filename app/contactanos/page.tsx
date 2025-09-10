import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

export default function ContactanosPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <Image src="/contact-hero.jpg" alt="Contáctanos" fill className="object-cover brightness-[0.65]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Contáctanos</h1>
          <p className="text-lg max-w-2xl">Estamos aquí para ayudarte con todas tus necesidades inmobiliarias.</p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-[#0c4a7b] mb-6">Información de Contacto</h2>
              <p className="text-gray-600 mb-8">
                Nuestro equipo está disponible para atenderte y responder todas tus preguntas. No dudes en contactarnos
                por cualquiera de los siguientes medios.
              </p>

              <div className="space-y-6">
                <Card className="border-none shadow-md">
                  <CardContent className="flex items-start p-6">
                    <div className="w-12 h-12 rounded-full bg-[#0c4a7b]/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <MapPin className="h-6 w-6 text-[#0c4a7b]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Dirección</h3>
                      <p className="text-gray-600">Calle Principal #123, Ciudad, País</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md">
                  <CardContent className="flex items-start p-6">
                    <div className="w-12 h-12 rounded-full bg-[#0c4a7b]/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <Phone className="h-6 w-6 text-[#0c4a7b]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Teléfono</h3>
                      <p className="text-gray-600">+123 456 7890</p>
                      <p className="text-gray-600">+123 456 7891</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md">
                  <CardContent className="flex items-start p-6">
                    <div className="w-12 h-12 rounded-full bg-[#0c4a7b]/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <Mail className="h-6 w-6 text-[#0c4a7b]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Correo Electrónico</h3>
                      <p className="text-gray-600">info@matrizinmobiliaria.com</p>
                      <p className="text-gray-600">ventas@matrizinmobiliaria.com</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-md">
                  <CardContent className="flex items-start p-6">
                    <div className="w-12 h-12 rounded-full bg-[#0c4a7b]/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <Clock className="h-6 w-6 text-[#0c4a7b]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Horario de Atención</h3>
                      <p className="text-gray-600">Lunes - Viernes: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Sábados: 9:00 AM - 1:00 PM</p>
                      <p className="text-gray-600">Domingos: Cerrado</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-[#0c4a7b] mb-6">Envíanos un Mensaje</h2>
              <p className="text-gray-600 mb-8">
                Completa el siguiente formulario y nos pondremos en contacto contigo lo antes posible.
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Nombre completo
                    </label>
                    <Input id="name" placeholder="Tu nombre" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Correo electrónico
                    </label>
                    <Input id="email" type="email" placeholder="tu@email.com" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Teléfono
                    </label>
                    <Input id="phone" placeholder="Tu número de teléfono" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Asunto
                    </label>
                    <Select>
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="Selecciona un asunto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compra">Compra de propiedad</SelectItem>
                        <SelectItem value="venta">Venta de propiedad</SelectItem>
                        <SelectItem value="alquiler">Alquiler</SelectItem>
                        <SelectItem value="tasacion">Tasación</SelectItem>
                        <SelectItem value="inversion">Inversión</SelectItem>
                        <SelectItem value="otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Mensaje
                  </label>
                  <Textarea id="message" placeholder="Escribe tu mensaje aquí..." rows={6} required />
                </div>

                <Button type="submit" className="w-full bg-[#0c4a7b] hover:bg-[#0a3d68]">
                  <Send className="h-4 w-4 mr-2" /> Enviar mensaje
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0c4a7b] mb-4">Nuestra Ubicación</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Visítanos en nuestra oficina central. Estamos ubicados en una zona de fácil acceso.
            </p>
          </div>

          <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
            {/* Aquí iría un mapa interactivo, pero por ahora usamos una imagen estática */}
            <Image
              src="/map.jpg"
              alt="Ubicación de Matriz Inmobiliaria"
              width={1200}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Offices Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0c4a7b] mb-4">Nuestras Oficinas</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Contamos con varias oficinas para atenderte de manera personalizada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48">
                  <Image src={office.image || "/placeholder.svg"} alt={office.name} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{office.name}</h3>
                  <div className="flex items-start mb-2">
                    <MapPin className="h-5 w-5 text-[#0c4a7b] mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600">{office.address}</p>
                  </div>
                  <div className="flex items-center mb-2">
                    <Phone className="h-5 w-5 text-[#0c4a7b] mr-2 flex-shrink-0" />
                    <p className="text-gray-600">{office.phone}</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-[#0c4a7b] mr-2 flex-shrink-0" />
                    <p className="text-gray-600">{office.email}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0c4a7b] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Prefieres que te llamemos?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Déjanos tu número y uno de nuestros asesores se pondrá en contacto contigo a la brevedad.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <Input
              placeholder="Tu número de teléfono"
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
            <Button type="submit" className="bg-white text-[#0c4a7b] hover:bg-gray-100 whitespace-nowrap">
              Solicitar llamada
            </Button>
          </form>
        </div>
      </section>
    </main>
  )
}

// Data
const offices = [
  {
    name: "Oficina Central",
    address: "Calle Principal #123, Ciudad, País",
    phone: "+123 456 7890",
    email: "central@matrizinmobiliaria.com",
    image: "/office-1.jpg",
  },
  {
    name: "Oficina Norte",
    address: "Avenida Norte #456, Ciudad, País",
    phone: "+123 456 7892",
    email: "norte@matrizinmobiliaria.com",
    image: "/office-2.jpg",
  },
  {
    name: "Oficina Sur",
    address: "Boulevard Sur #789, Ciudad, País",
    phone: "+123 456 7893",
    email: "sur@matrizinmobiliaria.com",
    image: "/office-3.jpg",
  },
]
