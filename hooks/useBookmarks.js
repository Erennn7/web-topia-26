"use client";

import { useState, useEffect } from "react";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("webtopia-bookmarks");
    if (stored) {
      try {
        setBookmarks(JSON.parse(stored));
      } catch {
        setBookmarks([]);
      }
    }
  }, []);

  const toggleBookmark = (serviceId) => {
    setBookmarks((prev) => {
      const next = prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId];
      localStorage.setItem("webtopia-bookmarks", JSON.stringify(next));
      return next;
    });
  };

  const isBookmarked = (serviceId) => bookmarks.includes(serviceId);

  return { bookmarks, toggleBookmark, isBookmarked };
}
