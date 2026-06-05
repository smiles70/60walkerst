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
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative -mt-32 mx-auto max-w-3xl px-4 pb-12 text-center z-10">
        <div className="rounded-2xl border-2 border-navy-200 bg-white p-8 shadow-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-2">
            60 Walker St
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Household Portal — Walden, NY
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        </div>
      </div>
    </section>
  );
}
