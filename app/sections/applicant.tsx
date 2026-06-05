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
      </div>
    </section>
  );
}
