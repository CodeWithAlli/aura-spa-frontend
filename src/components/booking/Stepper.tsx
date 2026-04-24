const steps = ["Servicio", "Fecha y Hora", "Datos", "Pago"];

interface Props {
  currentStep: number;
}

const Stepper = ({ currentStep }: Props) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep === stepNumber;
        const isCompleted = currentStep > stepNumber;

        return (
          <div key={step} className="flex-1 flex items-center">

            {/* CÍRCULO */}
            <div
              className={`
                w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition
                ${isCompleted ? "bg-emerald-600 text-white" : ""}
                ${isActive ? "border-2 border-emerald-600 text-emerald-600 bg-white" : ""}
                ${!isActive && !isCompleted ? "bg-gray-200 text-gray-500" : ""}
              `}
            >
              {isCompleted ? "✓" : stepNumber}
            </div>

            {/* TEXTO */}
            <span
              className={`
                ml-2 text-sm transition
                ${isActive ? "text-emerald-600 font-semibold" : "text-gray-500"}
              `}
            >
              {step}
            </span>

            {/* LÍNEA */}
            {index < steps.length - 1 && (
              <div
                className={`
                  flex-1 h-[2px] mx-4 transition
                  ${currentStep > stepNumber ? "bg-emerald-600" : "bg-gray-300"}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;