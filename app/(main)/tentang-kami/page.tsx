"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const services = [
  {
    title: "Sewa Tanaman Hias",
    desc: "Layanan penyewaan tanaman untuk perkantoran, hotel, dan ruang publik dengan sistem perawatan rutin (maintenance) agar tanaman tetap prima.",
    icon: "🌻",
  },
  {
    title: "Dekorasi Taman Tanaman Hidup",
    desc: "Transformasi ruang melalui penataan tanaman hidup untuk berbagai acara (event), lobby, maupun area komersial.",
    icon: "✨",
  },
  {
    title: "Layanan Landscape",
    desc: "Perancangan dan pembuatan taman dari nol, mulai dari konsep desain hingga eksekusi lahan untuk hasil yang fungsional dan indah.",
    icon: "🏞️",
  },
  {
    title: "Penjualan Tanaman",
    desc: "Menyediakan berbagai koleksi tanaman hias indoor dan outdoor berkualitas tinggi bagi kolektor maupun kebutuhan proyek.",
    icon: "🛒",
  },
];

const reasons = [
  {
    title: "Kualitas Terjamin",
    desc: "Kami hanya menyediakan tanaman yang sehat dan terawat dengan baik.",
    icon: "✅",
  },
  {
    title: "Tim Ahli",
    desc: "Didukung oleh tenaga profesional yang memahami karakter setiap jenis tanaman.",
    icon: "👨‍🌾",
  },
  {
    title: "Pelayanan Fleksibel",
    desc: "Solusi yang dapat disesuaikan dengan anggaran dan kebutuhan estetika klien.",
    icon: "🤝",
  },
  {
    title: "Keberlanjutan",
    desc: "Kami mengutamakan penggunaan tanaman hidup untuk mendukung sirkulasi udara yang lebih bersih.",
    icon: "🌱",
  },
];

export default function TentangKami() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white-50">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-white-50">
        <div className="absolute inset-0 -z-10">
            <Image
            src="/images/katalogcover.jpg"
            alt="Background tanaman"
            fill
            priority
            className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-linear-to-b from-white/5 via-gray-600/30 to-white" />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Tentang Kami
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-green-50 max-w-2xl mx-auto"
          >
            Profil Perusahaan Wardhana Flora
          </motion.p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 max-w-4xl mx-auto px-6 text-center">
        <motion.div {...fadeInUp}>
          <h2 className="text-3xl font-bold text-green-900 mb-6 underline decoration-green-500 decoration-4 underline-offset-8">
            Siapa Kami?
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Wardhana Flora adalah mitra terpercaya Anda dalam penyediaan solusi vegetasi ruang. 
            Kami hadir untuk membawa kesegaran alam ke dalam lingkungan kerja maupun hunian Anda. 
            Dengan pengalaman di bidang hortikultura, kami berkomitmen untuk menciptakan ekosistem 
            yang asri, estetis, dan sehat melalui pengelolaan tanaman yang profesional.
          </p>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-900">Layanan Utama Kami</h2>
            <p className="mt-4 text-green-700">Kami menawarkan solusi komprehensif untuk kebutuhan hijau Anda</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-green-100 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-xl font-bold text-green-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <motion.h2 {...fadeInUp} className="text-3xl md:text-4xl font-bold text-green-900 text-center mb-16">
          Mengapa Memilih Wardhana Flora?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {reasons.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-6 items-start"
            >
              <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center shrink-0">
                <span className="text-2xl">{item.icon}</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-green-900 mb-1">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-green-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div {...fadeInUp}>
            <span className="inline-block px-4 py-1 rounded-full bg-green-500/20 text-green-300 text-sm font-bold tracking-widest uppercase mb-4">Visi Kami</span>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-8">
              Menjadi perusahaan lanskap dan penyewaan tanaman terdepan yang menginspirasi gaya hidup selaras dengan alam.
            </h2>
            <div className="w-24 h-1 bg-green-500 mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 text-center px-6">
        <motion.div {...fadeInUp}>
          <h2 className="text-3xl font-bold text-green-900 mb-4">Hubungi Kami</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Siap menghijaukan ruang Anda? Mari berdiskusi tentang konsep taman atau kebutuhan tanaman Anda bersama tim kami.
          </p>
          <a
            href="https://wa.me/6281314110863?text=Halo,%20Wardhana%20Flora,%20saya%20ingin%20konsultasi%20untuk%20layanan%20tanaman"
            className="inline-flex items-center gap-3 px-10 py-4 bg-green-600 text-white rounded-full font-bold text-lg hover:bg-green-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            Mulai Diskusi Sekarang
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </a>
        </motion.div>
      </section>
    </div>
  );
}
