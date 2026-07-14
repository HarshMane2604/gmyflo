"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-32 relative overflow-hidden bg-gray-50 dark:bg-[#050505] border-t border-gray-200 dark:border-white/5">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF2D2D] opacity-[0.05] dark:opacity-20 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight"
        >
          Ready to Transform Your Gym?
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 dark:text-[#BFBFBF] mb-12 max-w-2xl mx-auto"
        >
          Join hundreds of premium fitness centers already using GymFlo to streamline operations and accelerate growth.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <button className="px-10 py-5 rounded-full bg-[#FF2D2D] hover:bg-[#E50914] text-white text-lg font-semibold transition-all shadow-[0_0_15px_rgba(255,45,45,0.2)] hover:shadow-[0_0_30px_rgba(255,45,45,0.5)] flex items-center justify-center gap-3 mx-auto">
            Start Managing with GymFlo Today <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
