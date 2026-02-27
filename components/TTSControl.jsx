"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Volume2, VolumeX, RotateCcw } from "lucide-react";

export default function TTSControl({ text, autoPlay = true }) {
    const [speaking, setSpeaking] = useState(false);
    const [supported, setSupported] = useState(false);
    const utteranceRef = useRef(null);

    useEffect(() => {
        setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
    }, []);

    const stop = useCallback(() => {
        if (typeof window !== "undefined" && window.speechSynthesis) {
            window.speechSynthesis.cancel();
            setSpeaking(false);
        }
    }, []);

    const speak = useCallback(
        (content) => {
            if (!supported || !content) return;
            stop();
            const utter = new SpeechSynthesisUtterance(content);
            utter.rate = 0.85;
            utter.pitch = 1;
            utter.lang = "en-IN";
            utter.onend = () => setSpeaking(false);
            utter.onerror = () => setSpeaking(false);
            utteranceRef.current = utter;
            window.speechSynthesis.speak(utter);
            setSpeaking(true);
        },
        [supported, stop]
    );

    useEffect(() => {
        if (autoPlay && text) {
            const timer = setTimeout(() => speak(text), 400);
            return () => clearTimeout(timer);
        }
        return () => stop();
    }, [text, autoPlay, speak, stop]);

    useEffect(() => {
        return () => stop();
    }, [stop]);

    if (!supported) return null;

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={() => (speaking ? stop() : speak(text))}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-base font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-primary bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30 min-h-[48px]"
                aria-label={speaking ? "Pause reading" : "Read aloud"}
            >
                {speaking ? (
                    <>
                        <VolumeX size={22} strokeWidth={2} />
                        <span className="hidden sm:inline">Pause</span>
                    </>
                ) : (
                    <>
                        <Volume2 size={22} strokeWidth={2} />
                        <span className="hidden sm:inline">Listen</span>
                    </>
                )}
            </button>
            <button
                onClick={() => speak(text)}
                className="flex items-center justify-center w-[48px] h-[48px] rounded-xl bg-section-bg hover:bg-card-border text-muted hover:text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Replay reading"
            >
                <RotateCcw size={20} strokeWidth={2} />
            </button>
        </div>
    );
}
