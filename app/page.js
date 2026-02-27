"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { useGamification } from "@/context/GamificationContext";
import { useEffect, useState, useRef } from "react";
import {
  Heart, UtensilsCrossed, Car, Scale, DollarSign, HeartHandshake,
  Shield, Users, Star, ArrowRight, Phone, FileText, Pill,
  Trophy, Flame, Zap, Search, MapPin, ChevronRight,
  CheckCircle2, Globe, Stethoscope, HandHeart, TrendingUp,
  Leaf, ChevronDown, Hospital,
} from "lucide-react";
import SearchBar from "@/components/SearchBar";
import AnimatedBackground from "@/components/AnimatedBackground";

const services = [
  { icon: Stethoscope, label: "healthcare", href: "/services/healthcare-checkups" },
  { icon: UtensilsCrossed, label: "meals", href: "/services/home-delivered-meals" },
  { icon: Car, label: "transport", href: "/services/senior-transport" },
  { icon: Scale, label: "legal", href: "/services/legal-aid-seniors" },
  { icon: DollarSign, label: "financial", href: "/services/financial-assistance" },
  { icon: HeartHandshake, label: "companion", href: "/services/companion-care" },
  { icon: FileText, label: "schemes", href: "/schemes" },
  { icon: Pill, label: "medicine", href: "/medicine-reminder" },
  { icon: Hospital, label: "hospitals", href: "/nearby-hospitals" },
];

const testimonials = [
  { name: "Margaret, 72", text: "Found meal delivery I didn't know existed. This platform is a lifesaver!", nameHi: "मार्गरेट, 72", textHi: "भोजन सेवा मिली जो मुझे पता नहीं थी!", nameMr: "मार्गरेट, 72", textMr: "जेवणाची सेवा मिळाली जी माहीतच नव्हती!", avatar: "M" },
  { name: "James, 68", text: "Companion care changed my daily routine completely. I'm never alone now.", nameHi: "जेम्स, 68", textHi: "साथी सेवा ने मेरा जीवन बदल दिया।", nameMr: "जेम्स, 68", textMr: "सोबती सेवेने माझे आयुष्य बदलले.", avatar: "J" },
  { name: "Linda, 65", text: "Found respite care for my mother within minutes. Incredible resource.", nameHi: "लिंडा, 65", textHi: "मेरी माँ के लिए विराम सेवा मिली।", nameMr: "लिंडा, 65", textMr: "आईसाठी विश्रांती सेवा मिळाली.", avatar: "L" },
];

export default function HomePage() {
  const { t, lang } = useLang();
  const { addPoints, points, streak } = useGamification();
  const [visited, setVisited] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.8], [0, 60]);

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
      {/* ── HERO — waves ── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
        <AnimatedBackground variant="hero" />
        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-primary font-medium text-sm mb-6 flex items-center justify-center gap-2">
              <Leaf size={14} strokeWidth={1.8} />
              {t.hero.badge}
            </p>
            <h1 className="text-[2.5rem] sm:text-5xl lg:text-6xl font-semibold text-foreground leading-[1.15] mb-5 tracking-[-0.02em]">
              {t.hero.title}
            </h1>
            <p className="text-muted text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              {t.hero.subtitle}
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="mb-8">
            <SearchBar variant="hero" />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex items-center justify-center gap-3">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link href="/services" className="bg-foreground dark:bg-foreground text-background dark:text-background font-medium px-7 py-3 rounded-full transition-all duration-200 hover:shadow-lg text-sm flex items-center gap-2">
                {t.hero.cta} <ArrowRight size={15} strokeWidth={2} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link href="/emergency" className="border border-card-border text-foreground font-medium px-7 py-3 rounded-full transition-all duration-200 hover:border-foreground/30 text-sm flex items-center gap-2">
                <Phone size={15} strokeWidth={2} /> {t.hero.sos}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown size={18} className="text-muted" strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS — clean, no bg animation ── */}
      <section className="py-16 border-b border-card-border">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="flex flex-wrap justify-between items-center gap-8 text-center">
            {[
              { val: "10,000+", label: "Seniors Helped" },
              { val: "500+", label: "Services" },
              { val: "50+", label: "Govt Schemes" },
              { val: "24/7", label: "Support" },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex-1 min-w-[120px]">
                <p className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight">{s.val}</p>
                <p className="text-muted text-sm mt-1">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES — floating warm glow ── */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <motion.div
          animate={{ y: [0, -15, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 right-[5%] w-[400px] h-[400px] rounded-full bg-warm dark:bg-warm blur-[120px] pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">{t.quickAccess.title}</h2>
              <p className="text-muted text-sm mt-2 max-w-md">{t.quickAccess.subtitle}</p>
            </div>
            <Link href="/services" className="text-primary font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all shrink-0">
              View all <ArrowRight size={14} strokeWidth={2} />
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
            {services.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.4 }}>
                <Link href={s.href} className="group flex items-center gap-3.5 p-4 rounded-xl border border-transparent hover:border-card-border hover:bg-card-bg dark:hover:bg-card-bg transition-all duration-200">
                  <motion.div whileHover={{ scale: 1.1, rotate: -3 }} transition={{ type: "spring", stiffness: 300 }} className="p-2.5 rounded-lg bg-warm dark:bg-warm shrink-0 group-hover:shadow-sm transition-shadow">
                    <s.icon size={20} className="text-primary" strokeWidth={1.5} />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm truncate group-hover:text-primary transition-colors duration-200">{t.categories[s.label]}</p>
                  </div>
                  <ChevronRight size={14} className="text-transparent group-hover:text-muted group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS — expanding concentric rings ── */}
      <section className="relative py-24 lg:py-32 bg-warm dark:bg-warm overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          {[280, 450, 620].map((size, i) => (
            <motion.div
              key={size}
              className="absolute rounded-full border border-primary"
              style={{ width: size, height: size }}
              animate={{ scale: [1, 1.06, 1], opacity: [0.04, 0.07, 0.04] }}
              transition={{ duration: 8 + i * 3, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
            />
          ))}
        </div>
        <div className="relative max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">How it works</h2>
            <p className="text-muted text-sm mt-2">Three simple steps to find the help you need.</p>
          </motion.div>
          <div className="space-y-0">
            {[
              { step: "01", title: "Browse", desc: "Explore curated services and government schemes designed for seniors.", icon: Search },
              { step: "02", title: "Filter", desc: "Narrow down by your location, specific needs, and eligibility criteria.", icon: CheckCircle2 },
              { step: "03", title: "Connect", desc: "Reach out directly to providers, helplines, and support networks.", icon: Phone },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="flex gap-6 py-8 border-b border-card-border last:border-0"
              >
                <div className="shrink-0 w-12 text-right">
                  <span className="text-2xl font-semibold text-primary/30">{item.step}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <item.icon size={18} className="text-primary" strokeWidth={1.6} />
                    <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-muted text-sm leading-relaxed max-w-lg">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES + STATS — diagonal drifting lines ── */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {[
            { top: "8%", left: "-5%", w: "45%", angle: 12, delay: 0 },
            { top: "30%", left: "60%", w: "50%", angle: -8, delay: 2 },
            { top: "65%", left: "10%", w: "35%", angle: 5, delay: 4 },
            { top: "85%", left: "50%", w: "40%", angle: -15, delay: 1 },
          ].map((line, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-primary"
              style={{ top: line.top, left: line.left, width: line.w, rotate: `${line.angle}deg` }}
              animate={{ opacity: [0, 0.08, 0], x: [0, 20, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: line.delay }}
            />
          ))}
        </div>
        <div className="relative max-w-5xl mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-16 items-start">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-3">
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight mb-3">{t.benefits.title}</h2>
              <p className="text-muted text-sm mb-10 max-w-md">Built with care, designed for simplicity.</p>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: Shield, key: "trust" },
                  { icon: Zap, key: "quick" },
                  { icon: Users, key: "community" },
                  { icon: Heart, key: "care" },
                ].map((f, i) => (
                  <motion.div key={f.key} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                    <div className="flex items-start gap-3 p-3 -m-3 rounded-xl hover:bg-warm/50 dark:hover:bg-warm/50 transition-colors duration-200 group/feat">
                      <div className="p-2 rounded-lg bg-warm dark:bg-warm shrink-0 mt-0.5 group-hover/feat:scale-105 transition-transform duration-200">
                        <f.icon size={16} className="text-primary" strokeWidth={1.6} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm mb-1">{t.benefits[f.key]}</p>
                        <p className="text-muted text-xs leading-relaxed">{t.benefits[f.key + "Desc"]}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="lg:col-span-2">
              <div className="bg-card-bg dark:bg-card-bg rounded-2xl border border-card-border p-6 space-y-5">
                {[
                  { label: t.gamification.points, value: points, icon: Trophy },
                  { label: t.gamification.streak, value: `${streak} days`, icon: Flame },
                  { label: "Satisfaction", value: "98%", icon: TrendingUp },
                  { label: "Languages", value: "3", icon: Globe },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <item.icon size={16} className="text-primary" strokeWidth={1.5} />
                      <span className="text-sm text-muted">{item.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS — slowly pulsing corner arcs ── */}
      <section className="relative py-24 lg:py-32 bg-section-bg dark:bg-section-bg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <motion.svg className="absolute top-0 left-0 w-48 h-48" viewBox="0 0 200 200" fill="none" animate={{ opacity: [0.04, 0.08, 0.04] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
            <path d="M0,200 C0,90 90,0 200,0" stroke="var(--primary)" strokeWidth="1" />
            <path d="M0,160 C0,72 72,0 160,0" stroke="var(--primary)" strokeWidth="0.8" />
            <path d="M0,120 C0,54 54,0 120,0" stroke="var(--primary)" strokeWidth="0.6" />
          </motion.svg>
          <motion.svg className="absolute bottom-0 right-0 w-48 h-48" viewBox="0 0 200 200" fill="none" animate={{ opacity: [0.03, 0.07, 0.03] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}>
            <path d="M200,0 C200,110 110,200 0,200" stroke="var(--accent)" strokeWidth="1" />
            <path d="M200,40 C200,128 128,200 40,200" stroke="var(--accent)" strokeWidth="0.8" />
            <path d="M200,80 C200,146 146,200 80,200" stroke="var(--accent)" strokeWidth="0.6" />
          </motion.svg>
        </div>
        <div className="relative max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">{t.testimonials.title}</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.4 }} whileHover={{ y: -3 }} className="bg-card-bg dark:bg-card-bg rounded-2xl p-6 border border-card-border hover:border-primary/15 hover:shadow-md transition-all duration-300">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} size={12} className="text-primary fill-primary" />)}
                </div>
                <p className="text-foreground text-sm leading-relaxed mb-5">&ldquo;{gl(item, "text")}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-warm dark:bg-warm flex items-center justify-center text-primary font-medium text-xs">{item.avatar}</div>
                  <p className="font-medium text-foreground text-sm">{gl(item, "name")}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA — breathing border glow ── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative">
            <motion.div
              className="absolute -inset-4 rounded-3xl border border-primary pointer-events-none"
              animate={{ opacity: [0, 0.1, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -inset-8 rounded-[2rem] border border-primary pointer-events-none"
              animate={{ opacity: [0, 0.05, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <div className="py-12">
              <HandHeart size={32} className="text-primary mx-auto mb-6" strokeWidth={1.3} />
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight mb-3">{t.cta.title}</h2>
              <p className="text-muted text-sm mb-8 max-w-md mx-auto">{t.cta.subtitle}</p>
              <div className="flex items-center justify-center gap-3">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link href="/services" className="bg-foreground dark:bg-foreground text-background dark:text-background font-medium px-7 py-3 rounded-full text-sm flex items-center gap-2 hover:shadow-lg transition-shadow">
                    {t.cta.explore} <ArrowRight size={15} strokeWidth={2} />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link href="/find-help" className="border border-card-border text-foreground font-medium px-7 py-3 rounded-full text-sm flex items-center gap-2 hover:border-foreground/30 transition-colors">
                    <MapPin size={15} strokeWidth={2} /> {t.cta.findHelp}
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
