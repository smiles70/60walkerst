"use client";

import React from "react";
import { Icon } from "@/components/ui/icon";
import {
  utilityRows,
  utilityTotals,
  paymentInstructions,
  reminderNote,
  utilitiesTitle,
  utilitiesSubtitle,
  type UtilityRow,
} from "../data/utilities";

function formatCurrency(value: number): string {
  return `$${value.toFixed(2)}`;
}

function CostTable() {
  return (
    <div className="overflow-x-auto rounded-xl border-2 border-navy-200">
      <table className="w-full min-w-[500px]">
        <thead>
          <tr className="bg-navy text-white">
            <th scope="col" className="text-left px-4 py-3 text-sm font-bold uppercase tracking-wide">
              Utility
            </th>
            <th scope="col" className="text-left px-4 py-3 text-sm font-bold uppercase tracking-wide">
              Provider
            </th>
            <th scope="col" className="text-right px-4 py-3 text-sm font-bold uppercase tracking-wide">
              Total Cost
            </th>
            <th scope="col" className="text-right px-4 py-3 text-sm font-bold uppercase tracking-wide">
              % of Total
            </th>
            <th scope="col" className="text-right px-4 py-3 text-sm font-bold uppercase tracking-wide">
              Per Person
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-navy-100">
          {utilityRows.map((row) => (
            <TableRow key={row.utility} row={row} />
          ))}
          <tr className="bg-navy-50 font-bold">
            <td className="px-4 py-3 text-sm text-navy flex items-center gap-2">
              <Icon name="DollarSign" className="w-4 h-4" />
              Total
            </td>
            <td className="px-4 py-3 text-sm text-slate-600">—</td>
            <td className="px-4 py-3 text-sm text-navy text-right">
              {formatCurrency(utilityTotals.totalCost)}
            </td>
            <td className="px-4 py-3 text-sm text-navy text-right">
              {utilityTotals.percentOfTotal}%
            </td>
            <td className="px-4 py-3 text-sm text-navy text-right">
              {formatCurrency(utilityTotals.perPerson)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function TableRow({ row }: { row: UtilityRow }) {
  return (
    <tr className="bg-white hover:bg-slate-50 transition-colors">
      <td className="px-4 py-3 text-sm text-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-green">
            <Icon name={row.icon} className="w-4 h-4" />
          </span>
          {row.utility}
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-slate-600">{row.provider}</td>
      <td className="px-4 py-3 text-sm text-slate-800 text-right font-medium">
        {formatCurrency(row.totalCost)}
      </td>
      <td className="px-4 py-3 text-sm text-slate-600 text-right">
        {row.percentOfTotal}%
      </td>
      <td className="px-4 py-3 text-sm text-navy text-right font-semibold">
        {formatCurrency(row.perPerson)}
      </td>
    </tr>
  );
}

function PaymentCard() {
  return (
    <div className="mt-6 rounded-xl border-2 border-green bg-green-50 p-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 bg-green rounded-lg">
          <svg aria-hidden="true" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-green">Payment Instructions</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-1">Pay By</p>
          <p className="text-sm text-slate-700">{paymentInstructions.payByDate}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-1">Methods</p>
          <div className="flex gap-2">
            {paymentInstructions.methods.map((method) => (
              <span key={method} className="inline-block px-2 py-0.5 bg-green text-white text-xs font-medium rounded-md">
                {method}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-1">Note</p>
          <p className="text-sm text-slate-700">{paymentInstructions.note}</p>
        </div>
      </div>
      <p className="mt-3 text-xs text-slate-500 italic">{paymentInstructions.asterisk}</p>
    </div>
  );
}

function ReminderCard() {
  return (
    <div className="mt-6 rounded-xl border-2 border-amber bg-amber-50 p-5 flex items-start gap-3">
      <div className="p-1.5 bg-amber rounded-lg shrink-0">
        <Icon name={reminderNote.icon} className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-amber-800 font-semibold text-sm">Important</p>
        <p className="text-amber-700 text-sm mt-0.5">{reminderNote.text}</p>
      </div>
    </div>
  );
}

export function UtilitiesContent() {
  return (
    <>
      <CostTable />
      <PaymentCard />
      <ReminderCard />
    </>
  );
}

export default function UtilitiesSection() {
  return (
    <section id="utilities" className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-navy rounded-full mb-4">
            <svg aria-hidden="true" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-white font-bold text-sm tracking-wide">MONTHLY SHARE</span>
          </div>
          <h2 className="text-3xl font-bold text-navy mb-2">{utilitiesTitle}</h2>
          <p className="text-slate-600">{utilitiesSubtitle}</p>
        </div>

        <UtilitiesContent />
      </div>
    </section>
  );
}
