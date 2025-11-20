"use client";

import { motion } from "framer-motion";
import { FaCode, FaCloud, FaPaintBrush, FaRobot } from "react-icons/fa";

const services = [
  {
    title: "Full-Stack Development",
    desc: "Modern, scalable and secure web applications using the latest technologies.",
    icon: <FaCode className="text-3xl text-blue-400" />,
  },
  {
    title: "UX/UI Design",
    desc: "Pixel-perfect interfaces with premium user experience and interaction flows.",
    icon: <FaPaintBrush className="text-3xl text-blue-400" />,
  },
  {
    title: "Cloud & Architecture",
    desc: "Cloud solutions, scalability strategies, serverless architectures and automation.",
    icon: <FaCloud className="text-3xl text-blue-400" />,
  },
  {
    title: "AI Integration",
    desc: "We integrate OpenAI, embeddings, automation workflows and intelligent systems.",
    icon: <FaRobot className="text-3xl text-blue-400" />,
  },
];

export default function ServicesSection() {
  return (
    <section className="w-full py-28 bg-[#0b0b0c] text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-3"
        >
          Our Services
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="text-neutral-400 max-w-2xl mx-auto mb-14"
        >
          High-quality consulting, design and development solutions for modern
          businesses and digital products.
        </motion.p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              className="group p-8 rounded-xl bg-[#111113] border border-blue-500/10
                         backdrop-blur-sm shadow-lg hover:shadow-blue-500/20
                         transition-all cursor-pointer hover:-translate-y-1"
            >
              <div className="flex justify-center mb-5">{service.icon}</div>

              <h3 className="text-xl font-semibold mb-3 text-white">
                {service.title}
              </h3>

              <p className="text-neutral-400 leading-relaxed text-sm">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
