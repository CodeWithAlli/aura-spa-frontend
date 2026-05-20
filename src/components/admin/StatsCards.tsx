import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Reserva {
  estado: string;
}

interface Props {
  refreshTrigger: number;
}

// 🔥 BASE URL CENTRALIZADA
const API_URL = import.meta.env.VITE_API_URL;

export default function StatsCards({ refreshTrigger }: Props) {
  const [stats, setStats] = useState({
    total: 0,
    pendientes: 0,
    confirmados: 0,
    cancelados: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_URL}/reservas`);

      if (!res.ok) throw new Error();

      const data: Reserva[] = await res.json();

      setStats({
        total: data.length,
        pendientes: data.filter(r => r.estado === "pendiente").length,
        confirmados: data.filter(r => r.estado === "confirmado").length,
        cancelados: data.filter(r => r.estado === "cancelado").length,
      });

    } catch {
      toast.error("Error cargando métricas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [refreshTrigger]);

  if (loading) {
    return <p className="text-sm text-gray-500">Cargando métricas...</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card title="Total" value={stats.total} />
      <Card title="Pendientes" value={stats.pendientes} />
      <Card title="Confirmadas" value={stats.confirmados} />
      <Card title="Canceladas" value={stats.cancelados} />
    </div>
  );
}

function Card({ title, value }: any) {
  return (
    <div className="bg-white p-4 rounded-xl shadow border">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}