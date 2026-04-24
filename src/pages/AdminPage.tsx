import { useEffect, useState } from "react";

import ReservationsTable from "@/components/admin/ReservationsTable";
import StatsCards from "@/components/admin/StatsCards";
import FiltersBar from "@/components/admin/FiltersBar";
import DailyCalendar from "@/components/admin/DailyCalendar";
import CalendarView from "@/components/admin/CalendarView";
import UsersTable from "@/components/admin/UsersTable";
import ServicesAdmin from "@/components/admin/ServicesAdmin";
import ClientsAdmin from "@/components/admin/ClientsAdmin";

import { Menu } from "lucide-react";

type ViewMode =
  | "dashboard"
  | "calendar"
  | "users"
  | "services"
  | "clientes";

export default function AdminPage() {
  const [estado, setEstado] = useState("todos");
  const [refresh, setRefresh] = useState(0);
  const [view, setView] = useState<ViewMode>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = user?.rol === "admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const changeView = (newView: ViewMode) => {
    setView(newView);
    setSidebarOpen(false);
  };

  const handleRefresh = () => setRefresh((p) => p + 1);

  const goHome = () => {
    window.location.href = "/";
  };

  useEffect(() => {
    if (!isAdmin && (view === "users" || view === "services")) {
      setView("dashboard");
    }
  }, [view, isAdmin]);

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* SIDEBAR */}
      <aside className={`
        fixed lg:static top-0 left-0 h-full w-64 bg-white border-r z-50
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}>

        <div className="p-5 border-b font-semibold">
          Panel Admin
        </div>

        <nav className="flex flex-col p-4 gap-2 text-sm">

          <button onClick={() => changeView("dashboard")}
            className={`text-left px-3 py-2 rounded ${view === "dashboard" ? "bg-black text-white" : "hover:bg-gray-100"}`}>
            Dashboard
          </button>

          <button onClick={() => changeView("calendar")}
            className={`text-left px-3 py-2 rounded ${view === "calendar" ? "bg-black text-white" : "hover:bg-gray-100"}`}>
            Calendario
          </button>

          {isAdmin && (
            <>
              <button onClick={() => changeView("services")}
                className={`text-left px-3 py-2 rounded ${view === "services" ? "bg-black text-white" : "hover:bg-gray-100"}`}>
                Servicios
              </button>

              <button onClick={() => changeView("users")}
                className={`text-left px-3 py-2 rounded ${view === "users" ? "bg-black text-white" : "hover:bg-gray-100"}`}>
                Usuarios
              </button>

              <button onClick={() => changeView("clientes")}
                className={`text-left px-3 py-2 rounded ${view === "clientes" ? "bg-black text-white" : "hover:bg-gray-100"}`}>
                Clientes
              </button>
            </>
          )}

          <button onClick={goHome}
            className="text-left px-3 py-2 rounded hover:bg-gray-100">
            Ver sitio
          </button>

          <button onClick={handleLogout}
            className="text-left px-3 py-2 rounded text-red-600 hover:bg-red-50">
            Cerrar sesión
          </button>

        </nav>
      </aside>

      {/* OVERLAY MOBILE */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* CONTENT */}
      <main className="flex-1 p-6 space-y-6">

        {/* HEADER */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 border rounded"
            >
              <Menu size={20} />
            </button>

            <h1 className="text-2xl font-semibold">
              Panel de Administración
            </h1>
          </div>

          <div className="text-sm bg-white border px-3 py-1 rounded">
            {user?.email || "Usuario no identificado"}
          </div>

        </div>

        {/* DASHBOARD */}
        {view === "dashboard" && (
          <>
            <StatsCards refreshTrigger={refresh} />
            <FiltersBar estado={estado} setEstado={setEstado} />

            <div className="grid lg:grid-cols-3 gap-6">

              <div className="bg-white p-5 rounded-xl border">
                <h2 className="text-sm text-gray-600 mb-2">
                  Agenda del día
                </h2>
                <DailyCalendar />
              </div>

              <div className="lg:col-span-2 bg-white p-5 rounded-xl border">
                <h2 className="text-sm text-gray-600 mb-2">
                  Reservas
                </h2>

                <ReservationsTable
                  estado={estado}
                  onChange={handleRefresh}
                />
              </div>

            </div>
          </>
        )}

        {/* CALENDAR */}
        {view === "calendar" && (
          <>
            <FiltersBar estado={estado} setEstado={setEstado} />

            <div className="bg-white p-5 rounded-xl border">
              <CalendarView estado={estado} />
            </div>
          </>
        )}

        {/* SERVICES */}
        {view === "services" && isAdmin && (
          <div className="bg-white p-5 rounded-xl border">
            <ServicesAdmin />
          </div>
        )}

        {/* USERS */}
        {view === "users" && isAdmin && (
          <div className="bg-white p-5 rounded-xl border">
            <UsersTable />
          </div>
        )}

        {/* CLIENTS */}
        {view === "clientes" && isAdmin && (
          <div className="bg-white p-5 rounded-xl border">
            <ClientsAdmin />
          </div>
        )}

      </main>
    </div>
  );
}