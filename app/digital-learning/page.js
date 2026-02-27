"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import {
    IndianRupee, MessageCircle, Smartphone, ArrowRight, ShieldCheck,
    Volume2, Footprints, Eye,
} from "lucide-react";
import AppSimulation from "@/components/AppSimulation";

const fadeIn = {
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.4 },
};

const apps = [
    {
        id: "whatsapp",
        key: "whatsapp",
        simKey: "whatsapp",
        icon: MessageCircle,
        iconBg: "bg-secondary",
        border: "border-card-border",
        features: ["Send & receive payments via chat", "Step-by-step guidance", "Voice instructions"],
    },
    {
        id: "gpay",
        key: "gpay",
        simKey: "gpay",
        icon: IndianRupee,
        iconBg: "bg-accent",
        border: "border-card-border",
        features: ["UPI payments made easy", "Secure PIN guidance", "Transaction history"],
    },
];

export default function DigitalLearningPage() {
    const [selectedApp, setSelectedApp] = useState(null);
    const { t } = useLang();
    const dl = t.digitalLearning || {};

    return (
        <div className="min-h-screen">
            <AnimatePresence mode="wait">
                {selectedApp ? (
                    <motion.div
                        key="simulation"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10"
                    >
                        <AppSimulation app={selectedApp} onExit={() => setSelectedApp(null)} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="selection"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16"
                    >
                        {/* Hero */}
                        <motion.div {...fadeIn} className="text-center mb-10">
                            <div className="inline-flex items-center gap-1.5 bg-warm text-primary px-3 py-1.5 rounded-full text-xs font-medium border border-card-border mb-4">
                                <Smartphone size={13} strokeWidth={1.8} />
                                {dl.badge || "Digital Learning"}
                            </div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 tracking-tight">
                                {dl.title || "Learn Digital Payments"}
                            </h1>
                            <p className="text-base sm:text-lg text-muted max-w-xl mx-auto leading-relaxed">
                                {dl.subtitle || "Practice using WhatsApp and Google Pay safely with our step-by-step interactive simulator"}
                            </p>
                        </motion.div>

                        {/* Feature highlights */}
                        <motion.div {...fadeIn} className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10 max-w-2xl mx-auto">
                            {[
                                { icon: Footprints, label: dl.featureStep || "Step-by-Step Guide", desc: dl.featureStepDesc || "Easy guided instructions" },
                                { icon: Volume2, label: dl.featureVoice || "Voice Instructions", desc: dl.featureVoiceDesc || "Listen to every step" },
                                { icon: ShieldCheck, label: dl.featureSafe || "100% Safe", desc: dl.featureSafeDesc || "No real money involved" },
                            ].map((feat, i) => (
                                <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-card-bg border border-card-border premium-shadow">
                                    <div className="w-9 h-9 rounded-lg bg-warm flex items-center justify-center flex-shrink-0">
                                        <feat.icon size={16} className="text-primary" strokeWidth={1.8} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-foreground">{feat.label}</p>
                                        <p className="text-[10px] text-muted">{feat.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* App cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {apps.map((app, i) => (
                                <motion.div
                                    key={app.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.4 }}
                                >
                                    <div
                                        className={`group relative bg-card-bg border ${app.border} rounded-2xl p-5 sm:p-6 transition-all duration-300 premium-shadow cursor-pointer overflow-hidden`}
                                        onClick={() => setSelectedApp(app.simKey)}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => e.key === "Enter" && setSelectedApp(app.simKey)}
                                        aria-label={`Start learning ${app.id === "gpay" ? "Google Pay" : "WhatsApp"}`}
                                    >
                                        {/* Top accent */}
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-primary opacity-60" />

                                        {/* Icon */}
                                        <div className={`w-14 h-14 rounded-2xl ${app.iconBg} flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform`}>
                                            <app.icon size={24} className="text-white" />
                                        </div>

                                        <h2 className="text-lg sm:text-xl font-bold text-foreground mb-1.5">
                                            {dl[`${app.key}Title`] || (app.id === "gpay" ? "Google Pay" : "WhatsApp Payments")}
                                        </h2>
                                        <p className="text-muted text-sm mb-4 leading-relaxed">
                                            {dl[`${app.key}Desc`] || (app.id === "gpay"
                                                ? "Learn to send money, check balance, and view transaction history using Google Pay."
                                                : "Learn to send payments through WhatsApp chat to your contacts safely.")}
                                        </p>

                                        <ul className="space-y-1.5 mb-5">
                                            {app.features.map((f, j) => (
                                                <li key={j} className="flex items-center gap-2 text-xs text-foreground">
                                                    <div className="w-4 h-4 rounded-full bg-success/15 flex items-center justify-center flex-shrink-0">
                                                        <Eye size={9} className="text-success" />
                                                    </div>
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>

                                        <button className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl text-sm font-semibold text-background bg-foreground hover:opacity-90 transition-all min-h-[44px]">
                                            {dl.startLearning || "Start Learning"}
                                            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Safety note */}
                        <motion.div {...fadeIn} className="mt-8 text-center">
                            <div className="inline-flex items-center gap-1.5 text-xs text-muted bg-warm px-4 py-2 rounded-full border border-card-border">
                                <ShieldCheck size={13} className="text-success" />
                                {dl.safetyNote || "This is a safe simulation. No real money or data is used."}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
