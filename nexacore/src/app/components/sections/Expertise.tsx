"use client";

import { motion } from "framer-motion";
import { Lightbulb, Code, Brain, Cloud } from "lucide-react";

const expertise = [
  {
    title: "Product Design",
    description:
      "UI/UX, prototyping, wireframing and user-centered digital experiences.",
    icon: <Lightbulb size={36} />,
  },
  {
    title: "Web & App Development",
    description:
      "Modern full-stack development using cutting-edge frameworks and tools.",
    icon: <Code size={36} />,
  },
  {
    title: "AI Integration",
    description:
      "AI assistants, workflow automation and intelligent data-driven systems.",
    icon: <Brain size={36} />,
  },
  {
    title: "Cloud & DevOps",
    description:
      "Scalable cloud architectures, CI/CD pipelines and performance optimization.",
    icon: <Cloud size={36} />,
  },
];

export default function Expertise() {
  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
          Our Expertise
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {expertise.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="
                flex flex-col items-start gap-4 p-6 rounded-2xl shadow-lg
                bg-linear-to-br from-gray-50 to-white border border-gray-200
                hover:shadow-xl hover:scale-[1.03] transition-all cursor-pointer
              "
            >
              <div className="text-orange-500">{item.icon}</div>

              <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>

              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
