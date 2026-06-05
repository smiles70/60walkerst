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
      {activeTab === "application" && applicant.applicationDetails && (
        <div className="space-y-6">
          {/* Personal Info */}
          <div className="rounded-2xl border-2 border-navy-200 bg-white p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-navy flex items-center justify-center">
                <span className="text-white font-bold text-lg">{applicant.initials}</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy">{applicant.name}</h3>
                <p className="text-sm text-slate-500">Born on {applicant.applicationDetails.dateOfBirth}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Application", value: applicant.applicationDetails.applicationStatus, badge: true },
                { label: "Desired Move-In", value: applicant.applicationDetails.desiredMoveInDate },
                { label: "Total Occupants", value: applicant.applicationDetails.totalOccupants },
                { label: "Self-Reported Income", value: applicant.applicationDetails.selfReportedIncome },
                { label: "Animals", value: applicant.applicationDetails.animals },
                { label: "Smoking", value: applicant.applicationDetails.smoking },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-xl bg-navy-50">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{item.label}</p>
                  {item.badge ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green text-white">
                      {item.value}
                    </span>
                  ) : (
                    <p className="text-navy font-medium text-sm">{item.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Addresses */}
          <div className="rounded-2xl border-2 border-navy-200 bg-white p-6">
            <h3 className="text-lg font-bold text-navy mb-2">Addresses</h3>
            <p className="text-sm text-slate-500 mb-4">We asked this renter for at least 3 years of rental history.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {applicant.applicationDetails.addresses.map((addr, i) => (
                <div key={i} className="p-4 rounded-xl border-2 border-navy-100 bg-white">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{addr.label}</p>
                  <p className="text-navy font-bold">{addr.street}</p>
                  <p className="text-sm text-slate-500">{addr.cityState}</p>
                  <p className="text-xs text-slate-400 mt-1">{addr.type} · {addr.rent}</p>
                  <div className="mt-3 pt-3 border-t border-navy-50">
                    <p className="text-xs text-slate-500 mb-1">
                      <span className="font-bold text-navy">Reason for Moving:</span> {addr.reasonForMoving}
                    </p>
                    <p className="text-xs text-slate-500">
                      <span className="font-bold text-navy">Landlord:</span> {addr.landlordName}
                    </p>
                    <p className="text-xs text-slate-500">{addr.landlordPhone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Income & Employment */}
          <div className="rounded-2xl border-2 border-navy-200 bg-white p-6">
            <h3 className="text-lg font-bold text-navy mb-2">Income</h3>
            <p className="text-sm text-slate-500 mb-4">We asked for 5 years of employment history, if applicable.</p>

            <div className="mb-6 p-4 rounded-xl bg-green-50 border-2 border-green text-center">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Income</p>
              <p className="text-3xl font-bold text-green">{applicant.applicationDetails.totalIncome}</p>
            </div>

            <div className="space-y-4">
              {applicant.applicationDetails.jobs.map((job, i) => (
                <div key={i} className="p-4 rounded-xl bg-navy-50">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-bold text-navy">{job.employer}</p>
                    {job.isCurrent && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-green text-white">Current</span>
                    )}
                    {!job.isCurrent && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-slate-300 text-white">Past</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500">{job.jobTitle}</p>
                  <p className="text-xs text-slate-400">{job.period}</p>
                  <p className="text-sm font-medium text-green mt-2">{job.income}</p>
                  <div className="mt-2 pt-2 border-t border-navy-100">
                    <p className="text-xs text-slate-500">
                      <span className="font-bold text-navy">Reference:</span> {job.referenceName} · {job.referencePhone}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-navy-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Financial Institution</p>
              <p className="text-navy text-sm">{applicant.applicationDetails.financialInstitution}</p>
            </div>
          </div>

          {/* Emergency Contact & Vehicle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border-2 border-navy-200 bg-white p-6">
              <h3 className="text-lg font-bold text-navy mb-4">Emergency Contact</h3>
              <div className="p-4 rounded-xl bg-navy-50">
                <p className="text-sm font-bold text-navy">{applicant.applicationDetails.emergencyContact.name}</p>
                <p className="text-xs text-slate-500">Relationship: {applicant.applicationDetails.emergencyContact.relationship}</p>
                <p className="text-xs text-slate-500">{applicant.applicationDetails.emergencyContact.phone}</p>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-navy-200 bg-white p-6">
              <h3 className="text-lg font-bold text-navy mb-4">Vehicle</h3>
              <div className="p-4 rounded-xl bg-navy-50">
                <p className="text-sm font-bold text-navy">{applicant.applicationDetails.vehicle.make}</p>
                <p className="text-xs text-slate-500">{applicant.applicationDetails.vehicle.color} · {applicant.applicationDetails.vehicle.year}</p>
              </div>
            </div>
          </div>

          {/* Self-Reported Background */}
          <div className="rounded-2xl border-2 border-navy-200 bg-white p-6">
            <h3 className="text-lg font-bold text-navy mb-2">Self-Reported Background</h3>
            <p className="text-sm text-slate-500 mb-4">
              Make sure you verify their responses with TurboTenant&apos;s screening report.
            </p>

            <div className="space-y-3">
              {applicant.applicationDetails.backgroundQuestions.map((q, i) => (
                <div key={i} className="p-4 rounded-xl bg-navy-50">
                  <p className="text-sm text-slate-600 mb-2">{q.question}</p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-green text-white">
                    {q.answer}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Other Information */}
          <div className="rounded-2xl border-2 border-navy-200 bg-white p-6">
            <h3 className="text-lg font-bold text-navy mb-4">Other Information and Comments</h3>
            <p className="text-sm text-slate-500 mb-4">A few additional questions, including any custom questions you may have added.</p>

            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-navy-50">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Do you have any special requests or requirements we should be aware of?</p>
                <p className="text-navy text-sm">{applicant.applicationDetails.otherInfo.specialRequests}</p>
              </div>
              <div className="p-3 rounded-xl bg-navy-50">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">How did you hear about this property?</p>
                <p className="text-navy text-sm">{applicant.applicationDetails.otherInfo.howDidYouHear}</p>
              </div>
              <div className="p-3 rounded-xl bg-navy-50">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Any other comments?</p>
                <p className="text-navy text-sm">{applicant.applicationDetails.otherInfo.comments}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Screening Report Tab */}
      {activeTab === "screening" && applicant.screeningReport && (
        <div className="space-y-6">
          {/* Credit Score Hero */}
          <div className="rounded-2xl border-2 border-navy-200 bg-white p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-navy">Screening Report</h3>
                <p className="text-sm text-slate-500">Received on {applicant.screeningReport.receivedDate}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full border-4 border-navy-200 flex items-center justify-center mb-2">
                  <span className="text-3xl font-bold text-navy">{applicant.screeningReport.creditScore}</span>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-navy text-white">
                  {applicant.screeningReport.creditScoreLabel}
                </span>
              </div>
              <div className="flex-1 w-full">
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>350</span>
                  <span>600</span>
                  <span>700</span>
                  <span>850</span>
                </div>
                <div className="h-3 rounded-full bg-navy-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-green transition-all duration-500"
                    style={{ width: `${((applicant.screeningReport.creditScore - 350) / 500) * 100}%` }}
                  />
                </div>
                <div className="mt-3 flex gap-4 text-sm">
                  <span className="text-slate-500"><span className="font-bold text-navy">{applicant.screeningReport.creditScore}</span> VantageScore</span>
                </div>
              </div>
            </div>
          </div>

          {/* Background Check Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Evictions", value: applicant.screeningReport.evictions, icon: "Home" },
              { label: "Collections", value: applicant.screeningReport.collections, icon: "DollarSign" },
              { label: "Public Records", value: applicant.screeningReport.publicRecords, icon: "FileText" },
              { label: "Criminal History", value: applicant.screeningReport.criminalHistory, icon: "Shield" },
            ].map((check) => (
              <div key={check.label} className="rounded-2xl border-2 border-green bg-green-50 p-4 text-center">
                <Icon name={check.icon} className="w-6 h-6 text-green mx-auto mb-2" />
                <p className="text-2xl font-bold text-green">{check.value}</p>
                <p className="text-xs font-medium text-green-700">{check.label}</p>
                <p className="text-xs text-green-600 mt-0.5">Records Found</p>
              </div>
            ))}
          </div>

          {/* Score Factors */}
          <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-6">
            <h3 className="text-lg font-bold text-amber-800 mb-3">Score Factors</h3>
            <ul className="space-y-2">
              {applicant.screeningReport.scoreFactors.map((factor, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-amber-700">
                  <span className="text-amber-500 mt-0.5">•</span>
                  {factor}
                </li>
              ))}
            </ul>
          </div>

          {/* Address & Employment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border-2 border-navy-200 bg-white p-6">
              <h3 className="text-lg font-bold text-navy mb-4">Address History</h3>
              <div className="space-y-3">
                {applicant.screeningReport.addresses.map((addr, i) => (
                  <div key={i} className="p-3 rounded-xl bg-navy-50">
                    <p className="text-sm font-medium text-navy">{addr.address}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-green text-white">{addr.status}</span>
                      <span className="text-xs text-slate-500">Since {addr.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border-2 border-navy-200 bg-white p-6">
              <h3 className="text-lg font-bold text-navy mb-4">Employment</h3>
              <div className="space-y-3">
                {applicant.screeningReport.employers.map((emp, i) => (
                  <div key={i} className="p-3 rounded-xl bg-navy-50">
                    <p className="text-sm font-bold text-navy">{emp.employer}</p>
                    <p className="text-xs text-slate-500">{emp.jobTitle}</p>
                    <p className="text-xs text-slate-400 mt-0.5">Since {emp.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Summary */}
          <div className="rounded-2xl border-2 border-navy-200 bg-white p-6">
            <h3 className="text-lg font-bold text-navy mb-4">Profile Summary</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { label: "Tradelines", value: applicant.screeningReport.profileSummary.tradelines, color: "text-navy" },
                { label: "Collections", value: applicant.screeningReport.profileSummary.collections, color: "text-navy" },
                { label: "Public Records", value: applicant.screeningReport.profileSummary.publicRecords, color: "text-navy" },
                { label: "Inquiries", value: applicant.screeningReport.profileSummary.inquiries, color: "text-navy" },
                { label: "Neg. Tradelines", value: applicant.screeningReport.profileSummary.negativeTradelines, color: "text-red" },
                { label: "Hist. Negatives", value: applicant.screeningReport.profileSummary.historicalNegatives, color: "text-red" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-3 rounded-xl bg-navy-50">
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tradeline Summary Table */}
          <div className="rounded-2xl border-2 border-navy-200 bg-white p-6 overflow-x-auto">
            <h3 className="text-lg font-bold text-navy mb-4">Tradeline Summary</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-navy-100">
                  <th className="text-left py-2 px-2 text-slate-400 font-medium">Type</th>
                  <th className="text-center py-2 px-2 text-slate-400 font-medium">Count</th>
                  <th className="text-right py-2 px-2 text-slate-400 font-medium">High Credit</th>
                  <th className="text-right py-2 px-2 text-slate-400 font-medium">Limit</th>
                  <th className="text-right py-2 px-2 text-slate-400 font-medium">Balance</th>
                  <th className="text-right py-2 px-2 text-slate-400 font-medium">Past Due</th>
                  <th className="text-right py-2 px-2 text-slate-400 font-medium">Available</th>
                </tr>
              </thead>
              <tbody>
                {applicant.screeningReport.tradelineSummaries.map((row, i) => (
                  <tr key={i} className={`border-b border-navy-50 ${row.creditType === "Total" ? "font-bold bg-navy-50" : ""}`}>
                    <td className="py-2 px-2 text-navy">{row.creditType}</td>
                    <td className="py-2 px-2 text-center text-navy">{row.count}</td>
                    <td className="py-2 px-2 text-right text-navy">{row.highCredit}</td>
                    <td className="py-2 px-2 text-right text-navy">{row.creditLimit}</td>
                    <td className="py-2 px-2 text-right text-navy">{row.balance}</td>
                    <td className="py-2 px-2 text-right text-red">{row.pastDue}</td>
                    <td className="py-2 px-2 text-right text-green">{row.available}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tradeline Detail Table */}
          <div className="rounded-2xl border-2 border-navy-200 bg-white p-6 overflow-x-auto">
            <h3 className="text-lg font-bold text-navy mb-4">Tradeline Transactions</h3>
            <div className="flex gap-6 mb-4 text-sm">
              <span className="text-slate-500"><span className="font-bold text-navy">10</span> Count</span>
              <span className="text-slate-500"><span className="font-bold text-navy">$13,475</span> Balance Total</span>
              <span className="text-slate-500"><span className="font-bold text-navy">$39,486</span> Total Credit Limit</span>
              <span className="text-slate-500"><span className="font-bold text-red">$10,023</span> Total Past Due</span>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-navy-100">
                  <th className="text-left py-2 px-2 text-slate-400 font-medium">Account</th>
                  <th className="text-left py-2 px-2 text-slate-400 font-medium">Type</th>
                  <th className="text-left py-2 px-2 text-slate-400 font-medium">Status</th>
                  <th className="text-left py-2 px-2 text-slate-400 font-medium">Opened</th>
                  <th className="text-left py-2 px-2 text-slate-400 font-medium">Last Paid</th>
                  <th className="text-left py-2 px-2 text-slate-400 font-medium">Usage</th>
                  <th className="text-right py-2 px-2 text-slate-400 font-medium">Past Due</th>
                </tr>
              </thead>
              <tbody>
                {applicant.screeningReport.tradelines.map((row, i) => (
                  <tr key={i} className="border-b border-navy-50">
                    <td className="py-2 px-2 text-navy font-medium">{row.name}</td>
                    <td className="py-2 px-2 text-slate-500">{row.type}</td>
                    <td className="py-2 px-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${row.status === "Open" ? "bg-green text-white" : "bg-slate-300 text-white"}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-slate-500">{row.opened}</td>
                    <td className="py-2 px-2 text-slate-500">{row.lastPaid}</td>
                    <td className="py-2 px-2 text-slate-500">{row.usage}</td>
                    <td className="py-2 px-2 text-right text-red">{row.pastDue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
