import Navbar from "@/app/components/layout/Navbar";
import FloatingWhatsApp from "@/app/components/ui/FloatingWhatsApp";
import Footer from "@/app/components/layout/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SpeedInsights/>
      <Navbar />
      {children}
      <FloatingWhatsApp />
      <Footer />
    </>
  );
}
