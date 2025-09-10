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
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Shield, Plus, Edit, Trash2, Search, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Role {
  id: number
  name: string
  description: string
  permissions: string[]
  userCount: number
  createdAt: string
}

const initialRoles: Role[] = [
  {
    id: 1,
    name: "Administrador",
    description: "Acceso completo al sistema",
    permissions: ["create", "read", "update", "delete", "manage_users", "manage_roles", "view_reports"],
    userCount: 2,
    createdAt: "2024-01-01",
  },
  {
    id: 2,
    name: "Sub-Administrador",
    description: "Gestión de empleados y propiedades",
    permissions: ["create", "read", "update", "manage_properties", "view_reports"],
    userCount: 5,
    createdAt: "2024-01-02",
  },
  {
    id: 3,
    name: "Agente",
    description: "Gestión de clientes y propiedades asignadas",
    permissions: ["read", "update", "manage_clients", "manage_appointments"],
    userCount: 15,
    createdAt: "2024-01-03",
  },
  {
    id: 4,
    name: "Cliente",
    description: "Acceso básico para clientes",
    permissions: ["read", "view_properties", "book_appointments"],
    userCount: 234,
    createdAt: "2024-01-04",
  },
]

const availablePermissions = [
  { id: "create", label: "Crear", description: "Crear nuevos registros" },
  { id: "read", label: "Leer", description: "Ver información" },
  { id: "update", label: "Actualizar", description: "Modificar registros existentes" },
  { id: "delete", label: "Eliminar", description: "Eliminar registros" },
  { id: "manage_users", label: "Gestionar Usuarios", description: "Administrar cuentas de usuario" },
  { id: "manage_roles", label: "Gestionar Roles", description: "Administrar roles y permisos" },
  { id: "manage_properties", label: "Gestionar Propiedades", description: "Administrar inmuebles" },
  { id: "manage_clients", label: "Gestionar Clientes", description: "Administrar información de clientes" },
  { id: "manage_appointments", label: "Gestionar Citas", description: "Programar y gestionar citas" },
  { id: "view_reports", label: "Ver Reportes", description: "Acceso a reportes y estadísticas" },
  { id: "view_properties", label: "Ver Propiedades", description: "Ver listado de propiedades" },
  { id: "book_appointments", label: "Reservar Citas", description: "Agendar citas para visitas" },
]

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>(initialRoles)
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
  })
  const { toast } = useToast()

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCreateRole = () => {
    if (!formData.name.trim()) {
      toast({
        variant: "destructive",
        title: "Error de validación",
        description: "El nombre del rol es obligatorio.",
      })
      return
    }

    if (formData.permissions.length === 0) {
      toast({
        variant: "destructive",
        title: "Error de validación",
        description: "Debe seleccionar al menos un permiso.",
      })
      return
    }

    const newRole: Role = {
      id: Math.max(...roles.map((r) => r.id)) + 1,
      name: formData.name,
      description: formData.description,
      permissions: formData.permissions,
      userCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
    }

    setRoles([...roles, newRole])
    setIsCreateDialogOpen(false)
    setFormData({ name: "", description: "", permissions: [] })

    toast({
      title: "Rol creado",
      description: `El rol "${newRole.name}" ha sido creado exitosamente.`,
    })
  }

  const handleEditRole = () => {
    if (!selectedRole) return

    if (!formData.name.trim()) {
      toast({
        variant: "destructive",
        title: "Error de validación",
        description: "El nombre del rol es obligatorio.",
      })
      return
    }

    if (formData.permissions.length === 0) {
      toast({
        variant: "destructive",
        title: "Error de validación",
        description: "Debe seleccionar al menos un permiso.",
      })
      return
    }

    const updatedRoles = roles.map((role) =>
      role.id === selectedRole.id
        ? {
            ...role,
            name: formData.name,
            description: formData.description,
            permissions: formData.permissions,
          }
        : role,
    )

    setRoles(updatedRoles)
    setIsEditDialogOpen(false)
    setSelectedRole(null)
    setFormData({ name: "", description: "", permissions: [] })

    toast({
      title: "Rol actualizado",
      description: `El rol "${formData.name}" ha sido actualizado exitosamente.`,
    })
  }

  const handleDeleteRole = (role: Role) => {
    if (role.userCount > 0) {
      toast({
        variant: "destructive",
        title: "No se puede eliminar",
        description: `No se puede eliminar el rol "${role.name}" porque tiene ${role.userCount} usuarios asignados.`,
      })
      return
    }

    setRoles(roles.filter((r) => r.id !== role.id))
    toast({
      title: "Rol eliminado",
      description: `El rol "${role.name}" ha sido eliminado exitosamente.`,
    })
  }

  const openEditDialog = (role: Role) => {
    setSelectedRole(role)
    setFormData({
      name: role.name,
      description: role.description,
      permissions: role.permissions,
    })
    setIsEditDialogOpen(true)
  }

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        permissions: [...formData.permissions, permissionId],
      })
    } else {
      setFormData({
        ...formData,
        permissions: formData.permissions.filter((p) => p !== permissionId),
      })
    }
  }

  const getPermissionLabel = (permissionId: string) => {
    const permission = availablePermissions.find((p) => p.id === permissionId)
    return permission ? permission.label : permissionId
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Shield className="h-8 w-8 text-purple-600" />
            Gestión de Roles
          </h1>
          <p className="text-gray-600">Administra los roles y permisos del sistema</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Rol
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Rol</DialogTitle>
              <DialogDescription>Define un nuevo rol con sus respectivos permisos</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Rol</Label>
                <Input
                  id="name"
                  placeholder="Ej: Supervisor"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Input
                  id="description"
                  placeholder="Describe las responsabilidades del rol"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="space-y-3">
                <Label>Permisos</Label>
                <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                  {availablePermissions.map((permission) => (
                    <div key={permission.id} className="flex items-start space-x-2 p-3 border rounded-lg">
                      <Checkbox
                        id={permission.id}
                        checked={formData.permissions.includes(permission.id)}
                        onCheckedChange={(checked) => handlePermissionChange(permission.id, checked as boolean)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor={permission.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {permission.label}
                        </Label>
                        <p className="text-xs text-muted-foreground">{permission.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateRole} className="bg-purple-600 hover:bg-purple-700">
                Crear Rol
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
              placeholder="Buscar roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Roles Table */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Shield className="h-6 w-6 text-purple-600" />
            Roles del Sistema
          </CardTitle>
          <CardDescription className="text-gray-600">
            Lista de todos los roles configurados con sus permisos y usuarios asignados
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/80 hover:bg-gray-50/80 border-b-2">
                  <TableHead className="font-semibold text-gray-700 py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Rol
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-6">Descripción</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Usuarios
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-6">Permisos</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-6">Fecha Creación</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4 px-6 text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoles.map((role, index) => (
                  <TableRow
                    key={role.id}
                    className={`hover:bg-purple-50/50 transition-colors border-b ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                    }`}
                  >
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <Shield className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{role.name}</div>
                          <div className="text-sm text-gray-500">ID: {role.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <div className="max-w-xs">
                        <p className="text-gray-700 text-sm leading-relaxed">{role.description}</p>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <Users className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="font-semibold text-lg text-blue-600">{role.userCount}</span>
                        <span className="text-sm text-gray-500">usuarios</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {role.permissions.slice(0, 2).map((permission) => (
                          <Badge
                            key={permission}
                            variant="outline"
                            className="text-xs bg-indigo-50 text-indigo-700 border-indigo-200"
                          >
                            {getPermissionLabel(permission)}
                          </Badge>
                        ))}
                        {role.permissions.length > 2 && (
                          <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600 border-gray-200">
                            +{role.permissions.length - 2} más
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <div className="text-sm text-gray-600">
                        {new Date(role.createdAt).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(role)}
                          className="h-9 w-9 p-0 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteRole(role)}
                          disabled={role.userCount > 0}
                          className="h-9 w-9 p-0 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Rol</DialogTitle>
            <DialogDescription>Modifica la información y permisos del rol</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nombre del Rol</Label>
              <Input
                id="edit-name"
                placeholder="Ej: Supervisor"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Descripción</Label>
              <Input
                id="edit-description"
                placeholder="Describe las responsabilidades del rol"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="space-y-3">
              <Label>Permisos</Label>
              <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                {availablePermissions.map((permission) => (
                  <div key={permission.id} className="flex items-start space-x-2 p-3 border rounded-lg">
                    <Checkbox
                      id={`edit-${permission.id}`}
                      checked={formData.permissions.includes(permission.id)}
                      onCheckedChange={(checked) => handlePermissionChange(permission.id, checked as boolean)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor={`edit-${permission.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {permission.label}
                      </Label>
                      <p className="text-xs text-muted-foreground">{permission.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditRole} className="bg-purple-600 hover:bg-purple-700">
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
