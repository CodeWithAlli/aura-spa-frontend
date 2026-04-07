import { motion } from "framer-motion";
import { Check, Clock, DollarSign } from "lucide-react";

const treatments = [
  {
    name: "Ritual Rejuvenecedor Facial",
    duration: "90 minutos",
    price: "S/. 250",
    description:
      "Una experiencia de lujo que combina limpieza profunda, exfoliación enzimática, masaje facial y mascarilla de colágeno. Tu piel emerge completamente renovada, luminosa y perfectamente hidratada.",
    benefits: [
      "Reducción visible de líneas de expresión",
      "Hidratación profunda de 72 horas",
      "Poros minimizados y piel uniforme",
      "Efecto lifting inmediato",
      "Protección antioxidante avanzada",
    ],
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop",
    alt: "Tratamiento facial de lujo en Aura Spa",
  },
  {
    name: "Masaje de Piedras Calientes",
    duration: "75 minutos",
    price: "S/. 190",
    description:
      "El calor suave de las piedras volcánicas penetra en los músculos más profundos para liberar tensiones acumuladas. Una experiencia ancestral que equilibra la energía y promueve el bienestar total.",
    benefits: [
      "Alivio profundo de tensiones musculares",
      "Mejora de la circulación sanguínea",
      "Reducción del estrés y ansiedad",
      "Equilibrio energético corporal",
      "Sueño reparador garantizado",
    ],
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop",
    alt: "Masaje con piedras calientes en Aura Spa",
  },
  {
    name: "Envolvimiento de Oro y Algas",
    duration: "60 minutos",
    price: "S/. 320",
    description:
      "Nuestro tratamiento más exclusivo. Partículas de oro coloidal y extractos de algas marinas se fusionan para nutrir, firmar y luminizar tu piel. Un ritual de belleza digno de las más exigentes.",
    benefits: [
      "Firmeza y elasticidad mejoradas",
      "Efecto detox y purificante",
      "Nutrición celular profunda",
      "Brillo y luminosidad instantáneos",
      "Efecto antiedad comprobado",
    ],
    image: "https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&auto=format&fit=crop",
    alt: "Tratamiento corporal de lujo en Aura Spa",
  },
];

function TreatmentItem({ treatment, index }: { treatment: typeof treatments[0]; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
        isEven ? "" : "lg:flex-row-reverse"
      }`}
    >
      <div className={`relative ${isEven ? "" : "lg:order-2"}`}>
        <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
          <img
            src={treatment.image}
            alt={treatment.alt}
            loading="lazy"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="absolute -bottom-4 -right-4 bg-gold text-forestDark font-sans text-sm font-medium px-5 py-3 rounded-xl shadow-lg">
          {treatment.price}
        </div>
      </div>

      <div className={isEven ? "" : "lg:order-1"}>
        <div className="flex items-center gap-4 mb-6">
          <span className="font-sans text-xs text-textMuted flex items-center gap-1.5 bg-sand rounded-full px-3 py-1.5">
            <Clock size={12} /> {treatment.duration}
          </span>
        </div>

        <h3 className="font-serif text-3xl md:text-4xl text-forestDark font-light mb-4">
          {treatment.name}
        </h3>
        <p className="font-sans text-textMuted leading-relaxed mb-8">{treatment.description}</p>

        <ul className="space-y-3 mb-8" aria-label="Beneficios del tratamiento">
          {treatment.benefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-3 font-sans text-sm text-forestDark/80">
              <span className="flex-shrink-0 w-5 h-5 bg-forest/10 rounded-full flex items-center justify-center">
                <Check size={11} className="text-forest" strokeWidth={2.5} />
              </span>
              {benefit}
            </li>
          ))}
        </ul>

        <button
          onClick={() => { const el = document.querySelector("#reservas"); el?.scrollIntoView({ behavior: "smooth" }); }}
          className="bg-forest text-cream font-sans font-medium text-sm px-7 py-3.5 rounded-full hover:bg-forestDark active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-forest/30"
          aria-label={`Reservar ${treatment.name}`}
        >
          Reservar Este Tratamiento
        </button>
      </div>
    </motion.div>
  );
}

export default function TreatmentsShowcase() {
  return (
    <section id="tratamientos" className="py-24 lg:py-32 bg-sand/30" aria-label="Tratamientos destacados">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-sans text-gold text-xs tracking-[0.3em] uppercase mb-4">Experiencias Exclusivas</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-forestDark font-light mb-6">
            Tratamientos Destacados
          </h2>
          <p className="font-sans text-textMuted max-w-xl mx-auto leading-relaxed">
            Cada tratamiento es un viaje sensorial diseñado por nuestros especialistas
            para transformar tu experiencia de bienestar.
          </p>
        </motion.div>

        <div className="space-y-24">
          {treatments.map((treatment, index) => (
            <TreatmentItem key={treatment.name} treatment={treatment} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-20"
        >
          <button
            onClick={() => { const el = document.querySelector("#reservas"); el?.scrollIntoView({ behavior: "smooth" }); }}
            className="border-2 border-forestDark text-forestDark font-sans font-medium text-sm px-8 py-4 rounded-full hover:bg-forestDark hover:text-cream active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-forestDark/30"
          >
            Ver todos los tratamientos
          </button>
        </motion.div>
      </div>
    </section>
  );
}
