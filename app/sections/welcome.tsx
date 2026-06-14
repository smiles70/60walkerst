"use client";

import React, { useState } from "react";
import { Icon } from "@/components/ui/icon";
import {
  houseRules,
  welcomeTitle,
  welcomeSubtitle,
  keyReminder,
  type RuleCategory,
} from "../data/house-rules";
import ChoreChart from "./chore-chart";

function InfoCard({ category, onClick }: { category: RuleCategory; onClick?: () => void }) {
  const baseCardClasses = category.highlight
    ? "border-green bg-green-50"
    : "border-navy-200 bg-white hover:border-green";

  const isClickable = !!onClick;

  return (
    <div
      onClick={onClick}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      className={`relative rounded-xl border-2 p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${baseCardClasses} ${
        isClickable ? "cursor-pointer focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2" : ""
      }`}
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
      {isClickable && (
        <div className="mt-3 flex items-center gap-1 text-sm font-medium text-green">
          <Icon name="ArrowLeft" className="w-4 h-4 rotate-180" />
          <span>View schedule</span>
        </div>
      )}
    </div>
  );
}

export function WelcomeContent() {
  const [showChoreChart, setShowChoreChart] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {houseRules.map((category) => (
          <InfoCard
            key={category.id}
            category={category}
            onClick={category.id === "cleaning" ? () => setShowChoreChart(true) : undefined}
          />
        ))}
      </div>

      {showChoreChart && <ChoreChart onClose={() => setShowChoreChart(false)} />}

      <div className="rounded-xl border-2 border-amber bg-amber-50 p-4 flex items-start gap-3">
        <div className="p-1.5 bg-amber rounded-lg shrink-0">
          <Icon name={keyReminder.icon} className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-amber-800 font-semibold text-sm">Key Reminder</p>
          <p className="text-amber-700 text-sm mt-0.5">{keyReminder.text}</p>
        </div>
      </div>
    </>
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

        <WelcomeContent />
      </div>
    </section>
  );
}
