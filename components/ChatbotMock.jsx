"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { MessageCircle, X, Send } from "lucide-react";

const responses = {
  en: {
    greeting: "Hi! I'm the Lumis assistant. How can I help?",
    healthcare: "We offer free health checkups and in-home care. Want me to find services?",
    meals: "We connect you with meal delivery and community dining. Shall I find options?",
    emergency: "For emergencies, call 911. Elder Helpline: 1-800-555-HELP (24/7).",
    schemes: "Check your eligibility for government schemes on our Schemes page!",
    medicine: "Set up medicine reminders on our Medicine Reminder page!",
    fallback: "I can help with healthcare, meals, transport, legal aid, schemes, or medicine reminders. What do you need?",
    quickReplies: ["Healthcare", "Meals", "Gov Schemes", "Medicine Reminder"],
  },
  hi: {
    greeting: "नमस्ते! मैं Lumis सहायक हूं। कैसे मदद करूं?",
    healthcare: "हम मुफ्त स्वास्थ्य जांच और घर पर देखभाल प्रदान करते हैं।",
    meals: "हम भोजन वितरण और सामुदायिक भोजन से जोड़ते हैं।",
    emergency: "आपातकाल के लिए 112 पर कॉल करें। हेल्पलाइन: 1-800-555-HELP",
    schemes: "सरकारी योजनाओं की पात्रता हमारे योजना पेज पर जांचें!",
    medicine: "दवाई रिमाइंडर पेज पर रिमाइंडर सेट करें!",
    fallback: "मैं स्वास्थ्य, भोजन, परिवहन, कानूनी सहायता, योजनाएं या दवाई रिमाइंडर में मदद कर सकता हूं।",
    quickReplies: ["स्वास्थ्य", "भोजन", "सरकारी योजना", "दवाई रिमाइंडर"],
  },
  mr: {
    greeting: "नमस्कार! मी Lumis सहाय्यक आहे. कशी मदत करू?",
    healthcare: "आम्ही मोफत आरोग्य तपासणी आणि घरी सेवा देतो.",
    meals: "आम्ही जेवण वितरण आणि सामुदायिक जेवणाशी जोडतो.",
    emergency: "आणीबाणीसाठी 112 वर कॉल करा. हेल्पलाइन: 1-800-555-HELP",
    schemes: "सरकारी योजनांची पात्रता आमच्या योजना पेजवर तपासा!",
    medicine: "औषध स्मरणपत्र पेजवर रिमाइंडर सेट करा!",
    fallback: "मी आरोग्य, जेवण, वाहतूक, कायदेशीर मदत, योजना किंवा औषध स्मरणपत्रात मदत करू शकतो.",
    quickReplies: ["आरोग्य", "जेवण", "सरकारी योजना", "औषध स्मरणपत्र"],
  },
};

function getBotResponse(msg, lang) {
  const r = responses[lang] || responses.en;
  const lower = msg.toLowerCase();
  if (lower.includes("health") || lower.includes("स्वास्थ्य") || lower.includes("आरोग्य")) return r.healthcare;
  if (lower.includes("meal") || lower.includes("food") || lower.includes("भोजन") || lower.includes("जेवण")) return r.meals;
  if (lower.includes("emergency") || lower.includes("आपातकाल") || lower.includes("आणीबाणी")) return r.emergency;
  if (lower.includes("scheme") || lower.includes("योजना")) return r.schemes;
  if (lower.includes("medicine") || lower.includes("दवाई") || lower.includes("औषध")) return r.medicine;
  return r.fallback;
}

export default function ChatbotMock() {
  const { lang } = useLang();
  const r = responses[lang] || responses.en;
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: "bot", text: r.greeting }]);
  const [input, setInput] = useState("");

  const sendMessage = (text) => {
    const msg = text || input;
    if (!msg.trim()) return;
    setMessages((prev) => [...prev, { from: "user", text: msg }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: getBotResponse(msg, lang) }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 16, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.95 }}
            className="mb-3 w-72 sm:w-80 bg-card-bg border border-card-border rounded-2xl shadow-2xl overflow-hidden flex flex-col" style={{ maxHeight: "420px" }}>
            <div className="bg-primary text-white px-4 py-2.5 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-sm">Lumis</h3>
                <p className="text-[10px] text-white/60">Assistant</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 rounded-lg hover:bg-white/20"><X size={16} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-[160px] max-h-[250px]">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs ${m.from === "user" ? "bg-primary text-white rounded-br-sm" : "bg-section-bg text-foreground rounded-bl-sm"}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-3 pb-2 flex flex-wrap gap-1">
              {r.quickReplies.map((qr) => (
                <button key={qr} onClick={() => sendMessage(qr)} className="text-[10px] bg-section-bg text-primary px-2.5 py-1 rounded-full hover:bg-primary hover:text-white transition-colors">
                  {qr}
                </button>
              ))}
            </div>
            <div className="border-t border-card-border p-2 flex gap-1.5">
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="..." className="flex-1 bg-section-bg rounded-xl px-3 py-2 text-xs text-foreground outline-none" />
              <button onClick={() => sendMessage()} className="bg-primary text-white p-2 rounded-xl hover:bg-primary-dark"><Send size={14} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition-colors">
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </motion.button>
    </div>
  );
}
