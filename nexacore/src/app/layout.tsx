"use client";

import { useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ScrollUpArrow from "@/app/components/common/ScrollUpArrow";
import Lenis from "@studio-freight/lenis";
import "./globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const onScroll = () => {
      document.dispatchEvent(new Event("scroll"));
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      lenis.destroy();
    };
  }, []);

  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-white">
        <Navbar />

        <main className="pt-16">{children}</main>

        <Footer />
        <ScrollUpArrow />
      </body>
    </html>
  );
}
