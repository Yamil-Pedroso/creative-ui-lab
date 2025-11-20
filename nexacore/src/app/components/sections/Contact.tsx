"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <section className="relative w-full py-24 bg-[#0A0A0F] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#11111a] to-[#0A0A0F] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let’s Build Something Great
          </h2>
          <p className="text-gray-400 text-lg">
            Ready to start a new project or improve your digital experience?
            Tell us what you need. We usually respond within **24 hours**.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <div>
              <h3 className="text-2xl text-white font-semibold mb-4">
                Contact Information
              </h3>
              <p className="text-gray-400">
                You can reach out through the form or directly via our details
                below.
              </p>
            </div>

            <div className="flex items-center gap-4 text-gray-300">
              <Mail className="w-6 h-6 text-blue-500" />
              <span>hello@nexacore.agency</span>
            </div>

            <div className="flex items-center gap-4 text-gray-300">
              <Phone className="w-6 h-6 text-blue-500" />
              <span>+41 (555) 123 4567</span>
            </div>

            <div className="flex items-center gap-4 text-gray-300">
              <MapPin className="w-6 h-6 text-blue-500" />
              <span>Zürich, Switzerland</span>
            </div>

            {/* Decorative gradient */}
            <div className="w-full h-40 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl blur-xl opacity-60" />
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#11111a]/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-xl space-y-6"
          >
            {/* Name */}
            <div>
              <label className="text-gray-300 text-sm mb-1 block">Name</label>
              <input
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                type="text"
                placeholder="Your name"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-300 text-sm mb-1 block">Email</label>
              <input
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                type="email"
                placeholder="your@email.com"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-gray-300 text-sm mb-1 block">
                Message
              </label>
              <textarea
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Tell us about your project..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:opacity-90 transition"
            >
              Send Message
              <Send className="w-5 h-5" />
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
