"use client";

import { useEffect, useState } from "react";
import { useMeditation } from "@/hooks/useMeditation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import VideComp from "@/components/common/VideComp";

interface Meditation {
  _id: string;
  title: string;
  category: string;
  duration: number;

  image: string;
  fullImageUrl: string;

  video?: string;
  fullVideoUrl?: string;
}
export default function Home() {
  const { meditations, loading, fetchMeditations } = useMeditation();
  const [selected, setSelected] = useState<Meditation | null>(null);

  useEffect(() => {
    fetchMeditations();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-white/70 text-lg">
        Loading meditations...
      </div>
    );
  }

  return (
    <section className="pb-24 bg-linear-to-br from-purple-900 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10 tracking-tight">
          Meditations for You
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {meditations.map((m, index) => (
            <motion.div
              key={m._id}
              layoutId={m._id}
              onClick={() => setSelected(m)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.14,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.03 }}
              className="
                cursor-pointer
                group relative rounded-3xl overflow-hidden
                bg-white/5 backdrop-blur-2xl
                border border-white/10 shadow-[0_20px_60px_rgba(255,255,255,0.08)]
              "
            >
              {/* Background Glow */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.5, scale: 1.2 }}
                className="
                  absolute inset-0 bg-gradient-to-br
                  from-purple-300/20 via-pink-300/10 to-blue-300/10
                  blur-2xl rounded-3xl pointer-events-none
                "
              />

              {/* Image */}
              <div className="flex justify-center items-center relative h-56 w-full overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="inset-0"
                >
                  <div className="relative w-36 h-36 overflow-hidden rounded-full bg-white/5 flex items-center justify-center">
                    <Image
                      src={m.fullImageUrl}
                      alt={m.title}
                      fill
                      unoptimized
                      className="object-cover w-full h-full"
                    />
                  </div>
                </motion.div>

                {/* Badge */}
                <div
                  className="
                  absolute top-4 left-4 px-4 py-1 rounded-full text-sm
                  bg-white/20 backdrop-blur-md border border-white/30
                  text-white shadow-lg
                "
                >
                  {m.category}
                </div>

                {/* Floating Play */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7, y: 10 }}
                  whileHover={{ opacity: 1, scale: 1, y: 0 }}
                  className="
                    absolute bottom-4 right-4
                    h-12 w-12 rounded-full flex items-center justify-center
                    bg-white/40 backdrop-blur-xl border border-white/20
                    shadow-xl text-purple-900 font-bold
                  "
                >
                  ▶
                </motion.div>
              </div>

              {/* Content */}
              <div className="relative p-6 mt-2">
                <h3 className="text-xl font-semibold tracking-tight text-white">
                  {m.title}
                </h3>

                <p className="text-sm text-white/70 mt-1">{m.duration} min</p>
              </div>

              {/* Light contour */}
              <div
                className="
                    absolute inset-0 rounded-3xl
                    bg-gradient-to-br from-white/10 to-transparent
                    opacity-0 group-hover:opacity-100
                    transition-all duration-700
                    pointer-events-none
                "
              ></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 🔥 FULLSCREEN CARD */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center
                 bg-black/70 backdrop-blur-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* MAIN WRAPPER */}
            <motion.div
              layoutId={selected._id}
              transition={{
                layout: { type: "spring", stiffness: 120, damping: 14 },
              }}
              className="
          relative w-[92vw] max-w-4xl p-0 overflow-hidden
          rounded-3xl border border-white/20
          bg-white/10 backdrop-blur-2xl shadow-[0_0_50px_rgba(160,80,255,0.35)]
        "
            >
              {/* CLOSE BUTTON */}
              <motion.button
                onClick={() => setSelected(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="
            absolute top-6 right-6 z-50 w-12 h-12
            rounded-full flex items-center justify-center
            bg-white/20 hover:bg-white/30
            backdrop-blur-xl border border-white/30 text-white
            shadow-[0_4px_20px_rgba(255,255,255,0.2)]
            transition
          "
              >
                ✕
              </motion.button>

              {/* BACKGROUND GRADIENT DECORATION */}
              <div className="absolute inset-0 -z-10 opacity-40 pointer-events-none">
                <div className="absolute w-72 h-72 bg-purple-500/40 blur-[120px] -top-10 -left-10 rounded-full animate-pulse" />
                <div className="absolute w-72 h-72 bg-blue-500/40 blur-[120px] bottom-0 right-0 rounded-full animate-pulse" />
              </div>

              {/* IMAGE */}
              <div className="relative w-full h-[50vh] overflow-hidden">
                {/*<Image
                  src={selected.imageUrl}
                  alt={selected.title}
                  fill
                  unoptimized
                  className="object-cover scale-100 hover:scale-105 transition duration-[1800ms]"
                />*/}

                <VideComp
                  videoUrl={selected.fullVideoUrl || ""}
                  width={1000}
                  height={400}
                />

                {/* elegant bottom fade */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/60" />
              </div>

              {/* CONTENT */}
              <div className="px-8 py-6">
                {/* Title */}
                <h2 className="text-4xl font-extrabold tracking-tight leading-tight drop-shadow-md">
                  {selected.title}
                </h2>

                <div className="flex items-center gap-4 mt-3">
                  <span className="px-4 py-1 rounded-full bg-purple-500/20 border border-purple-400/20 text-purple-200 text-sm">
                    {selected.category}
                  </span>
                  <span className="text-white/70">{selected.duration} min</span>
                </div>

                {/* Description box */}
                <p
                  className="mt-6 text-white/85 text-lg leading-relaxed bg-white/5 p-5
                         rounded-2xl border border-white/10
                         shadow-inner backdrop-blur-xl"
                >
                  Breathing deeply helps calm the mind and reduce stress. Focus
                  on the present moment, inhale slowly, and exhale tension.
                </p>

                {/* subtle glow underline */}
                <div
                  className="w-full h-[2px] bg-gradient-to-r
                          from-transparent via-purple-400/50 to-transparent mt-8"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
