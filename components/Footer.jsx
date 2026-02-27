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
      { href: "/nearby-hospitals", label: t.nav.hospitals || "Hospitals" },
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
    <footer className="border-t border-card-border" role="contentinfo">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <Leaf size={16} className="text-primary" strokeWidth={1.8} />
              <span className="text-base font-semibold text-foreground tracking-tight">WEB-TOPIA</span>
            </Link>
            <p className="text-muted text-xs leading-relaxed">
              Helping seniors find the care they deserve.
            </p>
          </div>
          {links.map((group) => (
            <div key={group.title}>
              <h3 className="font-medium text-foreground text-sm mb-3">{group.title}</h3>
              <ul className="space-y-2">
                {group.items.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-muted hover:text-foreground text-sm transition-colors duration-150">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-card-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-5 text-xs text-muted">
            <a href="tel:18001114567" className="flex items-center gap-1.5 hover:text-foreground transition-colors"><Phone size={11} strokeWidth={2} /> 1800-111-4567</a>
            <a href="mailto:help@webtopia.in" className="flex items-center gap-1.5 hover:text-foreground transition-colors"><Mail size={11} strokeWidth={2} /> help@webtopia.in</a>
          </div>
          <p className="text-muted/50 text-xs">&copy; {new Date().getFullYear()} WEB-TOPIA</p>
        </div>
      </div>
    </footer>
  );
}
