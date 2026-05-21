import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

const hours = [
  "09:00","10:00","11:00","12:00",
  "14:00","15:00","16:00","17:00","18:00"
];
interface Reserva {
  id: number;
  nombre: string;
  servicio: string;
  fecha: string;
  hora: string;
}

export default function DailyCalendar() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [fecha, setFecha] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!fecha) return;

    const fetchReservas = async () => {
      try {
        setLoading(true);
        
        const res = await fetch(`${API_URL}/reservas`);

        if (!res.ok) {
          throw new Error();
        }

        const data: Reserva[] = await res.json();

        const filtradas = data.filter((r) => r.fecha === fecha);
        setReservas(filtradas);

      } catch {
        toast.error("Error cargando agenda");
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, [fecha]);

  const getReservasPorHora = (hora: string) => {
    return reservas.filter((r) => r.hora.slice(0, 5) === hora);
  };

  return (
    <div className="space-y-4 w-full flex flex-col items-center">

      {/* 📅 FECHA */}
      <div className="w-full max-w-md">
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* ⏳ LOADING */}
      {loading && (
        <p className="text-sm text-gray-400">Cargando agenda...</p>
      )}

      {/* 📊 HORARIOS */}
      <div className="
      w-full 
      max-w-2xl 
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      gap-3
    ">
        {hours.map((hora) => {
          const reservasHora = getReservasPorHora(hora);

          return (
            <div key={hora} className="border rounded p-3 bg-white w-full">

              <p className="font-semibold">{hora}</p>

              {reservasHora.length === 0 ? (
                <p className="text-gray-400 text-sm">Disponible</p>
              ) : (
                <div className="space-y-1">
                  {reservasHora.map((r) => (
                    <div
                      key={r.id}
                      className="text-sm bg-gray-100 p-2 rounded"
                    >
                      {r.nombre} - {r.servicio}
                    </div>
                  ))}
                </div>
              )}

            </div>
          );
        })}
      </div>
    </div>
  );
}