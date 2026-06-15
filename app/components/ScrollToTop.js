"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, x: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.5, x: -20 }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-50 p-4 rounded-2xl bg-white/70 dark:bg-black/10 backdrop-blur-md saturate-[180%] border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:bg-gray-50 dark:hover:bg-white/10 transition-all group overflow-hidden"
          aria-label="Scroll to top"
        >
          {/* Light-catcher border effect */}
          <div className="absolute inset-0 border border-transparent bg-gradient-to-br from-white/30 dark:from-white/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" style={{ maskImage: 'linear-gradient(white, white) content-box, linear-gradient(white, white)', maskComposite: 'exclude' }}></div>
          
          <ArrowUp size={24} className="text-sky-600 dark:text-sky-400 transition-transform group-hover:-translate-y-1" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
