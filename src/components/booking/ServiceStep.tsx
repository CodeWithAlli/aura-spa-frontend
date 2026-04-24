import { useContext, useEffect, useState } from "react";
import { BookingContext } from "@/context/BookingContext";

interface Service {
  id: number;
  title: string;
}

interface Props {
  register: any;
  errors: any;
}

// 🔥 BASE URL CENTRALIZADA
const API_URL = "https://aura-spa-backend.onrender.com";

const ServiceStep = ({ register, errors }: Props) => {
  const context = useContext(BookingContext);
  if (!context) return null;

  const { setBooking } = context;

  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/servicios`)
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch(() => console.error("Error cargando servicios"));
  }, []);

  return (
    <div className="space-y-4">

      <div>
        <select
          {...register("servicio", {
            required: "Selecciona un servicio",
            onChange: (e: any) => {
              setBooking((prev) => ({
                ...prev,
                service: e.target.value,
                specialist: null,
              }));
            },
          })}
          className="w-full border p-3 rounded-lg"
        >
          <option value="">Selecciona servicio</option>

          {services.map((s) => (
            <option key={s.id} value={s.title}>
              {s.title}
            </option>
          ))}
        </select>

        {errors.servicio && (
          <p className="text-red-500 text-sm mt-1">
            {errors.servicio.message}
          </p>
        )}
      </div>

    </div>
  );
};

export default ServiceStep;