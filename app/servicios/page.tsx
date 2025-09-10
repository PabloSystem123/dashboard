import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Home, Key, Building2, Briefcase, Users, CheckCircle } from "lucide-react"

export default function ServiciosPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <Image src="/services-hero.jpg" alt="Servicios" fill className="object-cover brightness-[0.65]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Nuestros Servicios</h1>
          <p className="text-lg max-w-2xl">Soluciones inmobiliarias integrales para todas tus necesidades.</p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0c4a7b] mb-4">Servicios Inmobiliarios</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              En Matriz Inmobiliaria ofrecemos una amplia gama de servicios diseñados para satisfacer todas tus
              necesidades en el mercado inmobiliario.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-[#0c4a7b]/10 flex items-center justify-center mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl text-[#0c4a7b]" id={service.title.toLowerCase().replace(/\s+/g, "-")}>
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-[#0c4a7b] mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-[#0c4a7b] hover:bg-[#0a3d68]">
                    <Link href="/contactanos">Solicitar información</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0c4a7b] mb-4">Cómo Trabajamos</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nuestro proceso está diseñado para brindarte una experiencia inmobiliaria sin complicaciones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#0c4a7b] text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0c4a7b] mb-4">Detalles de Nuestros Servicios</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conoce más sobre cada uno de nuestros servicios y cómo pueden ayudarte.
            </p>
          </div>

          <Tabs defaultValue="compra-venta" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
              <TabsTrigger value="compra-venta">Compra y Venta</TabsTrigger>
              <TabsTrigger value="alquiler">Alquiler</TabsTrigger>
              <TabsTrigger value="tasaciones">Tasaciones</TabsTrigger>
              <TabsTrigger value="asesoria-legal">Asesoría Legal</TabsTrigger>
              <TabsTrigger value="inversiones">Inversiones</TabsTrigger>
            </TabsList>
            {serviceDetails.map((service) => (
              <TabsContent key={service.id} value={service.id} className="p-6 border rounded-lg">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-[#0c4a7b] mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2 mb-6">
                      {service.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-[#0c4a7b] mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="bg-[#0c4a7b] hover:bg-[#0a3d68]">
                      <Link href="/contactanos">Solicitar este servicio</Link>
                    </Button>
                  </div>
                  <div className="relative h-[300px] rounded-lg overflow-hidden">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0c4a7b] mb-4">Preguntas Frecuentes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Respuestas a las preguntas más comunes sobre nuestros servicios inmobiliarios.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0c4a7b] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para comenzar?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Nuestro equipo de expertos está listo para ayudarte con cualquiera de nuestros servicios inmobiliarios.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#0c4a7b]"
            >
              <Link href="/contactanos">Contáctanos</Link>
            </Button>
            <Button asChild size="lg" className="bg-white text-[#0c4a7b] hover:bg-gray-100">
              <Link href="/inmuebles">Ver propiedades</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

// Data
const services = [
  {
    title: "Compra y Venta",
    description: "Asesoramiento completo en el proceso de compra y venta de propiedades residenciales y comerciales.",
    icon: <Home className="h-6 w-6 text-[#0c4a7b]" />,
    features: [
      "Valoración profesional de la propiedad",
      "Marketing y promoción estratégica",
      "Negociación con potenciales compradores",
      "Acompañamiento en todo el proceso legal",
      "Asesoría financiera y fiscal",
    ],
  },
  {
    title: "Alquiler",
    description:
      "Gestión integral de alquileres, desde la búsqueda de inquilinos hasta la administración de la propiedad.",
    icon: <Key className="h-6 w-6 text-[#0c4a7b]" />,
    features: [
      "Búsqueda y selección de inquilinos",
      "Redacción y gestión de contratos",
      "Cobro de rentas y depósitos",
      "Mantenimiento y reparaciones",
      "Resolución de incidencias",
    ],
  },
  {
    title: "Tasaciones",
    description: "Valoración profesional de inmuebles para conocer el precio real de mercado de tu propiedad.",
    icon: <Building2 className="h-6 w-6 text-[#0c4a7b]" />,
    features: [
      "Análisis comparativo de mercado",
      "Evaluación detallada de la propiedad",
      "Informe profesional de valoración",
      "Asesoramiento sobre mejoras para aumentar el valor",
      "Actualización periódica de la tasación",
    ],
  },
  {
    title: "Asesoría Legal",
    description: "Asesoramiento legal en todas las etapas de la transacción inmobiliaria para tu tranquilidad.",
    icon: <Briefcase className="h-6 w-6 text-[#0c4a7b]" />,
    features: [
      "Revisión y redacción de contratos",
      "Verificación de documentación legal",
      "Gestión de trámites notariales y registrales",
      "Asesoramiento fiscal",
      "Resolución de conflictos",
    ],
  },
  {
    title: "Inversiones",
    description: "Consultoría especializada para inversores inmobiliarios que buscan maximizar su rentabilidad.",
    icon: <Users className="h-6 w-6 text-[#0c4a7b]" />,
    features: [
      "Análisis de oportunidades de inversión",
      "Estudios de rentabilidad",
      "Gestión de carteras inmobiliarias",
      "Asesoramiento en proyectos de desarrollo",
      "Estrategias de diversificación",
    ],
  },
]

const process = [
  {
    title: "Consulta Inicial",
    description: "Entendemos tus necesidades y objetivos para ofrecerte el mejor servicio personalizado.",
  },
  {
    title: "Planificación Estratégica",
    description: "Desarrollamos un plan de acción detallado adaptado a tus requerimientos específicos.",
  },
  {
    title: "Implementación",
    description: "Ejecutamos el plan con profesionalismo, manteniéndote informado en cada paso del proceso.",
  },
  {
    title: "Seguimiento y Cierre",
    description: "Garantizamos que todo se complete satisfactoriamente y te brindamos soporte post-servicio.",
  },
]

const serviceDetails = [
  {
    id: "compra-venta",
    title: "Servicio de Compra y Venta",
    description:
      "Nuestro servicio de compra y venta está diseñado para hacer que el proceso sea lo más sencillo y rentable posible para ti. Contamos con un equipo de expertos que te guiarán en cada paso del camino.",
    benefits: [
      "Análisis de mercado para determinar el precio óptimo",
      "Fotografía profesional y marketing digital de la propiedad",
      "Preselección de compradores potenciales",
      "Negociación para obtener las mejores condiciones",
      "Acompañamiento hasta la firma de la escritura",
    ],
    image: "/service-buy-sell.jpg",
  },
  {
    id: "alquiler",
    title: "Servicio de Alquiler",
    description:
      "Maximiza el rendimiento de tu propiedad con nuestro servicio integral de alquiler. Nos encargamos de todo el proceso, desde la búsqueda de inquilinos hasta la gestión diaria de la propiedad.",
    benefits: [
      "Estudio de mercado para establecer el precio de alquiler óptimo",
      "Promoción efectiva para atraer a inquilinos cualificados",
      "Verificación exhaustiva de antecedentes de los inquilinos",
      "Gestión profesional de contratos y depósitos",
      "Servicio de mantenimiento y atención de incidencias 24/7",
    ],
    image: "/service-rental.jpg",
  },
  {
    id: "tasaciones",
    title: "Servicio de Tasaciones",
    description:
      "Conoce el valor real de tu propiedad con nuestro servicio de tasación profesional. Utilizamos métodos avanzados y datos actualizados del mercado para ofrecerte una valoración precisa.",
    benefits: [
      "Evaluación detallada de las características de la propiedad",
      "Análisis comparativo con propiedades similares en la zona",
      "Consideración de factores que afectan el valor (ubicación, estado, etc.)",
      "Informe completo con valoración y recomendaciones",
      "Asesoramiento sobre posibles mejoras para aumentar el valor",
    ],
    image: "/service-valuation.jpg",
  },
  {
    id: "asesoria-legal",
    title: "Servicio de Asesoría Legal",
    description:
      "Nuestro equipo legal especializado en derecho inmobiliario te brinda la tranquilidad que necesitas en cada transacción. Nos aseguramos de que todos los aspectos legales estén cubiertos.",
    benefits: [
      "Revisión exhaustiva de toda la documentación legal",
      "Redacción y verificación de contratos",
      "Asesoramiento en aspectos fiscales y tributarios",
      "Gestión de trámites ante notarías y registros",
      "Resolución de conflictos y representación legal",
    ],
    image: "/service-legal.jpg",
  },
  {
    id: "inversiones",
    title: "Servicio de Inversiones",
    description:
      "Maximiza el rendimiento de tus inversiones inmobiliarias con nuestro asesoramiento especializado. Identificamos las mejores oportunidades según tus objetivos financieros.",
    benefits: [
      "Análisis detallado del mercado y tendencias",
      "Identificación de propiedades con alto potencial de rentabilidad",
      "Estudios de viabilidad y proyecciones financieras",
      "Estrategias de diversificación de cartera inmobiliaria",
      "Asesoramiento continuo y seguimiento de inversiones",
    ],
    image: "/service-investment.jpg",
  },
]

const faqs = [
  {
    question: "¿Cuánto tiempo toma vender una propiedad?",
    answer:
      "El tiempo de venta puede variar dependiendo de varios factores como la ubicación, el precio, las condiciones del mercado y el estado de la propiedad. En promedio, una propiedad bien valorada y en buenas condiciones puede venderse en un plazo de 2 a 3 meses. Nuestro equipo trabaja para optimizar este proceso y lograr la venta en el menor tiempo posible.",
  },
  {
    question: "¿Qué documentos necesito para vender mi propiedad?",
    answer:
      "Para vender una propiedad generalmente necesitarás: el título de propiedad, certificado de libertad y tradición, paz y salvo de impuestos y servicios públicos, certificado de no afectación, planos de la propiedad y, en algunos casos, licencias de construcción o remodelación. Nuestro equipo legal te ayudará a recopilar y verificar toda la documentación necesaria.",
  },
  {
    question: "¿Cómo determinan el precio de alquiler de mi propiedad?",
    answer:
      "El precio de alquiler se determina mediante un análisis de mercado que considera factores como la ubicación, tamaño, estado de la propiedad, amenidades, demanda en la zona y precios de propiedades similares. Nuestro objetivo es establecer un precio competitivo que maximice tu rentabilidad mientras asegura una ocupación rápida.",
  },
  {
    question: "¿Qué incluye el servicio de administración de propiedades?",
    answer:
      "Nuestro servicio de administración incluye: búsqueda y selección de inquilinos, redacción y gestión de contratos, cobro de rentas, inspecciones periódicas, mantenimiento preventivo y correctivo, atención de emergencias 24/7, gestión de pagos (impuestos, servicios, etc.) y reportes financieros mensuales sobre el rendimiento de tu propiedad.",
  },
  {
    question: "¿Ofrecen asesoramiento para inversores extranjeros?",
    answer:
      "Sí, contamos con un servicio especializado para inversores extranjeros que incluye asesoramiento legal sobre regulaciones locales, trámites migratorios relacionados con la inversión, aspectos fiscales internacionales, apertura de cuentas bancarias locales y gestión integral de la inversión a distancia.",
  },
  {
    question: "¿Cuál es el costo de sus servicios?",
    answer:
      "Nuestras tarifas varían según el tipo de servicio y las características específicas de cada propiedad. Para servicios de venta, generalmente trabajamos con un porcentaje sobre el valor final de la transacción. Para servicios de alquiler y administración, las tarifas suelen basarse en un porcentaje del canon mensual. Te invitamos a contactarnos para recibir una cotización personalizada.",
  },
]
