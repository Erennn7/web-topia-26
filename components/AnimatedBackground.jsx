"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground({ variant = "default" }) {
  if (variant === "hero") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Warm glows */}
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 15, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-warm dark:bg-warm blur-[150px] opacity-60"
        />
        <motion.div
          animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute top-20 -right-40 w-[500px] h-[500px] rounded-full bg-warm-dark dark:bg-warm-dark blur-[140px] opacity-40"
        />

        {/* Flowing wave lines — 3 layers at different speeds and directions */}
        <motion.svg
          className="absolute w-[200%] h-[60%] top-[15%] left-0"
          viewBox="0 0 2400 400" fill="none"
          animate={{ x: [0, -1200] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          <path d="M0,200 C150,260 300,140 450,200 C600,260 750,140 900,200 C1050,260 1200,140 1350,200 C1500,260 1650,140 1800,200 C1950,260 2100,140 2400,200" stroke="var(--primary)" strokeWidth="1.2" opacity="0.09" />
          <path d="M0,160 C200,100 350,220 550,160 C750,100 900,220 1100,160 C1300,100 1450,220 1650,160 C1850,100 2000,220 2200,160 C2400,100 2400,160 2400,160" stroke="var(--accent)" strokeWidth="1" opacity="0.07" />
          <path d="M0,250 C180,310 360,190 540,250 C720,310 900,190 1080,250 C1260,310 1440,190 1620,250 C1800,310 1980,190 2160,250 C2340,310 2400,250 2400,250" stroke="var(--secondary)" strokeWidth="1.2" opacity="0.06" />
        </motion.svg>

        <motion.svg
          className="absolute w-[200%] h-[50%] top-[35%] left-0"
          viewBox="0 0 2400 400" fill="none"
          animate={{ x: [-1200, 0] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
          <path d="M0,180 C200,120 400,240 600,180 C800,120 1000,240 1200,180 C1400,120 1600,240 1800,180 C2000,120 2200,240 2400,180" stroke="var(--primary)" strokeWidth="1" opacity="0.06" />
          <path d="M0,280 C250,220 500,340 750,280 C1000,220 1250,340 1500,280 C1750,220 2000,340 2250,280 C2400,240 2400,280 2400,280" stroke="var(--accent)" strokeWidth="0.8" opacity="0.05" />
        </motion.svg>
      </div>
    );
  }

  return null;
}
