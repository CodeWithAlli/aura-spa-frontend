import { createContext, useState, ReactNode } from "react";

export interface Booking {
  service: string | null;
  specialist: string | null;
  date: string | null;
  time: string | null;
  client: {
    nombre: string;
    email: string;
    telefono: string;
  };
}

interface BookingContextType {
  booking: Booking;
  setBooking: React.Dispatch<React.SetStateAction<Booking>>;
}

export const BookingContext = createContext<BookingContextType | null>(null);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [booking, setBooking] = useState<Booking>({
    service: null,
    specialist: null,
    date: null,
    time: null,
    client: {
      nombre: "",
      email: "",
      telefono: "",
    },
  });

  return (
    <BookingContext.Provider value={{ booking, setBooking }}>
      {children}
    </BookingContext.Provider>
  );
};