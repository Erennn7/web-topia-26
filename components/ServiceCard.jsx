"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bookmark } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useLang } from "@/context/LanguageContext";
import { useGamification } from "@/context/GamificationContext";

export default function ServiceCard({ service, index = 0 }) {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const { t } = useLang();
  const { addPoints } = useGamification();
  const Icon = LucideIcons[service.icon] || LucideIcons.HelpCircle;
  const bookmarked = isBookmarked(service.id);

  const handleBookmark = (e) => {
    e.preventDefault();
    toggleBookmark(service.id);
    if (!bookmarked) addPoints(5, "Bookmarked!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      whileHover={{ y: -3 }}
      className="glass premium-shadow rounded-2xl p-5 transition-all duration-300 flex flex-col"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="p-2.5 rounded-xl bg-primary/10">
          <Icon size={22} className="text-primary" strokeWidth={1.8} />
        </div>
        <button onClick={handleBookmark} aria-label={bookmarked ? "Remove bookmark" : "Bookmark"} className="p-1.5 rounded-lg hover:bg-section-bg transition-colors">
          <Bookmark size={16} className={bookmarked ? "text-primary fill-primary" : "text-muted"} strokeWidth={1.8} />
        </button>
      </div>

      <span className="inline-block self-start px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-primary bg-primary/10 mb-2">
        {service.category}
      </span>

      <h3 className="text-sm font-bold text-foreground mb-1.5">{service.title}</h3>
      <p className="text-muted text-xs leading-relaxed mb-3 flex-grow line-clamp-2">{service.description}</p>

      <Link href={`/services/${service.id}`} className="inline-flex items-center gap-1.5 text-primary font-semibold text-xs hover:gap-2.5 transition-all mt-auto">
        {t.services.learnMore} <ArrowRight size={13} strokeWidth={2} />
      </Link>
    </motion.div>
  );
}
