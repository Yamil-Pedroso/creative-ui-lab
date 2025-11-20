"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollUpArrow() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {show && (
        <button
          onClick={scrollToTop}
          className="
            fixed right-6 bottom-6
            p-3 rounded-full
            bg-black text-white
            shadow-lg
            hover:bg-gray-900
            transition-all
            duration-300
            animate-fade-in
            cursor-pointer
          "
        >
          <ChevronUp size={22} />
        </button>
      )}
    </>
  );
}
