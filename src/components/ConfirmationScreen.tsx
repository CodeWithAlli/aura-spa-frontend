import { CheckCircle } from "lucide-react";

interface Props {
  data: {
    nombre: string;
    servicio: string;
    fecha: string;
    hora: string;
    codigo?: string;
  };
  onClose: () => void;
}

export default function ConfirmationScreen({ data, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl text-center">

        {/* ICONO */}
        <div className="flex justify-center mb-4">
          <CheckCircle size={42} className="text-emerald-600" />
        </div>

        {/* TÍTULO */}
        <h2 className="text-xl font-semibold mb-2">
          Reserva Confirmada
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          Tu cita ha sido registrada correctamente.
        </p>

        {/* “CARTA” */}
        <div className="bg-gray-50 border rounded-xl p-4 text-sm text-left space-y-2">

          <p>
            Hola <span className="font-medium">{data.nombre}</span>,
          </p>

          <p>
            Hemos reservado tu servicio de{" "}
            <span className="font-medium">{data.servicio}</span>.
          </p>

          <p>
            Te esperamos el{" "}
            <span className="font-medium">{data.fecha}</span>{" "}
            a las{" "}
            <span className="font-medium">{data.hora}</span>.
          </p>

          {data.codigo && (
            <p className="mt-3 text-xs text-gray-500">
              Código de reserva:{" "}
              <span className="font-medium">{data.codigo}</span>
            </p>
          )}
        </div>

        {/* BOTÓN */}
        <button
          onClick={onClose}
          className="mt-6 w-full bg-emerald-600 text-white py-3 rounded-lg"
        >
          Entendido
        </button>

      </div>
    </div>
  );
}