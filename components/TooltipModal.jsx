"use client";

import { motion } from "framer-motion";

export default function TooltipModal({ instruction, onNext, onBack, currentStep, totalSteps, canGoBack }) {
    return (
        <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full bg-card-bg border border-card-border rounded-2xl premium-shadow p-4 sm:p-5"
            role="region"
            aria-label={`Step ${currentStep} of ${totalSteps}`}
        >
            {/* Progress */}
            <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold text-primary tracking-wide whitespace-nowrap">
                    {currentStep} / {totalSteps}
                </span>
                <div className="flex-1 h-1.5 bg-section-bg rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        transition={{ duration: 0.35 }}
                    />
                </div>
            </div>

            {/* Instruction */}
            <p className="text-[15px] sm:text-base text-foreground leading-relaxed mb-4">
                {instruction}
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-2">
                {canGoBack && (
                    <button
                        onClick={onBack}
                        className="flex-1 px-3 py-2.5 rounded-xl text-sm font-medium bg-section-bg text-foreground hover:bg-warm-dark transition-colors min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary-light"
                        aria-label="Go to previous step"
                    >
                        ← Back
                    </button>
                )}
                <button
                    onClick={onNext}
                    className="flex-1 px-3 py-2.5 rounded-xl text-sm font-medium bg-foreground text-background hover:opacity-90 transition-all min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary-light"
                    aria-label={currentStep === totalSteps ? "Finish tutorial" : "Go to next step"}
                >
                    {currentStep === totalSteps ? "Finish ✓" : "Next →"}
                </button>
            </div>
        </motion.div>
    );
}
