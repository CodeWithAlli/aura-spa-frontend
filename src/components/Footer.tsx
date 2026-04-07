import { motion } from "framer-motion";
import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Tratamientos", href: "#tratamientos" },
  { label: "Promociones", href: "#promociones" },
  { label: "Reservas", href: "#reservas" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Contacto", href: "#contacto" },
];

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/auraspa" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com/auraspa" },
  {
    icon: () => (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.77a4.85 4.85 0 01-1.01-.08z"/>
      </svg>
    ),
    label: "TikTok",
    href: "https://tiktok.com/@auraspa",
  },
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/51999999999" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-cream border-t border-sand" aria-label="Pie de página">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-2">
            <a
              href="#inicio"
              onClick={(e) => { e.preventDefault(); handleNavClick("#inicio"); }}
              className="font-serif italic text-2xl text-forestDark hover:text-gold transition-colors duration-300 block mb-3"
            >
              Aura Spa
            </a>
            <p className="font-sans text-sm text-textMuted leading-relaxed max-w-xs mb-6">
              Un santuario de bienestar donde la belleza natural y la sofisticación
              se encuentran para transformar tu experiencia de vida.
            </p>

            <div className="flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-sand rounded-full flex items-center justify-center hover:bg-gold/20 hover:text-gold text-textMuted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/30"
                  aria-label={label}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-sans text-xs font-semibold text-forestDark tracking-widest uppercase mb-5">
              Navegación
            </h3>
            <ul className="space-y-3" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="font-sans text-sm text-textMuted hover:text-gold transition-colors duration-200 focus:outline-none focus:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-xs font-semibold text-forestDark tracking-widest uppercase mb-5">
              Newsletter
            </h3>
            <p className="font-sans text-sm text-textMuted mb-4 leading-relaxed">
              Recibe ofertas exclusivas y consejos de bienestar.
            </p>
            {subscribed ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-sans text-sm text-gold"
              >
                ¡Gracias por suscribirte!
              </motion.p>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2" aria-label="Suscripción al newsletter">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  aria-label="Email para newsletter"
                  className="w-full font-sans text-sm bg-sand/40 border border-sand rounded-xl px-4 py-3 text-forestDark placeholder-textMuted/50 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all duration-200"
                />
                <button
                  type="submit"
                  className="w-full bg-forestDark text-cream font-sans text-xs font-medium py-3 rounded-xl hover:bg-forest active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-forestDark/30"
                  aria-label="Suscribirse al newsletter"
                >
                  Suscribirme
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-sand pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-textMuted/70">
            © {new Date().getFullYear()} Aura Spa. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="font-sans text-xs text-textMuted/70 hover:text-textMuted transition-colors focus:outline-none">
              Política de privacidad
            </a>
            <a href="#" className="font-sans text-xs text-textMuted/70 hover:text-textMuted transition-colors focus:outline-none">
              Términos de servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
