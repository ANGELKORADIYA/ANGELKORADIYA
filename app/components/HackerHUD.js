"use client";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useHackerHud } from "./HackerHudContext";
import { useTheme } from "./ThemeProvider";

const SCRAMBLE_CHARS = "!<>-_\\/[]{}=+*^?#$%01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const rand = () => SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];

function useDecrypt(finalText, active, delay = 0, onProgress = null) {
  const [display, setDisplay] = useState("");
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!active || !finalText) {
      setDisplay("");
      if (onProgress) onProgress(0);
      return;
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      const t = setTimeout(() => {
        setDisplay(finalText);
        if (onProgress) onProgress(100);
      }, delay);
      return () => clearTimeout(t);
    }

    let frame = 0;
    const stagger = 0.85;
    const holdScramble = 5;
    const maxFrame = Math.max(1, finalText.length * stagger + holdScramble + 4);

    if (onProgress) onProgress(5);

    const startTimeout = setTimeout(() => {
      if (onProgress) onProgress(15);
      timerRef.current = setInterval(() => {
        let out = "";
        for (let i = 0; i < finalText.length; i++) {
          const ch = finalText[i];
          if (ch === " ") { out += " "; continue; }
          const startAt = i * stagger;
          if (frame < startAt) out += rand();
          else if (frame < startAt + holdScramble) out += rand();
          else out += ch;
        }
        setDisplay(out);
        frame += 1.6;

        if (onProgress) {
          const p = Math.min(99, Math.round(15 + (frame / maxFrame) * 85));
          onProgress(p);
        }

        if (frame > maxFrame) {
          setDisplay(finalText);
          if (onProgress) onProgress(100);
          clearInterval(timerRef.current);
        }
      }, 24);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [finalText, active, delay, onProgress]);

  return display;
}

function buildHudData(data) {
  if (!data) return null;

  if (data.type === "project") {
    return {
      name: data.title,
      category: data.category?.toUpperCase() || "PROJECT",
      status: data.status?.toUpperCase() || "UNKNOWN",
      statusClass: data.status === "Active" ? "active" : data.status === "Dropped" ? "compromised" : "dormant",
      topFields: [
        { label: "TECH", value: (data.tags || []).join(" / ") || data.tech || "N/A" },
      ],
      bottomFields: [
        { label: "GOAL", value: data.goal || "N/A" },
        { label: "BUILT", value: data.built || "N/A" },
        { label: "MARKET", value: data.marketContext || "N/A" },
        { label: "FUTURE", value: data.future || "Continued iteration." },
      ].filter(f => f.value && f.value !== "N/A"),
      threat: data.priority || 5,
      threatLabel: `PRIORITY INDEX ${data.priority || 5}/10`,
      notes: data.description || "",
    };
  }

  if (data.type === "skill") {
    return {
      name: data.label,
      category: "SKILL MODULE",
      status: "ACTIVE",
      statusClass: "active",
      topFields: [
        { label: "RESOURCES", value: `${data.resources?.length || 0} LINKED` },
      ],
      bottomFields: [],
      threat: 7,
      threatLabel: "PROFICIENCY 7/10",
      notes: data.desc || "",
    };
  }

  if (data.type === "academic") {
    return {
      name: data.title,
      category: data.year || "ACADEMIC",
      status: "ARCHIVED",
      statusClass: "dormant",
      topFields: [
        { label: "INSTITUTION", value: data.place || "N/A" },
      ],
      bottomFields: [],
      threat: 6,
      threatLabel: "RELEVANCE 6/10",
      notes: data.detail || "",
    };
  }

  return null;
}

function DecryptField({ label, value, active, delay, textColor, dimColor }) {
  const displayValue = useDecrypt(value || "", active, delay);
  return (
    <div style={{ fontSize: 11, marginBottom: 5 }}>
      <span style={{ color: dimColor, letterSpacing: "1px", marginRight: 6 }}>
        {label}
      </span>
      <span style={{ color: textColor, wordBreak: "break-word" }}>{displayValue}</span>
    </div>
  );
}

function LoadingBar({ percent, active, isHacker, darkMode, dimColor, threatGradient, accentColor }) {
  const barsCount = 20;
  const filledBars = Math.round((percent / 100) * barsCount);
  const isComplete = percent === 100;

  return (
    <div style={{ margin: "10px 0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 10,
          fontFamily: "monospace",
          color: dimColor,
          letterSpacing: "1px",
          marginBottom: 4,
        }}
      >
        <span>DECRYPT STREAM // STATUS</span>
        <span style={{ color: isComplete ? (isHacker ? "#3dffa0" : darkMode ? "#38bdf8" : "#0284c7") : active ? accentColor : dimColor, fontWeight: 700 }}>
          {isComplete ? "[COMPLETE]" : active ? "[DECODING...]" : "[STANDBY]"} {percent}%
        </span>
      </div>
      {/* Segmented Hacker Loading Bar tracking text decrypt progress */}
      <div
        style={{
          display: "flex",
          gap: 2,
          height: 8,
          background: isHacker ? "rgba(10, 26, 16, 0.85)" : darkMode ? "rgba(15, 23, 42, 0.8)" : "rgba(226, 232, 240, 0.8)",
          padding: 2,
          borderRadius: 2,
          border: `1px solid ${isHacker ? "rgba(61, 255, 160, 0.25)" : darkMode ? "rgba(56, 189, 248, 0.2)" : "rgba(2, 132, 199, 0.2)"}`,
        }}
      >
        {Array.from({ length: barsCount }).map((_, i) => {
          const isFilled = i < filledBars;
          const isTip = i === filledBars - 1 && active && !isComplete;
          return (
            <div
              key={i}
              style={{
                flex: 1,
                height: "100%",
                background: isFilled ? threatGradient : "transparent",
                boxShadow: isTip ? `0 0 6px ${accentColor}` : "none",
                opacity: isFilled ? (isTip ? 1 : 0.85) : 0.15,
                transition: "background 0.1s ease, opacity 0.1s ease",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

const PW = 380;
const PH_ESTIMATE = 340;
const MARGIN = 16;

export default function HackerHUD() {
  const { activeData, activeElement } = useHackerHud();
  const { theme, darkMode } = useTheme();
  const isHacker = theme === "hacker";
  const svgRef = useRef(null);
  const popupRef = useRef(null);
  const [positions, setPositions] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const animFrameRef = useRef(null);

  const hudData = useMemo(() => buildHudData(activeData), [activeData]);

  const [decryptPercent, setDecryptPercent] = useState(0);

  // Decrypt animation for header name, fields, and notes with staggered delays
  const headerName = useDecrypt(hudData?.name || "", isVisible, 0);
  const notes = useDecrypt(hudData?.notes || "", isVisible, 140, setDecryptPercent);

  const computePositions = useCallback(() => {
    if (!activeElement || !hudData) return null;

    const cardRect = activeElement.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Check where the card is and whether there's more space on the right or left
    const spaceRight = vw - cardRect.right;
    const spaceLeft = cardRect.left;
    const placeRight = spaceRight >= spaceLeft || spaceRight >= PW + 50;

    let px, py;
    if (placeRight) {
      px = cardRect.right + 60;
    } else {
      px = cardRect.left - 60 - PW;
    }

    // Place vertically offset so anchor and target always have diagonal vertical separation (`dy != 0`)
    if (cardRect.top > vh / 2) {
      py = cardRect.top - PH_ESTIMATE + cardRect.height * 0.35;
    } else {
      py = cardRect.top + cardRect.height * 0.65;
    }

    // Clamp px and py cleanly inside viewport margins
    px = Math.max(MARGIN, Math.min(vw - PW - MARGIN, px));
    py = Math.max(MARGIN, Math.min(vh - PH_ESTIMATE - MARGIN, py));

    // Anchor on card: guarantee at least 60px horizontal distance from popup box edge
    let anchorX;
    if (px >= cardRect.left + cardRect.width / 2) {
      // Popup is to the right -> anchor on card's right side, but at least 60px left of px
      anchorX = Math.min(cardRect.right, px - 60);
    } else {
      // Popup is to the left -> anchor on card's left side, but at least 60px right of px + PW
      anchorX = Math.max(cardRect.left, px + PW + 60);
    }
    const anchor = {
      x: anchorX,
      y: cardRect.top + cardRect.height / 2,
    };

    // Target on popup: closest edge (left or right) to anchor
    const boxH = popupRef.current?.offsetHeight || PH_ESTIMATE;
    const target = {
      x: anchor.x < px + PW / 2 ? px : px + PW,
      y: py + boxH * 0.45,
    };

    // Build elbow path (like a.html): horizontal segment out from card, then slanted diagonal segment to popup
    const dx = target.x - anchor.x;
    const bendX = anchor.x + dx * 0.5;
    const path = `M ${anchor.x} ${anchor.y} L ${bendX} ${anchor.y} L ${target.x} ${target.y}`;

    // Loop path: travels along connector line -> around entire outer border of Hacker HUD box -> back along connector line
    let borderLoop;
    if (target.x === px) {
      // Target on left edge -> up to TL -> across to TR -> down to BR -> across to BL -> up to target
      borderLoop = `L ${px} ${py} L ${px + PW} ${py} L ${px + PW} ${py + boxH} L ${px} ${py + boxH} L ${target.x} ${target.y}`;
    } else {
      // Target on right edge -> up to TR -> across to TL -> down to BL -> across to BR -> up to target
      borderLoop = `L ${px + PW} ${py} L ${px} ${py} L ${px} ${py + boxH} L ${px + PW} ${py + boxH} L ${target.x} ${target.y}`;
    }
    const loopPath = `${path} ${borderLoop} L ${bendX} ${anchor.y} L ${anchor.x} ${anchor.y}`;

    return { anchor, target, path, loopPath, px, py };
  }, [activeElement, hudData]);

  // Show/hide with position calculation
  useEffect(() => {
    if (activeElement && hudData) {
      const pos = computePositions();
      if (pos) {
        setPositions(pos);
        // Small delay for entrance animation
        requestAnimationFrame(() => setIsVisible(true));
      }
    } else {
      setIsVisible(false);
      const t = setTimeout(() => setPositions(null), 200);
      return () => clearTimeout(t);
    }
  }, [activeElement, hudData, computePositions]);

  // Hide on scroll
  useEffect(() => {
    const onScroll = () => {
      if (isVisible && activeElement) {
        const pos = computePositions();
        if (pos) setPositions(pos);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isVisible, activeElement, computePositions]);

  // Hide on resize
  useEffect(() => {
    const onResize = () => {
      setIsVisible(false);
      setPositions(null);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Check for hover capability
  const [hasHover, setHasHover] = useState(true);
  useEffect(() => {
    setHasHover(window.matchMedia("(hover: hover)").matches);
  }, []);

  if (!hasHover) return null;
  if (!positions || !hudData) return null;

  const statusColor = isHacker
    ? hudData.statusClass === "active" ? "#3dffa0"
      : hudData.statusClass === "compromised" ? "#ff5c5c"
      : "#ffbb55"
    : darkMode
    ? hudData.statusClass === "active" ? "#38bdf8"
      : hudData.statusClass === "compromised" ? "#f43f5e"
      : "#f59e0b"
    : hudData.statusClass === "active" ? "#0284c7"
      : hudData.statusClass === "compromised" ? "#e11d48"
      : "#d97706";

  const accentColor = isHacker ? "#3dffa0" : darkMode ? "#38bdf8" : "#0284c7";
  const bgColor = isHacker ? "rgba(10, 26, 16, 0.96)" : darkMode ? "rgba(2, 6, 23, 0.95)" : "rgba(255, 255, 255, 0.92)";
  const borderColor = isHacker ? "rgba(61, 255, 160, 0.45)" : darkMode ? "rgba(56, 189, 248, 0.35)" : "rgba(2, 132, 199, 0.25)";
  const textColor = isHacker ? "#c8ffdd" : darkMode ? "#f8fafc" : "#0f172a";
  const dimColor = isHacker ? "#4f6e58" : darkMode ? "#64748b" : "#64748b";
  const threatGradient = isHacker
    ? "linear-gradient(90deg, #79f2a3, #3dffa0)"
    : darkMode
    ? "linear-gradient(90deg, #38bdf8, #6366f1)"
    : "linear-gradient(90deg, #0284c7, #4f46e5)";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 40,
      }}
    >
      {/* SVG Connector */}
      <svg
        ref={svgRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "visible",
          filter: isHacker
            ? "drop-shadow(0 0 6px rgba(61,255,160,0.8))"
            : darkMode
            ? "drop-shadow(0 0 6px rgba(56,189,248,0.8))"
            : "drop-shadow(0 0 4px rgba(2,132,199,0.5))",
        }}
      >
        {/* Connector path */}
        <path
          d={positions.path}
          className={isVisible ? "hud-line-anim" : ""}
          fill="none"
          stroke={accentColor}
          strokeWidth="2"
          strokeDasharray="6 4"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}
        />
        {/* Anchor node on card */}
        <circle
          cx={positions.anchor.x}
          cy={positions.anchor.y}
          r="4"
          fill={accentColor}
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}
        />
        {/* Target node on popup */}
        <circle
          cx={positions.target.x}
          cy={positions.target.y}
          r="3.5"
          fill={accentColor}
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}
        />
        {/* Animated data packet traveling out, around entire HUD border, and back */}
        {isVisible && (
          <circle r="3.5" fill={textColor}>
            <animateMotion
              dur="3.8s"
              repeatCount="indefinite"
              path={positions.loopPath || positions.path}
            />
          </circle>
        )}
      </svg>

      {/* Floating Popup */}
      <div
        ref={popupRef}
        key={`${positions.px}-${positions.py}`}
        className={isVisible ? "hud-popup-anim" : ""}
        style={{
          position: "absolute",
          left: positions.px,
          top: positions.py,
          width: PW,
          background: bgColor,
          border: `1px solid ${borderColor}`,
          borderRadius: 3,
          padding: "14px 16px 16px",
          boxShadow: darkMode
            ? `0 0 0 1px rgba(56,189,248,0.12), 0 10px 30px rgba(0,0,0,0.55), 0 0 24px rgba(56,189,248,0.18)`
            : `0 0 0 1px rgba(2,132,199,0.08), 0 10px 30px rgba(0,0,0,0.1), 0 0 24px rgba(56,189,248,0.08)`,
          backdropFilter: darkMode ? "none" : "blur(20px) saturate(180%)",
          WebkitBackdropFilter: darkMode ? "none" : "blur(20px) saturate(180%)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.2s ease",
          fontFamily: "'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace",
          pointerEvents: "none",
        }}
      >
        {/* Corner brackets */}
        <span className="hud-bracket hud-bracket-tl" style={{ borderColor: accentColor }} />
        <span className="hud-bracket hud-bracket-tr" style={{ borderColor: accentColor }} />
        <span className="hud-bracket hud-bracket-bl" style={{ borderColor: accentColor }} />
        <span className="hud-bracket hud-bracket-br" style={{ borderColor: accentColor }} />

        {/* Header — Name on left, Category badge on right side */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 13,
            letterSpacing: "1px",
            color: textColor,
            fontWeight: 700,
            marginBottom: 8,
            borderBottom: `1px solid ${borderColor}`,
            paddingBottom: 8,
          }}
        >
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingRight: 8 }}>
            {headerName}
          </span>
          {/* Category on right side beside name */}
          <span
            style={{
              fontSize: 10,
              color: accentColor,
              letterSpacing: "1px",
              fontWeight: 600,
              padding: "2px 6px",
              border: `1px solid ${borderColor}`,
              borderRadius: 3,
              background: darkMode ? "rgba(56, 189, 248, 0.1)" : "rgba(2, 132, 199, 0.08)",
              flexShrink: 0,
            }}
          >
            {hudData.category}
          </span>
        </div>

        {/* Status row below header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 11,
            letterSpacing: "1px",
            fontWeight: 600,
            color: statusColor,
            marginBottom: 8,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: statusColor,
              boxShadow: `0 0 6px ${statusColor}`,
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          STATUS // {hudData.status}
        </div>

        {/* Top metadata fields right above loading bar */}
        {hudData.topFields?.map((f, i) => (
          <DecryptField
            key={i}
            label={f.label}
            value={f.value}
            active={isVisible}
            delay={20 + i * 20}
            textColor={textColor}
            dimColor={dimColor}
          />
        ))}

        {/* Hacker Segmented Loading Bar tracking exact text decrypt completion */}
        <LoadingBar
          percent={decryptPercent}
          active={isVisible}
          isHacker={isHacker}
          darkMode={darkMode}
          dimColor={dimColor}
          threatGradient={threatGradient}
          accentColor={accentColor}
        />

        {/* Bottom descriptive fields below the bar (GOAL, BUILT, MARKET, FUTURE) */}
        {hudData.bottomFields?.map((f, i) => (
          <DecryptField
            key={i + 10}
            label={f.label}
            value={f.value}
            active={isVisible}
            delay={50 + i * 20}
            textColor={textColor}
            dimColor={dimColor}
          />
        ))}

        {/* Description */}
        <div
          style={{
            fontSize: 11,
            lineHeight: 1.5,
            color: darkMode ? "#38bdf8" : "#334155",
            marginTop: 6,
            maxHeight: 80,
            overflow: "hidden",
          }}
        >
          {notes}
        </div>
      </div>
    </div>
  );
}
