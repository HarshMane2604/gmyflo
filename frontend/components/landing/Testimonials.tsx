"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "GymFlo completely transformed how we operate. The automated billing alone saved me 15 hours a week.",
    author: "Sarah Jenkins",
    role: "Owner",
    gym: "IronFit Studios",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    quote: "The best gym management software on the market. The QR check-in is so fast, our front desk never has a line anymore.",
    author: "Marcus Chen",
    role: "Manager",
    gym: "Elite Gym",
    avatar: "https://i.pravatar.cc/150?u=marcus"
  },
  {
    quote: "Finally, a platform that looks as good as it works. Our members love the app, and our trainers love the schedule manager.",
    author: "David Ross",
    role: "Founder",
    gym: "Titan Fitness",
    avatar: "https://i.pravatar.cc/150?u=david"
  }
];

export default function Testimonials() {
  return (
    <section className="py-32 bg-gray-50 dark:bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Loved by Gym Owners
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-white dark:bg-[#111111]/80 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-2xl p-8 hover:border-gray-300 dark:hover:border-[#FF2D2D]/30 transition-colors shadow-sm dark:shadow-none"
            >
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-[#FF2D2D] text-[#FF2D2D]" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-[#BFBFBF] text-lg mb-8 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author} 
                  className="w-12 h-12 rounded-full border border-gray-200 dark:border-white/20"
                />
                <div>
                  <div className="text-gray-900 dark:text-white font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-gray-500 dark:text-[#BFBFBF]">{testimonial.role}, <span className="text-gray-400 dark:text-white/70">{testimonial.gym}</span></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
