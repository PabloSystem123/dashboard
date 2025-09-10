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
import { DollarSign, Plus, Search, Eye, Edit, Calendar, CreditCard, TrendingUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Venta {
  id: number
  persona: {
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
  fechaVenta: string
  valorVenta: number
  medioPago: "efectivo" | "credito" | "financiacion" | "transferencia"
  estado: "pendiente" | "completada" | "cancelada"
}

const mockVentas: Venta[] = [
  {
    id: 1,
    persona: {
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
    fechaVenta: "2024-01-15",
    valorVenta: 250000000,
    medioPago: "credito",
    estado: "completada",
  },
  {
    id: 2,
    persona: {
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
    fechaVenta: "2024-01-14",
    valorVenta: 180000000,
    medioPago: "financiacion",
    estado: "pendiente",
  },
  {
    id: 3,
    persona: {
      id: 3,
      nombre: "Ana López",
      email: "ana@email.com",
      avatar: "/avatar-3.jpg",
    },
    inmueble: {
      id: 3,
      titulo: "Villa Campestre",
      direccion: "Km 5 Vía Principal",
      tipo: "Villa",
      imagen: "/property-3.jpg",
    },
    fechaVenta: "2024-01-13",
    valorVenta: 450000000,
    medioPago: "efectivo",
    estado: "completada",
  },
]

export default function VentasPage() {
  const [ventas, setVentas] = useState<Venta[]>(mockVentas)
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [selectedVenta, setSelectedVenta] = useState<Venta | null>(null)
  const [formData, setFormData] = useState({
    personaId: "",
    inmuebleId: "",
    valorVenta: "",
    medioPago: "",
    estado: "pendiente",
  })
  const { toast } = useToast()

  const filteredVentas = ventas.filter(
    (venta) =>
      venta.persona.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venta.inmueble.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venta.inmueble.direccion.toLowerCase().includes(searchTerm.toLowerCase()),
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
      pendiente: "bg-yellow-100 text-yellow-800 border-yellow-200",
      completada: "bg-green-100 text-green-800 border-green-200",
      cancelada: "bg-red-100 text-red-800 border-red-200",
    }
    const labels = {
      pendiente: "⏳ Pendiente",
      completada: "✅ Completada",
      cancelada: "❌ Cancelada",
    }
    return <Badge className={variants[estado as keyof typeof variants]}>{labels[estado as keyof typeof labels]}</Badge>
  }

  const getMedioPagoBadge = (medio: string) => {
    const variants = {
      efectivo: "bg-green-100 text-green-800 border-green-200",
      credito: "bg-blue-100 text-blue-800 border-blue-200",
      financiacion: "bg-purple-100 text-purple-800 border-purple-200",
      transferencia: "bg-orange-100 text-orange-800 border-orange-200",
    }
    const labels = {
      efectivo: "💵 Efectivo",
      credito: "💳 Crédito",
      financiacion: "🏦 Financiación",
      transferencia: "🔄 Transferencia",
    }
    return <Badge className={variants[medio as keyof typeof variants]}>{labels[medio as keyof typeof labels]}</Badge>
  }

  const handleEdit = () => {
    if (!selectedVenta) return

    const updatedVentas = ventas.map((venta) =>
      venta.id === selectedVenta.id
        ? {
            ...venta,
            estado: formData.estado as any,
          }
        : venta,
    )

    setVentas(updatedVentas)
    setIsEditOpen(false)
    setSelectedVenta(null)
    toast({
      title: "✅ Venta actualizada",
      description: "El estado de la venta ha sido actualizado exitosamente.",
    })
  }

  const openEdit = (venta: Venta) => {
    setSelectedVenta(venta)
    setFormData({
      personaId: venta.persona.id.toString(),
      inmuebleId: venta.inmueble.id.toString(),
      valorVenta: venta.valorVenta.toString(),
      medioPago: venta.medioPago,
      estado: venta.estado,
    })
    setIsEditOpen(true)
  }

  const openView = (venta: Venta) => {
    setSelectedVenta(venta)
    setIsViewOpen(true)
  }

  const totalVentas = ventas.length
  const ventasCompletadas = ventas.filter((v) => v.estado === "completada").length
  const ventasPendientes = ventas.filter((v) => v.estado === "pendiente").length
  const ingresoTotal = ventas.filter((v) => v.estado === "completada").reduce((sum, v) => sum + v.valorVenta, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-green-600" />💰 Gestión de Ventas
          </h1>
          <p className="text-gray-600">Administra todas las ventas de propiedades</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
              <Plus className="h-4 w-4" />➕ Nueva Venta
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />💰 Registrar Nueva Venta
              </DialogTitle>
              <DialogDescription>Registra una nueva venta de propiedad en el sistema</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>👤 Cliente</Label>
                  <Select
                    value={formData.personaId}
                    onValueChange={(value) => setFormData({ ...formData, personaId: value })}
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
                      <SelectItem value="3">Villa Campestre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>💵 Valor de Venta</Label>
                  <Input
                    type="number"
                    placeholder="250000000"
                    value={formData.valorVenta}
                    onChange={(e) => setFormData({ ...formData, valorVenta: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>💳 Medio de Pago</Label>
                  <Select
                    value={formData.medioPago}
                    onValueChange={(value) => setFormData({ ...formData, medioPago: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona medio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="efectivo">💵 Efectivo</SelectItem>
                      <SelectItem value="credito">💳 Crédito</SelectItem>
                      <SelectItem value="financiacion">🏦 Financiación</SelectItem>
                      <SelectItem value="transferencia">🔄 Transferencia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">✅ Registrar Venta</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">💰 Total Ventas</p>
                <p className="text-2xl font-bold text-green-900">{totalVentas}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">✅ Completadas</p>
                <p className="text-2xl font-bold text-blue-900">{ventasCompletadas}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-yellow-50 to-yellow-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">⏳ Pendientes</p>
                <p className="text-2xl font-bold text-yellow-900">{ventasPendientes}</p>
              </div>
              <Calendar className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">💵 Ingresos</p>
                <p className="text-lg font-bold text-purple-900">{formatCurrency(ingresoTotal)}</p>
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
              placeholder="🔍 Buscar ventas por cliente, inmueble o dirección..."
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
            <DollarSign className="h-5 w-5 text-green-600" />💰 Lista de Ventas
          </CardTitle>
          <CardDescription>{filteredVentas.length} ventas encontradas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <div className="max-h-[600px] overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-gray-50/80 backdrop-blur-sm">
                  <TableRow>
                    <TableHead>👤 Cliente</TableHead>
                    <TableHead>🏠 Inmueble</TableHead>
                    <TableHead>📅 Fecha</TableHead>
                    <TableHead>💵 Valor</TableHead>
                    <TableHead>💳 Medio Pago</TableHead>
                    <TableHead>📊 Estado</TableHead>
                    <TableHead className="text-right">⚙️ Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVentas.map((venta) => (
                    <TableRow key={venta.id} className="hover:bg-gray-50/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={venta.persona.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {venta.persona.nombre
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{venta.persona.nombre}</p>
                            <p className="text-sm text-gray-500">{venta.persona.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={venta.inmueble.imagen || "/placeholder.svg"}
                            alt={venta.inmueble.titulo}
                            className="h-10 w-10 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium">{venta.inmueble.titulo}</p>
                            <p className="text-sm text-gray-500">{venta.inmueble.direccion}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {new Date(venta.fechaVenta).toLocaleDateString("es-ES")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-bold text-green-600">{formatCurrency(venta.valorVenta)}</p>
                      </TableCell>
                      <TableCell>{getMedioPagoBadge(venta.medioPago)}</TableCell>
                      <TableCell>{getEstadoBadge(venta.estado)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openView(venta)}
                            className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEdit(venta)}
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
              ✏️ Cambiar Estado de Venta
            </DialogTitle>
            <DialogDescription>Modifica el estado de la venta seleccionada</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>📊 Estado</Label>
              <Select value={formData.estado} onValueChange={(value) => setFormData({ ...formData, estado: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendiente">⏳ Pendiente</SelectItem>
                  <SelectItem value="completada">✅ Completada</SelectItem>
                  <SelectItem value="cancelada">❌ Cancelada</SelectItem>
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
              👁️ Detalles de la Venta
            </DialogTitle>
          </DialogHeader>
          {selectedVenta && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">👤 Cliente</Label>
                    <div className="flex items-center gap-3 mt-2">
                      <Avatar>
                        <AvatarImage src={selectedVenta.persona.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {selectedVenta.persona.nombre
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{selectedVenta.persona.nombre}</p>
                        <p className="text-sm text-gray-500">{selectedVenta.persona.email}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-500">📅 Fecha de Venta</Label>
                    <p className="text-lg">{new Date(selectedVenta.fechaVenta).toLocaleDateString("es-ES")}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-500">💵 Valor de Venta</Label>
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(selectedVenta.valorVenta)}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">🏠 Inmueble</Label>
                    <div className="flex items-center gap-3 mt-2">
                      <img
                        src={selectedVenta.inmueble.imagen || "/placeholder.svg"}
                        alt={selectedVenta.inmueble.titulo}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium">{selectedVenta.inmueble.titulo}</p>
                        <p className="text-sm text-gray-500">{selectedVenta.inmueble.direccion}</p>
                        <Badge variant="outline" className="mt-1">
                          {selectedVenta.inmueble.tipo}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-500">💳 Medio de Pago</Label>
                    <div className="mt-1">{getMedioPagoBadge(selectedVenta.medioPago)}</div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-500">📊 Estado</Label>
                    <div className="mt-1">{getEstadoBadge(selectedVenta.estado)}</div>
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
