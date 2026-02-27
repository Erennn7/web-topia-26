"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import {
    IndianRupee, MessageCircle, Smartphone, ArrowRight, ShieldCheck,
    Volume2, Footprints, Eye,
} from "lucide-react";
import AppSimulation from "@/components/AppSimulation";
import AnimatedBackground from "@/components/AnimatedBackground";

const fadeIn = {
    initial: { opacity: 0, y: 20 },
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
        gradient: "from-green-500 to-emerald-600",
        bg: "bg-green-50 dark:bg-green-900/20",
        border: "border-green-200 dark:border-green-800",
        iconBg: "bg-green-500",
        hoverShadow: "hover:shadow-green-200/50 dark:hover:shadow-green-900/30",
        features: ["Send & receive payments", "Step-by-step guidance", "Voice instructions"],
    },
    {
        id: "gpay",
        key: "gpay",
        simKey: "gpay",
        icon: IndianRupee,
        gradient: "from-blue-500 to-indigo-600",
        bg: "bg-blue-50 dark:bg-blue-900/20",
        border: "border-blue-200 dark:border-blue-800",
        iconBg: "bg-blue-500",
        hoverShadow: "hover:shadow-blue-200/50 dark:hover:shadow-blue-900/30",
        features: ["UPI payments made easy", "Secure PIN guidance", "Transaction history"],
    },
];

export default function DigitalLearningPage() {
    const [selectedApp, setSelectedApp] = useState(null);
    const { t } = useLang();
    const dl = t.digitalLearning || {};

    return (
        <div className="relative min-h-screen">
            <AnimatedBackground />

            <AnimatePresence mode="wait">
                {selectedApp ? (
                    <motion.div
                        key="simulation"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10"
                    >
                        <AppSimulation app={selectedApp} onExit={() => setSelectedApp(null)} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="selection"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 relative z-10"
                    >
                        {/* Hero */}
                        <motion.div {...fadeIn} className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                <Smartphone size={16} />
                                {dl.badge || "Digital Learning"}
                            </div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                                {dl.title || "Learn Digital Payments"}
                            </h1>
                            <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
                                {dl.subtitle || "Practice using WhatsApp and Google Pay safely with our step-by-step interactive simulator"}
                            </p>
                        </motion.div>

                        {/* Feature highlights */}
                        <motion.div {...fadeIn} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
                            {[
                                { icon: Footprints, label: dl.featureStep || "Step-by-Step Guide", desc: dl.featureStepDesc || "Easy guided instructions" },
                                { icon: Volume2, label: dl.featureVoice || "Voice Instructions", desc: dl.featureVoiceDesc || "Listen to every step" },
                                { icon: ShieldCheck, label: dl.featureSafe || "100% Safe", desc: dl.featureSafeDesc || "No real money involved" },
                            ].map((feat, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-card-bg border border-card-border">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <feat.icon size={20} className="text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">{feat.label}</p>
                                        <p className="text-xs text-muted">{feat.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* App cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                            {apps.map((app, i) => (
                                <motion.div
                                    key={app.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15, duration: 0.5 }}
                                >
                                    <div
                                        className={`group relative bg-card-bg border ${app.border} rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-xl ${app.hoverShadow} cursor-pointer overflow-hidden`}
                                        onClick={() => setSelectedApp(app.simKey)}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => e.key === "Enter" && setSelectedApp(app.simKey)}
                                        aria-label={`Start learning ${app.id === "gpay" ? "Google Pay" : "WhatsApp"}`}
                                    >
                                        {/* Gradient accent */}
                                        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${app.gradient}`} />

                                        {/* Icon */}
                                        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ${app.iconBg} flex items-center justify-center mb-5 shadow-lg group-hover:scale-105 transition-transform`}>
                                            <app.icon size={32} className="text-white sm:w-10 sm:h-10" />
                                        </div>

                                        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                                            {dl[`${app.key}Title`] || (app.id === "gpay" ? "Google Pay" : "WhatsApp Payments")}
                                        </h2>
                                        <p className="text-muted text-sm sm:text-base mb-5 leading-relaxed">
                                            {dl[`${app.key}Desc`] || (app.id === "gpay"
                                                ? "Learn to send money, check balance, and view transaction history using Google Pay."
                                                : "Learn to send payments through WhatsApp chat to your contacts safely.")}
                                        </p>

                                        {/* Feature list */}
                                        <ul className="space-y-2 mb-6">
                                            {app.features.map((f, j) => (
                                                <li key={j} className="flex items-center gap-2 text-sm text-foreground">
                                                    <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                                                        <Eye size={12} className="text-success" />
                                                    </div>
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>

                                        {/* CTA button */}
                                        <button
                                            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-base font-semibold text-white bg-gradient-to-r ${app.gradient} hover:opacity-90 transition-all min-h-[48px] shadow-lg group-hover:shadow-xl`}
                                        >
                                            {dl.startLearning || "Start Learning"}
                                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Safety note */}
                        <motion.div
                            {...fadeIn}
                            className="mt-10 text-center"
                        >
                            <div className="inline-flex items-center gap-2 text-sm text-muted bg-section-bg px-5 py-3 rounded-full">
                                <ShieldCheck size={16} className="text-success" />
                                {dl.safetyNote || "This is a safe simulation. No real money or data is used."}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
