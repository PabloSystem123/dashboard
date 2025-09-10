"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  LayoutDashboard,
  Building2,
  Calendar,
  DollarSign,
  Home,
  FileText,
  Shield,
  Users,
  UserCheck,
  ChevronDown,
  ChevronRight,
  UserPlus,
  CalendarCheck,
  ShoppingCart,
  UserCog,
  ClipboardList,
  Settings,
  LogOut,
} from "lucide-react"

interface SidebarProps {
  userRole: "admin" | "subadmin" | "employee"
}

interface MenuItem {
  title: string
  icon: any
  href?: string
  children?: MenuItem[]
}

export function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname()
  const [openSections, setOpenSections] = useState<string[]>([
    "inmuebles",
    "citas",
    "ventas",
    "arriendos",
    "reportes",
    "seguridad",
  ])

  const toggleSection = (section: string) => {
    setOpenSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const menuItems: MenuItem[] = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: userRole === "admin" ? "/admin" : userRole === "subadmin" ? "/subadmin" : "/dashboard",
    },
    {
      title: "Inmuebles",
      icon: Building2,
      children: [
        {
          title: "Gestión de Inmuebles",
          icon: Building2,
          href: `/${userRole}/inmuebles`,
        },
      ],
    },
    {
      title: "Citas",
      icon: Calendar,
      children: [
        {
          title: "Gestión de Clientes",
          icon: Users,
          href: `/${userRole}/clientes`,
        },
        {
          title: "Gestión de Citas",
          icon: CalendarCheck,
          href: `/${userRole}/citas`,
        },
      ],
    },
    {
      title: "Ventas",
      icon: DollarSign,
      children: [
        {
          title: "Gestión de Compradores",
          icon: UserPlus,
          href: `/${userRole}/compradores`,
        },
        {
          title: "Gestión de Ventas",
          icon: ShoppingCart,
          href: `/${userRole}/ventas`,
        },
      ],
    },
    {
      title: "Arriendos",
      icon: Home,
      children: [
        {
          title: "Gestión de Arrendatarios",
          icon: UserCog,
          href: `/${userRole}/arrendatarios`,
        },
        {
          title: "Gestión de Arriendos",
          icon: Home,
          href: `/${userRole}/arriendos`,
        },
      ],
    },
    {
      title: "Reportes Inmobiliarios",
      icon: FileText,
      children: [
        {
          title: "Gestión de Reportes",
          icon: ClipboardList,
          href: `/${userRole}/reportes-inmuebles`,
        },
      ],
    },
    {
      title: "Seguridad",
      icon: Shield,
      children: [
        {
          title: "Usuarios",
          icon: Users,
          href: `/${userRole}/usuarios`,
        },
        ...(userRole === "admin"
          ? [
              {
                title: "Roles",
                icon: Shield,
                href: `/${userRole}/roles`,
              },
            ]
          : []),
        {
          title: "Empleados",
          icon: UserCheck,
          href: `/${userRole}/empleados`,
        },
      ],
    },
  ]

  // Filtrar elementos según el rol
  const filteredMenuItems = menuItems.filter((item) => {
    if (userRole === "employee") {
      // Los empleados solo ven ciertas secciones
      return ["Dashboard", "Inmuebles", "Citas"].includes(item.title)
    }
    return true
  })

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/")
  }

  const isParentActive = (children: MenuItem[]) => {
    return children.some((child) => child.href && isActive(child.href))
  }

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200 shadow-lg">
      {/* Header */}
      <div className="flex h-16 items-center justify-center border-b border-gray-200 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-white/20 flex items-center justify-center">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">Matriz</span>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {filteredMenuItems.map((item) => {
            if (item.children) {
              const sectionKey = item.title.toLowerCase().replace(/\s+/g, "")
              const isOpen = openSections.includes(sectionKey)
              const hasActiveChild = isParentActive(item.children)

              return (
                <Collapsible key={item.title} open={isOpen} onOpenChange={() => toggleSection(sectionKey)}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-between h-11 px-3 text-left font-medium transition-all duration-200",
                        hasActiveChild
                          ? "bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border-l-4 border-purple-500"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon
                          className={cn(
                            "h-5 w-5 transition-colors",
                            hasActiveChild ? "text-purple-600" : "text-gray-500",
                          )}
                        />
                        <span className="text-sm">{item.title}</span>
                      </div>
                      {isOpen ? (
                        <ChevronDown className="h-4 w-4 transition-transform" />
                      ) : (
                        <ChevronRight className="h-4 w-4 transition-transform" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 mt-1">
                    {item.children.map((child) => (
                      <Link key={child.title} href={child.href || "#"}>
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-start h-10 px-3 ml-6 text-left transition-all duration-200",
                            child.href && isActive(child.href)
                              ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          )}
                        >
                          <child.icon
                            className={cn(
                              "h-4 w-4 mr-3 transition-colors",
                              child.href && isActive(child.href) ? "text-white" : "text-gray-400",
                            )}
                          />
                          <span className="text-sm">{child.title}</span>
                        </Button>
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              )
            }

            return (
              <Link key={item.title} href={item.href || "#"}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start h-11 px-3 text-left font-medium transition-all duration-200",
                    item.href && isActive(item.href)
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 mr-3 transition-colors",
                      item.href && isActive(item.href) ? "text-white" : "text-gray-500",
                    )}
                  />
                  <span className="text-sm">{item.title}</span>
                </Button>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t border-gray-200 p-3 space-y-2">
        <Link href={`/${userRole}/perfil`}>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start h-10 px-3 text-left transition-all duration-200",
              isActive(`/${userRole}/perfil`)
                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-100",
            )}
          >
            <Settings className="h-4 w-4 mr-3" />
            <span className="text-sm">Configuración</span>
          </Button>
        </Link>
        <Link href="/login">
          <Button
            variant="ghost"
            className="w-full justify-start h-10 px-3 text-left text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
          >
            <LogOut className="h-4 w-4 mr-3" />
            <span className="text-sm">Cerrar Sesión</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}

// Wrapper que expone el componente con el nombre correcto y adapta la prop
interface DashboardSidebarProps {
  userType: "admin" | "subadmin" | "user"
}

export function DashboardSidebar({ userType }: DashboardSidebarProps) {
  // Mapear los posibles valores que llegan desde los layouts
  const roleMap = {
    admin: "admin",
    subadmin: "subadmin",
    user: "employee",
  } as const

  return <Sidebar userRole={roleMap[userType]} />
}
