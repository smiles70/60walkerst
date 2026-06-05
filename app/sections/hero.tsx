"use client";

import React from "react";
import { Icon } from "@/components/ui/icon";

interface HeroSectionProps {
  onSelectApplicant: () => void;
  onSelectTenant: () => void;
}

export default function HeroSection({
  onSelectApplicant,
  onSelectTenant,
}: HeroSectionProps): React.ReactElement {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col">
      {/* Hero Image — save your photo as public/hero-door.jpg */}
      <div className="relative w-full h-[60vh] min-h-[400px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-door.jpg"
          alt="60 Walker St front door with Welcome mat"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay gradient — lighter to let the photo breathe */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-navy-900/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative -mt-32 mx-auto max-w-3xl px-4 pb-12 text-center z-10">
        <div className="rounded-2xl border-2 border-navy-200 bg-white p-8 shadow-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-2">
            Your Next Chapter Starts Here
          </h1>
          <p className="text-lg text-slate-600 mb-2">
            60 Walker St — Walden, NY
          </p>
          <p className="text-base text-slate-500 mb-6">
            A welcoming shared home in the heart of the Hudson Valley
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-sm font-medium">
              <Icon name="CheckCircle" className="w-4 h-4" />
              Available Now
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-navy-50 text-navy-700 text-sm font-medium">
              <Icon name="CheckCircle" className="w-4 h-4" />
              No Broker Fee
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 text-sm font-medium">
              <Icon name="CheckCircle" className="w-4 h-4" />
              Move-In Ready
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button
              onClick={onSelectApplicant}
              className="flex items-center justify-center gap-2 py-4 px-8 rounded-xl bg-navy text-white text-lg font-bold
                         hover:bg-navy-600 active:bg-navy-700 transition-colors
                         focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
              aria-label="View applicant information about Walden NY"
            >
              <Icon name="MapPin" className="w-5 h-5" />
              Applicant
            </button>
            <button
              onClick={onSelectTenant}
              className="flex items-center justify-center gap-2 py-4 px-8 rounded-xl bg-green text-white text-lg font-bold
                         hover:bg-green-600 active:bg-green-700 transition-colors
                         focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
              aria-label="View tenant portal with house rules and utilities"
            >
              <Icon name="Home" className="w-5 h-5" />
              Tenant
            </button>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-2 mb-6 text-sm text-slate-500">
            <Icon name="Star" className="w-4 h-4 text-amber-400" />
            <span>Loved by previous roommates</span>
            <span className="text-slate-300">·</span>
            <span className="font-medium text-navy">5-star household</span>
          </div>

          {/* What's Included teaser */}
          <div className="border-t border-navy-100 pt-6">
            <p className="text-xs font-bold text-navy-400 uppercase tracking-wider mb-4">
              What&apos;s Included
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: "Bed", label: "Private Bedroom" },
                { icon: "Home", label: "Shared Kitchen" },
                { icon: "Wifi", label: "High-Speed WiFi" },
                { icon: "Zap", label: "Utilities Included" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-navy-50/50"
                >
                  <Icon name={item.icon} className="w-5 h-5 text-navy-400" />
                  <span className="text-xs font-medium text-navy-600">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
