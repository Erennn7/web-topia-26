"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import {
  Menu, X, Home, Stethoscope, BookOpen, MapPin,
  AlertTriangle, Info, Phone, FileText, Pill, Leaf, Smartphone,
} from "lucide-react";

const langFlags = { en: "EN", hi: "हि", mr: "म" };

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, switchLang, t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t.nav.home, icon: Home },
    { href: "/services", label: t.nav.services, icon: Stethoscope },
    { href: "/schemes", label: t.nav.schemes, icon: FileText },
    { href: "/medicine-reminder", label: t.nav.medicine, icon: Pill },
    { href: "/digital-learning", label: t.nav.digitalLearning || "Learn", icon: Smartphone },
    { href: "/resources", label: t.nav.resources, icon: BookOpen },
    { href: "/find-help", label: t.nav.findHelp, icon: MapPin },
    { href: "/about", label: t.nav.about, icon: Info },
    { href: "/contact", label: t.nav.contact, icon: Phone },
  ];

  return (
    <nav
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 dark:bg-background/80 backdrop-blur-xl border-b border-card-border"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 group">
            <Leaf size={18} className="text-primary" strokeWidth={1.8} />
            <span className="text-base font-semibold text-foreground tracking-tight">
              WEB-TOPIA
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3 py-1.5 rounded-lg text-[13px] text-muted hover:text-foreground transition-colors duration-150 group/nav"
              >
                {link.label}
                <span className="absolute bottom-0.5 left-3 right-3 h-px bg-primary scale-x-0 group-hover/nav:scale-x-100 transition-transform duration-200 origin-left" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-lg p-0.5 border border-card-border bg-card-bg dark:bg-card-bg">
              {Object.keys(langFlags).map((l) => (
                <button
                  key={l}
                  onClick={() => switchLang(l)}
                  className={`px-2 py-1 rounded-md text-xs font-medium transition-all duration-150 ${
                    lang === l ? "bg-foreground text-background" : "text-muted hover:text-foreground"
                  }`}
                >
                  {langFlags[l]}
                </button>
              ))}
            </div>

            <Link href="/emergency" className="hidden sm:flex items-center gap-1.5 bg-emergency-red text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:opacity-90 transition-opacity">
              <AlertTriangle size={12} strokeWidth={2} /> SOS
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-1.5 rounded-lg text-foreground hover:bg-section-bg transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-card-border bg-background dark:bg-background overflow-hidden"
          >
            <div className="px-4 py-2 space-y-0.5">
              {navLinks.map((link, i) => (
                <motion.div key={link.href} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-warm transition-colors"
                  >
                    <link.icon size={16} strokeWidth={1.5} className="text-muted" />
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
