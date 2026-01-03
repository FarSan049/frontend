'use client'

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
          href="https://wa.me/6281213941963"
          onClick={() => console.log('CTA WhatsApp clicked')}
          className="inline-block mt-8 px-10 py-4 bg-white text-green-700 font-semibold rounded-xl hover:bg-green-100 transition"
        >
          Chat via WhatsApp Sekarang
        </a>
      </div>
    </section>
  )
}
