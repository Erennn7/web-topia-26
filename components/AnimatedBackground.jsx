"use client";

import { motion } from "framer-motion";

const wavePath1 = "M0,120 C160,180 320,60 480,120 C640,180 800,60 960,120 C1120,180 1280,60 1440,120";
const wavePath2 = "M0,160 C200,100 360,220 540,160 C720,100 900,220 1080,160 C1260,100 1440,220 1600,160";
const wavePath3 = "M0,200 C180,260 360,140 540,200 C720,260 900,140 1080,200 C1260,260 1440,140 1600,200";
const wavePath4 = "M0,80 C240,140 400,20 600,80 C800,140 1000,20 1200,80 C1400,140 1600,20 1800,80";
const wavePath5 = "M0,240 C200,180 440,300 640,240 C840,180 1040,300 1240,240 C1440,180 1600,300 1800,240";

function WaveLines({ opacity = 0.06, yOffset = 0, speed = 25, className = "" }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} style={{ top: yOffset }}>
      <motion.svg
        viewBox="0 0 1600 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute w-[200%] h-full left-0 top-0"
        animate={{ x: [0, -800] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        style={{ opacity }}
      >
        <path d={wavePath1} stroke="currentColor" strokeWidth="1.5" className="text-primary" />
        <path d={wavePath2} stroke="currentColor" strokeWidth="1" className="text-primary" />
        <path d={wavePath3} stroke="currentColor" strokeWidth="1.5" className="text-secondary" />
      </motion.svg>
    </div>
  );
}

function WaveLinesReverse({ opacity = 0.04, yOffset = 0, speed = 35, className = "" }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} style={{ top: yOffset }}>
      <motion.svg
        viewBox="0 0 1800 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute w-[200%] h-full -left-[50%] top-0"
        animate={{ x: [0, 900] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        style={{ opacity }}
      >
        <path d={wavePath4} stroke="currentColor" strokeWidth="1" className="text-accent" />
        <path d={wavePath5} stroke="currentColor" strokeWidth="1.5" className="text-primary" />
      </motion.svg>
    </div>
  );
}

export default function AnimatedBackground({ variant = "default" }) {
  if (variant === "hero") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Soft warm glows */}
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

        {/* Wave lines — top set flowing right */}
        <WaveLines opacity={0.055} yOffset={60} speed={30} />
        {/* Wave lines — middle set flowing left */}
        <WaveLinesReverse opacity={0.04} yOffset={200} speed={40} />
        {/* Wave lines — bottom set flowing right, slower */}
        <WaveLines opacity={0.035} yOffset={380} speed={50} />
      </div>
    );
  }

  if (variant === "section") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          animate={{ y: [0, -12, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 right-[5%] w-[400px] h-[400px] rounded-full bg-warm dark:bg-warm blur-[120px]"
        />
        <WaveLines opacity={0.03} yOffset={80} speed={45} />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        animate={{ opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] right-[10%] w-[400px] h-[400px] rounded-full bg-warm dark:bg-warm blur-[130px]"
      />
    </div>
  );
}
