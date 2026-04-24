import { useContext } from "react";
import { BookingContext } from "@/context/BookingContext";

const ClientStep = ({ register, errors }: any) => {
  const context = useContext(BookingContext);
  if (!context) return null;

  const { setBooking } = context;

  return (
    <div className="space-y-4">

      {/* NOMBRE */}
      <div>
        <input
          type="text"
          placeholder="Nombre completo"
          {...register("nombre", {
            required: "El nombre es obligatorio",
            onChange: (e: any) => {
              setBooking((prev) => ({
                ...prev,
                client: { ...prev.client, nombre: e.target.value },
              }));
            },
          })}
          className="w-full border p-3 rounded-lg"
        />
        {errors.nombre && (
          <p className="text-red-500 text-sm mt-1">
            {errors.nombre.message}
          </p>
        )}
      </div>

      {/* EMAIL */}
      <div>
        <input
          type="email"
          placeholder="Correo electrónico"
          {...register("email", {
            required: "El email es obligatorio",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Ingresa un correo válido (ej: usuario@gmail.com)",
            },
            onChange: (e: any) => {
              setBooking((prev) => ({
                ...prev,
                client: { ...prev.client, email: e.target.value },
              }));
            },
          })}
          className="w-full border p-3 rounded-lg"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

     {/* TELÉFONO */}
<div>
  <label className="text-sm text-gray-600">
    Teléfono (Perú +51)
  </label>

  <div className="flex items-center border rounded-lg overflow-hidden">
    
    <span className="px-3 bg-gray-100 text-gray-700">
      +51
    </span>

    <input
      type="text"
      inputMode="numeric"
      placeholder="9XX XXX XXX"
      {...register("telefono", {
        required: "El teléfono es obligatorio",
        minLength: {
          value: 9,
          message: "Debe tener 9 dígitos",
        },
        maxLength: {
          value: 9,
          message: "Máximo 9 dígitos",
        },
        pattern: {
          value: /^[0-9]+$/,
          message: "Solo números",
        },
        onChange: (e: any) => {
          let value = e.target.value.replace(/\D/g, "");

          // 🔥 fuerza que empiece con 9
          if (value.length === 1 && value !== "9") {
            value = "9" + value;
          }

          // 🔥 limita a 9 dígitos
          value = value.slice(0, 9);

          setBooking((prev) => ({
            ...prev,
            client: {
              ...prev.client,
              telefono: value,
            },
          }));

          e.target.value = value;
        },
      })}
      className="w-full p-3 outline-none"
    />
  </div>

  {errors.telefono && (
    <p className="text-red-500 text-sm mt-1">
      {errors.telefono.message}
    </p>
  )}
</div>
    </div>
  );
};

export default ClientStep;