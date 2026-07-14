"use client";

import { motion } from "framer-motion";

const logos = [
  "IronFit",
  "PowerHouse",
  "Elite Gym",
  "Titan Fitness",
  "Beast Mode",
  "FitZone",
];

export default function TrustedBy() {
  return (
    <section className="py-12 bg-gray-50 dark:bg-[#050505] border-y border-gray-200 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-gray-500 dark:text-[#BFBFBF] tracking-wide uppercase mb-8">
          Trusted by premium fitness centers worldwide
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white tracking-tighter"
            >
              {logo}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
