"use client";

import { motion } from "framer-motion";
import { UserPlus, CreditCard, QrCode, Dumbbell, RefreshCw } from "lucide-react";

const steps = [
  { icon: <UserPlus className="w-6 h-6" />, label: "Register" },
  { icon: <CreditCard className="w-6 h-6" />, label: "Payment" },
  { icon: <QrCode className="w-6 h-6" />, label: "QR Check-in" },
  { icon: <Dumbbell className="w-6 h-6" />, label: "Workout" },
  { icon: <RefreshCw className="w-6 h-6" />, label: "Renewal" },
];

export default function Workflow() {
  return (
    <section className="py-32 bg-gray-50 dark:bg-[#050505] relative overflow-hidden border-y border-gray-200 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Seamless Member Journey
          </motion.h2>
        </div>

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 max-w-5xl mx-auto">
          {/* Animated Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-gray-200 dark:bg-white/10 -translate-y-1/2 z-0" />
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="hidden md:block absolute top-1/2 left-0 h-[2px] bg-gradient-to-r from-[#FF2D2D]/0 via-[#FF2D2D] to-[#FF2D2D]/0 -translate-y-1/2 z-0 shadow-[0_0_10px_#FF2D2D]" 
          />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="relative z-10 flex flex-col items-center gap-4 group"
            >
              <div className="w-16 h-16 rounded-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 dark:text-[#BFBFBF] group-hover:text-[#FF2D2D] dark:group-hover:text-white group-hover:border-[#FF2D2D] group-hover:bg-[#FF2D2D]/10 transition-all duration-300 shadow-xl group-hover:shadow-[0_0_20px_rgba(255,45,45,0.3)]">
                {step.icon}
              </div>
              <div className="text-sm font-semibold text-gray-700 dark:text-white tracking-wide">
                {step.label}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
