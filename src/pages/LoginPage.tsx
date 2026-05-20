import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

// 🔥 BASE URL CENTRALIZADA
const API_URL = import.meta.env.VITE_API_URL;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);

  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const [attempts, setAttempts] = useState(0);
  const [blockedUntil, setBlockedUntil] = useState<number | null>(null);

  const navigate = useNavigate();

  const isBlocked = blockedUntil ? Date.now() < blockedUntil : false;

  const handleLogin = async () => {
    if (loading) return;

    if (isBlocked) {
      toast.error("Demasiados intentos. Espera un momento.");
      return;
    }

    if (!email || !password) {
      toast.error("Completa todos los campos");
      return;
    }

    const toastId = toast.loading("Verificando credenciales...");

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        const next = attempts + 1;
        setAttempts(next);

        if (next >= 5) {
          setBlockedUntil(Date.now() + 30000);
          setAttempts(0);
          toast.error("Bloqueado por 30 segundos", { id: toastId });
          return;
        }

        toast.error(data?.detail || "Credenciales inválidas", {
          id: toastId,
        });

        return;
      }

      const storage = remember ? localStorage : sessionStorage;

      storage.setItem("token", data.token);
      storage.setItem("user", JSON.stringify(data.user));

      setAttempts(0);
      setBlockedUntil(null);

      toast.success("Bienvenido", { id: toastId });

      navigate("/admin", { replace: true });

    } catch {
      toast.error("Error de conexión", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow w-80 space-y-4"
      >

        <button
          onClick={() => (window.location.href = "/")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-black"
        >
          <ArrowLeft size={16} />
          Volver al sitio
        </button>

        <h2 className="text-lg font-semibold text-center">
          Panel de Administración
        </h2>

        <p className="text-xs text-gray-500 text-center leading-snug">
          Zona exclusiva de administración de la empresa.  
          Acceso restringido solo a personal autorizado.
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setFocusPassword(true)}
            onBlur={() => setFocusPassword(false)}
            className="w-full border p-2 rounded pr-10"
          />

          {focusPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2.5 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          Recordar sesión
        </label>

        {isBlocked && (
          <p className="text-xs text-red-500 text-center">
            Demasiados intentos. Intenta nuevamente en unos segundos.
          </p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading || isBlocked}
          className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>

        <p className="text-xs text-gray-400 text-center">
          Intentos: {attempts}/5
        </p>

      </motion.div>
    </div>
  );
}