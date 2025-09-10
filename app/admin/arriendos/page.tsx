"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Home, Plus, Search, Eye, Edit, Calendar, CreditCard, TrendingUp, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Arriendo {
  id: number
  cliente: {
    id: number
    nombre: string
    email: string
    avatar: string
  }
  inmueble: {
    id: number
    titulo: string
    direccion: string
    tipo: string
    imagen: string
  }
  fechaInicio: string
  fechaFinalizacion: string
  valorMensual: number
  estado: "activo" | "vencido" | "cancelado" | "pendiente"
}

const mockArriendos: Arriendo[] = [
  {
    id: 1,
    cliente: {
      id: 1,
      nombre: "María González",
      email: "maria@email.com",
      avatar: "/avatar-1.jpg",
    },
    inmueble: {
      id: 1,
      titulo: "Apartamento Zona Norte",
      direccion: "Calle 123 #45-67",
      tipo: "Apartamento",
      imagen: "/property-1.jpg",
    },
    fechaInicio: "2024-01-01",
    fechaFinalizacion: "2024-12-31",
    valorMensual: 1500000,
    estado: "activo",
  },
  {
    id: 2,
    cliente: {
      id: 2,
      nombre: "Carlos Ruiz",
      email: "carlos@email.com",
      avatar: "/avatar-2.jpg",
    },
    inmueble: {
      id: 2,
      titulo: "Casa Residencial Sur",
      direccion: "Carrera 89 #12-34",
      tipo: "Casa",
      imagen: "/property-2.jpg",
    },
    fechaInicio: "2023-06-01",
    fechaFinalizacion: "2024-05-31",
    valorMensual: 2200000,
    estado: "vencido",
  },
  {
    id: 3,
    cliente: {
      id: 3,
      nombre: "Ana López",
      email: "ana@email.com",
      avatar: "/avatar-3.jpg",
    },
    inmueble: {
      id: 3,
      titulo: "Apartaestudio Centro",
      direccion: "Avenida 456 #78-90",
      tipo: "Apartaestudio",
      imagen: "/property-3.jpg",
    },
    fechaInicio: "2024-02-01",
    fechaFinalizacion: "2025-01-31",
    valorMensual: 1200000,
    estado: "activo",
  },
]

export default function ArriendosPage() {
  const [arriendos, setArriendos] = useState<Arriendo[]>(mockArriendos)
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [selectedArriendo, setSelectedArriendo] = useState<Arriendo | null>(null)
  const [formData, setFormData] = useState({
    clienteId: "",
    inmuebleId: "",
    fechaInicio: "",
    fechaFinalizacion: "",
    valorMensual: "",
    estado: "pendiente",
  })
  const { toast } = useToast()

  const filteredArriendos = arriendos.filter(
    (arriendo) =>
      arriendo.cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      arriendo.inmueble.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      arriendo.inmueble.direccion.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getEstadoBadge = (estado: string) => {
    const variants = {
      activo: "bg-green-100 text-green-800 border-green-200",
      vencido: "bg-red-100 text-red-800 border-red-200",
      cancelado: "bg-gray-100 text-gray-800 border-gray-200",
      pendiente: "bg-yellow-100 text-yellow-800 border-yellow-200",
    }
    const labels = {
      activo: "✅ Activo",
      vencido: "⚠️ Vencido",
      cancelado: "❌ Cancelado",
      pendiente: "⏳ Pendiente",
    }
    return <Badge className={variants[estado as keyof typeof variants]}>{labels[estado as keyof typeof labels]}</Badge>
  }

  const handleEdit = () => {
    if (!selectedArriendo) return

    const updatedArriendos = arriendos.map((arriendo) =>
      arriendo.id === selectedArriendo.id
        ? {
            ...arriendo,
            estado: formData.estado as any,
          }
        : arriendo,
    )

    setArriendos(updatedArriendos)
    setIsEditOpen(false)
    setSelectedArriendo(null)
    toast({
      title: "✅ Arriendo actualizado",
      description: "El estado del arriendo ha sido actualizado exitosamente.",
    })
  }

  const openEdit = (arriendo: Arriendo) => {
    setSelectedArriendo(arriendo)
    setFormData({
      clienteId: arriendo.cliente.id.toString(),
      inmuebleId: arriendo.inmueble.id.toString(),
      fechaInicio: arriendo.fechaInicio,
      fechaFinalizacion: arriendo.fechaFinalizacion,
      valorMensual: arriendo.valorMensual.toString(),
      estado: arriendo.estado,
    })
    setIsEditOpen(true)
  }

  const openView = (arriendo: Arriendo) => {
    setSelectedArriendo(arriendo)
    setIsViewOpen(true)
  }

  const totalArriendos = arriendos.length
  const arriendosActivos = arriendos.filter((a) => a.estado === "activo").length
  const arriendosVencidos = arriendos.filter((a) => a.estado === "vencido").length
  const ingresoMensual = arriendos.filter((a) => a.estado === "activo").reduce((sum, a) => sum + a.valorMensual, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Home className="h-8 w-8 text-blue-600" />🏠 Gestión de Arriendos
          </h1>
          <p className="text-gray-600">Administra todos los contratos de arriendo</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
              <Plus className="h-4 w-4" />➕ Nuevo Arriendo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Home className="h-5 w-5 text-blue-600" />🏠 Registrar Nuevo Arriendo
              </DialogTitle>
              <DialogDescription>Registra un nuevo contrato de arriendo en el sistema</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>👤 Cliente</Label>
                  <Select
                    value={formData.clienteId}
                    onValueChange={(value) => setFormData({ ...formData, clienteId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">María González</SelectItem>
                      <SelectItem value="2">Carlos Ruiz</SelectItem>
                      <SelectItem value="3">Ana López</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>🏠 Inmueble</Label>
                  <Select
                    value={formData.inmuebleId}
                    onValueChange={(value) => setFormData({ ...formData, inmuebleId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona inmueble" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Apartamento Zona Norte</SelectItem>
                      <SelectItem value="2">Casa Residencial Sur</SelectItem>
                      <SelectItem value="3">Apartaestudio Centro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>📅 Fecha Inicio</Label>
                  <Input
                    type="date"
                    value={formData.fechaInicio}
                    onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>📅 Fecha Finalización</Label>
                  <Input
                    type="date"
                    value={formData.fechaFinalizacion}
                    onChange={(e) => setFormData({ ...formData, fechaFinalizacion: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>💵 Valor Mensual</Label>
                <Input
                  type="number"
                  placeholder="1500000"
                  value={formData.valorMensual}
                  onChange={(e) => setFormData({ ...formData, valorMensual: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">✅ Registrar Arriendo</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">🏠 Total Arriendos</p>
                <p className="text-2xl font-bold text-blue-900">{totalArriendos}</p>
              </div>
              <Home className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">✅ Activos</p>
                <p className="text-2xl font-bold text-green-900">{arriendosActivos}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-red-50 to-red-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">⚠️ Vencidos</p>
                <p className="text-2xl font-bold text-red-900">{arriendosVencidos}</p>
              </div>
              <Clock className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">💵 Ingreso Mensual</p>
                <p className="text-lg font-bold text-purple-900">{formatCurrency(ingresoMensual)}</p>
              </div>
              <CreditCard className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="🔍 Buscar arriendos por cliente, inmueble o dirección..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/50 border-gray-200/50"
            />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5 text-blue-600" />🏠 Lista de Arriendos
          </CardTitle>
          <CardDescription>{filteredArriendos.length} arriendos encontrados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <div className="max-h-[600px] overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-gray-50/80 backdrop-blur-sm">
                  <TableRow>
                    <TableHead>👤 Cliente</TableHead>
                    <TableHead>🏠 Inmueble</TableHead>
                    <TableHead>📅 Período</TableHead>
                    <TableHead>💵 Valor Mensual</TableHead>
                    <TableHead>📊 Estado</TableHead>
                    <TableHead className="text-right">⚙️ Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredArriendos.map((arriendo) => (
                    <TableRow key={arriendo.id} className="hover:bg-gray-50/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={arriendo.cliente.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {arriendo.cliente.nombre
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{arriendo.cliente.nombre}</p>
                            <p className="text-sm text-gray-500">{arriendo.cliente.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={arriendo.inmueble.imagen || "/placeholder.svg"}
                            alt={arriendo.inmueble.titulo}
                            className="h-10 w-10 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium">{arriendo.inmueble.titulo}</p>
                            <p className="text-sm text-gray-500">{arriendo.inmueble.direccion}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-3 w-3 text-gray-400" />
                            {new Date(arriendo.fechaInicio).toLocaleDateString("es-ES")}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="h-3 w-3 text-gray-400" />
                            {new Date(arriendo.fechaFinalizacion).toLocaleDateString("es-ES")}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-bold text-blue-600">{formatCurrency(arriendo.valorMensual)}</p>
                      </TableCell>
                      <TableCell>{getEstadoBadge(arriendo.estado)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openView(arriendo)}
                            className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEdit(arriendo)}
                            className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5 text-green-600" />
              ✏️ Cambiar Estado de Arriendo
            </DialogTitle>
            <DialogDescription>Modifica el estado del arriendo seleccionado</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>📊 Estado</Label>
              <Select value={formData.estado} onValueChange={(value) => setFormData({ ...formData, estado: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="activo">✅ Activo</SelectItem>
                  <SelectItem value="vencido">⚠️ Vencido</SelectItem>
                  <SelectItem value="cancelado">❌ Cancelado</SelectItem>
                  <SelectItem value="pendiente">⏳ Pendiente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEdit} className="bg-green-600 hover:bg-green-700">
              ✅ Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-600" />
              👁️ Detalles del Arriendo
            </DialogTitle>
          </DialogHeader>
          {selectedArriendo && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">👤 Cliente</Label>
                    <div className="flex items-center gap-3 mt-2">
                      <Avatar>
                        <AvatarImage src={selectedArriendo.cliente.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {selectedArriendo.cliente.nombre
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{selectedArriendo.cliente.nombre}</p>
                        <p className="text-sm text-gray-500">{selectedArriendo.cliente.email}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-500">📅 Período del Contrato</Label>
                    <div className="space-y-1 mt-2">
                      <p className="text-sm">
                        <span className="font-medium">Inicio:</span>{" "}
                        {new Date(selectedArriendo.fechaInicio).toLocaleDateString("es-ES")}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Fin:</span>{" "}
                        {new Date(selectedArriendo.fechaFinalizacion).toLocaleDateString("es-ES")}
                      </p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-500">💵 Valor Mensual</Label>
                    <p className="text-2xl font-bold text-blue-600">{formatCurrency(selectedArriendo.valorMensual)}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">🏠 Inmueble</Label>
                    <div className="flex items-center gap-3 mt-2">
                      <img
                        src={selectedArriendo.inmueble.imagen || "/placeholder.svg"}
                        alt={selectedArriendo.inmueble.titulo}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium">{selectedArriendo.inmueble.titulo}</p>
                        <p className="text-sm text-gray-500">{selectedArriendo.inmueble.direccion}</p>
                        <Badge variant="outline" className="mt-1">
                          {selectedArriendo.inmueble.tipo}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-500">📊 Estado</Label>
                    <div className="mt-1">{getEstadoBadge(selectedArriendo.estado)}</div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-500">📊 Duración del Contrato</Label>
                    <p className="text-lg font-medium">
                      {Math.ceil(
                        (new Date(selectedArriendo.fechaFinalizacion).getTime() -
                          new Date(selectedArriendo.fechaInicio).getTime()) /
                          (1000 * 60 * 60 * 24 * 30),
                      )}{" "}
                      meses
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
