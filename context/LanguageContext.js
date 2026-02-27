"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";

const LanguageContext = createContext();

const translations = {
  en: {
    lang: "English",
    nav: { home: "Home", services: "Services", resources: "Resources", findHelp: "Find Help", emergency: "Emergency", about: "About", contact: "Contact", schemes: "Schemes", medicine: "Medicine", digitalLearning: "Learn" },
    hero: { badge: "Helping Seniors Live Better", title: "Senior Services & Support", subtitle: "Find healthcare, meals, transport & more", search: "Search services...", location: "Your location", cta: "Browse Services", sos: "Emergency Help" },
    quickAccess: { title: "Quick Access", subtitle: "Tap a card to explore" },
    categories: { healthcare: "Healthcare", meals: "Meals", transport: "Transport", legal: "Legal Aid", financial: "Financial", companion: "Companion", schemes: "Gov Schemes", medicine: "Medicine" },
    benefits: { title: "Why Lumis?", trust: "Trusted", trustDesc: "Verified services", quick: "Quick Access", quickDesc: "Find help fast", community: "Community", communityDesc: "Local resources", care: "Accessible", careDesc: "Easy to use" },
    testimonials: { title: "What Seniors Say" },
    cta: { title: "Need Help?", subtitle: "We connect you with trusted services", explore: "Explore Services", findHelp: "Find Help" },
    services: { title: "Services", subtitle: "Browse services for seniors", showing: "Showing", all: "All", learnMore: "Learn More", noResults: "No services found", clearFilters: "Clear filters" },
    detail: { eligibility: "Eligibility", benefits: "Benefits", howTo: "How to Access", contact: "Contact", faq: "FAQ", getStarted: "Get Started", callNow: "Call Now", emailUs: "Email", back: "Back to Services", bookmark: "Bookmark", bookmarked: "Saved" },
    emergency: { title: "Emergency", subtitle: "Call 911 for immediate danger", call911: "Call 911 Now", contacts: "Emergency Contacts", safety: "Safety Tips", sos: "SOS — Get Help", nonEmergency: "Non-Emergency Help?" },
    resources: { title: "Resources", subtitle: "Guides & tips for healthy aging" },
    findHelp: { title: "Find Help Near You", subtitle: "Enter location to find services", selectCity: "Select city", enterZip: "Zip code or address", search: "Search", mapPlaceholder: "Select location to see results", nearby: "Nearby Services" },
    about: { title: "About Lumis", subtitle: "Empowering seniors with dignity", mission: "Our Mission", vision: "Our Vision", values: "Our Values", team: "Our Team", accessibility: "Accessibility" },
    contact: { title: "Contact Us", subtitle: "We respond within 24 hours", sendMsg: "Send Message", name: "Full Name", email: "Email", phone: "Phone", subject: "Subject", message: "Message", sent: "Message Sent!", sendAnother: "Send another" },
    schemes: { title: "Government Schemes", subtitle: "Check your eligibility for healthcare schemes", enterDetails: "Enter Your Details", pan: "PAN Card Number", aadhaar: "Aadhaar Number", age: "Age", income: "Annual Income (₹)", state: "State", check: "Check Eligibility", results: "Available Schemes", eligible: "Eligible", apply: "Apply Now", details: "View Details", noSchemes: "No matching schemes found" },
    medicine: { title: "Medicine Reminder", subtitle: "Never miss a dose", addMed: "Add Medicine", name_: "Medicine Name", dosage: "Dosage", time: "Time", frequency: "Frequency", daily: "Daily", twiceDaily: "Twice Daily", weekly: "Weekly", add: "Add", taken: "Taken", skip: "Skip", streak: "Streak", points: "Points" },
    gamification: { level: "Level", points: "Points", streak: "Day Streak", badges: "Badges", tasks: "Complete tasks to earn points" },
    reading: { normal: "Normal", comfortable: "Comfortable", focus: "Focus" },
    digitalLearning: { badge: "Digital Learning", title: "Learn Digital Payments", subtitle: "Practice using WhatsApp and Google Pay safely with our interactive simulator", whatsappTitle: "WhatsApp Payments", whatsappDesc: "Learn to send payments through WhatsApp chat to your contacts safely.", gpayTitle: "Google Pay", gpayDesc: "Learn to send money, check balance, and view transaction history using Google Pay.", startLearning: "Start Learning", featureStep: "Step-by-Step Guide", featureStepDesc: "Easy guided instructions", featureVoice: "Voice Instructions", featureVoiceDesc: "Listen to every step", featureSafe: "100% Safe", featureSafeDesc: "No real money involved", safetyNote: "This is a safe simulation. No real money or data is used." },
    common: { phone: "Phone", email: "Email", address: "Address", hours: "Hours", viewAll: "View All", close: "Close", save: "Save", cancel: "Cancel", submit: "Submit", loading: "Loading..." },
  },
  hi: {
    lang: "हिन्दी",
    nav: { home: "होम", services: "सेवाएं", resources: "संसाधन", findHelp: "मदद खोजें", emergency: "आपातकाल", about: "हमारे बारे में", contact: "संपर्क", schemes: "योजनाएं", medicine: "दवाई", digitalLearning: "सीखें" },
    hero: { badge: "बुजुर्गों की बेहतर जिंदगी", title: "वरिष्ठ सेवाएं और सहायता", subtitle: "स्वास्थ्य, भोजन, परिवहन और अधिक", search: "सेवाएं खोजें...", location: "आपका स्थान", cta: "सेवाएं देखें", sos: "आपातकालीन मदद" },
    quickAccess: { title: "त्वरित पहुंच", subtitle: "कार्ड पर टैप करें" },
    categories: { healthcare: "स्वास्थ्य", meals: "भोजन", transport: "परिवहन", legal: "कानूनी सहायता", financial: "वित्तीय", companion: "साथी सेवा", schemes: "सरकारी योजना", medicine: "दवाई" },
    benefits: { title: "Lumis क्यों?", trust: "विश्वसनीय", trustDesc: "सत्यापित सेवाएं", quick: "तेज़ पहुंच", quickDesc: "जल्दी मदद पाएं", community: "समुदाय", communityDesc: "स्थानीय संसाधन", care: "सुलभ", careDesc: "उपयोग में आसान" },
    testimonials: { title: "बुजुर्ग क्या कहते हैं" },
    cta: { title: "मदद चाहिए?", subtitle: "हम आपको विश्वसनीय सेवाओं से जोड़ते हैं", explore: "सेवाएं देखें", findHelp: "मदद खोजें" },
    services: { title: "सेवाएं", subtitle: "वरिष्ठों के लिए सेवाएं", showing: "दिखा रहे हैं", all: "सभी", learnMore: "और जानें", noResults: "कोई सेवा नहीं मिली", clearFilters: "फिल्टर हटाएं" },
    detail: { eligibility: "पात्रता", benefits: "लाभ", howTo: "कैसे प्राप्त करें", contact: "संपर्क", faq: "प्रश्न", getStarted: "शुरू करें", callNow: "कॉल करें", emailUs: "ईमेल", back: "सेवाओं पर वापस", bookmark: "सेव करें", bookmarked: "सेव किया" },
    emergency: { title: "आपातकाल", subtitle: "तुरंत खतरे के लिए 112 पर कॉल करें", call911: "112 पर कॉल करें", contacts: "आपातकालीन नंबर", safety: "सुरक्षा सुझाव", sos: "SOS — मदद पाएं", nonEmergency: "गैर-आपातकालीन मदद?" },
    resources: { title: "संसाधन", subtitle: "स्वस्थ बुढ़ापे के लिए मार्गदर्शिका" },
    findHelp: { title: "अपने पास मदद खोजें", subtitle: "सेवाएं खोजने के लिए स्थान दर्ज करें", selectCity: "शहर चुनें", enterZip: "पिन कोड या पता", search: "खोजें", mapPlaceholder: "परिणाम देखने के लिए स्थान चुनें", nearby: "आस-पास की सेवाएं" },
    about: { title: "Lumis के बारे में", subtitle: "बुजुर्गों को सम्मान से सशक्त बनाना", mission: "हमारा मिशन", vision: "हमारी दृष्टि", values: "हमारे मूल्य", team: "हमारी टीम", accessibility: "सुलभता" },
    contact: { title: "संपर्क करें", subtitle: "हम 24 घंटे में जवाब देते हैं", sendMsg: "संदेश भेजें", name: "पूरा नाम", email: "ईमेल", phone: "फ़ोन", subject: "विषय", message: "संदेश", sent: "संदेश भेजा गया!", sendAnother: "और भेजें" },
    schemes: { title: "सरकारी योजनाएं", subtitle: "स्वास्थ्य योजनाओं की पात्रता जांचें", enterDetails: "अपना विवरण दर्ज करें", pan: "PAN कार्ड नंबर", aadhaar: "आधार नंबर", age: "उम्र", income: "वार्षिक आय (₹)", state: "राज्य", check: "पात्रता जांचें", results: "उपलब्ध योजनाएं", eligible: "पात्र", apply: "आवेदन करें", details: "विवरण देखें", noSchemes: "कोई योजना नहीं मिली" },
    medicine: { title: "दवाई रिमाइंडर", subtitle: "कोई खुराक न छूटे", addMed: "दवाई जोड़ें", name_: "दवाई का नाम", dosage: "खुराक", time: "समय", frequency: "कितनी बार", daily: "रोज़", twiceDaily: "दिन में दो बार", weekly: "साप्ताहिक", add: "जोड़ें", taken: "ली गई", skip: "छोड़ें", streak: "स्ट्रीक", points: "अंक" },
    gamification: { level: "स्तर", points: "अंक", streak: "दिन स्ट्रीक", badges: "बैज", tasks: "अंक कमाने के लिए कार्य पूरे करें" },
    reading: { normal: "सामान्य", comfortable: "आरामदायक", focus: "फोकस" },
    digitalLearning: { badge: "डिजिटल शिक्षा", title: "डिजिटल भुगतान सीखें", subtitle: "WhatsApp और Google Pay का सुरक्षित अभ्यास करें", whatsappTitle: "WhatsApp भुगतान", whatsappDesc: "WhatsApp चैट से अपने संपर्कों को सुरक्षित रूप से भुगतान भेजना सीखें।", gpayTitle: "Google Pay", gpayDesc: "Google Pay से पैसे भेजना, बैलेंस जांचना और लेनदेन इतिहास देखना सीखें।", startLearning: "सीखना शुरू करें", featureStep: "चरण-दर-चरण गाइड", featureStepDesc: "आसान निर्देश", featureVoice: "आवाज़ निर्देश", featureVoiceDesc: "हर चरण सुनें", featureSafe: "100% सुरक्षित", featureSafeDesc: "असली पैसे नहीं", safetyNote: "यह एक सुरक्षित सिमुलेशन है। कोई असली पैसा या डेटा उपयोग नहीं होता।" },
    common: { phone: "फ़ोन", email: "ईमेल", address: "पता", hours: "समय", viewAll: "सब देखें", close: "बंद करें", save: "सेव", cancel: "रद्द", submit: "जमा करें", loading: "लोड हो रहा है..." },
  },
  mr: {
    lang: "मराठी",
    nav: { home: "मुख्यपृष्ठ", services: "सेवा", resources: "संसाधने", findHelp: "मदत शोधा", emergency: "आणीबाणी", about: "आमच्याबद्दल", contact: "संपर्क", schemes: "योजना", medicine: "औषध", digitalLearning: "शिका" },
    hero: { badge: "ज्येष्ठांसाठी चांगले जीवन", title: "ज्येष्ठ सेवा आणि मदत", subtitle: "आरोग्य, जेवण, वाहतूक आणि बरेच काही", search: "सेवा शोधा...", location: "तुमचे ठिकाण", cta: "सेवा पहा", sos: "आणीबाणी मदत" },
    quickAccess: { title: "जलद प्रवेश", subtitle: "कार्डवर टॅप करा" },
    categories: { healthcare: "आरोग्य", meals: "जेवण", transport: "वाहतूक", legal: "कायदेशीर मदत", financial: "आर्थिक", companion: "सोबती सेवा", schemes: "सरकारी योजना", medicine: "औषध" },
    benefits: { title: "Lumis का?", trust: "विश्वसनीय", trustDesc: "सत्यापित सेवा", quick: "जलद", quickDesc: "लवकर मदत मिळवा", community: "समुदाय", communityDesc: "स्थानिक संसाधने", care: "सुलभ", careDesc: "वापरायला सोपे" },
    testimonials: { title: "ज्येष्ठ काय म्हणतात" },
    cta: { title: "मदत हवी?", subtitle: "आम्ही तुम्हाला विश्वसनीय सेवांशी जोडतो", explore: "सेवा पहा", findHelp: "मदत शोधा" },
    services: { title: "सेवा", subtitle: "ज्येष्ठांसाठी सेवा", showing: "दाखवत आहे", all: "सर्व", learnMore: "अधिक जाणा", noResults: "सेवा सापडली नाही", clearFilters: "फिल्टर काढा" },
    detail: { eligibility: "पात्रता", benefits: "फायदे", howTo: "कसे मिळवावे", contact: "संपर्क", faq: "प्रश्न", getStarted: "सुरू करा", callNow: "कॉल करा", emailUs: "ईमेल", back: "सेवांवर परत", bookmark: "सेव करा", bookmarked: "सेव केले" },
    emergency: { title: "आणीबाणी", subtitle: "तात्काळ धोक्यासाठी 112 वर कॉल करा", call911: "112 वर कॉल करा", contacts: "आणीबाणी क्रमांक", safety: "सुरक्षा टिप्स", sos: "SOS — मदत मिळवा", nonEmergency: "बिगर-आणीबाणी मदत?" },
    resources: { title: "संसाधने", subtitle: "निरोगी वृद्धत्वासाठी मार्गदर्शक" },
    findHelp: { title: "जवळ मदत शोधा", subtitle: "सेवा शोधण्यासाठी ठिकाण टाका", selectCity: "शहर निवडा", enterZip: "पिन कोड किंवा पत्ता", search: "शोधा", mapPlaceholder: "निकाल पाहण्यासाठी ठिकाण निवडा", nearby: "जवळच्या सेवा" },
    about: { title: "Lumis बद्दल", subtitle: "ज्येष्ठांना सन्मानाने सक्षम करणे", mission: "आमचे ध्येय", vision: "आमची दृष्टी", values: "आमची मूल्ये", team: "आमचा संघ", accessibility: "सुलभता" },
    contact: { title: "संपर्क करा", subtitle: "आम्ही 24 तासांत उत्तर देतो", sendMsg: "संदेश पाठवा", name: "पूर्ण नाव", email: "ईमेल", phone: "फोन", subject: "विषय", message: "संदेश", sent: "संदेश पाठवला!", sendAnother: "आणखी पाठवा" },
    schemes: { title: "सरकारी योजना", subtitle: "आरोग्य योजनांची पात्रता तपासा", enterDetails: "तुमचे तपशील टाका", pan: "PAN कार्ड क्रमांक", aadhaar: "आधार क्रमांक", age: "वय", income: "वार्षिक उत्पन्न (₹)", state: "राज्य", check: "पात्रता तपासा", results: "उपलब्ध योजना", eligible: "पात्र", apply: "अर्ज करा", details: "तपशील पहा", noSchemes: "कोणतीही योजना सापडली नाही" },
    medicine: { title: "औषध स्मरणपत्र", subtitle: "कोणताही डोस चुकवू नका", addMed: "औषध जोडा", name_: "औषधाचे नाव", dosage: "डोस", time: "वेळ", frequency: "किती वेळा", daily: "दररोज", twiceDaily: "दिवसातून दोनदा", weekly: "साप्ताहिक", add: "जोडा", taken: "घेतले", skip: "सोडा", streak: "स्ट्रीक", points: "गुण" },
    gamification: { level: "पातळी", points: "गुण", streak: "दिवस स्ट्रीक", badges: "बॅज", tasks: "गुण मिळवण्यासाठी कार्ये पूर्ण करा" },
    reading: { normal: "सामान्य", comfortable: "आरामदायक", focus: "फोकस" },
    digitalLearning: { badge: "डिजिटल शिक्षण", title: "डिजिटल पेमेंट शिका", subtitle: "WhatsApp आणि Google Pay चा सुरक्षित सराव करा", whatsappTitle: "WhatsApp पेमेंट", whatsappDesc: "WhatsApp चॅटद्वारे तुमच्या संपर्कांना सुरक्षितपणे पेमेंट पाठवायला शिका.", gpayTitle: "Google Pay", gpayDesc: "Google Pay ने पैसे पाठवणे, बॅलन्स तपासणे आणि व्यवहार इतिहास पाहणे शिका.", startLearning: "शिकायला सुरुवात करा", featureStep: "चरण-दर-चरण मार्गदर्शक", featureStepDesc: "सोप्या सूचना", featureVoice: "आवाज सूचना", featureVoiceDesc: "प्रत्येक पाऊल ऐका", featureSafe: "100% सुरक्षित", featureSafeDesc: "खरे पैसे नाहीत", safetyNote: "हे एक सुरक्षित सिम्युलेशन आहे. कोणतेही खरे पैसे किंवा डेटा वापरला जात नाही." },
    common: { phone: "फोन", email: "ईमेल", address: "पत्ता", hours: "वेळ", viewAll: "सर्व पहा", close: "बंद करा", save: "सेव", cancel: "रद्द", submit: "सबमिट करा", loading: "लोड होत आहे..." },
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const stored = localStorage.getItem("webtopia-lang");
    if (stored && translations[stored]) setLang(stored);
  }, []);

  const switchLang = useCallback((newLang) => {
    if (translations[newLang]) {
      setLang(newLang);
      localStorage.setItem("webtopia-lang", newLang);
    }
  }, []);

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, switchLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
