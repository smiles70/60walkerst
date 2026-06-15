"use client";

import React, { useState } from "react";
import { Icon } from "@/components/ui/icon";
import {
  MANAGEMENT_PIN,
  MANAGEMENT_EMAILS,
} from "../data/management";

interface ManagementLoginProps {
  onSuccess: () => void;
  onCancel: () => void;
  pin?: string;
  emails?: string[];
  title?: string;
  subtitlePin?: string;
  subtitleEmail?: string;
  persistAuth?: boolean;
}

export default function ManagementLogin({
  onSuccess,
  onCancel,
  pin = MANAGEMENT_PIN,
  emails = MANAGEMENT_EMAILS,
  title = "Management Access",
  subtitlePin = "Enter the management PIN to continue",
  subtitleEmail = "Enter your whitelisted email address",
  persistAuth = false,
}: ManagementLoginProps): React.ReactElement {
  const [step, setStep] = useState<"pin" | "email">("pin");
  const [inputPin, setInputPin] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  function handlePinSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (inputPin === pin) {
      setError(false);
      setStep("email");
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 300);
    }
  }

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    const isWhitelisted = emails.some(
      (allowed) => allowed.toLowerCase() === normalizedEmail
    );

    if (isWhitelisted) {
      if (persistAuth) {
        localStorage.setItem("mgmtAuth", "true");
      }
      setError(false);
      onSuccess();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 300);
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-navy mb-4">
          <Icon name="Lock" className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-navy mb-2">{title}</h2>
        <p className="text-slate-600">
          {step === "pin" ? subtitlePin : subtitleEmail}
        </p>
      </div>

      {step === "pin" ? (
        <form
          onSubmit={handlePinSubmit}
          className={`rounded-2xl border-2 border-navy-200 bg-white p-8 transition-transform ${shake ? "animate-shake" : ""}`}
        >
          <label htmlFor="pin" className="block text-sm font-bold text-navy mb-2">
            PIN
          </label>
          <input
            id="pin"
            type="password"
            inputMode="numeric"
            maxLength={6}
            value={inputPin}
            onChange={(e) => {
              setInputPin(e.target.value.replace(/\D/g, ""));
              setError(false);
            }}
            className={`w-full px-4 py-3 rounded-xl border-2 text-center text-2xl font-bold tracking-widest
                       ${error ? "border-red-400 bg-red-50" : "border-navy-200 bg-white"}
                       focus-visible:outline-none focus:border-green focus:ring-2 focus:ring-green/20 transition-all`}
            placeholder="_ _ _ _ _ _"
          />
          {error && (
            <p className="mt-2 text-sm font-medium text-red-600 text-center">Incorrect PIN</p>
          )}

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 px-4 rounded-xl border-2 border-navy-200 text-navy font-bold
                         hover:bg-navy-50 active:bg-navy-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={inputPin.length !== 6}
              className="flex-1 py-3 px-4 rounded-xl bg-green text-white font-bold
                         hover:bg-green-600 active:bg-green-700 transition-colors
                         disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Enter
            </button>
          </div>
        </form>
      ) : (
        <form
          onSubmit={handleEmailSubmit}
          className={`rounded-2xl border-2 border-navy-200 bg-white p-8 transition-transform ${shake ? "animate-shake" : ""}`}
        >
          <label htmlFor="email" className="block text-sm font-bold text-navy mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(false);
            }}
            className={`w-full px-4 py-3 rounded-xl border-2 text-lg
                       ${error ? "border-red-400 bg-red-50" : "border-navy-200 bg-white"}
                       focus-visible:outline-none focus:border-green focus:ring-2 focus:ring-green/20 transition-all`}
            placeholder="manager@example.com"
          />
          {error && (
            <p className="mt-2 text-sm font-medium text-red-600 text-center">
              Email not authorized. Please use a whitelisted address.
            </p>
          )}

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={() => {
                setStep("pin");
                setEmail("");
                setError(false);
              }}
              className="flex-1 py-3 px-4 rounded-xl border-2 border-navy-200 text-navy font-bold
                         hover:bg-navy-50 active:bg-navy-100 transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!email.includes("@")}
              className="flex-1 py-3 px-4 rounded-xl bg-green text-white font-bold
                         hover:bg-green-600 active:bg-green-700 transition-colors
                         disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Verify
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
