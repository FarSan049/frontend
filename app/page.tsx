import Hero from '@/components/sections/Hero';
import Benefits from '@/components/sections/Benefits';
import Products from '@/components/sections/Products';
import Testimonials from '@/components/sections/Testimonials';
import CTA from '@/components/sections/CTA';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rental Tanaman Hias untuk Kantor & Event | Estetik & Praktis',
  description:
    'Sewa tanaman hias profesional untuk kantor, event, dan rumah. Konsultasi gratis via WhatsApp.',
}

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
