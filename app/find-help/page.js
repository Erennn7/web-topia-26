"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { MapPin, Search, Phone, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import AnimatedBackground from "@/components/AnimatedBackground";
import PageTransition from "@/components/PageTransition";
import services from "@/data/services.json";

const locations = ["New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ", "Mumbai, MH", "Pune, MH", "Delhi, DL", "Bangalore, KA", "Chennai, TN"];

function getDistance() { return (Math.random() * 5 + 0.5).toFixed(1); }

export default function FindHelpPage() {
  const { t } = useLang();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const nearbyServices = useMemo(() => {
    if (!selectedLocation && !searchInput) return [];
    return services.map((s) => ({ ...s, distance: getDistance() })).sort((a, b) => a.distance - b.distance);
  }, [selectedLocation, searchInput]);

  const handleSearch = (e) => { e.preventDefault(); setHasSearched(true); };

  return (
    <PageTransition className="min-h-screen py-8 lg:py-10 relative">
      <AnimatedBackground />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <MapPin size={28} strokeWidth={1.8} className="text-primary mx-auto mb-2" />
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">{t.findHelp.title}</h1>
          <p className="text-muted text-sm">{t.findHelp.subtitle}</p>
        </motion.div>

        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="max-w-lg mx-auto bg-white dark:bg-card-bg border border-card-border rounded-2xl p-4 mb-8 space-y-3 hover:shadow-lg hover:shadow-primary/10 transition-shadow">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">{t.findHelp.selectCity}</label>
            <select value={selectedLocation} onChange={(e) => { setSelectedLocation(e.target.value); setHasSearched(false); }}
              className="w-full bg-section-bg text-foreground rounded-xl px-3 py-2 border border-card-border outline-none text-sm">
              <option value="">Choose...</option>
              {locations.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input type="text" placeholder={t.findHelp.enterZip} value={searchInput}
              onChange={(e) => { setSearchInput(e.target.value); setHasSearched(false); }}
              className="flex-1 bg-section-bg text-foreground rounded-xl px-3 py-2 border border-card-border outline-none text-sm" />
            <button type="submit" className="bg-primary text-white px-4 rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors">
              {t.findHelp.search}
            </button>
          </form>
        </motion.div>

        {/* Map Placeholder */}
        <div className="bg-white dark:bg-card-bg border border-card-border rounded-2xl h-48 lg:h-60 flex items-center justify-center mb-8 relative overflow-hidden hover:shadow-lg hover:shadow-primary/10 transition-shadow">
          <div className="text-center">
            <MapPin size={32} strokeWidth={1.8} className="text-primary mx-auto mb-2 animate-bounce" />
            <p className="text-foreground text-sm font-medium">
              {selectedLocation || searchInput ? `${selectedLocation || searchInput}` : t.findHelp.mapPlaceholder}
            </p>
          </div>
          {(selectedLocation || hasSearched) && (
            <>
              <div className="absolute top-12 left-1/4 text-primary"><MapPin size={18} strokeWidth={1.8} /></div>
              <div className="absolute top-20 right-1/3 text-secondary"><MapPin size={18} strokeWidth={1.8} /></div>
              <div className="absolute bottom-16 left-1/3 text-accent"><MapPin size={18} strokeWidth={1.8} /></div>
            </>
          )}
        </div>

        {/* Results */}
        {(selectedLocation || hasSearched) && nearbyServices.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-foreground mb-4">{t.findHelp.nearby}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {nearbyServices.map((s, i) => (
                <motion.div key={s.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                  className="bg-white dark:bg-card-bg border border-card-border rounded-2xl p-4 hover:shadow-lg hover:shadow-primary/10 transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{s.category}</span>
                    <span className="text-[10px] text-muted flex items-center gap-0.5"><MapPin size={10} strokeWidth={1.8} /> {s.distance} mi</span>
                  </div>
                  <h3 className="font-bold text-foreground text-sm mb-1">{s.title}</h3>
                  <div className="flex items-center gap-3 text-[10px] text-muted mb-2">
                    <span className="flex items-center gap-0.5"><Phone size={10} strokeWidth={1.8} /> {s.contact.phone}</span>
                  </div>
                  <Link href={`/services/${s.id}`} className="text-primary font-semibold text-xs flex items-center gap-1 hover:gap-1.5 transition-all">
                    Details <ArrowRight size={12} strokeWidth={1.8} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
