import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#00457B] text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: About */}
          <div>
            <div className="flex justify-center md:justify-start mb-6">
              <Image src="/matriz-logo-white.png" alt="Matriz Inmobiliaria" width={180} height={60} />
            </div>
            <p className="text-gray-300 mb-6 text-center md:text-left">
              Somos una inmobiliaria comprometida con brindar el mejor servicio y asesoramiento en la compra, venta y
              alquiler de propiedades.
            </p>
            <div className="flex justify-center md:justify-start space-x-5">
              <Link
                href="https://facebook.com"
                className="bg-blue-800/30 hover:bg-blue-800/50 transition-colors p-2.5 rounded-full"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://instagram.com"
                className="bg-blue-800/30 hover:bg-blue-800/50 transition-colors p-2.5 rounded-full"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://twitter.com"
                className="bg-blue-800/30 hover:bg-blue-800/50 transition-colors p-2.5 rounded-full"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://linkedin.com"
                className="bg-blue-800/30 hover:bg-blue-800/50 transition-colors p-2.5 rounded-full"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-6 relative pb-3 inline-block">
              Enlaces Rápidos
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-400"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-blue-300 transition-colors inline-block">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="hover:text-blue-300 transition-colors inline-block">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/inmuebles" className="hover:text-blue-300 transition-colors inline-block">
                  Inmuebles
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="hover:text-blue-300 transition-colors inline-block">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/contactanos" className="hover:text-blue-300 transition-colors inline-block">
                  Contáctanos
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-blue-300 transition-colors inline-block">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-6 relative pb-3 inline-block">
              Información de Contacto
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-400"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start justify-center md:justify-start">
                <MapPin className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0 text-blue-300" />
                <span>Calle Principal #123, Ciudad, País</span>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <Phone className="h-5 w-5 mr-3 flex-shrink-0 text-blue-300" />
                <span>+123 456 7890</span>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <Mail className="h-5 w-5 mr-3 flex-shrink-0 text-blue-300" />
                <span>info@matrizinmobiliaria.com</span>
              </li>
              <li className="flex items-start justify-center md:justify-start">
                <Clock className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0 text-blue-300" />
                <div>
                  <p>Lunes - Viernes: 9:00 AM - 6:00 PM</p>
                  <p>Sábados: 9:00 AM - 1:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-6 relative pb-3 inline-block">
              Suscríbete a nuestro boletín
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-400"></span>
            </h3>
            <p className="text-gray-300 mb-6">
              Recibe las últimas novedades y ofertas inmobiliarias directamente en tu correo.
            </p>
            <form className="space-y-3">
              <Input
                type="email"
                placeholder="Tu correo electrónico"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400"
              />
              <Button type="submit" className="w-full bg-white text-[#00457B] hover:bg-gray-100 font-medium">
                Suscribirse
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-blue-800/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-300 text-center md:text-left">
              © {new Date().getFullYear()} Matriz Inmobiliaria. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-4 md:mt-0">
              <Link href="/terminos-condiciones" className="text-sm text-gray-300 hover:text-white">
                Términos y Condiciones
              </Link>
              <Link href="/politica-privacidad" className="text-sm text-gray-300 hover:text-white">
                Política de Privacidad
              </Link>
              <Link href="/mapa-sitio" className="text-sm text-gray-300 hover:text-white">
                Mapa del Sitio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
