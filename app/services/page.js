"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { useGamification } from "@/context/GamificationContext";
import services from "@/data/services.json";
import ServiceCard from "@/components/ServiceCard";
import FilterBar from "@/components/FilterBar";

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted">Loading...</div>}>
      <ServicesContent />
    </Suspense>
  );
}

function ServicesContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const { t } = useLang();
  const { addPoints } = useGamification();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchText, setSearchText] = useState(searchQuery);

  const categories = useMemo(() => [...new Set(services.map((s) => s.category))], []);

  const filteredServices = useMemo(() => {
    let result = services;
    if (activeCategory !== "All") result = result.filter((s) => s.category === activeCategory);
    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      result = result.filter((s) => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.category.toLowerCase().includes(q));
    }
    return result;
  }, [activeCategory, searchText]);

  return (
    <div className="min-h-screen py-8 lg:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">{t.services.title}</h1>
          <p className="text-muted text-sm mb-5">{t.services.subtitle}</p>
          <div className="max-w-sm mx-auto">
            <input type="text" placeholder={t.hero.search} value={searchText} onChange={(e) => setSearchText(e.target.value)}
              className="w-full bg-card-bg border border-card-border rounded-xl px-4 py-2 text-sm text-foreground placeholder:text-muted outline-none focus:border-primary" aria-label="Search" />
          </div>
        </motion.div>

        <FilterBar categories={categories} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

        <p className="text-muted text-xs mb-4">{t.services.showing} {filteredServices.length}</p>

        {filteredServices.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-muted mb-3">{t.services.noResults}</p>
            <button onClick={() => { setActiveCategory("All"); setSearchText(""); }} className="text-primary font-semibold text-sm hover:underline">
              {t.services.clearFilters}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
