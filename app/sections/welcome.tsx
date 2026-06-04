"use client";

import React, { useState } from "react";
import {
  houseRules,
  welcomeTitle,
  welcomeSubtitle,
  keyReminder,
  type RuleCategory,
} from "../data/house-rules";

function Icon({ name, className }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactElement> = {
    MessageCircle: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    Sparkles: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    Package: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    Wifi: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
    AlertTriangle: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  };
  return icons[name] || null;
}

function InfoCard({ category }: { category: RuleCategory }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (category.id === "wifi") {
      const password = category.items.find((i) => i.startsWith("Password:"));
      if (password) {
        const pw = password.replace("Password: ", "");
        try {
          await navigator.clipboard.writeText(pw);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          /* graceful fallback: text remains selectable */
        }
      }
    }
  };

  const baseCardClasses = category.highlight
    ? "border-green bg-green-50"
    : "border-navy-200 bg-white hover:border-green";

  return (
    <div
      className={`relative rounded-xl border-2 p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${baseCardClasses}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg ${category.highlight ? "bg-green" : "bg-navy"}`}>
          <Icon name={category.icon} className="w-5 h-5 text-white" />
        </div>
        <h3 className={`text-lg font-bold ${category.highlight ? "text-green" : "text-navy"}`}>
          {category.title}
        </h3>
      </div>
      <ul className="space-y-1.5">
        {category.items.map((item, idx) => (
          <li key={idx} className="text-slate-700 text-sm flex items-start gap-2">
            <span className="text-green mt-1 shrink-0">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {category.id === "wifi" && (
        <button
          onClick={handleCopy}
          aria-label="Copy Wi-Fi password to clipboard"
          className="mt-3 w-full py-1.5 px-3 rounded-lg bg-navy text-white text-sm font-medium
                     hover:bg-navy-600 active:bg-navy-700 transition-colors
                     focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
        >
          {copied ? (
            <>
              <span aria-hidden="true">Copied!</span>
              <span className="sr-only">Wi-Fi password copied to clipboard</span>
            </>
          ) : (
            "Copy Password"
          )}
        </button>
      )}
      {/* Screen reader live region for copy feedback */}
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {copied ? "Wi-Fi password copied to clipboard" : ""}
      </span>
    </div>
  );
}

export default function WelcomeSection() {
  return (
    <section id="welcome" className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-navy rounded-full mb-4">
            <svg aria-hidden="true" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-white font-bold text-sm tracking-wide">WELCOME HOME</span>
          </div>
          <h2 className="text-3xl font-bold text-navy mb-2">{welcomeTitle}</h2>
          <p className="text-slate-600">{welcomeSubtitle}</p>
        </div>

        {/* Rule Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {houseRules.map((category) => (
            <InfoCard key={category.id} category={category} />
          ))}
        </div>

        {/* Key Reminder */}
        <div className="rounded-xl border-2 border-amber bg-amber-50 p-4 flex items-start gap-3">
          <div className="p-1.5 bg-amber rounded-lg shrink-0">
            <Icon name={keyReminder.icon} className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-amber-800 font-semibold text-sm">Key Reminder</p>
            <p className="text-amber-700 text-sm mt-0.5">{keyReminder.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
