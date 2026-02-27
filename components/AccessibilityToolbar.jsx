"use client";

import { useTheme } from "next-themes";
import { useAccessibility } from "@/hooks/useAccessibility";
import { useLang } from "@/context/LanguageContext";
import { Sun, Moon, ZoomIn, ZoomOut, BookOpen, Eye, Glasses } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const READING_MODES = ["normal", "comfortable", "focus"];

export default function AccessibilityToolbar() {
  const { theme, setTheme } = useTheme();
  const { increaseFontSize, decreaseFontSize, canIncrease, canDecrease } = useAccessibility();
  const { t } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [readingMode, setReadingMode] = useState("normal");

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("webtopia-reading");
    if (stored) setReadingMode(stored);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    READING_MODES.forEach((m) => html.classList.remove(`reading-${m}`));
    if (readingMode !== "normal") html.classList.add(`reading-${readingMode}`);
    localStorage.setItem("webtopia-reading", readingMode);
  }, [readingMode]);

  const cycleReading = () => {
    const idx = READING_MODES.indexOf(readingMode);
    setReadingMode(READING_MODES[(idx + 1) % READING_MODES.length]);
  };

  const readingIcons = { normal: Eye, comfortable: BookOpen, focus: Glasses };
  const ReadingIcon = readingIcons[readingMode];
  const readingLabels = { normal: t.reading.normal, comfortable: t.reading.comfortable, focus: t.reading.focus };

  if (!mounted) return null;

  return (
    <div className="fixed right-3 top-1/2 -translate-y-1/2 z-50">
      <button onClick={() => setIsOpen(!isOpen)} className="bg-primary text-white p-2.5 rounded-full shadow-lg hover:bg-primary-dark transition-colors text-sm font-bold" aria-label="Accessibility toolbar">
        A+
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="absolute right-12 top-0 bg-card-bg border border-card-border rounded-2xl shadow-xl p-2 flex flex-col gap-1.5">
            <ToolbarBtn onClick={() => setTheme(theme === "dark" ? "light" : "dark")} label={theme === "dark" ? "Light" : "Dark"} icon={theme === "dark" ? <Sun size={18} /> : <Moon size={18} />} />
            <ToolbarBtn onClick={increaseFontSize} label="A+" icon={<ZoomIn size={18} />} disabled={!canIncrease} />
            <ToolbarBtn onClick={decreaseFontSize} label="A-" icon={<ZoomOut size={18} />} disabled={!canDecrease} />
            <ToolbarBtn onClick={cycleReading} label={readingLabels[readingMode]} icon={<ReadingIcon size={18} />} badge={readingMode[0].toUpperCase()} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ToolbarBtn({ onClick, label, icon, disabled, badge }) {
  return (
    <button onClick={onClick} disabled={disabled} aria-label={label} title={label} className={`relative p-2 rounded-xl transition-all bg-section-bg text-foreground hover:bg-primary hover:text-white ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}>
      {icon}
      {badge && <span className="absolute -top-1 -right-1 bg-secondary text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{badge}</span>}
    </button>
  );
}
