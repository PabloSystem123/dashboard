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
import { Calendar, Plus, Edit, Eye, Trash2, Search, Clock, User, MapPin, Phone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Cita {
  id: number
  cliente: string
  telefono: string
  correo: string
  agente: string
  propiedad: string
  direccion: string
  fecha: string
  hora: string
  tipo: "visita" | "asesoria" | "firma" | "evaluacion"
  estado: "programada" | "confirmada" | "completada" | "cancelada" | "reprogramada"
  notas: string
  fechaCreacion: string
}

const initialAppointments: Cita[] = [
  {
    id: 1,
    cliente: "Juan Pérez",
    telefono: "+57 300 123 4567",
    correo: "juan.perez@email.com",
    agente: "María González",
    propiedad: "Casa Moderna en Zona Norte",
    direccion: "Calle 123 #45-67, Medellín",
    fecha: "2024-01-25",
    hora: "10:00",
    tipo: "visita",
    estado: "confirmada",
    notas: "Cliente interesado en compra inmediata",
    fechaCreacion: "2024-01-20",
  },
  {
    id: 2,
    cliente: "Ana López",
    telefono: "+57 301 234 5678",
    correo: "ana.lopez@email.com",
    agente: "Carlos Ruiz",
    propiedad: "Apartamento Centro Histórico",
    direccion: "Carrera 50 #30-20, Medellín",
    fecha: "2024-01-26",
    hora: "14:30",
    tipo: "asesoria",
    estado: "programada",
    notas: "Primera cita, requiere información detallada",
    fechaCreacion: "2024-01-21",
  },
  {
    id: 3,
    cliente: "Carlos Mendoza",
    telefono: "+57 302 345 6789",
    correo: "carlos.mendoza@email.com",
    agente: "María González",
    propiedad: "Villa con Piscina",
    direccion: "Transversal 80 #100-50, Envigado",
    fecha: "2024-01-24",
    hora: "16:00",
    tipo: "firma",
    estado: "completada",
    notas: "Firma de contrato de compraventa exitosa",
    fechaCreacion: "2024-01-18",
  },
]

const tiposCita = ["visita", "asesoria", "firma", "evaluacion"]
const agentes = ["María González", "Carlos Ruiz", "Ana López", "Juan Pérez"]
const propiedades = [
  "Casa Moderna en Zona Norte",
  "Apartamento Centro Histórico",
  "Villa con Piscina",
  "Apartaestudio Laureles",
  "Local Comercial Centro",
]

export default function CitasPage() {
  const [appointments, setAppointments] = useState<Cita[]>(initialAppointments)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterTipo, setFilterTipo] = useState<string>("todos")
  const [filterEstado, setFilterEstado] = useState<string>("todos")
  const [filterFecha, setFilterFecha] = useState<string>("todos")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Cita | null>(null)
  const [formData, setFormData] = useState({
    cliente: "",
    telefono: "",
    correo: "",
    agente: "",
    propiedad: "",
    direccion: "",
    fecha: "",
    hora: "",
    tipo: "",
    notas: "",
  })
  const { toast } = useToast()

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.agente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.propiedad.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTipo = filterTipo === "todos" || appointment.tipo === filterTipo
    const matchesEstado = filterEstado === "todos" || appointment.estado === filterEstado

    let matchesFecha = true
    if (filterFecha !== "todos") {
      const today = new Date()
      const appointmentDate = new Date(appointment.fecha)

      switch (filterFecha) {
        case "hoy":
          matchesFecha = appointmentDate.toDateString() === today.toDateString()
          break
        case "semana":
          const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
          matchesFecha = appointmentDate >= today && appointmentDate <= weekFromNow
          break
        case "mes":
          const monthFromNow = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())
          matchesFecha = appointmentDate >= today && appointmentDate <= monthFromNow
          break
      }
    }

    return matchesSearch && matchesTipo && matchesEstado && matchesFecha
  })

  const validateForm = () => {
    if (!formData.cliente.trim()) {
      toast({
        variant: "destructive",
        title: "Campo requerido",
        description: "El nombre del cliente es obligatorio.",
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

    if (!formData.correo.trim() || !formData.correo.includes("@")) {
      toast({
        variant: "destructive",
        title: "Email inválido",
        description: "Por favor, ingresa un email válido.",
      })
      return false
    }

    if (!formData.agente) {
      toast({
        variant: "destructive",
        title: "Campo requerido",
        description: "Debe seleccionar un agente.",
      })
      return false
    }

    if (!formData.propiedad) {
      toast({
        variant: "destructive",
        title: "Campo requerido",
        description: "Debe seleccionar una propiedad.",
      })
      return false
    }

    if (!formData.fecha) {
      toast({
        variant: "destructive",
        title: "Campo requerido",
        description: "La fecha es obligatoria.",
      })
      return false
    }

    if (!formData.hora) {
      toast({
        variant: "destructive",
        title: "Campo requerido",
        description: "La hora es obligatoria.",
      })
      return false
    }

    if (!formData.tipo) {
      toast({
        variant: "destructive",
        title: "Campo requerido",
        description: "Debe seleccionar un tipo de cita.",
      })
      return false
    }

    // Validar que la fecha no sea en el pasado
    const selectedDate = new Date(`${formData.fecha}T${formData.hora}`)
    const now = new Date()

    if (selectedDate < now) {
      toast({
        variant: "destructive",
        title: "Fecha inválida",
        description: "No se pueden programar citas en el pasado.",
      })
      return false
    }

    return true
  }

  const handleCreateAppointment = () => {
    if (!validateForm()) return

    const newAppointment: Cita = {
      id: Math.max(...appointments.map((a) => a.id)) + 1,
      cliente: formData.cliente,
      telefono: formData.telefono,
      correo: formData.correo,
      agente: formData.agente,
      propiedad: formData.propiedad,
      direccion: formData.direccion,
      fecha: formData.fecha,
      hora: formData.hora,
      tipo: formData.tipo as "visita" | "asesoria" | "firma" | "evaluacion",
      estado: "programada",
      notas: formData.notas,
      fechaCreacion: new Date().toISOString().split("T")[0],
    }

    setAppointments([...appointments, newAppointment])
    setIsCreateDialogOpen(false)
    resetForm()

    toast({
      title: "Cita programada",
      description: `Cita con ${newAppointment.cliente} programada para el ${new Date(newAppointment.fecha).toLocaleDateString("es-ES")}.`,
    })
  }

  const handleEditAppointment = () => {
    if (!validateForm() || !selectedAppointment) return

    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === selectedAppointment.id
        ? {
            ...appointment,
            cliente: formData.cliente,
            telefono: formData.telefono,
            correo: formData.correo,
            agente: formData.agente,
            propiedad: formData.propiedad,
            direccion: formData.direccion,
            fecha: formData.fecha,
            hora: formData.hora,
            tipo: formData.tipo as "visita" | "asesoria" | "firma" | "evaluacion",
            notas: formData.notas,
          }
        : appointment,
    )

    setAppointments(updatedAppointments)
    setIsEditDialogOpen(false)
    resetForm()

    toast({
      title: "Cita actualizada",
      description: `La cita con ${formData.cliente} ha sido actualizada exitosamente.`,
    })
  }

  const handleDeleteAppointment = (appointment: Cita) => {
    setAppointments(appointments.filter((a) => a.id !== appointment.id))
    toast({
      title: "Cita eliminada",
      description: `La cita con ${appointment.cliente} ha sido eliminada.`,
    })
  }

  const updateAppointmentStatus = (appointment: Cita, newStatus: Cita["estado"]) => {
    const updatedAppointments = appointments.map((a) => (a.id === appointment.id ? { ...a, estado: newStatus } : a))
    setAppointments(updatedAppointments)

    toast({
      title: "Estado actualizado",
      description: `La cita con ${appointment.cliente} ahora está ${newStatus}.`,
    })
  }

  const resetForm = () => {
    setFormData({
      cliente: "",
      telefono: "",
      correo: "",
      agente: "",
      propiedad: "",
      direccion: "",
      fecha: "",
      hora: "",
      tipo: "",
      notas: "",
    })
    setSelectedAppointment(null)
  }

  const openEditDialog = (appointment: Cita) => {
    setSelectedAppointment(appointment)
    setFormData({
      cliente: appointment.cliente,
      telefono: appointment.telefono,
      correo: appointment.correo,
      agente: appointment.agente,
      propiedad: appointment.propiedad,
      direccion: appointment.direccion,
      fecha: appointment.fecha,
      hora: appointment.hora,
      tipo: appointment.tipo,
      notas: appointment.notas,
    })
    setIsEditDialogOpen(true)
  }

  const openViewDialog = (appointment: Cita) => {
    setSelectedAppointment(appointment)
    setIsViewDialogOpen(true)
  }

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "programada":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "confirmada":
        return "bg-green-100 text-green-800 border-green-200"
      case "completada":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "cancelada":
        return "bg-red-100 text-red-800 border-red-200"
      case "reprogramada":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "visita":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "asesoria":
        return "bg-green-100 text-green-800 border-green-200"
      case "firma":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "evaluacion":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Calendar className="h-8 w-8 text-purple-600" />
            Gestión de Citas
          </h1>
          <p className="text-gray-600">Programa y administra las citas con clientes</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              Nueva Cita
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Programar Nueva Cita</DialogTitle>
              <DialogDescription>Programa una nueva cita con un cliente</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cliente">Cliente *</Label>
                <Input
                  id="cliente"
                  placeholder="Juan Pérez"
                  value={formData.cliente}
                  onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
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
              <div className="space-y-2 col-span-2">
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
                <Label htmlFor="agente">Agente Asignado *</Label>
                <Select value={formData.agente} onValueChange={(value) => setFormData({ ...formData, agente: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar agente" />
                  </SelectTrigger>
                  <SelectContent>
                    {agentes.map((agente) => (
                      <SelectItem key={agente} value={agente}>
                        {agente}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Cita *</Label>
                <Select value={formData.tipo} onValueChange={(value) => setFormData({ ...formData, tipo: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposCita.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="propiedad">Propiedad *</Label>
                <Select
                  value={formData.propiedad}
                  onValueChange={(value) => setFormData({ ...formData, propiedad: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar propiedad" />
                  </SelectTrigger>
                  <SelectContent>
                    {propiedades.map((propiedad) => (
                      <SelectItem key={propiedad} value={propiedad}>
                        {propiedad}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="direccion">Dirección</Label>
                <Input
                  id="direccion"
                  placeholder="Calle 123 #45-67, Medellín"
                  value={formData.direccion}
                  onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fecha">Fecha *</Label>
                <Input
                  id="fecha"
                  type="date"
                  value={formData.fecha}
                  onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hora">Hora *</Label>
                <Input
                  id="hora"
                  type="time"
                  value={formData.hora}
                  onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="notas">Notas</Label>
                <Textarea
                  id="notas"
                  placeholder="Notas adicionales sobre la cita..."
                  value={formData.notas}
                  onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateAppointment} className="bg-purple-600 hover:bg-purple-700">
                Programar Cita
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar citas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterTipo} onValueChange={setFilterTipo}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los tipos</SelectItem>
                {tiposCita.map((tipo) => (
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
                <SelectItem value="programada">Programada</SelectItem>
                <SelectItem value="confirmada">Confirmada</SelectItem>
                <SelectItem value="completada">Completada</SelectItem>
                <SelectItem value="cancelada">Cancelada</SelectItem>
                <SelectItem value="reprogramada">Reprogramada</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterFecha} onValueChange={setFilterFecha}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por fecha" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas las fechas</SelectItem>
                <SelectItem value="hoy">Hoy</SelectItem>
                <SelectItem value="semana">Esta semana</SelectItem>
                <SelectItem value="mes">Este mes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Appointments Table */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 border-b">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Calendar className="h-6 w-6 text-blue-600" />
            Lista de Citas
          </CardTitle>
          <CardDescription className="text-gray-600">Gestiona todas las citas programadas con clientes</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/80 hover:bg-gray-50/80 border-b-2">
                  <TableHead className="font-semibold text-gray-700 py-4 px-6">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Cliente
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-6">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Agente
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-6">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Propiedad
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Fecha y Hora
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-6">Tipo</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-6 text-center">Estado</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-6 text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.map((appointment, index) => (
                  <TableRow
                    key={appointment.id}
                    className={`hover:bg-blue-50/50 transition-colors border-b ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                    }`}
                  >
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                          <User className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-base">{appointment.cliente}</div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Phone className="h-3 w-3" />
                            {appointment.telefono}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded bg-purple-100 flex items-center justify-center">
                          <User className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="font-medium text-gray-700">{appointment.agente}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <div>
                        <div className="font-medium text-gray-900">{appointment.propiedad}</div>
                        {appointment.direccion && (
                          <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                            <MapPin className="h-3 w-3" />
                            {appointment.direccion}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded bg-blue-100 flex items-center justify-center">
                            <Calendar className="h-3 w-3 text-blue-600" />
                          </div>
                          <span className="font-medium text-gray-900">
                            {new Date(appointment.fecha).toLocaleDateString("es-ES")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded bg-green-100 flex items-center justify-center">
                            <Clock className="h-3 w-3 text-green-600" />
                          </div>
                          <span className="text-sm text-gray-600">{appointment.hora}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <Badge className={getTipoColor(appointment.tipo)}>
                        {appointment.tipo.charAt(0).toUpperCase() + appointment.tipo.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-center">
                      <Select
                        value={appointment.estado}
                        onValueChange={(value) => updateAppointmentStatus(appointment, value as Cita["estado"])}
                      >
                        <SelectTrigger className="w-auto border-0 bg-transparent p-0 h-auto">
                          <Badge className={getEstadoColor(appointment.estado)}>
                            <div className="flex items-center gap-1">
                              <div
                                className={`h-2 w-2 rounded-full ${
                                  appointment.estado === "confirmada"
                                    ? "bg-green-500"
                                    : appointment.estado === "completada"
                                      ? "bg-purple-500"
                                      : appointment.estado === "cancelada"
                                        ? "bg-red-500"
                                        : appointment.estado === "reprogramada"
                                          ? "bg-yellow-500"
                                          : "bg-blue-500"
                                }`}
                              />
                              {appointment.estado.charAt(0).toUpperCase() + appointment.estado.slice(1)}
                            </div>
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="programada">Programada</SelectItem>
                          <SelectItem value="confirmada">Confirmada</SelectItem>
                          <SelectItem value="completada">Completada</SelectItem>
                          <SelectItem value="cancelada">Cancelada</SelectItem>
                          <SelectItem value="reprogramada">Reprogramada</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openViewDialog(appointment)}
                          className="h-9 w-9 p-0 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(appointment)}
                          className="h-9 w-9 p-0 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-9 w-9 p-0 hover:bg-red-50 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Eliminar cita?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Se eliminará permanentemente la cita con{" "}
                                <strong>{appointment.cliente}</strong>.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteAppointment(appointment)}
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
            <DialogTitle>Editar Cita</DialogTitle>
            <DialogDescription>Modifica la información de la cita</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-cliente">Cliente *</Label>
              <Input
                id="edit-cliente"
                placeholder="Juan Pérez"
                value={formData.cliente}
                onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
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
            <div className="space-y-2 col-span-2">
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
              <Label htmlFor="edit-agente">Agente Asignado *</Label>
              <Select value={formData.agente} onValueChange={(value) => setFormData({ ...formData, agente: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar agente" />
                </SelectTrigger>
                <SelectContent>
                  {agentes.map((agente) => (
                    <SelectItem key={agente} value={agente}>
                      {agente}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-tipo">Tipo de Cita *</Label>
              <Select value={formData.tipo} onValueChange={(value) => setFormData({ ...formData, tipo: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  {tiposCita.map((tipo) => (
                    <SelectItem key={tipo} value={tipo}>
                      {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="edit-propiedad">Propiedad *</Label>
              <Select
                value={formData.propiedad}
                onValueChange={(value) => setFormData({ ...formData, propiedad: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar propiedad" />
                </SelectTrigger>
                <SelectContent>
                  {propiedades.map((propiedad) => (
                    <SelectItem key={propiedad} value={propiedad}>
                      {propiedad}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="edit-direccion">Dirección</Label>
              <Input
                id="edit-direccion"
                placeholder="Calle 123 #45-67, Medellín"
                value={formData.direccion}
                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-fecha">Fecha *</Label>
              <Input
                id="edit-fecha"
                type="date"
                value={formData.fecha}
                onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-hora">Hora *</Label>
              <Input
                id="edit-hora"
                type="time"
                value={formData.hora}
                onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="edit-notas">Notas</Label>
              <Textarea
                id="edit-notas"
                placeholder="Notas adicionales sobre la cita..."
                value={formData.notas}
                onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditAppointment} className="bg-purple-600 hover:bg-purple-700">
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalles de la Cita</DialogTitle>
            <DialogDescription>Información completa de la cita</DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">Cita con {selectedAppointment.cliente}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getTipoColor(selectedAppointment.tipo)}>
                      {selectedAppointment.tipo.charAt(0).toUpperCase() + selectedAppointment.tipo.slice(1)}
                    </Badge>
                    <Badge className={getEstadoColor(selectedAppointment.estado)}>
                      {selectedAppointment.estado.charAt(0).toUpperCase() + selectedAppointment.estado.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Fecha</Label>
                  <p className="text-lg font-semibold flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    {new Date(selectedAppointment.fecha).toLocaleDateString("es-ES")}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Hora</Label>
                  <p className="text-lg font-semibold flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    {selectedAppointment.hora}
                  </p>
                </div>
                <div className="col-span-2">
                  <Label className="text-sm font-medium text-gray-500">Agente Asignado</Label>
                  <p className="text-lg font-semibold flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" />
                    {selectedAppointment.agente}
                  </p>
                </div>
                <div className="col-span-2">
                  <Label className="text-sm font-medium text-gray-500">Propiedad</Label>
                  <p className="text-lg font-semibold">{selectedAppointment.propiedad}</p>
                  {selectedAppointment.direccion && (
                    <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {selectedAppointment.direccion}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Teléfono</Label>
                  <p className="text-lg font-semibold flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    {selectedAppointment.telefono}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Correo</Label>
                  <p className="text-lg font-semibold">{selectedAppointment.correo}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-sm font-medium text-gray-500">Fecha de Creación</Label>
                  <p className="text-lg font-semibold">
                    {new Date(selectedAppointment.fechaCreacion).toLocaleDateString("es-ES")}
                  </p>
                </div>
                {selectedAppointment.notas && (
                  <div className="col-span-2">
                    <Label className="text-sm font-medium text-gray-500">Notas</Label>
                    <p className="text-gray-700 mt-1 p-3 bg-gray-50 rounded-lg">{selectedAppointment.notas}</p>
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
  )
}
