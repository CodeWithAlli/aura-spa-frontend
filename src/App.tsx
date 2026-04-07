import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import TreatmentsShowcase from "@/components/TreatmentsShowcase";
import PromotionsSection from "@/components/PromotionsSection";
import BookingForm from "@/components/BookingForm";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AddToHomeScreenBanner from "@/components/AddToHomeScreenBanner";

function App() {
  return (
    <div className="min-h-screen bg-cream overflow-x-hidden">
      <Navbar />
      <Hero />
      <ServicesGrid />
      <TreatmentsShowcase />
      <PromotionsSection />
      <BookingForm />
      <TestimonialsCarousel />
      <ContactSection />
      <Footer />
      <AddToHomeScreenBanner />
    </div>
  );
}

export default App;
