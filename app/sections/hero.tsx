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
    <section className="relative w-full h-screen flex items-center">
      {/* Full-bleed hero photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-door.jpg"
        alt="60 Walker St front door with Welcome mat"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient: dark on left for text, lighter on right for buttons */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/80 via-navy-900/40 to-navy-900/20" />

      {/* Left-aligned headline + subtitle */}
      <div className="relative z-10 px-6 md:px-16 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 leading-tight">
          Your Next Chapter Starts Here
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-2">
          60 Walker St — Walden, NY
        </p>
        <p className="text-base md:text-lg text-white/70">
          A welcoming shared home in the heart of the Hudson Valley
        </p>
      </div>

      {/* Floating off-center buttons (right side) */}
      <div className="absolute right-6 md:right-16 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-4">
        <button
          onClick={onSelectApplicant}
          className="flex items-center gap-2 py-3 px-6 rounded-full bg-white/95 text-navy text-base font-bold
                     shadow-lg backdrop-blur-sm
                     hover:bg-white hover:scale-105 active:scale-95 transition-all
                     focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
          aria-label="View applicant information about Walden NY"
        >
          <Icon name="MapPin" className="w-5 h-5" />
          Applicant
        </button>
        <button
          onClick={onSelectTenant}
          className="flex items-center gap-2 py-3 px-6 rounded-full bg-green text-white text-base font-bold
                     shadow-lg backdrop-blur-sm
                     hover:bg-green-600 hover:scale-105 active:scale-95 transition-all
                     focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
          aria-label="View tenant portal with house rules and utilities"
        >
          <Icon name="Home" className="w-5 h-5" />
          Tenant
        </button>
      </div>
    </section>
  );
}
