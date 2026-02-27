"use client";

import { useState, useEffect, useCallback } from "react";

const FONT_SIZES = ["text-base", "text-lg", "text-xl", "text-2xl"];

export function useAccessibility() {
  const [fontSizeIndex, setFontSizeIndex] = useState(0);
  const [caregiverMode, setCaregiverMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("webtopia-fontsize");
    if (stored) setFontSizeIndex(Number(stored));
    const cg = localStorage.getItem("webtopia-caregiver");
    if (cg === "true") setCaregiverMode(true);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    FONT_SIZES.forEach((cls) => html.classList.remove(cls));
    html.classList.add(FONT_SIZES[fontSizeIndex]);
    localStorage.setItem("webtopia-fontsize", fontSizeIndex.toString());
  }, [fontSizeIndex]);

  const increaseFontSize = useCallback(() => {
    setFontSizeIndex((prev) => Math.min(prev + 1, FONT_SIZES.length - 1));
  }, []);

  const decreaseFontSize = useCallback(() => {
    setFontSizeIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const toggleCaregiverMode = useCallback(() => {
    setCaregiverMode((prev) => {
      localStorage.setItem("webtopia-caregiver", (!prev).toString());
      return !prev;
    });
  }, []);

  return {
    fontSizeIndex,
    fontSizeLabel: FONT_SIZES[fontSizeIndex],
    increaseFontSize,
    decreaseFontSize,
    caregiverMode,
    toggleCaregiverMode,
    canIncrease: fontSizeIndex < FONT_SIZES.length - 1,
    canDecrease: fontSizeIndex > 0,
  };
}
