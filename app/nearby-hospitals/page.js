"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import {
  Hospital, MapPin, Navigation, ExternalLink,
  Maximize2, Minimize2, ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";

const EMBED_URL = "https://cureconnect-maps-client.vercel.app/";

export default function NearbyHospitalsPage() {
  const { t } = useLang();
  const hospitals = t.nearbyHospitals || {};
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <PageTransition className="min-h-screen bg-background">
      {fullscreen ? (
        <div className="fixed inset-0 z-50 bg-background flex flex-col">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-card-border bg-card-bg">
            <div className="flex items-center gap-2">
              <Hospital size={16} className="text-primary" strokeWidth={1.8} />
              <span className="text-sm font-semibold text-foreground">{hospitals.title || "Nearby Hospitals"}</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={EMBED_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg hover:bg-section-bg transition-colors text-muted hover:text-foreground"
                title="Open in new tab"
              >
                <ExternalLink size={14} strokeWidth={2} />
              </a>
              <button
                onClick={() => setFullscreen(false)}
                className="p-1.5 rounded-lg hover:bg-section-bg transition-colors text-muted hover:text-foreground"
              >
                <Minimize2 size={14} strokeWidth={2} />
              </button>
            </div>
          </div>
          <iframe
            src={EMBED_URL}
            className="flex-1 w-full border-0"
            allow="geolocation"
            title="Nearby Hospitals Map"
          />
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-muted hover:text-foreground text-sm mb-4 transition-colors"
            >
              <ArrowLeft size={14} strokeWidth={2} />
              {hospitals.back || "Back"}
            </Link>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 rounded-xl bg-warm">
                    <Hospital size={22} className="text-primary" strokeWidth={1.6} />
                  </div>
                  <h1 className="text-2xl lg:text-3xl font-semibold text-foreground tracking-tight">
                    {hospitals.title || "Nearby Hospitals"}
                  </h1>
                </div>
                <p className="text-muted text-sm max-w-lg">
                  {hospitals.subtitle || "Find hospitals, clinics, and medical facilities near your current location."}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFullscreen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-card-border text-sm font-medium text-foreground hover:bg-section-bg transition-colors"
                >
                  <Maximize2 size={14} strokeWidth={2} />
                  {hospitals.fullscreen || "Fullscreen"}
                </button>
                <a
                  href={EMBED_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <ExternalLink size={14} strokeWidth={2} />
                  {hospitals.openNew || "Open in New Tab"}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid sm:grid-cols-3 gap-3 mb-6"
          >
            {[
              { icon: MapPin, label: hospitals.featureLocate || "Auto-Detect Location", desc: hospitals.featureLocateDesc || "Uses your GPS to find nearby facilities" },
              { icon: Navigation, label: hospitals.featureDirections || "Get Directions", desc: hospitals.featureDirectionsDesc || "Navigate directly from the map" },
              { icon: Hospital, label: hospitals.featureDetails || "Hospital Details", desc: hospitals.featureDetailsDesc || "View contact info, ratings, and services" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                className="flex items-start gap-3 p-4 rounded-xl border border-card-border bg-card-bg hover:border-primary/15 hover:shadow-sm transition-all duration-200"
              >
                <div className="p-2 rounded-lg bg-warm shrink-0">
                  <item.icon size={16} className="text-primary" strokeWidth={1.6} />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{item.label}</p>
                  <p className="text-muted text-xs mt-0.5">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Embedded map */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-card-border overflow-hidden bg-card-bg shadow-sm"
          >
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-card-border">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs font-medium text-muted">{hospitals.live || "Live Map"}</span>
              </div>
              <button
                onClick={() => setFullscreen(true)}
                className="text-xs text-muted hover:text-foreground transition-colors flex items-center gap-1"
              >
                <Maximize2 size={11} strokeWidth={2} />
                {hospitals.expand || "Expand"}
              </button>
            </div>
            <iframe
              src={EMBED_URL}
              className="w-full border-0"
              style={{ height: "calc(100vh - 380px)", minHeight: "500px" }}
              allow="geolocation"
              title="Nearby Hospitals Map"
            />
          </motion.div>
        </div>
      )}
    </PageTransition>
  );
}
