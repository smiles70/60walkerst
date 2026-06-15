"use client";

import React, { useState } from "react";
import HeroSection from "./sections/hero";
import ApplicantSection from "./sections/applicant";
import TenantSection from "./sections/tenant";
import ManagementLogin from "./sections/management-login";
import ManagementDashboard from "./sections/management-dashboard";
import ApplicantsList from "./sections/applicants-list";
import ApplicantDetail from "./sections/applicant-detail";
import { Icon } from "@/components/ui/icon";
import { TENANT_PIN } from "./data/management";

type ViewMode =
  | "hero"
  | "applicant"
  | "tenant"
  | "management"
  | "management-applicants"
  | "management-applicant-detail";

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
  const [mgmtAuthenticated, setMgmtAuthenticated] = useState(false);
  const [tenantAuthenticated, setTenantAuthenticated] = useState(false);
  const [selectedApplicantId, setSelectedApplicantId] = useState<string | null>(null);

  return (
    <main className="min-h-screen">
      {view === "hero" && (
        <HeroSection
          onSelectApplicant={() => setView("applicant")}
          onSelectTenant={() => {
            setTenantAuthenticated(false);
            setView("tenant");
          }}
          onSelectManagement={() => {
            setMgmtAuthenticated(false);
            setView("management");
          }}
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
          <div className="py-12 px-4 max-w-5xl mx-auto">
            {tenantAuthenticated ? (
              <TenantSection />
            ) : (
              <ManagementLogin
                pin={TENANT_PIN}
                title="Tenant Access"
                subtitlePin="Enter the tenant PIN to continue"
                subtitleEmail="Enter your whitelisted email address"
                onSuccess={() => setTenantAuthenticated(true)}
                onCancel={() => setView("hero")}
              />
            )}
          </div>
        </>
      )}

      {view === "management" && (
        <>
          <div className="sticky top-0 z-50 bg-navy border-b-2 border-navy-700 shadow-md">
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="Shield" className="w-5 h-5 text-green" />
                <span className="text-white font-bold">60 Walker St — Management</span>
              </div>
              <BackButton onClick={() => setView("hero")} />
            </div>
          </div>
          <div className="py-12 px-4 max-w-5xl mx-auto">
            {mgmtAuthenticated ? (
              <ManagementDashboard
                onLogout={() => setMgmtAuthenticated(false)}
                onViewApplicants={() => setView("management-applicants")}
              />
            ) : (
              <ManagementLogin
                persistAuth={true}
                onSuccess={() => setMgmtAuthenticated(true)}
                onCancel={() => setView("hero")}
              />
            )}
          </div>
        </>
      )}

      {view === "management-applicants" && (
        <>
          <div className="sticky top-0 z-50 bg-navy border-b-2 border-navy-700 shadow-md">
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="Users" className="w-5 h-5 text-green" />
                <span className="text-white font-bold">60 Walker St — Applicants</span>
              </div>
              <BackButton onClick={() => setView("management")} />
            </div>
          </div>
          <div className="py-12 px-4 max-w-5xl mx-auto">
            <ApplicantsList
              onSelect={(id) => {
                setSelectedApplicantId(id);
                setView("management-applicant-detail");
              }}
              onBack={() => setView("management")}
            />
          </div>
        </>
      )}

      {view === "management-applicant-detail" && selectedApplicantId && (
        <>
          <div className="sticky top-0 z-50 bg-navy border-b-2 border-navy-700 shadow-md">
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="FileText" className="w-5 h-5 text-green" />
                <span className="text-white font-bold">60 Walker St — Applicant Detail</span>
              </div>
              <BackButton onClick={() => setView("management-applicants")} />
            </div>
          </div>
          <div className="py-12 px-4 max-w-5xl mx-auto">
            <ApplicantDetail
              applicantId={selectedApplicantId}
              onBack={() => setView("management-applicants")}
            />
          </div>
        </>
      )}
    </main>
  );
}
