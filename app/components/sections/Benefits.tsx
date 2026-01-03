"use client";

import { benefits } from "@/lib/benefits";
import { motion } from "framer-motion";

export default function Benefits() {
  return (
      <section id="benefits" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900">
            Kenapa Pilih Rental Tanaman?
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: "backOut" }}
          >
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((item, index) => (
                <div
                  key={index}
                  className="p-8 rounded-2xl bg-green-50 hover:shadow-lg transition"
                >
                  <div className="text-4xl">{item.icon}</div>
                  <h3 className="mt-4 text-xl font-semibold text-green-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-green-700">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
  );
}
