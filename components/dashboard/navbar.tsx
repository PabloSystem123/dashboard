"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, MessageSquare, Search, Settings, User, LogOut, Moon, Sun, ChevronDown } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface NavbarProps {
  userType: "admin" | "subadmin" | "user"
}

export function DashboardNavbar({ userType }: NavbarProps) {
  const [isDark, setIsDark] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = () => {
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente.",
    })
    setTimeout(() => {
      router.push("/")
    }, 1000)
  }

  const getNavbarColors = () => {
    switch (userType) {
      case "admin":
        return {
          bg: "bg-white/80 backdrop-blur-xl border-purple-200/50",
          accent: "text-purple-600",
          hover: "hover:bg-purple-50",
        }
      case "subadmin":
        return {
          bg: "bg-white/80 backdrop-blur-xl border-emerald-200/50",
          accent: "text-emerald-600",
          hover: "hover:bg-emerald-50",
        }
      default:
        return {
          bg: "bg-white/80 backdrop-blur-xl border-indigo-200/50",
          accent: "text-indigo-600",
          hover: "hover:bg-indigo-50",
        }
    }
  }

  const colors = getNavbarColors()

  const getUserInfo = () => {
    switch (userType) {
      case "admin":
        return { name: "Admin Principal", role: "Administrador", avatar: "/avatar-1.jpg" }
      case "subadmin":
        return { name: "Sub Admin", role: "Sub-Administrador", avatar: "/avatar-2.jpg" }
      default:
        return { name: "Juan Pérez", role: "Cliente", avatar: "/avatar-user.jpg" }
    }
  }

  const userInfo = getUserInfo()

  return (
    <header className={`sticky top-0 z-40 ${colors.bg} border-b shadow-lg`}>
      <div className="flex h-16 items-center justify-between px-6">
        {/* Search */}
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar..."
              className="pl-10 bg-white/50 border-gray-200/50 focus:bg-white focus:border-gray-300 transition-all"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDark(!isDark)}
            className={`h-9 w-9 rounded-full ${colors.hover}`}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button variant="ghost" size="icon" className={`h-9 w-9 rounded-full ${colors.hover}`}>
              <Bell className="h-4 w-4" />
            </Button>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              3
            </span>
          </div>

          {/* Messages */}
          <div className="relative">
            <Button variant="ghost" size="icon" className={`h-9 w-9 rounded-full ${colors.hover}`}>
              <MessageSquare className="h-4 w-4" />
            </Button>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              5
            </span>
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-gray-200"></div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className={`flex items-center gap-3 px-3 py-2 h-auto ${colors.hover} rounded-xl`}>
                <Avatar className="h-8 w-8 ring-2 ring-white shadow-md">
                  <AvatarImage src={userInfo.avatar || "/placeholder.svg"} alt={userInfo.name} />
                  <AvatarFallback className={`${colors.accent} bg-gray-100 font-bold`}>
                    {userInfo.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-gray-800">{userInfo.name}</p>
                  <p className="text-xs text-gray-500">{userInfo.role}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-xl border-gray-200/50 shadow-xl">
              <DropdownMenuLabel className="font-semibold">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={userInfo.avatar || "/placeholder.svg"} alt={userInfo.name} />
                    <AvatarFallback className={`${colors.accent} bg-gray-100`}>
                      {userInfo.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{userInfo.name}</p>
                    <Badge variant="outline" className="text-xs">
                      {userInfo.role}
                    </Badge>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href={`/${userType === "user" ? "dashboard" : userType}/perfil`}
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Mi Perfil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={`/${userType === "user" ? "dashboard" : userType}/configuracion`}
                  className="flex items-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Configuración
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
