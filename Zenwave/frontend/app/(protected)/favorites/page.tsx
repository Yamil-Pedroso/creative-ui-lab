"use client";

import { useFavorite } from "@/hooks/useFavorite";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2 } from "react-icons/fi";

export default function FavoritesPage() {
  const { favorites, loading, toggleFavorite } = useFavorite();

  console.log("FAVORITES ARRIVE AS:", favorites);

  return (
    <div className="px-8 py-16 min-h-screen text-white">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-12"
      >
        <h1 className="text-4xl font-bold tracking-tight">Your Favorites</h1>

        {favorites.length > 0 && (
          <span className="text-purple-300 text-lg bg-white/10 px-4 py-1 rounded-full border border-white/20 backdrop-blur">
            {favorites.length} saved
          </span>
        )}
      </motion.div>

      {/* LOADING */}
      {loading && (
        <div className="text-white/70 text-lg py-20 text-center">
          Loading your meditation list...
        </div>
      )}

      {/* EMPTY */}
      {!loading && favorites.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-28"
        >
          <p className="text-white/70 text-lg mb-2">
            You haven’t saved any meditations yet.
          </p>
          <p className="text-purple-300">Discover one and press “favorite”.</p>
        </motion.div>
      )}

      {/* LIST */}
      <AnimatePresence mode="wait">
        <div className="space-y-6">
          {favorites.map((m, index) => (
            <motion.div
              key={m._id}
              initial={{ opacity: 0, x: -30 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { delay: index * 0.06, duration: 0.5 },
              }}
              exit={{
                opacity: 0,
                x: -20,
                transition: { duration: 0.2 },
              }}
              whileHover={{
                scale: 1.01,
                backgroundColor: "rgba(255,255,255,0.04)",
                transition: { duration: 0.3 },
              }}
              className="
                flex items-center gap-5 p-4 rounded-2xl
                border border-white/5 backdrop-blur-xl
                hover:border-purple-400/20
                transition-all group
              "
            >
              {/* IMAGE */}
              <div className="relative h-20 w-20 rounded-xl overflow-hidden shrink-0">
                <Image
                  src={m.imageUrl}
                  alt={m.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-all duration-700"
                  unoptimized
                />
              </div>

              {/* TEXT */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{m.title}</h3>

                <div className="flex items-center gap-3 mt-1">
                  <span className="px-3 py-0.5 text-sm bg-purple-500/10 border border-purple-300/20 rounded-full text-purple-300">
                    {m.category}
                  </span>

                  <span className="text-white/50 text-sm">
                    {m.duration} min
                  </span>
                </div>
              </div>

              {/* REMOVE BUTTON */}
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => toggleFavorite(m._id)}
                className="
                  p-2 rounded-full
                  bg-white/10 hover:bg-white/20
                  border border-white/20
                  backdrop-blur-xl
                  transition
                  text-white
                "
              >
                <FiTrash2 size={18} />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}
