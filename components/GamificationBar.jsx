"use client";

import { useGamification } from "@/context/GamificationContext";
import { useLang } from "@/context/LanguageContext";
import { Trophy, Flame, Star } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function GamificationBar() {
  const { points, streak, level, progress, earnedBadges, allBadges } = useGamification();
  const { t } = useLang();
  const [showBadges, setShowBadges] = useState(false);

  return (
    <>
      <div className="bg-white dark:bg-card-bg border-b border-card-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-primary font-semibold">
              <Trophy size={13} strokeWidth={2} />
              <span>{t.gamification.level} {level.level}</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 bg-section-bg rounded-full px-2.5 py-0.5">
              <Star size={11} className="text-primary" strokeWidth={2} />
              <span className="font-semibold text-foreground">{points}</span>
              <span className="text-muted text-[10px]">{t.gamification.points}</span>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-primary/70 font-medium">
              <Flame size={12} strokeWidth={2} />
              <span>{streak} {t.gamification.streak}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-1 max-w-44">
            <div className="flex-1 h-1.5 bg-card-border rounded-full overflow-hidden">
              <motion.div className="h-full bg-primary rounded-full" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.8 }} />
            </div>
            <button onClick={() => setShowBadges(!showBadges)} className="text-[10px] text-primary font-medium hover:underline whitespace-nowrap">
              {earnedBadges.length}/{allBadges.length} {t.gamification.badges}
            </button>
          </div>
        </div>
      </div>

      {showBadges && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-card-bg border-b border-card-border shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
            <div className="flex flex-wrap gap-2">
              {allBadges.map((badge) => {
                const earned = earnedBadges.includes(badge.id);
                const BadgeIcon = LucideIcons[badge.lucideIcon] || Star;
                return (
                  <div key={badge.id} className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs transition-all ${
                    earned ? "bg-primary/10 border border-primary/20" : "bg-section-bg border border-card-border opacity-40"
                  }`}>
                    <BadgeIcon size={14} className={earned ? "text-primary" : "text-muted"} strokeWidth={1.8} />
                    <span className={`font-medium ${earned ? "text-foreground" : "text-muted"}`}>{badge.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
