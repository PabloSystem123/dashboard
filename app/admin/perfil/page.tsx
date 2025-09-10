"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Phone, MapPin, Calendar, Shield, Camera, Save, Edit, Lock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface UserProfile {
  id: number
  nombre: string
  apellido: string
  correo: string
  telefono: string
  direccion: string
  ciudad: string
  rol: string
  fechaIngreso: string
  ultimoAcceso: string
  avatar: string
  biografia: string
  especialidades: string[]
  ventasRealizadas: number
  clientesAtendidos: number
}

const initialProfile: UserProfile = {
  id: 1,
  nombre: "Admin",
  apellido: "Principal",
  correo: "admin@matriz.com",
  telefono: "+57 300 123 4567",
  direccion: "Calle 123 #45-67",
  ciudad: "Medellín",
  rol: "Administrador",
  fechaIngreso: "2024-01-01",
  ultimoAcceso: "2024-01-20",
  avatar: "/avatar-user.jpg",
  biografia: "Administrador principal del sistema con más de 10 años de experiencia en el sector inmobiliario.",
  especialidades: ["Gestión de equipos", "Análisis de mercado", "Estrategia comercial"],
  ventasRealizadas: 150,
  clientesAtendidos: 300,
}

export default function PerfilPage() {
  const [profile, setProfile] = useState<UserProfile>(initialProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [formData, setFormData] = useState({
    nombre: profile.nombre,
    apellido: profile.apellido,
    telefono: profile.telefono,
    direccion: profile.direccion,
    ciudad: profile.ciudad,
    biografia: profile.biografia,
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const { toast } = useToast()

  const handleSaveProfile = () => {
    // Validaciones básicas
    if (!formData.nombre.trim() || !formData.apellido.trim()) {
      toast({
        variant: "destructive",
        title: "Campos requeridos",
        description: "El nombre y apellido son obligatorios.",
      })
      return
    }

    // Actualizar perfil
    setProfile({
      ...profile,
      nombre: formData.nombre,
      apellido: formData.apellido,
      telefono: formData.telefono,
      direccion: formData.direccion,
      ciudad: formData.ciudad,
      biografia: formData.biografia,
    })

    setIsEditing(false)
    toast({
      title: "Perfil actualizado",
      description: "Tu información ha sido actualizada exitosamente.",
    })
  }

  const handleChangePassword = () => {
    // Validaciones
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Campos requeridos",
        description: "Todos los campos de contraseña son obligatorios.",
      })
      return
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        variant: "destructive",
        title: "Contraseña muy corta",
        description: "La nueva contraseña debe tener al menos 6 caracteres.",
      })
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Contraseñas no coinciden",
        description: "La nueva contraseña y su confirmación deben ser iguales.",
      })
      return
    }

    // Simular cambio de contraseña
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
    setIsChangingPassword(false)

    toast({
      title: "Contraseña actualizada",
      description: "Tu contraseña ha sido cambiada exitosamente.",
    })
  }

  const handleCancelEdit = () => {
    setFormData({
      nombre: profile.nombre,
      apellido: profile.apellido,
      telefono: profile.telefono,
      direccion: profile.direccion,
      ciudad: profile.ciudad,
      biografia: profile.biografia,
    })
    setIsEditing(false)
  }

  const handleAvatarChange = () => {
    // Simular cambio de avatar
    toast({
      title: "Foto actualizada",
      description: "Tu foto de perfil ha sido actualizada.",
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <User className="h-8 w-8 text-purple-600" />
            Mi Perfil
          </h1>
          <p className="text-gray-600">Gestiona tu información personal y configuración</p>
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="bg-purple-600 hover:bg-purple-700">
              <Edit className="mr-2 h-4 w-4" />
              Editar Perfil
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancelEdit}>
                Cancelar
              </Button>
              <Button onClick={handleSaveProfile} className="bg-purple-600 hover:bg-purple-700">
                <Save className="mr-2 h-4 w-4" />
                Guardar
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-32 w-32">
                    <AvatarImage
                      src={profile.avatar || "/placeholder.svg"}
                      alt={`${profile.nombre} ${profile.apellido}`}
                    />
                    <AvatarFallback className="text-2xl">
                      {profile.nombre.charAt(0)}
                      {profile.apellido.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-white"
                    onClick={handleAvatarChange}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {profile.nombre} {profile.apellido}
                  </h2>
                  <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                    <Shield className="h-3 w-3 mr-1" />
                    {profile.rol}
                  </Badge>
                </div>

                <div className="w-full space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>{profile.correo}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{profile.telefono}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {profile.direccion}, {profile.ciudad}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Desde {new Date(profile.fechaIngreso).toLocaleDateString("es-ES")}</span>
                  </div>
                </div>

                <Separator />

                <div className="w-full">
                  <h3 className="font-semibold text-gray-900 mb-3">Especialidades</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.especialidades.map((especialidad, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {especialidad}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Estadísticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Ventas realizadas</span>
                <span className="font-bold text-green-600">{profile.ventasRealizadas}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Clientes atendidos</span>
                <span className="font-bold text-blue-600">{profile.clientesAtendidos}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Último acceso</span>
                <span className="font-medium">{new Date(profile.ultimoAcceso).toLocaleDateString("es-ES")}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>
                {isEditing ? "Edita tu información personal" : "Tu información personal actual"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apellido">Apellido</Label>
                  <Input
                    id="apellido"
                    value={formData.apellido}
                    onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="correo">Correo Electrónico</Label>
                <Input id="correo" value={profile.correo} disabled className="bg-gray-50" />
                <p className="text-xs text-gray-500">
                  El correo electrónico no se puede modificar. Contacta al administrador si necesitas cambiarlo.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="direccion">Dirección</Label>
                  <Input
                    id="direccion"
                    value={formData.direccion}
                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ciudad">Ciudad</Label>
                  <Input
                    id="ciudad"
                    value={formData.ciudad}
                    onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="biografia">Biografía</Label>
                <Textarea
                  id="biografia"
                  value={formData.biografia}
                  onChange={(e) => setFormData({ ...formData, biografia: e.target.value })}
                  disabled={!isEditing}
                  rows={4}
                  placeholder="Cuéntanos sobre ti..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Seguridad
              </CardTitle>
              <CardDescription>Gestiona la seguridad de tu cuenta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isChangingPassword ? (
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Contraseña</h4>
                    <p className="text-sm text-gray-600">Última actualización hace 30 días</p>
                  </div>
                  <Button variant="outline" onClick={() => setIsChangingPassword(true)}>
                    Cambiar Contraseña
                  </Button>
                </div>
              ) : (
                <div className="space-y-4 p-4 border rounded-lg">
                  <h4 className="font-medium">Cambiar Contraseña</h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Contraseña Actual</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nueva Contraseña</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsChangingPassword(false)
                          setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
                        }}
                      >
                        Cancelar
                      </Button>
                      <Button onClick={handleChangePassword} className="bg-purple-600 hover:bg-purple-700">
                        Actualizar Contraseña
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-medium text-yellow-800 mb-2">Consejos de Seguridad</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Usa una contraseña de al menos 8 caracteres</li>
                  <li>• Incluye números, letras mayúsculas y minúsculas</li>
                  <li>• No compartas tu contraseña con nadie</li>
                  <li>• Cambia tu contraseña regularmente</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
