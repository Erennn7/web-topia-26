"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { useGamification } from "@/context/GamificationContext";
import {
  Pill, Plus, Check, X, Clock, Flame, Trophy,
  Star, Calendar, Target, Zap,
} from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";

const defaultMedicines = [
  { id: "1", name: "Metformin", dosage: "500mg", time: "08:00", frequency: "daily", color: "bg-primary/10" },
  { id: "2", name: "Amlodipine", dosage: "5mg", time: "09:00", frequency: "daily", color: "bg-secondary/10" },
  { id: "3", name: "Calcium + D3", dosage: "1 tablet", time: "13:00", frequency: "daily", color: "bg-info/10" },
];

const COLORS = ["bg-primary/10", "bg-secondary/10", "bg-info/10"];

export default function MedicineReminderPage() {
  const { t, lang } = useLang();
  const { addPoints, streak } = useGamification();
  const [medicines, setMedicines] = useState([]);
  const [takenToday, setTakenToday] = useState({});
  const [showAdd, setShowAdd] = useState(false);
  const [newMed, setNewMed] = useState({ name: "", dosage: "", time: "08:00", frequency: "daily" });
  const [medStreak, setMedStreak] = useState(0);
  const [todayPoints, setTodayPoints] = useState(0);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("webtopia-medicines") || "null");
      setMedicines(stored && stored.length > 0 ? stored : defaultMedicines);
      const taken = JSON.parse(localStorage.getItem("webtopia-taken-" + new Date().toDateString()) || "{}");
      setTakenToday(taken);
      setMedStreak(parseInt(localStorage.getItem("webtopia-med-streak") || "0"));
    } catch { setMedicines(defaultMedicines); }
  }, []);

  const saveMedicines = (meds) => { setMedicines(meds); localStorage.setItem("webtopia-medicines", JSON.stringify(meds)); };

  const markTaken = (medId) => {
    const newTaken = { ...takenToday, [medId]: true };
    setTakenToday(newTaken);
    localStorage.setItem("webtopia-taken-" + new Date().toDateString(), JSON.stringify(newTaken));
    setTodayPoints((p) => p + 10);
    addPoints(10, "Dose taken!");
    if (medicines.every((m) => newTaken[m.id])) {
      const ns = medStreak + 1;
      setMedStreak(ns);
      localStorage.setItem("webtopia-med-streak", ns.toString());
      addPoints(25, "All done!");
    }
  };

  const markSkipped = (medId) => {
    const newTaken = { ...takenToday, [medId]: "skipped" };
    setTakenToday(newTaken);
    localStorage.setItem("webtopia-taken-" + new Date().toDateString(), JSON.stringify(newTaken));
  };

  const addMedicine = (e) => {
    e.preventDefault();
    if (!newMed.name.trim()) return;
    saveMedicines([...medicines, { id: Date.now().toString(), ...newMed, color: COLORS[medicines.length % COLORS.length] }]);
    setNewMed({ name: "", dosage: "", time: "08:00", frequency: "daily" });
    setShowAdd(false);
    addPoints(10, "Medicine added!");
  };

  const removeMedicine = (id) => saveMedicines(medicines.filter((m) => m.id !== id));

  const takenCount = medicines.filter((m) => takenToday[m.id] === true).length;
  const totalCount = medicines.length;
  const pct = totalCount > 0 ? Math.round((takenCount / totalCount) * 100) : 0;
  const freqLabel = (f) => ({ daily: t.medicine.daily, "twice-daily": t.medicine.twiceDaily, weekly: t.medicine.weekly }[f] || f);

  return (
    <div className="min-h-screen py-8 lg:py-12 relative">
      <AnimatedBackground />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <div className="inline-flex p-3.5 rounded-2xl bg-primary/10 mb-3">
            <Pill size={28} className="text-primary" strokeWidth={1.8} />
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">{t.medicine.title}</h1>
          <p className="text-muted text-sm">{t.medicine.subtitle}</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="glass premium-shadow rounded-2xl p-4 text-center">
            <div className="relative w-14 h-14 mx-auto mb-2">
              <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r="24" fill="none" stroke="currentColor" strokeWidth="4" className="text-card-border" />
                <circle cx="28" cy="28" r="24" fill="none" stroke="currentColor" strokeWidth="4" className="text-primary"
                  strokeDasharray={`${pct * 1.508} 150.8`} strokeLinecap="round" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-foreground">{pct}%</span>
            </div>
            <p className="text-xs text-muted">{takenCount}/{totalCount}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.05 }}
            className="glass premium-shadow rounded-2xl p-4 text-center">
            <Flame size={24} className="text-primary mx-auto mb-1" strokeWidth={1.8} />
            <p className="text-xl font-bold text-foreground">{medStreak}</p>
            <p className="text-xs text-muted">{t.medicine.streak}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
            className="glass premium-shadow rounded-2xl p-4 text-center">
            <Star size={24} className="text-primary mx-auto mb-1" strokeWidth={1.8} />
            <p className="text-xl font-bold text-foreground">{todayPoints}</p>
            <p className="text-xs text-muted">{t.medicine.points}</p>
          </motion.div>
        </div>

        {/* Medicine List */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-foreground text-sm flex items-center gap-2">
              <Calendar size={15} className="text-primary" strokeWidth={1.8} />
              {new Date().toLocaleDateString(lang === "hi" ? "hi-IN" : lang === "mr" ? "mr-IN" : "en-US", { weekday: "long", month: "short", day: "numeric" })}
            </h2>
            <motion.button onClick={() => setShowAdd(!showAdd)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-md shadow-primary/20">
              <Plus size={14} strokeWidth={2} /> {t.medicine.addMed}
            </motion.button>
          </div>

          {medicines.map((med, i) => {
            const status = takenToday[med.id];
            const isTaken = status === true;
            const isSkipped = status === "skipped";
            const isDone = isTaken || isSkipped;

            return (
              <motion.div key={med.id} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className={`bg-white dark:bg-card-bg border border-card-border rounded-2xl p-4 flex items-center gap-3 transition-all hover:shadow-sm ${isDone ? "opacity-60" : ""}`}>
                <div className={`w-11 h-11 ${med.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Pill size={18} className="text-primary" strokeWidth={1.8} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold text-sm ${isTaken ? "line-through text-muted" : "text-foreground"}`}>{med.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <span>{med.dosage}</span>
                    <span className="w-1 h-1 bg-muted rounded-full" />
                    <Clock size={10} strokeWidth={2} /> <span>{med.time}</span>
                    <span className="w-1 h-1 bg-muted rounded-full" />
                    <span>{freqLabel(med.frequency)}</span>
                  </div>
                </div>
                {!isDone ? (
                  <div className="flex gap-1.5">
                    <motion.button onClick={() => markTaken(med.id)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                      className="bg-primary text-white p-2 rounded-xl shadow-md shadow-primary/20" aria-label="Taken">
                      <Check size={16} strokeWidth={2.5} />
                    </motion.button>
                    <button onClick={() => markSkipped(med.id)} className="bg-section-bg text-muted p-2 rounded-xl hover:bg-card-border transition-colors" aria-label="Skip">
                      <X size={16} strokeWidth={2} />
                    </button>
                  </div>
                ) : (
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${isTaken ? "bg-primary/10 text-primary" : "bg-section-bg text-muted"}`}>
                    {isTaken ? t.medicine.taken : t.medicine.skip}
                  </span>
                )}
                <button onClick={() => removeMedicine(med.id)} className="text-muted hover:text-emergency-red transition-colors p-1" aria-label="Remove">
                  <X size={13} strokeWidth={2} />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Add Form */}
        <AnimatePresence>
          {showAdd && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              className="bg-white dark:bg-card-bg border border-card-border rounded-2xl p-5 mb-6 overflow-hidden shadow-sm">
              <h3 className="font-bold text-foreground text-sm mb-3 flex items-center gap-2">
                <Plus size={15} className="text-primary" strokeWidth={2} /> {t.medicine.addMed}
              </h3>
              <form onSubmit={addMedicine} className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">{t.medicine.name_}</label>
                    <input value={newMed.name} onChange={(e) => setNewMed({ ...newMed, name: e.target.value })} required placeholder="Metformin"
                      className="w-full bg-section-bg text-foreground rounded-xl px-3 py-2 border border-card-border focus:border-primary outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">{t.medicine.dosage}</label>
                    <input value={newMed.dosage} onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })} placeholder="500mg"
                      className="w-full bg-section-bg text-foreground rounded-xl px-3 py-2 border border-card-border focus:border-primary outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">{t.medicine.time}</label>
                    <input type="time" value={newMed.time} onChange={(e) => setNewMed({ ...newMed, time: e.target.value })}
                      className="w-full bg-section-bg text-foreground rounded-xl px-3 py-2 border border-card-border focus:border-primary outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">{t.medicine.frequency}</label>
                    <select value={newMed.frequency} onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
                      className="w-full bg-section-bg text-foreground rounded-xl px-3 py-2 border border-card-border focus:border-primary outline-none text-sm">
                      <option value="daily">{t.medicine.daily}</option>
                      <option value="twice-daily">{t.medicine.twiceDaily}</option>
                      <option value="weekly">{t.medicine.weekly}</option>
                    </select>
                  </div>
                </div>
                <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="bg-primary text-white font-semibold px-5 py-2 rounded-xl shadow-md shadow-primary/20 text-sm flex items-center gap-1.5">
                  <Plus size={14} strokeWidth={2} /> {t.medicine.add}
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Points Guide */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-white dark:bg-card-bg border border-card-border rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Trophy size={16} className="text-primary" strokeWidth={1.8} />
            <h3 className="font-bold text-foreground text-sm">{t.gamification.tasks}</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              { icon: Check, task: "Take a dose on time", pts: "+10", taskHi: "समय पर दवाई लें", taskMr: "वेळेवर औषध घ्या" },
              { icon: Target, task: "Complete all daily doses", pts: "+25", taskHi: "सभी दैनिक खुराक लें", taskMr: "सर्व दैनिक डोस घ्या" },
              { icon: Flame, task: "7-day streak", pts: "+50", taskHi: "7-दिन स्ट्रीक", taskMr: "7-दिवस स्ट्रीक" },
              { icon: Zap, task: "Add a new medicine", pts: "+10", taskHi: "नई दवाई जोड़ें", taskMr: "नवीन औषध जोडा" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between bg-section-bg rounded-xl px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <item.icon size={13} className="text-primary" strokeWidth={2} />
                  <span className="text-xs text-muted">{lang === "hi" ? item.taskHi : lang === "mr" ? item.taskMr : item.task}</span>
                </div>
                <span className="text-xs font-bold text-primary">{item.pts}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
