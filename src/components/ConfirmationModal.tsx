import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X, Calendar, Clock, User, Scissors } from "lucide-react";
import { useEffect } from "react";

interface BookingData {
  nombre: string;
  email: string;
  telefono: string;
  servicio: string;
  especialista: string;
  fecha: string;
  hora: string;
  mensaje?: string;
}

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: BookingData | null;
}

export default function ConfirmationModal({ isOpen, onClose, booking }: ConfirmationModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && booking && (
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Confirmación de reserva">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-cream rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
            >
              <button
                onClick={onClose}
                className="absolute top-5 right-5 text-textMuted hover:text-forestDark transition-colors p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-gold/50"
                aria-label="Cerrar"
              >
                <X size={20} />
              </button>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", damping: 15 }}
                className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle size={32} className="text-forest" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="font-serif text-2xl text-forestDark text-center mb-2">
                  ¡Reserva Confirmada!
                </h3>
                <p className="font-sans text-textMuted text-sm text-center mb-8">
                  Hemos recibido tu reserva. Te enviaremos una confirmación a tu correo.
                </p>

                <div className="bg-sand/40 rounded-2xl p-6 space-y-4 mb-6">
                  <h4 className="font-sans text-xs text-textMuted tracking-widest uppercase mb-4">Resumen de tu reserva</h4>

                  {[
                    { icon: User, label: "Cliente", value: booking.nombre },
                    { icon: Scissors, label: "Servicio", value: booking.servicio },
                    { icon: User, label: "Especialista", value: booking.especialista },
                    { icon: Calendar, label: "Fecha", value: new Date(booking.fecha + "T00:00:00").toLocaleDateString("es-PE", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) },
                    { icon: Clock, label: "Hora", value: booking.hora },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon size={14} className="text-forest" />
                      </div>
                      <div>
                        <p className="font-sans text-xs text-textMuted">{label}</p>
                        <p className="font-sans text-sm text-forestDark font-medium capitalize">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={onClose}
                  className="w-full bg-forest text-cream font-sans font-medium text-sm py-3.5 rounded-full hover:bg-forestDark active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-forest/30"
                >
                  Perfecto, ¡Gracias!
                </button>
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
