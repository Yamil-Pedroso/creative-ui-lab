"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Logo from "../ui/Logo";
import { useAuthStore } from "@/store/useAuthStore";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const protectedLinks = [
    { href: "/meditations", label: "Meditations" },
    { href: "/favorites", label: "Favorites" },
    { href: "/sessions", label: "Sessions" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <nav className="w-full h-20 flex items-center justify-between px-8 bg-black/40 backdrop-blur-xl border-b border-white/10">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8 items-center">
          {/* Protected menu items */}
          {user &&
            protectedLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-white/80 hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}

          {/* Auth Buttons */}
          {!user ? (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="px-4 py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="px-4 py-2 border border-white/20 rounded-lg font-semibold text-white hover:bg-white/10 transition"
              >
                Register
              </Link>
            </div>
          ) : (
            <button
              onClick={() => {
                logout();
                localStorage.removeItem("token");
              }}
              className="px-4 py-2 rounded-lg font-semibold transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="text-white text-3xl md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-black/70 backdrop-blur-xl flex flex-col gap-6 px-8 py-6 border-b border-white/10"
          >
            {/* Protected Links in mobile */}
            {user &&
              protectedLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="text-white/90 text-lg"
                >
                  {label}
                </Link>
              ))}

            {/* Auth buttons */}
            {!user ? (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-white text-black rounded-lg font-semibold w-fit"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 border border-white/20 rounded-lg font-semibold text-white w-fit"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  logout();
                  localStorage.removeItem("token");
                  setOpen(false);
                }}
                className="px-4 py-2 rounded-lg font-semibold w-fit"
              >
                Logout
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
