"use client";

import { useEffect, useState, useRef } from "react";
import { useMeditation } from "@/hooks/useMeditation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface Meditation {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
  duration: number;
}

export default function MeditationsPage() {
  const [meditations, setMeditations] = useState<Meditation[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const {
    meditations: fetchedMeditations,
    loading: meditationsLoading,
    fetchMeditations,
  } = useMeditation();

  const mousePositions = useRef<Record<string, { x: number; y: number }>>({});

  // Load meditations from backend
  useEffect(() => {
    fetchMeditations();
  }, [fetchMeditations]);

  // Sync into local state when hook finishes loading
  useEffect(() => {
    if (!meditationsLoading) {
      setMeditations(fetchedMeditations);
      setLoading(false);
    }
  }, [fetchedMeditations, meditationsLoading]);

  if (loading) {
    return (
      <div className="text-center py-20 text-white/70 text-lg">
        Loading meditations...
      </div>
    );
  }

  // eslint-disable-next-line react-hooks/purity
  const random = Math.random();

  // Random animation directions for entry
  const randomEntry = () => {
    const options = [
      { x: -200, y: 0 },
      { x: 200, y: 0 },
      { x: 0, y: -200 },
      { x: 0, y: 200 },
      { x: -150, y: -150 },
      { x: 150, y: -150 },
      { x: -150, y: 150 },
      { x: 150, y: 150 },
    ];
    return options[Math.floor(random * options.length)];
  };

  // Colors for magic glow
  const magicColors = [
    "#8b5cf6",
    "#a855f7",
    "#3b82f6",
    "#22d3ee",
    "#4ade80",
    "#f472b6",
  ];

  return (
    <div className="flex justify-center gap-10 flex-wrap p-10">
      {meditations.map((m, index) => {
        const color = magicColors[index % magicColors.length];

        return (
          <motion.div
            key={m._id}
            initial={{
              opacity: 0,
              scale: 0.85,
              ...randomEntry(),
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: index * 0.08,
              ease: "easeOut",
            }}
            onMouseMove={(e) => {
              const rect = (
                e.currentTarget as HTMLElement
              ).getBoundingClientRect();
              mousePositions.current[m._id] = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
              };
            }}
            className="
              group
              w-[260px] h-[450px]
              rounded-[40px]
              bg-linear-to-br from-purple-300/20 to-white/5
              backdrop-blur-xl
              border border-white/20
              shadow-[0_0_30px_rgba(255,255,255,0.08)]
              p-4 relative overflow-hidden
              transition-all duration-500
              hover:scale-[1.04] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)]
              flex flex-col
            "
          >
            {/* MAGIC PARTICLES FOLLOWING MOUSE */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {[...Array(12)].map((_, i) => {
                const pos = mousePositions.current[m._id] || {
                  x: 130,
                  y: 225,
                };
                const size = 6 + Math.random() * 12;
                const speed = 1 + Math.random() * 2;

                return (
                  <motion.div
                    key={i}
                    className="absolute rounded-full blur-sm z-20"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      x: pos.x + (Math.random() * 100 - 50),
                      y: pos.y + (Math.random() * 100 - 50),
                      scale: [0.5, 1.5, 0.7],
                    }}
                    transition={{
                      duration: speed,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: Math.random() * 1.4,
                    }}
                    style={{
                      width: size,
                      height: size,
                      backgroundColor: color,
                    }}
                  />
                );
              })}

              {/* ASCENDING PARTICLES */}
              {[...Array(12)].map((_, i) => {
                const randomX = Math.random() * 180 - 90;
                const randomSize = 4 + Math.random() * 10;
                const randomDelay = Math.random() * 2;
                const randomDuration = 1.5 + Math.random() * 2;

                return (
                  <div
                    key={`up-${i}`}
                    className="absolute bottom-0 rounded-full animate-magicParticleVariable z-10"
                    style={{
                      left: `calc(50% + ${randomX}px)`,
                      width: randomSize,
                      height: randomSize,
                      background: color,
                      filter: "blur(2px)",
                      animationDelay: `${randomDelay}s`,
                      animationDuration: `${randomDuration}s`,
                    }}
                  />
                );
              })}
            </div>

            {/* IMAGE */}
            <div className="relative w-full h-[60%] rounded-[30px] overflow-hidden z-10 shrink-0">
              <Image
                src={m.imageUrl}
                alt={m.title}
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            {/* INFO */}
            <div className="relative z-10 mt-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-center line-clamp-2 h-[48px] leading-snug">
                {m.title}
              </h3>

              <p className="text-white/60 text-sm mt-1 text-center">
                {m.category} • {m.duration} min
              </p>

              <div className="mt-auto pt-3">
                <button
                  onClick={() => router.push(`/meditations/${m._id}`)}
                  className="
                    w-full py-2
                    bg-white/20 backdrop-blur-xl
                    rounded-full border border-white/20
                    text-sm font-medium
                    hover:bg-white/30 hover:scale-[1.03]
                    transition-all
                  "
                >
                  Start
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
