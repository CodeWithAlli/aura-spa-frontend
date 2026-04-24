import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface User {
  id: number;
  email: string;
  rol: string;
  creado_en: string;
}

const API_URL = "https://aura-spa-backend.onrender.com";

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("admin");

  const token = localStorage.getItem("token");

  // ---------------- VALIDACIÓN ----------------
  const validateForm = () => {
    if (!email.includes("@")) {
      toast.error("El email debe contener @");
      return false;
    }

    if (!email.endsWith("@gmail.com")) {
      toast.error("Solo se permite correo @gmail.com");
      return false;
    }

    if (password.length < 8) {
      toast.error("La contraseña debe tener mínimo 8 caracteres");
      return false;
    }

    return true;
  };

  // ---------------- FETCH USERS ----------------
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      setUsers(data);
    } catch {
      toast.error("Error cargando usuarios");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- CREATE USER ----------------
  const createUser = async () => {
    if (!validateForm()) return;

    try {
      const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email,
          password,
          rol,
        }),
      });

      if (!res.ok) throw new Error();

      toast.success("Usuario creado");

      setEmail("");
      setPassword("");
      setRol("admin");

      fetchUsers();
    } catch {
      toast.error("Error creando usuario");
    }
  };

  // ---------------- DELETE USER ----------------
  const deleteUser = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error();

      toast.success("Usuario eliminado");

      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch {
      toast.error("Error eliminando usuario");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((u) =>
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full space-y-4">

      {/* 🧭 GUÍA DEL ADMIN (NUEVO) */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-sm space-y-1">

        <p className="font-semibold text-blue-700">
          📌 Estás en: Gestión de usuarios
        </p>

        <p className="text-gray-700">
          Desde aquí puedes crear, buscar y eliminar accesos al sistema.
        </p>

        <ul className="list-disc pl-5 text-gray-600 space-y-1">

          <li>
            🔐 Solo se permiten correos @gmail.com
          </li>

          <li>
            🔑 Contraseña mínima: 8 caracteres
          </li>

          <li>
            🧑‍💼 Rol admin = acceso total / staff = acceso limitado
          </li>

          <li>
            ⚠️ Eliminar usuario es permanente
          </li>

        </ul>

        <p className="text-xs text-blue-600">
          Consejo: usa el buscador antes de crear o eliminar usuarios.
        </p>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* 🟦 FORM (IZQUIERDA) */}
        <div className="bg-white p-4 rounded-xl border space-y-3 lg:col-span-1 h-fit">

          <h2 className="font-semibold">
            Crear nuevo usuario
          </h2>

          <input
            type="email"
            placeholder="Email (@gmail.com)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            type="password"
            placeholder="Contraseña (mín 8 caracteres)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <select
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </select>

          <button
            onClick={createUser}
            className="bg-black text-white px-4 py-2 rounded w-full"
          >
            Crear usuario
          </button>

        </div>

        {/* 🟨 TABLA + SEARCH (DERECHA) */}
        <div className="bg-white p-4 rounded-xl border lg:col-span-2 space-y-4">

          <input
            type="text"
            placeholder="Buscar por email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <div className="overflow-x-auto">

            <table className="w-full min-w-[600px] text-sm">

              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-3">ID</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Creado</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>

                {loading && (
                  <tr>
                    <td className="p-3" colSpan={5}>
                      Cargando...
                    </td>
                  </tr>
                )}

                {!loading && filteredUsers.map((u) => (
                  <tr key={u.id} className="border-t">

                    <td className="p-3">{u.id}</td>
                    <td className="break-all">{u.email}</td>
                    <td>{u.rol}</td>
                    <td className="whitespace-nowrap">{u.creado_en}</td>

                    <td>
                      <button
                        onClick={() => deleteUser(u.id)}
                        className="text-red-600 hover:underline"
                      >
                        Eliminar
                      </button>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        </div>

      </div>
    </div>
  );
}