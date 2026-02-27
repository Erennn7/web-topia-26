"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import {
  Menu, X, Home, Stethoscope, BookOpen, MapPin,
  AlertTriangle, Info, Phone, FileText, Pill, Leaf,
} from "lucide-react";

const langFlags = { en: "EN", hi: "हि", mr: "म" };

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, switchLang, t } = useLang();

  const navLinks = [
    { href: "/", label: t.nav.home, icon: Home },
    { href: "/services", label: t.nav.services, icon: Stethoscope },
    { href: "/schemes", label: t.nav.schemes, icon: FileText },
    { href: "/medicine-reminder", label: t.nav.medicine, icon: Pill },
    { href: "/resources", label: t.nav.resources, icon: BookOpen },
    { href: "/find-help", label: t.nav.findHelp, icon: MapPin },
    { href: "/about", label: t.nav.about, icon: Info },
    { href: "/contact", label: t.nav.contact, icon: Phone },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-white/90 dark:bg-card-bg/90 backdrop-blur-md border-b border-card-border" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary text-white p-1.5 rounded-xl group-hover:bg-primary-dark transition-colors">
              <Leaf size={18} strokeWidth={2} />
            </div>
            <span className="text-lg lg:text-xl font-bold text-foreground">
              WEB-<span className="text-primary">TOPIA</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted hover:text-primary hover:bg-primary/5 transition-all">
                <link.icon size={14} strokeWidth={1.8} />
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-section-bg rounded-lg p-0.5 border border-card-border">
              {Object.keys(langFlags).map((l) => (
                <button key={l} onClick={() => switchLang(l)}
                  className={`px-2 py-1 rounded-md text-xs font-semibold transition-all ${lang === l ? "bg-primary text-white shadow-sm" : "text-muted hover:text-foreground"}`}>
                  {langFlags[l]}
                </button>
              ))}
            </div>

            <Link href="/emergency" className="hidden sm:flex items-center gap-1.5 bg-emergency-red text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-600 transition-colors">
              <AlertTriangle size={14} strokeWidth={2} /> SOS
            </Link>

            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg text-foreground hover:bg-section-bg" aria-label={mobileOpen ? "Close menu" : "Open menu"}>
              {mobileOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="lg:hidden border-t border-card-border bg-white dark:bg-card-bg overflow-hidden">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-primary/5 hover:text-primary transition-all">
                  <link.icon size={18} strokeWidth={1.8} />
                  {link.label}
                </Link>
              ))}
              <Link href="/emergency" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold bg-emergency-red text-white mt-2">
                <AlertTriangle size={18} strokeWidth={2} /> {t.nav.emergency} SOS
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
