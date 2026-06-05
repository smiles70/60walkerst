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
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Full-bleed hero photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-door.jpg"
        alt="60 Walker St front door with Welcome mat"
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />

      {/* Warm vignette: darkens edges, preserves center warmth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_60%,rgba(0,0,0,0.75)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

      {/* Centered cinematic lockup */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-12 max-w-4xl mx-auto">
        {/* Headline — dominates the frame */}
        <h1 className="opacity-0 animate-hero-fade-up text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-green leading-[1.05] tracking-tight drop-shadow-2xl">
          Your Next Chapter
          <br />
          Starts Here
        </h1>

        {/* Address — secondary, grounded */}
        <p className="opacity-0 animate-hero-fade-up animation-delay-150 mt-6 text-2xl sm:text-3xl md:text-4xl font-semibold text-white/95 drop-shadow-lg">
          60 Walker St — Walden, NY
        </p>

        {/* Tagline — whispers */}
        <p className="opacity-0 animate-hero-fade-up animation-delay-300 mt-3 text-lg md:text-xl font-medium text-white/70 drop-shadow-md max-w-xl">
          A welcoming shared home in the heart of the Hudson Valley
        </p>

        {/* CTA buttons — side by side desktop, stacked mobile */}
        <div className="opacity-0 animate-hero-fade-up animation-delay-600 mt-10 md:mt-14 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onSelectApplicant}
            className="opacity-0 animate-hero-scale-in animation-delay-600 w-full sm:w-auto flex items-center justify-center gap-3 py-5 px-10 rounded-2xl bg-white text-navy text-lg font-bold
                       shadow-2xl shadow-black/25 backdrop-blur-sm
                       hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)] hover:bg-white/95 active:translate-y-0 active:scale-[0.98] transition-all duration-200
                       focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2
                       min-h-[64px] min-w-[200px]"
            aria-label="View applicant information about Walden NY"
          >
            <Icon name="MapPin" className="w-6 h-6" />
            Applicant
          </button>
          <button
            onClick={onSelectTenant}
            className="opacity-0 animate-hero-scale-in animation-delay-750 w-full sm:w-auto flex items-center justify-center gap-3 py-5 px-10 rounded-2xl bg-green text-white text-lg font-bold
                       shadow-2xl shadow-black/25 backdrop-blur-sm
                       hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)] hover:bg-green-500 active:translate-y-0 active:scale-[0.98] transition-all duration-200
                       focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2
                       min-h-[64px] min-w-[200px]"
            aria-label="View tenant portal with house rules and utilities"
          >
            <Icon name="Home" className="w-6 h-6" />
            Tenant
          </button>
        </div>
      </div>
    </section>
  );
}
