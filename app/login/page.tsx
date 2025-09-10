"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validaciones
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

    setIsLoading(true)

    // Simulación de inicio de sesión
    setTimeout(() => {
      setIsLoading(false)

      // Simulamos diferentes escenarios
      if (email === "admin@matriz.com" && password === "admin123") {
        toast({
          title: "¡Bienvenido!",
          description: "Has iniciado sesión correctamente como administrador.",
        })
        setTimeout(() => router.push("/admin"), 1000)
      } else if (email === "subadmin@matriz.com" && password === "subadmin123") {
        toast({
          title: "¡Bienvenido!",
          description: "Has iniciado sesión correctamente como sub-administrador.",
        })
        setTimeout(() => router.push("/subadmin"), 1000)
      } else if (email === "usuario@matriz.com" && password === "user123") {
        toast({
          title: "¡Bienvenido!",
          description: "Has iniciado sesión correctamente.",
        })
        setTimeout(() => router.push("/dashboard"), 1000)
      } else {
        toast({
          variant: "destructive",
          title: "Credenciales incorrectas",
          description: "El email o la contraseña son incorrectos. Intenta nuevamente.",
        })
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header con logo */}
          <div className="bg-[#00457B] p-6 flex justify-center">
            <Image src="/matriz-logo-white.png" alt="Matriz Inmobiliaria" width={180} height={60} />
          </div>

          <div className="p-8">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Bienvenido de nuevo</h1>
            <p className="text-center text-gray-600 mb-8">Ingresa tus datos para acceder a tu cuenta</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Correo electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="h-12 rounded-xl border-gray-300 focus:border-[#00457B] focus:ring-[#00457B]"
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
                  <Link href="/recuperar-password" className="text-sm text-[#00457B] hover:underline">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-12 rounded-xl border-gray-300 focus:border-[#00457B] focus:ring-[#00457B]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
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
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="h-5 w-5 border-gray-300 text-[#00457B] rounded"
                />
                <Label htmlFor="remember" className="ml-2 text-gray-600">
                  Recordar mi sesión
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-[#00457B] hover:bg-[#003b69] rounded-xl text-lg font-medium"
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

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">O continúa con</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 rounded-xl border-gray-300 hover:bg-gray-50 hover:border-gray-400 bg-transparent"
                  onClick={() => {
                    toast({
                      title: "Próximamente",
                      description: "El inicio de sesión con Google estará disponible pronto.",
                    })
                  }}
                >
                  <div className="w-5 h-5 bg-red-500 rounded mr-2"></div>
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 rounded-xl border-gray-300 hover:bg-gray-50 hover:border-gray-400 bg-transparent"
                  onClick={() => {
                    toast({
                      title: "Próximamente",
                      description: "El inicio de sesión con Facebook estará disponible pronto.",
                    })
                  }}
                >
                  <div className="w-5 h-5 bg-blue-600 rounded mr-2"></div>
                  Facebook
                </Button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                ¿No tienes una cuenta?{" "}
                <Link href="/registro" className="text-[#00457B] font-medium hover:underline">
                  Regístrate
                </Link>
              </p>
            </div>

            {/* Credenciales de prueba */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">Credenciales de prueba:</h3>
              <div className="text-xs text-blue-700 space-y-1">
                <p>
                  <strong>Admin:</strong> admin@matriz.com / admin123
                </p>
                <p>
                  <strong>Sub-Admin:</strong> subadmin@matriz.com / subadmin123
                </p>
                <p>
                  <strong>Usuario:</strong> usuario@matriz.com / user123
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Matriz Inmobiliaria. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  )
}
