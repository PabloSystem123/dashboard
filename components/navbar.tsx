import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, UserPlus } from "lucide-react"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#00457B] text-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/matriz-logo.png" alt="Matriz Inmobiliaria" width={150} height={40} />
        </Link>

        <Button asChild className="hidden md:inline-flex bg-white text-[#00457B] hover:bg-gray-100 ml-4">
          <Link href="/registro" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Crear cuenta
          </Link>
        </Button>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle({ className: "bg-transparent hover:bg-white/10 text-white" })}
                >
                  Inicio
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/nosotros" legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle({ className: "bg-transparent hover:bg-white/10 text-white" })}
                >
                  Nosotros
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 text-white">
                Inmuebles
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem href="/inmuebles?tipo=venta" title="En Venta">
                    Propiedades disponibles para compra
                  </ListItem>
                  <ListItem href="/inmuebles?tipo=alquiler" title="En Alquiler">
                    Propiedades disponibles para alquilar
                  </ListItem>
                  <ListItem href="/inmuebles?tipo=comercial" title="Comerciales">
                    Locales y oficinas comerciales
                  </ListItem>
                  <ListItem href="/inmuebles?tipo=proyectos" title="Proyectos Nuevos">
                    Desarrollos inmobiliarios en construcción
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 text-white">
                Servicios
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {services.map((service) => (
                    <ListItem
                      key={service.title}
                      href={`/servicios#${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                      title={service.title}
                    >
                      {service.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contactanos" legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle({ className: "bg-transparent hover:bg-white/10 text-white" })}
                >
                  Contáctanos
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Button asChild className="hidden md:inline-flex bg-white text-[#00457B] hover:bg-gray-100">
          <Link href="/contactanos">Iniciar sesión</Link>
        </Button>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden text-white">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-[#00457B] text-white">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-xl font-medium">
                Inicio
              </Link>
              <Link href="/nosotros" className="text-xl font-medium">
                Nosotros
              </Link>
              <Link href="/inmuebles" className="text-xl font-medium">
                Inmuebles
              </Link>
              <Link href="/servicios" className="text-xl font-medium">
                Servicios
              </Link>
              <Link href="/contactanos" className="text-xl font-medium">
                Contáctanos
              </Link>
              <Button asChild className="mt-4 bg-white text-[#00457B] hover:bg-gray-100">
                <Link href="/contactanos">Iniciar sesión</Link>
              </Button>
              <Button asChild className="mt-4 bg-white text-[#00457B] hover:bg-gray-100">
                <Link href="/registro" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Crear cuenta
                </Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a"> & { title: string }>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"

const services = [
  {
    title: "Compra y Venta",
    description: "Asesoramiento completo en el proceso de compra y venta de propiedades.",
  },
  {
    title: "Alquiler",
    description: "Gestión integral de alquileres y administración de propiedades.",
  },
  {
    title: "Tasaciones",
    description: "Valoración profesional de inmuebles para conocer el precio real de mercado.",
  },
  {
    title: "Asesoría Legal",
    description: "Asesoramiento legal en todas las etapas de la transacción inmobiliaria.",
  },
]
