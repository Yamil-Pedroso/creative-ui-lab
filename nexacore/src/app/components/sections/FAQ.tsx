"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What technologies do you specialize in?",
    a: "We work with modern stacks including Next.js, React, Node.js, Tailwind, AI tools, serverless architectures and cloud platforms like AWS and Supabase.",
  },
  {
    q: "Do you offer full product development?",
    a: "Yes. From idea validation, UX/UI design, development, deployment, and post-launch support — we handle the full lifecycle.",
  },
  {
    q: "Can you integrate AI into existing platforms?",
    a: "Absolutely. We implement OpenAI, embeddings, automation workflows, custom chatbots, and advanced data processing.",
  },
  {
    q: "Do you work with startups and small teams?",
    a: "Yes, we work with startups, entrepreneurs and established companies. We adapt to the scale and needs of your business.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full py-32 bg-[#0a0a0a] text-white" id="faq">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-4"
        >
          Frequently Asked Questions
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-neutral-400 text-center max-w-2xl mx-auto mb-12"
        >
          Everything you need to know before working with us.
        </motion.p>

        <div className="space-y-6">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="border border-blue-500/10 rounded-xl p-6 bg-[#111113] hover:border-blue-500/30 transition"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex justify-between items-center text-left"
                >
                  <span className="text-lg font-semibold text-white">
                    {item.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ChevronDown className="text-blue-400" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mt-4"
                    >
                      <p className="text-neutral-400 leading-relaxed text-sm">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
