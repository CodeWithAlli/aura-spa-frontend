import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Share, PlusSquare } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function AddToHomeScreenBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const ios = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
    const standalone = window.matchMedia("(display-mode: standalone)").matches;
    const alreadyDismissed = localStorage.getItem("aura-pwa-dismissed");

    if (alreadyDismissed || standalone) return;

    if (ios && !standalone) {
      setIsIOS(true);
      setTimeout(() => setShowBanner(true), 3000);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setShowBanner(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShowBanner(false);
      }
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    setDismissed(true);
    localStorage.setItem("aura-pwa-dismissed", "1");
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50"
          role="banner"
          aria-label="Instalar aplicación"
        >
          <div className="bg-cream border border-sand rounded-2xl shadow-2xl p-5">
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 text-textMuted hover:text-forestDark transition-colors p-1 focus:outline-none focus:ring-2 focus:ring-gold/40 rounded-full"
              aria-label="Cerrar"
            >
              <X size={16} />
            </button>

            <div className="flex items-start gap-3 pr-4">
              <div className="w-10 h-10 bg-forest rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="font-serif italic text-cream text-sm">A</span>
              </div>
              <div>
                <p className="font-sans text-sm font-medium text-forestDark mb-0.5">Aura Spa</p>
                {isIOS ? (
                  <p className="font-sans text-xs text-textMuted leading-relaxed">
                    Agrega esta app a tu pantalla de inicio: toca{" "}
                    <Share size={11} className="inline" aria-hidden="true" />{" "}
                    y luego "Agregar a inicio"{" "}
                    <PlusSquare size={11} className="inline" aria-hidden="true" />
                  </p>
                ) : (
                  <p className="font-sans text-xs text-textMuted leading-relaxed">
                    Instala la app para una experiencia premium sin navegador.
                  </p>
                )}
              </div>
            </div>

            {!isIOS && (
              <button
                onClick={handleInstall}
                className="w-full mt-4 bg-gold text-forestDark font-sans text-xs font-medium py-2.5 rounded-xl hover:bg-gold/90 active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/40"
                aria-label="Instalar Aura Spa"
              >
                Instalar App
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
