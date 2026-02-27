"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
    ArrowLeft, Search, Send, Phone, Video, MoreVertical,
    Paperclip, Smile, Camera, Mic, Check, CheckCheck,
    Clock, User, Lock, IndianRupee,
    History, ChevronRight, MessageCircle,
    Image, FileText, MapPin, Contact, QrCode,
    CreditCard, Bell, Plus,
    ArrowUpRight, ArrowDownLeft,
} from "lucide-react";
import TooltipModal from "./TooltipModal";
import TTSControl from "./TTSControl";
import StepGuide from "./StepGuide";

/* ━━━ GOOGLE PAY STEPS ━━━ */
const gpaySteps = [
    {
        id: "home",
        title: "Google Pay Home",
        instruction: "This is the Google Pay home screen. You see your recent contacts and quick action buttons. To send money, tap on a contact or tap 'Pay contacts'.",
        tts: "This is the Google Pay home screen. You see your recent contacts and quick action buttons. To send money, tap on a contact or tap Pay contacts.",
    },
    {
        id: "pay-contact",
        title: "Search Contact",
        instruction: "Search for the person you want to pay by name, phone number, or UPI ID. You can also scan a QR code. Let's search for 'Rajesh Kumar'.",
        tts: "Search for the person you want to pay by name, phone number, or UPI ID. You can also scan a QR code. Let us search for Rajesh Kumar.",
    },
    {
        id: "amount",
        title: "Enter Amount",
        instruction: "Enter the amount you want to send. You can add a note for the purpose. Select your bank account, then tap 'Pay' to proceed.",
        tts: "Enter the amount you want to send. You can add a note for the purpose. Select your bank account, then tap Pay to proceed.",
    },
    {
        id: "upi-pin",
        title: "Enter UPI PIN",
        instruction: "Enter your 4 or 6 digit UPI PIN to authorize this payment. Your UPI PIN is set by your bank — never share it with anyone.",
        tts: "Enter your 4 or 6 digit UPI PIN to authorize this payment. Your UPI PIN is set by your bank. Never share it with anyone.",
    },
    {
        id: "success",
        title: "Payment Successful!",
        instruction: "₹500 sent to Rajesh Kumar! You'll receive a confirmation SMS from your bank. The money is transferred instantly via UPI.",
        tts: "500 rupees sent to Rajesh Kumar! You will receive a confirmation SMS from your bank. The money is transferred instantly via UPI.",
    },
    {
        id: "history",
        title: "Transaction History",
        instruction: "View all your past transactions here. Tap any transaction to see full details including UPI reference number, date, and time.",
        tts: "View all your past transactions here. Tap any transaction to see full details including UPI reference number, date, and time.",
    },
];

/* ━━━ WHATSAPP STEPS ━━━ */
const whatsappSteps = [
    {
        id: "chats",
        title: "WhatsApp Chats",
        instruction: "This is WhatsApp showing your recent chats. To send a payment, open the chat of the person you want to pay. Let's tap on 'Rajesh Kumar'.",
        tts: "This is WhatsApp showing your recent chats. To send a payment, open the chat of the person you want to pay. Let us tap on Rajesh Kumar.",
    },
    {
        id: "chat-open",
        title: "Open Chat",
        instruction: "You're in the chat with Rajesh Kumar. To send a payment, tap the attachment icon (📎 paperclip) at the bottom next to the message bar.",
        tts: "You are in the chat with Rajesh Kumar. To send a payment, tap the attachment icon at the bottom next to the message bar.",
    },
    {
        id: "attach-menu",
        title: "Select Payment",
        instruction: "The attachment menu shows options — Camera, Gallery, Document, Location, Contact, and Payment. Tap the 'Payment' option (₹) to send money.",
        tts: "The attachment menu shows options. Tap the Payment option to send money.",
    },
    {
        id: "amount",
        title: "Enter Amount",
        instruction: "Enter the amount you want to send to Rajesh Kumar using the number pad. Then tap 'Send' to proceed to confirmation.",
        tts: "Enter the amount you want to send to Rajesh Kumar using the number pad. Then tap Send to proceed to confirmation.",
    },
    {
        id: "confirm-bank",
        title: "Confirm Payment",
        instruction: "Review the payment details — amount, recipient, and your bank account. Make sure everything is correct. Tap 'Pay' to enter UPI PIN.",
        tts: "Review the payment details. Make sure everything is correct. Tap Pay to enter UPI PIN.",
    },
    {
        id: "upi-pin",
        title: "Enter UPI PIN",
        instruction: "Enter your secret UPI PIN to authorize the payment. This PIN was set when you linked your bank account. Never share it.",
        tts: "Enter your secret UPI PIN to authorize the payment. This PIN was set when you linked your bank account. Never share it.",
    },
    {
        id: "success",
        title: "Payment Sent!",
        instruction: "₹500 has been sent to Rajesh Kumar! A payment confirmation appears in the chat. The recipient also gets a notification.",
        tts: "500 rupees has been sent to Rajesh Kumar! A payment confirmation appears in the chat.",
    },
];

/* ━━━ PHONE FRAME ━━━ */
function PhoneFrame({ children, headerContent }) {
    return (
        <div className="w-full">
            <div className="rounded-[1.75rem] border-2 border-card-border bg-card-bg premium-shadow overflow-hidden">
                {/* Status bar */}
                <div className="flex items-center justify-between px-4 py-1 text-[10px] text-muted bg-section-bg">
                    <span className="font-medium">9:41</span>
                    <div className="flex items-center gap-1">
                        <div className="flex gap-[2px]">
                            {[1, 2, 3, 4].map(i => <div key={i} className="w-[2.5px] rounded-full bg-muted/60" style={{ height: `${5 + i * 2}px` }} />)}
                        </div>
                        <div className="w-4 h-2 rounded-sm border border-muted/50 relative">
                            <div className="absolute inset-[1px] right-[2px] bg-success rounded-[1px]" />
                        </div>
                    </div>
                </div>
                {/* App header */}
                {headerContent}
                {/* Content */}
                <div className="min-h-[320px] max-h-[380px] overflow-y-auto bg-card-bg">
                    {children}
                </div>
            </div>
        </div>
    );
}

/* ━━━ HIGHLIGHT CLASS HELPER ━━━ */
const hl = "bg-primary/8 ring-2 ring-primary/25";
const hlBtn = "bg-foreground text-background hover:opacity-90 shadow-sm";
const dimBtn = "bg-section-bg text-muted cursor-not-allowed";

/* ━━━ GPAY SCREENS ━━━ */
function GPayHome() {
    const people = [
        { name: "Rajesh", init: "R", bg: "bg-accent" },
        { name: "Priya", init: "P", bg: "bg-secondary" },
        { name: "Amit", init: "A", bg: "bg-primary-light" },
        { name: "Meera", init: "M", bg: "bg-info" },
    ];
    return (
        <div className="p-3">
            <div className="grid grid-cols-4 gap-2 mb-4">
                {[
                    { icon: QrCode, label: "Scan QR" },
                    { icon: Send, label: "Pay" },
                    { icon: ArrowDownLeft, label: "Receive" },
                    { icon: CreditCard, label: "Bills" },
                ].map((a, i) => (
                    <div key={i} className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${i === 1 ? hl : ""}`}>
                        <div className="w-9 h-9 rounded-full bg-section-bg flex items-center justify-center">
                            <a.icon size={15} className="text-primary" strokeWidth={1.8} />
                        </div>
                        <span className="text-[9px] text-muted font-medium">{a.label}</span>
                    </div>
                ))}
            </div>
            <p className="text-[10px] text-muted font-semibold mb-2 uppercase tracking-wider">People</p>
            <div className="flex gap-3 mb-4">
                {people.map((p, i) => (
                    <div key={i} className={`flex flex-col items-center gap-1 ${i === 0 ? "scale-105" : ""}`}>
                        <div className={`w-10 h-10 rounded-full ${p.bg} flex items-center justify-center text-white text-xs font-bold shadow-sm ${i === 0 ? "ring-2 ring-primary/30" : ""}`}>{p.init}</div>
                        <span className="text-[10px] text-foreground">{p.name}</span>
                    </div>
                ))}
                <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-full border border-dashed border-card-border flex items-center justify-center"><Plus size={14} className="text-muted" /></div>
                    <span className="text-[10px] text-muted">New</span>
                </div>
            </div>
            <div className="space-y-1.5">
                {[
                    { icon: CreditCard, text: "Pay electricity bill", sub: "Due in 3 days" },
                    { icon: Bell, text: "Rewards available", sub: "Tap to see offers" },
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-2.5 bg-section-bg rounded-lg">
                        <div className="w-7 h-7 rounded-md bg-warm flex items-center justify-center"><item.icon size={13} className="text-primary" strokeWidth={1.8} /></div>
                        <div className="flex-1 min-w-0"><p className="text-[11px] font-medium text-foreground">{item.text}</p><p className="text-[9px] text-muted">{item.sub}</p></div>
                        <ChevronRight size={12} className="text-muted" />
                    </div>
                ))}
            </div>
        </div>
    );
}

function GPaySearch() {
    return (
        <div className="p-3">
            <div className={`flex items-center gap-2 p-2.5 rounded-xl border mb-3 ${hl}`}>
                <Search size={14} className="text-muted" />
                <span className="text-sm text-primary font-medium">Rajesh Kumar</span>
            </div>
            <p className="text-[9px] text-muted font-semibold mb-2 uppercase tracking-wider">Result</p>
            <div className={`flex items-center gap-2.5 p-2.5 rounded-xl ${hl}`}>
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold">R</div>
                <div className="flex-1"><p className="text-sm font-semibold text-foreground">Rajesh Kumar</p><p className="text-[11px] text-muted">+91 98765 43210 · rajesh@okbank</p></div>
                <ChevronRight size={14} className="text-muted" />
            </div>
        </div>
    );
}

function GPayAmount() {
    return (
        <div className="flex flex-col items-center py-5 px-4 gap-2">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white text-sm font-bold shadow-sm">R</div>
            <p className="font-semibold text-foreground text-sm">Rajesh Kumar</p>
            <p className="text-[11px] text-muted">+91 98765 43210</p>
            <div className={`flex items-baseline gap-1 mt-3 px-5 py-3 rounded-2xl border-2 ${hl}`}>
                <span className="text-xl font-bold text-foreground">₹</span>
                <span className="text-4xl font-bold text-foreground tracking-tight">500</span>
            </div>
            <div className="w-full mt-2 flex items-center gap-2 p-2 rounded-lg bg-section-bg border border-card-border">
                <span className="text-[10px] text-muted">Note:</span><span className="text-[10px] text-foreground">For groceries</span>
            </div>
            <div className="w-full mt-1 flex items-center gap-2 p-2 rounded-lg bg-section-bg">
                <CreditCard size={12} className="text-primary" /><span className="text-[11px] text-foreground flex-1">State Bank ••• 4521</span><ChevronRight size={12} className="text-muted" />
            </div>
            <button className={`w-full mt-3 py-3 rounded-xl text-sm font-semibold transition-all ${hlBtn} ring-4 ring-primary/20 animate-pulse`}>Pay ₹500</button>
        </div>
    );
}

function GPayPin() {
    return (
        <div className="flex flex-col items-center py-6 px-5 gap-3">
            <div className="w-12 h-12 rounded-full bg-warm flex items-center justify-center"><Lock size={22} className="text-primary" /></div>
            <h3 className="text-base font-bold text-foreground">Enter UPI PIN</h3>
            <p className="text-xs text-muted text-center">Authorize payment of <strong className="text-foreground">₹500</strong> to <strong className="text-foreground">Rajesh Kumar</strong></p>
            <div className="flex gap-2.5 my-2">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center ${i <= 3 ? "border-primary bg-primary/5" : "border-card-border"}`}>
                        {i <= 3 && <div className="w-2.5 h-2.5 rounded-full bg-foreground" />}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-3 gap-1.5 w-full max-w-[180px] mt-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "✓"].map((n, i) => (
                    <div key={i} className={`h-8 rounded-lg flex items-center justify-center text-xs font-semibold ${n === "" ? "" : n === "✓" ? "bg-foreground text-background" : "bg-section-bg text-foreground"}`}>{n}</div>
                ))}
            </div>
        </div>
    );
}

function GPaySuccess() {
    return (
        <div className="flex flex-col items-center py-6 px-5 gap-2">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 12 }} className="w-16 h-16 rounded-full bg-success/15 flex items-center justify-center">
                <Check size={32} className="text-success" strokeWidth={3} />
            </motion.div>
            <h3 className="text-lg font-bold text-success">Payment Successful!</h3>
            <p className="text-muted text-center text-xs">₹500 sent to Rajesh Kumar</p>
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="w-full mt-2 p-3 bg-section-bg rounded-xl space-y-1.5 text-[11px]">
                {[["Amount", "₹500.00"], ["To", "Rajesh Kumar"], ["UPI ID", "rajesh@okbank"], ["Ref", "392847192038"], ["Date", new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })], ["Status", "✅ Completed"]].map(([k, v], i) => (
                    <div key={i} className="flex justify-between"><span className="text-muted">{k}</span><span className="font-medium text-foreground">{v}</span></div>
                ))}
            </motion.div>
        </div>
    );
}

function GPayHistory() {
    const txns = [
        { name: "Rajesh Kumar", amount: "−₹500", time: "Just now", type: "sent" },
        { name: "Salary Credit", amount: "+₹35,000", time: "28 Feb", type: "received" },
        { name: "Grocery Store", amount: "−₹850", time: "27 Feb", type: "sent" },
    ];
    return (
        <div className="p-3">
            <div className="flex items-center gap-1.5 mb-3"><History size={13} className="text-primary" /><h3 className="font-semibold text-foreground text-xs">Transactions</h3></div>
            <div className="space-y-1">
                {txns.map((tx, i) => (
                    <div key={i} className={`flex items-center gap-2.5 p-2.5 rounded-xl ${i === 0 ? hl : "hover:bg-section-bg"}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.type === "sent" ? "bg-emergency-bg" : "bg-warm"}`}>
                            {tx.type === "sent" ? <ArrowUpRight size={14} className="text-emergency-red" /> : <ArrowDownLeft size={14} className="text-success" />}
                        </div>
                        <div className="flex-1 min-w-0"><p className="text-xs font-medium text-foreground truncate">{tx.name}</p><p className="text-[10px] text-muted">{tx.time}</p></div>
                        <span className={`text-xs font-bold ${tx.type === "sent" ? "text-emergency-red" : "text-success"}`}>{tx.amount}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ━━━ WHATSAPP SCREENS ━━━ */
function WAChats() {
    const chats = [
        { name: "Rajesh Kumar", msg: "Can you send the payment?", time: "10:30", unread: 1, online: true },
        { name: "Family Group 👨‍👩‍👧", msg: "Priya: See you at dinner!", time: "9:15", unread: 5 },
        { name: "Dr. Sharma", msg: "Appointment confirmed", time: "Yesterday", unread: 0 },
    ];
    return (
        <div>
            {chats.map((c, i) => (
                <div key={i} className={`flex items-center gap-2.5 px-3 py-3 border-b border-card-border/30 ${i === 0 ? "bg-primary/5" : ""}`}>
                    <div className="relative flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center"><User size={16} className="text-secondary" /></div>
                        {c.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-success border-2 border-card-bg" />}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline"><p className="text-xs font-semibold text-foreground truncate">{c.name}</p><span className={`text-[10px] ml-1 flex-shrink-0 ${c.unread ? "text-primary font-semibold" : "text-muted"}`}>{c.time}</span></div>
                        <div className="flex justify-between items-center mt-0.5">
                            <p className="text-[11px] text-muted truncate">{c.msg}</p>
                            {c.unread > 0 && <span className="ml-1 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-white text-[9px] flex items-center justify-center font-bold">{c.unread}</span>}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function WAChatOpen() {
    const msgs = [
        { from: "them", text: "Hello! How are you?", time: "10:25" },
        { from: "me", text: "Doing great! Thank you 😊", time: "10:27" },
        { from: "them", text: "Can you send the payment?", time: "10:28" },
        { from: "me", text: "Sure, sending now", time: "10:29" },
    ];
    return (
        <div className="flex flex-col h-[320px]">
            <div className="flex-1 p-2.5 space-y-1.5 bg-warm/30 dark:bg-warm/20 overflow-y-auto">
                {msgs.map((m, i) => (
                    <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[78%] px-2.5 py-1.5 rounded-xl text-xs leading-relaxed ${m.from === "me" ? "bg-primary/8 text-foreground rounded-br-sm" : "bg-card-bg text-foreground border border-card-border rounded-bl-sm"}`}>
                            <p>{m.text}</p>
                            <div className="flex items-center justify-end gap-1 mt-0.5"><span className="text-[9px] text-muted">{m.time}</span>{m.from === "me" && <CheckCheck size={11} className="text-info" />}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-1.5 p-2 bg-card-bg border-t border-card-border/50">
                <Smile size={18} className="text-muted" />
                <div className="flex-1 px-2.5 py-1.5 rounded-full bg-section-bg text-[11px] text-muted">Type a message</div>
                <div className={`p-2 rounded-full ${hlBtn} ring-3 ring-primary/25 animate-pulse`}><Paperclip size={15} /></div>
                <div className="p-2 rounded-full bg-section-bg"><Mic size={15} className="text-muted" /></div>
            </div>
        </div>
    );
}

function WAAttach() {
    const opts = [
        { icon: Camera, label: "Camera", bg: "bg-rose-500" },
        { icon: Image, label: "Gallery", bg: "bg-purple-500" },
        { icon: FileText, label: "Document", bg: "bg-indigo-500" },
        { icon: MapPin, label: "Location", bg: "bg-secondary" },
        { icon: Contact, label: "Contact", bg: "bg-info" },
        { icon: IndianRupee, label: "Payment", bg: "bg-accent" },
    ];
    return (
        <div className="flex flex-col h-[320px]">
            <div className="flex-1 p-2.5 bg-warm/30 dark:bg-warm/20 opacity-40">
                <div className="flex justify-end"><div className="px-2.5 py-1.5 rounded-xl bg-primary/8 text-xs text-foreground rounded-br-sm max-w-[65%]">Sure, sending now</div></div>
            </div>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="p-4 bg-card-bg border-t border-card-border">
                <div className="grid grid-cols-3 gap-4">
                    {opts.map((o, i) => {
                        const isPay = o.label === "Payment";
                        return (
                            <div key={i} className="flex flex-col items-center gap-1.5">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${o.bg} ${isPay ? "ring-3 ring-primary/40 animate-pulse scale-110" : ""}`}>
                                    <o.icon size={18} className="text-white" />
                                </div>
                                <span className={`text-[10px] font-medium ${isPay ? "text-primary font-bold" : "text-muted"}`}>{o.label}</span>
                            </div>
                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
}

function WAAmount() {
    return (
        <div className="flex flex-col items-center py-5 px-4 gap-2">
            <div className="w-11 h-11 rounded-full bg-secondary/15 flex items-center justify-center"><User size={18} className="text-secondary" /></div>
            <p className="font-semibold text-foreground text-sm">Paying Rajesh Kumar</p>
            <div className={`flex items-baseline gap-1 mt-3 px-5 py-3 rounded-2xl border-2 ${hl}`}>
                <span className="text-xl font-bold text-foreground">₹</span>
                <span className="text-4xl font-bold text-foreground tracking-tight">500</span>
            </div>
            <span className="text-[10px] text-muted">Five hundred rupees</span>
            <button className={`w-full mt-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 ${hlBtn} ring-4 ring-primary/20 animate-pulse`}>Send ₹500 <Send size={14} /></button>
        </div>
    );
}

function WAConfirm() {
    return (
        <div className="flex flex-col py-5 px-4 gap-3">
            <h3 className="text-sm font-bold text-foreground text-center">Confirm Payment</h3>
            <div className="bg-section-bg rounded-xl p-3 space-y-2 text-[11px]">
                {[["To", "Rajesh Kumar"], ["UPI ID", "rajesh@okbank"], ["Amount", "₹500.00"], ["From", "State Bank ••• 4521"]].map(([k, v], i) => (
                    <div key={i} className="flex justify-between"><span className="text-muted">{k}</span><span className="font-medium text-foreground">{v}</span></div>
                ))}
            </div>
            <div className="flex items-start gap-2 p-2.5 bg-warm rounded-lg border border-card-border">
                <Lock size={12} className="text-primary mt-0.5 flex-shrink-0" />
                <p className="text-[10px] text-muted leading-relaxed">Your payment is secured by UPI.</p>
            </div>
            <button className={`w-full py-3 rounded-xl text-sm font-semibold ${hlBtn} ring-4 ring-primary/20 animate-pulse`}>Pay ₹500</button>
        </div>
    );
}

function WAPin() {
    return (
        <div className="flex flex-col items-center py-6 px-5 gap-3">
            <div className="w-12 h-12 rounded-full bg-warm flex items-center justify-center"><Lock size={22} className="text-primary" /></div>
            <h3 className="text-base font-bold text-foreground">Enter UPI PIN</h3>
            <p className="text-xs text-muted text-center">Paying <strong className="text-foreground">₹500</strong> to <strong className="text-foreground">Rajesh Kumar</strong></p>
            <div className="flex gap-2.5 my-2">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center ${i <= 3 ? "border-primary bg-primary/5" : "border-card-border"}`}>
                        {i <= 3 && <div className="w-2.5 h-2.5 rounded-full bg-foreground" />}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-3 gap-1.5 w-full max-w-[180px] mt-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "✓"].map((n, i) => (
                    <div key={i} className={`h-8 rounded-lg flex items-center justify-center text-xs font-semibold ${n === "" ? "" : n === "✓" ? "bg-foreground text-background" : "bg-section-bg text-foreground"}`}>{n}</div>
                ))}
            </div>
        </div>
    );
}

function WASuccess() {
    return (
        <div className="flex flex-col h-[320px]">
            <div className="flex-1 p-2.5 bg-warm/30 dark:bg-warm/20 space-y-1.5 overflow-y-auto">
                <div className="flex justify-end"><div className="max-w-[78%] px-2.5 py-1.5 rounded-xl bg-primary/8 text-xs text-foreground rounded-br-sm"><p>Sure, sending now</p><div className="flex items-center justify-end gap-1 mt-0.5"><span className="text-[9px] text-muted">10:29</span><CheckCheck size={11} className="text-info" /></div></div></div>
                <div className="flex justify-end">
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", damping: 15, delay: 0.3 }} className="max-w-[85%] rounded-xl bg-primary/8 rounded-br-sm overflow-hidden">
                        <div className="bg-success/10 px-3 py-2.5 flex items-center gap-2.5 border-b border-success/15">
                            <div className="w-8 h-8 rounded-full bg-success/15 flex items-center justify-center"><Check size={16} className="text-success" strokeWidth={3} /></div>
                            <div><p className="text-xs font-bold text-success">₹500 Sent ✓</p><p className="text-[10px] text-muted">To Rajesh Kumar via UPI</p></div>
                        </div>
                        <div className="px-3 py-1.5"><div className="flex items-center justify-end gap-1"><span className="text-[9px] text-muted">10:31</span><CheckCheck size={11} className="text-info" /></div></div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}


/* ━━━ MAIN SIMULATION ━━━ */
export default function AppSimulation({ app, onExit }) {
    const [currentStep, setCurrentStep] = useState(0);
    const steps = app === "gpay" ? gpaySteps : whatsappSteps;

    const handleNext = useCallback(() => {
        if (currentStep < steps.length - 1) setCurrentStep(p => p + 1);
        else onExit();
    }, [currentStep, steps.length, onExit]);

    const handleBack = useCallback(() => {
        if (currentStep > 0) setCurrentStep(p => p - 1);
    }, [currentStep]);

    StepGuide({ steps, currentStep, onNext: handleNext, onBack: handleBack, onExit });

    const step = steps[currentStep];

    /* Headers */
    const gpayHeader = (
        <div className="flex items-center gap-2.5 px-3 py-2.5 bg-card-bg border-b border-card-border">
            <ArrowLeft size={16} className="text-foreground" />
            <div className="w-6 h-6 rounded-md bg-accent flex items-center justify-center"><IndianRupee size={12} className="text-white" /></div>
            <span className="font-semibold text-foreground text-xs flex-1">Google Pay</span>
            <Search size={14} className="text-muted" />
        </div>
    );

    const waHeader = step.id === "chats" ? (
        <div className="flex items-center justify-between px-3 py-2.5 bg-secondary dark:bg-secondary">
            <span className="font-bold text-white text-sm">WhatsApp</span>
            <div className="flex items-center gap-2.5"><Search size={15} className="text-white/80" /><MoreVertical size={15} className="text-white/80" /></div>
        </div>
    ) : (
        <div className="flex items-center gap-2.5 px-3 py-2 bg-secondary dark:bg-secondary">
            <ArrowLeft size={16} className="text-white" />
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><User size={14} className="text-white" /></div>
            <div className="flex-1"><p className="text-white font-semibold text-xs">Rajesh Kumar</p><p className="text-white/50 text-[9px]">online</p></div>
            <Video size={15} className="text-white/80" />
            <Phone size={15} className="text-white/80" />
        </div>
    );

    const headerContent = app === "gpay" ? gpayHeader : waHeader;

    const renderScreen = () => {
        if (app === "gpay") {
            switch (step.id) {
                case "home": return <GPayHome />;
                case "pay-contact": return <GPaySearch />;
                case "amount": return <GPayAmount />;
                case "upi-pin": return <GPayPin />;
                case "success": return <GPaySuccess />;
                case "history": return <GPayHistory />;
            }
        } else {
            switch (step.id) {
                case "chats": return <WAChats />;
                case "chat-open": return <WAChatOpen />;
                case "attach-menu": return <WAAttach />;
                case "amount": return <WAAmount />;
                case "confirm-bank": return <WAConfirm />;
                case "upi-pin": return <WAPin />;
                case "success": return <WASuccess />;
            }
        }
        return null;
    };

    return (
        <div className="w-full">
            {/* Top: exit + TTS */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <button onClick={onExit} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-warm text-foreground hover:bg-warm-dark transition-colors text-sm font-medium min-h-[40px] border border-card-border" aria-label="Exit simulation">
                    <ArrowLeft size={16} />Exit
                </button>
                <TTSControl text={step.tts} autoPlay />
            </div>

            {/* Step title */}
            <motion.h3 key={step.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="text-base sm:text-lg font-bold text-foreground mb-3 text-center">
                {step.title}
            </motion.h3>

            {/* SIDE-BY-SIDE on desktop, stacked on mobile */}
            <div className="flex flex-col lg:flex-row gap-4 items-start">
                {/* Phone */}
                <motion.div key={`s-${step.id}`} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.25 }} className="w-full lg:w-1/2 max-w-[380px] mx-auto lg:mx-0">
                    <PhoneFrame headerContent={headerContent}>{renderScreen()}</PhoneFrame>
                </motion.div>

                {/* Guide panel — side on desktop, below on mobile */}
                <div className="w-full lg:w-1/2 lg:sticky lg:top-20">
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
