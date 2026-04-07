import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import ConfirmationModal from "./ConfirmationModal";

const services = [
  "Faciales",
  "Masajes Relajantes",
  "Limpieza Facial Profunda",
  "Tratamientos Corporales",
  "Depilación Láser",
  "Manicure & Pedicure",
];

const specialistsByService: Record<string, string[]> = {
  "Faciales": ["Ana García", "María López"],
  "Masajes Relajantes": ["Carlos Ruiz", "Laura Mendez"],
  "Limpieza Facial Profunda": ["Ana García", "Sofía Torres"],
  "Tratamientos Corporales": ["Laura Mendez", "Valentina Cruz"],
  "Depilación Láser": ["Sofía Torres", "María López"],
  "Manicure & Pedicure": ["Valentina Cruz", "Carmen Silva"],
};

const timeSlots = ["9:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

const getTodayString = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const isSunday = (dateStr: string) => {
  const date = new Date(dateStr + "T00:00:00");
  return date.getDay() === 0;
};

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  servicio: string;
  especialista: string;
  fecha: string;
  hora: string;
  mensaje?: string;
}

export default function BookingForm() {
  const [selectedService, setSelectedService] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({ mode: "onChange" });

  const watchedService = watch("servicio");

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedService(val);
    setValue("especialista", "");
    setValue("servicio", val, { shouldValidate: true });
  };

  const onSubmit = (data: FormData) => {
    setSubmittedData(data);
    setShowModal(true);
    reset();
    setSelectedService("");
  };

  const specialists = selectedService ? (specialistsByService[selectedService] || []) : [];

  return (
    <>
      <section id="reservas" className="py-24 lg:py-32 bg-cream" aria-label="Sistema de reservas">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-sans text-gold text-xs tracking-[0.3em] uppercase mb-4">Tu bienestar te espera</p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-forestDark font-light mb-6 leading-tight">
                Reserva Tu Cita
              </h2>
              <p className="font-sans text-textMuted leading-relaxed mb-10">
                Agenda tu sesión con nuestras especialistas y da el primer paso
                hacia tu transformación. Te esperamos para brindarte la mejor experiencia.
              </p>

              <div className="space-y-6">
                {[
                  { icon: "🕐", title: "Horarios flexibles", desc: "Lunes a sábado, 9am a 7pm" },
                  { icon: "✨", title: "Especialistas certificadas", desc: "Años de experiencia en bienestar" },
                  { icon: "🌿", title: "Productos premium", desc: "Solo ingredientes naturales de alta calidad" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h4 className="font-sans font-medium text-forestDark text-sm">{item.title}</h4>
                      <p className="font-sans text-textMuted text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-3xl p-8 shadow-lg border border-sand"
                noValidate
                aria-label="Formulario de reserva"
              >
                <div className="space-y-5">
                  <div>
                    <label htmlFor="nombre" className="block font-sans text-xs font-medium text-forestDark mb-1.5 tracking-wide">
                      Nombre completo *
                    </label>
                    <input
                      id="nombre"
                      type="text"
                      placeholder="Tu nombre completo"
                      className={`w-full font-sans text-sm bg-cream border rounded-xl px-4 py-3 text-forestDark placeholder-textMuted/50 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all duration-200 ${errors.nombre ? "border-red-300 bg-red-50/30" : "border-sand"}`}
                      aria-required="true"
                      aria-invalid={!!errors.nombre}
                      aria-describedby={errors.nombre ? "nombre-error" : undefined}
                      {...register("nombre", {
                        required: "El nombre es requerido",
                        minLength: { value: 2, message: "Mínimo 2 caracteres" },
                      })}
                    />
                    {errors.nombre && <p id="nombre-error" className="font-sans text-xs text-red-500 mt-1.5" role="alert">{errors.nombre.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block font-sans text-xs font-medium text-forestDark mb-1.5 tracking-wide">
                        Email *
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        className={`w-full font-sans text-sm bg-cream border rounded-xl px-4 py-3 text-forestDark placeholder-textMuted/50 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all duration-200 ${errors.email ? "border-red-300 bg-red-50/30" : "border-sand"}`}
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        {...register("email", {
                          required: "El email es requerido",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Email inválido",
                          },
                        })}
                      />
                      {errors.email && <p id="email-error" className="font-sans text-xs text-red-500 mt-1.5" role="alert">{errors.email.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="telefono" className="block font-sans text-xs font-medium text-forestDark mb-1.5 tracking-wide">
                        Teléfono *
                      </label>
                      <input
                        id="telefono"
                        type="tel"
                        placeholder="+51 999 999 999"
                        className={`w-full font-sans text-sm bg-cream border rounded-xl px-4 py-3 text-forestDark placeholder-textMuted/50 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all duration-200 ${errors.telefono ? "border-red-300 bg-red-50/30" : "border-sand"}`}
                        aria-required="true"
                        aria-invalid={!!errors.telefono}
                        aria-describedby={errors.telefono ? "telefono-error" : undefined}
                        {...register("telefono", {
                          required: "El teléfono es requerido",
                          pattern: {
                            value: /^\+?[\d\s\-\(\)]{7,15}$/,
                            message: "Teléfono inválido",
                          },
                        })}
                      />
                      {errors.telefono && <p id="telefono-error" className="font-sans text-xs text-red-500 mt-1.5" role="alert">{errors.telefono.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="servicio" className="block font-sans text-xs font-medium text-forestDark mb-1.5 tracking-wide">
                      Servicio *
                    </label>
                    <select
                      id="servicio"
                      className={`w-full font-sans text-sm bg-cream border rounded-xl px-4 py-3 text-forestDark focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all duration-200 cursor-pointer ${errors.servicio ? "border-red-300" : "border-sand"}`}
                      aria-required="true"
                      aria-invalid={!!errors.servicio}
                      {...register("servicio", { required: "Selecciona un servicio" })}
                      onChange={handleServiceChange}
                    >
                      <option value="">Selecciona un servicio</option>
                      {services.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.servicio && <p className="font-sans text-xs text-red-500 mt-1.5" role="alert">{errors.servicio.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="especialista" className="block font-sans text-xs font-medium text-forestDark mb-1.5 tracking-wide">
                      Especialista *
                    </label>
                    <select
                      id="especialista"
                      className={`w-full font-sans text-sm bg-cream border rounded-xl px-4 py-3 text-forestDark focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${errors.especialista ? "border-red-300" : "border-sand"}`}
                      aria-required="true"
                      aria-invalid={!!errors.especialista}
                      disabled={!selectedService}
                      {...register("especialista", { required: "Selecciona una especialista" })}
                    >
                      <option value="">{selectedService ? "Selecciona una especialista" : "Primero elige un servicio"}</option>
                      {specialists.map((sp) => <option key={sp} value={sp}>{sp}</option>)}
                    </select>
                    {errors.especialista && <p className="font-sans text-xs text-red-500 mt-1.5" role="alert">{errors.especialista.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fecha" className="block font-sans text-xs font-medium text-forestDark mb-1.5 tracking-wide">
                        Fecha *
                      </label>
                      <input
                        id="fecha"
                        type="date"
                        min={getTodayString()}
                        className={`w-full font-sans text-sm bg-cream border rounded-xl px-4 py-3 text-forestDark focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all duration-200 ${errors.fecha ? "border-red-300 bg-red-50/30" : "border-sand"}`}
                        aria-required="true"
                        aria-invalid={!!errors.fecha}
                        aria-describedby={errors.fecha ? "fecha-error" : undefined}
                        {...register("fecha", {
                          required: "La fecha es requerida",
                          validate: {
                            future: (v) => new Date(v + "T00:00:00") >= new Date(getTodayString() + "T00:00:00") || "Selecciona una fecha futura",
                            notSunday: (v) => !isSunday(v) || "No atendemos los domingos",
                          },
                        })}
                      />
                      {errors.fecha && <p id="fecha-error" className="font-sans text-xs text-red-500 mt-1.5" role="alert">{errors.fecha.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="hora" className="block font-sans text-xs font-medium text-forestDark mb-1.5 tracking-wide">
                        Hora *
                      </label>
                      <select
                        id="hora"
                        className={`w-full font-sans text-sm bg-cream border rounded-xl px-4 py-3 text-forestDark focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all duration-200 cursor-pointer ${errors.hora ? "border-red-300" : "border-sand"}`}
                        aria-required="true"
                        aria-invalid={!!errors.hora}
                        {...register("hora", { required: "Selecciona una hora" })}
                      >
                        <option value="">Selecciona hora</option>
                        {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                      {errors.hora && <p className="font-sans text-xs text-red-500 mt-1.5" role="alert">{errors.hora.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="mensaje" className="block font-sans text-xs font-medium text-forestDark mb-1.5 tracking-wide">
                      Mensaje (opcional)
                    </label>
                    <textarea
                      id="mensaje"
                      rows={3}
                      placeholder="¿Alguna consulta o preferencia especial?"
                      className="w-full font-sans text-sm bg-cream border border-sand rounded-xl px-4 py-3 text-forestDark placeholder-textMuted/50 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all duration-200 resize-none"
                      {...register("mensaje")}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!isValid}
                    className="w-full bg-forest text-cream font-sans font-medium text-sm py-4 rounded-xl hover:bg-forestDark active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-forest/30"
                    aria-label="Confirmar reserva"
                  >
                    Confirmar Reserva
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        booking={submittedData}
      />
    </>
  );
}
