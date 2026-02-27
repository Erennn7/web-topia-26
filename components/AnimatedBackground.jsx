"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground({ variant = "default" }) {
  if (variant === "hero") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-10 left-[10%] w-40 h-40 bg-primary/[0.06] rounded-full blur-2xl animate-float-slow" />
        <div className="absolute top-32 right-[15%] w-28 h-28 bg-accent/[0.08] rounded-full blur-xl animate-float-medium" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-20 left-[20%] w-36 h-36 bg-primary-light/[0.05] rounded-full blur-2xl animate-float-medium" style={{ animationDelay: "3s" }} />
        <div className="absolute bottom-10 right-[10%] w-48 h-48 bg-secondary/[0.04] rounded-full blur-3xl animate-float-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-[5%] w-20 h-20 bg-primary/[0.07] rounded-full blur-lg animate-pulse-soft" />
        <div className="absolute top-20 left-[50%] w-16 h-16 bg-accent/[0.06] rounded-full blur-lg animate-float-fast" style={{ animationDelay: "4s" }} />

        {/* Subtle grid dots */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="currentColor" className="text-primary" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>
    );
  }

  if (variant === "section") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-8 right-[8%] w-32 h-32 bg-primary/[0.04] rounded-full blur-2xl animate-float-slow" />
        <div className="absolute bottom-12 left-[12%] w-24 h-24 bg-accent/[0.05] rounded-full blur-xl animate-float-medium" style={{ animationDelay: "2s" }} />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute top-16 right-[20%] w-24 h-24 bg-primary/[0.04] rounded-full blur-2xl animate-float-slow" />
      <div className="absolute bottom-16 left-[15%] w-20 h-20 bg-accent/[0.05] rounded-full blur-xl animate-float-medium" style={{ animationDelay: "1.5s" }} />
    </div>
  );
}
