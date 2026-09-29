"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Users, Award, TrendingUp, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import SubpageHero from "@/components/SubpageHero";

export default function AffiliatesPage() {
  const [applied, setApplied] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setApplied(true);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Amino Club Style Hero Section */}
      <SubpageHero
        badgeText="High-Converting Scientific Partner Network"
        title="Partner with Biotic House"
        subtitle="Join our premier research affiliate program. Earn generous recurring commissions by introducing verified laboratories, universities, and researchers to high-purity peptides."
        ctaText="Apply for Account"
        ctaHref="#apply-section"
        ctaIcon={<Award className="w-4 h-4" />}
        vials={{
          leftOuter: "/images/vials/tb-500.png",
          leftInner: "/images/vials/bac-water.png",
          rightInner: "/images/vials/bpc-157.png",
          rightOuter: "/images/vials/cartalax.png",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* 3 Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
          <div className="p-7 rounded-3xl bg-[#faf9f5] border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#1e242f] text-white flex items-center justify-center mb-5 shadow-xs">
              <Award className="w-6 h-6 text-sky-400" />
            </div>
            <h3 className="font-heading font-semibold text-lg sm:text-xl text-slate-900 mb-2">
              Industry-Leading Tier
            </h3>
            <p className="text-[15px] sm:text-base text-slate-600 leading-relaxed font-sans font-normal">
              Enjoy industry-leading commission percentages on all qualified analytical research compound orders with no earnings cap.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-[#faf9f5] border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#1e242f] text-white flex items-center justify-center mb-5 shadow-xs">
              <TrendingUp className="w-6 h-6 text-sky-400" />
            </div>
            <h3 className="font-heading font-semibold text-lg sm:text-xl text-slate-900 mb-2">
              Real-Time Tracking
            </h3>
            <p className="text-[15px] sm:text-base text-slate-600 leading-relaxed font-sans font-normal">
              Access an intuitive reporting dashboard with 60-day cookie persistence, live click counts, and instant conversion analytics.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-[#faf9f5] border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#1e242f] text-white flex items-center justify-center mb-5 shadow-xs">
              <Users className="w-6 h-6 text-sky-400" />
            </div>
            <h3 className="font-heading font-semibold text-lg sm:text-xl text-slate-900 mb-2">
              On-Time Monthly Payouts
            </h3>
            <p className="text-[15px] sm:text-base text-slate-600 leading-relaxed font-sans font-normal">
              Consistent, hassle-free monthly distributions via electronic bank transfer or preferred payment rails.
            </p>
          </div>
        </div>

        {/* Application Card */}
        <div id="apply-section" className="scroll-mt-12 bg-slate-950 text-white rounded-3xl p-8 sm:p-14 text-center max-w-4xl mx-auto shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          {applied ? (
            <div className="py-12">
              <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-2xl sm:text-3xl text-white mb-2">
                Application Submitted!
              </h3>
              <p className="text-[15px] sm:text-base text-slate-300 max-w-md mx-auto font-sans font-normal leading-relaxed">
                Thank you for applying to the Biotic House Affiliate Program. Our partner team will review your application and email your login details within 24–48 hours.
              </p>
            </div>
          ) : (
            <div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/20 text-sky-300 text-xs font-sans font-medium uppercase tracking-wider mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Partners</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-semibold text-white tracking-tight mb-3">
                Ready to Partner with Us?
              </h2>
              <p className="text-[15px] sm:text-base text-slate-300 max-w-lg mx-auto mb-8 font-sans font-normal leading-relaxed">
                Complete the quick partner registration form below to request your customized referral links, tracking dashboard, and promotional assets.
              </p>

              <form onSubmit={handleApply} className="max-w-xl mx-auto space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-sans font-medium text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Dr. Alex Rivera"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-[#0066FF] transition-all font-sans font-normal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-sans font-medium text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@scientificmedia.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-[#0066FF] transition-all font-sans font-normal"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-sans font-medium text-slate-300 mb-1">
                    Website / Channel / Institution *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="https://biotechreviews.org or Laboratory Name"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-[#0066FF] transition-all font-sans font-normal"
                  />
                </div>

                <div className="pt-2 text-center">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052cc] text-white font-sans font-medium text-sm sm:text-base px-8 py-3.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
                  >
                    <span>Submit Partner Application</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
