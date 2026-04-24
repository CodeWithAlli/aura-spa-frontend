import { motion } from "framer-motion";

export default function Hero() {
  const scrollToBooking = () => {
    document.getElementById("booking-section")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="pt-28 pb-16 px-6 bg-cream">
      <div className="max-w-4xl mx-auto text-center">

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-serif text-4xl md:text-5xl text-forestDark font-light mb-4"
        >
          Reserva tu cita en minutos
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-textMuted text-base md:text-lg mb-8 max-w-xl mx-auto"
        >
          Elige tu servicio, selecciona tu horario y confirma en segundos.
          Sin llamadas. Sin esperas.
        </motion.p>

        {/* CTA */}
        <motion.button
          onClick={scrollToBooking}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-forest text-white px-8 py-3 rounded-xl text-sm font-medium shadow-md hover:shadow-lg hover:scale-[1.02] transition"
        >
          Empezar reserva
        </motion.button>

      </div>
    </section>
  );
}