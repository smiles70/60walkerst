"use client";

import React, { useState } from "react";
import HeroSection from "./sections/hero";
import ApplicantSection from "./sections/applicant";
import WelcomeSection from "./sections/welcome";
import UtilitiesSection from "./sections/utilities";
import ContactSection from "./sections/contact";
import { Icon } from "@/components/ui/icon";

type ViewMode = "hero" | "applicant" | "tenant";

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 py-2 px-4 rounded-lg text-sm font-bold text-navy bg-white border-2 border-navy-200
                 hover:bg-navy-50 active:bg-navy-100 transition-colors
                 focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
      aria-label="Back to home"
    >
      <Icon name="ArrowLeft" className="w-4 h-4" />
      Back
    </button>
  );
}

export default function Home(): React.ReactElement {
  const [view, setView] = useState<ViewMode>("hero");

  return (
    <main className="min-h-screen">
      {view === "hero" && (
        <HeroSection
          onSelectApplicant={() => setView("applicant")}
          onSelectTenant={() => setView("tenant")}
        />
      )}

      {view === "applicant" && (
        <>
          <div className="sticky top-0 z-50 bg-navy border-b-2 border-navy-700 shadow-md">
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="MapPin" className="w-5 h-5 text-green" />
                <span className="text-white font-bold">60 Walker St — Applicant Info</span>
              </div>
              <BackButton onClick={() => setView("hero")} />
            </div>
          </div>
          <ApplicantSection />
        </>
      )}

      {view === "tenant" && (
        <>
          <div className="sticky top-0 z-50 bg-navy border-b-2 border-navy-700 shadow-md">
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="Home" className="w-5 h-5 text-green" />
                <span className="text-white font-bold">60 Walker St — Tenant Portal</span>
              </div>
              <BackButton onClick={() => setView("hero")} />
            </div>
          </div>
          <WelcomeSection />
          <UtilitiesSection />
          <ContactSection />
        </>
      )}
    </main>
  );
}
