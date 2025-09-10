import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { Badge } from "../../../shared/components/ui/badge"
import { Button } from "../../../shared/components/ui/button"
import { Building2, Users, UserCheck, TrendingUp, DollarSign, Shield, FileText } from "lucide-react"
import { Link } from "react-router-dom"

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Propiedades",
      value: "156",
      description: "+12 este mes",
      icon: <Building2 className="h-8 w-8 text-blue-500" />,
      href: "/admin/inmuebles",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Empleados Activos",
      value: "24",
      description: "8 agentes, 16 staff",
      icon: <UserCheck className="h-8 w-8 text-emerald-500" />,
      href: "/admin/empleados",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      title: "Clientes Registrados",
      value: "1,234",
      description: "+89 este mes",
      icon: <Users className="h-8 w-8 text-purple-500" />,
      href: "/admin/clientes",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Ventas del Mes",
      value: "$2.4M",
      description: "+15% vs mes anterior",
      icon: <DollarSign className="h-8 w-8 text-amber-500" />,
      href: "/admin/reportes",
      gradient: "from-amber-500 to-orange-500"
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "property",
      title: "Nueva propiedad agregada",
      description: "Casa en Zona Norte - $250,000",
      time: "Hace 2 horas",
      user: "María González",
    },
    {
      id: 2,
      type: "user",
      title: "Nuevo cliente registrado",
      description: "Juan Pérez se registró en la plataforma",
      time: "Hace 4 horas",
      user: "Sistema",
    },
    {
      id: 3,
      type: "appointment",
      title: "Cita programada",
      description: "Visita a Apartamento Moderno",
      time: "Hace 6 horas",
      user: "Carlos Ruiz",
    },
  ]

  const topAgents = [
    {
      name: "María González",
      sales: 12,
      revenue: "$1.2M",
      avatar: "/avatar-agent-1.jpg",
    },
    {
      name: "Carlos Ruiz",
      sales: 8,
      revenue: "$850K",
      avatar: "/avatar-agent-2.jpg",
    },
    {
      name: "Ana López",
      sales: 6,
      revenue: "$650K",
      avatar: "/avatar-agent-3.jpg",
    },
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold gradient-text">Panel de Administración</h1>
          <p className="text-gray-600 mt-2">Gestiona tu inmobiliaria desde aquí</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild className="hover-lift">
            <Link to="/admin/reportes" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Ver Reportes
            </Link>
          </Button>
          <Button asChild className="gradient-primary hover:opacity-90 shadow-lg hover:shadow-xl hover-lift">
            <Link to="/admin/inmuebles" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Nueva Propiedad
            </Link>
          </Button>
        </div>
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

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activities */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              Actividad Reciente
            </CardTitle>
            <CardDescription>Últimas acciones en el sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 hover-lift"
              >
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#00457B] to-[#0066CC] mt-2 shadow-sm"></div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">{activity.time}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{activity.user}</span>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full bg-transparent hover-lift">
              Ver toda la actividad
            </Button>
          </CardContent>
        </Card>

        {/* Top Agents */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500">
                <UserCheck className="h-5 w-5 text-white" />
              </div>
              Mejores Agentes
            </CardTitle>
            <CardDescription>Rendimiento del mes actual</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topAgents.map((agent, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 hover-lift">
                <div className="relative">
                  <img
                    src={agent.avatar || "/placeholder.svg"}
                    alt={agent.name}
                    className="w-12 h-12 rounded-full object-cover shadow-md"
                  />
                  <Badge className={`absolute -top-1 -right-1 h-6 w-6 p-0 flex items-center justify-center text-xs font-bold ${
                    index === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                    index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500' :
                    'bg-gradient-to-r from-amber-600 to-amber-700'
                  }`}>
                    {index + 1}
                  </Badge>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900">{agent.name}</h4>
                  <p className="text-sm text-gray-600">{agent.sales} ventas</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-600 text-lg">{agent.revenue}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full bg-transparent hover-lift" asChild>
              <Link to="/admin/empleados">Ver todos los empleados</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="gradient-text">Acciones Rápidas</CardTitle>
          <CardDescription>Herramientas de administración</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Button variant="outline" className="h-24 flex-col gap-3 bg-transparent hover-lift group" asChild>
              <Link to="/admin/roles">
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 group-hover:scale-110 transition-transform duration-200">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="font-medium">Gestionar Roles</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-3 bg-transparent hover-lift group" asChild>
              <Link to="/admin/empleados">
                <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:scale-110 transition-transform duration-200">
                  <UserCheck className="h-6 w-6 text-white" />
                </div>
                <span className="font-medium">Nuevo Empleado</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-3 bg-transparent hover-lift group" asChild>
              <Link to="/admin/inmuebles">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:scale-110 transition-transform duration-200">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <span className="font-medium">Nueva Propiedad</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-3 bg-transparent hover-lift group" asChild>
              <Link to="/admin/reportes">
                <div className="p-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 group-hover:scale-110 transition-transform duration-200">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <span className="font-medium">Generar Reporte</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}