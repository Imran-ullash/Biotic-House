"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ShieldAlert, Check } from "lucide-react";

export default function AgeVerificationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [ageChecked, setAgeChecked] = useState(false);
  const [researcherChecked, setResearcherChecked] = useState(false);

  useEffect(() => {
    try {
      const verified = localStorage.getItem("bh_age_verified");
      if (verified !== "true") {
        setIsOpen(true);
      }
    } catch {
      setIsOpen(true);
    }
  }, []);

  const handleEnter = () => {
    if (!ageChecked || !researcherChecked) return;
    try {
      localStorage.setItem("bh_age_verified", "true");
    } catch {}
    setIsOpen(false);
  };

  const handleExit = () => {
    window.location.href = "https://google.com";
  };

  if (!isOpen) return null;

  const canProceed = ageChecked && researcherChecked;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 text-center select-none">
        {/* Emblem */}
        <div className="mx-auto w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4">
          <ShieldAlert className="w-7 h-7 text-blue-600" />
        </div>

        <div className="mb-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Age &amp; Compliance Verification
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-heading font-semibold text-slate-900 tracking-tight mb-2">
          Researcher Verification Required
        </h2>

        <p className="text-xs sm:text-sm font-sans font-normal text-slate-600 leading-relaxed mb-6">
          Biotic House compounds are strictly intended for laboratory experimentation and in-vitro scientific research. Please confirm your eligibility to continue.
        </p>

        {/* Checkboxes */}
        <div className="space-y-3 mb-6 text-left">
          <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/60 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={ageChecked}
              onChange={(e) => setAgeChecked(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span className="text-xs sm:text-sm text-slate-700 font-sans font-medium">
              I certify that I am at least <strong className="text-slate-900 font-semibold">21 years of age</strong> or of legal age in my jurisdiction.
            </span>
          </label>

          <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/60 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={researcherChecked}
              onChange={(e) => setResearcherChecked(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span className="text-xs sm:text-sm text-slate-700 font-sans font-medium">
              I acknowledge that all products are <strong className="text-slate-900 font-semibold">strictly for laboratory research</strong> and are not for human or veterinary use, consumption, or clinical applications.
            </span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleExit}
            className="flex-1 py-3 px-5 rounded-full border border-slate-200 text-slate-700 font-sans font-medium text-xs sm:text-sm hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Exit Site
          </button>
          <button
            onClick={handleEnter}
            disabled={!canProceed}
            className={`flex-1 py-3 px-5 rounded-full font-sans font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
              canProceed
                ? "bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-lg active:scale-98"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            <span>Enter Site</span>
            {canProceed && <Check className="w-4 h-4" />}
          </button>
        </div>

        <p className="text-[10px] text-slate-400 mt-4 leading-normal">
          By clicking &ldquo;Enter Site&rdquo;, you agree to our Terms &amp; Conditions and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
