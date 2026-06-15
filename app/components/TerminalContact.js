"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function TerminalContact() {
  const [history, setHistory] = useState([
    { type: "system", text: "Welcome to angelOS v1.1.0" },
    { type: "system", text: "Liquid Glass Terminal initialized." },
    { type: "system", text: "Type 'help' to see available commands." }
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = async (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;
    
    setHistory(prev => [...prev, { type: "user", text: `guest@angelOS:~$ ${trimmed}` }]);
    
    const [action, ...args] = trimmed.split(" ");
    const argsStr = args.join(" ");

    setTimeout(() => {
      switch (action.toLowerCase()) {
        case "help":
          setHistory(prev => [...prev, 
            { type: "system", text: "Available commands:" },
            { type: "system", text: "  socials   - Display links to my profiles" },
            { type: "system", text: "  email     - Send me an email (usage: email \"your message\")" },
            { type: "system", text: "  clear     - Clear terminal output" }
          ]);
          break;
        case "socials":
          setHistory(prev => [...prev, 
            { type: "system", text: "GitHub: https://github.com/angelkoradiya" },
            { type: "system", text: "LinkedIn: https://linkedin.com/in/angel-koradiya" }
          ]);
          break;
        case "clear":
          setHistory([]);
          break;
        case "email":
          if (!argsStr) {
            setHistory(prev => [...prev, { type: "error", text: "Error: Message is empty. Usage: email \"your message here\"" }]);
          } else {
            const message = argsStr.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
            setHistory(prev => [...prev, { type: "system", text: "Sending message..." }]);
            
            fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: "Terminal Guest", email: "terminal@guest.com", message })
            })
            .then(res => res.json())
            .then(data => {
               setHistory(prev => [...prev, { type: "success", text: "✓ Message sent successfully! I'll get back to you soon." }]);
            })
            .catch(err => {
               setHistory(prev => [...prev, { type: "error", text: "Error sending message. Please try standard email." }]);
            });
          }
          break;
        default:
          setHistory(prev => [...prev, { type: "error", text: `Command not found: ${action}. Type 'help' for options.` }]);
      }
    }, 300);
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-[450px] bg-white/5 backdrop-blur-[30px] saturate-[180%] rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden font-mono text-sm flex flex-col relative group">
      {/* Light-catcher border effect */}
      <div className="absolute inset-0 border border-transparent bg-gradient-to-br from-white/10 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" style={{ maskImage: 'linear-gradient(white, white) content-box, linear-gradient(white, white)', maskComposite: 'exclude' }}></div>

      <div className="h-10 bg-white/5 flex items-center px-6 border-b border-white/10 backdrop-blur-md">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        </div>
        <span className="mx-auto text-white/40 text-[10px] uppercase tracking-[0.3em] font-black">angelOS Terminal</span>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar" onClick={() => document.getElementById("terminal-input").focus()}>
        {history.map((line, i) => (
          <div key={i} className={`mb-2 leading-relaxed ${
            line.type === "user" ? "text-sky-400" :
            line.type === "error" ? "text-red-400" :
            line.type === "success" ? "text-emerald-400" : "text-gray-300"
          }`}>
            {line.text}
          </div>
        ))}
        <div className="flex text-gray-300 mt-2">
          <span className="text-sky-400 mr-2 font-bold">guest@angelOS:~$</span>
          <input
            id="terminal-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCommand(input);
                setInput("");
              }
            }}
            className="flex-1 bg-transparent outline-none caret-sky-400 text-white"
            autoComplete="off"
            spellCheck="false"
            aria-label="Terminal input"
          />
        </div>
        <div ref={endRef} />
      </div>
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
