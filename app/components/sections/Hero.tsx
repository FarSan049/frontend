"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useHandleScrollTo } from "@/lib/handlescrollto";

export default function Hero() {
  const handleScrollTo = useHandleScrollTo();
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-green-50">
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
              Sewa Tanaman untuk
              <span className="block text-green-700">
                Kantor yang Lebih Estetik
              </span>
            </h1>

            <p className="mt-6 text-lg text-green-700 max-w-xl">
              Ciptakan suasana kerja yang nyaman dan profesional tanpa ribet
              perawatan. Kami urus semuanya untuk Anda.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://wa.me/6281314110863"
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
        {/* <div className="relative w-full h-[420px] md:h-[520px] rounded-3xl overflow-hidden shadow-xl hover:scale-[1.02] transition-transform duration-500">
          <Image
            src="/images/hero-office.jpg"
            alt="Kantor modern dengan tanaman hias"
            fill
            priority
            className="object-cover"
          />
        </div> */}
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
              src="/images/hero-office.jpg"
              alt="Kantor modern dengan tanaman hias"
              fill
              priority
              sizes="(min-width: 1024px) 1200px, 100vw"
              className="object-cover fetchpriority-high"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
