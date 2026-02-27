"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import { GamificationProvider } from "@/context/GamificationContext";

export default function Providers({ children }) {
  return (
    <LanguageProvider>
      <GamificationProvider>
        {children}
      </GamificationProvider>
    </LanguageProvider>
  );
}
