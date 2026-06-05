"use client";

import React from "react";
import { Icon } from "@/components/ui/icon";
import { dashboardWidgets, managementDocuments } from "../data/management";

interface ManagementDashboardProps {
  onLogout: () => void;
}

export default function ManagementDashboard({
  onLogout,
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
