"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { ChevronDown, FileText, ShieldCheck, ShieldAlert, Apple, Heart, Users, Dumbbell, Home } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import resources from "@/data/resources.json";

const iconMap = { FileText, ShieldCheck, ShieldAlert, Apple, Heart, Users, Dumbbell, Home };
const catColors = {
  Healthcare: "bg-sky", Safety: "bg-peach", Nutrition: "bg-warm",
  Wellbeing: "bg-mint", Caregiving: "bg-lavender", Housing: "bg-peach",
};

export default function ResourcesPage() {
  const { t } = useLang();
  const [activeTab, setActiveTab] = useState("All");
  const categories = ["All", ...new Set(resources.map((r) => r.category))];
  const filtered = activeTab === "All" ? resources : resources.filter((r) => r.category === activeTab);

  return (
    <div className="min-h-screen py-8 lg:py-10 relative">
      <AnimatedBackground />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">{t.resources.title}</h1>
          <p className="text-muted text-sm">{t.resources.subtitle}</p>
        </motion.div>

        <div className="flex flex-wrap gap-1.5 justify-center mb-8">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveTab(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === cat ? "bg-primary text-white" : "bg-section-bg text-muted hover:bg-card-border"}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((r, i) => <ResourceCard key={r.id} resource={r} index={i} />)}
        </div>
      </div>
    </div>
  );
}

function ResourceCard({ resource, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = iconMap[resource.icon] || FileText;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }}
      className="bg-white dark:bg-card-bg border border-card-border rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-primary/10 transition-shadow">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center gap-3 p-4 text-left hover:bg-section-bg transition-colors" aria-expanded={isOpen}>
        <div className={`p-2 rounded-xl ${catColors[resource.category] || "bg-section-bg"} flex-shrink-0`}>
          <Icon size={18} strokeWidth={1.8} className="text-foreground/60" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-semibold text-primary">{resource.category}</span>
          <h3 className="font-bold text-foreground text-sm">{resource.title}</h3>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} strokeWidth={1.8} className="text-muted" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
            <div className="px-4 pb-4 border-t border-card-border pt-3 space-y-3">
              {resource.content.map((s, i) => (
                <div key={i}>
                  <h4 className="font-semibold text-foreground text-xs mb-0.5">{s.heading}</h4>
                  <p className="text-muted text-xs leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
