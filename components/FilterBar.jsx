"use client";

import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";

export default function FilterBar({ categories, activeCategory, onCategoryChange }) {
  const { t } = useLang();

  return (
    <div className="flex flex-wrap gap-1.5 mb-6" role="group" aria-label="Filter by category">
      <FilterBtn label={t.services.all} active={activeCategory === "All"} onClick={() => onCategoryChange("All")} />
      {categories.map((cat) => (
        <FilterBtn key={cat} label={cat} active={activeCategory === cat} onClick={() => onCategoryChange(cat)} />
      ))}
    </div>
  );
}

function FilterBtn({ label, active, onClick }) {
  return (
    <button onClick={onClick} aria-pressed={active}
      className={`relative px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${active ? "text-white" : "text-muted bg-section-bg hover:bg-card-border"}`}>
      {active && (
        <motion.div layoutId="activeFilter" className="absolute inset-0 bg-primary rounded-xl" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  );
}
