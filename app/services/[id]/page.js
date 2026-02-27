"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, MapPin, Clock, CheckCircle, ChevronRight, Bookmark } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useGamification } from "@/context/GamificationContext";
import services from "@/data/services.json";
import FAQAccordion from "@/components/FAQAccordion";
import { useBookmarks } from "@/hooks/useBookmarks";

export default function ServiceDetailPage() {
  const params = useParams();
  const { t } = useLang();
  const { addPoints } = useGamification();
  const service = services.find((s) => s.id === params.id);
  const { toggleBookmark, isBookmarked } = useBookmarks();

  useEffect(() => {
    if (service) {
      const viewed = JSON.parse(sessionStorage.getItem("webtopia-viewed") || "[]");
      if (!viewed.includes(service.id)) {
        viewed.push(service.id);
        sessionStorage.setItem("webtopia-viewed", JSON.stringify(viewed));
        addPoints(5, "Service viewed!");
        if (viewed.length >= 3) addPoints(10, "Explorer badge!");
      }
    }
  }, [service, addPoints]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold text-foreground mb-3">Service Not Found</h1>
          <Link href="/services" className="text-primary font-semibold flex items-center gap-2 justify-center text-sm">
            <ArrowLeft size={16} strokeWidth={1.8} /> {t.detail.back}
          </Link>
        </div>
      </div>
    );
  }

  const Icon = LucideIcons[service.icon] || LucideIcons.HelpCircle;
  const bookmarked = isBookmarked(service.id);

  return (
    <div className="min-h-screen py-8 lg:py-10 relative">
      <AnimatedBackground />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted mb-6">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight size={12} strokeWidth={1.8} />
          <Link href="/services" className="hover:text-primary">{t.nav.services}</Link>
          <ChevronRight size={12} strokeWidth={1.8} />
          <span className="text-foreground font-medium truncate">{service.title}</span>
        </nav>

        {/* Header Card */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-card-bg border border-card-border rounded-2xl p-5 mb-6 hover:shadow-lg hover:shadow-primary/10 transition-shadow">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/10">
                <Icon size={28} strokeWidth={1.8} className="text-primary" />
              </div>
              <div>
                <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{service.category}</span>
                <h1 className="text-xl lg:text-2xl font-bold text-foreground mt-1">{service.title}</h1>
              </div>
            </div>
            <button onClick={() => { toggleBookmark(service.id); if (!bookmarked) addPoints(5, "Saved!"); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                bookmarked ? "bg-accent/10 border-accent text-accent" : "border-card-border text-muted hover:text-accent"
              }`}>
              <Bookmark size={14} strokeWidth={1.8} fill={bookmarked ? "currentColor" : "none"} />
              {bookmarked ? t.detail.bookmarked : t.detail.bookmark}
            </button>
          </div>
          <p className="text-muted text-sm">{service.description}</p>
        </motion.div>

        {/* Info Cards Grid */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {/* Eligibility */}
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-white dark:bg-card-bg border border-card-border rounded-2xl p-4 hover:shadow-lg hover:shadow-primary/10 transition-shadow">
            <h2 className="font-bold text-foreground text-sm mb-3">{t.detail.eligibility}</h2>
            <ul className="space-y-2">
              {service.eligibility.map((e, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-muted">
                  <CheckCircle size={14} strokeWidth={1.8} className="text-success flex-shrink-0 mt-0.5" /> {e}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Benefits */}
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}
            className="bg-white dark:bg-card-bg border border-card-border rounded-2xl p-4 hover:shadow-lg hover:shadow-primary/10 transition-shadow">
            <h2 className="font-bold text-foreground text-sm mb-3">{t.detail.benefits}</h2>
            <ul className="space-y-2">
              {service.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-muted">
                  <CheckCircle size={14} strokeWidth={1.8} className="text-primary flex-shrink-0 mt-0.5" /> {b}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Steps */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-white dark:bg-card-bg border border-card-border rounded-2xl p-4 mb-6 hover:shadow-lg hover:shadow-primary/10 transition-shadow">
          <h2 className="font-bold text-foreground text-sm mb-3">{t.detail.howTo}</h2>
          <ol className="space-y-2.5">
            {service.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                <span className="text-muted text-xs pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </motion.div>

        {/* Contact */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { icon: Phone, label: t.common.phone, val: service.contact.phone, href: `tel:${service.contact.phone}` },
            { icon: Mail, label: t.common.email, val: service.contact.email, href: `mailto:${service.contact.email}` },
            { icon: MapPin, label: t.common.address, val: service.contact.address },
            { icon: Clock, label: t.common.hours, val: service.contact.hours },
          ].map((c, i) => {
            const Tag = c.href ? "a" : "div";
            return (
              <Tag key={i} href={c.href} className="bg-white dark:bg-card-bg border border-card-border rounded-xl p-3 flex items-start gap-2 hover:shadow-lg hover:shadow-primary/10 transition-shadow">
                <c.icon size={14} strokeWidth={1.8} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-muted uppercase">{c.label}</p>
                  <p className="text-xs font-medium text-foreground">{c.val}</p>
                </div>
              </Tag>
            );
          })}
        </div>

        {/* FAQ */}
        <div className="mb-6">
          <h2 className="font-bold text-foreground text-sm mb-3">{t.detail.faq}</h2>
          <FAQAccordion faqs={service.faqs} />
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-primary rounded-2xl p-6 text-center text-white">
          <h2 className="text-lg font-bold mb-2">{t.detail.getStarted}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={`tel:${service.contact.phone}`} className="bg-white text-primary-dark font-semibold px-5 py-2 rounded-xl text-sm flex items-center gap-1.5 hover:bg-gray-100 transition-colors">
              <Phone size={14} strokeWidth={1.8} /> {t.detail.callNow}
            </a>
            <a href={`mailto:${service.contact.email}`} className="border-2 border-white text-white font-semibold px-5 py-2 rounded-xl text-sm flex items-center gap-1.5 hover:bg-white/10 transition-colors">
              <Mail size={14} strokeWidth={1.8} /> {t.detail.emailUs}
            </a>
          </div>
        </motion.div>

        <div className="mt-6 text-center">
          <Link href="/services" className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:underline">
            <ArrowLeft size={16} strokeWidth={1.8} /> {t.detail.back}
          </Link>
        </div>
      </div>
    </div>
  );
}
