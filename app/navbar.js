"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { useTheme } from "./components/ThemeProvider";
import { Sun, Moon, ArrowDown, Home, Briefcase, GraduationCap, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "/#", icon: Home },
  { name: "Projects", href: "/#projects", icon: Briefcase },
  { name: "Learning", href: "/#learning", icon: GraduationCap },
  { name: "Contact", href: "/#contact", icon: Mail },
  { name: "GitHub", href: "https://github.com/angelkoradiya", icon: FaGithub, external: true },
  { name: "LinkedIn", href: "https://linkedin.com/in/angel-koradiya", icon: FaLinkedin, external: true }
];

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("Home");
  const [resumeLink, setResumeLink] = useState(
    "https://drive.google.com/file/d/1SjiYlVIaREhCBMUSFq8GwAq5Prh6k43R/view?usp=sharing"
  );

  useEffect(() => {
    fetch(resumeLink, { method: "HEAD", mode: "no-cors" }).catch(() => {
      setResumeLink("/Angel%20Koradiya%20Resume.pdf");
    });
  }, []);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl h-16 bg-white/70 dark:bg-white/5 backdrop-blur-[20px] saturate-[180%] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl flex items-center px-6 transition-all duration-300 overflow-hidden">
      {/* Light-catcher border effect */}
      <div className="absolute inset-0 border border-transparent bg-gradient-to-br from-white/20 dark:from-white/10 to-transparent pointer-events-none opacity-50" style={{ maskImage: 'linear-gradient(white, white) content-box, linear-gradient(white, white)', maskComposite: 'exclude' }}></div>

      <div className="flex justify-between items-center w-full relative z-10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Image
              src="/logo.png"
              alt="Angel Koradiya logo"
              width={32}
              height={32}
              className="rounded-full object-cover border border-gray-200 dark:border-white/20 transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-sky-500/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <span className="text-lg font-black tracking-tighter text-gray-900 dark:text-white hidden sm:inline group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
            Angel Koradiya
          </span>
        </Link>

        <nav className="flex items-center gap-1 md:gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isInternal = !link.external;
            const isActive = activeTab === link.name;
            
            const content = (
              <div className={`p-2.5 rounded-xl transition-all relative group/item ${
                isActive ? "bg-sky-50 dark:bg-white/10 text-sky-600 dark:text-sky-400" : "text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
              }`}>
                <Icon size={20} strokeWidth={2.5} />
                {/* Tooltip */}
                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-3 px-2 py-1 bg-white dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded text-[10px] font-black uppercase tracking-widest text-gray-700 dark:text-white opacity-0 group-hover/item:opacity-100 transition-opacity pointer-events-none">
                  {link.name}
                </span>
              </div>
            );

            return link.external ? (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
              >
                {content}
              </a>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                aria-label={link.name}
                onClick={() => setActiveTab(link.name)}
              >
                {content}
              </Link>
            );
          })}

          <div className="w-[1px] h-6 bg-gray-200 dark:bg-white/10 mx-2 hidden sm:block"></div>

          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <a
            href={resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Resume"
            className="ml-2 hidden md:flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-950 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-sky-600 dark:hover:bg-sky-400 transition-colors shadow-lg"
          >
            CV <ArrowDown size={14} />
          </a>
        </nav>
      </div>
    </div>
  );
}
