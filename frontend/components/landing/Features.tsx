"use client";

import { motion } from "framer-motion";
import { CreditCard, QrCode, Users, DollarSign, BarChart3, Bell } from "lucide-react";

const features = [
  {
    icon: <CreditCard className="w-6 h-6 text-[#FF2D2D]" />,
    title: "Membership Management",
    description: "Effortlessly handle sign-ups, renewals, and tier upgrades with a streamlined process that saves you hours."
  },
  {
    icon: <QrCode className="w-6 h-6 text-[#FF2D2D]" />,
    title: "QR Attendance",
    description: "Lightning-fast member check-ins. Just scan and go. Prevent bottlenecking at your front desk during peak hours."
  },
  {
    icon: <Users className="w-6 h-6 text-[#FF2D2D]" />,
    title: "Trainer Management",
    description: "Assign clients, schedule sessions, and track trainer performance all from a single unified dashboard."
  },
  {
    icon: <DollarSign className="w-6 h-6 text-[#FF2D2D]" />,
    title: "Billing & Payments",
    description: "Automate your billing cycle. Set up recurring payments, handle failed cards, and track revenue seamlessly."
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-[#FF2D2D]" />,
    title: "Analytics Dashboard",
    description: "Make data-driven decisions with real-time insights into attendance, growth, revenue, and retention."
  },
  {
    icon: <Bell className="w-6 h-6 text-[#FF2D2D]" />,
    title: "Automated Notifications",
    description: "Keep members engaged with automated SMS and email reminders for upcoming classes or overdue payments."
  }
];

export default function Features() {
  return (
    <section className="py-32 bg-gray-50 dark:bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Everything you need. <br />
            <span className="text-gray-500 dark:text-[#BFBFBF]">Nothing you don't.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 dark:text-[#BFBFBF] text-lg"
          >
            Built for modern fitness businesses that demand high performance, reliability, and an incredible user experience.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white dark:bg-[#111111]/50 backdrop-blur-lg border border-gray-200 dark:border-white/5 rounded-2xl p-8 hover:border-gray-300 dark:hover:border-[#FF2D2D]/50 transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-none dark:hover:shadow-[0_0_30px_rgba(255,45,45,0.15)]"
            >
              {/* Top Red Glow Effect */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#FF2D2D] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="bg-gray-50 dark:bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-[#BFBFBF] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
