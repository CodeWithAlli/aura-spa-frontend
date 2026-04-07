import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Leaf, Hand, Sparkles, Flower2, Zap, Gem } from "lucide-react";

const services = [
  {
    icon: Leaf,
    title: "Faciales",
    description: "Tratamientos personalizados para tu tipo de piel con ingredientes naturales de primera calidad.",
    price: "Desde S/. 120",
    color: "from-forest/5 to-forest/10",
  },
  {
    icon: Hand,
    title: "Masajes Relajantes",
    description: "Libera tensiones con nuestras técnicas especializadas inspiradas en tradiciones ancestrales.",
    price: "Desde S/. 90",
    color: "from-gold/5 to-gold/10",
  },
  {
    icon: Sparkles,
    title: "Limpieza Facial Profunda",
    description: "Poros limpios, piel radiante. Tecnología avanzada para una piel perfectamente purificada.",
    price: "Desde S/. 80",
    color: "from-sand/30 to-sand/60",
  },
  {
    icon: Flower2,
    title: "Tratamientos Corporales",
    description: "Envolvimientos y exfoliaciones premium que revitalizan y nutren tu piel de pies a cabeza.",
    price: "Desde S/. 150",
    color: "from-forest/5 to-gold/5",
  },
  {
    icon: Zap,
    title: "Depilación Láser",
    description: "Resultados duraderos con tecnología avanzada de última generación. Piel suave para siempre.",
    price: "Desde S/. 200",
    color: "from-gold/5 to-forest/5",
  },
  {
    icon: Gem,
    title: "Manicure & Pedicure",
    description: "Arte y cuidado para tus manos y pies. Diseños personalizados con productos premium.",
    price: "Desde S/. 60",
    color: "from-sand/20 to-sand/40",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={`group bg-gradient-to-br ${service.color} border border-sand rounded-2xl p-8 cursor-pointer relative overflow-hidden`}
    >
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-all duration-300 rounded-2xl" />

      <div className="relative z-10">
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-shadow duration-300">
          <Icon size={22} className="text-forest" strokeWidth={1.5} />
        </div>

        <h3 className="font-serif text-xl text-forestDark mb-3 font-medium">{service.title}</h3>
        <p className="font-sans text-sm text-textMuted leading-relaxed mb-6">{service.description}</p>

        <div className="flex items-center justify-between">
          <span className="font-sans text-sm font-medium text-gold">{service.price}</span>
          <button
            onClick={() => { const el = document.querySelector("#reservas"); el?.scrollIntoView({ behavior: "smooth" }); }}
            className="font-sans text-xs text-forestDark/60 hover:text-forest group-hover:text-forest transition-colors duration-200 tracking-wide underline underline-offset-2 focus:outline-none focus:text-forest"
            aria-label={`Ver más sobre ${service.title}`}
          >
            Ver más →
          </button>
        </div>
      </div>

      <motion.div
        className="absolute -bottom-8 -right-8 w-24 h-24 bg-gold/5 rounded-full"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
      />
    </motion.div>
  );
}

export default function ServicesGrid() {
  return (
    <section id="servicios" className="py-24 lg:py-32 bg-cream" aria-label="Nuestros Servicios">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-sans text-gold text-xs tracking-[0.3em] uppercase mb-4">Lo que ofrecemos</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-forestDark font-light mb-6">
            Nuestros Servicios
          </h2>
          <p className="font-sans text-textMuted max-w-xl mx-auto leading-relaxed">
            Cada servicio ha sido diseñado para ofrecerte la más alta experiencia de bienestar,
            con técnicas que combinan tradición y vanguardia.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
