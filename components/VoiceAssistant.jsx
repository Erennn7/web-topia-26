"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, X, Volume2 } from "lucide-react";

const COMMANDS = [
  { keywords: ["home", "go home", "main page", "start", "landing"], path: "/", label: "Home" },
  { keywords: ["services", "browse services", "all services", "service"], path: "/services", label: "Services" },
  { keywords: ["healthcare", "health", "doctor", "medical", "checkup"], path: "/services/healthcare-checkups", label: "Healthcare" },
  { keywords: ["meals", "food", "meal delivery", "nutrition"], path: "/services/home-delivered-meals", label: "Meals" },
  { keywords: ["transport", "transportation", "ride", "travel", "cab"], path: "/services/senior-transport", label: "Transport" },
  { keywords: ["legal", "legal aid", "lawyer", "law"], path: "/services/legal-aid-seniors", label: "Legal Aid" },
  { keywords: ["financial", "finance", "money", "assistance", "pension"], path: "/services/financial-assistance", label: "Financial Aid" },
  { keywords: ["companion", "companionship", "friend", "lonely", "care"], path: "/services/companion-care", label: "Companion Care" },
  { keywords: ["schemes", "government", "scheme", "yojana", "phule", "government scheme", "govt"], path: "/schemes", label: "Govt Schemes" },
  { keywords: ["medicine", "reminder", "medicine reminder", "pill", "medication", "dose"], path: "/medicine-reminder", label: "Medicine Reminder" },
  { keywords: ["resources", "resource", "guides", "articles", "tips"], path: "/resources", label: "Resources" },
  { keywords: ["find help", "near me", "nearby", "location", "local", "help near"], path: "/find-help", label: "Find Help" },
  { keywords: ["emergency", "sos", "urgent", "ambulance", "police", "911", "help"], path: "/emergency", label: "Emergency" },
  { keywords: ["about", "about us", "who are you", "information"], path: "/about", label: "About" },
  { keywords: ["contact", "contact us", "reach", "email", "call us", "message"], path: "/contact", label: "Contact" },
];

function matchCommand(transcript) {
  const lower = transcript.toLowerCase().trim();
  let best = null;
  let bestScore = 0;

  for (const cmd of COMMANDS) {
    for (const kw of cmd.keywords) {
      if (lower.includes(kw) && kw.length > bestScore) {
        best = cmd;
        bestScore = kw.length;
      }
    }
  }

  // "open X" / "go to X" / "show X" / "navigate to X" patterns
  const openMatch = lower.match(/(?:open|go to|show|navigate to|take me to)\s+(.+)/);
  if (openMatch) {
    const target = openMatch[1].trim();
    for (const cmd of COMMANDS) {
      for (const kw of cmd.keywords) {
        if (target.includes(kw) && kw.length > bestScore) {
          best = cmd;
          bestScore = kw.length;
        }
      }
    }
  }

  return best;
}

function speak(text) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.volume = 0.8;
  window.speechSynthesis.speak(utterance);
}

export default function VoiceAssistant() {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showPanel, setShowPanel] = useState(false);
  const recognitionRef = useRef(null);
  const timeoutRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SR) {
      setSupported(true);
      const recognition = new SR();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        let interim = "";
        let final = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const t = event.results[i][0].transcript;
          if (event.results[i].isFinal) final += t;
          else interim += t;
        }
        setTranscript(final || interim);

        if (final) {
          handleFinalTranscript(final);
        }
      };

      recognition.onerror = () => {
        setListening(false);
        setFeedback("Couldn't hear that. Try again.");
        clearFeedbackAfter(3000);
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognitionRef.current = recognition;
    }
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch {}
      }
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const clearFeedbackAfter = (ms) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setFeedback("");
      setTranscript("");
    }, ms);
  };

  const handleFinalTranscript = useCallback((text) => {
    const cmd = matchCommand(text);
    if (cmd) {
      setFeedback(`Opening ${cmd.label}...`);
      speak(`Opening ${cmd.label}`);
      setTimeout(() => {
        router.push(cmd.path);
        setShowPanel(false);
        setFeedback("");
        setTranscript("");
      }, 800);
    } else {
      setFeedback(`Didn't recognize "${text}". Try "open services" or "go to emergency".`);
      speak("Sorry, I didn't understand. Try saying open services or go to emergency.");
      clearFeedbackAfter(4000);
    }
  }, [router]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.abort();
      setListening(false);
    } else {
      setTranscript("");
      setFeedback("Listening...");
      setShowPanel(true);
      try {
        recognitionRef.current.start();
        setListening(true);
      } catch {
        setFeedback("Microphone unavailable.");
        clearFeedbackAfter(2000);
      }
    }
  };

  if (!supported) return null;

  return (
    <>
      {/* Floating mic button */}
      <motion.button
        onClick={() => { setShowPanel(true); toggleListening(); }}
        className="fixed bottom-18 right-5 z-50 p-3 rounded-full bg-foreground dark:bg-foreground text-background dark:text-background shadow-lg hover:opacity-90 transition-opacity"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Voice assistant"
        title="Voice navigation"
      >
        {listening ? (
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
            <Mic size={20} strokeWidth={2} />
          </motion.div>
        ) : (
          <Mic size={20} strokeWidth={2} />
        )}
      </motion.button>

      {/* Listening pulse ring */}
      <AnimatePresence>
        {listening && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="fixed bottom-18 right-5 z-40 w-12 h-12 rounded-full border-2 border-primary pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-30 right-5 z-50 w-80 max-w-[calc(100vw-3rem)] bg-card-bg dark:bg-card-bg border border-card-border rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Volume2 size={14} className="text-primary" strokeWidth={2} />
                  <span className="text-xs font-semibold text-foreground">Voice Navigation</span>
                </div>
                <button onClick={() => { setShowPanel(false); if (listening) { recognitionRef.current?.abort(); setListening(false); } }} className="p-1 rounded-lg hover:bg-section-bg transition-colors">
                  <X size={14} className="text-muted" strokeWidth={2} />
                </button>
              </div>

              {/* Visualizer */}
              <div className="flex items-center justify-center h-16 mb-3">
                {listening ? (
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 rounded-full bg-primary"
                        animate={{ height: [8, 24 + Math.random() * 16, 8] }}
                        transition={{ duration: 0.5 + Math.random() * 0.3, repeat: Infinity, delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-1 h-2 rounded-full bg-card-border" />
                    ))}
                  </div>
                )}
              </div>

              {/* Transcript */}
              {transcript && (
                <p className="text-sm text-foreground text-center mb-2 min-h-[20px]">
                  &ldquo;{transcript}&rdquo;
                </p>
              )}

              {/* Feedback */}
              {feedback && (
                <p className="text-xs text-muted text-center mb-3">{feedback}</p>
              )}

              {/* Mic toggle */}
              <button
                onClick={toggleListening}
                className={`w-full py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                  listening
                    ? "bg-emergency-red text-white"
                    : "bg-foreground text-background"
                }`}
              >
                {listening ? <><MicOff size={15} strokeWidth={2} /> Stop</> : <><Mic size={15} strokeWidth={2} /> Start Listening</>}
              </button>

              {/* Command hints */}
              <div className="mt-3 pt-3 border-t border-card-border">
                <p className="text-[10px] text-muted mb-2">Try saying:</p>
                <div className="flex flex-wrap gap-1.5">
                  {["open services", "go to schemes", "emergency", "medicine reminder", "find help"].map((hint) => (
                    <span key={hint} className="text-[10px] text-muted bg-section-bg dark:bg-section-bg px-2 py-1 rounded-md">{hint}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
