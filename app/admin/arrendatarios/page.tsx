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
import { Search, Plus, Eye, Edit, Trash2, UserCog, Phone, Mail, MapPin, Home, CreditCard } from "lucide-react"

interface Arrendatario {
  id: number
  nombre: string
  email: string
  telefono: string
  direccion: string
  fechaRegistro: string
  ingresosMensuales: number
  estado: "Activo" | "Inactivo" | "Moroso" | "Prospecto"
  propiedadActual?: string
  fechaInicioContrato?: string
  valorArriendo?: number
  notas: string
}

export default function ArrendatariosPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedArrendatario, setSelectedArrendatario] = useState<Arrendatario | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  // Datos de ejemplo
  const [arrendatarios, setArrendatarios] = useState<Arrendatario[]>([
    {
      id: 1,
      nombre: "Ana Sofía Herrera",
      email: "ana.herrera@email.com",
      telefono: "+57 300 111 2222",
      direccion: "Calle 85 #12-34, Bogotá",
      fechaRegistro: "2024-01-10",
      ingresosMensuales: 4500000,
      estado: "Activo",
      propiedadActual: "Apartamento Centro Histórico",
      fechaInicioContrato: "2024-01-15",
      valorArriendo: 1800000,
      notas: "Inquilina puntual, excelente historial crediticio",
    },
    {
      id: 2,
      nombre: "Roberto Jiménez",
      email: "roberto.jimenez@email.com",
      telefono: "+57 301 222 3333",
      direccion: "Carrera 50 #23-45, Medellín",
      fechaRegistro: "2024-02-01",
      ingresosMensuales: 3200000,
      estado: "Moroso",
      propiedadActual: "Casa Zona Norte",
      fechaInicioContrato: "2024-02-01",
      valorArriendo: 1200000,
      notas: "Atraso en pagos últimos 2 meses",
    },
    {
      id: 3,
      nombre: "Carmen López",
      email: "carmen.lopez@email.com",
      telefono: "+57 302 333 4444",
      direccion: "Avenida 6 #45-67, Cali",
      fechaRegistro: "2024-03-01",
      ingresosMensuales: 5800000,
      estado: "Prospecto",
      notas: "Interesada en apartamento de lujo, referencias verificadas",
    },
  ])

  const filteredArrendatarios = arrendatarios.filter(
    (arrendatario) =>
      arrendatario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      arrendatario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      arrendatario.telefono.includes(searchTerm),
  )

  const getEstadoBadge = (estado: string) => {
    const variants = {
      Activo: "bg-green-100 text-green-800 border-green-200",
      Inactivo: "bg-gray-100 text-gray-800 border-gray-200",
      Moroso: "bg-red-100 text-red-800 border-red-200",
      Prospecto: "bg-blue-100 text-blue-800 border-blue-200",
    }
    return variants[estado as keyof typeof variants] || variants.Activo
  }

  const getEstadoEmoji = (estado: string) => {
    const emojis = {
      Activo: "✅",
      Inactivo: "⏸️",
      Moroso: "⚠️",
      Prospecto: "🔍",
    }
    return emojis[estado as keyof typeof emojis] || "✅"
  }

  const handleCreateArrendatario = () => {
    toast({
      title: "✅ Arrendatario creado",
      description: "El nuevo arrendatario ha sido registrado exitosamente.",
    })
    setIsCreateModalOpen(false)
  }

  const handleEditArrendatario = () => {
    toast({
      title: "✅ Arrendatario actualizado",
      description: "Los datos del arrendatario han sido actualizados correctamente.",
    })
    setIsEditModalOpen(false)
  }

  const handleDeleteArrendatario = (id: number) => {
    setArrendatarios((prev) => prev.filter((a) => a.id !== id))
    toast({
      title: "🗑️ Arrendatario eliminado",
      description: "El arrendatario ha sido eliminado del sistema.",
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
    total: arrendatarios.length,
    activos: arrendatarios.filter((a) => a.estado === "Activo").length,
    morosos: arrendatarios.filter((a) => a.estado === "Moroso").length,
    prospectos: arrendatarios.filter((a) => a.estado === "Prospecto").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">🏠 Gestión de Arrendatarios</h1>
          <p className="text-gray-600 mt-1">Administra y gestiona la base de datos de arrendatarios</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Arrendatario
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>🏠 Registrar Nuevo Arrendatario</DialogTitle>
              <DialogDescription>Completa la información del nuevo arrendatario</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nombre">Nombre Completo</Label>
                  <Input id="nombre" placeholder="Ej: María García" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="maria@email.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input id="telefono" placeholder="+57 300 123 4567" />
                </div>
                <div>
                  <Label htmlFor="ingresos">Ingresos Mensuales</Label>
                  <Input id="ingresos" type="number" placeholder="3500000" />
                </div>
              </div>
              <div>
                <Label htmlFor="direccion">Dirección</Label>
                <Input id="direccion" placeholder="Calle 123 #45-67, Ciudad" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="estado">Estado</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Prospecto">🔍 Prospecto</SelectItem>
                      <SelectItem value="Activo">✅ Activo</SelectItem>
                      <SelectItem value="Inactivo">⏸️ Inactivo</SelectItem>
                      <SelectItem value="Moroso">⚠️ Moroso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="valorArriendo">Valor Arriendo (opcional)</Label>
                  <Input id="valorArriendo" type="number" placeholder="1500000" />
                </div>
              </div>
              <div>
                <Label htmlFor="notas">Notas</Label>
                <Textarea id="notas" placeholder="Información adicional sobre el arrendatario..." />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateArrendatario}>Registrar Arrendatario</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Total Arrendatarios</CardTitle>
            <UserCog className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{stats.total}</div>
            <p className="text-xs text-blue-600 mt-1">🏠 Registrados en el sistema</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Activos</CardTitle>
            <Home className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{stats.activos}</div>
            <p className="text-xs text-green-600 mt-1">✅ Con contrato vigente</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-800">Morosos</CardTitle>
            <CreditCard className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">{stats.morosos}</div>
            <p className="text-xs text-red-600 mt-1">⚠️ Con pagos pendientes</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800">Prospectos</CardTitle>
            <Eye className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">{stats.prospectos}</div>
            <p className="text-xs text-yellow-600 mt-1">🔍 En evaluación</p>
          </CardContent>
        </Card>
      </div>

      {/* Búsqueda */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">🔍 Buscar Arrendatarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar por nombre, email o teléfono..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabla de Arrendatarios */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">📋 Lista de Arrendatarios</CardTitle>
          <CardDescription>{filteredArrendatarios.length} arrendatarios encontrados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Arrendatario</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Propiedad Actual</TableHead>
                  <TableHead>Ingresos</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArrendatarios.map((arrendatario) => (
                  <TableRow key={arrendatario.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{arrendatario.nombre}</div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {arrendatario.direccion}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="h-3 w-3 mr-1 text-gray-400" />
                          {arrendatario.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="h-3 w-3 mr-1 text-gray-400" />
                          {arrendatario.telefono}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {arrendatario.propiedadActual ? (
                        <div>
                          <div className="font-medium text-sm">{arrendatario.propiedadActual}</div>
                          {arrendatario.valorArriendo && (
                            <div className="text-sm text-green-600">
                              {formatCurrency(arrendatario.valorArriendo)}/mes
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">Sin propiedad asignada</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-blue-600">{formatCurrency(arrendatario.ingresosMensuales)}</div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getEstadoBadge(arrendatario.estado)}>
                        {getEstadoEmoji(arrendatario.estado)} {arrendatario.estado}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedArrendatario(arrendatario)
                            setIsViewModalOpen(true)
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedArrendatario(arrendatario)
                            setIsEditModalOpen(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteArrendatario(arrendatario.id)}
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

      {/* Modal Ver Arrendatario */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>🏠 Detalles del Arrendatario</DialogTitle>
          </DialogHeader>
          {selectedArrendatario && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Nombre</Label>
                  <p className="text-lg font-medium">{selectedArrendatario.nombre}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Estado</Label>
                  <Badge className={getEstadoBadge(selectedArrendatario.estado)}>
                    {getEstadoEmoji(selectedArrendatario.estado)} {selectedArrendatario.estado}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Email</Label>
                  <p>{selectedArrendatario.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Teléfono</Label>
                  <p>{selectedArrendatario.telefono}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Dirección</Label>
                <p>{selectedArrendatario.direccion}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Ingresos Mensuales</Label>
                  <p className="text-lg font-medium text-blue-600">
                    {formatCurrency(selectedArrendatario.ingresosMensuales)}
                  </p>
                </div>
                {selectedArrendatario.valorArriendo && (
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Valor Arriendo</Label>
                    <p className="text-lg font-medium text-green-600">
                      {formatCurrency(selectedArrendatario.valorArriendo)}
                    </p>
                  </div>
                )}
              </div>
              {selectedArrendatario.propiedadActual && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Propiedad Actual</Label>
                  <p className="font-medium">{selectedArrendatario.propiedadActual}</p>
                  {selectedArrendatario.fechaInicioContrato && (
                    <p className="text-sm text-gray-600">
                      Contrato desde: {new Date(selectedArrendatario.fechaInicioContrato).toLocaleDateString("es-CO")}
                    </p>
                  )}
                </div>
              )}
              <div>
                <Label className="text-sm font-medium text-gray-500">Notas</Label>
                <p className="text-sm text-gray-600">{selectedArrendatario.notas}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal Editar Arrendatario */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>✏️ Editar Arrendatario</DialogTitle>
          </DialogHeader>
          {selectedArrendatario && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-nombre">Nombre Completo</Label>
                  <Input id="edit-nombre" defaultValue={selectedArrendatario.nombre} />
                </div>
                <div>
                  <Label htmlFor="edit-email">Email</Label>
                  <Input id="edit-email" defaultValue={selectedArrendatario.email} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-telefono">Teléfono</Label>
                  <Input id="edit-telefono" defaultValue={selectedArrendatario.telefono} />
                </div>
                <div>
                  <Label htmlFor="edit-ingresos">Ingresos Mensuales</Label>
                  <Input id="edit-ingresos" type="number" defaultValue={selectedArrendatario.ingresosMensuales} />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-direccion">Dirección</Label>
                <Input id="edit-direccion" defaultValue={selectedArrendatario.direccion} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-estado">Estado</Label>
                  <Select defaultValue={selectedArrendatario.estado}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Prospecto">🔍 Prospecto</SelectItem>
                      <SelectItem value="Activo">✅ Activo</SelectItem>
                      <SelectItem value="Inactivo">⏸️ Inactivo</SelectItem>
                      <SelectItem value="Moroso">⚠️ Moroso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-valorArriendo">Valor Arriendo</Label>
                  <Input
                    id="edit-valorArriendo"
                    type="number"
                    defaultValue={selectedArrendatario.valorArriendo || ""}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-notas">Notas</Label>
                <Textarea id="edit-notas" defaultValue={selectedArrendatario.notas} />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleEditArrendatario}>Guardar Cambios</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
