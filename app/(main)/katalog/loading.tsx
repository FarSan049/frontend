"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-24 h-24">
          {/* Outer Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-emerald-100 border-t-emerald-600"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          
          {/* Inner Pulsing Circle */}
          <motion.div
             className="absolute inset-4 rounded-full bg-emerald-500/20 flex items-center justify-center"
             animate={{
               scale: [0.8, 1.1, 0.8],
               opacity: [0.3, 0.6, 0.3],
             }}
             transition={{
               duration: 2,
               repeat: Infinity,
               ease: "easeInOut",
             }}
          >
            <div className="w-2 h-2 rounded-full bg-emerald-600" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <h2 className="text-xl font-semibold text-gray-800 tracking-tight">
            Menyiapkan Katalog Bunga...
          </h2>
          <p className="text-gray-500 mt-2 text-sm italic">
            Menyusun keindahan untuk Anda
          </p>
        </motion.div>
      </div>
    </div>

  );
}
