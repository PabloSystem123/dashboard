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
import { UserCheck, Plus, Edit, Eye, Trash2, Search, Phone, Mail, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Employee {
  id: number
  documento: string
  nombre: string
  apellido: string
  correo: string
  numero: string
  rol: string
  estado: "activo" | "inactivo"
  fechaIngreso: string
}

const initialEmployees: Employee[] = [
  {
    id: 1,
    documento: "12345678",
    nombre: "María",
    apellido: "González",
    correo: "maria.gonzalez@matriz.com",
    numero: "+57 300 123 4567",
    rol: "Agente Senior",
    estado: "activo",
    fechaIngreso: "2023-01-15",
  },
  {
    id: 2,
    documento: "87654321",
    nombre: "Carlos",
    apellido: "Ruiz",
    correo: "carlos.ruiz@matriz.com",
    numero: "+57 301 234 5678",
    rol: "Agente",
    estado: "activo",
    fechaIngreso: "2023-03-20",
  },
  {
    id: 3,
    documento: "11223344",
    nombre: "Ana",
    apellido: "López",
    correo: "ana.lopez@matriz.com",
    numero: "+57 302 345 6789",
    rol: "Asistente",
    estado: "inactivo",
    fechaIngreso: "2023-06-10",
  },
]

const roles = ["Administrador", "Sub-Administrador", "Agente Senior", "Agente", "Asistente"]

export default function EmpleadosPage() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [formData, setFormData] = useState({
    documento: "",
    nombre: "",
    apellido: "",
    correo: "",
    numero: "",
    rol: "",
  })
  const { toast } = useToast()

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.documento.includes(searchTerm),
  )

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

    if (!formData.numero.trim()) {
      toast({
        variant: "destructive",
        title: "Campo requerido",
        description: "El número de teléfono es obligatorio.",
      })
      return false
    }

    if (!formData.rol) {
      toast({
        variant: "destructive",
        title: "Campo requerido",
        description: "Debe seleccionar un rol.",
      })
      return false
    }

    // Verificar documento duplicado
    const existingEmployee = employees.find(
      (emp) => emp.documento === formData.documento && (!selectedEmployee || emp.id !== selectedEmployee.id),
    )

    if (existingEmployee) {
      toast({
        variant: "destructive",
        title: "Documento duplicado",
        description: "Ya existe un empleado con este documento.",
      })
      return false
    }

    // Verificar email duplicado
    const existingEmail = employees.find(
      (emp) => emp.correo === formData.correo && (!selectedEmployee || emp.id !== selectedEmployee.id),
    )

    if (existingEmail) {
      toast({
        variant: "destructive",
        title: "Email duplicado",
        description: "Ya existe un empleado con este email.",
      })
      return false
    }

    return true
  }

  const handleCreateEmployee = () => {
    if (!validateForm()) return

    const newEmployee: Employee = {
      id: Math.max(...employees.map((e) => e.id)) + 1,
      documento: formData.documento,
      nombre: formData.nombre,
      apellido: formData.apellido,
      correo: formData.correo,
      numero: formData.numero,
      rol: formData.rol,
      estado: "activo",
      fechaIngreso: new Date().toISOString().split("T")[0],
    }

    setEmployees([...employees, newEmployee])
    setIsCreateDialogOpen(false)
    resetForm()

    toast({
      title: "Empleado creado",
      description: `${newEmployee.nombre} ${newEmployee.apellido} ha sido agregado exitosamente.`,
    })
  }

  const handleEditEmployee = () => {
    if (!validateForm() || !selectedEmployee) return

    const updatedEmployees = employees.map((emp) =>
      emp.id === selectedEmployee.id
        ? {
            ...emp,
            documento: formData.documento,
            nombre: formData.nombre,
            apellido: formData.apellido,
            correo: formData.correo,
            numero: formData.numero,
            rol: formData.rol,
          }
        : emp,
    )

    setEmployees(updatedEmployees)
    setIsEditDialogOpen(false)
    resetForm()

    toast({
      title: "Empleado actualizado",
      description: `${formData.nombre} ${formData.apellido} ha sido actualizado exitosamente.`,
    })
  }

  const handleDeleteEmployee = (employee: Employee) => {
    setEmployees(employees.filter((emp) => emp.id !== employee.id))
    toast({
      title: "Empleado eliminado",
      description: `${employee.nombre} ${employee.apellido} ha sido eliminado del sistema.`,
    })
  }

  const toggleEmployeeStatus = (employee: Employee) => {
    const updatedEmployees = employees.map((emp) =>
      emp.id === employee.id ? { ...emp, estado: emp.estado === "activo" ? "inactivo" : "activo" } : emp,
    )
    setEmployees(updatedEmployees)

    toast({
      title: "Estado actualizado",
      description: `${employee.nombre} ${employee.apellido} ahora está ${employee.estado === "activo" ? "inactivo" : "activo"}.`,
    })
  }

  const resetForm = () => {
    setFormData({
      documento: "",
      nombre: "",
      apellido: "",
      correo: "",
      numero: "",
      rol: "",
    })
    setSelectedEmployee(null)
  }

  const openEditDialog = (employee: Employee) => {
    setSelectedEmployee(employee)
    setFormData({
      documento: employee.documento,
      nombre: employee.nombre,
      apellido: employee.apellido,
      correo: employee.correo,
      numero: employee.numero,
      rol: employee.rol,
    })
    setIsEditDialogOpen(true)
  }

  const openViewDialog = (employee: Employee) => {
    setSelectedEmployee(employee)
    setIsViewDialogOpen(true)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <UserCheck className="h-8 w-8 text-purple-600" />
            Gestión de Empleados
          </h1>
          <p className="text-gray-600">Administra el equipo de trabajo de la inmobiliaria</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Empleado
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Empleado</DialogTitle>
              <DialogDescription>Ingresa la información del nuevo empleado</DialogDescription>
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
                <Label htmlFor="rol">Rol *</Label>
                <Select value={formData.rol} onValueChange={(value) => setFormData({ ...formData, rol: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar rol" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((rol) => (
                      <SelectItem key={rol} value={rol}>
                        {rol}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre *</Label>
                <Input
                  id="nombre"
                  placeholder="María"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellido">Apellido *</Label>
                <Input
                  id="apellido"
                  placeholder="González"
                  value={formData.apellido}
                  onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="correo">Correo Electrónico *</Label>
                <Input
                  id="correo"
                  type="email"
                  placeholder="maria.gonzalez@matriz.com"
                  value={formData.correo}
                  onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="numero">Número de Teléfono *</Label>
                <Input
                  id="numero"
                  placeholder="+57 300 123 4567"
                  value={formData.numero}
                  onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateEmployee} className="bg-purple-600 hover:bg-purple-700">
                Crear Empleado
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar empleados por nombre, apellido, email o documento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Employees Table */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
          <CardTitle className="flex items-center gap-2 text-xl">
            <UserCheck className="h-6 w-6 text-purple-600" />
            Lista de Empleados
          </CardTitle>
          <CardDescription className="text-gray-600">
            Gestiona la información de todos los empleados de la empresa
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/80 hover:bg-gray-50/80 border-b-2">
                  <TableHead className="font-semibold text-gray-700 py-4 px-6">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Empleado
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Contacto
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-6">Rol</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-6 text-center">Estado</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-6 text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee, index) => (
                  <TableRow
                    key={employee.id}
                    className={`hover:bg-blue-50/50 transition-colors border-b ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                    }`}
                  >
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                          <User className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-base">
                            {employee.nombre} {employee.apellido}
                          </div>
                          <div className="text-sm text-gray-500">ID: {employee.documento}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="h-6 w-6 rounded bg-blue-100 flex items-center justify-center">
                            <Mail className="h-3 w-3 text-blue-600" />
                          </div>
                          <span className="text-gray-700">{employee.correo}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="h-6 w-6 rounded bg-green-100 flex items-center justify-center">
                            <Phone className="h-3 w-3 text-green-600" />
                          </div>
                          <span className="text-gray-700">{employee.numero}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 font-medium">
                        {employee.rol}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-center">
                      <Badge
                        className={`cursor-pointer transition-all duration-200 ${
                          employee.estado === "activo"
                            ? "bg-green-100 text-green-800 border-green-200 hover:bg-green-200"
                            : "bg-red-100 text-red-800 border-red-200 hover:bg-red-200"
                        }`}
                        onClick={() => toggleEmployeeStatus(employee)}
                      >
                        <div className="flex items-center gap-1">
                          <div
                            className={`h-2 w-2 rounded-full ${
                              employee.estado === "activo" ? "bg-green-500" : "bg-red-500"
                            }`}
                          />
                          {employee.estado === "activo" ? "Activo" : "Inactivo"}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openViewDialog(employee)}
                          className="h-9 w-9 p-0 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(employee)}
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
                              <AlertDialogTitle>¿Eliminar empleado?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Se eliminará permanentemente a{" "}
                                <strong>
                                  {employee.nombre} {employee.apellido}
                                </strong>{" "}
                                del sistema.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteEmployee(employee)}
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Empleado</DialogTitle>
            <DialogDescription>Modifica la información del empleado</DialogDescription>
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
              <Label htmlFor="edit-rol">Rol *</Label>
              <Select value={formData.rol} onValueChange={(value) => setFormData({ ...formData, rol: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar rol" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((rol) => (
                    <SelectItem key={rol} value={rol}>
                      {rol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-nombre">Nombre *</Label>
              <Input
                id="edit-nombre"
                placeholder="María"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-apellido">Apellido *</Label>
              <Input
                id="edit-apellido"
                placeholder="González"
                value={formData.apellido}
                onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="edit-correo">Correo Electrónico *</Label>
              <Input
                id="edit-correo"
                type="email"
                placeholder="maria.gonzalez@matriz.com"
                value={formData.correo}
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="edit-numero">Número de Teléfono *</Label>
              <Input
                id="edit-numero"
                placeholder="+57 300 123 4567"
                value={formData.numero}
                onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditEmployee} className="bg-purple-600 hover:bg-purple-700">
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Información del Empleado</DialogTitle>
            <DialogDescription>Detalles completos del empleado</DialogDescription>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedEmployee.nombre} {selectedEmployee.apellido}
                  </h3>
                  <p className="text-gray-600">{selectedEmployee.rol}</p>
                  <Badge
                    variant={selectedEmployee.estado === "activo" ? "default" : "secondary"}
                    className={
                      selectedEmployee.estado === "activo"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : "bg-red-100 text-red-800 border-red-200"
                    }
                  >
                    {selectedEmployee.estado === "activo" ? "Activo" : "Inactivo"}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Documento</Label>
                  <p className="text-lg font-semibold">{selectedEmployee.documento}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Fecha de Ingreso</Label>
                  <p className="text-lg font-semibold">
                    {new Date(selectedEmployee.fechaIngreso).toLocaleDateString("es-ES")}
                  </p>
                </div>
                <div className="col-span-2">
                  <Label className="text-sm font-medium text-gray-500">Correo Electrónico</Label>
                  <p className="text-lg font-semibold flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    {selectedEmployee.correo}
                  </p>
                </div>
                <div className="col-span-2">
                  <Label className="text-sm font-medium text-gray-500">Número de Teléfono</Label>
                  <p className="text-lg font-semibold flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    {selectedEmployee.numero}
                  </p>
                </div>
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
