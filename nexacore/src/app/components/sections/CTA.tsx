"use client";

import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section
      id="cta"
      className="
        w-full py-32
        bg-gradient-to-br
        from-[#0d0d0f] via-[#0a0a0a] to-[#0d0d0f]
        relative overflow-hidden
      "
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 right-0 w-72 h-72 bg-blue-600/30 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/25 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center text-white">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold leading-tight mb-6"
        >
          Ready to Build Something Exceptional?
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          viewport={{ once: true }}
          className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          Let`s collaborate to design, build and scale digital products that
          make an impact.
        </motion.p>

        {/* Button */}
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
          viewport={{ once: true }}
          href="#contact"
          className="
            inline-block px-10 py-4 rounded-full
            font-semibold text-lg
            bg-blue-600 hover:bg-blue-500
            transition shadow shadow-blue-500/20
            hover:shadow-blue-500/40 hover:-translate-y-1
            duration-300
          "
        >
          Get in Touch
        </motion.a>
      </div>
    </section>
  );
}
