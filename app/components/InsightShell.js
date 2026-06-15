"use client";
import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from "react";
import { motion } from "framer-motion";
import { Terminal, ChevronRight, Square, Maximize2, Minimize2 } from "lucide-react";
import { projects } from "./ProjectsBento";
import { skills } from "./LearningTree";
import { AnimatePresence } from "framer-motion";

const InsightShell = forwardRef((props, ref) => {
  const [history, setHistory] = useState([
    { type: "system", text: "Welcome to angelOS v1.1.0" },
    { type: "system", text: "Type 'help' to see available commands." }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Contact Flow State
  const [contactStep, setContactStep] = useState(null); // null | 'name' | 'email' | 'message'
  const [tempContact, setTempContact] = useState({ name: '', email: '', message: '' });

  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isInitialLoad) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      setIsInitialLoad(false);
    }
  }, [history, isTyping]);

  const handleCommand = async (cmd, data = null) => {
    if (isTyping) return;
    const trimmed = cmd.trim();
    
    // Log the user's input line
    setHistory(prev => [...prev, { type: "command", text: `guest@angelOS:~$ ${cmd}` }]);
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 400));

    // 1. Handle Contact Flow if active
    if (contactStep) {
      if (!trimmed && contactStep !== 'message') {
         setHistory(prev => [...prev, { type: "error", text: "Error: Input cannot be empty." }]);
         setIsTyping(false);
         return;
      }

      if (contactStep === 'name') {
        setTempContact(prev => ({ ...prev, name: trimmed }));
        setHistory(prev => [...prev, { type: "system", text: "Enter your email address:" }]);
        setContactStep('email');
      } else if (contactStep === 'email') {
        setTempContact(prev => ({ ...prev, email: trimmed }));
        setHistory(prev => [...prev, { type: "system", text: "Enter your message:" }]);
        setContactStep('message');
      } else if (contactStep === 'message') {
        const finalData = { ...tempContact, message: trimmed };
        setHistory(prev => [...prev, { type: "system", text: "Sending secure message..." }]);
        
        try {
          const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(finalData)
          });
          if (res.ok) {
            setHistory(prev => [...prev, { type: "success", text: "✓ Message sent successfully! I will get back to you soon." }, { type: "separator" }]);
          } else {
            throw new Error();
          }
        } catch (e) {
          setHistory(prev => [...prev, { type: "error", text: "Failed to send message. Please try again later or use LinkedIn." }, { type: "separator" }]);
        }
        setContactStep(null);
        setTempContact({ name: '', email: '', message: '' });
      }
      setIsTyping(false);
      return;
    }

    // 2. Normal Command Processing
    if (!trimmed) {
      setIsTyping(false);
      return;
    }

    const args = trimmed.split(/\s+/);
    const action = args[0].toLowerCase();
    const output = [];

    if (action === 'help') {
      output.push({ type: 'header', text: '[AVAILABLE COMMANDS]' });
      output.push({ type: 'text', text: 'inspect --project <query>  : View project details' });
      output.push({ type: 'text', text: 'inspect --academic <query> : View academic details' });
      output.push({ type: 'text', text: 'inspect --skill <query>    : View skill resources' });
      output.push({ type: 'text', text: 'contact                  : Start interactive contact flow' });
      output.push({ type: 'text', text: 'clear                    : Clear screen' });
      output.push({ type: "separator" });
    } else if (action === 'clear') {
      setHistory([]);
      setIsTyping(false);
      return;
    } else if (action === 'contact') {
      output.push({ type: 'header', text: '[INITIATING CONTACT FLOW]' });
      output.push({ type: 'system', text: "What is your name?" });
      setContactStep('name');
      // Note: No separator yet because the flow has started
    } else if (action === 'inspect' && args[1] === '--academic' && args[2]) {
      const query = args.slice(2).join(" ").toLowerCase();
      const academicsData = [
        { id: "swe", year: "2025-Present", title: "Software Engineer", place: "Silvertouch Technology", detail: "6 months internship + Full-time Position" },
        { id: "btech", year: "2021-2025", title: "B.Tech in Computer Engineering", place: "VGEC, Ahmedabad", detail: "CPI: 8 | GATE Qualified (First Attempt)" },
        { id: "12th", year: "2020-2021", title: "12th Grade", place: "Dream International School", detail: "89% | JEE: 93 Percentile" }
      ];
      
      const academic = academicsData.find(a => 
        a.id.toLowerCase() === query || 
        a.title.toLowerCase().includes(query) || 
        a.place.toLowerCase().includes(query)
      );
      
      if (academic) {
        output.push({ type: 'header', text: `[ACAD] ${academic.title.toUpperCase()}` });
        output.push({ type: 'label', text: 'TIMEFRAME:', val: academic.year });
        output.push({ type: 'label', text: 'LOCATION:', val: academic.place });
        output.push({ type: 'label', text: 'DETAILS:', val: academic.detail });
        output.push({ type: "separator" });
      } else {
        output.push({ type: 'error', text: `Academic record '${query}' not found. Try 'swe', 'btech', or '12th'.` });
        output.push({ type: "separator" });
      }
    } else if (action === 'inspect' && args[1] === '--project' && args[2]) {
      const query = args.slice(2).join(" ");
      const parsedId = parseInt(query, 10);
      
      let project = null;
      if (!isNaN(parsedId)) {
        project = projects.find(p => p.id === parsedId);
      } else {
        project = projects.find(p => p.title.toLowerCase().includes(query.toLowerCase()));
      }

      if (project) {
        output.push({ type: 'header', text: `[PROJ] ${project.title.toUpperCase()}` });
        output.push({ type: 'label', text: '[GOAL]:', val: project.goal });
        output.push({ type: 'label', text: 'BUILT:', val: project.built });
        output.push({ type: 'label', text: 'STATUS:', val: project.status });
        if (project.droppedReason) output.push({ type: 'label', text: 'REASON:', val: project.droppedReason });
        output.push({ type: 'label', text: 'MARKET:', val: project.marketContext });
        if (project.future) output.push({ type: 'label', text: 'FUTURE:', val: project.future });
        output.push({ type: "separator" });
      } else {
        output.push({ type: 'error', text: `Project '${query}' not found.` });
        output.push({ type: "separator" });
      }
    } else if ((action === 'inspect' || action === 'learn') && args[1] === '--skill' && args[2]) {
      const query = args.slice(2).join(" ");
      
      let skill = skills.find(s => s.id.toLowerCase() === query.toLowerCase());
      if (!skill) {
        skill = skills.find(s => s.label.toLowerCase().includes(query.toLowerCase()));
      }

      if (skill) {
        output.push({ type: 'header', text: `[SKILL] ${skill.label.toUpperCase()}` });
        output.push({ type: 'text', text: skill.desc });
        output.push({ type: 'header', text: 'RESOURCES:' });
        skill.resources.forEach(res => {
          output.push({ type: 'link', text: res.name, url: res.link, sub: res.type });
        });
        output.push({ type: "separator" });
      } else {
        output.push({ type: 'error', text: `Skill '${query}' not found.` });
        output.push({ type: "separator" });
      }
    } else if (data && data.type === 'academic') {
      output.push({ type: 'header', text: `[ACAD] ${data.title.toUpperCase()}` });
      output.push({ type: 'label', text: 'TIMEFRAME:', val: data.year });
      output.push({ type: 'label', text: 'LOCATION:', val: data.place });
      output.push({ type: 'label', text: 'DETAILS:', val: data.detail });
      output.push({ type: "separator" });
    } else if (data && data.type === 'project') {
      output.push({ type: 'header', text: `[PROJ] ${data.title.toUpperCase()}` });
      output.push({ type: 'label', text: '[GOAL]:', val: data.goal });
      output.push({ type: 'label', text: 'BUILT:', val: data.built });
      output.push({ type: 'label', text: 'STATUS:', val: data.status });
      if (data.droppedReason) output.push({ type: 'label', text: 'REASON:', val: data.droppedReason });
      output.push({ type: 'label', text: 'MARKET:', val: data.marketContext });
      if (data.future) output.push({ type: 'label', text: 'FUTURE:', val: data.future });
      output.push({ type: "separator" });
    } else if (data && data.type === 'skill') {
      output.push({ type: 'header', text: `[SKILL] ${data.label.toUpperCase()}` });
      output.push({ type: 'text', text: data.desc });
      output.push({ type: 'header', text: 'RESOURCES:' });
      data.resources.forEach(res => {
        output.push({ type: 'link', text: res.name, url: res.link, sub: res.type });
      });
      output.push({ type: "separator" });
    } else {
      output.push({ type: 'error', text: `Command not recognized: ${action}. Type 'help' for options.` });
      output.push({ type: "separator" });
    }

    setHistory(prev => [...prev, ...output]);
    setIsTyping(false);
  };

  useImperativeHandle(ref, () => ({
    execute: (command, data) => handleCommand(command, data)
  }));

  return (
    <>
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] cursor-zoom-out"
          />
        )}
      </AnimatePresence>

      <motion.div 
        layout
        initial={false}
        animate={isExpanded ? {
          position: 'fixed',
          top: '5%',
          left: '5%',
          right: '5%',
          bottom: '5%',
          width: 'auto',
          height: 'auto',
          zIndex: 100,
        } : {
          position: 'relative',
          width: '100%',
          height: '100%',
          zIndex: 10,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`bg-white/80 dark:bg-white/5 backdrop-blur-[20px] saturate-[180%] border border-gray-200 dark:border-white/10 flex flex-col font-mono text-xs overflow-hidden rounded-[2rem] shadow-2xl relative group ${isExpanded ? 'shadow-sky-500/20' : ''}`} 
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.focus();
        }}
      >
        <div className="absolute inset-0 border border-transparent bg-gradient-to-br from-white/20 to-transparent dark:from-white/10 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" style={{ maskImage: 'linear-gradient(white, white) content-box, linear-gradient(white, white)', maskComposite: 'exclude' }}></div>

        <div className="h-10 bg-gray-100/50 dark:bg-white/5 flex items-center px-6 border-b border-gray-200 dark:border-white/10 shrink-0 backdrop-blur-md relative z-10">
          <Terminal size={14} className="mr-2 text-sky-600 dark:text-sky-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 dark:text-white/40">angelOS Terminal {isExpanded && '(Expanded Mode)'}</span>
          <div className="ml-auto flex gap-2.5">
            <button 
              onClick={(e) => { e.stopPropagation(); handleCommand('clear'); }}
              className="w-4 h-4 rounded-full bg-red-500/40 border border-red-500/20 hover:bg-red-500 transition-colors cursor-pointer" 
              title="Clear History"
            />
            <button 
              onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
              className="w-4 h-4 rounded-full bg-yellow-500/40 border border-yellow-500/20 hover:bg-yellow-500 transition-colors cursor-pointer flex items-center justify-center" 
              title={isExpanded ? "Exit Expanded Mode" : "Expand Terminal"}
            >
              {isExpanded ? <Minimize2 size={8} className="text-yellow-950" /> : <Maximize2 size={8} className="text-yellow-950" />}
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); handleCommand('help'); }}
              className="w-4 h-4 rounded-full bg-green-500/40 border border-green-500/20 hover:bg-green-500 transition-colors cursor-pointer" 
              title="Show Help"
            />
          </div>
        </div>
      
      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-4 relative z-10 pb-20">
        {history.map((line, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="leading-relaxed">
            {line.type === 'separator' && <hr className="border-gray-200 dark:border-white/5 my-6" />}
            {line.type === 'system' && <div className="text-sky-600 dark:text-sky-400/70 italic">{line.text}</div>}
            {line.type === 'command' && <div className="text-emerald-600 dark:text-green-400 font-bold">{line.text}</div>}
            {line.type === 'error' && <div className="text-red-500 dark:text-red-400">{line.text}</div>}
            {line.type === 'success' && <div className="text-emerald-600 dark:text-emerald-400 font-bold">{line.text}</div>}
            {line.type === 'header' && <div className="mt-6 mb-3 text-sky-600 dark:text-sky-400 font-black tracking-[0.1em] border-none pb-1">{line.text}</div>}
            {line.type === 'label' && (
              <div className="flex flex-col gap-1 mb-3">
                <span className="text-gray-400 dark:text-white/20 font-black text-[9px] uppercase tracking-widest">{line.text}</span>
                <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{line.val}</span>
              </div>
            )}
            {line.type === 'text' && <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{line.text}</div>}
            {line.type === 'link' && (
              <a href={line.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 hover:border-sky-500/30 hover:bg-sky-100 dark:hover:bg-white/10 transition-all group/link mb-2">
                <ChevronRight size={12} className="text-sky-600 dark:text-sky-400 group-hover/link:translate-x-1 transition-transform" />
                <span className="text-gray-700 dark:text-white/80 group-hover/link:text-gray-900 dark:group-hover/link:text-white transition-colors">{line.text}</span>
                <span className="ml-auto text-[9px] font-bold bg-gray-200 dark:bg-white/10 px-2 py-0.5 rounded-full text-gray-500 dark:text-white/40 group-hover/link:text-sky-600 dark:group-hover/link:text-sky-400 transition-colors uppercase tracking-widest">{line.sub}</span>
              </a>
            )}
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-3 text-emerald-600 dark:text-green-400">
            <Square size={8} className="animate-pulse fill-current" />
            <span className="animate-pulse font-black text-[10px] uppercase tracking-widest">Executing...</span>
          </div>
        )}
        
        {!isTyping && (
          <div className="flex items-center text-emerald-600 dark:text-green-400 mt-4">
            <span className="mr-2 font-bold">guest@angelOS:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCommand(input);
                  setInput("");
                }
              }}
              className="flex-1 bg-transparent outline-none caret-emerald-600 dark:caret-green-400 text-gray-900 dark:text-white"
              autoComplete="off"
              spellCheck="false"
              aria-label="Terminal input"
              autoFocus
            />
          </div>
        )}
        <div ref={endRef} />
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.05); border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0, 0, 0, 0.1); }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.1); }
      `}</style>
    </motion.div>
    </>
  );
});

InsightShell.displayName = "InsightShell";
export default InsightShell;