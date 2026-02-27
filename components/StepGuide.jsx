"use client";

import { useEffect } from "react";

export default function StepGuide({ steps, currentStep, onNext, onBack, onExit }) {
    // Keyboard navigation
    useEffect(() => {
        const handler = (e) => {
            if (e.key === "ArrowRight" || e.key === "Enter") {
                e.preventDefault();
                onNext();
            } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                if (currentStep > 0) onBack();
            } else if (e.key === "Escape") {
                e.preventDefault();
                onExit();
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [currentStep, onNext, onBack, onExit]);

    const step = steps[currentStep];
    if (!step) return null;

    return { step };
}
