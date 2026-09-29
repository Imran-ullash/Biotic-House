"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, MailCheck } from "lucide-react";

export default function DiscountOfferModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isClaimed, setIsClaimed] = useState(false);

  useEffect(() => {
    // Check if previously claimed or dismissed
    try {
      const alreadyClaimed = localStorage.getItem("bh_discount_claimed");
      const alreadyDismissed = sessionStorage.getItem("bh_discount_dismissed");
      if (alreadyClaimed || alreadyDismissed) {
        return;
      }
    } catch {}

    // Check age verification status before timing 10-15s (12 seconds)
    const initTimer = () => {
      let ageVerified = false;
      try {
        ageVerified = localStorage.getItem("bh_age_verified") === "true";
      } catch {}

      if (ageVerified) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 12000); // 12 seconds after entry
        return () => clearTimeout(timer);
      } else {
        // Poll for age verification completion
        const interval = setInterval(() => {
          let verifiedNow = false;
          try {
            verifiedNow = localStorage.getItem("bh_age_verified") === "true";
          } catch {}

          if (verifiedNow) {
            clearInterval(interval);
            setTimeout(() => {
              setIsOpen(true);
            }, 12000); // 12 seconds after age verification accepted
          }
        }, 1000);
        return () => clearInterval(interval);
      }
    };

    const cleanup = initTimer();

    // Support manual trigger for testing via custom event
    const handleManualOpen = () => setIsOpen(true);
    window.addEventListener("open-discount-modal", handleManualOpen);

    return () => {
      if (cleanup) cleanup();
      window.removeEventListener("open-discount-modal", handleManualOpen);
    };
  }, []);

  const handleClose = () => {
    try {
      sessionStorage.setItem("bh_discount_dismissed", "true");
    } catch {}
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      localStorage.setItem("bh_discount_claimed", "true");
    } catch {}

    setIsClaimed(true);

    // Sync with Brevo backend & dispatch 10% coupon
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "popup_10_percent" }),
      });
    } catch (err) {
      console.error("Failed to sync email to Brevo:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-xs animate-in fade-in duration-300">
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={handleClose} />

      {/* Modal Container */}
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200/90 overflow-hidden text-left z-10 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-1.5 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors z-30 cursor-pointer"
          aria-label="Close promotion modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left Column: Offer Content & Form */}
          <div className="md:col-span-7 z-20">
            {/* Exclusive Offer Badge */}
            <span className="inline-block bg-blue-50 text-blue-600 font-sans font-semibold text-xs px-3.5 py-1 rounded-full mb-3 border border-blue-100">
              Exclusive Offer
            </span>

            {/* Title (Anek Telugu 600) */}
            <h2 className="font-heading font-semibold text-2xl sm:text-3xl text-slate-900 uppercase tracking-tight leading-tight mb-2">
              ENJOY 10% OFF YOUR FIRST ORDER
            </h2>

            {/* Subtitle (Poppins 400) */}
            <p className="font-sans font-normal text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
              Join Biotic House and get exclusive research peptide discounts.
            </p>

            {isClaimed ? (
              /* Success / Sent to Email State (Explicit user requirement) */
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/80 border border-blue-200 text-slate-800">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                      <MailCheck className="w-4 h-4" />
                    </div>
                    <span className="font-heading font-semibold text-base text-slate-900">
                      Check Your Inbox
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-sans font-medium text-slate-700 leading-relaxed">
                    Thank you! Your 10% off code has been sent to your email. Please check your email.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-sans font-medium text-sm transition-all duration-200 active:scale-98 shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Continue Browsing</span>
                </button>
              </div>
            ) : (
              /* Email Submission Form */
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-sans font-medium text-slate-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-sans font-normal text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-sans font-semibold text-sm tracking-wide uppercase transition-all duration-200 active:scale-98 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>CLAIM MY 10% OFF</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Floating Product Vials */}
          <div className="hidden md:flex md:col-span-5 relative h-72 items-center justify-center select-none pointer-events-none">
            {/* Subtle radial glow */}
            <div className="absolute inset-0 bg-radial from-blue-100/60 via-transparent to-transparent rounded-full blur-2xl" />

            {/* Vial 1: BAC WATER (Tilted slightly left and floating smoothly) */}
            <div 
              className="absolute left-1 bottom-3 w-40 h-60 drop-shadow-2xl z-20 transition-transform duration-700"
              style={{
                animation: "modalFloatVial1 5s ease-in-out infinite",
              }}
            >
              <Image
                src="/images/vials/bac-water.png"
                alt="BAC Water Peptide Vial"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Vial 2: BPC-157 (Upright / slightly angled right and floating smoothly) */}
            <div 
              className="absolute right-0 top-3 w-40 h-60 drop-shadow-2xl z-10 transition-transform duration-700"
              style={{
                animation: "modalFloatVial2 5.5s ease-in-out infinite",
              }}
            >
              <Image
                src="/images/vials/bpc-157.png"
                alt="BPC-157 Peptide Vial"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
