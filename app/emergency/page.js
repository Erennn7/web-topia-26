"use client";

import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { Phone, AlertTriangle, Shield, Siren, Heart, Clock, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import AnimatedBackground from "@/components/AnimatedBackground";

const emergencyContacts = [
  { title: "Emergency / 911", titleHi: "आपातकाल / 112", titleMr: "आणीबाणी / 112", number: "911", icon: Siren, color: "bg-peach border-secondary/30" },
  { title: "Elder Helpline", titleHi: "बुजुर्ग हेल्पलाइन", titleMr: "ज्येष्ठ हेल्पलाइन", number: "1-800-555-HELP", icon: Heart, color: "bg-lavender border-purple-300/30" },
  { title: "Poison Control", titleHi: "विष नियंत्रण", titleMr: "विष नियंत्रण", number: "1-800-222-1222", icon: AlertTriangle, color: "bg-warm border-accent/30" },
  { title: "Crisis Line / 988", titleHi: "संकट हेल्पलाइन / 988", titleMr: "संकट हेल्पलाइन / 988", number: "988", icon: Phone, color: "bg-sky border-info/30" },
  { title: "Police (Non-Emergency)", titleHi: "पुलिस (गैर-आपातकाल)", titleMr: "पोलीस (बिगर-आणीबाणी)", number: "311", icon: Shield, color: "bg-mint border-success/30" },
  { title: "Lumis 24/7", titleHi: "Lumis 24/7", titleMr: "Lumis 24/7", number: "1-800-555-CARE", icon: Clock, color: "bg-sky border-info/30" },
];

const safetyTips = [
  { tip: "Emergency numbers near every phone", tipHi: "हर फोन के पास आपातकालीन नंबर", tipMr: "प्रत्येक फोनजवळ आणीबाणी क्रमांक" },
  { tip: "Wear medical alert device", tipHi: "मेडिकल अलर्ट डिवाइस पहनें", tipMr: "मेडिकल अलर्ट डिव्हाइस वापरा" },
  { tip: "Share location with trusted person", tipHi: "विश्वसनीय व्यक्ति को स्थान बताएं", tipMr: "विश्वसनीय व्यक्तीला ठिकाण सांगा" },
  { tip: "Keep medication list in wallet", tipHi: "बटुए में दवाई की सूची रखें", tipMr: "पाकिटात औषधांची यादी ठेवा" },
  { tip: "Save ICE contacts in phone", tipHi: "फोन में ICE संपर्क सेव करें", tipMr: "फोनमध्ये ICE संपर्क सेव करा" },
  { tip: "Know nearest hospital location", tipHi: "निकटतम अस्पताल का पता जानें", tipMr: "जवळच्या रुग्णालयाचा पत्ता जाणून घ्या" },
];

export default function EmergencyPage() {
  const { t, lang } = useLang();
  const gl = (item, field) => lang === "hi" ? item[field + "Hi"] || item[field] : lang === "mr" ? item[field + "Mr"] || item[field] : item[field];

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      {/* Hero */}
      <section className="bg-emergency-red py-10 lg:py-14 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <AlertTriangle size={40} strokeWidth={1.8} className="text-white mx-auto mb-4" />
            <h1 className="text-2xl lg:text-4xl font-bold text-white mb-2">{t.emergency.title}</h1>
            <p className="text-white/80 text-sm mb-6">{t.emergency.subtitle}</p>
            <a href="tel:911" className="inline-flex items-center gap-2 bg-white text-emergency-red font-bold px-8 py-3 rounded-xl text-lg hover:bg-gray-100 transition-colors shadow-lg">
              <Phone size={22} strokeWidth={1.8} className="animate-pulse" /> {t.emergency.call911}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-10 lg:py-14 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-foreground mb-5 text-center">{t.emergency.contacts}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {emergencyContacts.map((c, i) => (
              <motion.a key={i} href={`tel:${c.number.replace(/[^0-9]/g, "")}`}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                whileHover={{ y: -3 }}
                className={`block ${c.color} border rounded-2xl p-4 hover:shadow-lg hover:shadow-primary/10 transition-all`}>
                <c.icon size={22} strokeWidth={1.8} className="text-foreground/60 mb-2" />
                <h3 className="font-bold text-foreground text-sm">{gl(c, "title")}</h3>
                <p className="text-primary text-lg font-bold">{c.number}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* SOS */}
      <section className="py-10 bg-emergency-bg">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.a href="tel:18005557357" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-emergency-red text-white font-bold px-10 py-4 rounded-full text-lg shadow-lg">
            <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" /><span className="relative inline-flex rounded-full h-3 w-3 bg-white" /></span>
            {t.emergency.sos}
          </motion.a>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="py-10 lg:py-14 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-foreground mb-5 text-center">{t.emergency.safety}</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {safetyTips.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                className="flex items-center gap-2.5 bg-white dark:bg-card-bg border border-card-border rounded-xl px-4 py-3 hover:shadow-lg hover:shadow-primary/10 transition-shadow">
                <CheckCircle size={16} strokeWidth={1.8} className="text-success flex-shrink-0" />
                <span className="text-foreground text-xs">{gl(item, "tip")}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 bg-section-bg">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-lg font-bold text-foreground mb-2">{t.emergency.nonEmergency}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/services" className="bg-primary text-white font-semibold px-6 py-2 rounded-xl text-sm flex items-center gap-1.5 hover:bg-primary-dark transition-colors">
              {t.cta.explore} <ArrowRight size={14} strokeWidth={1.8} />
            </Link>
            <Link href="/contact" className="bg-white dark:bg-card-bg border border-card-border text-foreground font-semibold px-6 py-2 rounded-xl text-sm hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-colors">
              {t.nav.contact}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
