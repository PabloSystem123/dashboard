import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../shared/components/ui/card"
import { Badge } from "../../../shared/components/ui/badge"
import { Button } from "../../../shared/components/ui/button"
import { Building2, Calendar, Users, UserCheck, TrendingUp, FileText } from "lucide-react"
import { Link } from "react-router-dom"

export default function SubAdminDashboard() {
  const stats = [
    {
      title: "Propiedades Asignadas",
      value: "45",
      description: "+5 esta semana",
      icon: <Building2 className="h-8 w-8 text-emerald-500" />,
      href: "/subadmin/inmuebles",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      title: "Empleados a Cargo",
      value: "12",
      description: "8 agentes activos",
      icon: <UserCheck className="h-8 w-8 text-blue-500" />,
      href: "/subadmin/empleados",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Clientes Asignados",
      value: "234",
      description: "+15 esta semana",
      icon: <Users className="h-8 w-8 text-purple-500" />,
      href: "/subadmin/clientes",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Citas Programadas",
      value: "18",
      description: "Esta semana",
      icon: <Calendar className="h-8 w-8 text-amber-500" />,
      href: "/subadmin/citas",
      gradient: "from-amber-500 to-orange-500"
    },
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold gradient-text">Panel de Sub-Administración</h1>
          <p className="text-gray-600 mt-2">Gestiona tu equipo y operaciones</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild className="hover-lift">
            <Link to="/subadmin/reportes">
              <FileText className="mr-2 h-4 w-4" />
              Reportes
            </Link>
          </Button>
          <Button asChild className="gradient-primary hover:opacity-90 shadow-lg hover:shadow-xl hover-lift">
            <Link to="/subadmin/empleados">
              <UserCheck className="mr-2 h-4 w-4" />
              Gestionar Equipo
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

      {/* Quick Actions */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="gradient-text">Acciones Rápidas</CardTitle>
          <CardDescription>Herramientas de gestión</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Button variant="outline" className="h-24 flex-col gap-3 bg-transparent hover-lift group" asChild>
              <Link to="/subadmin/empleados">
                <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:scale-110 transition-transform duration-200">
                  <UserCheck className="h-6 w-6 text-white" />
                </div>
                <span className="font-medium">Gestionar Empleados</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-3 bg-transparent hover-lift group" asChild>
              <Link to="/subadmin/inmuebles">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:scale-110 transition-transform duration-200">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <span className="font-medium">Ver Propiedades</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-3 bg-transparent hover-lift group" asChild>
              <Link to="/subadmin/citas">
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 group-hover:scale-110 transition-transform duration-200">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <span className="font-medium">Programar Citas</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-3 bg-transparent hover-lift group" asChild>
              <Link to="/subadmin/reportes">
                <div className="p-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 group-hover:scale-110 transition-transform duration-200">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <span className="font-medium">Generar Reportes</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}