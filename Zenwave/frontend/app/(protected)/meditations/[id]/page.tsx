"use client";

import { useEffect } from "react";
import { useMeditation } from "@/hooks/useMeditation";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

export default function MeditationDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const { meditation, loading, error, fetchMeditation } = useMeditation();

  useEffect(() => {
    if (id) fetchMeditation(id);
  }, [id, fetchMeditation]);

  if (loading || !meditation) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-white/70 text-lg">
        Loading meditation...
      </div>
    );
  }

  return (
    <div className="relative px-8 py-20 min-h-screen text-white overflow-hidden">
      {/* MAGIC BACKGROUND FLOATING PARTICLES */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => {
          const size = 6 + Math.random() * 12;
          const left = Math.random() * 100;
          const delay = Math.random() * 4;
          const duration = 6 + Math.random() * 8;

          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-purple-400/40 blur-xl"
              style={{
                width: size,
                height: size,
                left: `${left}%`,
                top: "110%",
              }}
              animate={{
                y: ["0%", "-130%"],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          );
        })}
      </div>

      {/* MAIN CONTAINER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="
          relative z-10 max-w-5xl mx-auto
          bg-white/10 backdrop-blur-2xl
          border border-white/20 rounded-3xl
          p-10 shadow-[0_0_50px_rgba(120,60,255,0.2)]
        "
      >
        {/* TITLE */}
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-300 to-blue-300 text-transparent bg-clip-text">
          {meditation.title}
        </h1>

        <p className="text-white/70 text-lg mt-3">
          {meditation.category} • {meditation.duration} min •{" "}
          {meditation.level ?? "Beginner"}
        </p>

        {/* IMAGE / VIDEO SECTION */}
        <div className="relative w-full h-[340px] rounded-2xl overflow-hidden mt-10 shadow-xl">
          {meditation.fullVideoUrl ? (
            <video
              src={meditation.fullVideoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={meditation.fullImageUrl}
              alt={meditation.title}
              fill
              unoptimized
              className="object-cover"
            />
          )}
        </div>

        {/* DESCRIPTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 text-white/90 leading-relaxed text-lg"
        >
          {meditation.description ||
            "This meditation helps you reset your mind and reconnect with your inner calm."}
        </motion.div>

        {/* START BUTTON */}
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="
            mt-10 px-10 py-3 text-lg font-semibold
            rounded-full
            bg-gradient-to-r from-purple-500/60 to-blue-500/60
            border border-white/20 backdrop-blur-xl
            hover:from-purple-400 hover:to-blue-400
            transition-all shadow-2xl
          "
        >
          Start Meditation
        </motion.button>
      </motion.div>
    </div>
  );
}
