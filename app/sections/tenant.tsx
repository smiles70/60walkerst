"use client";

import React, { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { WelcomeContent } from "./welcome";
import { UtilitiesContent } from "./utilities";
import { ContactContent } from "./contact";
import ManagementLogin from "./management-login";
import ManagementDashboard from "./management-dashboard";
import {
  welcomeTitle,
  welcomeSubtitle,
} from "../data/house-rules";
import {
  utilitiesTitle,
  utilitiesSubtitle,
} from "../data/utilities";
import {
  contactsTitle,
  contactsSubtitle,
} from "../data/contacts";

type TenantView = "cards" | "welcome" | "utilities" | "contact" | "management-login" | "management-dashboard";

function BackToCards({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 py-2 px-4 rounded-lg text-sm font-bold text-navy bg-white border-2 border-navy-200
                 hover:bg-navy-50 active:bg-navy-100 transition-colors
                 focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
      aria-label="Back to tenant categories"
    >
      <Icon name="ArrowLeft" className="w-4 h-4" />
      Back
    </button>
  );
}

export default function TenantSection(): React.ReactElement {
  const [view, setView] = useState<TenantView>("cards");

  const cards = [
    {
      key: "welcome" as TenantView,
      title: "Welcome Home",
      description: welcomeSubtitle,
      detail: "House rules, communication guidelines, cleaning rotation, shared supplies, Wi-Fi info, and key reminders.",
      icon: "Home",
      bg: "bg-navy",
    },
    {
      key: "utilities" as TenantView,
      title: "Monthly Share",
      description: utilitiesSubtitle,
      detail: "Utility costs, payment breakdown, due dates, and payment methods.",
      icon: "DollarSign",
      bg: "bg-green",
    },
    {
      key: "contact" as TenantView,
      title: "Contact & Actions",
      description: contactsSubtitle,
      detail: "Provider contacts, quick actions, and household support numbers.",
      icon: "Phone",
      bg: "bg-navy",
    },
  ];

  return (
    <section className="py-12 px-4" aria-labelledby="tenant-heading">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 id="tenant-heading" className="text-3xl font-bold text-navy mb-2">
            60 Walker St — Tenant Portal
          </h2>
          <p className="text-slate-600">
            Everything you need for life at 60 Walker Street
          </p>
        </div>

        {/* VIEW: Three category cards */}
        {view === "cards" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cards.map((card) => (
                <button
                  key={card.key}
                  onClick={() => setView(card.key)}
                  className="group rounded-2xl border-2 border-navy-200 bg-white p-8 text-left
                             transition-all duration-200 hover:shadow-xl hover:-translate-y-1 hover:border-green
                             focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
                  aria-label={`View ${card.title}`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl ${card.bg} group-hover:bg-green transition-colors`}>
                      <Icon name={card.icon} className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-navy">{card.title}</h3>
                  </div>
                  <p className="text-slate-600 mb-4">{card.detail}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-green group-hover:text-navy transition-colors">
                    Explore <Icon name="ArrowLeft" className="w-4 h-4 rotate-180" />
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => setView("management-login")}
                className="inline-flex items-center gap-2 text-sm font-medium text-navy-400 hover:text-navy transition-colors"
              >
                <Icon name="Lock" className="w-4 h-4" />
                Management Login
              </button>
            </div>
          </>
        )}

        {/* VIEW: Management Login */}
        {view === "management-login" && (
          <>
            <div className="mb-6">
              <BackToCards onClick={() => setView("cards")} />
            </div>
            <ManagementLogin
              onSuccess={() => setView("management-dashboard")}
              onCancel={() => setView("cards")}
            />
          </>
        )}

        {/* VIEW: Management Dashboard */}
        {view === "management-dashboard" && (
          <>
            <div className="mb-6">
              <BackToCards onClick={() => setView("cards")} />
            </div>
            <ManagementDashboard onLogout={() => setView("cards")} />
          </>
        )}

        {/* VIEW: Welcome Home */}
        {view === "welcome" && (
          <>
            <div className="mb-6">
              <BackToCards onClick={() => setView("cards")} />
            </div>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-navy rounded-full mb-4">
                <Icon name="Home" className="w-5 h-5 text-white" />
                <span className="text-white font-bold text-sm tracking-wide">WELCOME HOME</span>
              </div>
              <h2 className="text-3xl font-bold text-navy mb-2">{welcomeTitle}</h2>
              <p className="text-slate-600">{welcomeSubtitle}</p>
            </div>
            <WelcomeContent />
          </>
        )}

        {/* VIEW: Monthly Share */}
        {view === "utilities" && (
          <>
            <div className="mb-6">
              <BackToCards onClick={() => setView("cards")} />
            </div>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-navy rounded-full mb-4">
                <Icon name="DollarSign" className="w-5 h-5 text-white" />
                <span className="text-white font-bold text-sm tracking-wide">MONTHLY SHARE</span>
              </div>
              <h2 className="text-3xl font-bold text-navy mb-2">{utilitiesTitle}</h2>
              <p className="text-slate-600">{utilitiesSubtitle}</p>
            </div>
            <UtilitiesContent />
          </>
        )}

        {/* VIEW: Contact & Actions */}
        {view === "contact" && (
          <>
            <div className="mb-6">
              <BackToCards onClick={() => setView("cards")} />
            </div>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-navy rounded-full mb-4">
                <Icon name="Phone" className="w-5 h-5 text-white" />
                <span className="text-white font-bold text-sm tracking-wide">CONTACT & ACTIONS</span>
              </div>
              <h2 className="text-3xl font-bold text-navy mb-2">{contactsTitle}</h2>
              <p className="text-slate-600">{contactsSubtitle}</p>
            </div>
            <ContactContent />
          </>
        )}
      </div>
    </section>
  );
}
