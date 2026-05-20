import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

type Service = {
  id: number;
  title: string;
  description: string;
  price: number;
  image_url?: string;
  destacado?: boolean;
};

export default function ServicesAdmin() {
  const [services, setServices] = useState<Service[]>([]);
  const [search, setSearch] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    destacado: false,
  });

  const token = localStorage.getItem("token");

  const destacadosCount = services.filter(s => s.destacado).length;

  // ---------------- FETCH ----------------
  const fetchServices = async () => {
    try {
      const res = await fetch(`${API_URL}/servicios`);
      const data = await res.json();
      setServices(data);
    } catch {
      toast.error("Error cargando servicios");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // ---------------- CLEAN PREVIEW ----------------
  useEffect(() => {
    return () => {
      if (filePreview) URL.revokeObjectURL(filePreview);
    };
  }, [filePreview]);

  // ---------------- RESET ----------------
  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      price: "",
      destacado: false,
    });
    setFile(null);
    setFilePreview(null);
    setEditingId(null);
  };

  // ---------------- TOGGLE DESTACADO ----------------
  const toggleDestacado = async (s: Service) => {
    try {
      if (!token) {
        toast.error("No autorizado");
        return;
      }

      if (!s.destacado && destacadosCount >= 6) {
        toast.error("Máximo 6 servicios destacados");
        return;
      }

      const formData = new FormData();
      formData.append("title", s.title);
      formData.append("description", s.description);
      formData.append("price", String(s.price));
      formData.append("destacado", String(!s.destacado));

      const res = await fetch(`${API_URL}/servicios/${s.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.detail || "Error");
        return;
      }

      toast.success(
        !s.destacado ? "Marcado como destacado ⭐" : "Quitado de destacados"
      );

      fetchServices();
    } catch {
      toast.error("Error actualizando destacado");
    }
  };

  // ---------------- CREATE / UPDATE ----------------
  const saveService = async () => {
    try {
      if (!token) {
        toast.error("No autorizado");
        return;
      }

      if (form.destacado && !editingId && destacadosCount >= 6) {
        toast.error("Máximo 6 servicios destacados");
        return;
      }

      const priceNumber = Number(form.price);

      if (isNaN(priceNumber)) {
        toast.error("Precio inválido");
        return;
      }

      const formData = new FormData();
      formData.append("title", form.title.trim());
      formData.append("description", form.description.trim());
      formData.append("price", String(priceNumber));
      formData.append("destacado", String(form.destacado));

      if (file) formData.append("file", file);

      const res = await fetch(
        editingId
          ? `${API_URL}/servicios/${editingId}`
          : `${API_URL}/servicios`,
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.detail || "Error");
        return;
      }

      toast.success(
        editingId ? "Servicio actualizado" : "Servicio creado"
      );

      resetForm();
      fetchServices();
    } catch {
      toast.error("Error guardando servicio");
    }
  };

  // ---------------- DELETE ----------------
  const deleteService = async (id: number) => {
    try {
      if (!token) {
        toast.error("No autorizado");
        return;
      }

      await fetch(`${API_URL}/servicios/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Eliminado");
      fetchServices();
    } catch {
      toast.error("Error eliminando");
    }
  };

  // ---------------- EDIT ----------------
  const startEdit = (s: Service) => {
    setEditingId(s.id);

    setForm({
      title: s.title,
      description: s.description,
      price: String(s.price),
      destacado: s.destacado || false,
    });

    setFile(null);
    setFilePreview(s.image_url || null);
  };

  // ---------------- FILTER ----------------
  const filtered = services.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* FORM */}
      <div className="bg-white p-4 rounded border space-y-3">

        <h2 className="font-semibold text-lg">
          {editingId ? "✏️ Editando" : "➕ Crear servicio"}
        </h2>

        <input
          placeholder="Título"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          className="border p-2 rounded w-full"
        />

        <textarea
          placeholder="Descripción"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="border p-2 rounded w-full"
        />

        <input
          type="number"
          placeholder="Precio"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
          className="border p-2 rounded w-full"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files?.[0] || null;
            setFile(f);
            setFilePreview(f ? URL.createObjectURL(f) : null);
          }}
          className="border p-2 rounded w-full"
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.destacado}
            onChange={(e) => {
              const checked = e.target.checked;

              if (checked && !editingId && destacadosCount >= 6) {
                toast.error("Máximo 6 servicios destacados");
                return;
              }

              setForm({ ...form, destacado: checked });
            }}
          />
          <label className="text-sm">Destacado</label>
        </div>

        {filePreview && (
          <img
            src={filePreview}
            className="w-full h-40 object-cover rounded border"
          />
        )}

        <button
          onClick={saveService}
          className="bg-black text-white py-2 rounded w-full"
        >
          Guardar
        </button>
      </div>

      {/* LISTA */}
      <div className="bg-white p-4 rounded border space-y-4">

        <input
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <div className="space-y-2 max-h-[500px] overflow-auto">

          {filtered.map((s) => (
            <div
              key={s.id}
              className="border p-3 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{s.title}</p>
                <p className="text-xs text-gray-500">
                  S/ {s.price}
                </p>

                {s.destacado && (
                  <span className="text-xs text-yellow-600">
                    ⭐ Destacado
                  </span>
                )}
              </div>

              <div className="flex gap-2">

                <button
                  onClick={() => toggleDestacado(s)}
                  className="text-xs px-2 py-1 bg-gray-100 rounded"
                >
                  {s.destacado ? "Quitar ⭐" : "Destacar"}
                </button>

                <button
                  onClick={() => startEdit(s)}
                  className="text-blue-600"
                >
                  editar
                </button>

                <button
                  onClick={() => deleteService(s.id)}
                  className="text-red-600"
                >
                  borrar
                </button>

              </div>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
}