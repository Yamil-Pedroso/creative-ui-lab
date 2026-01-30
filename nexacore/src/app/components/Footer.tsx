"use client";

import { motion } from "framer-motion";
import { Facebook, Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0F] border-t border-white/10 pt-16 pb-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#11111A] to-[#0A0A0F]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">NexaCore</h3>
            <p className="text-gray-400 leading-relaxed">
              We help innovative companies build exceptional digital products,
              enhance brand presence, and scale through technology.
            </p>

            <div className="flex items-center gap-4 mt-6">
              {[
                { icon: <Github className="w-5 h-5" />, link: "#" },
                { icon: <Linkedin className="w-5 h-5" />, link: "#" },
                { icon: <Twitter className="w-5 h-5" />, link: "#" },
                { icon: <Facebook className="w-5 h-5" />, link: "#" },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.link}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition"
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-white transition cursor-pointer">
                Web Development
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Brand Strategy
              </li>
              <li className="hover:text-white transition cursor-pointer">
                AI Automation
              </li>
              <li className="hover:text-white transition cursor-pointer">
                UX/UI Design
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Consulting
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-white transition cursor-pointer">
                About Us
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Careers
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Case Studies
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Blog
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Press
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-gray-400">
              <li>Email: hello@nexacore.agency</li>
              <li>Phone: +41 (555) 123 4567</li>
              <li>Zürich, Switzerland</li>
            </ul>

            <div className="mt-5 w-full h-24 rounded-xl bg-linear-to-r from-purple-600/20 to-blue-600/20 blur-lg opacity-60" />
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} NexaCore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
