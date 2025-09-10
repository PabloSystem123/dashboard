"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Building2, Plus, Edit, Eye, Trash2, Search, MapPin, Bed, Bath, Car, Home } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Property {
  id: number
  titulo: string
  tipo: string
  precio: number
  tipoOperacion: "venta" | "arriendo" | "venta-arriendo"
  habitaciones: number
  baños: number
  garaje: boolean
  estrato: number
  area: number
  descripcion: string
  direccion: string
  ciudad: string
  imagen: string
  estado: "disponible" | "vendido" | "arrendado" | "reservado"
  fechaCreacion: string
}

const initialProperties: Property[] = [
  {
    id: 1,
    titulo: "Casa Moderna en Zona Norte",
    tipo: "Casa",
    precio: 250000000,
    tipoOperacion: "venta",
    habitaciones: 3,
    baños: 2,
    garaje: true,
    estrato: 4,
    area: 120,
    descripcion: "Hermosa casa moderna con acabados de lujo",
    direccion: "Calle 123 #45-67",
    ciudad: "Medellín",
    imagen: "/property-1.jpg",
    estado: "disponible",
    fechaCreacion: "2024-01-15",
  },
  {
    id: 2,
    titulo: "Apartamento Centro Histórico",
    tipo: "Apartamento",
    precio: 180000000,
    tipoOperacion: "venta",
    habitaciones: 2,
    baños: 1,
    garaje: false,
    estrato: 3,
    area: 80,
    descripcion: "Apartamento acogedor en el corazón de la ciudad",
    direccion: "Carrera 50 #30-20",
    ciudad: "Medellín",
    imagen: "/property-2.jpg",
    estado: "disponible",
    fechaCreacion: "2024-01-20",
  },
  {
    id: 3,
    titulo: "Villa con Piscina",
    tipo: "Casa",
    precio: 450000000,
    tipoOperacion: "venta",
    habitaciones: 4,
    baños: 3,
    garaje: true,
    estrato: 6,
    area: 250,
    descripcion: "Exclusiva villa con piscina y jardín privado",
    direccion: "Transversal 80 #100-50",
    ciudad: "Envigado",
    imagen: "/property-3.jpg",
    estado: "vendido",
    fechaCreacion: "2024-02-01",
  },
]

const tiposInmueble = ["Casa", "Apartamento", "Apartaestudio", "Finca", "Terreno", "Local Comercial"]

const estratos = [1, 2, 3, 4, 5, 6]
const ciudades = ["Medellín", "Envigado", "Itagüí", "Sabaneta", "La Estrella", "Caldas"]

export default function InmueblesPage() {
  const [properties, setProperties] = useState<Property[]>(initialProperties)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterTipo, setFilterTipo] = useState<string>("todos")
  const [filterOperacion, setFilterOperacion] = useState<string>("todos")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [formData, setFormData] = useState({
    titulo: "",
    tipo: "",
    precio: "",
    tipoOperacion: "",
    habitaciones: "",
    baños: "",
    garaje: false,
    estrato: "",
    area: "",
    descripcion: "",
    direccion: "",
    ciudad: "",
    imagen: "",
  })
  const { toast } = useToast()

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.ciudad.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTipo = filterTipo === "todos" || property.tipo === filterTipo
    const matchesOperacion = filterOperacion === "todos" || property.tipoOperacion === filterOperacion

    return matchesSearch && matchesTipo && matchesOperacion
  })

  const validateForm = () => {
    if (!formData.titulo.trim()) {
      toast({
        variant: "destructive",
        title: "Campo requerido",
        description: "El título es obligatorio.",
      })
      return false
    }

    if (!formData.tipo) {
      toast({
        variant: "destructive",
        title: "Campo requerido",
        description: "Debe seleccionar un tipo de inmueble.",
      })
      return false
    }

    if (!formData.precio || isNaN(Number(formData.precio)) || Number(formData.precio) <= 0) {
      toast({
        variant: "destructive",
        title: "Precio inválido",
        description: "Debe ingresar un precio válido.",
      })
      return false
    }

    if (!formData.tipoOperacion) {
      toast({
        variant: "destructive",
        title: "Campo requerido",
        description: "Debe seleccionar el tipo de operación.",
      })
      return false
    }

    if (!formData.direccion.trim()) {
      toast({
        variant: "destructive",
        title: "Campo requerido",
        description: "La dirección es obligatoria.",
      })
      return false
    }

    if (!formData.ciudad) {
      toast({
        variant: "destructive",
        title: "Campo requerido",
        description: "Debe seleccionar una ciudad.",
      })
      return false
    }

    return true
  }

  const handleCreateProperty = () => {
    if (!validateForm()) return

    const newProperty: Property = {
      id: Math.max(...properties.map((p) => p.id)) + 1,
      titulo: formData.titulo,
      tipo: formData.tipo,
      precio: Number(formData.precio),
      tipoOperacion: formData.tipoOperacion as "venta" | "arriendo" | "venta-arriendo",
      habitaciones: Number(formData.habitaciones) || 0,
      baños: Number(formData.baños) || 0,
      garaje: formData.garaje,
      estrato: Number(formData.estrato) || 1,
      area: Number(formData.area) || 0,
      descripcion: formData.descripcion,
      direccion: formData.direccion,
      ciudad: formData.ciudad,
      imagen: formData.imagen || "/placeholder.svg?height=200&width=300",
      estado: "disponible",
      fechaCreacion: new Date().toISOString().split("T")[0],
    }

    setProperties([...properties, newProperty])
    setIsCreateDialogOpen(false)
    resetForm()

    toast({
      title: "Inmueble creado",
      description: `${newProperty.titulo} ha sido agregado exitosamente.`,
    })
  }

  const handleEditProperty = () => {
    if (!validateForm() || !selectedProperty) return

    const updatedProperties = properties.map((prop) =>
      prop.id === selectedProperty.id
        ? {
            ...prop,
            titulo: formData.titulo,
            tipo: formData.tipo,
            precio: Number(formData.precio),
            tipoOperacion: formData.tipoOperacion as "venta" | "arriendo" | "venta-arriendo",
            habitaciones: Number(formData.habitaciones) || 0,
            baños: Number(formData.baños) || 0,
            garaje: formData.garaje,
            estrato: Number(formData.estrato) || 1,
            area: Number(formData.area) || 0,
            descripcion: formData.descripcion,
            direccion: formData.direccion,
            ciudad: formData.ciudad,
            imagen: formData.imagen || prop.imagen,
          }
        : prop,
    )

    setProperties(updatedProperties)
    setIsEditDialogOpen(false)
    resetForm()

    toast({
      title: "Inmueble actualizado",
      description: `${formData.titulo} ha sido actualizado exitosamente.`,
    })
  }

  const handleDeleteProperty = (property: Property) => {
    setProperties(properties.filter((prop) => prop.id !== property.id))
    toast({
      title: "Inmueble eliminado",
      description: `${property.titulo} ha sido eliminado del sistema.`,
    })
  }

  const resetForm = () => {
    setFormData({
      titulo: "",
      tipo: "",
      precio: "",
      tipoOperacion: "",
      habitaciones: "",
      baños: "",
      garaje: false,
      estrato: "",
      area: "",
      descripcion: "",
      direccion: "",
      ciudad: "",
      imagen: "",
    })
    setSelectedProperty(null)
  }

  const openEditDialog = (property: Property) => {
    setSelectedProperty(property)
    setFormData({
      titulo: property.titulo,
      tipo: property.tipo,
      precio: property.precio.toString(),
      tipoOperacion: property.tipoOperacion,
      habitaciones: property.habitaciones.toString(),
      baños: property.baños.toString(),
      garaje: property.garaje,
      estrato: property.estrato.toString(),
      area: property.area.toString(),
      descripcion: property.descripcion,
      direccion: property.direccion,
      ciudad: property.ciudad,
      imagen: property.imagen,
    })
    setIsEditDialogOpen(true)
  }

  const openViewDialog = (property: Property) => {
    setSelectedProperty(property)
    setIsViewDialogOpen(true)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "disponible":
        return "bg-green-100 text-green-800 border-green-200"
      case "vendido":
        return "bg-red-100 text-red-800 border-red-200"
      case "arrendado":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "reservado":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
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
            <Building2 className="h-8 w-8 text-purple-600" />
            Gestión de Inmuebles
          </h1>
          <p className="text-gray-600">Administra el portafolio de propiedades</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Inmueble
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Inmueble</DialogTitle>
              <DialogDescription>Ingresa la información del nuevo inmueble</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <Label htmlFor="titulo">Título del Inmueble *</Label>
                <Input
                  id="titulo"
                  placeholder="Casa Moderna en Zona Norte"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de Inmueble *</Label>
                <Select value={formData.tipo} onValueChange={(value) => setFormData({ ...formData, tipo: value })}>
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
              <div className="space-y-2">
                <Label htmlFor="tipoOperacion">Tipo de Operación *</Label>
                <Select
                  value={formData.tipoOperacion}
                  onValueChange={(value) => setFormData({ ...formData, tipoOperacion: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar operación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="venta">Venta</SelectItem>
                    <SelectItem value="arriendo">Arriendo</SelectItem>
                    <SelectItem value="venta-arriendo">Venta y Arriendo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="precio">Precio *</Label>
                <Input
                  id="precio"
                  type="number"
                  placeholder="250000000"
                  value={formData.precio}
                  onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">Área (m²)</Label>
                <Input
                  id="area"
                  type="number"
                  placeholder="120"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="habitaciones">Habitaciones</Label>
                <Input
                  id="habitaciones"
                  type="number"
                  placeholder="3"
                  value={formData.habitaciones}
                  onChange={(e) => setFormData({ ...formData, habitaciones: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="baños">Baños</Label>
                <Input
                  id="baños"
                  type="number"
                  placeholder="2"
                  value={formData.baños}
                  onChange={(e) => setFormData({ ...formData, baños: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estrato">Estrato</Label>
                <Select
                  value={formData.estrato}
                  onValueChange={(value) => setFormData({ ...formData, estrato: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estrato" />
                  </SelectTrigger>
                  <SelectContent>
                    {estratos.map((estrato) => (
                      <SelectItem key={estrato} value={estrato.toString()}>
                        Estrato {estrato}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ciudad">Ciudad *</Label>
                <Select value={formData.ciudad} onValueChange={(value) => setFormData({ ...formData, ciudad: value })}>
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
                <Label htmlFor="direccion">Dirección *</Label>
                <Input
                  id="direccion"
                  placeholder="Calle 123 #45-67"
                  value={formData.direccion}
                  onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  placeholder="Describe las características del inmueble..."
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="imagen">URL de la Imagen</Label>
                <Input
                  id="imagen"
                  placeholder="https://ejemplo.com/imagen.jpg"
                  value={formData.imagen}
                  onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-2 col-span-2">
                <Checkbox
                  id="garaje"
                  checked={formData.garaje}
                  onCheckedChange={(checked) => setFormData({ ...formData, garaje: checked as boolean })}
                />
                <Label htmlFor="garaje">Tiene garaje</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateProperty} className="bg-purple-600 hover:bg-purple-700">
                Crear Inmueble
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
                placeholder="Buscar inmuebles..."
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
                {tiposInmueble.map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>
                    {tipo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterOperacion} onValueChange={setFilterOperacion}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por operación" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas las operaciones</SelectItem>
                <SelectItem value="venta">Venta</SelectItem>
                <SelectItem value="arriendo">Arriendo</SelectItem>
                <SelectItem value="venta-arriendo">Venta y Arriendo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <Card
            key={property.id}
            className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <div className="relative h-48">
              <img
                src={property.imagen || "/placeholder.svg?height=200&width=300"}
                alt={property.titulo}
                className="w-full h-full object-cover"
              />
              <Badge className={`absolute top-3 right-3 ${getEstadoColor(property.estado)}`}>
                {property.estado.charAt(0).toUpperCase() + property.estado.slice(1)}
              </Badge>
              <Badge className="absolute top-3 left-3 bg-purple-600">
                {property.tipoOperacion.charAt(0).toUpperCase() + property.tipoOperacion.slice(1)}
              </Badge>
            </div>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 truncate">{property.titulo}</h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {property.direccion}, {property.ciudad}
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-4">
                    {property.habitaciones > 0 && (
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4" />
                        {property.habitaciones}
                      </div>
                    )}
                    {property.baños > 0 && (
                      <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4" />
                        {property.baños}
                      </div>
                    )}
                    {property.garaje && (
                      <div className="flex items-center gap-1">
                        <Car className="h-4 w-4" />
                        Garaje
                      </div>
                    )}
                  </div>
                  <Badge variant="outline">{property.tipo}</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-purple-600">{formatPrice(property.precio)}</p>
                    {property.area > 0 && <p className="text-sm text-gray-500">{property.area} m²</p>}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openViewDialog(property)}
                    className="flex-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Ver
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditDialog(property)}
                    className="flex-1 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Eliminar
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar inmueble?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción no se puede deshacer. Se eliminará permanentemente{" "}
                          <strong>{property.titulo}</strong> del sistema.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteProperty(property)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Sí, eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Inmueble</DialogTitle>
            <DialogDescription>Modifica la información del inmueble</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <Label htmlFor="edit-titulo">Título del Inmueble *</Label>
              <Input
                id="edit-titulo"
                placeholder="Casa Moderna en Zona Norte"
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-tipo">Tipo de Inmueble *</Label>
              <Select value={formData.tipo} onValueChange={(value) => setFormData({ ...formData, tipo: value })}>
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
            <div className="space-y-2">
              <Label htmlFor="edit-tipoOperacion">Tipo de Operación *</Label>
              <Select
                value={formData.tipoOperacion}
                onValueChange={(value) => setFormData({ ...formData, tipoOperacion: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar operación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="venta">Venta</SelectItem>
                  <SelectItem value="arriendo">Arriendo</SelectItem>
                  <SelectItem value="venta-arriendo">Venta y Arriendo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-precio">Precio *</Label>
              <Input
                id="edit-precio"
                type="number"
                placeholder="250000000"
                value={formData.precio}
                onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-area">Área (m²)</Label>
              <Input
                id="edit-area"
                type="number"
                placeholder="120"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-habitaciones">Habitaciones</Label>
              <Input
                id="edit-habitaciones"
                type="number"
                placeholder="3"
                value={formData.habitaciones}
                onChange={(e) => setFormData({ ...formData, habitaciones: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-baños">Baños</Label>
              <Input
                id="edit-baños"
                type="number"
                placeholder="2"
                value={formData.baños}
                onChange={(e) => setFormData({ ...formData, baños: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-estrato">Estrato</Label>
              <Select value={formData.estrato} onValueChange={(value) => setFormData({ ...formData, estrato: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar estrato" />
                </SelectTrigger>
                <SelectContent>
                  {estratos.map((estrato) => (
                    <SelectItem key={estrato} value={estrato.toString()}>
                      Estrato {estrato}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-ciudad">Ciudad *</Label>
              <Select value={formData.ciudad} onValueChange={(value) => setFormData({ ...formData, ciudad: value })}>
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
              <Label htmlFor="edit-direccion">Dirección *</Label>
              <Input
                id="edit-direccion"
                placeholder="Calle 123 #45-67"
                value={formData.direccion}
                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="edit-descripcion">Descripción</Label>
              <Textarea
                id="edit-descripcion"
                placeholder="Describe las características del inmueble..."
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="edit-imagen">URL de la Imagen</Label>
              <Input
                id="edit-imagen"
                placeholder="https://ejemplo.com/imagen.jpg"
                value={formData.imagen}
                onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
              />
            </div>
            <div className="flex items-center space-x-2 col-span-2">
              <Checkbox
                id="edit-garaje"
                checked={formData.garaje}
                onCheckedChange={(checked) => setFormData({ ...formData, garaje: checked as boolean })}
              />
              <Label htmlFor="edit-garaje">Tiene garaje</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditProperty} className="bg-purple-600 hover:bg-purple-700">
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalles del Inmueble</DialogTitle>
            <DialogDescription>Información completa del inmueble</DialogDescription>
          </DialogHeader>
          {selectedProperty && (
            <div className="space-y-6">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <img
                  src={selectedProperty.imagen || "/placeholder.svg?height=300&width=600"}
                  alt={selectedProperty.titulo}
                  className="w-full h-full object-cover"
                />
                <Badge className={`absolute top-3 right-3 ${getEstadoColor(selectedProperty.estado)}`}>
                  {selectedProperty.estado.charAt(0).toUpperCase() + selectedProperty.estado.slice(1)}
                </Badge>
                <Badge className="absolute top-3 left-3 bg-purple-600">
                  {selectedProperty.tipoOperacion.charAt(0).toUpperCase() + selectedProperty.tipoOperacion.slice(1)}
                </Badge>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedProperty.titulo}</h3>
                <p className="text-lg text-gray-600 flex items-center gap-2 mb-4">
                  <MapPin className="h-5 w-5" />
                  {selectedProperty.direccion}, {selectedProperty.ciudad}
                </p>
                <p className="text-3xl font-bold text-purple-600 mb-4">{formatPrice(selectedProperty.precio)}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Home className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                  <p className="text-sm text-gray-600">Tipo</p>
                  <p className="font-semibold">{selectedProperty.tipo}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Bed className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                  <p className="text-sm text-gray-600">Habitaciones</p>
                  <p className="font-semibold">{selectedProperty.habitaciones}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Bath className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                  <p className="text-sm text-gray-600">Baños</p>
                  <p className="font-semibold">{selectedProperty.baños}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Car className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                  <p className="text-sm text-gray-600">Garaje</p>
                  <p className="font-semibold">{selectedProperty.garaje ? "Sí" : "No"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Área</Label>
                  <p className="text-lg font-semibold">{selectedProperty.area} m²</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Estrato</Label>
                  <p className="text-lg font-semibold">Estrato {selectedProperty.estrato}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Fecha de Creación</Label>
                  <p className="text-lg font-semibold">
                    {new Date(selectedProperty.fechaCreacion).toLocaleDateString("es-ES")}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Estado</Label>
                  <Badge className={getEstadoColor(selectedProperty.estado)}>
                    {selectedProperty.estado.charAt(0).toUpperCase() + selectedProperty.estado.slice(1)}
                  </Badge>
                </div>
              </div>

              {selectedProperty.descripcion && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Descripción</Label>
                  <p className="text-gray-700 mt-1">{selectedProperty.descripcion}</p>
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
