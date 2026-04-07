import { motion } from "framer-motion";
import { Tag } from "lucide-react";
import CountdownTimer from "./CountdownTimer";

const now = new Date();
const promos = [
  {
    badge: "Oferta Especial",
    title: "Paquete Facial Completo",
    description: "Limpieza profunda + Facial rejuvenecedor + Mascarilla premium. La experiencia facial definitiva.",
    discount: 30,
    original: "S/. 380",
    discounted: "S/. 266",
    expires: new Date(now.getTime() + 48 * 3600 * 1000),
    highlight: false,
  },
  {
    badge: "Más Popular",
    title: "Spa Day Completo",
    description: "Un día entero de bienestar: masaje, facial, envolvimiento corporal y manicure incluidos.",
    discount: 40,
    original: "S/. 650",
    discounted: "S/. 390",
    expires: new Date(now.getTime() + 72 * 3600 * 1000),
    highlight: true,
  },
  {
    badge: "Oferta Especial",
    title: "Dúo Romántico",
    description: "Comparte la experiencia: masajes en pareja + champagne + pétalos de rosas. El regalo perfecto.",
    discount: 25,
    original: "S/. 420",
    discounted: "S/. 315",
    expires: new Date(now.getTime() + 96 * 3600 * 1000),
    highlight: false,
  },
];

export default function PromotionsSection() {
  return (
    <section id="promociones" className="py-24 lg:py-32 bg-forestDark relative overflow-hidden" aria-label="Promociones">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-sans text-gold text-xs tracking-[0.3em] uppercase mb-4">Solo por tiempo limitado</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream font-light mb-6">
            Promociones Exclusivas
          </h2>
          <p className="font-sans text-cream/60 max-w-xl mx-auto leading-relaxed">
            Aprovecha nuestras ofertas especiales y vive la experiencia Aura Spa
            a un precio excepcional.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promos.map((promo, index) => (
            <motion.div
              key={promo.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className={`relative rounded-2xl p-8 flex flex-col overflow-hidden ${
                promo.highlight
                  ? "bg-gold text-forestDark"
                  : "bg-white/5 border border-white/10 text-cream"
              }`}
            >
              {promo.highlight && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-forestDark/20" />
              )}

              <div className="flex items-center gap-2 mb-6">
                <Tag size={12} className={promo.highlight ? "text-forestDark" : "text-gold"} />
                <span className={`font-sans text-xs tracking-widest uppercase font-medium ${promo.highlight ? "text-forestDark" : "text-gold"}`}>
                  {promo.badge}
                </span>
              </div>

              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full text-2xl font-serif font-bold mb-4 ${promo.highlight ? "bg-forestDark/10 text-forestDark" : "bg-gold/10 text-gold"}`}>
                -{promo.discount}%
              </div>

              <h3 className={`font-serif text-xl font-medium mb-3 ${promo.highlight ? "text-forestDark" : "text-cream"}`}>
                {promo.title}
              </h3>
              <p className={`font-sans text-sm leading-relaxed mb-6 flex-1 ${promo.highlight ? "text-forestDark/70" : "text-cream/60"}`}>
                {promo.description}
              </p>

              <div className="mb-4">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className={`font-sans text-2xl font-semibold ${promo.highlight ? "text-forestDark" : "text-cream"}`}>
                    {promo.discounted}
                  </span>
                  <span className={`font-sans text-sm line-through ${promo.highlight ? "text-forestDark/50" : "text-cream/40"}`}>
                    {promo.original}
                  </span>
                </div>
                <CountdownTimer targetDate={promo.expires} />
              </div>

              <button
                onClick={() => { const el = document.querySelector("#reservas"); el?.scrollIntoView({ behavior: "smooth" }); }}
                className={`w-full font-sans text-sm font-medium py-3.5 rounded-full transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/30 ${
                  promo.highlight
                    ? "bg-forestDark text-cream hover:bg-forestDark/90"
                    : "bg-gold text-forestDark hover:bg-gold/90"
                }`}
                aria-label={`Reservar ${promo.title}`}
              >
                Aprovechar Oferta
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
