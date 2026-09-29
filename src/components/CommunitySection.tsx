"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function CommunitySection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <section className="pt-16 pb-20 sm:pt-20 sm:pb-28 bg-gradient-to-b from-[#fdfbf7] via-white to-white border-b border-slate-100 relative overflow-hidden">
      {/* Top subtle golden/warm ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-48 bg-gradient-to-b from-amber-50/50 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top: Community Callout with Flanking Floating Bottles */}
        <div className="relative flex items-center justify-between min-h-[220px] mb-14 sm:mb-20">
          {/* Left Floating Bottle: BPC-157 */}
          <div className="hidden lg:block relative w-36 xl:w-44 h-56 xl:h-68 animate-float-left filter drop-shadow-xl flex-shrink-0">
            <Image
              src="/images/vials/bpc-157.png"
              alt="BPC-157 Peptide Vial"
              fill
              className="object-contain"
            />
          </div>

          {/* Centered Content */}
          <div className="max-w-2xl mx-auto text-center space-y-4 px-4 z-10">
            <h2 className="font-heading font-semibold text-2xl sm:text-3xl lg:text-[34px] text-slate-950 tracking-tight leading-snug">
              Everything you need for advanced research—trusted peptides and community support in one place.
            </h2>
            <p className="text-[15px] sm:text-base font-sans font-normal text-slate-600 max-w-lg mx-auto leading-relaxed">
              Discover reliable peptides, expert-backed quality, and a supportive research network to help you move forward with confidence.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center bg-[#0066FF] hover:bg-[#0052cc] text-white font-sans font-medium text-xs sm:text-sm px-8 py-3 rounded-full transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer active:scale-95"
              >
                Shop Now
              </Link>
            </div>
          </div>

          {/* Right Floating Bottle: Cartalax */}
          <div className="hidden lg:block relative w-36 xl:w-44 h-56 xl:h-68 animate-float-right filter drop-shadow-xl flex-shrink-0">
            <Image
              src="/images/vials/cartalax.png"
              alt="Cartalax Peptide Vial"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Bottom: Stay Updated with Biotic House Newsletter Card */}
        <div className="max-w-5xl mx-auto p-8 sm:p-10 rounded-[28px] bg-[#faf8f4] border border-slate-200/50 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-1.5 text-center lg:text-left">
            <h3 className="font-heading font-semibold text-slate-900 text-xl sm:text-2xl tracking-tight">
              Stay Updated with Biotic House
            </h3>
            <p className="text-xs sm:text-sm font-sans font-normal text-slate-500 max-w-md leading-relaxed">
              Subscribe to our newsletter for Coupon Codes and Product Announcements. Join{" "}
              <strong className="text-slate-700 font-medium">10,000+</strong> subscribers. No spam, unsubscribe anytime.
            </p>
          </div>

          {subscribed ? (
            <div className="flex items-center gap-2 text-emerald-600 text-xs sm:text-sm font-sans font-medium bg-white px-5 py-3 rounded-full border border-emerald-200 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Thank you! Check your inbox for updates.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full lg:w-auto">
              <div className="flex items-center bg-white rounded-full p-1.5 pl-5 border border-slate-200/80 shadow-xs hover:border-slate-300 focus-within:border-[#0066FF] transition-all max-w-md mx-auto lg:mx-0">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full sm:w-64 bg-transparent border-none outline-hidden text-xs sm:text-sm font-sans font-normal text-slate-900 placeholder-slate-400 py-1.5"
                />
                <button
                  type="submit"
                  className="bg-[#0066FF] hover:bg-[#0052cc] text-white font-sans font-medium text-xs sm:text-sm px-6 py-2.5 rounded-full transition-all duration-200 shadow-xs active:scale-95 flex-shrink-0 cursor-pointer"
                >
                  Subscribe
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
