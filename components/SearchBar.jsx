"use client";

import { useState } from "react";
import { Search, MapPin } from "lucide-react";
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
        <div className="bg-white dark:bg-card-bg border border-card-border rounded-2xl p-2 flex flex-col sm:flex-row gap-2 shadow-lg shadow-primary/5">
          <div className="flex items-center gap-2 flex-1 px-3">
            <Search size={18} className="text-muted flex-shrink-0" strokeWidth={1.8} />
            <input type="text" placeholder="Search services..." value={query} onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent py-2.5 text-foreground placeholder:text-muted outline-none text-sm" aria-label="Search services" />
          </div>
          <div className="flex items-center gap-2 flex-1 px-3 border-t sm:border-t-0 sm:border-l border-card-border">
            <MapPin size={18} className="text-muted flex-shrink-0" strokeWidth={1.8} />
            <input type="text" placeholder="Your location" value={location} onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-transparent py-2.5 text-foreground placeholder:text-muted outline-none text-sm" aria-label="Location" />
          </div>
          <button type="submit" className="bg-primary hover:bg-primary-dark text-white font-semibold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-primary/20 text-sm">
            Search
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSearch} className="w-full" role="search">
      <div className="flex items-center gap-2 bg-white dark:bg-card-bg border border-card-border rounded-xl px-4 py-2">
        <Search size={16} className="text-muted" strokeWidth={1.8} />
        <input type="text" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent py-1.5 text-foreground placeholder:text-muted outline-none text-sm" aria-label="Search" />
      </div>
    </form>
  );
}
