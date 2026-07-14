"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Activity, Users, Calendar, Bell } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-[#050505]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF2D2D] opacity-[0.05] dark:opacity-[0.15] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16 pt-32 pb-16">
        
        {/* Left Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
              Manage Your Gym <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2D2D] to-[#ff7b7b]">
                Like Never Before
              </span>
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-lg md:text-xl text-gray-600 dark:text-[#BFBFBF] mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
          >
            Everything you need to run a modern fitness business—from memberships and attendance to payments, trainers, analytics, and automated notifications.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FF2D2D] hover:bg-[#E50914] text-white font-semibold transition-all hover:shadow-[0_0_20px_rgba(255,45,45,0.4)] flex items-center justify-center gap-2">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 text-gray-900 dark:text-white font-semibold backdrop-blur-sm border border-gray-200 dark:border-white/10 transition-all flex items-center justify-center gap-2 shadow-sm dark:shadow-none">
              <Play className="w-5 h-5" /> Watch Demo
            </button>
          </motion.div>
        </div>

        {/* Right 3D Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="flex-1 relative w-full max-w-2xl style={{ perspective: '1000px' }}"
        >
          {/* Dashboard Container */}
          <div className="relative bg-white dark:bg-[#111111]/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl p-6 transform-gpu rotate-y-[-5deg] rotate-x-[5deg]">
            {/* Mock Header */}
            <div className="flex items-center justify-between mb-8 border-b border-gray-100 dark:border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF2D2D]" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-gray-400 dark:text-white/50 text-sm font-medium">GymFlo Dashboard</div>
            </div>

            {/* Mock Content */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 border border-gray-100 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3 text-gray-500 dark:text-[#BFBFBF] mb-2">
                  <Users className="w-5 h-5 text-[#FF2D2D]" />
                  <span className="text-sm font-medium">Active Members</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">2,450</div>
                <div className="text-green-600 dark:text-green-500 text-xs mt-2 font-medium">+12% this month</div>
              </div>
              
              <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 border border-gray-100 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3 text-gray-500 dark:text-[#BFBFBF] mb-2">
                  <Activity className="w-5 h-5 text-[#FF2D2D]" />
                  <span className="text-sm font-medium">Monthly Revenue</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">$45.2k</div>
                <div className="text-green-600 dark:text-green-500 text-xs mt-2 font-medium">+8% this month</div>
              </div>

              <div className="col-span-2 bg-gray-50 dark:bg-white/5 rounded-xl p-6 border border-gray-100 dark:border-white/5 h-40 flex items-end justify-between gap-3">
                {/* Mock Chart */}
                {[40, 70, 45, 90, 65, 100, 80].map((height, i) => (
                  <div key={i} className="w-full bg-[#FF2D2D]/10 dark:bg-[#FF2D2D]/20 rounded-t-md relative group hover:bg-[#FF2D2D]/30 dark:hover:bg-[#FF2D2D]/40 transition-colors cursor-pointer" style={{ height: `${height}%` }}>
                    <div className="absolute bottom-0 w-full bg-[#FF2D2D] rounded-t-md" style={{ height: `${height/2}%` }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -right-8 top-10 bg-white dark:bg-[#202020] p-4 rounded-xl border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-2xl backdrop-blur-md"
          >
            <Calendar className="w-8 h-8 text-[#FF2D2D]" />
          </motion.div>

          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute -left-8 bottom-20 bg-white dark:bg-[#202020] p-4 rounded-xl border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-2xl backdrop-blur-md"
          >
            <Bell className="w-8 h-8 text-[#FF2D2D]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
