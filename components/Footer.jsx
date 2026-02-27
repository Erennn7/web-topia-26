"use client";

import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { Leaf, Phone, Mail } from "lucide-react";

export default function Footer() {
  const { t } = useLang();

  const links = [
    { title: t.nav.services, items: [
      { href: "/services", label: t.services.title },
      { href: "/schemes", label: t.nav.schemes },
      { href: "/medicine-reminder", label: t.nav.medicine },
    ]},
    { title: t.resources.title, items: [
      { href: "/resources", label: t.resources.title },
      { href: "/find-help", label: t.nav.findHelp },
      { href: "/emergency", label: t.nav.emergency },
    ]},
    { title: t.about.title, items: [
      { href: "/about", label: t.nav.about },
      { href: "/contact", label: t.nav.contact },
    ]},
  ];

  return (
    <footer className="bg-primary-dark text-white" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="bg-white/20 p-1.5 rounded-xl">
                <Leaf size={16} className="text-white" strokeWidth={2} />
              </div>
              <span className="text-lg font-bold">WEB-<span className="text-primary-light">TOPIA</span></span>
            </Link>
            <p className="text-white/50 text-xs">Made with care for seniors</p>
          </div>
          {links.map((group) => (
            <div key={group.title}>
              <h3 className="font-semibold text-sm mb-3">{group.title}</h3>
              <ul className="space-y-1.5">
                {group.items.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-white/60 hover:text-white text-xs transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4 text-xs text-white/50">
            <a href="tel:1-800-555-HELP" className="flex items-center gap-1 hover:text-white"><Phone size={11} strokeWidth={2} /> 1-800-555-HELP</a>
            <a href="mailto:help@webtopia.org" className="flex items-center gap-1 hover:text-white"><Mail size={11} strokeWidth={2} /> help@webtopia.org</a>
          </div>
          <p className="text-white/40 text-xs">&copy; {new Date().getFullYear()} WEB-TOPIA</p>
        </div>
      </div>
    </footer>
  );
}
