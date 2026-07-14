"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$49",
    description: "Perfect for independent trainers and small boutique gyms.",
    features: ["Up to 100 members", "Basic reporting", "Email support", "Class scheduling"],
    popular: false
  },
  {
    name: "Professional",
    price: "$149",
    description: "Everything you need to scale your growing fitness business.",
    features: ["Up to 1,000 members", "Advanced analytics", "24/7 priority support", "Automated billing", "QR Check-in"],
    popular: true
  },
  {
    name: "Enterprise",
    price: "$399",
    description: "Custom solutions for multi-location fitness franchises.",
    features: ["Unlimited members", "Custom reporting API", "Dedicated account manager", "White-label app", "Multi-location support"],
    popular: false
  }
];

export default function Pricing() {
  return (
    <section className="py-32 bg-gray-50 dark:bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 dark:text-[#BFBFBF] text-lg max-w-2xl mx-auto"
          >
            Choose the plan that fits your business. No hidden fees, cancel anytime.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`relative bg-white dark:bg-[#111111] rounded-3xl p-8 border ${
                plan.popular 
                  ? 'border-[#FF2D2D] shadow-xl dark:shadow-[0_0_40px_rgba(255,45,45,0.2)] md:scale-105 z-10' 
                  : 'border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-[#FF2D2D] text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
              <p className="text-gray-500 dark:text-[#BFBFBF] text-sm mb-6 h-10">{plan.description}</p>
              
              <div className="mb-8">
                <span className="text-5xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                <span className="text-gray-500 dark:text-[#BFBFBF]">/mo</span>
              </div>
              
              <button className={`w-full py-3 rounded-xl font-semibold transition-all mb-8 ${
                plan.popular 
                  ? 'bg-[#FF2D2D] text-white hover:bg-[#E50914] shadow-[0_0_20px_rgba(255,45,45,0.4)]' 
                  : 'bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10'
              }`}>
                Get Started
              </button>
              
              <ul className="space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600 dark:text-[#BFBFBF]">
                    <Check className="w-5 h-5 text-[#FF2D2D]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
