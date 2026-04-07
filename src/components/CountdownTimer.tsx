import { useState, useEffect } from "react";

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 0, minutes: 0, seconds: 0 });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const calculate = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) {
        setExpired(true);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      const totalSeconds = Math.floor(diff / 1000);
      setTimeLeft({
        hours: Math.floor(totalSeconds / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
      });
    };
    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (expired) {
    return (
      <span className="font-sans text-xs text-gold/70">Oferta vencida</span>
    );
  }

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex items-center gap-1.5" aria-live="polite" aria-label="Tiempo restante de la oferta">
      <span className="font-sans text-xs text-cream/70">Termina en:</span>
      <div className="flex items-center gap-1">
        {[
          { val: timeLeft.hours, label: "h" },
          { val: timeLeft.minutes, label: "m" },
          { val: timeLeft.seconds, label: "s" },
        ].map(({ val, label }, i) => (
          <span key={label} className="flex items-center gap-0.5">
            <span className="bg-white/10 text-cream font-sans text-xs font-medium px-2 py-1 rounded tabular-nums min-w-[28px] text-center">
              {pad(val)}
            </span>
            <span className="text-cream/50 text-xs">{label}</span>
            {i < 2 && <span className="text-cream/50 text-xs ml-0.5">:</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
