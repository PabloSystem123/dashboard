"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Building2,
  Calendar,
  Car,
  CheckCircle,
  ChevronRight,
  Clock,
  Download,
  ExternalLink,
  Heart,
  Home,
  Info,
  Landmark,
  Layers,
  MapPin,
  Maximize2,
  MessageSquare,
  Phone,
  Share2,
  ShowerHead,
  Star,
  ThumbsUp,
  Trees,
  Tv,
  Wifi,
} from "lucide-react"

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const pathname = usePathname()

  // Simulamos obtener los datos de la propiedad basados en el ID
  const propertyId = Number.parseInt(params.id)
  const property = properties.find((p) => p.id === propertyId) || properties[0]

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-[#00457B]">
              Inicio
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link href="/inmuebles" className="hover:text-[#00457B]">
              Inmuebles
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-gray-900 font-medium">{property.title}</span>
          </div>
        </div>
      </div>

      {/* Galería de imágenes */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Imagen principal y carrusel */}
            <div className="space-y-4">
              <div className="relative h-[400px] rounded-xl overflow-hidden">
                <Image
                  src={property.mainImage || "/placeholder.svg"}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-white/80 hover:bg-white"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"}`} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-white/80 hover:bg-white">
                    <Share2 className="h-5 w-5 text-gray-700" />
                  </Button>
                </div>
                <Badge className="absolute top-4 left-4 bg-[#00457B]">{property.status}</Badge>
              </div>

              <Carousel className="w-full">
                <CarouselContent>
                  {property.images.map((image, index) => (
                    <CarouselItem key={index} className="basis-1/4 md:basis-1/5">
                      <div className="relative h-24 rounded-lg overflow-hidden cursor-pointer">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${property.title} - Imagen ${index + 1}`}
                          fill
                          className="object-cover hover:opacity-80 transition-opacity"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            </div>

            {/* Información básica */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
                    <div className="flex items-center mt-2 text-gray-500">
                      <MapPin className="h-5 w-5 mr-1 text-[#00457B]" />
                      <span>{property.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-[#00457B]">{property.price}</div>
                    {property.pricePerM2 && <div className="text-sm text-gray-500">{property.pricePerM2} / m²</div>}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-xl">
                <div className="flex flex-col items-center text-center p-3">
                  <Home className="h-6 w-6 text-[#00457B] mb-2" />
                  <span className="text-sm text-gray-500">Área</span>
                  <span className="font-bold">{property.area}</span>
                </div>
                <div className="flex flex-col items-center text-center p-3">
                  <Building2 className="h-6 w-6 text-[#00457B] mb-2" />
                  <span className="text-sm text-gray-500">Habitaciones</span>
                  <span className="font-bold">{property.bedrooms}</span>
                </div>
                <div className="flex flex-col items-center text-center p-3">
                  <ShowerHead className="h-6 w-6 text-[#00457B] mb-2" />
                  <span className="text-sm text-gray-500">Baños</span>
                  <span className="font-bold">{property.bathrooms}</span>
                </div>
                <div className="flex flex-col items-center text-center p-3">
                  <Car className="h-6 w-6 text-[#00457B] mb-2" />
                  <span className="text-sm text-gray-500">Estacionamientos</span>
                  <span className="font-bold">{property.parking}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-[#00457B]/10 flex items-center justify-center mr-3">
                    <Info className="h-5 w-5 text-[#00457B]" />
                  </div>
                  <div>
                    <h3 className="font-medium">Código de la propiedad</h3>
                    <p className="text-gray-500">{property.code}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-[#00457B]/10 flex items-center justify-center mr-3">
                    <Landmark className="h-5 w-5 text-[#00457B]" />
                  </div>
                  <div>
                    <h3 className="font-medium">Tipo de propiedad</h3>
                    <p className="text-gray-500">{property.type}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-[#00457B]/10 flex items-center justify-center mr-3">
                    <Clock className="h-5 w-5 text-[#00457B]" />
                  </div>
                  <div>
                    <h3 className="font-medium">Antigüedad</h3>
                    <p className="text-gray-500">{property.age}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button className="flex-1 h-12 bg-[#00457B] hover:bg-[#003b69]">
                  <Phone className="h-5 w-5 mr-2" /> Contactar agente
                </Button>
                <Button variant="outline" className="flex-1 h-12 border-[#00457B] text-[#00457B] hover:bg-[#00457B]/10">
                  <Calendar className="h-5 w-5 mr-2" /> Agendar visita
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs de información */}
            <Tabs defaultValue="descripcion" className="w-full">
              <TabsList className="grid w-full grid-cols-4 h-12 rounded-xl bg-white">
                <TabsTrigger value="descripcion" className="rounded-lg">
                  Descripción
                </TabsTrigger>
                <TabsTrigger value="caracteristicas" className="rounded-lg">
                  Características
                </TabsTrigger>
                <TabsTrigger value="ubicacion" className="rounded-lg">
                  Ubicación
                </TabsTrigger>
                <TabsTrigger value="video" className="rounded-lg">
                  Video
                </TabsTrigger>
              </TabsList>

              {/* Descripción */}
              <TabsContent value="descripcion" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Descripción de la propiedad</h2>
                    <div className="space-y-4 text-gray-700">
                      <p>{property.description}</p>
                      <p>
                        Esta espectacular propiedad se encuentra en una de las zonas más exclusivas y seguras de la
                        ciudad, con fácil acceso a centros comerciales, colegios, restaurantes y parques.
                      </p>
                      <p>
                        La casa cuenta con acabados de lujo, amplios espacios y excelente iluminación natural. La cocina
                        está completamente equipada con electrodomésticos de alta gama y la sala principal tiene vista
                        panorámica a la ciudad.
                      </p>
                      <p>
                        El área social incluye una terraza perfecta para entretenimiento, mientras que las habitaciones
                        ofrecen amplios closets y baños privados. La suite principal cuenta con un vestidor y un baño
                        con jacuzzi.
                      </p>
                      <p>
                        No pierda la oportunidad de adquirir esta propiedad única. ¡Contáctenos hoy mismo para agendar
                        una visita!
                      </p>
                    </div>

                    <div className="mt-8">
                      <h3 className="font-bold mb-3">Destacados de la propiedad</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {property.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Características */}
              <TabsContent value="caracteristicas" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Características y amenidades</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-bold text-[#00457B] mb-3">Interiores</h3>
                        <div className="space-y-3">
                          {property.features.interior.map((feature, index) => (
                            <div key={index} className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-bold text-[#00457B] mb-3">Exteriores</h3>
                        <div className="space-y-3">
                          {property.features.exterior.map((feature, index) => (
                            <div key={index} className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="font-bold text-[#00457B] mb-3">Amenidades del edificio/conjunto</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {property.amenities.map((amenity, index) => (
                          <div key={index} className="flex flex-col items-center bg-gray-50 p-4 rounded-lg text-center">
                            {getAmenityIcon(amenity.icon)}
                            <span className="mt-2 text-sm">{amenity.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="font-bold text-[#00457B] mb-3">Información adicional</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <div className="w-40 text-gray-500">Estrato:</div>
                          <div className="font-medium">{property.additionalInfo.estrato}</div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-40 text-gray-500">Administración:</div>
                          <div className="font-medium">{property.additionalInfo.administracion}</div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-40 text-gray-500">Impuesto predial:</div>
                          <div className="font-medium">{property.additionalInfo.impuestoPredial}</div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-40 text-gray-500">Área construida:</div>
                          <div className="font-medium">{property.additionalInfo.areaConstruida}</div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-40 text-gray-500">Área del lote:</div>
                          <div className="font-medium">{property.additionalInfo.areaLote}</div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-40 text-gray-500">Pisos:</div>
                          <div className="font-medium">{property.additionalInfo.pisos}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Ubicación */}
              <TabsContent value="ubicacion" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Ubicación</h2>

                    <div className="relative h-[400px] rounded-xl overflow-hidden mb-6">
                      <Image src="/property-map.png" alt="Mapa de ubicación" fill className="object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button className="bg-[#00457B] hover:bg-[#003b69]">
                          <ExternalLink className="h-5 w-5 mr-2" /> Ver en Google Maps
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-bold">Puntos de interés cercanos</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {property.pointsOfInterest.map((poi, index) => (
                          <div key={index} className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-[#00457B]/10 flex items-center justify-center mr-3 flex-shrink-0">
                              {getPoiIcon(poi.type)}
                            </div>
                            <div>
                              <p className="font-medium">{poi.name}</p>
                              <p className="text-sm text-gray-500">{poi.distance}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Video */}
              <TabsContent value="video" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Video y tour virtual</h2>

                    <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
                      <Image
                        src="/property-video-thumbnail.png"
                        alt="Video de la propiedad"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-16 w-16 rounded-full bg-[#00457B] flex items-center justify-center cursor-pointer hover:bg-[#003b69] transition-colors">
                          <div className="h-0 w-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <Button className="bg-[#00457B] hover:bg-[#003b69]">
                        <Maximize2 className="h-5 w-5 mr-2" /> Ver tour virtual 360°
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Documentos */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Documentos</h2>
                <div className="space-y-3">
                  {property.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-[#00457B]/10 flex items-center justify-center mr-3">
                          <Layers className="h-5 w-5 text-[#00457B]" />
                        </div>
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-500">{doc.size}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-[#00457B]">
                        <Download className="h-4 w-4 mr-1" /> Descargar
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Preguntas frecuentes */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Preguntas frecuentes</h2>
                <Accordion type="single" collapsible className="w-full">
                  {property.faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                      <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-gray-700">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Propiedades similares */}
            <div>
              <h2 className="text-xl font-bold mb-4">Propiedades similares</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {similarProperties.map((property, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative h-48">
                      <Image
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        fill
                        className="object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-[#00457B]">{property.status}</Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-1">{property.title}</h3>
                      <div className="flex items-center text-gray-500 text-sm mb-2">
                        <MapPin className="h-4 w-4 mr-1" /> {property.location}
                      </div>
                      <div className="flex justify-between text-sm mb-4">
                        <div className="flex items-center">
                          <Home className="h-4 w-4 mr-1 text-[#00457B]" /> {property.area}
                        </div>
                        <div className="flex items-center">
                          <Building2 className="h-4 w-4 mr-1 text-[#00457B]" /> {property.bedrooms} Hab.
                        </div>
                        <div className="flex items-center">
                          <ShowerHead className="h-4 w-4 mr-1 text-[#00457B]" /> {property.bathrooms} Baños
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="font-bold text-lg text-[#00457B]">{property.price}</p>
                        <Button variant="outline" size="sm" className="text-xs">
                          Ver detalles
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Columna lateral */}
          <div className="space-y-6">
            {/* Agente inmobiliario */}
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center mb-4">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="/avatar-agent-1.jpg" alt="Ana Rodríguez" />
                    <AvatarFallback>AR</AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg">Ana Rodríguez</h3>
                  <p className="text-[#00457B]">Agente Inmobiliario Senior</p>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 text-sm text-gray-500">(28 reseñas)</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-center">
                    <Phone className="h-5 w-5 text-[#00457B] mr-2" />
                    <span>+123 456 7890</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-[#00457B] mr-2" />
                    <span>ana.rodriguez@matriz.com</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-[#00457B] hover:bg-[#003b69]">
                    <Phone className="h-5 w-5 mr-2" /> Llamar ahora
                  </Button>
                  <Button variant="outline" className="w-full border-[#00457B] text-[#00457B] hover:bg-[#00457B]/10">
                    <MessageSquare className="h-5 w-5 mr-2" /> Enviar mensaje
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Formulario de contacto */}
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">¿Interesado en esta propiedad?</h3>
                <p className="text-gray-600 mb-4">
                  Complete el formulario y nos pondremos en contacto con usted lo antes posible.
                </p>

                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00457B] focus:border-transparent"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00457B] focus:border-transparent"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full h-10 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00457B] focus:border-transparent"
                      placeholder="Tu número de teléfono"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00457B] focus:border-transparent"
                      placeholder="Me interesa esta propiedad y quisiera obtener más información..."
                    ></textarea>
                  </div>

                  <Button type="submit" className="w-full bg-[#00457B] hover:bg-[#003b69]">
                    Enviar solicitud
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Compartir y guardar */}
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Compartir esta propiedad</h3>
                <div className="flex justify-between">
                  <Button variant="outline" className="flex-1 mr-2">
                    <svg className="h-5 w-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" />
                    </svg>
                    Facebook
                  </Button>
                  <Button variant="outline" className="flex-1 mr-2">
                    <svg className="h-5 w-5 mr-2" fill="#1DA1F2" viewBox="0 0 24 24">
                      <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 14-7.503 14-14v-.617c.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
                    </svg>
                    Twitter
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <svg className="h-5 w-5 mr-2" fill="#25D366" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </Button>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Button variant="outline" className="w-full" onClick={() => setIsFavorite(!isFavorite)}>
                    <Heart className={`h-5 w-5 mr-2 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                    {isFavorite ? "Guardado en favoritos" : "Guardar en favoritos"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Estadísticas */}
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Estadísticas</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <Eye className="h-4 w-4 text-blue-600" />
                      </div>
                      <span>Vistas</span>
                    </div>
                    <span className="font-bold">1,245</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                        <Heart className="h-4 w-4 text-red-600" />
                      </div>
                      <span>Guardados</span>
                    </div>
                    <span className="font-bold">87</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <Share2 className="h-4 w-4 text-green-600" />
                      </div>
                      <span>Compartidos</span>
                    </div>
                    <span className="font-bold">32</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                        <Calendar className="h-4 w-4 text-purple-600" />
                      </div>
                      <span>Visitas agendadas</span>
                    </div>
                    <span className="font-bold">8</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}

// Función para obtener el icono de amenidad
function getAmenityIcon(iconName: string) {
  switch (iconName) {
    case "pool":
      return <Tv className="h-6 w-6 text-[#00457B]" />
    case "gym":
      return <ThumbsUp className="h-6 w-6 text-[#00457B]" />
    case "garden":
      return <Trees className="h-6 w-6 text-[#00457B]" />
    case "wifi":
      return <Wifi className="h-6 w-6 text-[#00457B]" />
    default:
      return <CheckCircle className="h-6 w-6 text-[#00457B]" />
  }
}

// Función para obtener el icono de punto de interés
function getPoiIcon(poiType: string) {
  switch (poiType) {
    case "school":
      return <Building2 className="h-4 w-4 text-[#00457B]" />
    case "mall":
      return <ShoppingBag className="h-4 w-4 text-[#00457B]" />
    case "park":
      return <Trees className="h-4 w-4 text-[#00457B]" />
    case "hospital":
      return <Stethoscope className="h-4 w-4 text-[#00457B]" />
    case "restaurant":
      return <Utensils className="h-4 w-4 text-[#00457B]" />
    case "transport":
      return <Bus className="h-4 w-4 text-[#00457B]" />
    default:
      return <MapPin className="h-4 w-4 text-[#00457B]" />
  }
}

// Datos de ejemplo
const properties = [
  {
    id: 1,
    title: "Casa Moderna en El Poblado",
    price: "$850,000",
    pricePerM2: "$3,035",
    location: "El Poblado, Medellín",
    area: "280 m²",
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    status: "Venta",
    type: "Casa",
    code: "PROP-1234",
    age: "5 años",
    mainImage: "/property-1.jpg",
    images: [
      "/property-1.jpg",
      "/property-detail-1.png",
      "/property-detail-2.png",
      "/property-detail-3.png",
      "/property-detail-4.png",
      "/property-detail-5.png",
    ],
    description:
      "Espectacular casa moderna ubicada en el exclusivo sector de El Poblado, con acabados de lujo y amplios espacios. Perfecta para familias que buscan comodidad y elegancia en una de las mejores zonas de la ciudad.",
    highlights: [
      "Diseño arquitectónico moderno",
      "Amplios espacios con excelente iluminación natural",
      "Zona social integrada con vista panorámica",
      "Cocina tipo isla completamente equipada",
      "Habitación principal con vestier y baño privado",
      "Terraza con jacuzzi y zona BBQ",
    ],
    features: {
      interior: [
        "Cocina integral con electrodomésticos de alta gama",
        "Pisos en porcelanato importado",
        "Ventanales de piso a techo",
        "Sistema de domótica",
        "Calentador de agua a gas",
        "Vestier en habitación principal",
        "Estudio/biblioteca",
        "Sala de entretenimiento",
      ],
      exterior: [
        "Terraza con vista panorámica",
        "Jardín privado",
        "Zona BBQ",
        "Jacuzzi exterior",
        "Parqueadero para 2 vehículos",
        "Depósito",
      ],
    },
    amenities: [
      { name: "Piscina", icon: "pool" },
      { name: "Gimnasio", icon: "gym" },
      { name: "Jardines", icon: "garden" },
      { name: "Wi-Fi", icon: "wifi" },
      { name: "Seguridad 24/7", icon: "security" },
      { name: "Salón social", icon: "social" },
      { name: "Parque infantil", icon: "playground" },
      { name: "Zona de mascotas", icon: "pets" },
    ],
    additionalInfo: {
      estrato: "6",
      administracion: "$850,000/mes",
      impuestoPredial: "$3,200,000/año",
      areaConstruida: "280 m²",
      areaLote: "350 m²",
      pisos: "2",
    },
    pointsOfInterest: [
      { name: "Colegio Internacional", type: "school", distance: "0.5 km" },
      { name: "Centro Comercial El Tesoro", type: "mall", distance: "1.2 km" },
      { name: "Parque Lleras", type: "park", distance: "1.5 km" },
      { name: "Clínica Las Américas", type: "hospital", distance: "2.3 km" },
      { name: "Restaurante La Provincia", type: "restaurant", distance: "0.8 km" },
      { name: "Estación Metro Poblado", type: "transport", distance: "1.7 km" },
    ],
    documents: [
      { name: "Planos de la propiedad", size: "2.5 MB" },
      { name: "Certificado de libertad", size: "1.2 MB" },
      { name: "Reglamento de propiedad horizontal", size: "3.8 MB" },
      { name: "Paz y salvo administración", size: "0.5 MB" },
    ],
    faqs: [
      {
        question: "¿La propiedad cuenta con línea de gas natural?",
        answer:
          "Sí, la propiedad cuenta con conexión a gas natural para la cocina, calentador de agua y otros electrodomésticos.",
      },
      {
        question: "¿Cuál es el valor aproximado de los servicios públicos?",
        answer:
          "El valor aproximado de los servicios públicos (agua, luz, gas, internet) es de $500,000 mensuales, dependiendo del consumo.",
      },
      {
        question: "¿Se permiten mascotas en la propiedad?",
        answer:
          "Sí, se permiten mascotas en la propiedad. El conjunto residencial cuenta con zonas especiales para mascotas.",
      },
      {
        question: "¿La propiedad tiene alguna hipoteca o gravamen?",
        answer: "No, la propiedad está libre de hipotecas y gravámenes, lo que facilita el proceso de compra.",
      },
      {
        question: "¿Cuál es el proceso para agendar una visita?",
        answer:
          "Puede agendar una visita a través de nuestro sitio web, llamando a nuestro agente o completando el formulario de contacto. Organizamos visitas todos los días de la semana, incluyendo fines de semana.",
      },
    ],
  },
]

const similarProperties = [
  {
    title: "Apartamento de Lujo",
    price: "$450,000",
    location: "Laureles, Medellín",
    area: "150 m²",
    bedrooms: 3,
    bathrooms: 2,
    image: "/property-2.jpg",
    status: "Venta",
  },
  {
    title: "Penthouse con Vista Panorámica",
    price: "$1,200,000",
    location: "Envigado, Antioquia",
    area: "320 m²",
    bedrooms: 4,
    bathrooms: 4,
    image: "/property-3.jpg",
    status: "Venta",
  },
]

// Componentes adicionales necesarios
function ShoppingBag(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

function Stethoscope(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
      <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
      <circle cx="20" cy="10" r="2" />
    </svg>
  )
}

function Utensils(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  )
}

function Bus(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 6v6" />
      <path d="M16 6v6" />
      <path d="M2 12h20" />
      <path d="M18 18h2a2 2 0 0 0 2-2v-6a8 8 0 0 0-16 0v6a2 2 0 0 0 2 2h2" />
      <path d="M9 18h6" />
      <path d="M5 18v2" />
      <path d="M19 18v2" />
    </svg>
  )
}

function Eye(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
