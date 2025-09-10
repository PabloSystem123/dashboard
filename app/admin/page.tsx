"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, Users, UserCheck, TrendingUp, DollarSign, Shield, FileText } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Propiedades",
      value: "156",
      description: "+12 este mes",
      icon: <Building2 className="h-8 w-8 text-blue-500" />,
      href: "/admin/inmuebles",
    },
    {
      title: "Empleados Activos",
      value: "24",
      description: "8 agentes, 16 staff",
      icon: <UserCheck className="h-8 w-8 text-green-500" />,
      href: "/admin/empleados",
    },
    {
      title: "Clientes Registrados",
      value: "1,234",
      description: "+89 este mes",
      icon: <Users className="h-8 w-8 text-purple-500" />,
      href: "/admin/clientes",
    },
    {
      title: "Ventas del Mes",
      value: "$2.4M",
      description: "+15% vs mes anterior",
      icon: <DollarSign className="h-8 w-8 text-emerald-500" />,
      href: "/admin/reportes",
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
          <p className="text-gray-600">Gestiona tu inmobiliaria desde aquí</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/reportes">
              <FileText className="mr-2 h-4 w-4" />
              Ver Reportes
            </Link>
          </Button>
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link href="/admin/inmuebles/nuevo">
              <Building2 className="mr-2 h-4 w-4" />
              Nueva Propiedad
            </Link>
          </Button>
        </div>
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
        {/* Recent Activities */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              Actividad Reciente
            </CardTitle>
            <CardDescription>Últimas acciones en el sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
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
            <Button variant="outline" className="w-full bg-transparent">
              Ver toda la actividad
            </Button>
          </CardContent>
        </Card>

        {/* Top Agents */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-green-600" />
              Mejores Agentes
            </CardTitle>
            <CardDescription>Rendimiento del mes actual</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topAgents.map((agent, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="relative">
                  <img
                    src={agent.avatar || "/placeholder.svg"}
                    alt={agent.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {index + 1}
                  </Badge>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900">{agent.name}</h4>
                  <p className="text-sm text-gray-600">{agent.sales} ventas</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">{agent.revenue}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/admin/empleados">Ver todos los empleados</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>Herramientas de administración</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
              <Link href="/admin/roles">
                <Shield className="h-6 w-6" />
                Gestionar Roles
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
              <Link href="/admin/empleados/nuevo">
                <UserCheck className="h-6 w-6" />
                Nuevo Empleado
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
              <Link href="/admin/inmuebles/nuevo">
                <Building2 className="h-6 w-6" />
                Nueva Propiedad
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
              <Link href="/admin/reportes">
                <FileText className="h-6 w-6" />
                Generar Reporte
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
