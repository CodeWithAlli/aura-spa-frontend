import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
}

export default function MobileMenu({
  isOpen,
  onClose,
  links,
}: MobileMenuProps) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClick = (href: string) => {
    // 🔐 ADMIN
    if (href === "/admin") {
      navigate("/admin");
      onClose();
      return;
    }

    // 📍 SCROLL (desde cualquier página)
    if (href.startsWith("#")) {
      navigate("/");

      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);

      onClose();
      return;
    }

    // 🌍 RUTAS NORMALES
    navigate(href);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* PANEL */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 260 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-5 py-5 border-b">
              <span className="font-serif italic text-2xl text-gray-800">
                Aura Spa
              </span>

              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 active:scale-95 transition"
              >
                <X size={22} />
              </button>
            </div>

            {/* LINKS */}
            <nav className="flex flex-col px-5 py-6 gap-1 flex-1 overflow-y-auto">
              {links.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleClick(link.href)}
                  className="text-left text-base text-gray-700 hover:text-black py-3 border-b active:scale-[0.98] transition"
                >
                  {link.label}
                </motion.button>
              ))}

              {/* 🔐 ADMIN */}
              <button
                onClick={() => handleClick("/admin")}
                className="text-left text-base font-medium text-gray-800 py-3 border-b active:scale-[0.98] transition"
              >
                {token ? "Panel Admin" : "Admin"}
              </button>
            </nav>

            {/* CTA */}
            <div className="px-5 pb-6">
              <button
                onClick={() => handleClick("#booking-section")}
                className="w-full bg-black text-white py-3.5 rounded-xl active:scale-95 transition"
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