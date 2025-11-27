"use client";

import { useEffect, useState, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem("zenwave_welcome_seen");
    if (hasSeen) return;

    // Random delay between 8 and 10 seconds
    const delay = Math.floor(Math.random() * (10000 - 8000 + 1)) + 8000;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    localStorage.setItem("zenwave_welcome_seen", "true");
  };

  const stopPropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-999 flex items-center justify-center"
          onClick={closeModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={stopPropagation}
            initial={{ scale: 0.7, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="
              relative w-[90%] max-w-md rounded-3xl p-16
              bg-white/10 backdrop-blur-2xl
              border border-white/20 shadow-xl
              text-white text-center
            "
          >
            {/* Close */}
            <button
              onClick={closeModal}
              className="
                absolute top-4 right-4 p-2
                rounded-full bg-white/20
                hover:bg-white/30 transition
                backdrop-blur-lg border border-white/30
              "
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Content */}
            <h2 className="text-2xl font-bold tracking-tight mb-3">
              Welcome to Zenwave!
            </h2>

            <p className="text-white/80 leading-relaxed">
              This small project is currently under development. Thank you for
              visiting and enjoying the meditations and relaxing sounds 🌿.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
