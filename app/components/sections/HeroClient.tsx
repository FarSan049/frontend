"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useHandleScrollTo } from "@/app/lib/handlescrollto";
import { trackEvent } from "@/lib/gtag"

interface HeroProps {
  hero: {
    title: string;
    motto: string;
    subtitle: string;
    images: any;
  };
}

export default function HeroClient({ hero }: HeroProps) {
  const handleScrollTo = useHandleScrollTo();
  
  const heroImage = (hero?.images as string) || "/images/hero-office.jpg";

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-green-50 pt-24 md:pt-0">
      <div className="max-w-7xl mx-auto px-6 min-h-screen grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div>
            <span className="inline-block mb-4 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              🌿 Solusi Ruang Lebih Hidup
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-green-900 leading-tight">
              {hero.title}
              <span className="block text-green-700">
                {hero.motto}
              </span>
            </h1>

            <p className="mt-6 text-lg text-green-700 max-w-xl">
              {hero.subtitle}
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://wa.me/6281314110863?text=Halo%20Wardhana%20Flora,%20saya%20ingin%20konsultasi%20untuk%20rental%20tanaman"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent(
                    "whatsapp_click",
                    "engagement",
                    "Landing Page WhatsApp"
                  )
                }
                className="px-8 py-4 bg-green-700 text-white font-semibold rounded-xl hover:bg-green-800 transition shadow-lg transition-transform duration-500 hover:scale-[1.02]"
              >
                Konsultasi via WhatsApp
              </a>

              <button
                onClick={() => handleScrollTo("#products")}
                className="cursor-pointer px-8 py-4 border border-green-700 text-green-700 font-semibold rounded-xl hover:bg-green-100 transition transition-transform duration-500 hover:scale-[1.02]"
              >
                Lihat Tanaman
              </button>
            </div>
          </div>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full h-[420px] md:h-[520px] rounded-3xl overflow-hidden shadow-xl"
        >
          <div className="relative w-full h-[420px] md:h-[520px] rounded-3xl overflow-hidden shadow-xl hover:scale-[1.02] transition-transform duration-500">
            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/10 to-transparent z-10" />

            <Image
              src={heroImage}
              alt="Hero image"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
