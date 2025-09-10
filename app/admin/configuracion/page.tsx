"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Save, Bell, Mail, Shield, Database, Palette } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SystemConfig {
  general: {
    nombreEmpresa: string
    direccion: string
    telefono: string
    correo: string
    sitioWeb: string
    descripcion: string
  }
  notificaciones: {
    emailNuevasCitas: boolean
    emailNuevosClientes: boolean
    emailVentasCompletadas: boolean
    pushNotifications: boolean
    reportesDiarios: boolean
    alertasSeguridad: boolean
  }
  seguridad: {
    sesionTimeout: number
    intentosMaximos: number
    requiereDobleAutenticacion: boolean
    passwordMinLength: number
    passwordExpireDays: number
  }
  sistema: {
    idioma: string
    zonaHoraria: string
    formatoFecha: string
    moneda: string
    backupAutomatico: boolean
    mantenimientoProgramado: boolean
  }
  apariencia: {
    tema: string
    colorPrimario: string
    logoEmpresa: string
    mostrarBrandingMatriz: boolean
  }
}

const initialConfig: SystemConfig = {
  general: {
    nombreEmpresa: "Matriz Inmobiliaria",
    direccion: "Calle 123 #45-67, Medellín",
    telefono: "+57 300 123 4567",
    correo: "info@matriz.com",
    sitioWeb: "https://matriz.com",
    descripcion: "Empresa líder en el sector inmobiliario con más de 10 años de experiencia.",
  },
  notificaciones: {
    emailNuevasCitas: true,
    emailNuevosClientes: true,
    emailVentasCompletadas: true,
    pushNotifications: false,
    reportesDiarios: true,
    alertasSeguridad: true,
  },
  seguridad: {
    sesionTimeout: 30,
    intentosMaximos: 3,
    requiereDobleAutenticacion: false,
    passwordMinLength: 6,
    passwordExpireDays: 90,
  },
  sistema: {
    idioma: "es",
    zonaHoraria: "America/Bogota",
    formatoFecha: "DD/MM/YYYY",
    moneda: "COP",
    backupAutomatico: true,
    mantenimientoProgramado: false,
  },
  apariencia: {
    tema: "light",
    colorPrimario: "#7c3aed",
    logoEmpresa: "/matriz-logo.png",
    mostrarBrandingMatriz: true,
  },
}

export default function ConfiguracionPage() {
  const [config, setConfig] = useState<SystemConfig>(initialConfig)
  const [activeTab, setActiveTab] = useState("general")
  const { toast } = useToast()

  const handleSave = () => {
    // Simular guardado de configuración
    toast({
      title: "Configuración guardada",
      description: "Los cambios han sido aplicados exitosamente.",
    })
  }

  const handleReset = () => {
    setConfig(initialConfig)
    toast({
      title: "Configuración restablecida",
      description: "Se han restaurado los valores por defecto.",
    })
  }

  const updateConfig = (section: keyof SystemConfig, field: string, value: any) => {
    setConfig((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "notificaciones", label: "Notificaciones", icon: Bell },
    { id: "seguridad", label: "Seguridad", icon: Shield },
    { id: "sistema", label: "Sistema", icon: Database },
    { id: "apariencia", label: "Apariencia", icon: Palette },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Settings className="h-8 w-8 text-purple-600" />
            Configuración del Sistema
          </h1>
          <p className="text-gray-600">Administra la configuración general del sistema</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            Restablecer
          </Button>
          <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
            <Save className="mr-2 h-4 w-4" />
            Guardar Cambios
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? "bg-purple-100 text-purple-700 font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  )
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* General */}
          {activeTab === "general" && (
            <Card className="border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Configuración General
                </CardTitle>
                <CardDescription>Información básica de la empresa</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombreEmpresa">Nombre de la Empresa</Label>
                    <Input
                      id="nombreEmpresa"
                      value={config.general.nombreEmpresa}
                      onChange={(e) => updateConfig("general", "nombreEmpresa", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input
                      id="telefono"
                      value={config.general.telefono}
                      onChange={(e) => updateConfig("general", "telefono", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="direccion">Dirección</Label>
                  <Input
                    id="direccion"
                    value={config.general.direccion}
                    onChange={(e) => updateConfig("general", "direccion", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="correo">Correo Electrónico</Label>
                    <Input
                      id="correo"
                      type="email"
                      value={config.general.correo}
                      onChange={(e) => updateConfig("general", "correo", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sitioWeb">Sitio Web</Label>
                    <Input
                      id="sitioWeb"
                      value={config.general.sitioWeb}
                      onChange={(e) => updateConfig("general", "sitioWeb", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descripcion">Descripción</Label>
                  <Textarea
                    id="descripcion"
                    value={config.general.descripcion}
                    onChange={(e) => updateConfig("general", "descripcion", e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notificaciones */}
          {activeTab === "notificaciones" && (
            <Card className="border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Configuración de Notificaciones
                </CardTitle>
                <CardDescription>Gestiona las notificaciones del sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Notificaciones por Email
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Nuevas Citas</Label>
                        <p className="text-sm text-gray-600">Recibir email cuando se programen nuevas citas</p>
                      </div>
                      <Switch
                        checked={config.notificaciones.emailNuevasCitas}
                        onCheckedChange={(checked) => updateConfig("notificaciones", "emailNuevasCitas", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Nuevos Clientes</Label>
                        <p className="text-sm text-gray-600">Recibir email cuando se registren nuevos clientes</p>
                      </div>
                      <Switch
                        checked={config.notificaciones.emailNuevosClientes}
                        onCheckedChange={(checked) => updateConfig("notificaciones", "emailNuevosClientes", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Ventas Completadas</Label>
                        <p className="text-sm text-gray-600">Recibir email cuando se completen ventas</p>
                      </div>
                      <Switch
                        checked={config.notificaciones.emailVentasCompletadas}
                        onCheckedChange={(checked) => updateConfig("notificaciones", "emailVentasCompletadas", checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Otras Notificaciones</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Notificaciones Push</Label>
                        <p className="text-sm text-gray-600">Recibir notificaciones en tiempo real</p>
                      </div>
                      <Switch
                        checked={config.notificaciones.pushNotifications}
                        onCheckedChange={(checked) => updateConfig("notificaciones", "pushNotifications", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Reportes Diarios</Label>
                        <p className="text-sm text-gray-600">Recibir resumen diario de actividades</p>
                      </div>
                      <Switch
                        checked={config.notificaciones.reportesDiarios}
                        onCheckedChange={(checked) => updateConfig("notificaciones", "reportesDiarios", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Alertas de Seguridad</Label>
                        <p className="text-sm text-gray-600">Recibir alertas sobre actividad sospechosa</p>
                      </div>
                      <Switch
                        checked={config.notificaciones.alertasSeguridad}
                        onCheckedChange={(checked) => updateConfig("notificaciones", "alertasSeguridad", checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Seguridad */}
          {activeTab === "seguridad" && (
            <Card className="border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Configuración de Seguridad
                </CardTitle>
                <CardDescription>Gestiona la seguridad del sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sesionTimeout">Tiempo de Sesión (minutos)</Label>
                    <Input
                      id="sesionTimeout"
                      type="number"
                      value={config.seguridad.sesionTimeout}
                      onChange={(e) => updateConfig("seguridad", "sesionTimeout", Number.parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="intentosMaximos">Intentos Máximos de Login</Label>
                    <Input
                      id="intentosMaximos"
                      type="number"
                      value={config.seguridad.intentosMaximos}
                      onChange={(e) => updateConfig("seguridad", "intentosMaximos", Number.parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="passwordMinLength">Longitud Mínima de Contraseña</Label>
                    <Input
                      id="passwordMinLength"
                      type="number"
                      value={config.seguridad.passwordMinLength}
                      onChange={(e) => updateConfig("seguridad", "passwordMinLength", Number.parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passwordExpireDays">Expiración de Contraseña (días)</Label>
                    <Input
                      id="passwordExpireDays"
                      type="number"
                      value={config.seguridad.passwordExpireDays}
                      onChange={(e) => updateConfig("seguridad", "passwordExpireDays", Number.parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Autenticación de Dos Factores</Label>
                    <p className="text-sm text-gray-600">Requiere verificación adicional para el login</p>
                  </div>
                  <Switch
                    checked={config.seguridad.requiereDobleAutenticacion}
                    onCheckedChange={(checked) => updateConfig("seguridad", "requiereDobleAutenticacion", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Sistema */}
          {activeTab === "sistema" && (
            <Card className="border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Configuración del Sistema
                </CardTitle>
                <CardDescription>Configuración técnica del sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="idioma">Idioma</Label>
                    <Select
                      value={config.sistema.idioma}
                      onValueChange={(value) => updateConfig("sistema", "idioma", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="pt">Português</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zonaHoraria">Zona Horaria</Label>
                    <Select
                      value={config.sistema.zonaHoraria}
                      onValueChange={(value) => updateConfig("sistema", "zonaHoraria", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Bogota">Bogotá (UTC-5)</SelectItem>
                        <SelectItem value="America/Mexico_City">Ciudad de México (UTC-6)</SelectItem>
                        <SelectItem value="America/New_York">Nueva York (UTC-5)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="formatoFecha">Formato de Fecha</Label>
                    <Select
                      value={config.sistema.formatoFecha}
                      onValueChange={(value) => updateConfig("sistema", "formatoFecha", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="moneda">Moneda</Label>
                    <Select
                      value={config.sistema.moneda}
                      onValueChange={(value) => updateConfig("sistema", "moneda", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="COP">Peso Colombiano (COP)</SelectItem>
                        <SelectItem value="USD">Dólar Americano (USD)</SelectItem>
                        <SelectItem value="EUR">Euro (EUR)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Backup Automático</Label>
                      <p className="text-sm text-gray-600">Realizar copias de seguridad automáticas</p>
                    </div>
                    <Switch
                      checked={config.sistema.backupAutomatico}
                      onCheckedChange={(checked) => updateConfig("sistema", "backupAutomatico", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Mantenimiento Programado</Label>
                      <p className="text-sm text-gray-600">Permitir mantenimiento automático del sistema</p>
                    </div>
                    <Switch
                      checked={config.sistema.mantenimientoProgramado}
                      onCheckedChange={(checked) => updateConfig("sistema", "mantenimientoProgramado", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Apariencia */}
          {activeTab === "apariencia" && (
            <Card className="border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Configuración de Apariencia
                </CardTitle>
                <CardDescription>Personaliza la apariencia del sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tema">Tema</Label>
                    <Select
                      value={config.apariencia.tema}
                      onValueChange={(value) => updateConfig("apariencia", "tema", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Claro</SelectItem>
                        <SelectItem value="dark">Oscuro</SelectItem>
                        <SelectItem value="auto">Automático</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="colorPrimario">Color Primario</Label>
                    <div className="flex gap-2">
                      <Input
                        id="colorPrimario"
                        value={config.apariencia.colorPrimario}
                        onChange={(e) => updateConfig("apariencia", "colorPrimario", e.target.value)}
                      />
                      <div
                        className="w-10 h-10 rounded border"
                        style={{ backgroundColor: config.apariencia.colorPrimario }}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logoEmpresa">Logo de la Empresa</Label>
                  <Input
                    id="logoEmpresa"
                    value={config.apariencia.logoEmpresa}
                    onChange={(e) => updateConfig("apariencia", "logoEmpresa", e.target.value)}
                    placeholder="URL del logo"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Mostrar Branding de Matriz</Label>
                    <p className="text-sm text-gray-600">Mostrar el logo y branding de Matriz Inmobiliaria</p>
                  </div>
                  <Switch
                    checked={config.apariencia.mostrarBrandingMatriz}
                    onCheckedChange={(checked) => updateConfig("apariencia", "mostrarBrandingMatriz", checked)}
                  />
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Vista Previa</h4>
                  <div className="flex items-center gap-3 p-3 bg-white rounded border">
                    <div className="w-8 h-8 rounded" style={{ backgroundColor: config.apariencia.colorPrimario }} />
                    <div>
                      <p className="font-medium">{config.general.nombreEmpresa}</p>
                      <p className="text-sm text-gray-600">Tema: {config.apariencia.tema}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
