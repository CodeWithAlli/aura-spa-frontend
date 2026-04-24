interface Props {
  estado: string;
  setEstado: (estado: string) => void;
}

const filtros = [
  { key: "todos", label: "Todos" },
  { key: "pendiente", label: "Pendientes" },
  { key: "confirmado", label: "Confirmadas" },
  { key: "cancelado", label: "Canceladas" },
];

export default function FiltersBar({ estado, setEstado }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <span className="text-sm text-gray-500 mr-2">
        Filtrar por estado:
      </span>

      {filtros.map((f) => (
        <button
          key={f.key}
          onClick={() => setEstado(f.key)}
          className={`px-4 py-1.5 rounded-full text-sm border transition-all duration-200 ${
            estado === f.key
              ? "bg-black text-white border-black shadow-sm"
              : "bg-white text-gray-600 hover:bg-gray-100 border-gray-200"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}