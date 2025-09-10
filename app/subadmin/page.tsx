"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, Calendar, Users, UserCheck, TrendingUp, FileText } from "lucide-react"
import Link from "next/link"

export default function SubAdminDashboard() {
  const stats = [
    {
      title: "Propiedades Asignadas",
      value: "45",
      description: "+5 esta semana",
      icon: <Building2 className="h-8 w-8 text-emerald-500" />,
      href: "/subadmin/inmuebles",
    },
    {
      title: "Empleados a Cargo",
      value: "12",
      description: "8 agentes activos",
      icon: <UserCheck className="h-8 w-8 text-teal-500" />,
      href: "/subadmin/empleados",
    },
    {
      title: "Clientes Asignados",
      value: "234",
      description: "+15 esta semana",
      icon: <Users className="h-8 w-8 text-cyan-500" />,
      href: "/subadmin/clientes",
    },
    {
      title: "Citas Programadas",
      value: "18",
      description: "Esta semana",
      icon: <Calendar className="h-8 w-8 text-blue-500" />,
      href: "/subadmin/citas",
    },
  ]

  const pendingTasks = [
    {
      id: 1,
      title: "Revisar documentos de propiedad",
      description: "Casa en Zona Norte - Documentación pendiente",
      priority: "high",
      dueDate: "2024-01-15",
    },
    {
      id: 2,
      title: "Aprobar nuevo agente",
      description: "Revisión de perfil de candidato",
      priority: "medium",
      dueDate: "2024-01-16",
    },
    {
      id: 3,
      title: "Actualizar precios de mercado",
      description: "Análisis de competencia trimestral",
      priority: "low",
      dueDate: "2024-01-20",
    },
  ]

  const teamPerformance = [
    {
      name: "Equipo Ventas Norte",
      members: 4,
      sales: 8,
      target: 10,
      performance: 80,
    },
    {
      name: "Equipo Ventas Centro",
      members: 3,
      sales: 6,
      target: 8,
      performance: 75,
    },
    {
      name: "Equipo Alquileres",
      members: 5,
      sales: 12,
      target: 15,
      performance: 80,
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Panel de Sub-Administración</h1>
          <p className="text-gray-600">Gestiona tu equipo y operaciones</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/subadmin/reportes">
              <FileText className="mr-2 h-4 w-4" />
              Reportes
            </Link>
          </Button>
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
            <Link href="/subadmin/empleados">
              <UserCheck className="mr-2 h-4 w-4" />
              Gestionar Equipo
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
        {/* Pending Tasks */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-emerald-600" />
              Tareas Pendientes
            </CardTitle>
            <CardDescription>Elementos que requieren tu atención</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingTasks.map((task) => (
              <div key={task.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900">{task.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Vence: {new Date(task.dueDate).toLocaleDateString("es-ES")}
                    </p>
                  </div>
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority === "high" ? "Alta" : task.priority === "medium" ? "Media" : "Baja"}
                  </Badge>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" variant="outline">
                    Ver Detalles
                  </Button>
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                    Completar
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full bg-transparent">
              Ver todas las tareas
            </Button>
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-teal-600" />
              Rendimiento del Equipo
            </CardTitle>
            <CardDescription>Progreso hacia objetivos mensuales</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {teamPerformance.map((team, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{team.name}</h4>
                  <Badge variant="outline">{team.members} miembros</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {team.sales} / {team.target} ventas
                    </span>
                    <span className="font-medium text-emerald-600">{team.performance}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${team.performance}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/subadmin/empleados">Ver detalles del equipo</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>Herramientas de gestión</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
              <Link href="/subadmin/empleados">
                <UserCheck className="h-6 w-6" />
                Gestionar Empleados
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
              <Link href="/subadmin/inmuebles">
                <Building2 className="h-6 w-6" />
                Ver Propiedades
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
              <Link href="/subadmin/citas">
                <Calendar className="h-6 w-6" />
                Programar Citas
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent" asChild>
              <Link href="/subadmin/reportes">
                <FileText className="h-6 w-6" />
                Generar Reportes
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
