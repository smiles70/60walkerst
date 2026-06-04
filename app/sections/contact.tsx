"use client";

import React, { useState } from "react";
import {
  providers,
  actionItems,
  contactsTitle,
  contactsSubtitle,
  type ContactProvider,
  type ActionItem,
} from "../data/contacts";

function Icon({ name, className }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactElement> = {
    Zap: (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    Droplets: (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0L12 2.69z" />
      </svg>
    ),
    Flame: (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14" />
      </svg>
    ),
    AlertTriangle: (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    ClipboardCheck: (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    CreditCard: (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    Phone: (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    Copy: (
      <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  };
  return icons[name] || null;
}

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
