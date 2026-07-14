"use client";

import { motion } from "framer-motion";

export default function DashboardShowcase() {
  return (
    <section className="py-32 bg-gray-50 dark:bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Command Center for your Gym
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 dark:text-[#BFBFBF] text-lg"
          >
            Get a birds-eye view of your entire business. Everything from
            attendance heatmaps to upcoming renewals, displayed beautifully.
          </motion.p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          {/* MacBook Frame */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 bg-white dark:bg-[#111111] rounded-t-3xl border-t-8 border-x-8 border-gray-200 dark:border-[#202020] p-4 pb-0 shadow-2xl"
          >
            {/* Screen Content */}
            <div className="bg-gray-50 dark:bg-[#0B0B0B] rounded-t-xl border border-gray-200 dark:border-white/10 w-full h-[600px] overflow-hidden flex flex-col">
              {/* Fake App Nav */}
              <div className="h-12 border-b border-gray-200 dark:border-white/5 flex items-center px-4 gap-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF2D2D]/80" />
                  <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-white/20" />
                </div>
                <div className="flex-1" />
                <div className="w-32 h-6 bg-gray-200 dark:bg-white/5 rounded-md" />
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10" />
              </div>

              {/* Fake Dashboard Grid */}
              <div className="flex-1 p-6 grid grid-cols-3 gap-6 opacity-80">
                {/* Stats row */}
                <div className="col-span-3 grid grid-cols-4 gap-4 h-24">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="bg-white dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/5 p-4 flex flex-col justify-between shadow-sm dark:shadow-none"
                    >
                      <div className="w-20 h-3 bg-gray-200 dark:bg-white/10 rounded" />
                      <div className="w-16 h-6 bg-gray-300 dark:bg-white/20 rounded" />
                    </div>
                  ))}
                </div>

                {/* Main Chart */}
                <div className="col-span-2 bg-white dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/5 p-6 h-64 flex flex-col justify-between relative overflow-hidden shadow-sm dark:shadow-none">
                  <div className="w-32 h-4 bg-gray-200 dark:bg-white/10 rounded mb-4" />
                  <div className="flex-1 flex items-end justify-between gap-2">
                    {[30, 45, 20, 60, 40, 80, 50, 90, 70, 100].map((h, i) => (
                      <div
                        key={i}
                        className="w-full bg-[#FF2D2D]/10 dark:bg-[#FF2D2D]/20 rounded-t"
                        style={{ height: `${h}%` }}
                      >
                        <div
                          className="w-full bg-[#FF2D2D] rounded-t"
                          style={{ height: "4px" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sidebar List */}
                <div className="col-span-1 bg-white dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/5 p-6 h-64 flex flex-col gap-4 shadow-sm dark:shadow-none">
                  <div className="w-24 h-4 bg-gray-200 dark:bg-white/10 rounded mb-2" />
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10" />
                      <div className="flex-1 space-y-2">
                        <div className="w-full h-2 bg-gray-300 dark:bg-white/20 rounded" />
                        <div className="w-2/3 h-2 bg-gray-200 dark:bg-white/10 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* MacBook Bottom Base */}
            <div className="h-4 w-full bg-gray-300 dark:bg-[#202020] rounded-b-3xl -mx-4 w-[calc(100%+2rem)] shadow-xl relative z-20">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-400 dark:bg-[#111111] rounded-b-md" />
            </div>
          </motion.div>

          {/* Floating Widget 1 */}
          <motion.div
            animate={{ y: [-15, 15, -15] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute -right-12 top-32 z-30 bg-white/90 dark:bg-[#1A1A1A]/90 backdrop-blur-xl p-4 rounded-xl border border-gray-200 dark:border-white/10 shadow-2xl w-48"
          >
            <div className="text-xs text-gray-500 dark:text-[#BFBFBF] mb-2">
              New Member
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF2D2D] to-orange-500" />
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  Alex Costa
                </div>
                <div className="text-xs text-[#FF2D2D]">Pro Plan</div>
              </div>
            </div>
          </motion.div>

          {/* Floating Widget 2 */}
          <motion.div
            animate={{ y: [15, -15, 15] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute -left-12 bottom-32 z-30 bg-white/90 dark:bg-[#1A1A1A]/90 backdrop-blur-xl p-4 rounded-xl border border-gray-200 dark:border-white/10 shadow-2xl w-56"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="text-xs text-gray-500 dark:text-[#BFBFBF]">
                Today's Revenue
              </div>
              <div className="text-xs text-green-500">+14%</div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              $1,240.00
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
