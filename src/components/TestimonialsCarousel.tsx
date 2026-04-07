import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Valentina Rodríguez",
    initials: "VR",
    service: "Ritual Rejuvenecedor Facial",
    rating: 5,
    text: "Una experiencia absolutamente transformadora. Mi piel nunca había lucido tan luminosa y radiante. Las especialistas son increíbles, te hacen sentir en un paraíso desde el primer momento.",
  },
  {
    name: "Carmen Huanca",
    initials: "CH",
    service: "Masaje de Piedras Calientes",
    rating: 5,
    text: "Llegué con tanto estrés acumulado y salí completamente renovada. El masaje con piedras fue una experiencia mística. Sin duda el mejor spa de Lima. ¡Volveré pronto!",
  },
  {
    name: "Andrea Salinas",
    initials: "AS",
    service: "Spa Day Completo",
    rating: 5,
    text: "Me regalé un día completo para mí y fue la mejor decisión. Cada detalle está pensado para que te sientas especial. El ambiente es precioso, sofisticado pero acogedor.",
  },
  {
    name: "Patricia Torres",
    initials: "PT",
    service: "Limpieza Facial Profunda",
    rating: 5,
    text: "Después de la limpieza facial mi piel quedó como seda. Las chicas son muy profesionales y te explican todo lo que hacen. Resultados increíbles desde la primera sesión.",
  },
  {
    name: "Luciana Mendoza",
    initials: "LM",
    service: "Envolvimiento de Oro y Algas",
    rating: 5,
    text: "El tratamiento de oro es simplemente lujoso. Salí sintiéndome como reina. Mi piel quedó increíblemente firme y luminosa. Vale completamente la inversión.",
  },
  {
    name: "Sofía Quispe",
    initials: "SQ",
    service: "Manicure & Pedicure",
    rating: 5,
    text: "No solo tienen manos expertas, sino que el ambiente hace que te olvides del mundo. Mis uñas quedaron perfectas y duraderas. El servicio al cliente es excepcional.",
  },
];

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setDirection("right");
    setCurrent((c) => (c + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection("left");
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const variants = {
    enter: (dir: "left" | "right") => ({
      x: dir === "right" ? 60 : -60,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: "left" | "right") => ({
      x: dir === "right" ? -60 : 60,
      opacity: 0,
    }),
  };

  const t = testimonials[current];

  return (
    <section id="testimonios" className="py-24 lg:py-32 bg-sand/30" aria-label="Testimonios de clientes">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-sans text-gold text-xs tracking-[0.3em] uppercase mb-4">Lo que dicen nuestras clientas</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-forestDark font-light">
            Testimonios
          </h2>
        </motion.div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="min-h-[320px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full"
              >
                <div className="bg-white rounded-3xl p-10 md:p-14 shadow-sm border border-sand text-center max-w-3xl mx-auto">
                  <div className="flex items-center justify-center gap-1 mb-6" aria-label={`${t.rating} estrellas`}>
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#C6A769" className="text-gold" />
                    ))}
                  </div>

                  <blockquote className="font-serif text-xl md:text-2xl text-forestDark font-light leading-relaxed mb-8 italic">
                    "{t.text}"
                  </blockquote>

                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 bg-forest rounded-full flex items-center justify-center" aria-hidden="true">
                      <span className="font-sans text-cream text-sm font-medium">{t.initials}</span>
                    </div>
                    <div className="text-left">
                      <p className="font-sans text-sm font-medium text-forestDark">{t.name}</p>
                      <p className="font-sans text-xs text-textMuted">{t.service}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 w-10 h-10 bg-white border border-sand rounded-full flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
            aria-label="Testimonio anterior"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 w-10 h-10 bg-white border border-sand rounded-full flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
            aria-label="Testimonio siguiente"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 mt-8" role="tablist" aria-label="Navegación de testimonios">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? "right" : "left");
                setCurrent(i);
              }}
              role="tab"
              aria-selected={i === current}
              aria-label={`Testimonio ${i + 1}`}
              className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gold/40 ${
                i === current ? "bg-gold w-6 h-2" : "bg-sand hover:bg-gold/40 w-2 h-2"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
