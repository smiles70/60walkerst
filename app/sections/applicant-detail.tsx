"use client";

import React, { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { applicants, journeySteps, getStatusLabel, getStatusColor } from "../data/applicants";

interface ApplicantDetailProps {
  applicantId: string;
  onBack: () => void;
}

type DetailTab = "summary" | "application" | "screening" | "messages";

export default function ApplicantDetail({
  applicantId,
  onBack,
}: ApplicantDetailProps): React.ReactElement {
  const [activeTab, setActiveTab] = useState<DetailTab>("summary");
  const [status, setStatus] = useState<string | null>(null);

  const applicant = applicants.find((a) => a.id === applicantId);
  if (!applicant) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">Applicant not found</p>
        <button
          onClick={onBack}
          className="mt-4 inline-flex items-center gap-2 py-2 px-4 rounded-lg text-sm font-bold text-navy bg-white border-2 border-navy-200"
        >
          <Icon name="ArrowLeft" className="w-4 h-4" />
          Back
        </button>
      </div>
    );
  }

  const displayStatus = status || applicant.status;

  const tabs: { key: DetailTab; label: string }[] = [
    { key: "summary", label: "Summary" },
    { key: "application", label: "Application" },
    { key: "screening", label: "Screening Report" },
    { key: "messages", label: "Messages" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 py-2 px-4 rounded-lg text-sm font-bold text-navy bg-white border-2 border-navy-200
                     hover:bg-navy-50 active:bg-navy-100 transition-colors"
        >
          <Icon name="ArrowLeft" className="w-4 h-4" />
          All Applicants
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => setStatus("accepted")}
            className="py-2 px-4 rounded-lg text-sm font-bold text-white bg-green hover:bg-green-600 transition-colors"
          >
            Accept
          </button>
          <button
            onClick={() => setStatus("rejected")}
            className="py-2 px-4 rounded-lg text-sm font-bold text-white bg-red-500 hover:bg-red-600 transition-colors"
          >
            Reject
          </button>
        </div>
      </div>

      {/* Profile */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-navy flex items-center justify-center">
          <span className="text-white font-bold text-xl">{applicant.initials}</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-navy">{applicant.name}</h2>
          <p className="text-sm text-slate-500">
            {applicant.address} · Move-in: {applicant.moveInDate}
          </p>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold mt-1 ${getStatusColor(displayStatus as typeof applicant.status)}`}>
            {getStatusLabel(displayStatus as typeof applicant.status)}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b-2 border-navy-100 pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`py-2 px-4 rounded-t-lg text-sm font-bold transition-colors
              ${activeTab === tab.key
                ? "text-navy border-b-2 border-navy -mb-0.5"
                : "text-slate-400 hover:text-navy"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Summary Tab */}
      {activeTab === "summary" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Renter Journey */}
          <div className="rounded-2xl border-2 border-navy-200 bg-white p-6">
            <h3 className="text-lg font-bold text-navy mb-4">Renter Journey</h3>
            <p className="text-sm text-slate-500 mb-4">Track where this applicant is in your leasing process.</p>

            <div className="relative">
              {journeySteps.map((step, index) => {
                const isCompleted = index <= applicant.journeyStage;
                const isCurrent = index === applicant.journeyStage;

                return (
                  <div key={step.key} className="flex gap-4 pb-6 last:pb-0">
                    {/* Line and dot */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          isCompleted
                            ? "bg-navy border-navy"
                            : "bg-white border-navy-200"
                        }`}
                      >
                        {isCompleted && <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />}
                      </div>
                      {index < journeySteps.length - 1 && (
                        <div
                          className={`w-0.5 flex-1 mt-1 ${
                            isCompleted ? "bg-navy" : "bg-navy-100"
                          }`}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className={`pb-4 ${isCurrent ? "opacity-100" : isCompleted ? "opacity-70" : "opacity-40"}`}>
                      <p className="font-bold text-navy text-sm">{step.label}</p>
                      <p className="text-xs text-slate-500">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Attachments */}
          <div className="rounded-2xl border-2 border-navy-200 bg-white p-6">
            <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
              <Icon name="FileText" className="w-5 h-5" />
              Attachments
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {applicant.attachments.map((file) => (
                <a
                  key={file.id}
                  href={file.url}
                  download={file.filename}
                  className="flex items-center gap-3 p-4 rounded-xl border-2 border-navy-100 bg-white
                             hover:border-green hover:bg-green-50 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-navy-50 group-hover:bg-green-100 transition-colors">
                    <Icon name="FileText" className="w-5 h-5 text-navy" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-navy truncate">{file.label}</p>
                    <p className="text-xs text-slate-400 truncate">{file.filename}</p>
                  </div>
                  <Icon name="ArrowLeft" className="w-4 h-4 text-slate-300 rotate-180 group-hover:text-green shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Application Tab */}
      {activeTab === "application" && (
        <div className="rounded-2xl border-2 border-navy-200 bg-white p-6">
          <h3 className="text-lg font-bold text-navy mb-4">Application Details</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</p>
                <p className="text-navy font-medium">{applicant.name}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email</p>
                <p className="text-navy font-medium">{applicant.email}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone</p>
                <p className="text-navy font-medium">{applicant.phone}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Move-in Date</p>
                <p className="text-navy font-medium">{applicant.moveInDate}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Submitted</p>
                <p className="text-navy font-medium">{applicant.submittedDate}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Property</p>
                <p className="text-navy font-medium">{applicant.address}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-navy-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Notes</p>
              <p className="text-slate-600 text-sm">{applicant.notes}</p>
            </div>
          </div>
        </div>
      )}

      {/* Screening Report Tab */}
      {activeTab === "screening" && (
        <div className="rounded-2xl border-2 border-navy-200 bg-white p-6">
          <h3 className="text-lg font-bold text-navy mb-4">Screening Report</h3>
          <div className="text-center py-8">
            <Icon name="Shield" className="w-12 h-12 text-navy-200 mx-auto mb-3" />
            <p className="text-slate-500">Screening report not yet available.</p>
            <p className="text-xs text-slate-400 mt-1">Check back after screening is complete.</p>
          </div>
        </div>
      )}

      {/* Messages Tab */}
      {activeTab === "messages" && (
        <div className="rounded-2xl border-2 border-navy-200 bg-white p-6">
          <h3 className="text-lg font-bold text-navy mb-4">Messages</h3>
          <div className="text-center py-8">
            <Icon name="MessageCircle" className="w-12 h-12 text-navy-200 mx-auto mb-3" />
            <p className="text-slate-500">No messages yet.</p>
            <p className="text-xs text-slate-400 mt-1">Communication history will appear here.</p>
          </div>
        </div>
      )}
    </div>
  );
}
