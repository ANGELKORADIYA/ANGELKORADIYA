"use client";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "./ProjectsBento";

const statusStyles = {
  Active: "bg-emerald-500/15 text-emerald-600 border-emerald-400/30",
  Completed: "bg-sky-500/15 text-sky-600 border-sky-400/30",
  Dropped: "bg-rose-500/15 text-rose-600 border-rose-400/30",
  Archived: "bg-amber-500/15 text-amber-600 border-amber-400/30",
};

export default function ProjectSpotlight({ selectedProject, onSelect }) {
  const [activeId, setActiveId] = useState(selectedProject?.id ?? 9);

  const activeProject = useMemo(() => {
    return projects.find((project) => project.id === activeId) || selectedProject || projects[8] || projects[0];
  }, [activeId, selectedProject]);

  const handleSelect = (project) => {
    setActiveId(project.id);
    onSelect?.(project);
  };

  return (
    <div className="mt-10 rounded-[2rem] border border-gray-200/80 bg-white/70 p-6 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.3)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-sky-600 dark:text-sky-300">Project Gallery</p>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Select a project to inspect it</h3>
        </div>
        <div className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-sky-700 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-200">
          Focused view
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {projects.map((project) => {
          const isActive = activeProject?.id === project.id;
          return (
            <button
              key={project.id}
              onClick={() => handleSelect(project)}
              className={`min-w-[140px] rounded-2xl border px-3 py-3 text-left transition-all ${
                isActive
                  ? "border-sky-400 bg-sky-500/10 shadow-[0_10px_30px_-15px_rgba(56,189,248,0.7)]"
                  : "border-gray-200 bg-white/70 hover:border-sky-300 hover:bg-sky-50/70 dark:border-white/10 dark:bg-slate-900/50 dark:hover:border-sky-500/30 dark:hover:bg-slate-800/70"
              }`}
            >
              <div className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">{project.category}</div>
              <div className="mt-2 font-semibold text-slate-900 dark:text-white">{project.title}</div>
              <div className={`mt-3 inline-flex rounded-full border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.25em] ${statusStyles[project.status] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
                {project.status}
              </div>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeProject?.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="mt-6 rounded-[1.6rem] border border-slate-200 bg-slate-950/95 p-6 text-white shadow-[0_20px_60px_-20px_rgba(2,6,23,0.9)] dark:border-white/10"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-300">Selected Project</p>
              <h4 className="mt-1 text-2xl font-semibold">{activeProject?.title}</h4>
            </div>
            <div className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-sky-200">
              {activeProject?.status}
            </div>
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300">{activeProject?.description}</p>

          <div className="mt-6 grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Core Details</div>
              <div className="space-y-3 text-sm text-slate-200">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.25em] text-sky-300">Goal</div>
                  <div className="mt-1">{activeProject?.goal}</div>
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.25em] text-sky-300">Built</div>
                  <div className="mt-1">{activeProject?.built}</div>
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.25em] text-sky-300">Future</div>
                  <div className="mt-1">{activeProject?.future || "Continued iteration and expansion."}</div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Tech & Context</div>
              <div className="flex flex-wrap gap-2">
                {(activeProject?.tags || []).map((tag) => (
                  <span key={tag} className="rounded-full border border-sky-400/20 bg-sky-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-sky-100">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-3 text-sm text-slate-300">
                <div className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Market Context</div>
                <div className="mt-1">{activeProject?.marketContext}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
