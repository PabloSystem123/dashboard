"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, Calendar, Heart, MessageSquare, Users, Eye, MapPin } from "lucide-react"
import Link from "next/link"

export default function UserDashboard() {
  const stats = [
    {
      title: "Propiedades Favoritas",
      value: "12",
      description: "Inmuebles guardados",
      icon: <Heart className="h-8 w-8 text-red-500" />,
      href: "/dashboard/favoritos",
    },
    {
      title: "Citas Programadas",
      value: "3",
      description: "Próximas visitas",
      icon: <Calendar className="h-8 w-8 text-blue-500" />,
      href: "/dashboard/citas",
    },
    {
      title: "Mensajes",
      value: "5",
      description: "Sin leer",
      icon: <MessageSquare className="h-8 w-8 text-green-500" />,
      href: "/dashboard/mensajes",
    },
    {
      title: "Búsquedas Guardadas",
      value: "8",
      description: "Filtros activos",
      icon: <Building2 className="h-8 w-8 text-purple-500" />,
      href: "/dashboard/busquedas",
    },
  ]

  const recentProperties = [
    {
      id: 1,
      title: "Casa en Zona Norte",
      price: "$250,000",
      location: "Zona Norte, Ciudad",
      image: "/property-1.jpg",
      type: "Casa",
      bedrooms: 3,
      bathrooms: 2,
    },
    {
      id: 2,
      title: "Apartamento Moderno",
      price: "$180,000",
      location: "Centro, Ciudad",
      image: "/property-2.jpg",
      type: "Apartamento",
      bedrooms: 2,
      bathrooms: 1,
    },
    {
      id: 3,
      title: "Villa con Piscina",
      price: "$450,000",
      location: "Zona Residencial",
      image: "/property-3.jpg",
      type: "Villa",
      bedrooms: 4,
      bathrooms: 3,
    },
  ]

  const upcomingAppointments = [
    {
      id: 1,
      property: "Casa en Zona Norte",
      date: "2024-01-15",
      time: "10:00 AM",
      agent: "María González",
    },
    {
      id: 2,
      property: "Apartamento Moderno",
      date: "2024-01-16",
      time: "2:00 PM",
      agent: "Carlos Ruiz",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">¡Bienvenido de vuelta!</h1>
          <p className="text-gray-600">Aquí tienes un resumen de tu actividad reciente</p>
        </div>
        <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
          <Link href="/inmuebles">
            <Building2 className="mr-2 h-4 w-4" />
            Explorar Propiedades
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Link key={index} href={stat.href}>
            <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Properties */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-indigo-600" />
              Propiedades Recientes
            </CardTitle>
            <CardDescription>Últimas propiedades que has visto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentProperties.map((property) => (
              <div
                key={property.id}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 truncate">{property.title}</h4>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {property.location}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {property.type}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {property.bedrooms} hab • {property.bathrooms} baños
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-indigo-600">{property.price}</p>
                  <Button size="sm" variant="ghost" asChild>
                    <Link href={`/inmuebles/${property.id}`}>
                      <Eye className="h-3 w-3 mr-1" />
                      Ver
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/dashboard/favoritos">Ver todas las propiedades</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Próximas Citas
            </CardTitle>
            <CardDescription>Tus citas programadas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="p-4 border rounded-lg bg-blue-50/50">
                <h4 className="font-semibold text-gray-900">{appointment.property}</h4>
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(appointment.date).toLocaleDateString("es-ES", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {appointment.agent} • {appointment.time}
                  </p>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline">
                    Reagendar
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                    Cancelar
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/dashboard/citas">Ver todas las citas</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>Herramientas útiles para tu búsqueda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
              <Link href="/inmuebles">
                <Building2 className="h-6 w-6" />
                Buscar Propiedades
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
              <Link href="/dashboard/citas/nueva">
                <Calendar className="h-6 w-6" />
                Agendar Cita
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
              <Link href="/contactanos">
                <MessageSquare className="h-6 w-6" />
                Contactar Agente
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
