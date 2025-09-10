import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../shared/contexts/AuthContext'
import { Button } from '../../../shared/components/ui/button'
import { Input } from '../../../shared/components/ui/input'
import { Label } from '../../../shared/components/ui/label'
import { Checkbox } from '../../../shared/components/ui/checkbox'
import { Eye, EyeOff } from 'lucide-react'
import { useToast } from '../../../shared/hooks/useToast'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()
  const { login, isLoading } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Error de validación",
        description: "Por favor, completa todos los campos obligatorios.",
      })
      return
    }

    if (!email.includes("@")) {
      toast({
        variant: "destructive",
        title: "Email inválido",
        description: "Por favor, ingresa un email válido.",
      })
      return
    }

    const result = await login(email, password)
    
    if (result.success) {
      toast({
        title: "¡Bienvenido!",
        description: "Has iniciado sesión correctamente.",
      })
      
      // Redirect based on role
      setTimeout(() => {
        if (result.role === "admin") {
          navigate("/admin")
        } else if (result.role === "subadmin") {
          navigate("/subadmin")
        } else {
          navigate("/dashboard")
        }
      }, 1000)
    } else {
      toast({
        variant: "destructive",
        title: "Credenciales incorrectas",
        description: result.error || "El email o la contraseña son incorrectos.",
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          {/* Header con logo */}
          <div className="gradient-primary p-8 flex justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00457B]/20 to-transparent"></div>
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <span className="text-2xl font-bold text-white">IT</span>
              </div>
              <h1 className="text-2xl font-bold text-white">InmoTech</h1>
              <p className="text-blue-100 text-sm">Dashboard Inmobiliario</p>
            </div>
          </div>

          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Bienvenido de nuevo</h2>
              <p className="text-gray-600">Ingresa tus datos para acceder a tu cuenta</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Correo electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="h-12 rounded-xl border-gray-300 focus:border-[#00457B] focus:ring-[#00457B] transition-all duration-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password" className="text-gray-700 font-medium">
                    Contraseña
                  </Label>
                  <button
                    type="button"
                    className="text-sm text-[#00457B] hover:underline transition-colors"
                    onClick={() => toast({ title: "Próximamente", description: "Función en desarrollo" })}
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-12 rounded-xl border-gray-300 focus:border-[#00457B] focus:ring-[#00457B] transition-all duration-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <div className="flex items-center">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={setRememberMe}
                  className="h-5 w-5 border-gray-300 text-[#00457B] rounded"
                />
                <Label htmlFor="remember" className="ml-2 text-gray-600">
                  Recordar mi sesión
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full h-12 gradient-primary hover:opacity-90 rounded-xl text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Iniciando sesión...
                  </div>
                ) : (
                  "Iniciar Sesión"
                )}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                ¿No tienes una cuenta?{" "}
                <button
                  onClick={() => navigate("/registro")}
                  className="text-[#00457B] font-medium hover:underline transition-colors"
                >
                  Regístrate
                </button>
              </p>
            </div>

            {/* Credenciales de prueba */}
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">Credenciales de prueba:</h3>
              <div className="text-xs text-blue-700 space-y-1">
                <p><strong>Admin:</strong> admin@matriz.com / admin123</p>
                <p><strong>Sub-Admin:</strong> subadmin@matriz.com / subadmin123</p>
                <p><strong>Usuario:</strong> usuario@matriz.com / user123</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} InmoTech. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  )
}