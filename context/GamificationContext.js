"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const GamificationContext = createContext();

const BADGES = [
  { id: "first-visit", name: "First Steps", nameHi: "पहला कदम", nameMr: "पहिले पाऊल", lucideIcon: "Sparkles", desc: "Visited WEB-TOPIA", threshold: 0 },
  { id: "explorer", name: "Explorer", nameHi: "खोजकर्ता", nameMr: "शोधक", lucideIcon: "Compass", desc: "Viewed 3 services", threshold: 30 },
  { id: "health-hero", name: "Health Hero", nameHi: "स्वास्थ्य हीरो", nameMr: "आरोग्य हिरो", lucideIcon: "Pill", desc: "Set medicine reminder", threshold: 50 },
  { id: "scheme-finder", name: "Scheme Finder", nameHi: "योजना खोजक", nameMr: "योजना शोधक", lucideIcon: "ClipboardCheck", desc: "Checked scheme eligibility", threshold: 80 },
  { id: "community", name: "Community Star", nameHi: "समुदाय सितारा", nameMr: "समुदाय तारा", lucideIcon: "Star", desc: "Earned 150 points", threshold: 150 },
  { id: "champion", name: "Senior Champion", nameHi: "वरिष्ठ चैंपियन", nameMr: "ज्येष्ठ चॅम्पियन", lucideIcon: "Trophy", desc: "Earned 300 points", threshold: 300 },
];

function getLevel(points) {
  if (points >= 300) return { level: 5, name: "Champion", min: 300, max: 500 };
  if (points >= 150) return { level: 4, name: "Expert", min: 150, max: 300 };
  if (points >= 80) return { level: 3, name: "Helper", min: 80, max: 150 };
  if (points >= 30) return { level: 2, name: "Explorer", min: 30, max: 80 };
  return { level: 1, name: "Beginner", min: 0, max: 30 };
}

export function GamificationProvider({ children }) {
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [earnedBadges, setEarnedBadges] = useState(["first-visit"]);
  const [showPointsPopup, setShowPointsPopup] = useState(null);
  const [lastVisit, setLastVisit] = useState(null);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("webtopia-gamification") || "{}");
      if (stored.points) setPoints(stored.points);
      if (stored.streak) setStreak(stored.streak);
      if (stored.badges) setEarnedBadges(stored.badges);
      if (stored.lastVisit) setLastVisit(stored.lastVisit);

      // Update streak
      const today = new Date().toDateString();
      if (stored.lastVisit) {
        const last = new Date(stored.lastVisit);
        const diff = Math.floor((new Date() - last) / (1000 * 60 * 60 * 24));
        if (diff === 1) {
          const newStreak = (stored.streak || 0) + 1;
          setStreak(newStreak);
          save({ ...stored, streak: newStreak, lastVisit: today });
        } else if (diff > 1) {
          setStreak(1);
          save({ ...stored, streak: 1, lastVisit: today });
        }
      } else {
        setStreak(1);
        save({ ...stored, streak: 1, lastVisit: today });
      }
    } catch {
      // Fresh state
    }
  }, []);

  function save(data) {
    localStorage.setItem("webtopia-gamification", JSON.stringify(data));
  }

  const addPoints = useCallback((amount, reason) => {
    setPoints((prev) => {
      const newPoints = prev + amount;
      const newBadges = [...earnedBadges];
      BADGES.forEach((b) => {
        if (newPoints >= b.threshold && !newBadges.includes(b.id)) {
          newBadges.push(b.id);
        }
      });
      setEarnedBadges(newBadges);
      save({ points: newPoints, streak, badges: newBadges, lastVisit: new Date().toDateString() });
      setShowPointsPopup({ amount, reason });
      setTimeout(() => setShowPointsPopup(null), 2000);
      return newPoints;
    });
  }, [earnedBadges, streak]);

  const level = getLevel(points);
  const progress = Math.min(((points - level.min) / (level.max - level.min)) * 100, 100);

  return (
    <GamificationContext.Provider value={{
      points, streak, earnedBadges, addPoints, level, progress,
      allBadges: BADGES, showPointsPopup,
    }}>
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  const ctx = useContext(GamificationContext);
  if (!ctx) throw new Error("useGamification must be used within GamificationProvider");
  return ctx;
}
