import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contacto" className="py-16 bg-forestDark text-cream">
      <div className="max-w-5xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-serif mb-2">
            ¿Necesitas ayuda?
          </h2>
          <p className="text-sm text-cream/60">
            Estamos disponibles para ayudarte con tu reserva
          </p>
        </div>

        {/* INFO */}
        <div className="grid sm:grid-cols-3 gap-6 text-sm">

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <Phone size={16} />
            <span>+51 999 999 999</span>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <Mail size={16} />
            <span>contacto@auraspa.com</span>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <MapPin size={16} />
            <span>Miraflores, Lima</span>
          </div>

        </div>

      </div>
    </section>
  );
}