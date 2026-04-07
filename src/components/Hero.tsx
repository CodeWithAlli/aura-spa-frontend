import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const handleScroll = () => {
    const el = document.querySelector("#servicios");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Inicio"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cream via-sand/60 to-forest" />
        <div className="absolute inset-0 bg-gradient-to-t from-forestDark/40 via-transparent to-transparent" />

        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gold/10"
            style={{
              width: `${80 + i * 30}px`,
              height: `${80 + i * 30}px`,
              left: `${(i * 37 + 10) % 90}%`,
              top: `${(i * 23 + 5) % 80}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 6 + i * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
          }}
        />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-gold text-sm tracking-[0.3em] uppercase mb-6"
        >
          Bienvenida al Santuario
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif font-light text-5xl md:text-7xl lg:text-8xl text-forestDark leading-tight mb-8"
        >
          Tu momento de paz{" "}
          <em className="font-serif italic text-forest">comienza aquí</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-sans text-textMuted text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Descubre un refugio de bienestar donde cada tratamiento es una experiencia
          sensorial única. Expertos dedicados a realzar tu belleza natural y equilibrar
          cuerpo, mente y espíritu.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => { const el = document.querySelector("#reservas"); el?.scrollIntoView({ behavior: "smooth" }); }}
            className="bg-gold text-forestDark font-sans font-medium px-8 py-4 rounded-full hover:bg-gold/90 active:scale-95 transition-all duration-300 text-sm tracking-wide shadow-lg shadow-gold/20 focus:outline-none focus:ring-2 focus:ring-gold/50"
            aria-label="Reservar cita"
          >
            Reservar Cita
          </button>
          <button
            onClick={() => { const el = document.querySelector("#servicios"); el?.scrollIntoView({ behavior: "smooth" }); }}
            className="border border-forestDark/30 text-forestDark font-sans font-medium px-8 py-4 rounded-full hover:border-forestDark hover:bg-forestDark/5 active:scale-95 transition-all duration-300 text-sm tracking-wide focus:outline-none focus:ring-2 focus:ring-forestDark/30"
            aria-label="Ver servicios"
          >
            Ver Servicios
          </button>
        </motion.div>
      </motion.div>

      <motion.button
        onClick={handleScroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-forestDark/60 hover:text-forestDark transition-colors focus:outline-none focus:ring-2 focus:ring-forestDark/30 rounded-full p-2"
        aria-label="Desplazarse hacia abajo"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={28} strokeWidth={1.5} />
        </motion.div>
      </motion.button>
    </section>
  );
}
