"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { useGamification } from "@/context/GamificationContext";
import { useEffect, useState } from "react";
import {
  Heart, UtensilsCrossed, Car, Scale, DollarSign, HeartHandshake,
  Shield, Clock, Users, Star, ArrowRight, Phone, FileText, Pill,
  Sparkles, Trophy, Flame, Award, Zap, Search, MapPin,
} from "lucide-react";
import SearchBar from "@/components/SearchBar";
import AnimatedBackground from "@/components/AnimatedBackground";

const fadeIn = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4 },
};

const quickServices = [
  { icon: Heart, label: "healthcare", href: "/services/healthcare-checkups", bg: "bg-green-50 dark:bg-green-900/20", iconColor: "text-green-600 dark:text-green-400" },
  { icon: UtensilsCrossed, label: "meals", href: "/services/home-delivered-meals", bg: "bg-emerald-50 dark:bg-emerald-900/20", iconColor: "text-emerald-600 dark:text-emerald-400" },
  { icon: Car, label: "transport", href: "/services/senior-transport", bg: "bg-teal-50 dark:bg-teal-900/20", iconColor: "text-teal-600 dark:text-teal-400" },
  { icon: Scale, label: "legal", href: "/services/legal-aid-seniors", bg: "bg-green-50 dark:bg-green-900/20", iconColor: "text-green-600 dark:text-green-400" },
  { icon: DollarSign, label: "financial", href: "/services/financial-assistance", bg: "bg-emerald-50 dark:bg-emerald-900/20", iconColor: "text-emerald-600 dark:text-emerald-400" },
  { icon: HeartHandshake, label: "companion", href: "/services/companion-care", bg: "bg-teal-50 dark:bg-teal-900/20", iconColor: "text-teal-600 dark:text-teal-400" },
  { icon: FileText, label: "schemes", href: "/schemes", bg: "bg-green-50 dark:bg-green-900/20", iconColor: "text-green-600 dark:text-green-400" },
  { icon: Pill, label: "medicine", href: "/medicine-reminder", bg: "bg-emerald-50 dark:bg-emerald-900/20", iconColor: "text-emerald-600 dark:text-emerald-400" },
];

const features = [
  { icon: Shield, key: "trust" },
  { icon: Zap, key: "quick" },
  { icon: Users, key: "community" },
  { icon: Heart, key: "care" },
];

const testimonials = [
  { name: "Margaret, 72", text: "Found meal delivery I didn't know existed!", nameHi: "मार्गरेट, 72", textHi: "भोजन सेवा मिली जो मुझे पता नहीं थी!", nameMr: "मार्गरेट, 72", textMr: "जेवणाची सेवा मिळाली जी माहीतच नव्हती!" },
  { name: "James, 68", text: "Companion care changed my life.", nameHi: "जेम्स, 68", textHi: "साथी सेवा ने मेरा जीवन बदल दिया।", nameMr: "जेम्स, 68", textMr: "सोबती सेवेने माझे आयुष्य बदलले." },
  { name: "Linda, 65", text: "Found respite care for my mother.", nameHi: "लिंडा, 65", textHi: "मेरी माँ के लिए विराम सेवा मिली।", nameMr: "लिंडा, 65", textMr: "आईसाठी विश्रांती सेवा मिळाली." },
];

export default function HomePage() {
  const { t, lang } = useLang();
  const { addPoints, points, streak } = useGamification();
  const [visited, setVisited] = useState(false);

  useEffect(() => {
    if (!visited) {
      setVisited(true);
      const hasVisited = sessionStorage.getItem("webtopia-home-visited");
      if (!hasVisited) {
        addPoints(5, "Welcome!");
        sessionStorage.setItem("webtopia-home-visited", "true");
      }
    }
  }, [visited, addPoints]);

  const gl = (item, field) => {
    if (lang === "hi" && item[field + "Hi"]) return item[field + "Hi"];
    if (lang === "mr" && item[field + "Mr"]) return item[field + "Mr"];
    return item[field];
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative py-14 lg:py-20 overflow-hidden">
        <AnimatedBackground variant="hero" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-1.5 bg-white dark:bg-card-bg text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-5 shadow-sm border border-card-border"
            >
              <Sparkles size={14} className="text-primary-light" /> {t.hero.badge}
            </motion.span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
              {t.hero.title}
            </h1>
            <p className="text-muted text-base lg:text-lg mb-7 max-w-md mx-auto">
              {t.hero.subtitle}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <SearchBar variant="hero" />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <Link href="/services" className="bg-primary hover:bg-primary-dark text-white font-semibold px-7 py-2.5 rounded-xl transition-all hover:shadow-lg hover:shadow-primary/20 flex items-center gap-2 text-sm">
              {t.hero.cta} <ArrowRight size={16} />
            </Link>
            <Link href="/emergency" className="bg-white dark:bg-card-bg border border-emergency-red text-emergency-red font-semibold px-7 py-2.5 rounded-xl transition-all hover:bg-emergency-red hover:text-white flex items-center gap-2 text-sm">
              <Phone size={16} /> {t.hero.sos}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="relative py-12 lg:py-16 bg-white dark:bg-card-bg">
        <AnimatedBackground variant="section" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t.quickAccess.title}</h2>
            <p className="text-muted text-sm mt-1">{t.quickAccess.subtitle}</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4">
            {quickServices.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Link href={s.href} className="flex flex-col items-center gap-3 p-5 bg-section-bg dark:bg-section-bg border border-card-border rounded-2xl hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 group">
                  <motion.div
                    whileHover={{ rotate: [0, -8, 8, -4, 0], scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    className={`p-3.5 rounded-xl ${s.bg}`}
                  >
                    <s.icon size={26} className={s.iconColor} strokeWidth={1.8} />
                  </motion.div>
                  <span className="font-semibold text-foreground text-sm">{t.categories[s.label]}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Lumis */}
      <section className="relative py-12 lg:py-16">
        <AnimatedBackground variant="section" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 {...fadeIn} className="text-2xl lg:text-3xl font-bold text-foreground text-center mb-8">
            {t.benefits.title}
          </motion.h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {features.map((f, i) => (
              <motion.div key={f.key} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-card-bg border border-card-border rounded-2xl p-5 text-center hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-3">
                  <f.icon size={22} className="text-primary" strokeWidth={1.8} />
                </div>
                <h3 className="font-bold text-foreground text-sm mb-1">{t.benefits[f.key]}</h3>
                <p className="text-muted text-xs leading-relaxed">{t.benefits[f.key + "Desc"]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gamification */}
      <section className="py-12 lg:py-16 bg-white dark:bg-card-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: Trophy, value: points, label: t.gamification.points, bg: "bg-green-50 dark:bg-green-900/20", color: "text-green-600 dark:text-green-400" },
              { icon: Flame, value: `${streak} days`, label: t.gamification.streak, bg: "bg-emerald-50 dark:bg-emerald-900/20", color: "text-emerald-600 dark:text-emerald-400" },
              { icon: Award, value: "Level up!", label: t.gamification.badges, bg: "bg-teal-50 dark:bg-teal-900/20", color: "text-teal-600 dark:text-teal-400" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.03 }}
                className="border border-card-border rounded-2xl p-6 text-center bg-section-bg hover:shadow-md transition-all">
                <div className={`inline-flex p-3 rounded-xl ${item.bg} mb-2`}>
                  <item.icon size={24} className={item.color} strokeWidth={1.8} />
                </div>
                <p className="text-xl font-bold text-foreground">{item.value}</p>
                <p className="text-muted text-xs">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-12 lg:py-16">
        <AnimatedBackground />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 {...fadeIn} className="text-2xl font-bold text-foreground text-center mb-6">
            {t.testimonials.title}
          </motion.h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {testimonials.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white dark:bg-card-bg border border-card-border rounded-2xl p-5 hover:shadow-md transition-shadow">
                <div className="flex gap-0.5 mb-2">
                  {[...Array(5)].map((_, j) => <Star key={j} size={12} className="text-primary fill-primary" />)}
                </div>
                <p className="text-muted text-sm italic mb-3">&ldquo;{gl(item, "text")}&rdquo;</p>
                <p className="font-semibold text-foreground text-sm">{gl(item, "name")}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-16 bg-white dark:bg-card-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 lg:p-10 text-center text-white relative overflow-hidden">
            <div className="absolute top-4 right-8 w-24 h-24 bg-white/5 rounded-full blur-xl" />
            <div className="absolute bottom-4 left-8 w-32 h-32 bg-white/5 rounded-full blur-xl" />
            <div className="relative">
              <h2 className="text-2xl font-bold mb-2">{t.cta.title}</h2>
              <p className="text-white/70 text-sm mb-5">{t.cta.subtitle}</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/services" className="bg-white text-primary-dark font-semibold px-6 py-2.5 rounded-xl hover:bg-green-50 transition-colors text-sm shadow-md">
                  {t.cta.explore}
                </Link>
                <Link href="/find-help" className="border-2 border-white/40 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-white/10 transition-colors text-sm">
                  {t.cta.findHelp}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
