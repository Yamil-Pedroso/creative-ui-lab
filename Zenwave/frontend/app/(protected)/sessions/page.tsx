/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useSession } from "@/hooks/useSession";
import { motion, AnimatePresence } from "framer-motion";
import { FiClock } from "react-icons/fi";

export default function SessionsPage() {
  const { sessions, loading, error, fetchSessions } = useSession();

  // Load sessions on mount
  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return (
    <div className="px-8 py-12">
      <h1 className="text-4xl font-bold mb-10">Your Meditation Timeline</h1>

      {/* Loading State */}
      {loading && (
        <div className="text-white/70 text-lg py-10 animate-pulse">
          Loading your sessions...
        </div>
      )}

      {/* Error State */}
      {error && <p className="text-red-400 text-center">{error}</p>}

      {/* Empty State */}
      {!loading && sessions.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-white/70 text-lg py-20"
        >
          You have no meditation sessions yet.
          <br />
          <span className="text-purple-400">
            Start a meditation to begin your journey.
          </span>
        </motion.div>
      )}

      {/* Timeline */}
      {!loading && sessions.length > 0 && (
        <div className="relative max-w-2xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-[3px] bg-gradient-to-b from-purple-500 to-blue-500 opacity-50"></div>

          <AnimatePresence>
            {sessions.map((session: any, index: number) => (
              <motion.div
                key={session._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { delay: index * 0.05 },
                }}
                exit={{ opacity: 0, x: -20 }}
                className="relative pl-16 pb-10"
              >
                {/* Node */}
                <div className="absolute left-4 top-2 w-5 h-5 rounded-full bg-purple-500 border-4 border-[#0d0d0d] shadow-lg"></div>

                {/* Content */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -3 }}
                  className="bg-white/5 p-5 rounded-xl border border-white/10 backdrop-blur-xl shadow-lg"
                >
                  <h2 className="text-xl font-bold mb-1">
                    {session.meditationId?.title ?? "Unknown Meditation"}
                  </h2>

                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <FiClock className="text-purple-300" />
                    <span>
                      {session.duration
                        ? `${Math.floor(session.duration)} sec`
                        : "Not finished yet"}
                    </span>
                  </div>

                  <p className="text-white/40 text-xs mt-2">
                    {new Date(session.startTime).toLocaleString()}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
