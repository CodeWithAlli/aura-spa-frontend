interface Props {
  watch: any;
}

const SummaryCard = ({ watch }: Props) => {
  const servicio = watch("servicio");
  const fecha = watch("fecha");
  const hora = watch("hora");
  const nombre = watch("nombre");

  return (
    <div className="bg-gray-50 rounded-xl p-5 h-fit border">
      <h3 className="text-lg font-semibold mb-4">
        Resumen de tu cita
      </h3>

      <div className="space-y-3 text-sm">

        <Item label="Servicio" value={servicio} />
        <Item label="Fecha" value={fecha} />
        <Item label="Hora" value={hora} />
        <Item label="Cliente" value={nombre} />

      </div>

      {!servicio && (
        <p className="text-xs text-gray-400 mt-4">
          Completa el formulario para ver el resumen
        </p>
      )}
    </div>
  );
};

function Item({ label, value }: any) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium capitalize">
        {value || "-"}
      </span>
    </div>
  );
}

export default SummaryCard;