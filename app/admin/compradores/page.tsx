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
import { Search, Plus, Eye, Edit, Trash2, UserPlus, Phone, Mail, MapPin, Calendar, DollarSign } from "lucide-react"

interface Comprador {
  id: number
  nombre: string
  email: string
  telefono: string
  direccion: string
  fechaRegistro: string
  presupuesto: number
  estado: "Activo" | "Inactivo" | "Interesado" | "Compró"
  propiedadesInteres: string[]
  notas: string
}

export default function CompradoresPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedComprador, setSelectedComprador] = useState<Comprador | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  // Datos de ejemplo
  const [compradores, setCompradores] = useState<Comprador[]>([
    {
      id: 1,
      nombre: "Carlos Rodríguez",
      email: "carlos.rodriguez@email.com",
      telefono: "+57 300 123 4567",
      direccion: "Calle 123 #45-67, Bogotá",
      fechaRegistro: "2024-01-15",
      presupuesto: 250000000,
      estado: "Interesado",
      propiedadesInteres: ["Apartamento Centro", "Casa Zona Norte"],
      notas: "Busca apartamento de 2 habitaciones en zona céntrica",
    },
    {
      id: 2,
      nombre: "María González",
      email: "maria.gonzalez@email.com",
      telefono: "+57 301 234 5678",
      direccion: "Carrera 45 #12-34, Medellín",
      fechaRegistro: "2024-01-20",
      presupuesto: 180000000,
      estado: "Activo",
      propiedadesInteres: ["Casa Suburbana"],
      notas: "Primera vivienda, busca financiación",
    },
    {
      id: 3,
      nombre: "Luis Martínez",
      email: "luis.martinez@email.com",
      telefono: "+57 302 345 6789",
      direccion: "Avenida 80 #23-45, Cali",
      fechaRegistro: "2024-02-01",
      presupuesto: 320000000,
      estado: "Compró",
      propiedadesInteres: ["Penthouse Premium"],
      notas: "Compró penthouse en febrero 2024",
    },
  ])

  const filteredCompradores = compradores.filter(
    (comprador) =>
      comprador.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comprador.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comprador.telefono.includes(searchTerm),
  )

  const getEstadoBadge = (estado: string) => {
    const variants = {
      Activo: "bg-green-100 text-green-800 border-green-200",
      Inactivo: "bg-gray-100 text-gray-800 border-gray-200",
      Interesado: "bg-blue-100 text-blue-800 border-blue-200",
      Compró: "bg-purple-100 text-purple-800 border-purple-200",
    }
    return variants[estado as keyof typeof variants] || variants.Activo
  }

  const getEstadoEmoji = (estado: string) => {
    const emojis = {
      Activo: "✅",
      Inactivo: "⏸️",
      Interesado: "👀",
      Compró: "🎉",
    }
    return emojis[estado as keyof typeof emojis] || "✅"
  }

  const handleCreateComprador = () => {
    toast({
      title: "✅ Comprador creado",
      description: "El nuevo comprador ha sido registrado exitosamente.",
    })
    setIsCreateModalOpen(false)
  }

  const handleEditComprador = () => {
    toast({
      title: "✅ Comprador actualizado",
      description: "Los datos del comprador han sido actualizados correctamente.",
    })
    setIsEditModalOpen(false)
  }

  const handleDeleteComprador = (id: number) => {
    setCompradores((prev) => prev.filter((c) => c.id !== id))
    toast({
      title: "🗑️ Comprador eliminado",
      description: "El comprador ha sido eliminado del sistema.",
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
    total: compradores.length,
    activos: compradores.filter((c) => c.estado === "Activo").length,
    interesados: compradores.filter((c) => c.estado === "Interesado").length,
    compraron: compradores.filter((c) => c.estado === "Compró").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">👥 Gestión de Compradores</h1>
          <p className="text-gray-600 mt-1">Administra y gestiona la base de datos de compradores potenciales</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Comprador
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>👤 Registrar Nuevo Comprador</DialogTitle>
              <DialogDescription>Completa la información del nuevo comprador potencial</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nombre">Nombre Completo</Label>
                  <Input id="nombre" placeholder="Ej: Juan Pérez" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="juan@email.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input id="telefono" placeholder="+57 300 123 4567" />
                </div>
                <div>
                  <Label htmlFor="presupuesto">Presupuesto</Label>
                  <Input id="presupuesto" type="number" placeholder="250000000" />
                </div>
              </div>
              <div>
                <Label htmlFor="direccion">Dirección</Label>
                <Input id="direccion" placeholder="Calle 123 #45-67, Ciudad" />
              </div>
              <div>
                <Label htmlFor="estado">Estado</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Activo">✅ Activo</SelectItem>
                    <SelectItem value="Interesado">👀 Interesado</SelectItem>
                    <SelectItem value="Inactivo">⏸️ Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="notas">Notas</Label>
                <Textarea id="notas" placeholder="Información adicional sobre el comprador..." />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateComprador}>Registrar Comprador</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Total Compradores</CardTitle>
            <UserPlus className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{stats.total}</div>
            <p className="text-xs text-blue-600 mt-1">👥 Registrados en el sistema</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Activos</CardTitle>
            <UserPlus className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{stats.activos}</div>
            <p className="text-xs text-green-600 mt-1">✅ Compradores activos</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800">Interesados</CardTitle>
            <Eye className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">{stats.interesados}</div>
            <p className="text-xs text-yellow-600 mt-1">👀 Con interés activo</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Compraron</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{stats.compraron}</div>
            <p className="text-xs text-purple-600 mt-1">🎉 Compras exitosas</p>
          </CardContent>
        </Card>
      </div>

      {/* Búsqueda */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">🔍 Buscar Compradores</CardTitle>
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

      {/* Tabla de Compradores */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">📋 Lista de Compradores</CardTitle>
          <CardDescription>{filteredCompradores.length} compradores encontrados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Comprador</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Presupuesto</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha Registro</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCompradores.map((comprador) => (
                  <TableRow key={comprador.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{comprador.nombre}</div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {comprador.direccion}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="h-3 w-3 mr-1 text-gray-400" />
                          {comprador.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="h-3 w-3 mr-1 text-gray-400" />
                          {comprador.telefono}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-green-600">{formatCurrency(comprador.presupuesto)}</div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getEstadoBadge(comprador.estado)}>
                        {getEstadoEmoji(comprador.estado)} {comprador.estado}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                        {new Date(comprador.fechaRegistro).toLocaleDateString("es-CO")}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedComprador(comprador)
                            setIsViewModalOpen(true)
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedComprador(comprador)
                            setIsEditModalOpen(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteComprador(comprador.id)}
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

      {/* Modal Ver Comprador */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>👤 Detalles del Comprador</DialogTitle>
          </DialogHeader>
          {selectedComprador && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Nombre</Label>
                  <p className="text-lg font-medium">{selectedComprador.nombre}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Estado</Label>
                  <Badge className={getEstadoBadge(selectedComprador.estado)}>
                    {getEstadoEmoji(selectedComprador.estado)} {selectedComprador.estado}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Email</Label>
                  <p>{selectedComprador.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Teléfono</Label>
                  <p>{selectedComprador.telefono}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Dirección</Label>
                <p>{selectedComprador.direccion}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Presupuesto</Label>
                <p className="text-lg font-medium text-green-600">{formatCurrency(selectedComprador.presupuesto)}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Propiedades de Interés</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedComprador.propiedadesInteres.map((propiedad, index) => (
                    <Badge key={index} variant="outline">
                      {propiedad}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Notas</Label>
                <p className="text-sm text-gray-600">{selectedComprador.notas}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal Editar Comprador */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>✏️ Editar Comprador</DialogTitle>
          </DialogHeader>
          {selectedComprador && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-nombre">Nombre Completo</Label>
                  <Input id="edit-nombre" defaultValue={selectedComprador.nombre} />
                </div>
                <div>
                  <Label htmlFor="edit-email">Email</Label>
                  <Input id="edit-email" defaultValue={selectedComprador.email} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-telefono">Teléfono</Label>
                  <Input id="edit-telefono" defaultValue={selectedComprador.telefono} />
                </div>
                <div>
                  <Label htmlFor="edit-presupuesto">Presupuesto</Label>
                  <Input id="edit-presupuesto" type="number" defaultValue={selectedComprador.presupuesto} />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-direccion">Dirección</Label>
                <Input id="edit-direccion" defaultValue={selectedComprador.direccion} />
              </div>
              <div>
                <Label htmlFor="edit-estado">Estado</Label>
                <Select defaultValue={selectedComprador.estado}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Activo">✅ Activo</SelectItem>
                    <SelectItem value="Interesado">👀 Interesado</SelectItem>
                    <SelectItem value="Inactivo">⏸️ Inactivo</SelectItem>
                    <SelectItem value="Compró">🎉 Compró</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-notas">Notas</Label>
                <Textarea id="edit-notas" defaultValue={selectedComprador.notas} />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleEditComprador}>Guardar Cambios</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
