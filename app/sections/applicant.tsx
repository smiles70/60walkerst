"use client";

import React, { useState } from "react";
import { Icon } from "@/components/ui/icon";
import {
  townTitle,
  townSubtitle,
  townInfos,
  watchtowerFacilities,
  kingdomHalls,
  assemblyHalls,
  assemblyHallNote,
  pricingInfo,
  testimonials,
  scheduleTour,
  type TownInfo,
  type WatchtowerFacility,
  type KingdomHall,
} from "../data/applicant";

function TownCard({ info }: { info: TownInfo }) {
  return (
    <div className="rounded-xl border-2 border-navy-200 bg-white p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-green">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-navy">
          <Icon name={info.icon} className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-navy">{info.title}</h3>
      </div>
      <p className="text-sm text-slate-600 mb-3">{info.description}</p>
      <ul className="space-y-1.5">
        {info.details.map((detail, i) => (
          <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
            <span className="text-green mt-1 shrink-0">•</span>
            <span>{detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FacilityCard({ facility }: { facility: WatchtowerFacility }) {
  return (
    <div className="rounded-xl border-2 border-navy-200 bg-white p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-green">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-navy">
          <Icon name="Building" className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-navy">{facility.name}</h3>
          <span className="text-xs font-medium text-green uppercase tracking-wide">
            {facility.type}
          </span>
        </div>
      </div>
      <p className="text-sm text-slate-600 mb-3">{facility.description}</p>
      <div className="space-y-1.5 text-sm">
        <div className="flex items-start gap-2">
          <Icon name="MapPin" className="w-4 h-4 text-navy mt-0.5 shrink-0" />
          <span className="text-slate-700">{facility.address}</span>
        </div>
        <div className="flex items-start gap-2">
          <Icon name="Phone" className="w-4 h-4 text-navy mt-0.5 shrink-0" />
          <span className="text-slate-700">{facility.phone}</span>
        </div>
        <div className="flex items-start gap-2">
          <Icon name="Zap" className="w-4 h-4 text-navy mt-0.5 shrink-0" />
          <span className="text-slate-700">
            {facility.distance} — {facility.driveTime}
          </span>
        </div>
      </div>
    </div>
  );
}

function KingdomHallCard({ hall }: { hall: KingdomHall }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border-2 border-navy-200 bg-white px-4 py-3 transition-all duration-200 hover:border-green">
      <div className="p-1.5 rounded-md bg-green-50 shrink-0">
        <Icon name="Building" className="w-4 h-4 text-green" />
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="text-sm font-bold text-navy truncate">{hall.name}</h4>
        <p className="text-xs text-slate-500">{hall.address}</p>
      </div>
      <span className="text-xs font-medium text-green whitespace-nowrap shrink-0">
        {hall.distance}
      </span>
    </div>
  );
}

type TabKey = "town" | "watchtower" | "halls";

export default function ApplicantSection(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<TabKey>("town");

  const tabs: { key: TabKey; label: string; icon: string }[] = [
    { key: "town", label: "Town Info", icon: "MapPin" },
    { key: "watchtower", label: "Watchtower Facilities", icon: "Building" },
    { key: "halls", label: "Kingdom Halls", icon: "Users" },
  ];

  return (
    <section className="py-12 px-4" aria-labelledby="applicant-heading">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 id="applicant-heading" className="text-3xl font-bold text-navy mb-2">
            {townTitle}
          </h2>
          <p className="text-slate-600">{townSubtitle}</p>
        </div>

        {/* Trust badges — revealed on applicant click */}
        <div className="flex flex-wrap justify-center gap-3 mb-4">
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

        {/* Social proof */}
        <div className="flex items-center justify-center gap-2 mb-6 text-sm text-slate-500">
          <Icon name="Star" className="w-4 h-4 text-amber-400" />
          <span>Loved by previous roommates</span>
          <span className="text-slate-300">·</span>
          <span className="font-medium text-navy">5-star household</span>
        </div>

        {/* What&apos;s Included teaser */}
        <div className="max-w-3xl mx-auto mb-8">
          <p className="text-xs font-bold text-navy-400 uppercase tracking-wider mb-4 text-center">
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
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-navy-50/50 border border-navy-100"
              >
                <Icon name={item.icon} className="w-5 h-5 text-navy-400" />
                <span className="text-xs font-medium text-navy-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8" role="tablist" aria-label="Applicant information categories">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                role="tab"
                aria-selected={isActive}
                className={`flex items-center gap-2 py-2.5 px-4 rounded-lg text-sm font-bold transition-colors
                  ${
                    isActive
                      ? "bg-navy text-white"
                      : "bg-white text-navy border-2 border-navy-200 hover:bg-navy-50"
                  } focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2`}
              >
                <Icon name={tab.icon} className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab panels */}
        <div role="tabpanel" aria-label={tabs.find((t) => t.key === activeTab)?.label}>
          {activeTab === "town" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {townInfos.map((info) => (
                <TownCard key={info.id} info={info} />
              ))}
            </div>
          )}

          {activeTab === "watchtower" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {watchtowerFacilities.map((facility) => (
                <FacilityCard key={facility.id} facility={facility} />
              ))}
            </div>
          )}

          {activeTab === "halls" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-navy mb-3 flex items-center gap-2">
                  <Icon name="Building" className="w-5 h-5" />
                  Kingdom Halls within 40 miles
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {kingdomHalls.map((hall) => (
                    <KingdomHallCard key={hall.id} hall={hall} />
                  ))}
                </div>
              </div>

              <div className="rounded-xl border-2 border-navy-200 bg-navy-50 p-5">
                <h3 className="text-lg font-bold text-navy mb-2 flex items-center gap-2">
                  <Icon name="Users" className="w-5 h-5" />
                  Assembly Halls
                </h3>
                {assemblyHalls.length === 0 ? (
                  <p className="text-sm text-slate-600">{assemblyHallNote}</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {assemblyHalls.map((hall) => (
                      <div
                        key={hall.id}
                        className="flex items-center gap-3 rounded-lg border-2 border-navy-200 bg-white px-4 py-3"
                      >
                        <div className="p-1.5 rounded-md bg-amber-50 shrink-0">
                          <Icon name="Users" className="w-4 h-4 text-amber" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-bold text-navy truncate">
                            {hall.name}
                          </h4>
                          <p className="text-xs text-slate-500">{hall.address}</p>
                        </div>
                        <span className="text-xs font-medium text-amber whitespace-nowrap shrink-0">
                          {hall.distance}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Pricing Section */}
        <div className="mt-12 rounded-2xl border-2 border-navy-200 bg-white p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-green">
              <Icon name="DollarSign" className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-navy">Pricing &amp; What&apos;s Included</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-3xl font-bold text-green mb-1">{pricingInfo.monthlyRent}</p>
              <p className="text-sm text-slate-500 mb-4">{pricingInfo.deposit}</p>
              <h4 className="text-sm font-bold text-navy mb-2">Utilities Included:</h4>
              <ul className="space-y-1">
                {pricingInfo.utilitiesIncluded.map((item, i) => (
                  <li key={i} className="text-sm text-slate-700 flex items-center gap-2">
                    <Icon name="CheckCircle" className="w-4 h-4 text-green shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-navy mb-2">Additional Details:</h4>
              <ul className="space-y-2">
                {pricingInfo.additionalNotes.map((note, i) => (
                  <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                    <span className="text-green mt-0.5 shrink-0">•</span>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-12">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-navy mb-2">What Previous Roommates Say</h3>
            <p className="text-slate-600">Real experiences from people who called 60 Walker home</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="rounded-xl border-2 border-navy-200 bg-white p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-green"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" className="w-4 h-4 text-amber" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 italic mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-navy">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                  <span className="text-xs font-medium text-green bg-green-50 px-2 py-1 rounded-full">
                    {t.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule Tour */}
        <div className="mt-12 rounded-2xl border-2 border-green bg-green-50 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-green">
              <Icon name="Calendar" className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-navy">{scheduleTour.headline}</h3>
          </div>
          <p className="text-sm text-slate-700 mb-4">{scheduleTour.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <Icon name="Phone" className="w-4 h-4 text-green shrink-0" />
              {scheduleTour.contactPhone}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <Icon name="MessageCircle" className="w-4 h-4 text-green shrink-0" />
              {scheduleTour.contactEmail}
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <Icon name="Calendar" className="w-4 h-4 text-green shrink-0" />
              {scheduleTour.availability}
            </div>
          </div>
          <button
            className="w-full sm:w-auto py-3 px-6 rounded-xl bg-navy text-white font-bold
                       hover:bg-navy-600 active:bg-navy-700 transition-colors
                       focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
            aria-label="Contact to schedule a tour"
          >
            Contact to Schedule a Tour
          </button>
        </div>
      </div>
    </section>
  );
}
