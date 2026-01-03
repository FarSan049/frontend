import { testimonials } from "@/lib/testimonials"

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-900">
          Apa Kata Klien Kami
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-green-50"
            >
              <p className="text-green-800 italic">
                “{item.message}”
              </p>

              <div className="mt-6">
                <p className="font-semibold text-green-900">
                  {item.name}
                </p>
                <p className="text-sm text-green-700">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
