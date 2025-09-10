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
import { Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function RegistroPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState("cliente")
  const router = useRouter()
  const { toast } = useToast()

  // Estados para el formulario
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: "",
    terminos: false,
  })

  // Estado para validación de contraseña
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    // Validar fortaleza de contraseña
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

    if (!formData.telefono.trim()) {
      toast({
        variant: "destructive",
        title: "Campo requerido",
        description: "El número de teléfono es obligatorio.",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulación de registro
    setTimeout(() => {
      setIsLoading(false)

      // Simulamos verificación de email existente
      if (formData.email === "existente@matriz.com") {
        toast({
          variant: "destructive",
          title: "Email ya registrado",
          description: "Este email ya está registrado. Intenta con otro o inicia sesión.",
        })
        return
      }

      toast({
        variant: "success",
        title: "¡Cuenta creada exitosamente!",
        description: `Bienvenido ${formData.nombre}. Tu cuenta de ${userType} ha sido creada.`,
      })

      setTimeout(() => router.push("/dashboard"), 2000)
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
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Crea tu cuenta</h1>
            <p className="text-center text-gray-600 mb-6">Únete a Matriz Inmobiliaria y encuentra tu hogar ideal</p>

            <Tabs defaultValue="cliente" className="mb-6" onValueChange={(value) => setUserType(value)}>
              <TabsList className="grid w-full grid-cols-2 h-12 rounded-xl p-1 bg-gray-100">
                <TabsTrigger
                  value="cliente"
                  className="rounded-lg data-[state=active]:bg-[#00457B] data-[state=active]:text-white"
                >
                  Cliente
                </TabsTrigger>
                <TabsTrigger
                  value="agente"
                  className="rounded-lg data-[state=active]:bg-[#00457B] data-[state=active]:text-white"
                >
                  Agente Inmobiliario
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
                      className="h-12 rounded-xl border-gray-300 focus:border-[#00457B] focus:ring-[#00457B]"
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
                      className="h-12 rounded-xl border-gray-300 focus:border-[#00457B] focus:ring-[#00457B]"
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
                      className="h-12 rounded-xl border-gray-300 focus:border-[#00457B] focus:ring-[#00457B]"
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
                        className="h-12 rounded-xl border-gray-300 focus:border-[#00457B] focus:ring-[#00457B]"
                        value={formData.password}
                        onChange={handleChange}
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

                  {/* Indicador de fortaleza de contraseña */}
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
                        className="h-12 rounded-xl border-gray-300 focus:border-[#00457B] focus:ring-[#00457B]"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {formData.password &&
                      formData.confirmPassword &&
                      formData.password !== formData.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">Las contraseñas no coinciden</p>
                      )}
                  </div>

                  <div className="flex items-start space-x-3 mt-4">
                    <Checkbox
                      id="terminos"
                      name="terminos"
                      checked={formData.terminos}
                      onCheckedChange={(checked) => setFormData({ ...formData, terminos: checked as boolean })}
                      className="h-5 w-5 mt-0.5 border-gray-300 text-[#00457B] rounded"
                      required
                    />
                    <Label htmlFor="terminos" className="text-gray-600 font-normal">
                      Acepto los{" "}
                      <Link href="/terminos" className="text-[#00457B] hover:underline">
                        términos y condiciones
                      </Link>{" "}
                      y la{" "}
                      <Link href="/privacidad" className="text-[#00457B] hover:underline">
                        política de privacidad
                      </Link>
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-[#00457B] hover:bg-[#003b69] rounded-xl text-lg font-medium mt-6"
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
                  <div className="space-y-2">
                    <Label htmlFor="nombre-agente" className="text-gray-700 font-medium">
                      Nombre completo
                    </Label>
                    <Input
                      id="nombre-agente"
                      name="nombre"
                      placeholder="Tu nombre completo"
                      className="h-12 rounded-xl border-gray-300 focus:border-[#00457B] focus:ring-[#00457B]"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email-agente" className="text-gray-700 font-medium">
                      Correo electrónico
                    </Label>
                    <Input
                      id="email-agente"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      className="h-12 rounded-xl border-gray-300 focus:border-[#00457B] focus:ring-[#00457B]"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefono-agente" className="text-gray-700 font-medium">
                      Teléfono
                    </Label>
                    <Input
                      id="telefono-agente"
                      name="telefono"
                      type="tel"
                      placeholder="Tu número de teléfono"
                      className="h-12 rounded-xl border-gray-300 focus:border-[#00457B] focus:ring-[#00457B]"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password-agente" className="text-gray-700 font-medium">
                      Contraseña
                    </Label>
                    <div className="relative">
                      <Input
                        id="password-agente"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="h-12 rounded-xl border-gray-300 focus:border-[#00457B] focus:ring-[#00457B]"
                        value={formData.password}
                        onChange={handleChange}
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

                  {/* Indicador de fortaleza de contraseña */}
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
                    <Label htmlFor="confirmPassword-agente" className="text-gray-700 font-medium">
                      Confirmar contraseña
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword-agente"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="h-12 rounded-xl border-gray-300 focus:border-[#00457B] focus:ring-[#00457B]"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {formData.password &&
                      formData.confirmPassword &&
                      formData.password !== formData.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">Las contraseñas no coinciden</p>
                      )}
                  </div>

                  <div className="flex items-start space-x-3 mt-4">
                    <Checkbox
                      id="terminos-agente"
                      name="terminos"
                      checked={formData.terminos}
                      onCheckedChange={(checked) => setFormData({ ...formData, terminos: checked as boolean })}
                      className="h-5 w-5 mt-0.5 border-gray-300 text-[#00457B] rounded"
                      required
                    />
                    <Label htmlFor="terminos-agente" className="text-gray-600 font-normal">
                      Acepto los{" "}
                      <Link href="/terminos" className="text-[#00457B] hover:underline">
                        términos y condiciones
                      </Link>{" "}
                      y la{" "}
                      <Link href="/privacidad" className="text-[#00457B] hover:underline">
                        política de privacidad
                      </Link>
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-[#00457B] hover:bg-[#003b69] rounded-xl text-lg font-medium mt-6"
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
                <Link href="/login" className="text-[#00457B] font-medium hover:underline">
                  Inicia sesión
                </Link>
              </p>
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
