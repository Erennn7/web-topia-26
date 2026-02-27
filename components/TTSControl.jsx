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
        <div className="flex items-center gap-1.5">
            <button
                onClick={() => (speaking ? stop() : speak(text))}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary-light bg-warm text-foreground hover:bg-warm-dark min-h-[40px] border border-card-border"
                aria-label={speaking ? "Pause reading" : "Read aloud"}
            >
                {speaking ? <VolumeX size={16} strokeWidth={1.8} /> : <Volume2 size={16} strokeWidth={1.8} />}
                <span className="hidden sm:inline">{speaking ? "Pause" : "Listen"}</span>
            </button>
            <button
                onClick={() => speak(text)}
                className="flex items-center justify-center w-[40px] h-[40px] rounded-xl bg-warm hover:bg-warm-dark text-muted hover:text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary-light border border-card-border"
                aria-label="Replay reading"
            >
                <RotateCcw size={15} strokeWidth={1.8} />
            </button>
        </div>
    );
}
