import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Reserva {
  id: number;
  codigo: string;
  nombre: string;
  servicio: string;
  fecha: string;
  hora: string;
  estado: string;
}

interface Props {
  estado: string;
  onChange: () => void;
}

// 🔥 BASE URL CENTRALIZADA
const API = import.meta.env.VITE_API_URL;

export default function ReservationsTable({ estado, onChange }: Props) {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [editing, setEditing] = useState<Reserva | null>(null);

  const [search, setSearch] = useState("");

  const fetchReservas = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API}/reservas?estado=${estado}`);

      const data = await res.json();
      setReservas(data);
    } catch {
      toast.error("Error cargando reservas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservas();
  }, [estado]);

  const cambiarEstado = async (id: number, nuevoEstado: string) => {
    try {
      setActionLoading(id);

      const res = await fetch(`${API}/reservas/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevoEstado }),
      });

      if (!res.ok) throw new Error();

      toast.success("Estado actualizado");

      await fetchReservas();
      onChange();

    } catch {
      toast.error("Error actualizando estado");
    } finally {
      setActionLoading(null);
    }
  };

  const eliminarReserva = async (id: number) => {
    if (!window.confirm("¿Eliminar reserva?")) return;

    try {
      setActionLoading(id);

      const res = await fetch(`${API}/reservas/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      toast.success("Reserva eliminada");

      await fetchReservas();
      onChange();

    } catch {
      toast.error("Error eliminando reserva");
    } finally {
      setActionLoading(null);
    }
  };

  const guardarEdicion = async () => {
    if (!editing) return;

    try {
      const res = await fetch(`${API}/reservas/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        toast.error(data.error || "Error al actualizar");
        return;
      }

      toast.success("Reserva actualizada");

      setEditing(null);
      await fetchReservas();
      onChange();

    } catch {
      toast.error("Error de conexión");
    }
  };

  const formatHora = (hora: string) => hora?.slice(0, 5) || "";

  const reservasFiltradas = reservas.filter((r) =>
    r.nombre.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p className="text-sm text-gray-500">Cargando reservas...</p>;
  }

  return (
    <>
      <input
        type="text"
        placeholder="Buscar cliente..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full border p-2 rounded"
      />

      {!reservasFiltradas.length ? (
        <p className="text-sm text-gray-500">No hay resultados.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border rounded-xl overflow-hidden">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Código</th>
                <th className="p-3">Cliente</th>
                <th className="p-3">Servicio</th>
                <th className="p-3">Fecha</th>
                <th className="p-3">Hora</th>
                <th className="p-3">Estado</th>
                <th className="p-3">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {reservasFiltradas.map((r) => (
                <tr key={r.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{r.codigo}</td>
                  <td className="p-3">{r.nombre}</td>
                  <td className="p-3">{r.servicio}</td>
                  <td className="p-3">{r.fecha}</td>
                  <td className="p-3">{formatHora(r.hora)}</td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        r.estado === "confirmado"
                          ? "bg-green-100 text-green-700"
                          : r.estado === "cancelado"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {r.estado}
                    </span>
                  </td>

                  <td className="p-3 flex gap-2">
                    <button
                      disabled={actionLoading === r.id}
                      onClick={() => cambiarEstado(r.id, "confirmado")}
                      className="px-3 py-1 text-xs bg-green-600 text-white rounded"
                    >
                      Confirmar
                    </button>

                    <button
                      disabled={actionLoading === r.id}
                      onClick={() => cambiarEstado(r.id, "cancelado")}
                      className="px-3 py-1 text-xs bg-red-600 text-white rounded"
                    >
                      Cancelar
                    </button>

                    <button
                      onClick={() => setEditing(r)}
                      className="px-3 py-1 text-xs bg-blue-600 text-white rounded"
                    >
                      Editar
                    </button>

                    <button
                      disabled={actionLoading === r.id}
                      onClick={() => eliminarReserva(r.id)}
                      className="px-3 py-1 text-xs bg-gray-800 text-white rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96 space-y-3">
            <h2 className="font-semibold">Editar reserva</h2>

            <input
              value={editing.nombre}
              onChange={(e) =>
                setEditing({ ...editing, nombre: e.target.value })
              }
              className="w-full border p-2 rounded"
            />

            <input
              value={editing.servicio}
              onChange={(e) =>
                setEditing({ ...editing, servicio: e.target.value })
              }
              className="w-full border p-2 rounded"
            />

            <input
              type="date"
              value={editing.fecha}
              onChange={(e) =>
                setEditing({ ...editing, fecha: e.target.value })
              }
              className="w-full border p-2 rounded"
            />

            <input
              value={formatHora(editing.hora)}
              onChange={(e) =>
                setEditing({ ...editing, hora: e.target.value })
              }
              className="w-full border p-2 rounded"
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setEditing(null)}>Cancelar</button>

              <button
                onClick={guardarEdicion}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}