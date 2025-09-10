import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "../../../shared/utils/cn"
import { Button } from "../../../shared/components/ui/button"
import { ScrollArea } from "../../../shared/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../../shared/components/ui/collapsible"
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
  Menu,
  X,
} from "lucide-react"

export default function DashboardSidebar({ userType }) {
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [openSections, setOpenSections] = useState([
    "inmuebles",
    "citas", 
    "ventas",
    "arriendos",
    "reportes",
    "seguridad",
  ])

  const toggleSection = (section) => {
    setOpenSections((prev) => 
      prev.includes(section) 
        ? prev.filter((s) => s !== section) 
        : [...prev, section]
    )
  }

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: userType === "admin" ? "/admin" : userType === "subadmin" ? "/subadmin" : "/dashboard",
    },
    {
      title: "Inmuebles",
      icon: Building2,
      children: [
        {
          title: "Gestión de Inmuebles",
          icon: Building2,
          href: `/${userType}/inmuebles`,
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
          href: `/${userType}/clientes`,
        },
        {
          title: "Gestión de Citas",
          icon: CalendarCheck,
          href: `/${userType}/citas`,
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
          href: `/${userType}/compradores`,
        },
        {
          title: "Gestión de Ventas",
          icon: ShoppingCart,
          href: `/${userType}/ventas`,
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
          href: `/${userType}/arrendatarios`,
        },
        {
          title: "Gestión de Arriendos",
          icon: Home,
          href: `/${userType}/arriendos`,
        },
      ],
    },
    {
      title: "Reportes",
      icon: FileText,
      children: [
        {
          title: "Reportes Generales",
          icon: ClipboardList,
          href: `/${userType}/reportes`,
        },
        {
          title: "Reportes Inmuebles",
          icon: FileText,
          href: `/${userType}/reportes-inmuebles`,
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
          href: `/${userType}/usuarios`,
        },
        ...(userType === "admin"
          ? [
              {
                title: "Roles",
                icon: Shield,
                href: `/${userType}/roles`,
              },
            ]
          : []),
        {
          title: "Empleados",
          icon: UserCheck,
          href: `/${userType}/empleados`,
        },
      ],
    },
    ...(userType === "admin" ? [
      {
        title: "Pagos",
        icon: CreditCard,
        href: `/${userType}/pagos`,
      },
    ] : []),
  ]

  const filteredMenuItems = menuItems.filter((item) => {
    if (userType === "user") {
      return ["Dashboard", "Inmuebles", "Citas"].includes(item.title)
    }
    return true
  })

  const isActive = (href) => {
    return location.pathname === href || location.pathname.startsWith(href + "/")
  }

  const isParentActive = (children) => {
    return children.some((child) => child.href && isActive(child.href))
  }

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}
      
      <div className={cn(
        "fixed left-0 top-0 z-50 h-full transition-all duration-300 ease-in-out lg:relative lg:translate-x-0",
        isCollapsed ? "-translate-x-full lg:w-20" : "translate-x-0 w-80 lg:w-80"
      )}>
        {/* Sidebar container with gradient background */}
        <div className="h-full bg-gradient-to-b from-[#00457B] via-[#0066CC] to-[#0080FF] shadow-2xl relative overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
            <div className="absolute top-1/4 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-1/4 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          </div>

          {/* Header */}
          <div className="relative z-10 flex h-20 items-center justify-between px-6 border-b border-white/20">
            <div className={cn(
              "flex items-center gap-3 transition-all duration-300",
              isCollapsed && "lg:justify-center"
            )}>
              <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <span className="text-xl font-bold text-white">IT</span>
              </div>
              {!isCollapsed && (
                <div className="animate-fade-in">
                  <h1 className="text-xl font-bold text-white">InmoTech</h1>
                  <p className="text-xs text-blue-100">Dashboard Inmobiliario</p>
                </div>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-white hover:bg-white/20 transition-all duration-200 lg:hidden"
            >
              {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
            </Button>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-4 py-6 relative z-10">
            <nav className="space-y-2">
              {filteredMenuItems.map((item) => {
                if (item.children) {
                  const sectionKey = item.title.toLowerCase().replace(/\s+/g, "")
                  const isOpen = openSections.includes(sectionKey)
                  const hasActiveChild = isParentActive(item.children)

                  return (
                    <Collapsible key={item.title} open={isOpen && !isCollapsed} onOpenChange={() => toggleSection(sectionKey)}>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-between h-12 px-4 text-left font-medium transition-all duration-200 rounded-xl group",
                            hasActiveChild
                              ? "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30"
                              : "text-blue-100 hover:bg-white/10 hover:text-white hover:shadow-md",
                            isCollapsed && "lg:justify-center lg:px-2"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon
                              className={cn(
                                "h-5 w-5 transition-all duration-200 group-hover:scale-110",
                                hasActiveChild ? "text-white" : "text-blue-200",
                              )}
                            />
                            {!isCollapsed && (
                              <span className="text-sm font-medium">{item.title}</span>
                            )}
                          </div>
                          {!isCollapsed && (
                            <div className="transition-transform duration-200">
                              {isOpen ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </div>
                          )}
                        </Button>
                      </CollapsibleTrigger>
                      {!isCollapsed && (
                        <CollapsibleContent className="space-y-1 mt-2 animate-accordion-down">
                          {item.children.map((child) => (
                            <Link key={child.title} to={child.href || "#"}>
                              <Button
                                variant="ghost"
                                className={cn(
                                  "w-full justify-start h-10 px-4 ml-6 text-left transition-all duration-200 rounded-lg group",
                                  child.href && isActive(child.href)
                                    ? "bg-white text-[#00457B] shadow-md font-medium"
                                    : "text-blue-100 hover:bg-white/10 hover:text-white hover:translate-x-1",
                                )}
                              >
                                <child.icon
                                  className={cn(
                                    "h-4 w-4 mr-3 transition-all duration-200 group-hover:scale-110",
                                    child.href && isActive(child.href) ? "text-[#00457B]" : "text-blue-200",
                                  )}
                                />
                                <span className="text-sm">{child.title}</span>
                              </Button>
                            </Link>
                          ))}
                        </CollapsibleContent>
                      )}
                    </Collapsible>
                  )
                }

                return (
                  <Link key={item.title} to={item.href || "#"}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start h-12 px-4 text-left font-medium transition-all duration-200 rounded-xl group",
                        item.href && isActive(item.href)
                          ? "bg-white text-[#00457B] shadow-lg font-semibold"
                          : "text-blue-100 hover:bg-white/10 hover:text-white hover:shadow-md hover:translate-x-1",
                        isCollapsed && "lg:justify-center lg:px-2"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-5 w-5 transition-all duration-200 group-hover:scale-110",
                          item.href && isActive(item.href) ? "text-[#00457B]" : "text-blue-200",
                          !isCollapsed && "mr-3"
                        )}
                      />
                      {!isCollapsed && (
                        <span className="text-sm">{item.title}</span>
                      )}
                    </Button>
                  </Link>
                )
              })}
            </nav>
          </ScrollArea>

          {/* Footer */}
          <div className="relative z-10 border-t border-white/20 p-4 space-y-2">
            <Link to={`/${userType}/perfil`}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start h-10 px-4 text-left transition-all duration-200 rounded-lg group",
                  isActive(`/${userType}/perfil`)
                    ? "bg-white text-[#00457B] shadow-md"
                    : "text-blue-100 hover:bg-white/10 hover:text-white",
                  isCollapsed && "lg:justify-center lg:px-2"
                )}
              >
                <Settings className={cn(
                  "h-4 w-4 transition-all duration-200 group-hover:scale-110",
                  !isCollapsed && "mr-3"
                )} />
                {!isCollapsed && (
                  <span className="text-sm">Configuración</span>
                )}
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start h-10 px-4 text-left text-red-200 hover:bg-red-500/20 hover:text-red-100 transition-all duration-200 rounded-lg group",
                  isCollapsed && "lg:justify-center lg:px-2"
                )}
              >
                <LogOut className={cn(
                  "h-4 w-4 transition-all duration-200 group-hover:scale-110",
                  !isCollapsed && "mr-3"
                )} />
                {!isCollapsed && (
                  <span className="text-sm">Cerrar Sesión</span>
                )}
              </Button>
            </Link>
          </div>

          {/* Collapse toggle for desktop */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex absolute -right-3 top-20 z-20 h-6 w-6 rounded-full bg-white text-[#00457B] shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
          >
            {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronDown className="h-3 w-3 rotate-90" />}
          </Button>
        </div>
      </div>
    </>
  )
}