"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Terminal } from "lucide-react";

export const projects = [
  {
    id: 1,
    title: 'OmniQuery',
    description: 'An advanced Talk2DB platform that converts Natural Language to SQL using a RAG (Retrieval-Augmented Generation) architecture. It features strict RBAC, modular provider interfaces, and dynamic workflow execution for seamless database interaction.',
    link: 'https://github.com/ANGELKORADIYA/OMNIQUERY', // No demo link provided in the other file, but keeping GitHub as link
    link2: 'https://github.com/ANGELKORADIYA/OMNIQUERY',
    category: 'RAG',
    tech: 'TypeScript, RAG, SQL, GenAI',
    tags: ['TypeScript', 'RAG', 'SQL', 'GenAI'],
    status: 'Active',
    priority: 10,
    goal: 'To democratize database access by allowing non-technical users to query data using natural language.',
    built: 'A sophisticated RAG (Retrieval-Augmented Generation) pipeline that maps natural language to precise SQL schemas with strict RBAC.',
    marketContext: 'Fills the gap between complex raw SQL and overly simplified AI chat tools for business data.',
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
    goal: 'Explore autonomous task execution and self-healing agentic workflows.',
    built: 'A custom prompt processor that enables agents to execute Python code and interact with system tools via MCP.',
    marketContext: 'Addresses the need for reliable agent orchestration in developer local environments.',
    future: 'Integration with more model providers and improved long-term memory systems.'
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
    goal: 'Reduce context switching and eye strain for developers reading documentation.',
    built: 'Firefox extension using localized AI processing to provide semantic highlighting and text simplification.',
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
    status: 'Frozen',
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
    goal: 'Create a seamless travel logging experience.',
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
    status: 'Archived',
    priority: 3,
    goal: 'Learn backend fundamentals.',
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
    goal: 'Build a scalable snippet sharing service.',
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
    goal: 'Create an interactive linguistic database.',
    built: 'React frontend with real-time search capabilities.',
    marketContext: 'Educational tool.',
    future: 'Enhanced linguistic features.'
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
    goal: 'Simplify regex creation and testing.',
    built: 'React-based interactive tester.',
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
    status: 'Archived',
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
    status: 'Archived',
    priority: 3,
    goal: 'Explore face recognition technologies.',
    built: 'Python script using OpenCV.',
    marketContext: 'Academic exploration.',
    future: null
  },
  {
    id: 15,
    title: 'Guess the Number',
    description: 'An interactive game where players guess a randomly generated number with helpful hints and scoring. Build when learning JavaScript basics.',
    link2: 'https://github.com/ANGELKORADIYA/Guess-the-Number',
    category: 'Games',
    tech: 'JavaScript',
    tags: ['JavaScript', 'Game', 'Logic'],
    status: 'Archived',
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
    status: 'Archived',
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
    status: 'Active',
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
        className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-sm border border-gray-100 dark:border-white/10 transition-all duration-300 bg-gray-50 dark:bg-white/10 backdrop-blur-md"
        style={{ background: !project.logo ? gradient : undefined }}
      >
        {initials}
      </div>
    );
  }

  return (
    <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-sm overflow-hidden bg-gray-50 dark:bg-white/10 backdrop-blur-md border border-gray-100 dark:border-white/10 transition-all duration-300 relative group-hover:bg-sky-100 dark:group-hover:bg-sky-500/20">
      <Image
        src={project.logo}
        alt={`${project.title} logo`}
        fill
        className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
        onError={() => setError(true)}
        unoptimized={project.logo.endsWith('.svg') || project.logo.endsWith('.ico')}
      />
    </div>
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
            const isFeatured = index === 0 && filter === 'All'; // Only feature first item when viewing all
            
            return (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => onSelect(p)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect(p);
                  }
                }}
                className={`
                  relative p-8 rounded-[2rem] border border-gray-200 dark:border-white/10 
                  bg-white/60 dark:bg-white/5 backdrop-blur-[20px] saturate-[180%]
                  transition-all duration-500 cursor-pointer overflow-hidden group flex flex-col h-full
                  ${isFeatured ? "md:col-span-2 lg:col-span-2 bg-gradient-to-br from-sky-500/5 to-indigo-500/5 dark:from-sky-500/5 dark:to-indigo-500/5" : "col-span-1"}
                  hover:bg-white dark:hover:bg-white/10 hover:border-sky-300 dark:hover:border-sky-500/30 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-sky-500/10
                  focus:outline-none focus:ring-2 focus:ring-sky-500/50
                `}
              >
                {/* Status Pill */}
                <div className={`absolute top-6 right-6 text-[8px] font-black uppercase px-2.5 py-1 rounded-full border ${
                  p.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20' :
                  p.status === 'Dropped' ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/20' :
                  'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-white/40 border-gray-200 dark:border-white/10'
                }`}>
                  {p.status}
                </div>

                <div className="relative h-full flex flex-col flex-grow">
                  {/* Header with icon and title */}
                  <div className="flex items-center gap-4 mb-4">
                    <ProjectIcon project={p} index={index} />
                    <h3 className={`font-black text-gray-900 dark:text-white tracking-tighter ${isFeatured ? "text-3xl" : "text-xl"}`}>{p.title}</h3>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tags?.map(tag => (
                      <span key={tag} className="text-[9px] font-bold text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-white/5 px-1.5 py-0.5 rounded border border-gray-200 dark:border-white/5">
                        #{tag}
                      </span>
                    ))}
                    <span className="px-2 py-0.5 bg-sky-100 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-full text-[9px] font-black uppercase tracking-wider border border-sky-200 dark:border-sky-500/20 ml-auto">
                      {p.category}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-grow">{p.description}</p>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100 dark:border-white/5">
                    {p.link && (
                      <a 
                        href={p.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-sky-700 transition-all shadow-lg shadow-sky-500/20 active:scale-95"
                      >
                        Demo
                      </a>
                    )}
                    {p.link2 && (
                      <a 
                        href={p.link2} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onClick={(e) => e.stopPropagation()}
                        className={`${p.link ? 'px-3' : 'flex-1'} inline-flex items-center justify-center gap-2 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 dark:hover:bg-white/20 hover:text-gray-900 dark:hover:text-white transition-all active:scale-95 border border-gray-200 dark:border-white/10`}
                      >
                        Code
                      </a>
                    )}
                    <button 
                      onClick={(e) => { e.stopPropagation(); onSelect(p); }}
                      className="p-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-sky-100 dark:hover:bg-sky-500/20 hover:border-sky-300 dark:hover:border-sky-500/50 transition-all group/inspect"
                      title="Inspect in Terminal"
                    >
                      <Terminal size={14} className="text-gray-400 dark:text-white/40 group-hover/inspect:text-sky-600 dark:group-hover/inspect:text-sky-400" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
