import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Reserva {
  id: number;
  nombre: string;
  servicio: string;
  fecha: string;
  hora: string;
  estado?: string;
}

interface Props {
  estado: string;
}

const API_URL = "http://localhost:8000";

export default function CalendarView({ estado }: Props) {
  const [fecha, setFecha] = useState("");
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchReservas = async (selectedDate: string) => {
    if (!selectedDate) {
      setReservas([]);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/reservas`);
      if (!res.ok) throw new Error();

      const data: Reserva[] = await res.json();

      const filtradas = data.filter((r) => {
        const matchFecha = r.fecha === selectedDate;
        const matchEstado =
          estado === "todos" || r.estado === estado;

        return matchFecha && matchEstado;
      });

      setReservas(filtradas);
    } catch {
      toast.error("Error cargando calendario");
      setReservas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservas(fecha);
  }, [fecha, estado]);

  return (
    <div className="space-y-4">

      {/* 🧠 GUÍA PARA ADMIN (IMPORTANTE UX) */}
      <div className="bg-blue-50 border border-blue-200 p-3 rounded text-sm text-blue-800">
        <p className="font-semibold">📌 Cómo usar esta sección</p>
        <ul className="list-disc ml-5 mt-1 space-y-1">
          <li>Selecciona una fecha para ver las reservas del día</li>
          <li>Usa el filtro superior para ver estados (pendiente, confirmado, etc.)</li>
          <li>Cada tarjeta representa una cita agendada</li>
        </ul>
      </div>

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">
          Calendario de reservas
        </h2>

        <span className="text-xs text-gray-500">
          {fecha ? `Fecha activa: ${fecha}` : "Selecciona una fecha"}
        </span>
      </div>

      {/* INPUT FECHA */}
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        className="border p-2 rounded w-full"
      />

      {/* LOADING */}
      {loading && (
        <p className="text-sm text-gray-500">
          Cargando reservas...
        </p>
      )}

      {/* EMPTY STATE */}
      {!loading && fecha && reservas.length === 0 && (
        <div className="text-sm text-gray-400 border rounded p-3 bg-gray-50">
          No hay reservas registradas para esta fecha.
          <br />
          El sistema no encontró coincidencias.
        </div>
      )}

      {/* LISTA */}
      <div className="space-y-2">
        {reservas.map((r) => (
          <div
            key={r.id}
            className="border rounded p-3 bg-white shadow-sm"
          >
            <p className="font-medium">{r.nombre}</p>

            <p className="text-sm text-gray-500">
              Servicio: {r.servicio}
            </p>

            <p className="text-xs text-gray-400">
              Hora: {r.hora?.slice(0, 5) || "--:--"}
            </p>

            {r.estado && (
              <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                {r.estado}
              </span>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}