"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { useGamification } from "@/context/GamificationContext";
import * as LucideIcons from "lucide-react";
import {
  FileText, Search, CheckCircle, ChevronDown,
  Shield, ExternalLink, Star, AlertCircle,
} from "lucide-react";
import schemes from "@/data/schemes.json";
import AnimatedBackground from "@/components/AnimatedBackground";

const states = ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Uttar Pradesh", "Gujarat", "Rajasthan", "West Bengal"];

export default function SchemesPage() {
  const { t, lang } = useLang();
  const { addPoints } = useGamification();
  const [form, setForm] = useState({ pan: "", aadhaar: "", age: "", income: "", state: "" });
  const [results, setResults] = useState(null);
  const [expandedScheme, setExpandedScheme] = useState(null);

  const gl = (item, field) => {
    if (lang === "hi" && item[field + "Hi"]) return item[field + "Hi"];
    if (lang === "mr" && item[field + "Mr"]) return item[field + "Mr"];
    return item[field];
  };

  const getBenefits = (scheme) => {
    if (lang === "hi" && scheme.benefitsHi) return scheme.benefitsHi;
    if (lang === "mr" && scheme.benefitsMr) return scheme.benefitsMr;
    return scheme.benefits;
  };

  const handleCheck = (e) => {
    e.preventDefault();
    const age = parseInt(form.age) || 0;
    const income = parseInt(form.income) || 0;
    const eligible = schemes.filter((s) => {
      const ageOk = age >= s.eligibility.minAge;
      const incomeOk = income <= s.eligibility.maxIncome;
      const stateOk = s.eligibility.states.includes("All India") || s.eligibility.states.includes(form.state);
      return ageOk && incomeOk && stateOk;
    });
    setResults(eligible);
    addPoints(15, "Schemes checked!");
  };

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <div className="min-h-screen py-8 lg:py-12 relative">
      <AnimatedBackground />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="inline-flex p-3.5 rounded-2xl bg-primary/10 mb-3">
            <FileText size={28} className="text-primary" strokeWidth={1.8} />
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">{t.schemes.title}</h1>
          <p className="text-muted text-sm">{t.schemes.subtitle}</p>
        </motion.div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass premium-shadow rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-foreground mb-4 flex items-center gap-2 text-sm">
            <Shield size={16} className="text-primary" strokeWidth={1.8} /> {t.schemes.enterDetails}
          </h2>
          <form onSubmit={handleCheck} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <InputField label={t.schemes.pan} name="pan" placeholder="ABCDE1234F" value={form.pan} onChange={handleChange} />
              <InputField label={t.schemes.aadhaar} name="aadhaar" placeholder="1234 5678 9012" value={form.aadhaar} onChange={handleChange} />
              <InputField label={t.schemes.age} name="age" type="number" placeholder="65" value={form.age} onChange={handleChange} required />
              <InputField label={t.schemes.income} name="income" type="number" placeholder="100000" value={form.income} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">{t.schemes.state}</label>
              <select name="state" value={form.state} onChange={handleChange} required
                className="w-full bg-section-bg text-foreground rounded-xl px-3 py-2.5 border border-card-border focus:border-primary outline-none text-sm transition-colors">
                <option value="">Select...</option>
                {states.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2.5 rounded-xl transition-all shadow-md shadow-primary/20 flex items-center gap-2 text-sm">
              <Search size={16} strokeWidth={1.8} /> {t.schemes.check}
            </motion.button>
          </form>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {results !== null && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Star size={18} className="text-primary" strokeWidth={1.8} />
                {t.schemes.results} ({results.length})
              </h2>

              {results.length === 0 ? (
                <div className="bg-white dark:bg-card-bg border border-card-border rounded-2xl p-8 text-center">
                  <AlertCircle size={32} className="text-muted mx-auto mb-3" strokeWidth={1.5} />
                  <p className="text-muted">{t.schemes.noSchemes}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {results.map((scheme, i) => {
                    const SchemeIcon = LucideIcons[scheme.icon] || FileText;
                    return (
                      <motion.div key={scheme.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                        className="glass premium-shadow rounded-2xl overflow-hidden transition-all duration-300">
                        <button onClick={() => setExpandedScheme(expandedScheme === scheme.id ? null : scheme.id)}
                          className="w-full flex items-center gap-4 p-4 text-left hover:bg-section-bg transition-colors">
                          <div className="p-2.5 rounded-xl bg-primary/10 flex-shrink-0">
                            <SchemeIcon size={24} className="text-primary" strokeWidth={1.8} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-semibold text-white bg-primary px-2.5 py-0.5 rounded-full">{t.schemes.eligible}</span>
                              <span className="text-xs text-muted">{scheme.category}</span>
                            </div>
                            <h3 className="font-bold text-foreground text-sm">{gl(scheme, "name")}</h3>
                            <p className="text-primary text-xs font-semibold mt-0.5">{gl(scheme, "coverage")}</p>
                          </div>
                          <motion.div animate={{ rotate: expandedScheme === scheme.id ? 180 : 0 }} transition={{ duration: 0.2 }}>
                            <ChevronDown size={18} className="text-muted" />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {expandedScheme === scheme.id && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                              <div className="px-4 pb-4 border-t border-card-border pt-3 space-y-3">
                                <p className="text-muted text-sm">{gl(scheme, "desc")}</p>
                                <div>
                                  <h4 className="text-xs font-semibold text-foreground mb-1.5">{t.detail.benefits}</h4>
                                  <div className="grid sm:grid-cols-2 gap-1.5">
                                    {getBenefits(scheme).map((b, j) => (
                                      <div key={j} className="flex items-center gap-2 text-xs text-muted">
                                        <CheckCircle size={12} className="text-primary flex-shrink-0" strokeWidth={2} /> {b}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-xs font-semibold text-foreground mb-1.5">Documents Required</h4>
                                  <div className="flex flex-wrap gap-1.5">
                                    {scheme.eligibility.documents.map((d, j) => (
                                      <span key={j} className="text-xs bg-section-bg border border-card-border px-2.5 py-1 rounded-lg text-muted">{d}</span>
                                    ))}
                                  </div>
                                </div>
                                <motion.a href={scheme.website} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.02 }}
                                  className="inline-flex items-center gap-1.5 bg-primary text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-md shadow-primary/20">
                                  {t.schemes.apply} <ExternalLink size={12} strokeWidth={2} />
                                </motion.a>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function InputField({ label, name, type = "text", placeholder, value, onChange, required }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-foreground mb-1.5">{label}</label>
      <input name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} required={required}
        className="w-full bg-section-bg text-foreground rounded-xl px-3 py-2.5 border border-card-border focus:border-primary outline-none text-sm transition-colors" />
    </div>
  );
}
