import Navbar from "@/app/components/layout/Navbar";
import FloatingWhatsApp from "@/app/components/ui/FloatingWhatsApp";
import Footer from "@/app/components/layout/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <FloatingWhatsApp />
      <Footer />
    </>
  );
}
