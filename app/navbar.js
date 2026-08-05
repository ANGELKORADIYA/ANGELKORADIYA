"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { useTheme } from "./components/ThemeProvider";
import { Sun, Moon, ArrowDown, Home, Briefcase, GraduationCap, Mail, Terminal } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "#", icon: Home },
  { name: "Projects", href: "#projects", icon: Briefcase },
  { name: "Learning", href: "#learning", icon: GraduationCap },
  { name: "Contact", href: "#contact", icon: Mail },
  { name: "separator", type: "divider" },
  { name: "GitHub", href: "https://github.com/angelkoradiya", icon: FaGithub, external: true },
  { name: "LinkedIn", href: "https://linkedin.com/in/angel-koradiya", icon: FaLinkedin, external: true }
];

export default function Navbar() {
  const { theme, darkMode, toggleDarkMode } = useTheme();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("Home");
  const [resumeLink, setResumeLink] = useState(
    "https://drive.google.com/file/d/1Gf50InLEBiNJkIC--SGDJu1rFB0A-Vok/view?usp=sharing"
  );

  // Update active tab and URL hash on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'projects', 'learning', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for better detection

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            const tabName = section === 'hero' ? 'Home' : section.charAt(0).toUpperCase() + section.slice(1);
            setActiveTab(tabName);

            // Update URL hash only if it's different
            if (section !== 'hero' && window.location.hash !== `#${section}`) {
              window.history.replaceState(null, '', `#${section}`);
            } else if (section === 'hero' && window.location.hash !== '') {
              window.history.replaceState(null, '', window.location.pathname);
            }
            break;
          }
        }
      }

      // Check if we're at the very top
      if (scrollPosition < 100) {
        setActiveTab("Home");
        // Clear hash if we're at the top
        if (window.location.hash !== '') {
          window.history.replaceState(null, '', window.location.pathname);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch(resumeLink, { method: "HEAD", mode: "no-cors" }).catch(() => {
      setResumeLink("/Angel%20Koradiya%20Resume.pdf");
    });
  }, []);

  const handleNavLink = (href, e) => {
    e.preventDefault();
    if (href === "#") {
      // Scroll to top for home button
      window.history.replaceState(null, '', window.location.pathname);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveTab("Home");
    } else if (href.startsWith('#')) {
      const sectionId = href.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        window.history.replaceState(null, '', href);
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveTab(sectionId.charAt(0).toUpperCase() + sectionId.slice(1));
      }
    }
  };

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
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-400 to-indigo-500 blur-md rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
          </div>
          <span className="text-lg font-black tracking-tighter text-gray-900 dark:text-white hidden sm:inline group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-sky-500 group-hover:to-indigo-500 transition-all duration-300">
            Angel Koradiya
          </span>
        </Link>

        <nav className="flex items-center gap-1 md:gap-2">
          {navLinks.map((link) => {
            // Handle divider
            if (link.type === "divider") {
              return (
                <div
                  key="divider-contact-github"
                  className="w-[1px] h-6 bg-gray-200 dark:bg-white/10 mx-2 hidden sm:block"
                />
              );
            }

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
              <button
                key={link.name}
                onClick={(e) => handleNavLink(link.href, e)}
                aria-label={link.name}
                className="p-2.5 rounded-xl transition-all relative group/item"
              >
                {content}
              </button>
            );
          })}

          <div className="w-[1px] h-6 bg-gray-200 dark:bg-white/10 mx-2 hidden sm:block"></div>

          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
            aria-label="Toggle theme mode"
          >
            {theme === "hacker" ? (
              <Terminal size={20} className="text-emerald-400" />
            ) : darkMode ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
          </button>

          <a
            href={resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Resume"
            className="ml-2 hidden md:flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-950 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] border border-transparent hover:border-sky-500/50 hover:text-sky-300 dark:hover:text-sky-600"
          >
            CV <ArrowDown size={14} />
          </a>
        </nav>
      </div>
    </div>
  );
}
