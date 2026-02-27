"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageSquare } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import PageTransition from "@/components/PageTransition";

const contactInfo = [
  { icon: Phone, key: "phone", value: "1800-111-4567", href: "tel:18001114567" },
  { icon: Mail, key: "email", value: "help@webtopia.in", href: "mailto:help@webtopia.in" },
  { icon: MapPin, key: "address", value: "Bandra Kurla Complex, Mumbai, MH 400051" },
  { icon: Clock, key: "hours", value: "Mon–Sat, 9 AM – 6 PM IST" },
];

export default function ContactPage() {
  const { t } = useLang();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };
  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <PageTransition className="min-h-screen py-8 lg:py-12 relative">
      <AnimatedBackground />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <MessageSquare size={28} strokeWidth={1.8} className="text-primary mx-auto mb-2" />
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">{t.contact.title}</h1>
          <p className="text-muted text-sm">{t.contact.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Info Cards */}
          <div className="space-y-3">
            {contactInfo.map((c, i) => {
              const Tag = c.href ? "a" : "div";
              return (
                <Tag key={i} href={c.href} className="flex items-center gap-3 bg-white dark:bg-card-bg border border-card-border rounded-2xl p-4 hover:shadow-lg hover:shadow-primary/10 transition-shadow">
                  <c.icon size={18} strokeWidth={1.8} className="text-primary flex-shrink-0" />
                  <div>
                    <p className="text-[10px] text-muted uppercase">{t.common[c.key]}</p>
                    <p className="text-sm font-medium text-foreground">{c.value}</p>
                  </div>
                </Tag>
              );
            })}
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white dark:bg-card-bg border border-card-border rounded-2xl p-5 hover:shadow-lg hover:shadow-primary/10 transition-shadow">
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                <CheckCircle size={40} strokeWidth={1.8} className="text-success mx-auto mb-3" />
                <h2 className="text-lg font-bold text-foreground mb-1">{t.contact.sent}</h2>
                <button onClick={() => setSubmitted(false)} className="text-primary text-sm font-semibold hover:underline mt-2">{t.contact.sendAnother}</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label={t.contact.name} name="name" value={formData.name} onChange={handleChange} required />
                  <Field label={t.contact.email} name="email" type="email" value={formData.email} onChange={handleChange} required />
                  <Field label={t.contact.phone} name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">{t.contact.subject}</label>
                    <select name="subject" value={formData.subject} onChange={handleChange} required
                      className="w-full bg-section-bg text-foreground rounded-xl px-3 py-2 border border-card-border focus:border-primary outline-none text-sm">
                      <option value="">Select...</option>
                      <option value="services">Finding Services</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">{t.contact.message}</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows={4}
                    className="w-full bg-section-bg text-foreground rounded-xl px-3 py-2 border border-card-border focus:border-primary outline-none text-sm resize-none" />
                </div>
                <button type="submit" className="bg-primary text-white font-semibold px-6 py-2.5 rounded-xl text-sm flex items-center gap-1.5 hover:bg-primary-dark transition-colors">
                  <Send size={14} strokeWidth={1.8} /> {t.contact.sendMsg}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

function Field({ label, name, type = "text", value, onChange, required }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-foreground mb-1">{label}{required && <span className="text-emergency-red ml-0.5">*</span>}</label>
      <input name={name} type={type} value={value} onChange={onChange} required={required}
        className="w-full bg-section-bg text-foreground rounded-xl px-3 py-2 border border-card-border focus:border-primary outline-none text-sm" />
    </div>
  );
}
