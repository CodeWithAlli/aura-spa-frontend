import { Instagram, Facebook, MessageCircle, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Reservas", href: "#booking" },
  { label: "Contacto", href: "#contacto" },
];

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/auraspa" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com/auraspa" },
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/51999999999" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
    setEmail("");
  };

  return (
    <>
      <footer className="bg-cream border-t border-sand">
        <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">

          {/* Marca */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Aura Spa</h2>
            <p className="text-sm text-gray-500 mb-4">
              Reserva tu momento de bienestar de forma rápida y sencilla.
            </p>

            <div className="flex gap-2">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} target="_blank">
                  <div className="w-9 h-9 flex items-center justify-center border rounded">
                    <Icon size={16} />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Navegación</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-gray-500 hover:text-black"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Newsletter</h3>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="w-full border p-3 rounded text-sm"
              />

              <button className="w-full bg-black text-white py-2 rounded text-sm">
                Suscribirme
              </button>
            </form>
          </div>

        </div>

        <div className="text-center text-xs text-gray-400 pb-6">
          © {new Date().getFullYear()} Aura Spa
        </div>
      </footer>

      {/* 🔥 MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-lg w-full max-w-sm relative">

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-semibold mb-2 text-center">
              Próximamente disponible
            </h3>

            <p className="text-sm text-gray-500 text-center mb-4">
              Estamos trabajando en el sistema de suscripciones.
              Muy pronto podrás recibir promociones y novedades.
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-black text-white py-2 rounded"
            >
              Entendido
            </button>

          </div>
        </div>
      )}
    </>
  );
}