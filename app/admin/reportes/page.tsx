"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { BarChart3, TrendingUp, DollarSign, Home, Users, Download, Filter } from "lucide-react"

interface ReportData {
  ventasMensuales: {
    mes: string
    ventas: number
    ingresos: number
  }[]
  arrendamientosMensuales: {
    mes: string
    arriendos: number
    ingresos: number
  }[]
  propiedadesPorTipo: {
    tipo: string
    cantidad: number
    porcentaje: number
  }[]
  clientesPorTipo: {
    tipo: string
    cantidad: number
    porcentaje: number
  }[]
  resumenGeneral: {
    totalVentas: number
    totalArriendos: number
    ingresosVentas: number
    ingresosArriendos: number
    propiedadesActivas: number
    clientesActivos: number
    agentesActivos: number
  }
}

const mockData: ReportData = {
  ventasMensuales: [
    { mes: "Enero", ventas: 12, ingresos: 2400000000 },
    { mes: "Febrero", ventas: 8, ingresos: 1600000000 },
    { mes: "Marzo", ventas: 15, ingresos: 3000000000 },
    { mes: "Abril", ventas: 10, ingresos: 2000000000 },
    { mes: "Mayo", ventas: 18, ingresos: 3600000000 },
    { mes: "Junio", ventas: 14, ingresos: 2800000000 },
  ],
  arrendamientosMensuales: [
    { mes: "Enero", arriendos: 25, ingresos: 37500000 },
    { mes: "Febrero", arriendos: 22, ingresos: 33000000 },
    { mes: "Marzo", arriendos: 28, ingresos: 42000000 },
    { mes: "Abril", arriendos: 30, ingresos: 45000000 },
    { mes: "Mayo", arriendos: 35, ingresos: 52500000 },
    { mes: "Junio", arriendos: 32, ingresos: 48000000 },
  ],
  propiedadesPorTipo: [
    { tipo: "Apartamentos", cantidad: 45, porcentaje: 35 },
    { tipo: "Casas", cantidad: 38, porcentaje: 30 },
    { tipo: "Apartaestudios", cantidad: 25, porcentaje: 20 },
    { tipo: "Locales Comerciales", cantidad: 12, porcentaje: 9 },
    { tipo: "Terrenos", cantidad: 8, porcentaje: 6 },
  ],
  clientesPorTipo: [
    { tipo: "Compradores", cantidad: 85, porcentaje: 42 },
    { tipo: "Arrendatarios", cantidad: 68, porcentaje: 34 },
    { tipo: "Vendedores", cantidad: 32, porcentaje: 16 },
    { tipo: "Arrendadores", cantidad: 15, porcentaje: 8 },
  ],
  resumenGeneral: {
    totalVentas: 77,
    totalArriendos: 172,
    ingresosVentas: 16400000000,
    ingresosArriendos: 258000000,
    propiedadesActivas: 128,
    clientesActivos: 200,
    agentesActivos: 12,
  },
}

export default function ReportesPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("6meses")
  const [selectedReport, setSelectedReport] = useState("general")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const exportReport = (type: string) => {
    // Simulación de exportación
    const fileName = `reporte_${type}_${new Date().toISOString().split("T")[0]}.pdf`
    console.log(`Exportando reporte: ${fileName}`)
    // Aquí iría la lógica real de exportación
  }

  const { resumenGeneral } = mockData

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-purple-600" />
            Reportes y Análisis
          </h1>
          <p className="text-gray-600">Análisis detallado del rendimiento del negocio</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Período</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1mes">Último mes</SelectItem>
                  <SelectItem value="3meses">Últimos 3 meses</SelectItem>
                  <SelectItem value="6meses">Últimos 6 meses</SelectItem>
                  <SelectItem value="1año">Último año</SelectItem>
                  <SelectItem value="personalizado">Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tipo de Reporte</Label>
              <Select value={selectedReport} onValueChange={setSelectedReport}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">Reporte General</SelectItem>
                  <SelectItem value="ventas">Ventas</SelectItem>
                  <SelectItem value="arriendos">Arriendos</SelectItem>
                  <SelectItem value="propiedades">Propiedades</SelectItem>
                  <SelectItem value="clientes">Clientes</SelectItem>
                  <SelectItem value="agentes">Agentes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Formato de Exportación</Label>
              <Select defaultValue="pdf">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Ventas Totales</p>
                <p className="text-2xl font-bold text-green-900">{resumenGeneral.totalVentas}</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +12% vs mes anterior
                </p>
              </div>
              <div className="h-12 w-12 bg-green-200 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Arriendos Activos</p>
                <p className="text-2xl font-bold text-blue-900">{resumenGeneral.totalArriendos}</p>
                <p className="text-xs text-blue-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +8% vs mes anterior
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-200 rounded-full flex items-center justify-center">
                <Home className="h-6 w-6 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Propiedades Activas</p>
                <p className="text-2xl font-bold text-purple-900">{resumenGeneral.propiedadesActivas}</p>
                <p className="text-xs text-purple-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +5% vs mes anterior
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-200 rounded-full flex items-center justify-center">
                <Home className="h-6 w-6 text-purple-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Clientes Activos</p>
                <p className="text-2xl font-bold text-orange-900">{resumenGeneral.clientesActivos}</p>
                <p className="text-xs text-orange-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +15% vs mes anterior
                </p>
              </div>
              <div className="h-12 w-12 bg-orange-200 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-orange-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Ingresos por Ventas
            </CardTitle>
            <CardDescription>Ingresos mensuales por ventas de propiedades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.ventasMensuales.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{item.mes}</p>
                    <p className="text-sm text-gray-600">{item.ventas} ventas</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{formatCurrency(item.ingresos)}</p>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total Ingresos:</span>
                  <span className="text-xl font-bold text-green-600">
                    {formatCurrency(resumenGeneral.ingresosVentas)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5 text-blue-600" />
              Ingresos por Arriendos
            </CardTitle>
            <CardDescription>Ingresos mensuales por arriendos de propiedades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.arrendamientosMensuales.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{item.mes}</p>
                    <p className="text-sm text-gray-600">{item.arriendos} arriendos</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">{formatCurrency(item.ingresos)}</p>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total Ingresos:</span>
                  <span className="text-xl font-bold text-blue-600">
                    {formatCurrency(resumenGeneral.ingresosArriendos)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5 text-purple-600" />
              Propiedades por Tipo
            </CardTitle>
            <CardDescription>Distribución del portafolio de propiedades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.propiedadesPorTipo.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{item.tipo}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{item.cantidad}</span>
                      <Badge variant="outline">{item.porcentaje}%</Badge>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item.porcentaje}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-orange-600" />
              Clientes por Tipo
            </CardTitle>
            <CardDescription>Distribución de la base de clientes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.clientesPorTipo.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{item.tipo}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{item.cantidad}</span>
                      <Badge variant="outline">{item.porcentaje}%</Badge>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item.porcentaje}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>Genera y exporta reportes específicos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-20 flex flex-col gap-2 bg-transparent"
              onClick={() => exportReport("ventas")}
            >
              <Download className="h-5 w-5" />
              <span>Reporte de Ventas</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col gap-2 bg-transparent"
              onClick={() => exportReport("arriendos")}
            >
              <Download className="h-5 w-5" />
              <span>Reporte de Arriendos</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col gap-2 bg-transparent"
              onClick={() => exportReport("clientes")}
            >
              <Download className="h-5 w-5" />
              <span>Reporte de Clientes</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
