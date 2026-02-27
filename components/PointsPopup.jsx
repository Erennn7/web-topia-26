"use client";

import { useGamification } from "@/context/GamificationContext";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

export default function PointsPopup() {
  const { showPointsPopup } = useGamification();

  return (
    <AnimatePresence>
      {showPointsPopup && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-primary text-white px-6 py-3 rounded-2xl shadow-xl shadow-primary/30 flex items-center gap-2 font-semibold text-sm"
        >
          <Star size={16} className="fill-white" strokeWidth={2} />
          +{showPointsPopup.amount} {showPointsPopup.reason}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
