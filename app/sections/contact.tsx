"use client";

import React, { useState } from "react";
import { Icon } from "@/components/ui/icon";
import {
  providers,
  actionItems,
  contactsTitle,
  contactsSubtitle,
  type ContactProvider,
  type ActionItem,
} from "../data/contacts";

function ContactCard({ provider }: { provider: ContactProvider }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(provider.phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* graceful fallback: number remains selectable and clickable */
    }
  };

  return (
    <div className="rounded-xl border-2 border-navy-200 bg-white p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-green">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-navy">
          <Icon name={provider.icon} className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-navy">{provider.name}</h3>
          <p className="text-xs font-medium text-green uppercase tracking-wide">{provider.service}</p>
        </div>
      </div>
      <p className="text-sm text-slate-600 mb-4">{provider.description}</p>
      <div className="flex items-center gap-2">
        <a
          href={`tel:${provider.phone.replace(/-/g, "")}`}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-green text-white text-sm font-medium
                     hover:bg-green-600 active:bg-green-700 transition-colors
                     focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
          aria-label={`Call ${provider.name} at ${provider.phone}`}
        >
          <Icon name="Phone" className="w-4 h-4" />
          {provider.phone}
        </a>
        <button
          onClick={handleCopy}
          aria-label={`Copy ${provider.name} phone number`}
          className="py-2 px-3 rounded-lg border-2 border-navy-200 text-navy text-sm font-medium
                     hover:bg-navy-50 active:bg-navy-100 transition-colors
                     focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
        >
          {copied ? (
            <>
              <span aria-hidden="true">Copied</span>
              <span className="sr-only">Phone number copied</span>
            </>
          ) : (
            <Icon name="Copy" className="w-4 h-4" />
          )}
        </button>
      </div>
      {/* Screen reader live region for copy feedback */}
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {copied ? `${provider.name} phone number copied to clipboard` : ""}
      </span>
    </div>
  );
}

function ActionButton({ action }: { action: ActionItem }) {
  const variantClasses = {
    primary: "bg-navy text-white hover:bg-navy-600 active:bg-navy-700",
    secondary: "bg-white text-navy border-2 border-navy-200 hover:bg-navy-50 active:bg-navy-100",
    danger: "bg-amber text-white hover:bg-amber-600 active:bg-amber-700",
  };

  return (
    <button
      aria-label={action.label}
      className={`flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-bold
                  transition-all duration-200 hover:shadow-md hover:-translate-y-0.5
                  focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2
                  ${variantClasses[action.variant]}`}
    >
      <Icon name={action.icon} className="w-5 h-5" />
      {action.label}
    </button>
  );
}

export default function ContactSection() {
  return (
    <section id="contact" className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-navy rounded-full mb-4">
            <svg aria-hidden="true" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-white font-bold text-sm tracking-wide">CONTACT & ACTIONS</span>
          </div>
          <h2 className="text-3xl font-bold text-navy mb-2">{contactsTitle}</h2>
          <p className="text-slate-600">{contactsSubtitle}</p>
        </div>

        {/* Provider Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {providers.map((provider) => (
            <ContactCard key={provider.id} provider={provider} />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="rounded-xl border-2 border-navy-200 bg-white p-6">
          <h3 className="text-lg font-bold text-navy mb-4 text-center">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {actionItems.map((action) => (
              <ActionButton key={action.id} action={action} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
