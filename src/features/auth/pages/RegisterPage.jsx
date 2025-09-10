import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../shared/contexts/AuthContext'
import { Button } from '../../../shared/components/ui/button'
import { Input } from '../../../shared/components/ui/input'
import { Label } from '../../../shared/components/ui/label'
import { Checkbox } from '../../../shared/components/ui/checkbox'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../shared/components/ui/tabs'
import { Eye, EyeOff, CheckCircle2, XCircle } from 'lucide-react'
import { useToast } from '../../../shared/hooks/useToast'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [userType, setUserType] = useState("cliente")
  const navigate = useNavigate()
  const { register, isLoading } = useAuth()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: "",
    terminos: false,
  })

  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    if (name === "password") {
      setPasswordStrength({
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /[0-9]/.test(value),
        special: /[^A-Za-z0-9]/.test(value),
      })
    }
  }

  const validateForm = () => {
    if (!formData.nombre.trim()) {
      toast({
        variant: "destructive",
        title: "Campo requerido",
        description: "El nombre completo es obligatorio.",
      })
      return false
    }

    if (!formData.email.trim() || !formData.email.includes("@")) {
      toast({
        variant: "destructive",
        title: "Email inválido",
        description: "Por favor, ingresa un email válido.",
      })
      return false
    }

    if (!passwordStrength.length || !passwordStrength.uppercase || !passwordStrength.number) {
      toast({
        variant: "destructive",
        title: "Contraseña débil",
        description: "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.",
      })
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Contraseñas no coinciden",
        description: "Las contraseñas ingresadas no son iguales.",
      })
      return false
    }

    if (!formData.terminos) {
      toast({
        variant: "destructive",
        title: "Términos y condiciones",
        description: "Debes aceptar los términos y condiciones para continuar.",
      })
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    const result = await register({ ...formData, userType })
    
    if (result.success) {
      toast({
        title: "¡Cuenta creada exitosamente!",
        description: `Bienvenido ${formData.nombre}. Tu cuenta ha sido creada.`,
      })
      setTimeout(() => navigate("/dashboard"), 2000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          {/* Header */}
          <div className="gradient-primary p-8 flex justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00457B]/20 to-transparent"></div>
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <span className="text-2xl font-bold text-white">IT</span>
              </div>
              <h1 className="text-2xl font-bold text-white">InmoTech</h1>
              <p className="text-blue-100 text-sm">Crear cuenta</p>
            </div>
          </div>

          <div className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Crea tu cuenta</h2>
              <p className="text-gray-600">Únete a InmoTech y gestiona propiedades</p>
            </div>

            <Tabs defaultValue="cliente" className="mb-6" onValueChange={setUserType}>
              <TabsList className="grid w-full grid-cols-2 h-12 rounded-xl p-1 bg-gray-100">
                <TabsTrigger
                  value="cliente"
                  className="rounded-lg data-[state=active]:bg-[#00457B] data-[state=active]:text-white transition-all duration-200"
                >
                  Cliente
                </TabsTrigger>
                <TabsTrigger
                  value="agente"
                  className="rounded-lg data-[state=active]:bg-[#00457B] data-[state=active]:text-white transition-all duration-200"
                >
                  Agente
                </TabsTrigger>
              </TabsList>

              <TabsContent value="cliente" className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="nombre" className="text-gray-700 font-medium">
                      Nombre completo
                    </Label>
                    <Input
                      id="nombre"
                      name="nombre"
                      placeholder="Tu nombre completo"
                      className="h-12 rounded-xl border-gray-300 focus:border-[#00457B] focus:ring-[#00457B] transition-all duration-200"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium">
                      Correo electrónico
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      className="h-12 rounded-xl border-gray-300 focus:border-[#00457B] focus:ring-[#00457B] transition-all duration-200"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefono" className="text-gray-700 font-medium">
                      Teléfono
                    </Label>
                    <Input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      placeholder="Tu número de teléfono"
                      className="h-12 rounded-xl border-gray-300 focus:border-[#00457B] focus:ring-[#00457B] transition-all duration-200"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-700 font-medium">
                      Contraseña
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="h-12 rounded-xl border-gray-300 focus:border-[#00457B] focus:ring-[#00457B] transition-all duration-200"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Password strength indicator */}
                  <div className="bg-gray-50 p-3 rounded-xl space-y-1.5">
                    <div className="flex items-center">
                      {passwordStrength.length ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500 mr-2" />
                      )}
                      <span className="text-sm text-gray-600">Al menos 8 caracteres</span>
                    </div>
                    <div className="flex items-center">
                      {passwordStrength.uppercase ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500 mr-2" />
                      )}
                      <span className="text-sm text-gray-600">Al menos una mayúscula</span>
                    </div>
                    <div className="flex items-center">
                      {passwordStrength.number ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500 mr-2" />
                      )}
                      <span className="text-sm text-gray-600">Al menos un número</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                      Confirmar contraseña
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="h-12 rounded-xl border-gray-300 focus:border-[#00457B] focus:ring-[#00457B] transition-all duration-200"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">Las contraseñas no coinciden</p>
                    )}
                  </div>

                  <div className="flex items-start space-x-3 mt-4">
                    <Checkbox
                      id="terminos"
                      name="terminos"
                      checked={formData.terminos}
                      onCheckedChange={(checked) => setFormData({ ...formData, terminos: checked })}
                      className="h-5 w-5 mt-0.5 border-gray-300 text-[#00457B] rounded"
                      required
                    />
                    <Label htmlFor="terminos" className="text-gray-600 font-normal">
                      Acepto los términos y condiciones y la política de privacidad
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 gradient-primary hover:opacity-90 rounded-xl text-lg font-medium mt-6 shadow-lg hover:shadow-xl transition-all duration-200"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Creando cuenta...
                      </div>
                    ) : (
                      "Crear cuenta"
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="agente" className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Same form fields as cliente */}
                  <div className="space-y-2">
                    <Label htmlFor="nombre-agente" className="text-gray-700 font-medium">
                      Nombre completo
                    </Label>
                    <Input
                      id="nombre-agente"
                      name="nombre"
                      placeholder="Tu nombre completo"
                      className="h-12 rounded-xl border-gray-300 focus:border-[#00457B] focus:ring-[#00457B] transition-all duration-200"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 gradient-primary hover:opacity-90 rounded-xl text-lg font-medium mt-6 shadow-lg hover:shadow-xl transition-all duration-200"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Creando cuenta...
                      </div>
                    ) : (
                      "Crear cuenta"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                ¿Ya tienes una cuenta?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-[#00457B] font-medium hover:underline transition-colors"
                >
                  Inicia sesión
                </button>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} InmoTech. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  )
}