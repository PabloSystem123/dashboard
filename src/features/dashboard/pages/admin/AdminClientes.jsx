import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../shared/components/ui/card"
import { Button } from "../../../../shared/components/ui/button"
import { Input } from "../../../../shared/components/ui/input"
import { Badge } from "../../../../shared/components/ui/badge"
import { Users, Plus, Search, Eye, Edit, Trash2, Phone, Mail, User, Calendar, MapPin } from "lucide-react"

export default function AdminClientes() {
  const [searchTerm, setSearchTerm] = useState("")

  const clients = [
    {
      id: 1,
      nombre: "Juan Pérez",
      email: "juan.perez@email.com",
      telefono: "+57 300 123 4567",
      tipoCliente: "comprador",
      estado: "activo",
      fechaRegistro: "2024-01-15",
    },
    {
      id: 2,
      nombre: "María González",
      email: "maria.gonzalez@email.com",
      telefono: "+57 301 234 5678",
      tipoCliente: "vendedor",
      estado: "activo",
      fechaRegistro: "2024-01-10",
    },
  ]

  const filteredClients = clients.filter(client =>
    client.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold gradient-text flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg">
              <Users className="h-8 w-8 text-white" />
            </div>
            Gestión de Clientes
          </h1>
          <p className="text-gray-600 mt-2">Administra y gestiona la base de datos de clientes</p>
        </div>
        <Button className="gradient-primary hover:opacity-90 shadow-lg hover:shadow-xl hover-lift">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Cliente
        </Button>
      </div>

      {/* Search */}
      <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/50 border-gray-200/50 focus:bg-white focus:border-[#00457B] transition-all duration-200"
            />
          </div>
        </CardContent>
      </Card>

      {/* Clients Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredClients.map((client) => (
          <Card key={client.id} className="border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl hover-lift transition-all duration-300 group">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <User className="h-8 w-8 text-[#00457B]" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl text-gray-900">{client.nombre}</CardTitle>
                  <Badge className={`mt-1 ${
                    client.tipoCliente === 'comprador' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {client.tipoCliente}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4 text-[#00457B]" />
                <span>{client.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4 text-[#00457B]" />
                <span>{client.telefono}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4 text-[#00457B]" />
                <span>Registro: {new Date(client.fechaRegistro).toLocaleDateString('es-ES')}</span>
              </div>
              
              <div className="flex gap-2 pt-3">
                <Button variant="ghost" size="sm" className="flex-1 hover:bg-blue-50 hover:text-blue-700">
                  <Eye className="h-4 w-4 mr-1" />
                  Ver
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 hover:bg-emerald-50 hover:text-emerald-700">
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}