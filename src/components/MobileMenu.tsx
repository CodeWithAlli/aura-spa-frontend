import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
  onLinkClick: (href: string) => void;
}

export default function MobileMenu({ isOpen, onClose, links, onLinkClick }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-forestDark/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-cream shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Menú móvil"
          >
            <div className="flex items-center justify-between px-6 py-6 border-b border-sand">
              <span className="font-serif italic text-2xl text-forestDark">Aura Spa</span>
              <button
                onClick={onClose}
                className="text-forestDark hover:text-gold transition-colors p-1 focus:outline-none focus:ring-2 focus:ring-gold/50 rounded"
                aria-label="Cerrar menú"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="flex flex-col px-6 py-8 gap-2 flex-1" aria-label="Menú principal móvil">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  onClick={(e) => { e.preventDefault(); onLinkClick(link.href); }}
                  className="text-lg font-sans text-forestDark/80 hover:text-gold py-3 border-b border-sand/50 tracking-wide transition-colors duration-200 focus:outline-none focus:text-gold"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className="px-6 pb-8">
              <button
                onClick={() => onLinkClick("#reservas")}
                className="w-full bg-gold text-forestDark font-sans font-medium py-3.5 rounded-full hover:bg-gold/90 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50 text-sm"
              >
                Reservar Ahora
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
