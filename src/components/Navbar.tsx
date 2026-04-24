import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Reservas", href: "#booking-section" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-cream/90 backdrop-blur-md shadow-sm border-b border-sand"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* LOGO */}
            <button
              onClick={() => handleNavClick("#inicio")}
              className="font-serif italic text-2xl lg:text-3xl text-forestDark hover:text-gold transition"
            >
              Aura Spa
            </button>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm text-forestDark/80 hover:text-gold transition"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* BOTONES */}
            <div className="flex items-center gap-3">

              {/* 🔐 ADMIN REAL */}
              <button
                onClick={() => navigate("/admin")}
                className="hidden lg:inline-flex border border-forestDark text-forestDark text-sm px-4 py-2 rounded-full hover:bg-forestDark hover:text-white transition"
              >
                Admin
              </button>

              {/* RESERVAR */}
              <button
                onClick={() => handleNavClick("#booking-section")}
                className="hidden lg:inline-flex bg-gold text-forestDark text-sm px-5 py-2 rounded-full hover:bg-gold/90 transition"
              >
                Reservar
              </button>

              {/* MOBILE */}
              <button
                className="lg:hidden p-2 text-forestDark"
                onClick={() => setMobileOpen(true)}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
        onLinkClick={handleNavClick}
      />
    </>
  );
}