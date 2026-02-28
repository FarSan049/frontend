'use client'
import { trackEvent } from "@/lib/gtag"

export default function CTA() {
  return (
    <section className="py-24 bg-green-700 text-white text-center">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          Siap Membuat Ruangan Lebih Hidup?
        </h2>

        <p className="mt-4 text-green-100">
          Konsultasi gratis untuk kebutuhan kantor, event, atau rumah Anda.
        </p>

        <a
          href="https://wa.me/6281314110863?text=Halo,%20Wardhana%20Flora,%20saya%20ingin%20konsultasi%20untuk%20rental%20tanaman"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent(
              "whatsapp_click",
              "engagement",
              "Hero CTA WhatsApp"
            )
          }
          className="inline-block mt-8 px-10 py-4 bg-white text-green-700 font-semibold rounded-xl hover:bg-green-100 transition"
        >
          Chat via WhatsApp Sekarang
        </a>
      </div>
    </section>
  )
}
