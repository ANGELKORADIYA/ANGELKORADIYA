"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Database, Terminal, Cpu, Play, Book, GraduationCap, ExternalLink, X, Zap, Globe, Brain, Sparkles } from "lucide-react";

export const skills = [
  { 
    id: "c", 
    label: "C/C++", 
    x: "50%", y: "0%", 
    icon: Terminal, 
    desc: "The foundation of my programming journey. Mastered memory management, pointers, and fundamental data structures.",
    resources: [
      { name: "One Shot - Code with Harry", link: "https://youtu.be/yGB9jhsEsr8?si=OTJxBCkHoESrjzHY", type: "Video" },
      { name: "OOPS Concept - Code with Harry", link: "https://youtube.com/playlist?list=PLISTUNloqsz0z9JJJke7g7PxRLvy6How9&si=gnboxIGFaEvGZXmv", type: "Playlist" },
    ]
  },
  { 
    id: "java", 
    label: "Java", 
    x: "80%", y: "25%", 
    icon: Cpu, 
    desc: "Deep dive into Object-Oriented Programming and enterprise-level architecture.",
    resources: [
      { name: "JTC India Tutorials", link: "https://jtcindia.org/tutorials/java/Java-Introduction.php", type: "Doc" },
      { name: "One Shot - Apna College", link: "https://youtu.be/UmnCZ7-9yDY?si=5fm2TjBizJZagMKM", type: "Video" },
    ]
  },
  { 
    id: "python", 
    label: "Python", 
    x: "20%", y: "25%", 
    icon: Code2, 
    desc: "My go-to for AI/ML, scripting, and rapid prototyping. Leveraged for its rich ecosystem.",
    resources: [
      { name: "One Shot - Apna College", link: "https://youtu.be/vLqTf2b6GZw?si=40N12O1QFWgZsdE1", type: "Video" },
      { name: "Full Course - Code with Harry", link: "https://youtu.be/JdG1cVFyj5A?si=5dddMwcrzMsDpRO8", type: "Video" }
    ]
  },
  { 
    id: "dsa", 
    label: "DSA", 
    x: "50%", y: "50%", 
    icon: Zap, 
    desc: "Core problem solving. Solved 500+ problems across various platforms.",
    resources: [
      { name: "Striver’s DSA Course", link: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/", type: "Course" },
      { name: "LeetCode Profile", link: "https://leetcode.com/u/Angel_Koradiya/", type: "Profile" },
      { name: "Coding Ninja Profile", link: "https://www.naukri.com/code360/profile/angelkoradiya", type: "Profile" },
    ]
  },
  { 
    id: "web-basics", 
    label: "Web Basics", 
    x: "80%", y: "70%", 
    icon: Globe, 
    desc: "Core frontend technologies. HTML, CSS, and Next.js foundations.",
    resources: [
      { name: "HTML - Code with Harry", link: "https://youtu.be/BsDoLVMnmZs?si=e9MvQnEsjHEUERvb", type: "Video" },
      { name: "CSS - Code with Harry", link: "https://youtu.be/Edsxf_NBFrw?si=7SqsXYVFQJn_3xCb", type: "Video" },
      { name: "Next.js Official Docs", link: "https://nextjs.org/docs", type: "Doc" },
    ]
  },
  { 
    id: "ml-basics", 
    label: "ML Basics", 
    x: "20%", y: "70%", 
    icon: Brain, 
    desc: "Machine Learning foundations. Using Scikit-learn for classification and analysis.",
    resources: [
      { name: "Scikit-learn - freeCodeCamp", link: "https://youtu.be/0Lt9w-BxKFQ", type: "Video" },
      { name: "Intro to Scikit - Krish Naik", link: "https://youtu.be/pqNCD_5r0IU", type: "Video" },
      { name: "Official Documentation", link: "https://scikit-learn.org/stable/user_guide.html", type: "Doc" },
    ]
  },
  { 
    id: "mern", 
    label: "MERN Stack", 
    x: "80%", y: "100%", 
    icon: Database, 
    desc: "Full-stack proficiency. Built multiple real-world applications with React and Node.js.",
    resources: [
      { name: "React - Code with Harry", link: "https://youtube.com/playlist?list=PLu0W_9lII9agx66oZnT6IyhcMIbUMNMdt&si=TZrmd5HlA8mzdOci", type: "Playlist" },
      { name: "NodeJS - Code with Harry", link: "https://youtu.be/BLl32FvcdVM?si=bfDtDlzQqu7QIiJk", type: "Video" },
    ]
  },
  { 
    id: "genai", 
    label: "Generative AI", 
    x: "20%", y: "100%", 
    icon: Sparkles, 
    desc: "Current frontier. Exploring LLMs, RAG, and AI-driven automation.",
    resources: [
      { name: "Intro by Google Cloud", link: "https://www.cloudskillsboost.google/course_templates/536", type: "Course" },
      { name: "Leader Certification Course", link: "https://youtu.be/30diF8dKpAY?si=Jv6yk0PAORCMgO9u", type: "Video" },
    ]
  }
];

export default function LearningTree({ onSelect }) {
  const [activeSkill, setActiveSkill] = useState(null);

  return (
    <div className="relative min-h-[750px] md:min-h-[850px] w-full max-w-4xl mx-auto rounded-[3rem] bg-white/60 dark:bg-white/5 backdrop-blur-[20px] saturate-[180%] border border-gray-200 dark:border-white/10 p-8 md:p-16 pb-24 md:pb-32 overflow-hidden transition-colors duration-300">
      {/* SVG Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 dark:opacity-20 stroke-sky-500" style={{ zIndex: 0 }}>
         {/* C/C++ (50, 0) to Java (80, 25) & Python (20, 25) */}
         <line x1="50%" y1="10%" x2="80%" y2="28.75%" strokeWidth="2" strokeDasharray="5,5" />
         <line x1="50%" y1="10%" x2="20%" y2="28.75%" strokeWidth="2" strokeDasharray="5,5" />
         
         {/* Java (80, 25) & Python (20, 25) to DSA (50, 50) */}
         <line x1="80%" y1="28.75%" x2="50%" y2="47.5%" strokeWidth="2" strokeDasharray="5,5" />
         <line x1="20%" y1="28.75%" x2="50%" y2="47.5%" strokeWidth="2" strokeDasharray="5,5" />
         
         {/* DSA (50, 50) to Web Basics (80, 70) & ML Basics (20, 70) */}
         <line x1="50%" y1="47.5%" x2="80%" y2="62.5%" strokeWidth="2" strokeDasharray="5,5" />
         <line x1="50%" y1="47.5%" x2="20%" y2="62.5%" strokeWidth="2" strokeDasharray="5,5" />

         {/* Web Basics (80, 70) to MERN (80, 100) */}
         <line x1="80%" y1="62.5%" x2="80%" y2="85%" strokeWidth="2" strokeDasharray="5,5" />
         
         {/* ML Basics (20, 70) to GenAI (20, 100) */}
         <line x1="20%" y1="62.5%" x2="20%" y2="85%" strokeWidth="2" strokeDasharray="5,5" />
      </svg>

      {/* Nodes */}
      {skills.map((skill) => {
        const Icon = skill.icon;
        const isHovered = activeSkill === skill.id;
        
        return (
          <motion.div
            key={skill.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 outline-none flex flex-col items-center"
            style={{ 
              left: skill.x, 
              top: `calc(${skill.y} * 0.75 + 10%)`, 
              zIndex: isHovered ? 50 : 10 
            }}
            onMouseEnter={() => setActiveSkill(skill.id)}
            onMouseLeave={() => setActiveSkill(null)}
            onClick={() => onSelect(skill)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect(skill);
              }
            }}
            aria-label={skill.label}
          >
            <div className={`
              w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center cursor-pointer shadow-2xl
              transition-all duration-300 relative border-2
              ${isHovered ? "bg-sky-500 border-sky-400 text-white scale-110 shadow-sky-500/50" : "bg-white dark:bg-white/10 border-gray-200 dark:border-white/20 text-gray-600 dark:text-gray-300 backdrop-blur-md shadow-xl dark:shadow-none"}
            `}>
              <Icon size={24} />
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 whitespace-nowrap text-[9px] md:text-[10px] font-black uppercase tracking-widest bg-white dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/10 text-sky-600 dark:text-sky-400 px-3 py-1 rounded-full shadow-sm dark:shadow-none">
              {skill.label}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
