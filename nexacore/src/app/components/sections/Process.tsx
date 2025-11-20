"use client";

import { motion } from "framer-motion";
import { Lightbulb, NotebookPen, Rocket, Settings } from "lucide-react";

const steps = [
  {
    title: "Discovery & Strategy",
    desc: "We analyze your goals, challenges and opportunities to craft a clear strategic roadmap.",
    icon: Lightbulb,
  },
  {
    title: "UX/UI Design",
    desc: "We design clean, intuitive and beautiful interfaces focused on user experience.",
    icon: NotebookPen,
  },
  {
    title: "Development",
    desc: "We build scalable, high-performance applications with robust architecture.",
    icon: Settings,
  },
  {
    title: "Launch & Support",
    desc: "We deploy, optimize and support your product with continuous improvements.",
    icon: Rocket,
  },
];

export default function ProcessSection() {
  return (
    <section className="w-full py-32 bg-[#0a0a0a] text-white" id="process">
      <div className="max-w-5xl mx-auto px-6">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-4"
        >
          Our Process
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          viewport={{ once: true }}
          className="text-neutral-400 text-center max-w-2xl mx-auto mb-20"
        >
          A clear methodology designed to deliver exceptional results.
        </motion.p>

        {/* Timeline */}
        <div className="relative border-l border-blue-500/20 ml-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative pl-10 pb-16"
              >
                {/* Line dot */}
                <div className="absolute left-[-11px] top-1">
                  <div className="w-5 h-5 rounded-full bg-blue-500 shadow-lg shadow-blue-500/40"></div>
                </div>

                {/* Icon */}
                <div className="mb-4">
                  <Icon size={38} className="text-blue-400" />
                </div>

                {/* Text */}
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
