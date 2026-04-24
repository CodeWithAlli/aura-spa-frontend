import { useContext } from "react";
import { BookingContext } from "@/context/BookingContext";

interface Props {
  register: any;
  errors: any;
}

const PaymentStep = ({ register, errors }: Props) => {
  const context = useContext(BookingContext);
  if (!context) return null;

  const { setBooking } = context;

  return (
    <div className="space-y-5">

      <h3 className="text-lg font-semibold">
        Método de pago
      </h3>

      {/* MÉTODO */}
      <div className="space-y-2">

        {/* PAGO LOCAL */}
        <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:border-black transition">
          <input
            type="radio"
            value="local"
            {...register("pago", {
              required: "Selecciona un método de pago",
              onChange: (e: any) => {
                setBooking((prev) => ({
                  ...prev,
                  payment: e.target.value,
                }));
              },
            })}
          />
          <span>Pagar en el local</span>
        </label>

        {/* PAGO ONLINE (BLOQUEADO) */}
        <label className="flex items-center gap-3 border p-3 rounded-lg opacity-50 cursor-not-allowed">
          <input
            type="radio"
            value="online"
            disabled // 🔥 clave
            className="cursor-not-allowed"
          />
          <span>
            Pago online (próximamente)
          </span>
        </label>

      </div>

      {errors.pago && (
        <p className="text-red-500 text-sm">
          {errors.pago.message}
        </p>
      )}

      {/* INFO */}
      <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
        El pago se realizará directamente en el spa el día de tu cita.
      </div>

    </div>
  );
};

export default PaymentStep;