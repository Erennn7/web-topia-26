"use client";

import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { Heart, Users, Target, Eye, Award, Handshake, CheckCircle } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import PageTransition from "@/components/PageTransition";

const fadeIn = { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.4 } };

const stats = [
  { number: "50K+", label: "Seniors Served", labelHi: "बुजुर्गों की सेवा", labelMr: "ज्येष्ठांची सेवा" },
  { number: "500+", label: "Partners", labelHi: "भागीदार", labelMr: "भागीदार" },
  { number: "200+", label: "Communities", labelHi: "समुदाय", labelMr: "समुदाय" },
  { number: "24/7", label: "Support", labelHi: "सहायता", labelMr: "मदत" },
];

const values = [
  { icon: Heart, key: "Compassion", keyHi: "करुणा", keyMr: "करुणा" },
  { icon: Users, key: "Accessibility", keyHi: "सुलभता", keyMr: "सुलभता" },
  { icon: Award, key: "Trust", keyHi: "विश्वास", keyMr: "विश्वास" },
  { icon: Handshake, key: "Community", keyHi: "समुदाय", keyMr: "समुदाय" },
];

const team = [
  { name: "Dr. Anjali Deshmukh", role: "Founder", roleHi: "संस्थापक", roleMr: "संस्थापक", initial: "A" },
  { name: "Rajesh Patil", role: "Outreach", roleHi: "आउटरीच", roleMr: "आउटरीच", initial: "R" },
  { name: "Priya Sharma", role: "Design", roleHi: "डिज़ाइन", roleMr: "डिझाइन", initial: "P" },
  { name: "Vikram Joshi", role: "Technology", roleHi: "तकनीक", roleMr: "तंत्रज्ञान", initial: "V" },
];

export default function AboutPage() {
  const { t, lang } = useLang();
  const gl = (item, field) => lang === "hi" ? item[field + "Hi"] || item[field] : lang === "mr" ? item[field + "Mr"] || item[field] : item[field];

  return (
    <PageTransition className="min-h-screen relative">
      <AnimatedBackground />
      {/* Hero */}
      <section className="py-12 lg:py-16 bg-warm relative">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl lg:text-4xl font-bold text-foreground mb-2">{t.about.title}</h1>
            <p className="text-muted text-sm max-w-lg mx-auto">{t.about.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="py-10 lg:py-14 relative">
        <div className="max-w-5xl mx-auto px-4 grid sm:grid-cols-2 gap-4">
          <motion.div {...fadeIn} className="bg-white dark:bg-card-bg border border-card-border rounded-2xl p-5 hover:shadow-lg hover:shadow-primary/10 transition-shadow">
            <Target size={22} strokeWidth={1.8} className="text-primary mb-2" />
            <h2 className="font-bold text-foreground mb-2">{t.about.mission}</h2>
            <p className="text-muted text-xs leading-relaxed">
              {lang === "hi" ? "वरिष्ठ नागरिकों और उनके परिवारों को सामुदायिक सेवाओं से जोड़ने का एकल मंच बनाना।" :
               lang === "mr" ? "ज्येष्ठ नागरिक आणि त्यांच्या कुटुंबांना सामुदायिक सेवांशी जोडणारे एकल व्यासपीठ तयार करणे." :
               "Create a single platform connecting seniors and caregivers with community services — healthcare, meals, legal aid, and companionship."}
            </p>
          </motion.div>
          <motion.div {...fadeIn} className="bg-white dark:bg-card-bg border border-card-border rounded-2xl p-5 hover:shadow-lg hover:shadow-primary/10 transition-shadow">
            <Eye size={22} strokeWidth={1.8} className="text-accent mb-2" />
            <h2 className="font-bold text-foreground mb-2">{t.about.vision}</h2>
            <p className="text-muted text-xs leading-relaxed">
              {lang === "hi" ? "हर बुजुर्ग को आसानी से स्वस्थ, जुड़ा और सम्मानित जीवन जीने की सहायता मिले।" :
               lang === "mr" ? "प्रत्येक ज्येष्ठ नागरिकाला सहज निरोगी, जोडलेले आणि सन्मानित जीवन जगण्याची मदत मिळावी." :
               "Every senior easily finds support for a healthy, connected, and dignified life."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-primary">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="text-center text-white">
              <p className="text-2xl lg:text-3xl font-bold">{s.number}</p>
              <p className="text-white/60 text-xs">{gl(s, "label")}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-10 lg:py-14 bg-section-bg relative">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-xl font-bold text-foreground text-center mb-6">{t.about.values}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-card-bg border border-card-border rounded-2xl p-4 text-center hover:shadow-lg hover:shadow-primary/10 transition-shadow">
                <v.icon size={22} strokeWidth={1.8} className="text-primary mx-auto mb-2" />
                <h3 className="font-bold text-foreground text-sm">{gl(v, "key")}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-10 lg:py-14 relative">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-xl font-bold text-foreground text-center mb-6">{t.about.team}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {team.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="bg-white dark:bg-card-bg border border-card-border rounded-2xl p-4 text-center hover:shadow-lg hover:shadow-primary/10 transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white text-lg font-bold">{m.initial}</span>
                </div>
                <h3 className="font-bold text-foreground text-sm">{m.name}</h3>
                <p className="text-primary text-xs">{gl(m, "role")}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
