"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  FileText,
  Upload,
  Calendar,
  Building2,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"

interface ReporteInmueble {
  id: number
  inmueble: string
  descripcion: string
  responsable: "Dueño" | "Inmobiliaria"
  estado: "Pendiente" | "En Proceso" | "Resuelto" | "Rechazado"
  fechaReporte: string
  fotoDano?: string
  prioridad: "Baja" | "Media" | "Alta" | "Crítica"
  costoEstimado?: number
  notas: string
}

export default function ReportesInmueblesPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedReporte, setSelectedReporte] = useState<ReporteInmueble | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  // Datos de ejemplo
  const [reportes, setReportes] = useState<ReporteInmueble[]>([
    {
      id: 1,
      inmueble: "Apartamento Centro Histórico - Apto 301",
      descripcion: "Filtración de agua en el baño principal, daño en el techo",
      responsable: "Inmobiliaria",
      estado: "En Proceso",
      fechaReporte: "2024-01-15",
      fotoDano: "/placeholder.svg?height=200&width=300",
      prioridad: "Alta",
      costoEstimado: 850000,
      notas: "Requiere intervención urgente, contactar plomero especializado",
    },
    {
      id: 2,
      inmueble: "Casa Zona Norte - Casa 15",
      descripcion: "Puerta principal dañada, cerradura no funciona correctamente",
      responsable: "Dueño",
      estado: "Pendiente",
      fechaReporte: "2024-01-20",
      prioridad: "Media",
      costoEstimado: 320000,
      notas: "El inquilino reporta dificultad para abrir/cerrar",
    },
    {
      id: 3,
      inmueble: "Penthouse Premium - Torre A",
      descripcion: "Sistema de aire acondicionado central presenta fallas",
      responsable: "Inmobiliaria",
      estado: "Resuelto",
      fechaReporte: "2024-02-01",
      prioridad: "Crítica",
      costoEstimado: 2500000,
      notas: "Reparación completada, garantía de 6 meses",
    },
  ])

  const filteredReportes = reportes.filter(
    (reporte) =>
      reporte.inmueble.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reporte.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reporte.responsable.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getEstadoBadge = (estado: string) => {
    const variants = {
      Pendiente: "bg-yellow-100 text-yellow-800 border-yellow-200",
      "En Proceso": "bg-blue-100 text-blue-800 border-blue-200",
      Resuelto: "bg-green-100 text-green-800 border-green-200",
      Rechazado: "bg-red-100 text-red-800 border-red-200",
    }
    return variants[estado as keyof typeof variants] || variants.Pendiente
  }

  const getPrioridadBadge = (prioridad: string) => {
    const variants = {
      Baja: "bg-gray-100 text-gray-800 border-gray-200",
      Media: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Alta: "bg-orange-100 text-orange-800 border-orange-200",
      Crítica: "bg-red-100 text-red-800 border-red-200",
    }
    return variants[prioridad as keyof typeof variants] || variants.Media
  }

  const getEstadoEmoji = (estado: string) => {
    const emojis = {
      Pendiente: "⏳",
      "En Proceso": "🔧",
      Resuelto: "✅",
      Rechazado: "❌",
    }
    return emojis[estado as keyof typeof emojis] || "⏳"
  }

  const getPrioridadEmoji = (prioridad: string) => {
    const emojis = {
      Baja: "🟢",
      Media: "🟡",
      Alta: "🟠",
      Crítica: "🔴",
    }
    return emojis[prioridad as keyof typeof emojis] || "🟡"
  }

  const handleCreateReporte = () => {
    toast({
      title: "✅ Reporte creado",
      description: "El nuevo reporte de inmueble ha sido registrado exitosamente.",
    })
    setIsCreateModalOpen(false)
  }

  const handleEditReporte = () => {
    toast({
      title: "✅ Reporte actualizado",
      description: "El reporte ha sido actualizado correctamente.",
    })
    setIsEditModalOpen(false)
  }

  const handleDeleteReporte = (id: number) => {
    setReportes((prev) => prev.filter((r) => r.id !== id))
    toast({
      title: "🗑️ Reporte eliminado",
      description: "El reporte ha sido eliminado del sistema.",
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  // Estadísticas
  const stats = {
    total: reportes.length,
    pendientes: reportes.filter((r) => r.estado === "Pendiente").length,
    enProceso: reportes.filter((r) => r.estado === "En Proceso").length,
    resueltos: reportes.filter((r) => r.estado === "Resuelto").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">📋 Reportes Inmobiliarios</h1>
          <p className="text-gray-600 mt-1">Gestiona reportes de daños y mantenimiento de inmuebles</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Reporte
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>📋 Crear Nuevo Reporte</DialogTitle>
              <DialogDescription>Registra un nuevo reporte de daño o mantenimiento</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="inmueble">Inmueble</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar inmueble" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apto-301">🏢 Apartamento Centro Histórico - Apto 301</SelectItem>
                    <SelectItem value="casa-15">🏠 Casa Zona Norte - Casa 15</SelectItem>
                    <SelectItem value="penthouse">🏙️ Penthouse Premium - Torre A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="descripcion">Descripción del Problema</Label>
                <Textarea id="descripcion" placeholder="Describe detalladamente el problema o daño..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="responsable">Responsable</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar responsable" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dueño">👤 Dueño</SelectItem>
                      <SelectItem value="Inmobiliaria">🏢 Inmobiliaria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="prioridad">Prioridad</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar prioridad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Baja">🟢 Baja</SelectItem>
                      <SelectItem value="Media">🟡 Media</SelectItem>
                      <SelectItem value="Alta">🟠 Alta</SelectItem>
                      <SelectItem value="Crítica">🔴 Crítica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="costoEstimado">Costo Estimado (opcional)</Label>
                <Input id="costoEstimado" type="number" placeholder="500000" />
              </div>
              <div>
                <Label htmlFor="fotoDano">Foto del Daño</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Arrastra una imagen aquí o{" "}
                    <span className="text-blue-600 cursor-pointer">selecciona un archivo</span>
                  </p>
                  <Input type="file" className="hidden" accept="image/*" />
                </div>
              </div>
              <div>
                <Label htmlFor="notas">Notas Adicionales</Label>
                <Textarea id="notas" placeholder="Información adicional sobre el reporte..." />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateReporte}>Crear Reporte</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Total Reportes</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{stats.total}</div>
            <p className="text-xs text-blue-600 mt-1">📋 Reportes registrados</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800">Pendientes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">{stats.pendientes}</div>
            <p className="text-xs text-yellow-600 mt-1">⏳ Por atender</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">En Proceso</CardTitle>
            <Building2 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{stats.enProceso}</div>
            <p className="text-xs text-blue-600 mt-1">🔧 En reparación</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Resueltos</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{stats.resueltos}</div>
            <p className="text-xs text-green-600 mt-1">✅ Completados</p>
          </CardContent>
        </Card>
      </div>

      {/* Búsqueda */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">🔍 Buscar Reportes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar por inmueble, descripción o responsable..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabla de Reportes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">📋 Lista de Reportes</CardTitle>
          <CardDescription>{filteredReportes.length} reportes encontrados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Inmueble</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Responsable</TableHead>
                  <TableHead>Prioridad</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReportes.map((reporte) => (
                  <TableRow key={reporte.id}>
                    <TableCell>
                      <div className="font-medium text-sm">{reporte.inmueble}</div>
                      {reporte.costoEstimado && (
                        <div className="text-sm text-green-600">Costo: {formatCurrency(reporte.costoEstimado)}</div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="text-sm truncate">{reporte.descripcion}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {reporte.responsable === "Dueño" ? "👤" : "🏢"} {reporte.responsable}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPrioridadBadge(reporte.prioridad)}>
                        {getPrioridadEmoji(reporte.prioridad)} {reporte.prioridad}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getEstadoBadge(reporte.estado)}>
                        {getEstadoEmoji(reporte.estado)} {reporte.estado}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                        {new Date(reporte.fechaReporte).toLocaleDateString("es-CO")}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedReporte(reporte)
                            setIsViewModalOpen(true)
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedReporte(reporte)
                            setIsEditModalOpen(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteReporte(reporte.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal Ver Reporte */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>📋 Detalles del Reporte</DialogTitle>
          </DialogHeader>
          {selectedReporte && (
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Inmueble</Label>
                <p className="text-lg font-medium">{selectedReporte.inmueble}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Descripción</Label>
                <p className="text-sm text-gray-700">{selectedReporte.descripcion}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Responsable</Label>
                  <Badge variant="outline">
                    {selectedReporte.responsable === "Dueño" ? "👤" : "🏢"} {selectedReporte.responsable}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Prioridad</Label>
                  <Badge className={getPrioridadBadge(selectedReporte.prioridad)}>
                    {getPrioridadEmoji(selectedReporte.prioridad)} {selectedReporte.prioridad}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Estado</Label>
                  <Badge className={getEstadoBadge(selectedReporte.estado)}>
                    {getEstadoEmoji(selectedReporte.estado)} {selectedReporte.estado}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Fecha del Reporte</Label>
                  <p>{new Date(selectedReporte.fechaReporte).toLocaleDateString("es-CO")}</p>
                </div>
              </div>
              {selectedReporte.costoEstimado && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Costo Estimado</Label>
                  <p className="text-lg font-medium text-green-600">{formatCurrency(selectedReporte.costoEstimado)}</p>
                </div>
              )}
              {selectedReporte.fotoDano && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Foto del Daño</Label>
                  <img
                    src={selectedReporte.fotoDano || "/placeholder.svg"}
                    alt="Foto del daño"
                    className="w-full max-w-md h-48 object-cover rounded-lg border"
                  />
                </div>
              )}
              <div>
                <Label className="text-sm font-medium text-gray-500">Notas</Label>
                <p className="text-sm text-gray-600">{selectedReporte.notas}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal Editar Reporte */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>✏️ Editar Reporte</DialogTitle>
          </DialogHeader>
          {selectedReporte && (
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="edit-descripcion">Descripción</Label>
                <Textarea id="edit-descripcion" defaultValue={selectedReporte.descripcion} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-responsable">Responsable</Label>
                  <Select defaultValue={selectedReporte.responsable}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dueño">👤 Dueño</SelectItem>
                      <SelectItem value="Inmobiliaria">🏢 Inmobiliaria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-prioridad">Prioridad</Label>
                  <Select defaultValue={selectedReporte.prioridad}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Baja">🟢 Baja</SelectItem>
                      <SelectItem value="Media">🟡 Media</SelectItem>
                      <SelectItem value="Alta">🟠 Alta</SelectItem>
                      <SelectItem value="Crítica">🔴 Crítica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-estado">Estado</Label>
                  <Select defaultValue={selectedReporte.estado}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pendiente">⏳ Pendiente</SelectItem>
                      <SelectItem value="En Proceso">🔧 En Proceso</SelectItem>
                      <SelectItem value="Resuelto">✅ Resuelto</SelectItem>
                      <SelectItem value="Rechazado">❌ Rechazado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-costoEstimado">Costo Estimado</Label>
                  <Input id="edit-costoEstimado" type="number" defaultValue={selectedReporte.costoEstimado || ""} />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-notas">Notas</Label>
                <Textarea id="edit-notas" defaultValue={selectedReporte.notas} />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleEditReporte}>Guardar Cambios</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
