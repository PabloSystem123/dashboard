"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Users, Plus, Edit, Eye, Trash2, Search, Phone, Mail, User, Calendar, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Client {
  id: number
  documento: string
  nombre: string
  apellido: string
  correo: string
  telefono: string
  tipoCliente: "comprador" | "vendedor" | "arrendatario" | "arrendador"
  presupuesto: number
  tipoInmueble: string
  ubicacionPreferida: string
  observaciones: string
  estado: "activo" | "inactivo" | "prospecto"
  fechaRegistro: string
  ultimaActividad: string
}

const initialClients: Client[] = [
  {
    id: 1,
    documento: "12345678",
    nombre: "Juan",
    apellido: "Pérez",
    correo: "juan.perez@email.com",
    telefono: "+57 300 123 4567",
    tipoCliente: "comprador",
    presupuesto: 200000000,
    tipoInmueble: "Apartamento",
    ubicacionPreferida: "Medellín",
    observaciones: "Busca apartamento de 2 habitaciones",
    estado: "activo",
    fechaRegistro: "2024-01-15",
    ultimaActividad: "2024-01-20",
  },
  {
    id: 2,
    documento: "87654321",
    nombre: "María",
    apellido: "González",
    correo: "maria.gonzalez@email.com",
    telefono: "+57 301 234 5678",
    tipoCliente: "vendedor",
    presupuesto: 0,
    tipoInmueble: "Casa",
    ubicacionPreferida: "Envigado",
    observaciones: "Quiere vender casa heredada",
    estado: "activo",
    fechaRegistro: "2024-01-10",
    ultimaActividad: "2024-01-18",
  },
  {
    id: 3,
    documento: "11223344",
    nombre: "Carlos",
    apellido: "Ruiz",
    correo: "carlos.ruiz@email.com",
    telefono: "+57 302 345 6789",
    tipoCliente: "arrendatario",
    presupuesto: 1500000,
    tipoInmueble: "Apartaestudio",
    ubicacionPreferida: "Laureles",
    observaciones: "Estudiante universitario",
    estado: "prospecto",
    fechaRegistro: "2024-01-22",
    ultimaActividad: "2024-01-22",
  },
]

const tiposCliente = ["comprador", "vendedor", "arrendatario", "arrendador"]
const tiposInmueble = ["Casa", "Apartamento", "Apartaestudio", "Finca", "Terreno", "Local Comercial"]
const ciudades = ["Medellín", "Envigado", "Itagüí", "Sabaneta", "La Estrella", "Caldas"]

export default function ClientesPage() {
  const [clients, setClients] = useState<Client[]>(initialClients)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterTipo, setFilterTipo] = useState<string>("todos")
  const [filterEstado, setFilterEstado] = useState<string>("todos")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [formData, setFormData] = useState({
    documento: "",
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    tipoCliente: "",
    presupuesto: "",
    tipoInmueble: "",
    ubicacionPreferida: "",
    observaciones: "",
  })
  const { toast } = useToast()

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.documento.includes(searchTerm)

    const matchesTipo = filterTipo === "todos" || client.tipoCliente === filterTipo
    const matchesEstado = filterEstado === "todos" || client.estado === filterEstado

    return matchesSearch && matchesTipo && matchesEstado
  })

  const validateForm = () => {
    if (!formData.documento.trim()) {
      toast({
        variant: "destructive",
        title: "Campo requerido",
        description: "El documento es obligatorio.",
      })
      return false
    }

    if (!formData.nombre.trim()) {
      toast({
        variant: "destructive",
        title: "Campo requerido",
        description: "El nombre es obligatorio.",
      })
      return false
    }

    if (!formData.apellido.trim()) {
      toast({
        variant: "destructive",
        title: "Campo requerido",
        description: "El apellido es obligatorio.",
      })
      return false
    }

    if (!formData.correo.trim() || !formData.correo.includes("@")) {
      toast({
        variant: "destructive",
        title: "Email inválido",
        description: "Por favor, ingresa un email válido.",
      })
      return false
    }

    if (!formData.telefono.trim()) {
      toast({
        variant: "destructive",
        title: "Campo requerido",
        description: "El teléfono es obligatorio.",
      })
      return false
    }

    if (!formData.tipoCliente) {
      toast({
        variant: "destructive",
        title: "Campo requerido",
        description: "Debe seleccionar un tipo de cliente.",
      })
      return false
    }

    // Verificar documento duplicado
    const existingClient = clients.find(
      (client) => client.documento === formData.documento && (!selectedClient || client.id !== selectedClient.id),
    )

    if (existingClient) {
      toast({
        variant: "destructive",
        title: "Documento duplicado",
        description: "Ya existe un cliente con este documento.",
      })
      return false
    }

    // Verificar email duplicado
    const existingEmail = clients.find(
      (client) => client.correo === formData.correo && (!selectedClient || client.id !== selectedClient.id),
    )

    if (existingEmail) {
      toast({
        variant: "destructive",
        title: "Email duplicado",
        description: "Ya existe un cliente con este email.",
      })
      return false
    }

    return true
  }

  const handleCreateClient = () => {
    if (!validateForm()) return

    const newClient: Client = {
      id: Math.max(...clients.map((c) => c.id)) + 1,
      documento: formData.documento,
      nombre: formData.nombre,
      apellido: formData.apellido,
      correo: formData.correo,
      telefono: formData.telefono,
      tipoCliente: formData.tipoCliente as "comprador" | "vendedor" | "arrendatario" | "arrendador",
      presupuesto: Number(formData.presupuesto) || 0,
      tipoInmueble: formData.tipoInmueble,
      ubicacionPreferida: formData.ubicacionPreferida,
      observaciones: formData.observaciones,
      estado: "prospecto",
      fechaRegistro: new Date().toISOString().split("T")[0],
      ultimaActividad: new Date().toISOString().split("T")[0],
    }

    setClients([...clients, newClient])
    setIsCreateDialogOpen(false)
    resetForm()

    toast({
      title: "Cliente creado",
      description: `${newClient.nombre} ${newClient.apellido} ha sido agregado exitosamente.`,
    })
  }

  const handleEditClient = () => {
    if (!validateForm() || !selectedClient) return

    const updatedClients = clients.map((client) =>
      client.id === selectedClient.id
        ? {
            ...client,
            documento: formData.documento,
            nombre: formData.nombre,
            apellido: formData.apellido,
            correo: formData.correo,
            telefono: formData.telefono,
            tipoCliente: formData.tipoCliente as "comprador" | "vendedor" | "arrendatario" | "arrendador",
            presupuesto: Number(formData.presupuesto) || 0,
            tipoInmueble: formData.tipoInmueble,
            ubicacionPreferida: formData.ubicacionPreferida,
            observaciones: formData.observaciones,
            ultimaActividad: new Date().toISOString().split("T")[0],
          }
        : client,
    )

    setClients(updatedClients)
    setIsEditDialogOpen(false)
    resetForm()

    toast({
      title: "Cliente actualizado",
      description: `${formData.nombre} ${formData.apellido} ha sido actualizado exitosamente.`,
    })
  }

  const handleDeleteClient = (client: Client) => {
    setClients(clients.filter((c) => c.id !== client.id))
    toast({
      title: "Cliente eliminado",
      description: `${client.nombre} ${client.apellido} ha sido eliminado del sistema.`,
    })
  }

  const toggleClientStatus = (client: Client) => {
    const newStatus = client.estado === "activo" ? "inactivo" : "activo"
    const updatedClients = clients.map((c) =>
      c.id === client.id ? { ...c, estado: newStatus, ultimaActividad: new Date().toISOString().split("T")[0] } : c,
    )
    setClients(updatedClients)

    toast({
      title: "Estado actualizado",
      description: `${client.nombre} ${client.apellido} ahora está ${newStatus}.`,
    })
  }

  const resetForm = () => {
    setFormData({
      documento: "",
      nombre: "",
      apellido: "",
      correo: "",
      telefono: "",
      tipoCliente: "",
      presupuesto: "",
      tipoInmueble: "",
      ubicacionPreferida: "",
      observaciones: "",
    })
    setSelectedClient(null)
  }

  const openEditDialog = (client: Client) => {
    setSelectedClient(client)
    setFormData({
      documento: client.documento,
      nombre: client.nombre,
      apellido: client.apellido,
      correo: client.correo,
      telefono: client.telefono,
      tipoCliente: client.tipoCliente,
      presupuesto: client.presupuesto.toString(),
      tipoInmueble: client.tipoInmueble,
      ubicacionPreferida: client.ubicacionPreferida,
      observaciones: client.observaciones,
    })
    setIsEditDialogOpen(true)
  }

  const openViewDialog = (client: Client) => {
    setSelectedClient(client)
    setIsViewDialogOpen(true)
  }

  const formatPrice = (price: number) => {
    if (price === 0) return "No especificado"
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "activo":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
      case "inactivo":
        return "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
      case "prospecto":
        return "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
    }
  }

  const getTipoClienteColor = (tipo: string) => {
    switch (tipo) {
      case "comprador":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "vendedor":
        return "bg-green-50 text-green-700 border-green-200"
      case "arrendatario":
        return "bg-purple-50 text-purple-700 border-purple-200"
      case "arrendador":
        return "bg-orange-50 text-orange-700 border-orange-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const formatPhoneNumber = (phone: string) => {
    // Formatear número de teléfono para mejor legibilidad
    return phone.replace(/(\+57)\s?(\d{3})\s?(\d{3})\s?(\d{4})/, "$1 $2 $3 $4")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Users className="h-8 w-8 text-white" />
              </div>
              Gestión de Clientes
            </h1>
            <p className="text-gray-600 mt-2">Administra y gestiona la base de datos de clientes</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Cliente
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">Crear Nuevo Cliente</DialogTitle>
                <DialogDescription>Ingresa la información del nuevo cliente</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="documento">Documento *</Label>
                  <Input
                    id="documento"
                    placeholder="12345678"
                    value={formData.documento}
                    onChange={(e) => setFormData({ ...formData, documento: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipoCliente">Tipo de Cliente *</Label>
                  <Select
                    value={formData.tipoCliente}
                    onValueChange={(value) => setFormData({ ...formData, tipoCliente: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposCliente.map((tipo) => (
                        <SelectItem key={tipo} value={tipo}>
                          {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre *</Label>
                  <Input
                    id="nombre"
                    placeholder="Juan"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apellido">Apellido *</Label>
                  <Input
                    id="apellido"
                    placeholder="Pérez"
                    value={formData.apellido}
                    onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="correo">Correo Electrónico *</Label>
                  <Input
                    id="correo"
                    type="email"
                    placeholder="juan.perez@email.com"
                    value={formData.correo}
                    onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono *</Label>
                  <Input
                    id="telefono"
                    placeholder="+57 300 123 4567"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="presupuesto">Presupuesto</Label>
                  <Input
                    id="presupuesto"
                    type="number"
                    placeholder="200000000"
                    value={formData.presupuesto}
                    onChange={(e) => setFormData({ ...formData, presupuesto: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipoInmueble">Tipo de Inmueble</Label>
                  <Select
                    value={formData.tipoInmueble}
                    onValueChange={(value) => setFormData({ ...formData, tipoInmueble: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposInmueble.map((tipo) => (
                        <SelectItem key={tipo} value={tipo}>
                          {tipo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="ubicacionPreferida">Ubicación Preferida</Label>
                  <Select
                    value={formData.ubicacionPreferida}
                    onValueChange={(value) => setFormData({ ...formData, ubicacionPreferida: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar ciudad" />
                    </SelectTrigger>
                    <SelectContent>
                      {ciudades.map((ciudad) => (
                        <SelectItem key={ciudad} value={ciudad}>
                          {ciudad}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="observaciones">Observaciones</Label>
                  <Textarea
                    id="observaciones"
                    placeholder="Notas adicionales sobre el cliente..."
                    value={formData.observaciones}
                    onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button
                  onClick={handleCreateClient}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Crear Cliente
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Clientes</p>
                  <p className="text-3xl font-bold text-gray-900">{clients.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Activos</p>
                  <p className="text-3xl font-bold text-emerald-600">
                    {clients.filter((c) => c.estado === "activo").length}
                  </p>
                </div>
                <div className="p-3 bg-emerald-100 rounded-full">
                  <User className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Prospectos</p>
                  <p className="text-3xl font-bold text-amber-600">
                    {clients.filter((c) => c.estado === "prospecto").length}
                  </p>
                </div>
                <div className="p-3 bg-amber-100 rounded-full">
                  <Eye className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Compradores</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {clients.filter((c) => c.tipoCliente === "comprador").length}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Plus className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar clientes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/50 border-gray-200/50"
                />
              </div>
              <Select value={filterTipo} onValueChange={setFilterTipo}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los tipos</SelectItem>
                  {tiposCliente.map((tipo) => (
                    <SelectItem key={tipo} value={tipo}>
                      {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterEstado} onValueChange={setFilterEstado}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  <SelectItem value="activo">Activo</SelectItem>
                  <SelectItem value="inactivo">Inactivo</SelectItem>
                  <SelectItem value="prospecto">Prospecto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Clients Table */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Users className="h-6 w-6 text-blue-600" />
              Lista de Clientes
            </CardTitle>
            <CardDescription className="text-gray-600">{filteredClients.length} clientes encontrados</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/80 hover:bg-gray-50/80 border-b-2">
                    <TableHead className="font-semibold text-gray-700 py-4 px-6 min-w-[250px]">Cliente</TableHead>
                    <TableHead className="font-semibold text-gray-700 py-4 px-6 min-w-[280px]">
                      Información de Contacto
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700 py-4 px-6 min-w-[200px]">
                      Tipo & Presupuesto
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700 py-4 px-6 text-center min-w-[120px]">
                      Estado
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700 py-4 px-6 min-w-[150px]">
                      Última Actividad
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700 py-4 px-6 text-right min-w-[150px]">
                      Acciones
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client, index) => (
                    <TableRow
                      key={client.id}
                      className={`hover:bg-blue-50/50 transition-all duration-200 border-b ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                      }`}
                    >
                      <TableCell className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                            <User className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-semibold text-gray-900 text-base truncate">
                              {client.nombre} {client.apellido}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <span className="font-medium">Doc:</span>
                              <span className="font-mono">{client.documento}</span>
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="py-4 px-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <div className="h-6 w-6 rounded bg-blue-100 flex items-center justify-center flex-shrink-0">
                              <Mail className="h-3 w-3 text-blue-600" />
                            </div>
                            <span className="text-gray-700 truncate font-medium">{client.correo}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <div className="h-6 w-6 rounded bg-green-100 flex items-center justify-center flex-shrink-0">
                              <Phone className="h-3 w-3 text-green-600" />
                            </div>
                            <span className="text-gray-700 font-mono">{formatPhoneNumber(client.telefono)}</span>
                          </div>
                          {client.ubicacionPreferida && (
                            <div className="flex items-center gap-2 text-sm">
                              <div className="h-6 w-6 rounded bg-purple-100 flex items-center justify-center flex-shrink-0">
                                <MapPin className="h-3 w-3 text-purple-600" />
                              </div>
                              <span className="text-gray-600">{client.ubicacionPreferida}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>

                      <TableCell className="py-4 px-6">
                        <div className="space-y-3">
                          <Badge className={`${getTipoClienteColor(client.tipoCliente)} font-medium`}>
                            {client.tipoCliente.charAt(0).toUpperCase() + client.tipoCliente.slice(1)}
                          </Badge>
                          <div className="space-y-1">
                            <div className="font-semibold text-emerald-600 text-sm">
                              {formatPrice(client.presupuesto)}
                            </div>
                            {client.tipoInmueble && (
                              <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                {client.tipoInmueble}
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="py-4 px-6 text-center">
                        <Badge
                          className={`cursor-pointer transition-all duration-200 ${getEstadoColor(client.estado)} font-medium`}
                          onClick={() => toggleClientStatus(client)}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-2 w-2 rounded-full ${
                                client.estado === "activo"
                                  ? "bg-emerald-500"
                                  : client.estado === "prospecto"
                                    ? "bg-amber-500"
                                    : "bg-red-500"
                              }`}
                            />
                            {client.estado.charAt(0).toUpperCase() + client.estado.slice(1)}
                          </div>
                        </Badge>
                      </TableCell>

                      <TableCell className="py-4 px-6">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="h-6 w-6 rounded bg-purple-100 flex items-center justify-center flex-shrink-0">
                            <Calendar className="h-3 w-3 text-purple-600" />
                          </div>
                          <span className="font-medium">
                            {new Date(client.ultimaActividad).toLocaleDateString("es-ES", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell className="py-4 px-6">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openViewDialog(client)}
                            className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(client)}
                            className="h-8 w-8 p-0 hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-700 transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>¿Eliminar cliente?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta acción no se puede deshacer. Se eliminará permanentemente a{" "}
                                  <strong>
                                    {client.nombre} {client.apellido}
                                  </strong>{" "}
                                  del sistema.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteClient(client)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Sí, eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">Editar Cliente</DialogTitle>
              <DialogDescription>Modifica la información del cliente</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-documento">Documento *</Label>
                <Input
                  id="edit-documento"
                  placeholder="12345678"
                  value={formData.documento}
                  onChange={(e) => setFormData({ ...formData, documento: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-tipoCliente">Tipo de Cliente *</Label>
                <Select
                  value={formData.tipoCliente}
                  onValueChange={(value) => setFormData({ ...formData, tipoCliente: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposCliente.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-nombre">Nombre *</Label>
                <Input
                  id="edit-nombre"
                  placeholder="Juan"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-apellido">Apellido *</Label>
                <Input
                  id="edit-apellido"
                  placeholder="Pérez"
                  value={formData.apellido}
                  onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-correo">Correo Electrónico *</Label>
                <Input
                  id="edit-correo"
                  type="email"
                  placeholder="juan.perez@email.com"
                  value={formData.correo}
                  onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-telefono">Teléfono *</Label>
                <Input
                  id="edit-telefono"
                  placeholder="+57 300 123 4567"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-presupuesto">Presupuesto</Label>
                <Input
                  id="edit-presupuesto"
                  type="number"
                  placeholder="200000000"
                  value={formData.presupuesto}
                  onChange={(e) => setFormData({ ...formData, presupuesto: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-tipoInmueble">Tipo de Inmueble</Label>
                <Select
                  value={formData.tipoInmueble}
                  onValueChange={(value) => setFormData({ ...formData, tipoInmueble: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposInmueble.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="edit-ubicacionPreferida">Ubicación Preferida</Label>
                <Select
                  value={formData.ubicacionPreferida}
                  onValueChange={(value) => setFormData({ ...formData, ubicacionPreferida: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar ciudad" />
                  </SelectTrigger>
                  <SelectContent>
                    {ciudades.map((ciudad) => (
                      <SelectItem key={ciudad} value={ciudad}>
                        {ciudad}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="edit-observaciones">Observaciones</Label>
                <Textarea
                  id="edit-observaciones"
                  placeholder="Notas adicionales sobre el cliente..."
                  value={formData.observaciones}
                  onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancelar
              </Button>
              <Button
                onClick={handleEditClient}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Guardar Cambios
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">Información del Cliente</DialogTitle>
              <DialogDescription>Detalles completos del cliente</DialogDescription>
            </DialogHeader>
            {selectedClient && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <div className="h-16 w-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">
                      {selectedClient.nombre} {selectedClient.apellido}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getTipoClienteColor(selectedClient.tipoCliente)}>
                        {selectedClient.tipoCliente.charAt(0).toUpperCase() + selectedClient.tipoCliente.slice(1)}
                      </Badge>
                      <Badge className={getEstadoColor(selectedClient.estado)}>
                        {selectedClient.estado.charAt(0).toUpperCase() + selectedClient.estado.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Documento</Label>
                    <p className="text-lg font-semibold font-mono">{selectedClient.documento}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Fecha de Registro</Label>
                    <p className="text-lg font-semibold">
                      {new Date(selectedClient.fechaRegistro).toLocaleDateString("es-ES")}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm font-medium text-gray-500">Correo Electrónico</Label>
                    <p className="text-lg font-semibold flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      {selectedClient.correo}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm font-medium text-gray-500">Teléfono</Label>
                    <p className="text-lg font-semibold flex items-center gap-2 font-mono">
                      <Phone className="h-4 w-4 text-gray-400" />
                      {formatPhoneNumber(selectedClient.telefono)}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Presupuesto</Label>
                    <p className="text-lg font-semibold text-emerald-600">{formatPrice(selectedClient.presupuesto)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Tipo de Inmueble</Label>
                    <p className="text-lg font-semibold">{selectedClient.tipoInmueble || "No especificado"}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm font-medium text-gray-500">Ubicación Preferida</Label>
                    <p className="text-lg font-semibold flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      {selectedClient.ubicacionPreferida || "No especificada"}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm font-medium text-gray-500">Última Actividad</Label>
                    <p className="text-lg font-semibold flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      {new Date(selectedClient.ultimaActividad).toLocaleDateString("es-ES")}
                    </p>
                  </div>
                  {selectedClient.observaciones && (
                    <div className="col-span-2">
                      <Label className="text-sm font-medium text-gray-500">Observaciones</Label>
                      <p className="text-gray-700 mt-1 p-3 bg-gray-50 rounded-lg">{selectedClient.observaciones}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Cerrar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
