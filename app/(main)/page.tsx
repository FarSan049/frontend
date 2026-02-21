import Hero from '@/app/components/sections/Hero';
import Benefits from '@/app/components/sections/Benefits';
import Products from '@/app/components/sections/Products';
import Testimonials from '@/app/components/sections/Testimonials';
import CTA from '@/app/components/sections/CTA';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rental Tanaman Hias untuk Kantor & Event | Estetik & Praktis',
  description:
    'Sewa tanaman hias profesional untuk kantor, event, dan rumah. Konsultasi gratis via WhatsApp.',
}

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main>
      <Hero />
      <Benefits />
      <Products />
      <Testimonials />
      <CTA />
    </main>
  );
}
