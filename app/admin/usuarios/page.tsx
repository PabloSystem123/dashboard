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
import { User, Plus, Edit, Eye, Trash2, Search, Mail, Calendar, Shield } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Usuario {
  id: number
  nombre: string
  apellido: string
  correo: string
  rol: string
  estado: "activo" | "inactivo" | "suspendido"
  fechaCreacion: string
  ultimoAcceso: string
  intentosFallidos: number
}

const initialUsers: Usuario[] = [
  {
    id: 1,
    nombre: "Admin",
    apellido: "Principal",
    correo: "admin@matriz.com",
    rol: "Administrador",
    estado: "activo",
    fechaCreacion: "2024-01-01",
    ultimoAcceso: "2024-01-20",
    intentosFallidos: 0,
  },
  {
    id: 2,
    nombre: "Sub",
    apellido: "Admin",
    correo: "subadmin@matriz.com",
    rol: "Sub-Administrador",
    estado: "activo",
    fechaCreacion: "2024-01-02",
    ultimoAcceso: "2024-01-19",
    intentosFallidos: 0,
  },
  {
    id: 3,
    nombre: "Juan",
    apellido: "Pérez",
    correo: "usuario@matriz.com",
    rol: "Cliente",
    estado: "activo",
    fechaCreacion: "2024-01-15",
    ultimoAcceso: "2024-01-18",
    intentosFallidos: 0,
  },
  {
    id: 4,
    nombre: "María",
    apellido: "González",
    correo: "maria.gonzalez@matriz.com",
    rol: "Agente",
    estado: "activo",
    fechaCreacion: "2024-01-10",
    ultimoAcceso: "2024-01-17",
    intentosFallidos: 1,
  },
  {
    id: 5,
    nombre: "Carlos",
    apellido: "Ruiz",
    correo: "carlos.ruiz@matriz.com",
    rol: "Agente",
    estado: "suspendido",
    fechaCreacion: "2024-01-05",
    ultimoAcceso: "2024-01-10",
    intentosFallidos: 3,
  },
]

const roles = ["Administrador", "Sub-Administrador", "Agente", "Cliente"]

export default function UsuariosPage() {
  const [users, setUsers] = useState<Usuario[]>(initialUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRol, setFilterRol] = useState<string>("todos")
  const [filterEstado, setFilterEstado] = useState<string>("todos")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null)
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    rol: "",
    password: "",
    confirmPassword: "",
  })
  const { toast } = useToast()

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.correo.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRol = filterRol === "todos" || user.rol === filterRol
    const matchesEstado = filterEstado === "todos" || user.estado === filterEstado

    return matchesSearch && matchesRol && matchesEstado
  })

  const validateForm = (isEdit = false) => {
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

    if (!formData.rol) {
      toast({
        variant: "destructive",
        title: "Campo requerido",
        description: "Debe seleccionar un rol.",
      })
      return false
    }

    if (!isEdit) {
      if (!formData.password.trim()) {
        toast({
          variant: "destructive",
          title: "Campo requerido",
          description: "La contraseña es obligatoria.",
        })
        return false
      }

      if (formData.password.length < 6) {
        toast({
          variant: "destructive",
          title: "Contraseña muy corta",
          description: "La contraseña debe tener al menos 6 caracteres.",
        })
        return false
      }

      if (formData.password !== formData.confirmPassword) {
        toast({
          variant: "destructive",
          title: "Contraseñas no coinciden",
          description: "Las contraseñas deben ser iguales.",
        })
        return false
      }
    }

    // Verificar email duplicado
    const existingUser = users.find(
      (user) => user.correo === formData.correo && (!selectedUser || user.id !== selectedUser.id),
    )

    if (existingUser) {
      toast({
        variant: "destructive",
        title: "Email duplicado",
        description: "Ya existe un usuario con este email.",
      })
      return false
    }

    return true
  }

  const handleCreateUser = () => {
    if (!validateForm()) return

    const newUser: Usuario = {
      id: Math.max(...users.map((u) => u.id)) + 1,
      nombre: formData.nombre,
      apellido: formData.apellido,
      correo: formData.correo,
      rol: formData.rol,
      estado: "activo",
      fechaCreacion: new Date().toISOString().split("T")[0],
      ultimoAcceso: "Nunca",
      intentosFallidos: 0,
    }

    setUsers([...users, newUser])
    setIsCreateDialogOpen(false)
    resetForm()

    toast({
      title: "Usuario creado",
      description: `${newUser.nombre} ${newUser.apellido} ha sido creado exitosamente.`,
    })
  }

  const handleEditUser = () => {
    if (!validateForm(true) || !selectedUser) return

    const updatedUsers = users.map((user) =>
      user.id === selectedUser.id
        ? {
            ...user,
            nombre: formData.nombre,
            apellido: formData.apellido,
            correo: formData.correo,
            rol: formData.rol,
          }
        : user,
    )

    setUsers(updatedUsers)
    setIsEditDialogOpen(false)
    resetForm()

    toast({
      title: "Usuario actualizado",
      description: `${formData.nombre} ${formData.apellido} ha sido actualizado exitosamente.`,
    })
  }

  const handleDeleteUser = (user: Usuario) => {
    if (
      user.rol === "Administrador" &&
      users.filter((u) => u.rol === "Administrador" && u.estado === "activo").length === 1
    ) {
      toast({
        variant: "destructive",
        title: "No se puede eliminar",
        description: "Debe haber al menos un administrador activo en el sistema.",
      })
      return
    }

    setUsers(users.filter((u) => u.id !== user.id))
    toast({
      title: "Usuario eliminado",
      description: `${user.nombre} ${user.apellido} ha sido eliminado del sistema.`,
    })
  }

  const toggleUserStatus = (user: Usuario) => {
    if (
      user.rol === "Administrador" &&
      user.estado === "activo" &&
      users.filter((u) => u.rol === "Administrador" && u.estado === "activo").length === 1
    ) {
      toast({
        variant: "destructive",
        title: "No se puede desactivar",
        description: "Debe haber al menos un administrador activo en el sistema.",
      })
      return
    }

    const newStatus = user.estado === "activo" ? "inactivo" : "activo"
    const updatedUsers = users.map((u) => (u.id === user.id ? { ...u, estado: newStatus } : u))
    setUsers(updatedUsers)

    toast({
      title: "Estado actualizado",
      description: `${user.nombre} ${user.apellido} ahora está ${newStatus}.`,
    })
  }

  const resetUserAttempts = (user: Usuario) => {
    const updatedUsers = users.map((u) => (u.id === user.id ? { ...u, intentosFallidos: 0, estado: "activo" } : u))
    setUsers(updatedUsers)

    toast({
      title: "Intentos reiniciados",
      description: `Se han reiniciado los intentos fallidos de ${user.nombre} ${user.apellido}.`,
    })
  }

  const resetForm = () => {
    setFormData({
      nombre: "",
      apellido: "",
      correo: "",
      rol: "",
      password: "",
      confirmPassword: "",
    })
    setSelectedUser(null)
  }

  const openEditDialog = (user: Usuario) => {
    setSelectedUser(user)
    setFormData({
      nombre: user.nombre,
      apellido: user.apellido,
      correo: user.correo,
      rol: user.rol,
      password: "",
      confirmPassword: "",
    })
    setIsEditDialogOpen(true)
  }

  const openViewDialog = (user: Usuario) => {
    setSelectedUser(user)
    setIsViewDialogOpen(true)
  }

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "activo":
        return "bg-green-100 text-green-800 border-green-200"
      case "inactivo":
        return "bg-red-100 text-red-800 border-red-200"
      case "suspendido":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getRolColor = (rol: string) => {
    switch (rol) {
      case "Administrador":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Sub-Administrador":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Agente":
        return "bg-green-100 text-green-800 border-green-200"
      case "Cliente":
        return "bg-gray-100 text-gray-800 border-gray-200"
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
            <User className="h-8 w-8 text-purple-600" />
            Gestión de Usuarios
          </h1>
          <p className="text-gray-600">Administra las cuentas de usuario del sistema</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Usuario
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Usuario</DialogTitle>
              <DialogDescription>Crea una nueva cuenta de usuario en el sistema</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
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
              <div className="space-y-2 col-span-2">
                <Label htmlFor="correo">Correo Electrónico *</Label>
                <Input
                  id="correo"
                  type="email"
                  placeholder="usuario@matriz.com"
                  value={formData.correo}
                  onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                />
              </div>
              <div className="space-y-2 col-span-2">
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
                <Label htmlFor="password">Contraseña *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Contraseña *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateUser} className="bg-purple-600 hover:bg-purple-700">
                Crear Usuario
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar usuarios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterRol} onValueChange={setFilterRol}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los roles</SelectItem>
                {roles.map((rol) => (
                  <SelectItem key={rol} value={rol}>
                    {rol}
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
                <SelectItem value="suspendido">Suspendido</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 border-b">
          <CardTitle className="flex items-center gap-2 text-xl">
            <User className="h-6 w-6 text-purple-600" />
            Lista de Usuarios
          </CardTitle>
          <CardDescription className="text-gray-600">Gestiona todas las cuentas de usuario del sistema</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/80 hover:bg-gray-50/80 border-b-2">
                  <TableHead className="font-semibold text-gray-700 py-4 px-6">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Usuario
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Correo
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Rol
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-6 text-center">Estado</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-6">Último Acceso</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-6 text-center">Intentos</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-6 text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user, index) => (
                  <TableRow
                    key={user.id}
                    className={`hover:bg-purple-50/50 transition-colors border-b ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                    }`}
                  >
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                          <User className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-base">
                            {user.nombre} {user.apellido}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {user.id} • Creado: {new Date(user.fechaCreacion).toLocaleDateString("es-ES")}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center">
                          <Mail className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-gray-700">{user.correo}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <Badge className={getRolColor(user.rol)}>
                        <div className="flex items-center gap-1">
                          <Shield className="h-3 w-3" />
                          {user.rol}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-center">
                      <Badge
                        className={`cursor-pointer transition-all duration-200 ${getEstadoColor(user.estado)}`}
                        onClick={() => toggleUserStatus(user)}
                      >
                        <div className="flex items-center gap-1">
                          <div
                            className={`h-2 w-2 rounded-full ${
                              user.estado === "activo"
                                ? "bg-green-500"
                                : user.estado === "suspendido"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                          />
                          {user.estado.charAt(0).toUpperCase() + user.estado.slice(1)}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="h-6 w-6 rounded bg-green-100 flex items-center justify-center">
                          <Calendar className="h-3 w-3 text-green-600" />
                        </div>
                        <span>
                          {user.ultimoAcceso === "Nunca"
                            ? "Nunca"
                            : new Date(user.ultimoAcceso).toLocaleDateString("es-ES")}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Badge variant={user.intentosFallidos > 0 ? "destructive" : "secondary"}>
                          {user.intentosFallidos}
                        </Badge>
                        {user.intentosFallidos > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => resetUserAttempts(user)}
                            className="text-xs text-blue-600 hover:text-blue-700 h-6 px-2"
                          >
                            Reiniciar
                          </Button>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openViewDialog(user)}
                          className="h-9 w-9 p-0 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(user)}
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
                              <AlertDialogTitle>¿Eliminar usuario?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Se eliminará permanentemente la cuenta de{" "}
                                <strong>
                                  {user.nombre} {user.apellido}
                                </strong>{" "}
                                del sistema.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteUser(user)}
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
            <DialogTitle>Editar Usuario</DialogTitle>
            <DialogDescription>Modifica la información del usuario</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
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
            <div className="space-y-2 col-span-2">
              <Label htmlFor="edit-correo">Correo Electrónico *</Label>
              <Input
                id="edit-correo"
                type="email"
                placeholder="usuario@matriz.com"
                value={formData.correo}
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
              />
            </div>
            <div className="space-y-2 col-span-2">
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditUser} className="bg-purple-600 hover:bg-purple-700">
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Información del Usuario</DialogTitle>
            <DialogDescription>Detalles completos del usuario</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedUser.nombre} {selectedUser.apellido}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getRolColor(selectedUser.rol)}>
                      <Shield className="h-3 w-3 mr-1" />
                      {selectedUser.rol}
                    </Badge>
                    <Badge className={getEstadoColor(selectedUser.estado)}>
                      {selectedUser.estado.charAt(0).toUpperCase() + selectedUser.estado.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">ID de Usuario</Label>
                  <p className="text-lg font-semibold">{selectedUser.id}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Fecha de Creación</Label>
                  <p className="text-lg font-semibold">
                    {new Date(selectedUser.fechaCreacion).toLocaleDateString("es-ES")}
                  </p>
                </div>
                <div className="col-span-2">
                  <Label className="text-sm font-medium text-gray-500">Correo Electrónico</Label>
                  <p className="text-lg font-semibold flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    {selectedUser.correo}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Último Acceso</Label>
                  <p className="text-lg font-semibold flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    {selectedUser.ultimoAcceso === "Nunca"
                      ? "Nunca"
                      : new Date(selectedUser.ultimoAcceso).toLocaleDateString("es-ES")}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Intentos Fallidos</Label>
                  <div className="flex items-center gap-2">
                    <Badge variant={selectedUser.intentosFallidos > 0 ? "destructive" : "secondary"}>
                      {selectedUser.intentosFallidos}
                    </Badge>
                    {selectedUser.intentosFallidos > 2 && (
                      <span className="text-sm text-red-600">⚠️ Cuenta en riesgo</span>
                    )}
                  </div>
                </div>
              </div>

              {selectedUser.intentosFallidos > 0 && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Alerta de Seguridad</span>
                  </div>
                  <p className="text-sm text-yellow-700">
                    Este usuario ha tenido {selectedUser.intentosFallidos} intento(s) de acceso fallido(s).
                    {selectedUser.intentosFallidos >= 3 && " La cuenta puede estar comprometida."}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => resetUserAttempts(selectedUser)}
                    className="mt-2 text-yellow-700 border-yellow-300 hover:bg-yellow-100"
                  >
                    Reiniciar Intentos
                  </Button>
                </div>
              )}
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
