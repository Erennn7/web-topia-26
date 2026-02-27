"use client";

import { useState } from "react";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchBar({ variant = "hero" }) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (location) params.set("loc", location);
    router.push(`/services?${params.toString()}`);
  };

  if (variant === "hero") {
    return (
      <form onSubmit={handleSearch} className="w-full max-w-xl mx-auto" role="search">
        <div className="flex items-center gap-2 bg-card-bg dark:bg-card-bg rounded-full px-5 py-3 border border-card-border shadow-sm">
          <Search size={16} className="text-muted shrink-0" strokeWidth={1.8} />
          <input
            type="text"
            placeholder="Search services, schemes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-foreground placeholder:text-muted/50 outline-none text-sm min-w-0"
            aria-label="Search services"
          />
          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-card-border">
            <MapPin size={14} className="text-muted shrink-0" strokeWidth={1.8} />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent text-foreground placeholder:text-muted/50 outline-none text-sm w-24"
              aria-label="Location"
            />
          </div>
          <button
            type="submit"
            className="bg-foreground dark:bg-foreground text-background dark:text-background p-2 rounded-full hover:opacity-90 transition-opacity shrink-0"
            aria-label="Search"
          >
            <ArrowRight size={14} strokeWidth={2} />
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSearch} className="w-full" role="search">
      <div className="flex items-center gap-2 bg-card-bg dark:bg-card-bg border border-card-border rounded-lg px-3 py-2">
        <Search size={14} className="text-muted shrink-0" strokeWidth={1.8} />
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent py-1 text-foreground placeholder:text-muted/50 outline-none text-sm"
          aria-label="Search"
        />
      </div>
    </form>
  );
}
