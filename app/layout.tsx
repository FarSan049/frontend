import type { Metadata } from "next";
import "@/globals.css";
import Navbar from "@/components/layout/Navbar";
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: "Rental Tanaman Hias | Estetika Alami untuk Ruang Anda",
  description:
    "Sewa tanaman hias untuk kantor, event, dan rumah. Praktis, estetik, dan siap kirim.",
  keywords: ["rental tanaman", "sewa tanaman hias", "tanaman kantor"],
  openGraph: {
    title: "Rental Tanaman Hias",
    description: "Solusi estetika alami tanpa ribet",
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Rental Tanaman Hias",
  description: "Jasa sewa tanaman hias untuk kantor, event, dan rumah.",
  url: "https://domainkamu.com",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: "+62xxxxxxxxxx",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <Navbar />
        {children}
        <FloatingWhatsApp />
        <Footer />
      </body>
    </html>
  );
}
