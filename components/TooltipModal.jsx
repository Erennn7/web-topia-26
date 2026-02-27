"use client";

import { motion } from "framer-motion";

export default function TooltipModal({ instruction, onNext, onBack, currentStep, totalSteps, canGoBack }) {
    return (
        <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-card-bg border border-card-border rounded-2xl shadow-lg p-4 sm:p-5"
            role="region"
            aria-label={`Step ${currentStep} of ${totalSteps}`}
        >
            {/* Progress bar */}
            <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-bold text-primary whitespace-nowrap">
                    Step {currentStep}/{totalSteps}
                </span>
                <div className="flex-1 h-2.5 bg-section-bg rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        transition={{ duration: 0.4 }}
                    />
                </div>
            </div>

            {/* Instruction */}
            <p className="text-base sm:text-lg font-medium text-foreground leading-relaxed mb-4">
                💡 {instruction}
            </p>

            {/* Navigation buttons */}
            <div className="flex items-center gap-3">
                {canGoBack && (
                    <button
                        onClick={onBack}
                        className="flex-1 px-4 py-3 rounded-xl text-base font-semibold bg-section-bg text-foreground hover:bg-card-border transition-all min-h-[48px] focus:outline-none focus:ring-2 focus:ring-primary"
                        aria-label="Go to previous step"
                    >
                        ← Back
                    </button>
                )}
                <button
                    onClick={onNext}
                    className="flex-1 px-4 py-3 rounded-xl text-base font-semibold bg-primary text-white hover:bg-primary-dark transition-all min-h-[48px] focus:outline-none focus:ring-2 focus:ring-primary shadow-md hover:shadow-lg"
                    aria-label={currentStep === totalSteps ? "Finish tutorial" : "Go to next step"}
                >
                    {currentStep === totalSteps ? "Finish ✓" : "Next →"}
                </button>
            </div>
        </motion.div>
    );
}
