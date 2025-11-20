"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const caseStudies = [
  {
    title: "AI Automation Dashboard",
    desc: "A modern automation control panel with intelligent workflows, embeddings, and real-time insights.",
    image: "/images/case-studies/cs_01.webp",
  },
  {
    title: "Finance Analytics Platform",
    desc: "Data visualization, KPI dashboards, predictive analytics and user-centric design.",
    image: "/images/case-studies/cs_02.webp",
  },
  {
    title: "SaaS Productivity Tool",
    desc: "End-to-end product built with full-stack architecture and a delightful UX experience.",
    image: "/images/case-studies/cs_03.webp",
  },
];

export default function CaseStudies() {
  return (
    <section className="w-full py-32 bg-[#0a0a0a] text-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-4"
        >
          Case Studies
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          viewport={{ once: true }}
          className="text-neutral-400 text-center max-w-2xl mx-auto mb-16"
        >
          A selection of our most impactful work — designed, engineered, and
          delivered with precision.
        </motion.p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {caseStudies.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              className="group bg-[#111113] border border-blue-500/10 rounded-xl overflow-hidden hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10 transition-all cursor-pointer"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <ArrowUpRight className="text-white text-4xl" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {project.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
