"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;

    setLoading(true);
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "homepage_footer" }),
      });
    } catch (err) {
      console.error("Failed to submit newsletter subscription:", err);
    } finally {
      setLoading(false);
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.2),transparent_70%)] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-sans font-medium uppercase tracking-widest text-[#38BDF8]">
          Stay Informed
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold text-white mt-1 mb-3">
          Everything You Need for Advanced Research
        </h2>
        <p className="text-[15px] sm:text-base font-sans font-normal text-slate-300 max-w-xl mx-auto mb-8">
          Subscribe for analytical updates, new peptide compound releases, Certificate of Analysis archives, and exclusive scientific discounts.
        </p>

        {subscribed ? (
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-6 py-3 rounded-full text-sm font-sans font-medium">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Thank you for subscribing! Check your inbox for your 10% welcome coupon.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex items-center gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                placeholder="Enter your research email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3.5 rounded-full bg-slate-800/80 border border-slate-700 text-white font-sans font-normal text-xs sm:text-sm placeholder-slate-400 focus:outline-hidden focus:border-sky-400 focus:bg-slate-800 transition-colors shadow-inner"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-sans font-medium text-xs sm:text-sm px-6 py-3.5 rounded-full transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg cursor-pointer flex items-center gap-1.5 flex-shrink-0"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
