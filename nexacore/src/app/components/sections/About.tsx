"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="w-full py-24 bg-neutral-900 text-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Left Image / Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="rounded-xl overflow-hidden shadow-lg"
        >
          <img
            src="/images/about/img_01.png"
            alt="Agency Team"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Right Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold leading-tight">
            Transforming Businesses Through Technology & Design
          </h2>

          <p className="text-neutral-300 mt-6 text-lg leading-relaxed">
            At Nexacore Consulting, our mission is to empower companies with
            cutting-edge technical solutions, premium user experience design,
            and future-ready strategies.
          </p>

          <p className="text-neutral-400 mt-4 leading-relaxed">
            We combine innovation, deep technical knowledge, and modern design
            principles to help ambitious brands scale faster, build better
            digital products, and deliver exceptional experiences.
          </p>

          <div className="mt-10 grid gap-4">
            <div className="flex items-start gap-3">
              <span className="text-blue-400 text-xl">✔</span>
              <p className="text-neutral-300">
                10+ years of industry experience
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-blue-400 text-xl">✔</span>
              <p className="text-neutral-300">
                Data-driven consulting approach
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-blue-400 text-xl">✔</span>
              <p className="text-neutral-300">
                Custom solutions for every business
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
