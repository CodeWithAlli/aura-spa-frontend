import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

type Service = {
  id: number;
  title: string;
  description: string;
  price: number;
  image_url?: string;
};

// 🔥 BASE URL CENTRALIZADA
const API_URL = import.meta.env.VITE_API_URL;

export default function ServicesGrid() {
  const [services, setServices] = useState<Service[]>([]);

  // 🔥 SOLO TOP 6
  useEffect(() => {
    fetch(`${API_URL}/servicios/top`)
      .then((res) => res.json())
      .then(setServices)
      .catch(() => console.error("Error servicios"));
  }, []);

  const handleNavClick = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >

              {/* IMAGEN */}
              {s.image_url ? (
                <img
                  src={s.image_url}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                  <Sparkles className="text-gray-300" size={28} />
                </div>
              )}

              {/* CONTENIDO */}
              <div className="p-5 flex flex-col flex-1">

                <h3 className="font-semibold text-lg text-gray-800">
                  {s.title}
                </h3>

                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                  {s.description}
                </p>

                <div className="mt-4 flex items-center justify-between">

                  <span className="text-sm font-semibold text-gray-800">
                    S/ {Number(s.price)}
                  </span>

                  <button
                    onClick={() => handleNavClick("#booking-section")}
                    className="flex items-center gap-1 text-sm text-gray-700 hover:text-black transition"
                  >
                    Reservar
                    <ArrowRight size={14} />
                  </button>

                </div>

              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}