"use client";
import { useState, useEffect, useRef, forwardRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X } from "lucide-react";
import InsightShell from "./InsightShell";

const TerminalFAB = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);
  const fabRef = useRef(null);
  const insightRef = useRef(null);

  // Always forward execute to InsightShell — same as original sidebar behavior.
  // Clicking a project/skill always updates the terminal data regardless of open/closed state.
  useEffect(() => {
    if (ref) {
      const handler = {
        execute: (command, data) => {
          insightRef.current?.execute(command, data);
        },
      };

      if (typeof ref === "function") {
        ref(handler);
      } else {
        ref.current = handler;
      }
    }
  }, [ref]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      {/* FAB Button */}
      <button
        ref={fabRef}
        onClick={toggle}
        className={`
          fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full
          flex items-center justify-center
          bg-white/70 dark:bg-white/5 backdrop-blur-[20px] saturate-[180%]
          border border-gray-200 dark:border-white/10
          shadow-2xl
          transition-all duration-300
          hover:scale-110 hover:shadow-[0_0_30px_rgba(56,189,248,0.5)]
          hover:border-sky-500/50
          active:scale-95
          group
        `}
        aria-label={isOpen ? "Close terminal" : "Open terminal"}
      >
        {isOpen ? (
          <X
            size={22}
            className="text-gray-600 dark:text-white/60 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors relative z-10"
          />
        ) : (
          <Terminal
            size={22}
            className="text-gray-600 dark:text-white/60 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors relative z-10"
          />
        )}
      </button>

      {/* Slide-up Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-50"
            style={{
              width: "min(400px, calc(100vw - 3rem))",
              height: "min(520px, calc(100vh - 8rem))",
            }}
          >
            <InsightShell ref={insightRef} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

TerminalFAB.displayName = "TerminalFAB";
export default TerminalFAB;
