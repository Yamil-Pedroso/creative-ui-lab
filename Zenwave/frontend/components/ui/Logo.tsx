"use client";
import { motion } from "framer-motion";

export default function Logo() {
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      className="font-mono font-bold text-xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
    >
      {"Zenwave"}
    </motion.div>
  );
}
