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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import {
  Search,
  Plus,
  Eye,
  CreditCard,
  Upload,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  AlertTriangle,
  Building2,
} from "lucide-react"

interface Pago {
  id: number
  cliente: string
  inmueble: string
  monto: number
  metodoPago: "PSE" | "Tarjeta" | "Transferencia"
  estado: "Pendiente" | "Pagado" | "Vencido" | "Procesando"
  fechaVencimiento: string
  fechaPago?: string
  cuotas?: number
  cuotaActual?: number
  comprobante?: string
  notas: string
}

export default function PagosPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPago, setSelectedPago] = useState<Pago | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isPSEModalOpen, setIsPSEModalOpen] = useState(false)
  const [isTarjetaModalOpen, setIsTarjetaModalOpen] = useState(false)
  const [isTransferenciaModalOpen, setIsTransferenciaModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("todos")

  // Datos de ejemplo
  const [pagos, setPagos] = useState<Pago[]>([
    {
      id: 1,
      cliente: "Ana Sofía Herrera",
      inmueble: "Apartamento Centro Histórico",
      monto: 1800000,
      metodoPago: "PSE",
      estado: "Pagado",
      fechaVencimiento: "2024-01-15",
      fechaPago: "2024-01-14",
      cuotas: 1,
      cuotaActual: 1,
      notas: "Pago mensual de arriendo",
    },
    {
      id: 2,
      cliente: "Roberto Jiménez",
      inmueble: "Casa Zona Norte",
      monto: 1200000,
      metodoPago: "Tarjeta",
      estado: "Vencido",
      fechaVencimiento: "2024-01-10",
      cuotas: 3,
      cuotaActual: 2,
      notas: "Pago atrasado - contactar cliente",
    },
    {
      id: 3,
      cliente: "Carmen López",
      inmueble: "Penthouse Premium",
      monto: 2500000,
      metodoPago: "Transferencia",
      estado: "Procesando",
      fechaVencimiento: "2024-01-20",
      cuotas: 6,
      cuotaActual: 1,
      comprobante: "/placeholder.svg?height=200&width=300",
      notas: "Comprobante en verificación",
    },
    {
      id: 4,
      cliente: "Luis Martínez",
      inmueble: "Apartamento Moderno",
      monto: 1500000,
      metodoPago: "PSE",
      estado: "Pendiente",
      fechaVencimiento: "2024-01-25",
      cuotas: 1,
      cuotaActual: 1,
      notas: "Próximo pago programado",
    },
  ])

  const filteredPagos = pagos.filter((pago) => {
    const matchesSearch =
      pago.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pago.inmueble.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "todos") return matchesSearch
    return matchesSearch && pago.estado.toLowerCase() === activeTab.toLowerCase()
  })

  const getEstadoBadge = (estado: string) => {
    const variants = {
      Pendiente: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Pagado: "bg-green-100 text-green-800 border-green-200",
      Vencido: "bg-red-100 text-red-800 border-red-200",
      Procesando: "bg-blue-100 text-blue-800 border-blue-200",
    }
    return variants[estado as keyof typeof variants] || variants.Pendiente
  }

  const getEstadoEmoji = (estado: string) => {
    const emojis = {
      Pendiente: "⏳",
      Pagado: "✅",
      Vencido: "❌",
      Procesando: "🔄",
    }
    return emojis[estado as keyof typeof emojis] || "⏳"
  }

  const getMetodoPagoEmoji = (metodo: string) => {
    const emojis = {
      PSE: "🏦",
      Tarjeta: "💳",
      Transferencia: "📱",
    }
    return emojis[metodo as keyof typeof emojis] || "💳"
  }

  const handlePagarPSE = () => {
    toast({
      title: "✅ Pago PSE procesado",
      description: "El pago por PSE ha sido procesado exitosamente.",
    })
    setIsPSEModalOpen(false)
  }

  const handlePagarTarjeta = () => {
    toast({
      title: "✅ Pago con tarjeta procesado",
      description: "El pago con tarjeta ha sido procesado exitosamente.",
    })
    setIsTarjetaModalOpen(false)
  }

  const handlePagarTransferencia = () => {
    toast({
      title: "✅ Comprobante subido",
      description: "El comprobante de transferencia ha sido registrado.",
    })
    setIsTransferenciaModalOpen(false)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const calcularProgresoCuotas = (cuotaActual: number, totalCuotas: number) => {
    return (cuotaActual / totalCuotas) * 100
  }

  // Estadísticas
  const stats = {
    total: pagos.length,
    pagados: pagos.filter((p) => p.estado === "Pagado").length,
    pendientes: pagos.filter((p) => p.estado === "Pendiente").length,
    vencidos: pagos.filter((p) => p.estado === "Vencido").length,
    totalIngresos: pagos.filter((p) => p.estado === "Pagado").reduce((sum, p) => sum + p.monto, 0),
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">💳 Gestión de Pagos</h1>
          <p className="text-gray-600 mt-1">Administra pagos, cuotas y métodos de pago</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Pago
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>💳 Pasarela de Pagos</DialogTitle>
              <DialogDescription>Selecciona el método de pago y completa la transacción</DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="pse" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pse">🏦 PSE</TabsTrigger>
                <TabsTrigger value="tarjeta">💳 Tarjeta</TabsTrigger>
                <TabsTrigger value="transferencia">📱 Transferencia</TabsTrigger>
              </TabsList>

              {/* PSE */}
              <TabsContent value="pse" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">🏦 Pago por PSE</CardTitle>
                    <CardDescription>Paga de forma segura a través del sistema PSE</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="banco">Banco</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar banco" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bancolombia">Bancolombia</SelectItem>
                            <SelectItem value="davivienda">Davivienda</SelectItem>
                            <SelectItem value="bbva">BBVA</SelectItem>
                            <SelectItem value="bogota">Banco de Bogotá</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="tipoPersona">Tipo de Persona</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="natural">Persona Natural</SelectItem>
                            <SelectItem value="juridica">Persona Jurídica</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="tipoDocumento">Tipo de Documento</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar documento" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cc">Cédula de Ciudadanía</SelectItem>
                            <SelectItem value="ce">Cédula de Extranjería</SelectItem>
                            <SelectItem value="nit">NIT</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="numeroDocumento">Número de Documento</Label>
                        <Input id="numeroDocumento" placeholder="123456789" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="monto">Monto a Pagar</Label>
                      <Input id="monto" type="number" placeholder="1500000" />
                    </div>
                    <Button onClick={handlePagarPSE} className="w-full">
                      Pagar con PSE
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tarjeta */}
              <TabsContent value="tarjeta" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">💳 Pago con Tarjeta</CardTitle>
                    <CardDescription>Paga con tarjeta de crédito o débito</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="numeroTarjeta">Número de Tarjeta</Label>
                      <Input id="numeroTarjeta" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="mesVencimiento">Mes</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="MM" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => (
                              <SelectItem key={i + 1} value={String(i + 1).padStart(2, "0")}>
                                {String(i + 1).padStart(2, "0")}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="anoVencimiento">Año</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="YYYY" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 10 }, (_, i) => (
                              <SelectItem key={2024 + i} value={String(2024 + i)}>
                                {2024 + i}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" maxLength={4} />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="nombreTarjeta">Nombre en la Tarjeta</Label>
                      <Input id="nombreTarjeta" placeholder="JUAN PEREZ" />
                    </div>
                    <div>
                      <Label htmlFor="cuotas">Número de Cuotas</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar cuotas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 cuota (sin intereses)</SelectItem>
                          <SelectItem value="3">3 cuotas (2% interés)</SelectItem>
                          <SelectItem value="6">6 cuotas (5% interés)</SelectItem>
                          <SelectItem value="12">12 cuotas (8% interés)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="montoTarjeta">Monto a Pagar</Label>
                      <Input id="montoTarjeta" type="number" placeholder="1500000" />
                    </div>
                    <Button onClick={handlePagarTarjeta} className="w-full">
                      Pagar con Tarjeta
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Transferencia */}
              <TabsContent value="transferencia" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">📱 Transferencia Bancaria</CardTitle>
                    <CardDescription>Realiza una transferencia y sube el comprobante</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Datos Bancarios</h4>
                      <div className="space-y-1 text-sm text-blue-800">
                        <p>
                          <strong>Banco:</strong> Bancolombia
                        </p>
                        <p>
                          <strong>Cuenta Corriente:</strong> 123-456789-01
                        </p>
                        <p>
                          <strong>Titular:</strong> Matriz Inmobiliaria S.A.S
                        </p>
                        <p>
                          <strong>NIT:</strong> 900.123.456-7
                        </p>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="montoTransferencia">Monto Transferido</Label>
                      <Input id="montoTransferencia" type="number" placeholder="1500000" />
                    </div>
                    <div>
                      <Label htmlFor="fechaTransferencia">Fecha de Transferencia</Label>
                      <Input id="fechaTransferencia" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="comprobante">Comprobante de Transferencia</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">
                          Arrastra el comprobante aquí o{" "}
                          <span className="text-blue-600 cursor-pointer">selecciona un archivo</span>
                        </p>
                        <Input type="file" className="hidden" accept="image/*,.pdf" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="referencia">Número de Referencia</Label>
                      <Input id="referencia" placeholder="REF123456789" />
                    </div>
                    <Button onClick={handlePagarTransferencia} className="w-full">
                      Registrar Transferencia
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Total Pagos</CardTitle>
            <CreditCard className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{stats.total}</div>
            <p className="text-xs text-blue-600 mt-1">💳 Transacciones</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Pagados</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{stats.pagados}</div>
            <p className="text-xs text-green-600 mt-1">✅ Completados</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800">Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">{stats.pendientes}</div>
            <p className="text-xs text-yellow-600 mt-1">⏳ Por pagar</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-800">Vencidos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">{stats.vencidos}</div>
            <p className="text-xs text-red-600 mt-1">❌ Atrasados</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Ingresos</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-purple-900">{formatCurrency(stats.totalIngresos)}</div>
            <p className="text-xs text-purple-600 mt-1">💰 Total recaudado</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros y Búsqueda */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">🔍 Filtrar Pagos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por cliente o inmueble..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
              <TabsList>
                <TabsTrigger value="todos">Todos</TabsTrigger>
                <TabsTrigger value="pendiente">Pendientes</TabsTrigger>
                <TabsTrigger value="pagado">Pagados</TabsTrigger>
                <TabsTrigger value="vencido">Vencidos</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de Pagos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">💳 Lista de Pagos</CardTitle>
          <CardDescription>{filteredPagos.length} pagos encontrados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Inmueble</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead>Cuotas</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Vencimiento</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPagos.map((pago) => (
                  <TableRow key={pago.id}>
                    <TableCell>
                      <div className="font-medium">{pago.cliente}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Building2 className="h-3 w-3 mr-1 text-gray-400" />
                        {pago.inmueble}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-green-600">{formatCurrency(pago.monto)}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getMetodoPagoEmoji(pago.metodoPago)} {pago.metodoPago}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {pago.cuotas && pago.cuotas > 1 ? (
                        <div className="space-y-1">
                          <div className="text-sm">
                            {pago.cuotaActual}/{pago.cuotas}
                          </div>
                          <Progress
                            value={calcularProgresoCuotas(pago.cuotaActual || 1, pago.cuotas)}
                            className="h-2"
                          />
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">Pago único</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={getEstadoBadge(pago.estado)}>
                        {getEstadoEmoji(pago.estado)} {pago.estado}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                        {new Date(pago.fechaVencimiento).toLocaleDateString("es-CO")}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedPago(pago)
                          setIsViewModalOpen(true)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal Ver Pago */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>💳 Detalles del Pago</DialogTitle>
          </DialogHeader>
          {selectedPago && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Cliente</Label>
                  <p className="text-lg font-medium">{selectedPago.cliente}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Estado</Label>
                  <Badge className={getEstadoBadge(selectedPago.estado)}>
                    {getEstadoEmoji(selectedPago.estado)} {selectedPago.estado}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Inmueble</Label>
                  <p>{selectedPago.inmueble}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Método de Pago</Label>
                  <Badge variant="outline">
                    {getMetodoPagoEmoji(selectedPago.metodoPago)} {selectedPago.metodoPago}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Monto</Label>
                  <p className="text-lg font-medium text-green-600">{formatCurrency(selectedPago.monto)}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Fecha Vencimiento</Label>
                  <p>{new Date(selectedPago.fechaVencimiento).toLocaleDateString("es-CO")}</p>
                </div>
              </div>
              {selectedPago.cuotas && selectedPago.cuotas > 1 && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Progreso de Cuotas</Label>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>
                        Cuota {selectedPago.cuotaActual} de {selectedPago.cuotas}
                      </span>
                      <span>
                        {Math.round(calcularProgresoCuotas(selectedPago.cuotaActual || 1, selectedPago.cuotas))}%
                      </span>
                    </div>
                    <Progress value={calcularProgresoCuotas(selectedPago.cuotaActual || 1, selectedPago.cuotas)} />
                  </div>
                </div>
              )}
              {selectedPago.fechaPago && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Fecha de Pago</Label>
                  <p>{new Date(selectedPago.fechaPago).toLocaleDateString("es-CO")}</p>
                </div>
              )}
              {selectedPago.comprobante && (
                <div>
                  <Label className="text-sm font-medium text-gray-500">Comprobante</Label>
                  <img
                    src={selectedPago.comprobante || "/placeholder.svg"}
                    alt="Comprobante de pago"
                    className="w-full max-w-md h-48 object-cover rounded-lg border"
                  />
                </div>
              )}
              <div>
                <Label className="text-sm font-medium text-gray-500">Notas</Label>
                <p className="text-sm text-gray-600">{selectedPago.notas}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
