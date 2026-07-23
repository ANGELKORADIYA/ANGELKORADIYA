"use client";
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { Terminal, ExternalLink } from "lucide-react";
import { useHackerHud } from "./HackerHudContext";

export const projects = [
  {
    id: 1001,
    title: 'Aerobatch',
    description: 'On-Premises Intelligent Document Processing & Field Extraction platform. Built for high-concurrency extraction of structured data from complex documents using OpenCV, PaddleOCR, and Air-Gapped vLLM.',
    link: '',
    link2: '',
    category: 'AI & ML',
    tech: 'Python, OCR, vLLM, FastAPI, React',
    tags: ['Python', 'OCR', 'vLLM', 'FastAPI', 'React'],
    status: 'Completed',
    priority: 10,
    goal: 'High-concurrency extraction of structured data, table metrics, and form fields from complex industrial, pharmaceutical, and manufacturing documents.',
    built: 'A live page-by-page incremental streaming pipeline, a bidirectional canvas hit-testing viewer, and a defensive Confidence Fusion Service for hallucination zeroing.',
    marketContext: 'Zero dependency on third-party cloud API keys, absolute data sovereignty.',
    future: 'Scalable multi-node worker pools for even higher throughput.'
  },
  {
    id: 1002,
    title: 'IndexForge',
    description: 'Local-first semantic search engine — search anything like Google with exact keyword match, fuzzy tolerance, and semantic intent understanding — entirely offline and built in Rust.',
    link: 'https://github.com/ANGELKORADIYA/IndexForge',
    link2: 'https://github.com/ANGELKORADIYA/IndexForge',
    category: 'Systems & Tools',
    tech: 'Rust, PostgreSQL, pgvector, React, Axum',
    tags: ['Rust', 'PostgreSQL', 'pgvector', 'React', 'Axum'],
    status: 'Production-Ready',
    priority: 10,
    goal: 'A robust, local-first search engine that combines BM25 keyword matching, fuzzy tolerance, and semantic vector search in a parallel execution model.',
    built: 'A complete pipeline including ingestion chunking, 3-arm query routing, RRF merging, cross-encoder re-ranking, and RAG integration with multi-modal support.',
    marketContext: '100% offline and secure semantic search without cloud dependencies.',
    future: 'Kubernetes operator, distributed indexing, and multi-language support.'
  },
  {
    id: 1003,
    title: 'Reel Mind',
    description: 'Instagram AutoComment & Reel Catcher. A full-stack automation bridge that monitors Instagram DMs to trigger automated reel capture, AI categorization, and live dashboard tracking.',
    link: 'https://reel-mind.angelkoradiya.in/',
    link2: '',
    category: 'Web Apps',
    tech: 'Python, FastAPI, SQLite, React, Vite',
    tags: ['Python', 'FastAPI', 'SQLite', 'React', 'Vite'],
    status: 'Completed',
    priority: 10,
    goal: 'Solve the problem of losing track of saved Instagram Reels by creating an organized, searchable library categorized by AI.',
    built: 'A robust backend Python FastAPI bridge for Meta webhooks and AI analysis, completely decoupled from a premium real-time React dashboard with DM-based signups.',
    marketContext: 'Personal media organization and content creator tools.',
    future: 'Auto-comment loops and keyword scanning logic.'
  },
  {
    id: 1,
    title: 'OmniQuery',
    description: 'An advanced Talk2DB platform that converts Natural Language to SQL using a RAG (Retrieval-Augmented Generation) architecture. It features strict RBAC, modular provider interfaces, and dynamic workflow execution for seamless database interaction.',
    link: 'https://github.com/ANGELKORADIYA/OMNIQUERY', // No demo link provided in the other file, but keeping GitHub as link
    link2: 'https://github.com/ANGELKORADIYA/OMNIQUERY',
    category: 'RAG',
    tech: 'TypeScript, RAG, SQL, GenAI',
    tags: ['TypeScript', 'RAG', 'SQL', 'GenAI'],
    status: 'Completed',
    priority: 10,
    goal: 'RBAC on column level to democratize database access by allowing non-technical users to query data using natural language.',
    built: 'A sophisticated RAG (Retrieval-Augmented Generation) pipeline that maps natural language to precise SQL schemas with strict RBAC.',
    marketContext: 'RLS suppport',
    future: 'Expansion to support multi-modal data sources and autonomous data cleaning agents.'
  },
  {
    id: 2,
    title: 'ForgeOAgent',
    description: "An advanced generative AI platform for creating and managing intelligent agents. Includes a sophisticated prompt processor that enables agents to handle real-world tasks. It's like having AI on your computer, basically executing Python code autonomously.",
    link: 'https://forgeoagent.vercel.app/',
    link2: 'https://github.com/ANGELKORADIYA/ForgeOAgent',
    logo: '/forgeoagent_logo.png',
    category: 'Gen AI',
    tech: 'GenAI, Python, LLM, MCP',
    tags: ['GenAI', 'Python', 'LLM'],
    status: 'Active',
    priority: 9,
    goal: 'Self Spawn Agents with unlimited API call capabilities with multiple api key.',
    built: 'A custom prompt processor that enables agents to execute Python code and interact with system tools via MCP tools and previously spawned agents to get similar task done with context.',
    marketContext: 'Addresses the need for reliable agent orchestration in developer local environments.',
    future: 'Integration with more model providers and tools to improve agent performance .'
  },
  {
    id: 3,
    title: 'Zen Light',
    description: 'ZenLight is a browser extension that brings AI to your fingertips — select any text on any webpage to instantly get explanations, translations, and visual context without leaving the page. Highlight a question and ZenLight automatically finds and marks the answer on the page.',
    link: 'https://addons.mozilla.org/en-US/firefox/addon/zenlight-office-tools/',
    link2: 'https://github.com/ANGELKORADIYA/ZenLight',
    logo: '/zenlight_logo.png',
    category: 'Gen AI',
    tech: 'JS, Extension, AI, Firefox API',
    tags: ['Extension', 'AI', 'Productivity'],
    status: 'Completed',
    priority: 8,
    goal: 'Explain any thing selected string with AI.',
    built: 'Firefox extension using localized AI processing to provide contextual explanations and some more features.',
    marketContext: 'A more developer-focused alternative to generic reading mode extensions.',
    future: 'Support for Chrome and Safari with cloud-synced highlighting.'
  },
  {
    id: 4,
    title: 'Black Water',
    description: 'Inspired by the 1930 helpline project, I developed an automated stock analysis and prediction model and paper trading platform. Uses historical data to provide insights and forecast market trends, helping to automate investment decisions.',
    link: 'https://black-waters.vercel.app/',
    link2: 'https://github.com/ANGELKORADIYA/black-water',
    logo: 'https://black-waters.vercel.app/assets/logo-Cc8KG4OS.png',
    category: 'Finance',
    tech: 'Python, ML, Finance',
    tags: ['Python', 'Stock Prediction', 'Data Analysis'],
    status: 'Completed',
    priority: 5,
    goal: 'Automate technical analysis and test trading strategies without financial risk.',
    built: 'An ML-driven forecasting engine paired with a real-time paper trading dashboard.',
    marketContext: 'Personal finance tool built to understand time-series market data patterns.',
    future: 'Transitioning to a decentralized data source and adding options trading support.'
  },
  {
    id: 5,
    title: 'Wanderlogue',
    description: 'A full-stack travel logging application built with the MERN stack. Features include infinite scrolling, and a seamless user experience for documenting and sharing travel adventures.',
    link: 'https://wanderlogues.vercel.app/',
    link2: 'https://github.com/ANGELKORADIYA/Wanderlogue',
    logo: 'https://wanderlogues.vercel.app/assets/favicon-CIIPRWpr.ico',
    category: 'Web Apps',
    tech: 'MERN, Full Stack, Cloudinary',
    tags: ['MERN', 'Full Stack', 'Cloudinary'],
    status: 'Completed',
    priority: 7,
    goal: 'Create a seamless travel logging experience for the hackathon.',
    built: 'Full stack MERN application with image upload capabilities.',
    marketContext: 'Travel documentation platform.',
    future: 'Social features and map integration.'
  },
  {
    id: 6,
    title: 'QuizMaster',
    description: 'My first web project where I learned Express.js, Node.js, and MongoDB. A simple yet functional quiz application. Basically faculty student quiz app.',
    link: 'https://quiz-minimal.vercel.app/',
    link2: 'https://github.com/AngelKoradiya/Quiz',
    logo: 'https://quiz-minimal.vercel.app/favicon.ico',
    category: 'Web Apps',
    tech: 'Node.js, Express, MongoDB',
    tags: ['Node.js', 'Express', 'MongoDB'],
    status: 'Completed',
    priority: 3,
    goal: 'Learn backend fundamentals from hackathon.',
    built: 'Basic REST API and database integration.',
    marketContext: 'Educational tool.',
    future: null
  },
  {
    id: 7,
    title: 'Bit Stash',
    description: 'Bit Stash is a Spring Boot application for uploading and sharing code snippets, backed by PostgreSQL. Runs on single Docker Compose command and deploys effortlessly to the cloud via Render.',
    link: 'https://bit-stash.vercel.app/',
    link2: 'https://github.com/ANGELKORADIYA/bit-stash',
    logo: 'https://bit-stash.vercel.app/logo.svg',
    category: 'Web Apps',
    tech: 'Spring Boot, PostgreSQL, Docker',
    tags: ['Spring Boot', 'PostgreSQL', 'Docker'],
    status: 'Completed',
    priority: 6,
    goal: 'Build a scalable snippet sharing service for the college assignment for learning java.',
    built: 'Spring Boot REST API with Docker containerization.',
    marketContext: 'Developer utility.',
    future: 'Syntax highlighting and user accounts.'
  },
  {
    id: 8,
    title: 'Astroid Game',
    description: 'A browser-based Asteroids-inspired arcade shooter built with JavaScript and HTML5 Only. Features ship physics, power-ups, UFO enemies, combo scoring, procedural music, and particle effects.',
    link: 'https://angelkoradiya.github.io/astroid-game/',
    link2: 'https://github.com/ANGELKORADIYA/astroid-game',
    category: 'Games',
    tech: 'JavaScript, HTML5 Canvas',
    tags: ['JavaScript', 'HTML5 Canvas', 'Game Dev'],
    status: 'Completed',
    priority: 4,
    goal: 'Learn game loop and rendering mechanics.',
    built: 'Custom 2D physics and rendering engine in vanilla JS.',
    marketContext: 'Web game.',
    future: 'Mobile touch controls.'
  },
  {
    id: 9,
    title: 'Polylex',
    description: 'A dynamic database application with advanced search capabilities and real-time definitions. Currently under development with enhanced linguistic features planned.',
    link: 'https://polylex.vercel.app/',
    link2: 'https://github.com/ANGELKORADIYA/Polylex',
    logo: 'https://polylex.vercel.app/favicon.ico',
    category: 'Web Apps',
    tech: 'Database, Linguistics, React',
    tags: ['Database', 'Linguistics', 'React'],
    status: 'Active',
    priority: 6,
    goal: 'Create an interactive linguistic database. multi level data structure storage.',
    built: 'React frontend with real-time search capabilities.',
    marketContext: 'Now i think it is just other mongodb like thing.',
    future: 'Complex JSON data structure support and AI-assisted search.'
  },
  {
    id: 10,
    title: 'Regex Studio',
    description: 'An interactive tool for testing and generating regular expressions with real-time examples and pattern matching. Currently under development.',
    link: 'https://regex-studio.vercel.app/',
    link2: 'https://github.com/ANGELKORADIYA/Regex-Studio',
    logo: 'https://regex-studio.vercel.app/favicon.ico',
    category: 'Gen AI',
    tech: 'Regex, React',
    tags: ['Regex', 'Developer Tool', 'React'],
    status: 'Active',
    priority: 5,
    goal: 'Simplify regex creation and testing. and reverse of regex pattern means getting example from regex pattern.',
    built: 'React-based interactive using API keys to generate regex pattern or example.',
    marketContext: 'Developer utility.',
    future: 'AI-assisted regex generation.'
  },
  {
    id: 11,
    title: 'Scheduling Algorithm Visualizer',
    description: 'A C program built during college that visualizes CPU scheduling algorithms — FCFS, SJF, SRTN, Priority, and Round Robin — using the graphics.h library.',
    link2: 'https://github.com/ANGELKORADIYA/scheduling_algo_with_graphics.h',
    category: 'Systems & Tools',
    tech: 'C, OS, Algorithms',
    tags: ['C', 'OS', 'Algorithms'],
    status: 'Completed',
    priority: 2,
    goal: 'Visualize OS concepts.',
    built: 'C graphics library application.',
    marketContext: 'Academic project.',
    future: null
  },
  {
    id: 12,
    title: '1930 Helpline Improvement',
    description: 'A machine learning project built at a Hackathon to detect fake complaints on the 1930 helpline. Uses scikit-learn to analyze and classify police complaint data.',
    link2: 'https://github.com/Kathan0920/RJPOLICE_HACK_1202_CyberCrew_9',
    category: 'AI & ML',
    tech: 'Scikit-learn, ML',
    tags: ['Scikit-learn', 'ML', 'Cybersecurity'],
    status: 'Archived',
    priority: 4,
    goal: 'Detect fake cybercrime complaints.',
    built: 'Scikit-learn classification model.',
    marketContext: 'Hackathon prototype.',
    future: null
  },
  {
    id: 13,
    title: 'Public Library',
    description: 'A comprehensive management system for public libraries that streamlines book lending and user registrations. Dropped idea after hackathon.',
    link2: 'https://github.com/ANGELKORADIYA/public-library',
    category: 'Web Apps',
    tech: 'React, Node.js, MongoDB',
    tags: ['Management', 'Hackathon', 'Library'],
    status: 'Dropped',
    priority: -1,
    goal: 'Streamline book lending processes for small community libraries.',
    built: 'Core CRUD operations and user authentication system.',
    droppedReason: 'Market is highly saturated with mature free alternatives; shifted focus to more unique AI projects.',
    marketContext: 'Legacy system replacement attempt.',
    future: null
  },
  {
    id: 14,
    title: 'VeriScan',
    description: 'Face recognition system from fetching facebook prefetched profile photo from facebook id.',
    link2: 'https://github.com/ANGELKORADIYA/VeriScan',
    category: 'AI & ML',
    tech: 'OpenCV, Python',
    tags: ['OpenCV', 'Face Recognition', 'Python'],
    status: 'Completed',
    priority: 3,
    goal: 'Explore face recognition technologies.',
    built: 'Python script using OpenCV.',
    marketContext: 'face recognition.',
    future: "mimic human brain"
  },
  {
    id: 15,
    title: 'Guess the Number',
    description: 'An interactive game where players guess a randomly generated number with helpful hints and scoring. Build when learning JavaScript basics.',
    link2: 'https://github.com/ANGELKORADIYA/Guess-the-Number',
    category: 'Games',
    tech: 'JavaScript',
    tags: ['JavaScript', 'Game', 'Logic'],
    status: 'Completed',
    priority: 1,
    goal: 'Learn basic JavaScript logic.',
    built: 'Vanilla JS DOM manipulation.',
    marketContext: 'Learning exercise.',
    future: null
  },
  {
    id: 16,
    title: 'TO-DO LIST',
    description: 'Efficient task management application with persistent storage, categories, and priority levels. Build when learning Web Development basics.',
    link2: 'https://github.com/ANGELKORADIYA/TO-DO-LIST',
    category: 'Web Apps',
    tech: 'React',
    tags: ['Productivity', 'Frontend', 'React'],
    status: 'Completed',
    priority: 2,
    goal: 'Learn React state management.',
    built: 'React app with local storage.',
    marketContext: 'Learning exercise.',
    future: null
  },
  {
    id: 17,
    title: 'TunnelHub',
    description: 'A centralized dashboard for listing and managing all active ngrok tunnels, simplifying local development exposure.',
    link: 'https://tunnelhub.vercel.app/',
    link2: 'https://github.com/ANGELKORADIYA/tunnelhub',
    category: 'Systems & Tools',
    tech: 'Node.js, Networking',
    tags: ['Networking', 'ngrok', 'Node.js'],
    status: 'Completed',
    priority: 5,
    goal: 'Simplify local development exposure.',
    built: 'Node.js dashboard for ngrok API.',
    marketContext: 'Developer tool.',
    future: 'Add multi-user support.'
  }
];

const statusWeights = {
  'Active': 5,
  'Completed': 4,
  'Frozen': 3,
  'Archived': 2,
  'Dropped': 1
};

function ProjectIcon({ project, index }) {
  const [error, setError] = useState(false);
  const initials = project.title ? project.title.charAt(0) : "-";
  const gradient = `linear-gradient(135deg, ${index % 2 === 0 ? '#6366f1' : '#ec4899'}, ${index % 3 === 0 ? '#06b6d4' : '#f97316'})`;

  if (!project.logo || error) {
    return (
      <div
        className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md border border-white/10 transition-transform duration-300 group-hover:scale-110"
        style={{ background: gradient }}
      >
        {initials}
      </div>
    );
  }

  return (
    <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center overflow-hidden bg-white/80 dark:bg-white/10 border border-gray-200/80 dark:border-white/10 transition-all duration-300 relative group-hover:scale-110 group-hover:border-sky-400/40">
      <Image
        src={project.logo}
        alt={`${project.title} logo`}
        fill
        className="object-contain p-1.5"
        onError={() => setError(true)}
        unoptimized={project.logo.endsWith('.svg') || project.logo.endsWith('.ico')}
      />
    </div>
  );
}

function ProjectCard({ p, index, isFeatured, onSelect }) {
  const { showHud, hideHud } = useHackerHud();
  const cardRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  // 3D tilt motion values
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 });

  const handlePointerMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    cardRef.current.style.setProperty("--mx", `${x * 100}%`);
    cardRef.current.style.setProperty("--my", `${y * 100}%`);
    // Skip 3D tilt when user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handleMouseEnter = useCallback((e) => {
    setIsHovering(true);
    if (cardRef.current) {
      showHud(cardRef.current, { type: "project", ...p });
    }
    handlePointerMove(e);
  }, [p, showHud, handlePointerMove]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    hideHud();
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [hideHud, mouseX, mouseY]);

  const statusStyles = {
    Active: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-400/30",
    Completed: "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-400/30",
    Dropped: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-400/30",
    Archived: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-400/30",
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.94, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onClick={() => onSelect?.(p)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onPointerMove={handlePointerMove}
      onFocus={() => {
        if (cardRef.current) showHud(cardRef.current, { type: "project", ...p });
      }}
      onBlur={() => hideHud()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect?.(p);
        }
      }}
      className={`
        relative p-6 md:p-7 rounded-3xl border border-gray-200/80 dark:border-white/10
        bg-white/70 dark:bg-white/[0.04] backdrop-blur-xl
        transition-colors duration-300 cursor-pointer overflow-hidden group flex flex-col h-full
        hud-card-hover
        ${isFeatured ? "md:col-span-2 lg:col-span-2" : "col-span-1"}
        hover:border-sky-400/50 dark:hover:border-sky-400/40
        hover:shadow-[0_20px_50px_-20px_rgba(56,189,248,0.35)]
        focus:outline-none focus:ring-2 focus:ring-sky-500/40
      `}
    >
      {/* Corner brackets for hacker HUD */}
      <span className="hud-card-bracket hud-card-bracket-tl" />
      <span className="hud-card-bracket hud-card-bracket-tr" />
      <span className="hud-card-bracket hud-card-bracket-bl" />
      <span className="hud-card-bracket hud-card-bracket-br" />

      {/* Top accent bar */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500 to-transparent transition-opacity duration-300 ${
          isHovering ? "opacity-100" : "opacity-40"
        }`}
      />

      {/* Mouse-tracking spotlight glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgba(56,189,248,0.16), transparent 55%)",
        }}
      />

      {/* Soft ambient blob */}
      <div
        aria-hidden
        className={`absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl transition-opacity duration-500 ${
          isHovering ? "opacity-40" : "opacity-0"
        } bg-sky-500/30`}
      />

      <div className="relative z-10 h-full flex flex-col flex-grow">
        {/* Top row: icon + category | status */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <ProjectIcon project={p} index={index} />
            <span className="px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.14em] bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
              {p.category}
            </span>
          </div>
          <div
            className={`shrink-0 text-[8px] font-black uppercase px-2.5 py-1 rounded-full border tracking-widest ${
              statusStyles[p.status] || statusStyles.Completed
            }`}
          >
            {p.status}
          </div>
        </div>

        {/* Title */}
        <h3
          className={`font-black text-gray-900 dark:text-white tracking-tight leading-tight mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors ${
            isFeatured ? "text-2xl md:text-3xl" : "text-xl"
          }`}
        >
          {p.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-grow line-clamp-4">
          {p.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {p.tags?.slice(0, isFeatured ? 6 : 4).map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-semibold text-gray-500 dark:text-gray-400 bg-gray-100/80 dark:bg-white/5 px-2 py-0.5 rounded-md border border-gray-200/70 dark:border-white/10 group-hover:border-sky-400/30 group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 mt-auto pt-4 border-t border-gray-100 dark:border-white/10">
          {p.link && (
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-sky-600 text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-sky-500 transition-all shadow-lg shadow-sky-500/25 active:scale-95 demo-btn"
            >
              <ExternalLink size={12} />
              Demo
            </a>
          )}
          {p.link2 && (
            <a
              href={p.link2}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`${p.link ? "px-3.5" : "flex-1"} inline-flex items-center justify-center gap-1.5 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 dark:hover:bg-white/15 transition-all active:scale-95 border border-gray-200 dark:border-white/10`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              Code
            </a>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(p);
            }}
            className="p-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-sky-100 dark:hover:bg-sky-500/20 hover:border-sky-300 dark:hover:border-sky-500/50 transition-all group/inspect"
            title="Inspect in Terminal"
          >
            <Terminal
              size={14}
              className="text-gray-400 dark:text-white/40 group-hover/inspect:text-sky-600 dark:group-hover/inspect:text-sky-400"
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsBento({ onSelect }) {
  const [filter, setFilter] = useState('All');
  
  const sortedProjects = [...projects].sort((a, b) => {
    if (statusWeights[a.status] !== statusWeights[b.status]) {
      return statusWeights[b.status] - statusWeights[a.status];
    }
    return (b.priority || 0) - (a.priority || 0);
  });

  const filteredProjects = sortedProjects.filter(p => {
    if (filter === 'All') return true;
    return p.category === filter;
  });

  return (
    <div className="space-y-8">
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3">
        {['All', 'RAG', 'Web Apps', 'Gen AI', 'AI & ML', 'Games', 'Finance', 'Systems & Tools'].map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`
              px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all
              ${filter === category 
                ? 'bg-sky-500 text-white shadow-[0_0_15px_rgba(56,189,248,0.5)]' 
                : 'bg-white dark:bg-white/5 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 hover:text-sky-600 dark:hover:text-white'}
            `}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((p, index) => {
            const isFeatured = index === 0 && filter === 'All';
            return (
              <ProjectCard
                key={p.id}
                p={p}
                index={index}
                isFeatured={isFeatured}
                onSelect={onSelect}
              />
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
