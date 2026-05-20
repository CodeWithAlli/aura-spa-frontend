import { useEffect, useState } from "react";

const timeSlots = [
  "09:00","10:00","11:00","12:00",
  "14:00","15:00","16:00","17:00","18:00",
];

// 🔥 BASE URL CENTRALIZADA
const API_URL = import.meta.env.VITE_API_URL;

const DateTimeStep = ({ register, errors, watch, setValue }: any) => {
  const [ocupados, setOcupados] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fecha = watch("fecha");
  const hora = watch("hora");

  useEffect(() => {
    if (!fecha) {
      setOcupados([]);
      if (setValue) setValue("hora", "");
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${API_URL}/horarios-ocupados?fecha=${fecha}`
        );

        const data = await res.json();
        const horas = data.map((h: string) => h.slice(0, 5));

        setOcupados(horas);

        if (horas.includes(hora)) {
          setValue("hora", "");
        }

      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fecha]);

  return (
    <div className="space-y-5">

      <input
        type="date"
        {...register("fecha", { required: "Selecciona fecha" })}
      />

      {loading && <p>Cargando...</p>}

      <div className="grid grid-cols-3 gap-2">
        {timeSlots.map((h) => {
          const disabled = ocupados.includes(h);
          const selected = hora === h;

          return (
            <label key={h}>
              <input
                type="radio"
                value={h}
                disabled={disabled}
                {...register("hora", { required: true })}
              />
              <span style={{
                opacity: disabled ? 0.3 : 1,
                fontWeight: selected ? "bold" : "normal"
              }}>
                {h}
              </span>
            </label>
          );
        })}
      </div>

      {errors.hora && <p>Selecciona hora</p>}
    </div>
  );
};

export default DateTimeStep;