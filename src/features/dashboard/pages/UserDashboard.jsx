import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { Badge } from "../../../shared/components/ui/badge"
import { Button } from "../../../shared/components/ui/button"
import { Building2, Calendar, Heart, MessageSquare, Users, Eye, MapPin } from "lucide-react"
import { Link } from "react-router-dom"

export default function UserDashboard() {
  const stats = [
    {
      title: "Propiedades Favoritas",
      value: "12",
      description: "Inmuebles guardados",
      icon: <Heart className="h-8 w-8 text-red-500" />,
      href: "/dashboard/favoritos",
      gradient: "from-red-500 to-pink-500"
    },
    {
      title: "Citas Programadas",
      value: "3",
      description: "Próximas visitas",
      icon: <Calendar className="h-8 w-8 text-blue-500" />,
      href: "/dashboard/citas",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Mensajes",
      value: "5",
      description: "Sin leer",
      icon: <MessageSquare className="h-8 w-8 text-emerald-500" />,
      href: "/dashboard/mensajes",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      title: "Búsquedas Guardadas",
      value: "8",
      description: "Filtros activos",
      icon: <Building2 className="h-8 w-8 text-purple-500" />,
      href: "/dashboard/busquedas",
      gradient: "from-purple-500 to-pink-500"
    },
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold gradient-text">¡Bienvenido de vuelta!</h1>
          <p className="text-gray-600 mt-2">Aquí tienes un resumen de tu actividad reciente</p>
        </div>
        <Button asChild className="gradient-primary hover:opacity-90 shadow-lg hover:shadow-xl hover-lift">
          <Link to="/inmuebles">
            <Building2 className="mr-2 h-4 w-4" />
            Explorar Propiedades
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Link key={index} to={stat.href}>
            <Card className="hover-lift cursor-pointer border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${stat.gradient}`}></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="gradient-text">Acciones Rápidas</CardTitle>
          <CardDescription>Herramientas útiles para tu búsqueda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-24 flex-col gap-3 bg-transparent hover-lift group" asChild>
              <Link to="/inmuebles">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:scale-110 transition-transform duration-200">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <span className="font-medium">Buscar Propiedades</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-3 bg-transparent hover-lift group" asChild>
              <Link to="/dashboard/citas/nueva">
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 group-hover:scale-110 transition-transform duration-200">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <span className="font-medium">Agendar Cita</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-3 bg-transparent hover-lift group" asChild>
              <Link to="/contactanos">
                <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:scale-110 transition-transform duration-200">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <span className="font-medium">Contactar Agente</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}