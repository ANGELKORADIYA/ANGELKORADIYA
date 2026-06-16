"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ProjectsBento from "./components/ProjectsBento";
import LearningTree from "./components/LearningTree";
import InsightShell from "./components/InsightShell";
import ScrollToTop from "./components/ScrollToTop";
import { useRef } from "react";

const SectionWrapper = ({ id, children }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 50, rotateX: 10 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="min-h-screen py-24 relative perspective-[1000px]"
  >
    {children}
  </motion.section>
);

export default function Home() {
  const terminalRef = useRef(null);

  // Handle smooth scrolling to sections
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Prevent default behavior to avoid hash stacking
      window.history.replaceState(null, '', `#${sectionId}`);
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-[#020204] text-gray-900 dark:text-white min-h-screen selection:bg-sky-500/30 overflow-hidden transition-colors duration-300">
      <ScrollToTop />
      <div className="flex flex-col lg:flex-row relative">
        {/* Left Side: Browser Content */}
        <main className="flex-1 lg:mr-[35%] min-h-screen">
          <SectionWrapper id="hero">
            <div className="max-w-5xl mx-auto px-6 lg:px-12 xl:px-20 h-full flex flex-col justify-center min-h-[calc(100vh-12rem)]">
              <section className="text-left animate-fade-in-down mt-12 md:mt-24">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-gradient-to-tr from-sky-400 to-indigo-600 rounded-full blur-2xl opacity-10 dark:opacity-20 animate-pulse"></div>
                  <h1 className="relative text-6xl md:text-8xl font-black tracking-tighter text-gray-900 dark:text-white mb-4 leading-[1.1]">
                    Hello, <br />I&apos;m <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600 dark:from-sky-400 dark:to-indigo-400">Angel Koradiya</span>
                  </h1>
                </div>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
                  Computer Engineering graduate & Software Engineer at <span className="font-semibold text-sky-600 dark:text-sky-400">Silvertouch Technology</span>. 
                  Crafting elegant solutions with code.
                </p>
                <div className="mt-10 flex flex-wrap justify-start gap-4">
                  <button
                    onClick={() => scrollToSection('projects')}
                    className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-950 rounded-full font-bold transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] border border-transparent hover:border-sky-500/50 hover:text-sky-300 dark:hover:text-sky-600"
                  >
                    View Projects
                  </button>
                  <button
                    onClick={() => scrollToSection('learning')}
                    className="px-8 py-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-full font-bold transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-sm hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:border-sky-500/50 dark:hover:border-sky-400/50 hover:text-sky-600 dark:hover:text-sky-300"
                  >
                    Learning Journey
                  </button>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="px-8 py-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-full font-bold transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-sm hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:border-sky-500/50 dark:hover:border-sky-400/50 hover:text-sky-600 dark:hover:text-sky-300"
                  >
                    Get in Touch
                  </button>
                </div>
              </section>
            </div>
          </SectionWrapper>

          <SectionWrapper id="projects">
            <div className="px-6 md:px-12 py-12">
              <h2 className="text-5xl font-extrabold mb-16 tracking-wide uppercase text-gray-900 dark:text-white">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600 dark:from-sky-400 dark:to-indigo-400">
                      {'{'}Projects{'}'}
                    </span>
                  </h2>
              <ProjectsBento onSelect={(p) => terminalRef.current?.execute(`inspect --project ${p.id}`, { type: 'project', ...p })} />
            </div>
          </SectionWrapper>

          <SectionWrapper id="learning">
            <div className="px-6 md:px-12 py-12">
              <h2 className="text-5xl font-extrabold mb-16 tracking-wide uppercase text-gray-900 dark:text-white">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600 dark:from-sky-400 dark:to-indigo-400">
                      {'{'}Learning{'}'}
                    </span>
                  </h2>
              <LearningTree onSelect={(s) => terminalRef.current?.execute(`inspect --skill ${s.id}`, { type: 'skill', ...s })} />
            </div>
          </SectionWrapper>
          
          <SectionWrapper id="contact">
            <div className="px-6 md:px-12 py-12">
              <h2 className="text-5xl font-extrabold mb-16 tracking-wide uppercase text-gray-900 dark:text-white">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600 dark:from-sky-400 dark:to-indigo-400">
                      {'{'}About & Contact{'}'}
                    </span>
                  </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Academics - Main Wide Card */}
                <div className="md:col-span-8 p-8 rounded-[2rem] border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-[20px] saturate-[180%] hover:bg-white/80 dark:hover:bg-white/10 hover:border-sky-500/30 transition-all duration-500 relative group overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 dark:bg-sky-500/10 rounded-full blur-[80px] -z-10 group-hover:bg-sky-500/10 dark:group-hover:bg-sky-500/20 transition-colors duration-700"></div>
                  
                  <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center gap-3 tracking-wide uppercase">
                    <span className="w-10 h-10 bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 rounded-xl flex items-center justify-center text-lg border border-sky-200 dark:border-sky-500/30">🎓</span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600 dark:from-sky-400 dark:to-indigo-400">
                      {'{'}Academics & Experience{'}'}
                    </span>
                  </h2>

                  <div className="space-y-8 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-gray-200 dark:before:bg-white/10">
                    {[
                      { id: "swe", year: "2025-Present", title: "Software Engineer", place: "Silvertouch Technology", detail: "6 months internship + Full-time Position" },
                      { id: "btech", year: "2021-2025", title: "B.Tech in Computer Engineering", place: "VGEC, Ahmedabad", detail: "CPI: 8 | GATE Qualified (First Attempt)" },
                      { id: "12th", year: "2020-2021", title: "12th Grade", place: "Dream International School", detail: "89% | JEE: 93 Percentile" },
                    ].map((edu, i) => (
                      <div 
                        key={i} 
                        onClick={() => terminalRef.current?.execute(`inspect --academic ${edu.id}`, { type: 'academic', ...edu })}
                        className="relative pl-12 group/item cursor-pointer"
                        role="button"
                        tabIndex={0}
                      >
                        <div className="absolute left-[1.1rem] top-1.5 w-3 h-3 bg-white dark:bg-[#020204] border-2 border-sky-500 rounded-full z-10 group-hover/item:scale-150 group-hover/item:bg-sky-500 transition-all shadow-[0_0_15px_rgba(56,189,248,0)] group-hover/item:shadow-[0_0_15px_rgba(56,189,248,0.8)]"></div>
                        <span className="text-[10px] font-black text-sky-600 dark:text-sky-400 uppercase tracking-widest group-hover/item:text-sky-500 dark:group-hover/item:text-sky-300 transition-colors">{edu.year}</span>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1 group-hover/item:text-sky-600 dark:group-hover/item:text-sky-300 transition-colors">{edu.title}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm group-hover/item:text-gray-600 dark:group-hover/item:text-gray-300 transition-colors mb-2">{edu.place}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300 font-medium bg-gray-100 dark:bg-white/10 inline-block px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 group-hover/item:border-sky-500/30 group-hover/item:bg-sky-500/5 dark:group-hover/item:bg-sky-500/10 transition-colors">{edu.detail}</p>
                        <div className="mt-3 text-[8px] font-black text-gray-300 dark:text-white/20 uppercase tracking-[0.2em] group-hover/item:text-sky-500 dark:group-hover/item:text-sky-400 transition-colors opacity-0 group-hover/item:opacity-100">
                          Click to inspect_
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side Column */}
                <div className="md:col-span-4 flex flex-col gap-6">
                  
                  {/* Achievements */}
                  <div className="flex-1 p-6 rounded-[2rem] border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-[20px] saturate-[180%] hover:bg-white/80 dark:hover:bg-white/10 hover:border-amber-500/30 transition-all duration-500 group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-[40px] -z-10 group-hover:bg-amber-500/10 dark:group-hover:bg-amber-500/20 transition-colors"></div>
                    <h2 className="text-lg font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-3 tracking-wide uppercase">
                      <span className="w-8 h-8 bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-lg flex items-center justify-center text-base border border-amber-200 dark:border-amber-500/30">🏆</span>
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400">
                        {'{'}Achievements{'}'}
                      </span>
                    </h2>
                    <div className="space-y-3">
                      <div className="p-4 bg-gray-50/50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 group-hover:border-amber-500/20 transition-colors">
                        <p className="font-bold text-gray-900 dark:text-white text-sm">GATE 2025 Qualified</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Qualified in the first attempt.</p>
                      </div>
                      <div className="p-4 bg-gray-50/50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 group-hover:border-sky-500/20 transition-colors">
                        <p className="font-bold text-gray-900 dark:text-white text-sm mb-1">Striver&apos;s SDE Sheet</p>
                        <a href="https://takeuforward.org/profile/angelkoradiya" target="_blank" rel="noopener noreferrer" className="text-[10px] font-black text-sky-600 dark:text-sky-400 uppercase tracking-widest hover:text-sky-700 dark:hover:text-sky-300">View Profile →</a>
                      </div>
                    </div>
                  </div>

                  {/* Hobbies */}
                  <div className="p-6 rounded-[2rem] border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-[20px] saturate-[180%] hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-500">
                    <h2 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wide mb-4 text-center">{'{'}Interests{'}'}</h2>
                    <div className="flex justify-center gap-6">
                      {["🎮", "✈️", "💻"].map((emoji, i) => (
                        <div key={i} className="text-3xl hover:scale-125 hover:-translate-y-2 transition-transform cursor-none" style={{ transitionDelay: `${i * 50}ms` }}>{emoji}</div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Competitive Programming */}
                <div className="md:col-span-6 p-8 rounded-[2rem] border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-[20px] saturate-[180%] hover:bg-white/80 dark:hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-500 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[60px] -z-10 group-hover:bg-emerald-500/10 dark:group-hover:bg-emerald-500/20 transition-colors"></div>
                  <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-wide uppercase">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400">
                      {'{'}Competitive Stats{'}'}
                    </span>
                  </h2>
                  <div className="space-y-3">
                    {[
                      { name: "LeetCode", link: "https://leetcode.com/u/Angel_Koradiya/", logo: "https://cdn-icons-png.flaticon.com/512/3296/3296814.png" },
                      { name: "Coding Ninja", link: "https://www.naukri.com/code360/profile/angelkoradiya", logo: "https://cdn-icons-png.flaticon.com/512/6058/6058350.png" },
                      { name: "HackerRank", link: "https://www.hackerrank.com/profile/koradiyaangel11", logo: "https://cdn-icons-png.flaticon.com/512/2202/2202112.png" },
                    ].map((resource, index) => (
                      <a key={index} href={resource.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 rounded-2xl bg-gray-50/50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:bg-gray-100/80 dark:hover:bg-white/10 hover:border-emerald-500/30 transition-all group/link">
                        <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center p-2 group-hover/link:scale-110 transition-transform shadow-lg border border-gray-100 dark:border-gray-700">
                          <Image src={resource.logo} alt={resource.name} width={24} height={24} className="object-contain" unoptimized />
                        </div>
                        <span className="font-bold text-gray-700 dark:text-gray-300 group-hover/link:text-emerald-600 dark:group-hover/link:text-emerald-400 transition-colors">{resource.name}</span>
                        <span className="ml-auto text-emerald-600 dark:text-emerald-400 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all">→</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Contact CTA */}
                <div className="md:col-span-6 p-8 rounded-[2rem] border border-sky-200 dark:border-sky-500/30 bg-sky-50 dark:bg-sky-500/10 backdrop-blur-[20px] saturate-[180%] flex flex-col items-center justify-center text-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 to-indigo-600/10 dark:from-sky-400/20 dark:to-indigo-600/20 -z-10 group-hover:opacity-75 transition-opacity"></div>
                  <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-wide uppercase">{'{'}Start a Project{'}'}</h2>
                  <p className="text-sky-700 dark:text-sky-200 mb-8 max-w-sm">My inbox is always open. Let&apos;s build something amazing together.</p>
                  <button 
                    onClick={() => terminalRef.current?.execute('contact')}
                    className="px-10 py-4 bg-gray-900 dark:bg-white text-white dark:text-sky-950 rounded-full font-black text-sm uppercase tracking-widest transition-all duration-300 hover:scale-105 shadow-[0_0_40px_-10px_rgba(56,189,248,0.5)] hover:shadow-[0_0_50px_-5px_rgba(56,189,248,0.8)] border border-transparent hover:border-sky-500/50 hover:text-sky-300 dark:hover:text-sky-600"
                  >
                    Initiate Contact_
                  </button>
                </div>

              </div>
            </div>
          </SectionWrapper>
        </main>

        {/* Right Side: Fixed Insight Shell */}
        <aside className="hidden lg:block w-[35%] h-screen fixed top-0 right-0 z-40 p-6 pt-32 pointer-events-none">
           <div className="w-full h-full pointer-events-auto">
              <InsightShell ref={terminalRef} />
           </div>
        </aside>
      </div>
    </div>
  );
}
