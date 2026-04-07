import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, MessageCircle } from "lucide-react";

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/auraspa" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com/auraspa" },
  {
    icon: () => (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.77a4.85 4.85 0 01-1.01-.08z"/>
      </svg>
    ),
    label: "TikTok",
    href: "https://tiktok.com/@auraspa"
  },
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/51999999999" },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({ nombre: "", email: "", mensaje: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ nombre: "", email: "", mensaje: "" });
  };

  return (
    <section id="contacto" className="py-24 lg:py-32 bg-forestDark relative overflow-hidden" aria-label="Contacto">
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
          <p className="font-sans text-gold text-xs tracking-[0.3em] uppercase mb-4">Estamos aquí para ti</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream font-light">
            Contáctanos
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              {[
                { icon: Phone, label: "Teléfono", value: "+51 999 999 999", href: "tel:+51999999999" },
                { icon: Mail, label: "Email", value: "contacto@auraspa.com", href: "mailto:contacto@auraspa.com" },
                { icon: MapPin, label: "Dirección", value: "Av. del Bienestar 123, Miraflores, Lima", href: "#" },
              ].map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 group"
                  aria-label={`${label}: ${value}`}
                >
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center group-hover:border-gold/40 transition-colors duration-200 flex-shrink-0">
                    <Icon size={18} className="text-gold" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-sans text-xs text-cream/50 mb-0.5">{label}</p>
                    <p className="font-sans text-sm text-cream/90 group-hover:text-gold transition-colors duration-200">{value}</p>
                  </div>
                </a>
              ))}

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock size={18} className="text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-sans text-xs text-cream/50 mb-1">Horario de atención</p>
                  <div className="space-y-0.5">
                    <p className="font-sans text-sm text-cream/90">Lunes – Viernes: 9:00 am – 7:00 pm</p>
                    <p className="font-sans text-sm text-cream/90">Sábados: 9:00 am – 6:00 pm</p>
                    <p className="font-sans text-sm text-cream/50">Domingos: Cerrado</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="font-sans text-xs text-cream/50 mb-4 tracking-widest uppercase">Síguenos en redes</p>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:border-gold/50 hover:text-gold text-cream/70 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/30"
                    aria-label={label}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10 h-48 bg-white/5 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={24} className="text-gold mx-auto mb-2" />
                <p className="font-sans text-xs text-cream/50">Mapa de ubicación</p>
                <p className="font-sans text-xs text-cream/30 mt-1">Av. del Bienestar 123, Miraflores</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
              aria-label="Formulario de contacto"
              noValidate
            >
              <div>
                <label htmlFor="contact-nombre" className="block font-sans text-xs font-medium text-cream/70 mb-2 tracking-wide">
                  Nombre
                </label>
                <input
                  id="contact-nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  placeholder="Tu nombre"
                  required
                  className="w-full font-sans text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-cream placeholder-cream/30 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block font-sans text-xs font-medium text-cream/70 mb-2 tracking-wide">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="tu@email.com"
                  required
                  className="w-full font-sans text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-cream placeholder-cream/30 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="contact-mensaje" className="block font-sans text-xs font-medium text-cream/70 mb-2 tracking-wide">
                  Mensaje
                </label>
                <textarea
                  id="contact-mensaje"
                  rows={5}
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  placeholder="¿En qué podemos ayudarte?"
                  required
                  className="w-full font-sans text-sm bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-cream placeholder-cream/30 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 transition-all duration-200 resize-none"
                />
              </div>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 font-sans text-sm text-green-400"
                  role="alert"
                >
                  ¡Mensaje enviado! Te responderemos pronto.
                </motion.div>
              )}

              <button
                type="submit"
                className="w-full bg-gold text-forestDark font-sans font-medium text-sm py-4 rounded-xl hover:bg-gold/90 active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50"
                aria-label="Enviar mensaje"
              >
                Enviar Mensaje
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
