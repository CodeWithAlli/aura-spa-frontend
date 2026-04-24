import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { BookingContext } from "@/context/BookingContext";
import toast from "react-hot-toast";

import ServiceStep from "@/components/booking/ServiceStep";
import DateTimeStep from "@/components/booking/DateTimeStep";
import ClientStep from "@/components/booking/ClientStep";
import PaymentStep from "@/components/booking/PaymentStep";
import SummaryCard from "@/components/booking/SummaryCard";
import Stepper from "@/components/booking/Stepper";
import ConfirmationScreen from "@/components/ConfirmationScreen";

// 🔥 BASE URL CENTRALIZADA
const API_URL = "https://aura-spa-backend.onrender.com";

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [confirmationData, setConfirmationData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const context = useContext(BookingContext);
  if (!context) throw new Error("BookingContext no está disponible");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const formValues = watch();

  const next = () => setStep((prev) => prev + 1);
  const prev = () => setStep((prev) => prev - 1);

  const isStepValid = () => {
    if (step === 1) return !!formValues.servicio;

    if (step === 2)
      return !!formValues.fecha && !!formValues.hora;

    if (step === 3)
      return (
        !!formValues.nombre &&
        !!formValues.email &&
        !!formValues.telefono
      );

    if (step === 4) return !!formValues.pago;

    return false;
  };

  const onSubmit = async (data: any) => {
    const payload = {
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono,
      servicio: data.servicio,
      especialista: "Asignado automáticamente",
      fecha: data.fecha,
      hora: data.hora,
      mensaje: "",
      pago: data.pago,
    };

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/reservas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await res.json();

      if (!res.ok || responseData.error) {
        toast.error(responseData.error || "Error al registrar");
        return;
      }

      setConfirmationData({
        ...payload,
        codigo:
          responseData?.codigo ||
          "SPA-" + Math.floor(Math.random() * 10000),
      });

      toast.success("Reserva confirmada 🎉");
      setConfirmed(true);

    } catch {
      toast.error("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setConfirmed(false);
    reset();
    setStep(1);
  };

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">

        <Stepper currentStep={step} />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid md:grid-cols-2 gap-8 mt-8 bg-white p-6 rounded-2xl shadow-lg"
        >
          <div>

            {step === 1 && (
              <ServiceStep register={register} errors={errors} />
            )}

            {step === 2 && (
              <DateTimeStep
                register={register}
                errors={errors}
                watch={watch}
                setValue={setValue}
              />
            )}

            {step === 3 && (
              <ClientStep register={register} errors={errors} />
            )}

            {step === 4 && (
              <PaymentStep register={register} errors={errors} />
            )}

            <div className="flex justify-between mt-6">
              {step > 1 && (
                <button type="button" onClick={prev} className="px-4 py-2 border rounded-lg">
                  Atrás
                </button>
              )}

              {step < 4 && (
                <button
                  type="button"
                  onClick={next}
                  disabled={!isStepValid()}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg disabled:opacity-40"
                >
                  Siguiente
                </button>
              )}

              {step === 4 && (
                <button
                  type="submit"
                  disabled={!isStepValid() || loading}
                  className="px-6 py-2 bg-emerald-700 text-white rounded-lg disabled:opacity-40"
                >
                  {loading ? "Procesando..." : "Confirmar"}
                </button>
              )}
            </div>
          </div>

          <SummaryCard watch={watch} />
        </form>
      </div>

      {confirmed && confirmationData && (
        <ConfirmationScreen
          data={confirmationData}
          onClose={handleClose}
        />
      )}
    </section>
  );
}