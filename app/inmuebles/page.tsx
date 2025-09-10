import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Building2, Home, Key, MapPin, Search, Filter } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function InmueblesPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <Image src="/properties-hero.jpg" alt="Inmuebles" fill className="object-cover brightness-[0.65]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Nuestros Inmuebles</h1>
          <p className="text-lg max-w-2xl">
            Encuentra la propiedad perfecta para ti entre nuestra amplia selección de inmuebles.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <Tabs defaultValue="venta" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="venta">Venta</TabsTrigger>
                <TabsTrigger value="alquiler">Alquiler</TabsTrigger>
              </TabsList>
              <TabsContent value="venta" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Tipo de propiedad</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos los tipos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los tipos</SelectItem>
                        <SelectItem value="house">Casa</SelectItem>
                        <SelectItem value="apartment">Apartamento</SelectItem>
                        <SelectItem value="office">Oficina</SelectItem>
                        <SelectItem value="land">Terreno</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Ubicación</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Todas las ubicaciones" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas las ubicaciones</SelectItem>
                        <SelectItem value="poblado">El Poblado</SelectItem>
                        <SelectItem value="laureles">Laureles</SelectItem>
                        <SelectItem value="envigado">Envigado</SelectItem>
                        <SelectItem value="belen">Belén</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Precio máximo</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sin límite" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Sin límite</SelectItem>
                        <SelectItem value="200000">$200,000</SelectItem>
                        <SelectItem value="500000">$500,000</SelectItem>
                        <SelectItem value="1000000">$1,000,000</SelectItem>
                        <SelectItem value="2000000">$2,000,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button className="w-full bg-[#0c4a7b] hover:bg-[#0a3d68]">
                      <Search className="h-4 w-4 mr-2" /> Buscar
                    </Button>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" className="text-[#0c4a7b]">
                    <Filter className="h-4 w-4 mr-2" /> Filtros avanzados
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="alquiler" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Tipo de propiedad</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos los tipos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los tipos</SelectItem>
                        <SelectItem value="house">Casa</SelectItem>
                        <SelectItem value="apartment">Apartamento</SelectItem>
                        <SelectItem value="office">Oficina</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Ubicación</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Todas las ubicaciones" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas las ubicaciones</SelectItem>
                        <SelectItem value="poblado">El Poblado</SelectItem>
                        <SelectItem value="laureles">Laureles</SelectItem>
                        <SelectItem value="envigado">Envigado</SelectItem>
                        <SelectItem value="belen">Belén</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Precio máximo mensual</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sin límite" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Sin límite</SelectItem>
                        <SelectItem value="1000">$1,000</SelectItem>
                        <SelectItem value="2000">$2,000</SelectItem>
                        <SelectItem value="3000">$3,000</SelectItem>
                        <SelectItem value="5000">$5,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button className="w-full bg-[#0c4a7b] hover:bg-[#0a3d68]">
                      <Search className="h-4 w-4 mr-2" /> Buscar
                    </Button>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" className="text-[#0c4a7b]">
                    <Filter className="h-4 w-4 mr-2" /> Filtros avanzados
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#0c4a7b]">Propiedades Disponibles</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Ordenar por:</span>
              <Select defaultValue="recent">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Más recientes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Más recientes</SelectItem>
                  <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
                  <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
                  <SelectItem value="area-asc">Área: menor a mayor</SelectItem>
                  <SelectItem value="area-desc">Área: mayor a menor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProperties.map((property, index) => (
              <Card
                key={index}
                className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-[#0c4a7b]">{property.status}</Badge>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{property.title}</CardTitle>
                    <p className="text-xl font-bold text-[#0c4a7b]">{property.price}</p>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="h-4 w-4 mr-1" /> {property.location}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <Home className="h-4 w-4 mr-1" /> {property.area}
                    </div>
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 mr-1" /> {property.bedrooms} Hab.
                    </div>
                    <div className="flex items-center">
                      <Key className="h-4 w-4 mr-1" /> {property.bathrooms} Baños
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-[#0c4a7b] hover:bg-[#0a3d68]">
                    <Link href={`/inmuebles/${property.id}`}>Ver detalles</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <div className="flex gap-2">
              <Button variant="outline" size="icon" disabled>
                &lt;
              </Button>
              <Button variant="outline" size="icon" className="bg-[#0c4a7b] text-white">
                1
              </Button>
              <Button variant="outline" size="icon">
                2
              </Button>
              <Button variant="outline" size="icon">
                3
              </Button>
              <Button variant="outline" size="icon">
                &gt;
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0c4a7b] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">¿No encuentras lo que buscas?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Déjanos saber tus requisitos y nuestro equipo te ayudará a encontrar la propiedad perfecta para ti.
          </p>
          <Button asChild size="lg" className="bg-white text-[#0c4a7b] hover:bg-gray-100">
            <Link href="/contactanos">Contáctanos</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}

// Data
const allProperties = [
  {
    id: 1,
    title: "Casa Moderna en El Poblado",
    price: "$850,000",
    location: "El Poblado, Medellín",
    area: "280 m²",
    bedrooms: 4,
    bathrooms: 3,
    image: "/property-1.jpg",
    status: "Venta",
  },
  {
    id: 2,
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
    id: 3,
    title: "Penthouse con Vista Panorámica",
    price: "$1,200,000",
    location: "Envigado, Antioquia",
    area: "320 m²",
    bedrooms: 4,
    bathrooms: 4,
    image: "/property-3.jpg",
    status: "Venta",
  },
  {
    id: 4,
    title: "Casa Campestre",
    price: "$750,000",
    location: "Llanogrande, Rionegro",
    area: "450 m²",
    bedrooms: 5,
    bathrooms: 4,
    image: "/property-4.jpg",
    status: "Venta",
  },
  {
    id: 5,
    title: "Apartamento Amoblado",
    price: "$2,500/mes",
    location: "Belén, Medellín",
    area: "95 m²",
    bedrooms: 2,
    bathrooms: 2,
    image: "/property-5.jpg",
    status: "Alquiler",
  },
  {
    id: 6,
    title: "Local Comercial",
    price: "$350,000",
    location: "Centro, Medellín",
    area: "120 m²",
    bedrooms: 0,
    bathrooms: 1,
    image: "/property-6.jpg",
    status: "Venta",
  },
  {
    id: 7,
    title: "Oficina Ejecutiva",
    price: "$3,000/mes",
    location: "El Poblado, Medellín",
    area: "85 m²",
    bedrooms: 0,
    bathrooms: 2,
    image: "/property-7.jpg",
    status: "Alquiler",
  },
  {
    id: 8,
    title: "Casa Familiar",
    price: "$520,000",
    location: "Sabaneta, Antioquia",
    area: "220 m²",
    bedrooms: 4,
    bathrooms: 3,
    image: "/property-8.jpg",
    status: "Venta",
  },
  {
    id: 9,
    title: "Apartamento con Terraza",
    price: "$380,000",
    location: "Envigado, Antioquia",
    area: "130 m²",
    bedrooms: 3,
    bathrooms: 2,
    image: "/property-9.jpg",
    status: "Venta",
  },
]
