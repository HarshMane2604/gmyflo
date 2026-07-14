"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How long does it take to migrate my existing members?",
    answer: "Most gyms can migrate their entire member database in under 24 hours. Our onboarding team provides a dedicated concierge service to handle the import process for you."
  },
  {
    question: "Do you support multiple gym locations?",
    answer: "Yes, our Enterprise plan supports unlimited locations with centralized reporting and localized access controls for your staff."
  },
  {
    question: "What hardware is required for the QR check-in?",
    answer: "Any standard tablet with a front-facing camera or a basic 2D barcode scanner will work perfectly with our system. No expensive proprietary hardware required."
  },
  {
    question: "Are there any hidden transaction fees for payments?",
    answer: "We pass through standard Stripe processing fees with zero additional markup on our Professional and Enterprise plans."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 bg-gray-50 dark:bg-[#050505] relative">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 dark:border-white/10 rounded-xl bg-white dark:bg-[#111111]/50 overflow-hidden shadow-sm dark:shadow-none"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="text-lg font-medium text-gray-900 dark:text-white">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-[#FF2D2D] transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-4 text-gray-600 dark:text-[#BFBFBF]">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
