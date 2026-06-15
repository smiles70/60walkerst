"use client";

import React from "react";
import { Icon } from "@/components/ui/icon";
import { dashboardWidgets, managementDocuments } from "../data/management";
import { applicants } from "../data/applicants";

interface ManagementDashboardProps {
  onLogout: () => void;
  onViewApplicants: () => void;
}

export default function ManagementDashboard({
  onLogout,
  onViewApplicants,
}: ManagementDashboardProps): React.ReactElement {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-navy">Management Dashboard</h2>
          <p className="text-slate-600">60 Walker St — Overview</p>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("mgmtAuth");
            onLogout();
          }}
          className="inline-flex items-center gap-2 py-2 px-4 rounded-lg text-sm font-bold text-navy bg-white border-2 border-navy-200
                     hover:bg-navy-50 active:bg-navy-100 transition-colors"
        >
          <Icon name="LogOut" className="w-4 h-4" />
          Logout
        </button>
      </div>

      {/* Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {dashboardWidgets.map((widget) => (
          <div
            key={widget.id}
            className="rounded-2xl border-2 border-navy-200 bg-white p-6 text-center"
          >
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${widget.color} mb-3`}>
              <Icon name={widget.icon} className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm font-medium text-slate-500 mb-1">{widget.title}</p>
            <p className="text-2xl font-bold text-navy">{widget.value}</p>
          </div>
        ))}
      </div>

      {/* Applicants Widget */}
      <button
        onClick={onViewApplicants}
        className="w-full group rounded-2xl border-2 border-navy-200 bg-white p-6 text-left mb-8
                   transition-all duration-200 hover:shadow-xl hover:-translate-y-1 hover:border-green
                   focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center shrink-0 group-hover:bg-green transition-colors">
            <Icon name="Users" className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-navy">Applicants</h3>
            <p className="text-sm text-slate-500">
              {applicants.length} active applicant{applicants.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Icon name="ArrowLeft" className="w-5 h-5 text-slate-300 group-hover:text-navy rotate-180 transition-colors shrink-0" />
        </div>
      </button>

      {/* Documents */}
      <div className="rounded-2xl border-2 border-navy-200 bg-white p-6">
        <h3 className="text-lg font-bold text-navy mb-4">Documents</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {managementDocuments.map((doc) => (
            <button
              key={doc.id}
              className="flex items-center gap-3 p-4 rounded-xl border-2 border-navy-100 bg-white
                         hover:border-green hover:bg-green-50 transition-colors text-left"
            >
              <Icon name={doc.icon} className="w-5 h-5 text-navy" />
              <span className="font-medium text-navy text-sm">{doc.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
