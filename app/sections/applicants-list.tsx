"use client";

import React from "react";
import { Icon } from "@/components/ui/icon";
import { applicants, getStatusLabel, getStatusColor } from "../data/applicants";

interface ApplicantsListProps {
  onSelect: (id: string) => void;
  onBack: () => void;
}

export default function ApplicantsList({
  onSelect,
  onBack,
}: ApplicantsListProps): React.ReactElement {
  return (
    <div>
      <div className="mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 py-2 px-4 rounded-lg text-sm font-bold text-navy bg-white border-2 border-navy-200
                     hover:bg-navy-50 active:bg-navy-100 transition-colors"
        >
          <Icon name="ArrowLeft" className="w-4 h-4" />
          Back to Dashboard
        </button>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-navy mb-2">Applicants</h2>
        <p className="text-slate-600">
          {applicants.length} applicant{applicants.length !== 1 ? "s" : ""} for 60 Walker St
        </p>
      </div>

      <div className="space-y-4 max-w-3xl mx-auto">
        {applicants.map((applicant) => (
          <button
            key={applicant.id}
            onClick={() => onSelect(applicant.id)}
            className="w-full group rounded-2xl border-2 border-navy-200 bg-white p-6 text-left
                       transition-all duration-200 hover:shadow-xl hover:-translate-y-1 hover:border-green
                       focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
          >
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-14 h-14 rounded-full bg-navy flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-lg">{applicant.initials}</span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-bold text-navy">{applicant.name}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${getStatusColor(applicant.status)}`}>
                    {getStatusLabel(applicant.status)}
                  </span>
                </div>
                <p className="text-sm text-slate-500">
                  {applicant.address} · Move-in: {applicant.moveInDate}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Submitted: {applicant.submittedDate}
                </p>
              </div>

              {/* Arrow */}
              <Icon
                name="ArrowLeft"
                className="w-5 h-5 text-slate-300 group-hover:text-navy rotate-180 transition-colors shrink-0"
              />
            </div>
          </button>
        ))}

        {/* Empty state / add new */}
        <div className="rounded-2xl border-2 border-dashed border-navy-200 p-8 text-center">
          <Icon name="Users" className="w-8 h-8 text-navy-300 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">No more applicants at this time</p>
        </div>
      </div>
    </div>
  );
}
