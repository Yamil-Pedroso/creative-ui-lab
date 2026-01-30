"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Product Manager – FinTech",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "The Nexacore team transformed our platform with modern UX and scalable technology. Their attention to detail and technical expertise is unmatched.",
  },
  {
    name: "Daniel Carter",
    role: "CTO – SaaS Startup",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "We integrated AI automation across our workflows thanks to Nexacore. Productivity skyrocketed, and the code quality is world-class.",
  },
  {
    name: "Emily Rodriguez",
    role: "CEO – Creative Studio",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "Their communication and design approach are outstanding. The final product exceeded every expectation—we loved working with them.",
  },
  {
    name: "Michael Adams",
    role: "COO – HealthTech",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    text: "Nexacore helped us modernize our system architecture and reduce server costs dramatically. Absolute professionals.",
  },
];

const marqueeList = [...testimonials, ...testimonials];

export default function Testimonials() {
  return (
    <section
      className="w-full py-32 bg-[#0a0a0a] text-white overflow-hidden"
      id="testimonials"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-4"
        >
          What Our Clients Say
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          viewport={{ once: true }}
          className="text-neutral-400 text-center max-w-2xl mx-auto mb-16"
        >
          Trusted by companies, startups, and teams around the world.
        </motion.p>

        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-8"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            }}
          >
            {marqueeList.map((t, index) => (
              <div
                key={index}
                className="min-w-[300px] sm:min-w-[380px] bg-[#111113] border border-blue-500/10 rounded-xl p-8 shadow-lg"
              >
                <Quote className="text-blue-400 mb-4 opacity-80" size={32} />

                <p className="text-neutral-300 leading-relaxed mb-6 text-lg">
                  “{t.text}”
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-14 h-14 rounded-full object-cover border border-blue-500/20"
                  />
                  <div>
                    <h4 className="text-lg font-semibold">{t.name}</h4>
                    <span className="text-sm text-neutral-500">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
