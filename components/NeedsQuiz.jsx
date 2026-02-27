"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardList, X, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

const questions = [
  {
    question: "What type of help are you looking for?",
    options: [
      { label: "Healthcare & Medical", value: "Healthcare" },
      { label: "Meals & Nutrition", value: "Meals" },
      { label: "Transportation", value: "Transportation" },
      { label: "Legal or Financial Help", value: "Legal Aid" },
      { label: "Companionship & Social", value: "Companion Care" },
      { label: "I'm not sure yet", value: "all" },
    ],
  },
  {
    question: "Who is this for?",
    options: [
      { label: "Myself (age 60+)", value: "self" },
      { label: "A family member or loved one", value: "family" },
      { label: "I'm a caregiver", value: "caregiver" },
      { label: "Just exploring options", value: "exploring" },
    ],
  },
  {
    question: "What is your most pressing concern?",
    options: [
      { label: "Getting regular health checkups", value: "healthcare-checkups" },
      { label: "Daily meals and nutrition", value: "home-delivered-meals" },
      { label: "Getting to appointments", value: "senior-transport" },
      { label: "Feeling lonely or isolated", value: "companion-care" },
      { label: "Managing finances or bills", value: "financial-assistance" },
      { label: "Emergency preparedness", value: "emergency-response" },
    ],
  },
];

export default function NeedsQuiz() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [completed, setCompleted] = useState(false);

  const handleAnswer = (value) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setCompleted(true);
    }
  };

  const getRecommendation = () => {
    const lastAnswer = answers[2];
    if (lastAnswer && lastAnswer !== "all") {
      return lastAnswer;
    }
    const category = answers[0];
    const categoryMap = {
      Healthcare: "healthcare-checkups",
      Meals: "home-delivered-meals",
      Transportation: "senior-transport",
      "Legal Aid": "legal-aid-seniors",
      "Companion Care": "companion-care",
    };
    return categoryMap[category] || null;
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setCompleted(false);
  };

  return (
    <>
      <button
        onClick={() => { setIsOpen(true); reset(); }}
        className="fixed bottom-6 right-24 z-40 bg-accent text-white p-3 rounded-full shadow-lg hover:bg-orange-500 transition-colors"
        aria-label="Take needs assessment quiz"
        title="Find services for you"
      >
        <ClipboardList size={22} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card-bg rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
            >
              {/* Header */}
              <div className="bg-primary text-white px-6 py-4 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">Needs Assessment</h3>
                  <p className="text-white/70 text-sm">
                    {completed
                      ? "Here are your results"
                      : `Question ${step + 1} of ${questions.length}`}
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg hover:bg-white/20 transition-colors"
                  aria-label="Close quiz"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Progress bar */}
              {!completed && (
                <div className="h-1 bg-section-bg">
                  <motion.div
                    className="h-full bg-accent"
                    animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {completed ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-4"
                  >
                    <div className="inline-flex p-4 rounded-full bg-success/10 mb-4">
                      <CheckCircle size={40} className="text-success" />
                    </div>
                    <h4 className="text-xl font-bold text-foreground mb-2">
                      We Found Services For You!
                    </h4>
                    <p className="text-muted mb-6">
                      Based on your answers, here&apos;s what we recommend:
                    </p>
                    <div className="flex flex-col gap-3">
                      {getRecommendation() ? (
                        <Link
                          href={`/services/${getRecommendation()}`}
                          onClick={() => setIsOpen(false)}
                          className="bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
                        >
                          View Recommended Service <ArrowRight size={18} />
                        </Link>
                      ) : null}
                      <Link
                        href="/services"
                        onClick={() => setIsOpen(false)}
                        className="border border-card-border text-foreground font-semibold px-6 py-3 rounded-xl hover:border-primary hover:text-primary transition-colors"
                      >
                        Browse All Services
                      </Link>
                      <button
                        onClick={reset}
                        className="text-primary font-medium hover:underline text-sm mt-2"
                      >
                        Retake Quiz
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h4 className="text-lg font-bold text-foreground mb-4">
                      {questions[step].question}
                    </h4>
                    <div className="space-y-2">
                      {questions[step].options.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleAnswer(option.value)}
                          className="w-full text-left px-4 py-3 rounded-xl border border-card-border hover:border-primary hover:bg-primary/5 text-foreground font-medium transition-all"
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                    {step > 0 && (
                      <button
                        onClick={() => {
                          setStep(step - 1);
                          setAnswers(answers.slice(0, -1));
                        }}
                        className="mt-4 text-muted text-sm flex items-center gap-1 hover:text-primary transition-colors"
                      >
                        <ArrowLeft size={14} /> Previous question
                      </button>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
