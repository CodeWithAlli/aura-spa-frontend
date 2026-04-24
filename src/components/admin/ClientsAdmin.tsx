import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const API_URL = "http://localhost:8000";

type Client = {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  creado_en?: string;
};

export default function ClientsAdmin() {
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchClients = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/clients`);
      const data = await res.json();

      setClients(data);
    } catch {
      toast.error("Error cargando clientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copiado");
  };

  const openWhatsApp = (phone: string) => {
    window.open(`https://wa.me/51${phone}`, "_blank");
  };

  const filtered = clients.filter((c) =>
    `${c.nombre} ${c.email} ${c.telefono}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">

      {/* 🧭 GUIA ADMIN */}
      <div className="bg-green-50 border border-green-200 p-4 rounded-xl text-sm space-y-1">

        <p className="font-semibold text-green-700">
          📌 Estás en: Gestión de clientes
        </p>

        <p className="text-gray-700">
          Aquí ves todas las personas que han reservado o dejado sus datos.
        </p>

        <ul className="list-disc pl-5 text-gray-600 space-y-1">

          <li>
            📧 Puedes copiar correos para enviar promociones
          </li>

          <li>
            📞 Los teléfonos están listos para contacto directo
          </li>

          <li>
            💬 WhatsApp abre conversación automática
          </li>

          <li>
            📊 Esto es tu base de datos de marketing
          </li>

        </ul>

        <p className="text-xs text-green-600">
          Consejo: usa esta lista para campañas de promociones o fidelización.
        </p>

      </div>

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">
          Clientes
        </h1>

        <span className="text-sm text-gray-500">
          Total: {filtered.length}
        </span>
      </div>

      {/* SEARCH */}
      <input
        placeholder="Buscar cliente..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border p-2 rounded-lg"
      />

      {/* LIST */}
      <div className="border rounded-lg overflow-hidden bg-white">

        {loading ? (
          <p className="p-4 text-sm text-gray-500">
            Cargando clientes...
          </p>
        ) : filtered.length === 0 ? (
          <p className="p-4 text-sm text-gray-500">
            No hay clientes registrados
          </p>
        ) : (
          filtered.map((c) => (
            <div
              key={c.id}
              className="p-4 border-b flex items-center justify-between hover:bg-gray-50"
            >

              {/* INFO */}
              <div className="space-y-1">
                <p className="font-semibold">{c.nombre}</p>

                <p className="text-sm text-gray-600">
                  📧 {c.email}
                </p>

                <p className="text-sm text-gray-600">
                  📞 +51 {c.telefono}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2 flex-wrap justify-end">

                <button
                  onClick={() => copy(c.email)}
                  className="text-xs px-2 py-1 border rounded hover:bg-gray-100"
                >
                  copiar email
                </button>

                <button
                  onClick={() => copy("+51" + c.telefono)}
                  className="text-xs px-2 py-1 border rounded hover:bg-gray-100"
                >
                  copiar teléfono
                </button>

                <button
                  onClick={() => openWhatsApp(c.telefono)}
                  className="text-xs px-2 py-1 bg-green-500 text-white rounded"
                >
                  WhatsApp
                </button>

              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
}