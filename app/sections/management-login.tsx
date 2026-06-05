"use client";

import React, { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { MANAGEMENT_PIN } from "../data/management";

interface ManagementLoginProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ManagementLogin({
  onSuccess,
  onCancel,
}: ManagementLoginProps): React.ReactElement {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pin === MANAGEMENT_PIN) {
      localStorage.setItem("mgmtAuth", "true");
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
        <h2 className="text-2xl font-bold text-navy mb-2">Management Access</h2>
        <p className="text-slate-600">Enter the management PIN to continue</p>
      </div>

      <form
        onSubmit={handleSubmit}
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
          value={pin}
          onChange={(e) => {
            setPin(e.target.value.replace(/\D/g, ""));
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
            disabled={pin.length !== 6}
            className="flex-1 py-3 px-4 rounded-xl bg-green text-white font-bold
                       hover:bg-green-600 active:bg-green-700 transition-colors
                       disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Enter
          </button>
        </div>
      </form>
    </div>
  );
}
