"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-28 px-6 bg-[#0d0d0f] text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/20 blur-[180px]" />
        <div className="absolute bottom-[-25%] left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[180px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Animated Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm tracking-wide uppercase text-white/70"
        >
          Nexacore Tech Consulting Agency
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          Powering Digital Innovation
          <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-400">
            with Modern Technology
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2 }}
          className="max-w-2xl mx-auto mt-6 text-lg text-white/70"
        >
          We help startups & enterprises build scalable digital products using
          AI, cloud architecture, and high-performance engineering.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#contact"
            className="px-8 py-3 rounded-lg text-lg font-medium bg-linear-to-r from-purple-500 to-blue-500 hover:opacity-90 transition-all shadow-lg shadow-purple-500/20"
          >
            Start a Project
          </a>

          <a
            href="#services"
            className="px-8 py-3 rounded-lg text-lg font-medium border border-white/20 hover:border-white/40 transition-all bg-white/5 backdrop-blur-md"
          >
            Explore Services
          </a>
        </motion.div>
      </div>
    </section>
  );
}
