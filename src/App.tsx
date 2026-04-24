import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { BookingProvider } from "@/context/BookingContext";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

import BookingPage from "@/pages/BookingPage";
import AdminPage from "@/pages/AdminPage";
import LoginPage from "@/pages/LoginPage";

import { Toaster } from "react-hot-toast";

// 🔐 PROTECCIÓN DE RUTA
function ProtectedRoute({ children }: any) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

// 🏠 HOME
function Home() {
  return (
    <>
      <Navbar />

      <section id="inicio">
        <Hero />
      </section>

      <section id="servicios">
        <ServicesGrid />
      </section>

      <section id="booking-section">
        <BookingPage />
      </section>

      <section id="contacto">
        <ContactSection />
      </section>

      <Footer />
    </>
  );
}

function App() {
  return (
    <HashRouter>
      <BookingProvider>

        <Toaster position="top-right" />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<LoginPage />} />
        </Routes>

      </BookingProvider>
    </HashRouter>
  );
}

export default App;