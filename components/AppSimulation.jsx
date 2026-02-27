"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft, Search, Send, Phone, Video, MoreVertical,
    Paperclip, Smile, Camera, Mic, Check, CheckCheck,
    Clock, User, Lock, IndianRupee,
    History, ChevronRight, MessageCircle,
    Image, FileText, MapPin, Contact, QrCode,
    Home, CreditCard, Bell, Settings, Plus,
    ArrowUpRight, ArrowDownLeft,
} from "lucide-react";
import TooltipModal from "./TooltipModal";
import TTSControl from "./TTSControl";
import StepGuide from "./StepGuide";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   GOOGLE PAY STEPS — Accurate to real GPay India
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const gpaySteps = [
    {
        id: "home",
        title: "Google Pay Home Screen",
        instruction: "This is the Google Pay home screen. You can see your recent contacts and quick action buttons at the top. To send money, tap on a contact or tap 'New payment'.",
        tts: "This is the Google Pay home screen. You can see your recent contacts and quick action buttons at the top. To send money, tap on a contact or tap New payment.",
    },
    {
        id: "pay-contact",
        title: "Select or Search Contact",
        instruction: "Search for the person you want to pay by entering their name, phone number, or UPI ID. You can also scan a QR code. Let's search for 'Rajesh Kumar'.",
        tts: "Search for the person you want to pay by entering their name, phone number, or UPI ID. You can also scan a QR code. Let us search for Rajesh Kumar.",
    },
    {
        id: "amount",
        title: "Enter Amount to Send",
        instruction: "Enter the amount you want to send. You can also add a note describing the purpose. Tap the 'Pay' button when ready to proceed.",
        tts: "Enter the amount you want to send. You can also add a note describing the purpose. Tap the Pay button when ready to proceed.",
    },
    {
        id: "upi-pin",
        title: "Enter Your UPI PIN",
        instruction: "Enter your 4 or 6 digit UPI PIN to authorize this payment. Your UPI PIN is set by your bank — never share it with anyone. This keeps your money safe.",
        tts: "Enter your 4 or 6 digit UPI PIN to authorize this payment. Your UPI PIN is set by your bank. Never share it with anyone. This keeps your money safe.",
    },
    {
        id: "success",
        title: "Payment Successful!",
        instruction: "Your payment of ₹500 was sent successfully to Rajesh Kumar! You will receive a confirmation SMS from your bank. The money is transferred instantly via UPI.",
        tts: "Your payment of 500 rupees was sent successfully to Rajesh Kumar! You will receive a confirmation SMS from your bank. The money is transferred instantly via UPI.",
    },
    {
        id: "history",
        title: "View Transaction History",
        instruction: "You can view all your past transactions here. Tap any transaction to see its full details including UPI reference number, date, and time.",
        tts: "You can view all your past transactions here. Tap any transaction to see its full details including UPI reference number, date, and time.",
    },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   WHATSAPP STEPS — Accurate to real WhatsApp Pay
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const whatsappSteps = [
    {
        id: "chats",
        title: "WhatsApp Chats Screen",
        instruction: "This is the WhatsApp home screen showing your recent chats. To send a payment, first open the chat of the person you want to pay. Let's tap on 'Rajesh Kumar'.",
        tts: "This is the WhatsApp home screen showing your recent chats. To send a payment, first open the chat of the person you want to pay. Let us tap on Rajesh Kumar.",
    },
    {
        id: "chat-open",
        title: "Open Chat with Contact",
        instruction: "You are now in the chat with Rajesh Kumar. To send a payment, tap the attachment icon (📎 paperclip) at the bottom of the screen next to the message bar.",
        tts: "You are now in the chat with Rajesh Kumar. To send a payment, tap the attachment icon at the bottom of the screen next to the message bar.",
    },
    {
        id: "attach-menu",
        title: "Attachment Menu Options",
        instruction: "The attachment menu shows several options — Camera, Gallery, Document, Location, Contact, and Payment. Tap the 'Payment' option (₹ icon) to start sending money.",
        tts: "The attachment menu shows several options including Camera, Gallery, Document, Location, Contact, and Payment. Tap the Payment option to start sending money.",
    },
    {
        id: "amount",
        title: "Enter Payment Amount",
        instruction: "Enter the amount you want to send to Rajesh Kumar. Type the amount using the number pad. Then tap the 'Send' button to proceed to payment confirmation.",
        tts: "Enter the amount you want to send to Rajesh Kumar. Type the amount using the number pad. Then tap the Send button to proceed to payment confirmation.",
    },
    {
        id: "confirm-bank",
        title: "Confirm Bank & Payment",
        instruction: "Review the payment details — the amount, recipient name, and your bank account. Make sure everything is correct. Tap 'Pay' to proceed to UPI PIN entry.",
        tts: "Review the payment details. The amount, recipient name, and your bank account. Make sure everything is correct. Tap Pay to proceed to UPI PIN entry.",
    },
    {
        id: "upi-pin",
        title: "Enter UPI PIN",
        instruction: "Enter your secret UPI PIN to authorize the payment. This PIN was set when you linked your bank account. Never share your UPI PIN with anyone.",
        tts: "Enter your secret UPI PIN to authorize the payment. This PIN was set when you linked your bank account. Never share your UPI PIN with anyone.",
    },
    {
        id: "success",
        title: "Payment Sent Successfully!",
        instruction: "Your payment of ₹500 has been sent to Rajesh Kumar! A payment confirmation message appears in the chat. The recipient will also receive a notification.",
        tts: "Your payment of 500 rupees has been sent to Rajesh Kumar! A payment confirmation message appears in the chat. The recipient will also receive a notification.",
    },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PHONE FRAME — Realistic phone wrapper
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function PhoneFrame({ children, headerBg, headerContent }) {
    return (
        <div className="w-full max-w-[380px] mx-auto">
            <div className="rounded-[2rem] border-[3px] border-foreground/10 dark:border-foreground/20 bg-card-bg shadow-2xl overflow-hidden">
                {/* Status bar */}
                <div className="flex items-center justify-between px-5 py-1.5 text-[11px] text-muted bg-foreground/5 dark:bg-foreground/10">
                    <span className="font-medium">9:41</span>
                    <div className="flex items-center gap-1.5">
                        <div className="flex gap-[2px]">
                            {[1, 2, 3, 4].map(i => <div key={i} className="w-[3px] rounded-full bg-muted" style={{ height: `${6 + i * 2}px` }} />)}
                        </div>
                        <div className="w-5 h-2.5 rounded-sm border border-muted relative">
                            <div className="absolute inset-[1px] right-[3px] bg-success rounded-[1px]" />
                        </div>
                    </div>
                </div>
                {/* App header */}
                <div className={headerBg}>
                    {headerContent}
                </div>
                {/* Content */}
                <div className="min-h-[400px] max-h-[460px] overflow-y-auto bg-card-bg">
                    {children}
                </div>
            </div>
        </div>
    );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   GOOGLE PAY SCREENS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function GPayHomeScreen({ highlight }) {
    const people = [
        { name: "Rajesh", initial: "R", color: "bg-blue-500" },
        { name: "Priya", initial: "P", color: "bg-purple-500" },
        { name: "Amit", initial: "A", color: "bg-orange-500" },
        { name: "Meera", initial: "M", color: "bg-pink-500" },
    ];
    return (
        <div className="p-4">
            {/* Quick actions */}
            <div className="grid grid-cols-4 gap-3 mb-5">
                {[
                    { icon: QrCode, label: "Scan QR", color: "text-primary" },
                    { icon: Send, label: "Pay contacts", color: "text-blue-500" },
                    { icon: ArrowDownLeft, label: "Receive", color: "text-success" },
                    { icon: CreditCard, label: "Pay bills", color: "text-orange-500" },
                ].map((a, i) => (
                    <div key={i} className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all ${highlight && i === 1 ? "bg-primary/10 ring-2 ring-primary/50 scale-105" : ""}`}>
                        <div className="w-10 h-10 rounded-full bg-section-bg flex items-center justify-center">
                            <a.icon size={18} className={a.color} />
                        </div>
                        <span className="text-[10px] text-muted font-medium text-center leading-tight">{a.label}</span>
                    </div>
                ))}
            </div>

            {/* People */}
            <p className="text-xs text-muted font-semibold mb-3 uppercase tracking-wider">People</p>
            <div className="flex gap-4 mb-5 overflow-x-auto pb-1">
                {people.map((p, i) => (
                    <div key={i} className={`flex flex-col items-center gap-1.5 flex-shrink-0 transition-all ${highlight && i === 0 ? "scale-110" : ""}`}>
                        <div className={`w-12 h-12 rounded-full ${p.color} flex items-center justify-center text-white font-bold text-sm shadow-md ${highlight && i === 0 ? "ring-3 ring-primary/50" : ""}`}>
                            {p.initial}
                        </div>
                        <span className="text-xs text-foreground">{p.name}</span>
                    </div>
                ))}
                <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full border-2 border-dashed border-card-border flex items-center justify-center ${highlight ? "border-primary animate-pulse" : ""}`}>
                        <Plus size={18} className="text-muted" />
                    </div>
                    <span className="text-xs text-muted">New</span>
                </div>
            </div>

            {/* Promotions / bills */}
            <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-section-bg rounded-xl">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                        <CreditCard size={16} className="text-orange-500" />
                    </div>
                    <div className="flex-1">
                        <p className="text-xs font-medium text-foreground">Pay electricity bill</p>
                        <p className="text-[10px] text-muted">Due in 3 days</p>
                    </div>
                    <ChevronRight size={14} className="text-muted" />
                </div>
                <div className="flex items-center gap-3 p-3 bg-section-bg rounded-xl">
                    <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <Bell size={14} className="text-success" />
                    </div>
                    <div className="flex-1">
                        <p className="text-xs font-medium text-foreground">Rewards available</p>
                        <p className="text-[10px] text-muted">Tap to see offers</p>
                    </div>
                    <ChevronRight size={14} className="text-muted" />
                </div>
            </div>
        </div>
    );
}

function GPaySearchScreen({ highlight }) {
    return (
        <div className="p-4">
            <div className={`flex items-center gap-2 p-3 rounded-xl border mb-4 transition-all ${highlight ? "border-primary bg-primary/5 ring-2 ring-primary/30" : "border-card-border bg-section-bg"}`}>
                <Search size={16} className="text-muted" />
                <span className="text-sm text-primary font-medium">Rajesh Kumar</span>
                <span className="ml-auto text-muted">|</span>
            </div>
            <p className="text-[10px] text-muted font-semibold mb-2 uppercase tracking-wider">Search result</p>
            <div className={`flex items-center gap-3 p-3 rounded-xl transition-all ${highlight ? "bg-primary/5 ring-2 ring-primary/30" : "bg-section-bg"}`}>
                <div className="w-11 h-11 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shadow-md">R</div>
                <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">Rajesh Kumar</p>
                    <p className="text-xs text-muted">+91 98765 43210 • rajesh@okbank</p>
                </div>
                <ChevronRight size={16} className="text-muted" />
            </div>
            <div className="mt-3 flex items-center gap-3 p-3 rounded-xl bg-section-bg/50">
                <div className="w-11 h-11 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold shadow-md">P</div>
                <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Priya Sharma</p>
                    <p className="text-xs text-muted">+91 87654 32109</p>
                </div>
            </div>
        </div>
    );
}

function GPayAmountScreen({ highlight }) {
    return (
        <div className="flex flex-col items-center py-6 px-5 gap-3">
            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">R</div>
            <p className="font-semibold text-foreground text-base">Rajesh Kumar</p>
            <p className="text-xs text-muted">+91 98765 43210</p>

            <div className={`flex items-baseline gap-1 mt-4 p-4 rounded-2xl border-2 transition-all ${highlight ? "border-primary bg-primary/5 ring-2 ring-primary/30" : "border-card-border"}`}>
                <span className="text-2xl font-bold text-foreground">₹</span>
                <span className="text-5xl font-bold text-foreground tracking-tight">500</span>
            </div>

            <div className="w-full px-2 mt-2">
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-section-bg border border-card-border">
                    <span className="text-xs text-muted">Note:</span>
                    <span className="text-xs text-foreground">For groceries</span>
                </div>
            </div>

            <div className="w-full mt-3 flex items-center gap-2 px-2">
                <div className="w-6 h-6 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <CreditCard size={12} className="text-blue-600" />
                </div>
                <span className="text-xs text-foreground flex-1">State Bank ••• 4521</span>
                <ChevronRight size={14} className="text-muted" />
            </div>

            <button className={`w-full mt-4 py-3.5 rounded-xl text-base font-semibold transition-all ${highlight ? "bg-primary text-white shadow-lg shadow-primary/30 animate-pulse ring-4 ring-primary/30" : "bg-section-bg text-muted cursor-not-allowed"}`} disabled={!highlight}>
                Pay ₹500
            </button>
        </div>
    );
}

function GPayPinScreen({ highlight }) {
    return (
        <div className="flex flex-col items-center py-8 px-6 gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock size={28} className="text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Enter UPI PIN</h3>
            <p className="text-sm text-muted text-center leading-relaxed">Enter your secret UPI PIN to authorize payment of <strong className="text-foreground">₹500</strong> to <strong className="text-foreground">Rajesh Kumar</strong></p>

            <div className="flex gap-3 my-3">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all ${highlight && i <= 3 ? "border-primary bg-primary/5" : "border-card-border"}`}>
                        {highlight && i <= 3 && <div className="w-3 h-3 rounded-full bg-foreground" />}
                    </div>
                ))}
            </div>

            {/* Fake numpad */}
            <div className="grid grid-cols-3 gap-2 w-full max-w-[220px] mt-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "✓"].map((n, i) => (
                    <div key={i} className={`h-10 rounded-lg flex items-center justify-center text-sm font-semibold transition-all ${n === "" ? "" : n === "✓" ? (highlight ? "bg-primary text-white" : "bg-section-bg text-muted") : "bg-section-bg text-foreground"}`}>
                        {n}
                    </div>
                ))}
            </div>
        </div>
    );
}

function GPaySuccessScreen() {
    return (
        <div className="flex flex-col items-center py-8 px-6 gap-3">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 10 }} className="w-20 h-20 rounded-full bg-success/15 flex items-center justify-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }}>
                    <Check size={40} className="text-success" strokeWidth={3} />
                </motion.div>
            </motion.div>
            <h3 className="text-xl font-bold text-success">Payment Successful!</h3>
            <p className="text-muted text-center text-sm">₹500 sent to Rajesh Kumar</p>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="w-full mt-3 p-4 bg-section-bg rounded-xl space-y-2.5">
                {[
                    ["Amount", "₹500.00"],
                    ["To", "Rajesh Kumar"],
                    ["UPI ID", "rajesh@okbank"],
                    ["Ref No.", "392847192038"],
                    ["Date", new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })],
                    ["Status", "✅ Completed"],
                ].map(([k, v], i) => (
                    <div key={i} className="flex justify-between text-sm">
                        <span className="text-muted">{k}</span>
                        <span className="font-medium text-foreground">{v}</span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

function GPayHistoryScreen({ highlight }) {
    const txns = [
        { name: "Rajesh Kumar", amount: "−₹500", time: "Just now", type: "sent", color: "text-emergency-red" },
        { name: "Salary Credit", amount: "+₹35,000", time: "28 Feb", type: "received", color: "text-success" },
        { name: "Grocery Store", amount: "−₹850", time: "27 Feb", type: "sent", color: "text-emergency-red" },
        { name: "Priya Sharma", amount: "+₹1,200", time: "25 Feb", type: "received", color: "text-success" },
    ];
    return (
        <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
                <History size={16} className="text-primary" />
                <h3 className="font-semibold text-foreground text-sm">All Transactions</h3>
            </div>
            <div className="space-y-1.5">
                {txns.map((tx, i) => (
                    <div key={i} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${highlight && i === 0 ? "bg-primary/5 ring-2 ring-primary/30" : "hover:bg-section-bg"}`}>
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center ${tx.type === "sent" ? "bg-red-100 dark:bg-red-900/20" : "bg-green-100 dark:bg-green-900/20"}`}>
                            {tx.type === "sent" ? <ArrowUpRight size={16} className="text-emergency-red" /> : <ArrowDownLeft size={16} className="text-success" />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{tx.name}</p>
                            <p className="text-[11px] text-muted">{tx.time}</p>
                        </div>
                        <span className={`text-sm font-bold ${tx.color}`}>{tx.amount}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   WHATSAPP SCREENS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function WAChatsScreen({ highlight }) {
    const chats = [
        { name: "Rajesh Kumar", msg: "Can you send the payment?", time: "10:30", unread: 1, online: true },
        { name: "Family Group 👨‍👩‍👧", msg: "Priya: See you at dinner!", time: "9:15", unread: 5 },
        { name: "Dr. Sharma", msg: "Your appointment is confirmed", time: "Yesterday", unread: 0 },
        { name: "Neighbour Aunty", msg: "Thank you for the help!", time: "Yesterday", unread: 0 },
    ];
    return (
        <div>
            {chats.map((c, i) => (
                <div key={i} className={`flex items-center gap-3 px-4 py-3.5 border-b border-card-border/30 transition-all ${highlight && i === 0 ? "bg-primary/5" : "hover:bg-section-bg/50"}`}>
                    <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <User size={20} className="text-primary" />
                        </div>
                        {c.online && <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-success border-2 border-card-bg" />}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                            <p className="text-sm font-semibold text-foreground truncate">{c.name}</p>
                            <span className={`text-[11px] ml-2 flex-shrink-0 ${c.unread > 0 ? "text-primary font-semibold" : "text-muted"}`}>{c.time}</span>
                        </div>
                        <div className="flex justify-between items-center mt-0.5">
                            <p className="text-xs text-muted truncate flex items-center gap-1">
                                {i === 0 && <CheckCheck size={13} className="text-blue-500 flex-shrink-0" />}
                                {c.msg}
                            </p>
                            {c.unread > 0 && (
                                <span className="ml-2 min-w-[20px] h-5 px-1.5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center flex-shrink-0 font-bold">{c.unread}</span>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function WAChatOpenScreen({ highlight }) {
    const msgs = [
        { from: "them", text: "Hello! How are you doing?", time: "10:25" },
        { from: "me", text: "I am doing great! Thank you 😊", time: "10:27" },
        { from: "them", text: "Can you send the payment for groceries?", time: "10:28" },
        { from: "me", text: "Sure, let me send it right now", time: "10:29" },
    ];
    return (
        <div className="flex flex-col h-[400px]">
            <div className="flex-1 p-3 space-y-2 bg-[#e5ddd5]/20 dark:bg-foreground/3 overflow-y-auto">
                {msgs.map((m, i) => (
                    <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[78%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${m.from === "me" ? "bg-primary/10 dark:bg-primary/15 text-foreground rounded-br-md" : "bg-card-bg text-foreground border border-card-border rounded-bl-md shadow-sm"}`}>
                            <p>{m.text}</p>
                            <div className="flex items-center justify-end gap-1 mt-1">
                                <span className="text-[10px] text-muted">{m.time}</span>
                                {m.from === "me" && <CheckCheck size={13} className="text-blue-500" />}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Input bar */}
            <div className="flex items-center gap-1.5 p-2 bg-card-bg border-t border-card-border/50">
                <Smile size={22} className="text-muted flex-shrink-0" />
                <div className="flex-1 px-3 py-2 rounded-full bg-section-bg text-sm text-muted">Type a message</div>
                <div className={`p-2.5 rounded-full transition-all cursor-pointer ${highlight ? "bg-primary text-white ring-4 ring-primary/30 animate-pulse shadow-lg" : "bg-section-bg text-muted"}`}>
                    <Paperclip size={18} />
                </div>
                <div className="p-2.5 rounded-full bg-section-bg">
                    <Mic size={18} className="text-muted" />
                </div>
            </div>
        </div>
    );
}

function WAAttachMenu({ highlight }) {
    const options = [
        { icon: Camera, label: "Camera", color: "bg-rose-500" },
        { icon: Image, label: "Gallery", color: "bg-purple-500" },
        { icon: FileText, label: "Document", color: "bg-indigo-500" },
        { icon: MapPin, label: "Location", color: "bg-green-600" },
        { icon: Contact, label: "Contact", color: "bg-blue-500" },
        { icon: IndianRupee, label: "Payment", color: "bg-teal-500" },
    ];
    return (
        <div className="flex flex-col h-[400px]">
            {/* Chat bg overlay */}
            <div className="flex-1 p-3 bg-[#e5ddd5]/20 dark:bg-foreground/3 opacity-40">
                <div className="flex justify-end mb-2">
                    <div className="px-3 py-2 rounded-2xl bg-primary/10 text-sm text-foreground rounded-br-md max-w-[70%]">Sure, let me send it right now</div>
                </div>
            </div>
            {/* Attachment grid */}
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="p-5 bg-card-bg border-t border-card-border">
                <div className="grid grid-cols-3 gap-5">
                    {options.map((opt, i) => {
                        const isPayment = opt.label === "Payment";
                        return (
                            <div key={i} className="flex flex-col items-center gap-2">
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md transition-all ${opt.color} ${highlight && isPayment ? "ring-4 ring-primary/40 animate-pulse scale-110 shadow-lg" : ""}`}>
                                    <opt.icon size={22} className="text-white" />
                                </div>
                                <span className={`text-xs font-medium ${isPayment && highlight ? "text-primary font-bold" : "text-muted"}`}>{opt.label}</span>
                            </div>
                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
}

function WAAmountScreen({ highlight }) {
    return (
        <div className="flex flex-col items-center py-6 px-5 gap-3">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <User size={24} className="text-primary" />
            </div>
            <p className="font-semibold text-foreground">Paying Rajesh Kumar</p>

            <div className={`flex items-baseline gap-1 mt-4 px-6 py-4 rounded-2xl border-2 transition-all ${highlight ? "border-primary bg-primary/5 ring-2 ring-primary/30" : "border-card-border"}`}>
                <span className="text-2xl font-bold text-foreground">₹</span>
                <span className="text-5xl font-bold text-foreground tracking-tight">500</span>
            </div>
            <span className="text-xs text-muted">Five hundred rupees</span>

            <button className={`w-full mt-5 py-3.5 rounded-xl text-base font-semibold transition-all ${highlight ? "bg-primary text-white shadow-lg shadow-primary/30 animate-pulse ring-4 ring-primary/30" : "bg-section-bg text-muted cursor-not-allowed"}`} disabled={!highlight}>
                <span className="flex items-center justify-center gap-2">Send ₹500 <Send size={16} /></span>
            </button>
        </div>
    );
}

function WAConfirmScreen({ highlight }) {
    return (
        <div className="flex flex-col py-6 px-5 gap-4">
            <h3 className="text-base font-bold text-foreground text-center">Confirm Payment</h3>

            <div className="bg-section-bg rounded-xl p-4 space-y-3">
                {[
                    ["Sending to", "Rajesh Kumar"],
                    ["UPI ID", "rajesh@okbank"],
                    ["Amount", "₹500.00"],
                    ["From Account", "State Bank ••• 4521"],
                ].map(([k, v], i) => (
                    <div key={i} className="flex justify-between text-sm">
                        <span className="text-muted">{k}</span>
                        <span className="font-medium text-foreground">{v}</span>
                    </div>
                ))}
            </div>

            <div className="flex items-start gap-2 p-3 bg-warm dark:bg-warm-dark rounded-lg">
                <Lock size={14} className="text-primary mt-0.5 flex-shrink-0" />
                <p className="text-xs text-muted leading-relaxed">Your payment is secured by UPI. Money will be deducted from your linked bank account.</p>
            </div>

            <button className={`w-full py-3.5 rounded-xl text-base font-semibold transition-all ${highlight ? "bg-primary text-white shadow-lg shadow-primary/30 animate-pulse ring-4 ring-primary/30" : "bg-section-bg text-muted cursor-not-allowed"}`} disabled={!highlight}>
                Pay ₹500
            </button>
        </div>
    );
}

function WAPinScreen({ highlight }) {
    return (
        <div className="flex flex-col items-center py-8 px-6 gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock size={28} className="text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Enter UPI PIN</h3>
            <p className="text-sm text-muted text-center">Paying <strong className="text-foreground">₹500</strong> to <strong className="text-foreground">Rajesh Kumar</strong></p>

            <div className="flex gap-3 my-3">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all ${highlight && i <= 3 ? "border-primary bg-primary/5" : "border-card-border"}`}>
                        {highlight && i <= 3 && <div className="w-3 h-3 rounded-full bg-foreground" />}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-3 gap-2 w-full max-w-[220px] mt-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "✓"].map((n, i) => (
                    <div key={i} className={`h-10 rounded-lg flex items-center justify-center text-sm font-semibold transition-all ${n === "" ? "" : n === "✓" ? (highlight ? "bg-primary text-white" : "bg-section-bg text-muted") : "bg-section-bg text-foreground"}`}>
                        {n}
                    </div>
                ))}
            </div>
        </div>
    );
}

function WASuccessScreen() {
    return (
        <div className="flex flex-col h-[400px]">
            <div className="flex-1 p-3 bg-[#e5ddd5]/20 dark:bg-foreground/3 space-y-2 overflow-y-auto">
                {/* Previous messages */}
                <div className="flex justify-end">
                    <div className="px-3 py-2 rounded-2xl bg-primary/10 text-sm text-foreground rounded-br-md max-w-[78%]">
                        <p>Sure, let me send it right now</p>
                        <div className="flex items-center justify-end gap-1 mt-1">
                            <span className="text-[10px] text-muted">10:29</span>
                            <CheckCheck size={13} className="text-blue-500" />
                        </div>
                    </div>
                </div>
                {/* Payment confirmation */}
                <div className="flex justify-end">
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", damping: 15, delay: 0.3 }} className="max-w-[85%] rounded-2xl bg-primary/10 dark:bg-primary/15 rounded-br-md overflow-hidden shadow-sm">
                        <div className="bg-success/10 dark:bg-success/15 px-4 py-3 flex items-center gap-3 border-b border-success/20">
                            <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                                <Check size={20} className="text-success" strokeWidth={3} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-success">₹500 Sent ✓</p>
                                <p className="text-[11px] text-muted">To Rajesh Kumar via UPI</p>
                            </div>
                        </div>
                        <div className="px-4 py-2 space-y-1">
                            <div className="flex justify-between text-xs"><span className="text-muted">Ref</span><span className="text-foreground">392847192038</span></div>
                            <div className="flex items-center justify-end gap-1 mt-1">
                                <span className="text-[10px] text-muted">10:31</span>
                                <CheckCheck size={13} className="text-blue-500" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAIN APP SIMULATION — Layout with phone + guide
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export default function AppSimulation({ app, onExit }) {
    const [currentStep, setCurrentStep] = useState(0);
    const steps = app === "gpay" ? gpaySteps : whatsappSteps;

    const handleNext = useCallback(() => {
        if (currentStep < steps.length - 1) setCurrentStep((p) => p + 1);
        else onExit();
    }, [currentStep, steps.length, onExit]);

    const handleBack = useCallback(() => {
        if (currentStep > 0) setCurrentStep((p) => p - 1);
    }, [currentStep]);

    // Keyboard nav
    StepGuide({ steps, currentStep, onNext: handleNext, onBack: handleBack, onExit });

    const step = steps[currentStep];

    /* Header for Google Pay */
    const gpayHeader = (
        <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-card-bg border-b border-card-border">
            <ArrowLeft size={20} className="text-foreground" />
            <div className="flex-1 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center">
                    <IndianRupee size={14} className="text-white" />
                </div>
                <span className="font-semibold text-foreground text-sm">Google Pay</span>
            </div>
            <Search size={18} className="text-muted" />
        </div>
    );

    /* Header for WhatsApp */
    const waHeader = step.id === "chats" ? (
        <div className="flex items-center justify-between px-4 py-3 bg-primary dark:bg-primary-dark">
            <span className="font-bold text-white text-base">WhatsApp</span>
            <div className="flex items-center gap-3">
                <Search size={18} className="text-white/80" />
                <MoreVertical size={18} className="text-white/80" />
            </div>
        </div>
    ) : (
        <div className="flex items-center gap-3 px-3 py-2.5 bg-primary dark:bg-primary-dark">
            <ArrowLeft size={20} className="text-white" />
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <User size={16} className="text-white" />
            </div>
            <div className="flex-1">
                <p className="text-white font-semibold text-sm">Rajesh Kumar</p>
                <p className="text-white/60 text-[10px]">online</p>
            </div>
            <Video size={18} className="text-white/80" />
            <Phone size={18} className="text-white/80" />
        </div>
    );

    const headerBg = app === "gpay" ? "" : "";
    const headerContent = app === "gpay" ? gpayHeader : waHeader;

    /* Render screen */
    const renderScreen = () => {
        if (app === "gpay") {
            switch (step.id) {
                case "home": return <GPayHomeScreen highlight />;
                case "pay-contact": return <GPaySearchScreen highlight />;
                case "amount": return <GPayAmountScreen highlight />;
                case "upi-pin": return <GPayPinScreen highlight />;
                case "success": return <GPaySuccessScreen />;
                case "history": return <GPayHistoryScreen highlight />;
                default: return null;
            }
        } else {
            switch (step.id) {
                case "chats": return <WAChatsScreen highlight />;
                case "chat-open": return <WAChatOpenScreen highlight />;
                case "attach-menu": return <WAAttachMenu highlight />;
                case "amount": return <WAAmountScreen highlight />;
                case "confirm-bank": return <WAConfirmScreen highlight />;
                case "upi-pin": return <WAPinScreen highlight />;
                case "success": return <WASuccessScreen />;
                default: return null;
            }
        }
    };

    return (
        <div className="w-full">
            {/* Top bar: Exit + TTS */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <button
                    onClick={onExit}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-section-bg text-foreground hover:bg-card-border transition-all text-base font-medium min-h-[48px]"
                    aria-label="Exit simulation"
                >
                    <ArrowLeft size={20} />
                    Exit
                </button>
                <TTSControl text={step.tts} autoPlay />
            </div>

            {/* Step title */}
            <motion.h3
                key={step.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-lg sm:text-xl font-bold text-foreground mb-4 text-center"
            >
                {step.title}
            </motion.h3>

            {/* Layout: Phone + Guide panel stacked vertically, phone on top */}
            <div className="flex flex-col gap-5 items-center">
                {/* Phone simulation */}
                <motion.div
                    key={`screen-${step.id}`}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-w-[380px]"
                >
                    <PhoneFrame headerBg={headerBg} headerContent={headerContent}>
                        {renderScreen()}
                    </PhoneFrame>
                </motion.div>

                {/* Guide panel BELOW the phone — NOT overlaying */}
                <div className="w-full max-w-[380px]">
                    <TooltipModal
                        instruction={step.instruction}
                        currentStep={currentStep + 1}
                        totalSteps={steps.length}
                        onNext={handleNext}
                        onBack={handleBack}
                        canGoBack={currentStep > 0}
                    />
                </div>
            </div>
        </div>
    );
}
