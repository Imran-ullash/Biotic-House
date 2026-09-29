"use client";

import React from "react";
import Link from "next/link";

export default function MidPageCallout() {
  return (
    <section className="py-16 sm:py-20 bg-white border-y border-slate-100 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="font-heading font-semibold text-2xl sm:text-3xl lg:text-4xl text-slate-950 tracking-tight leading-snug">
          High-Purity Compounds Designed To Support <br className="hidden sm:inline" />
          Precise And Consistent Laboratory Research.
        </h2>

        <p className="text-[15px] sm:text-base font-sans font-normal text-slate-500 max-w-2xl mx-auto leading-relaxed">
          All peptide solutions strictly comply with laboratory analytical guidelines. Review our verified third-party laboratory documentation.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center bg-[#0066FF] hover:bg-[#0052cc] text-white font-sans font-medium text-xs sm:text-sm px-7 py-3 rounded-full transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer active:scale-95"
          >
            Explore Products
          </Link>

          <Link
            href="/shop"
            className="inline-flex items-center justify-center bg-white hover:bg-slate-50 text-[#0066FF] font-sans font-medium text-xs sm:text-sm px-7 py-3 rounded-full border border-[#0066FF] transition-all duration-200 cursor-pointer active:scale-95"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
