"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Info } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white text-slate-900 pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-slate-100">
      {/* Background subtle radial gradient */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Content */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-6 sm:space-y-8">
            <h1 className="font-heading font-semibold text-4xl sm:text-5xl lg:text-[54px] xl:text-[58px] tracking-tight text-slate-950 leading-[1.14]">
              Buy High-Quality <br className="hidden sm:inline" />
              Research Peptides
            </h1>

            <p className="font-sans font-normal text-[15px] sm:text-base lg:text-[17px] text-slate-600 leading-relaxed max-w-xl">
              Independently verified high-purity research peptides for precision laboratory and analytical applications with 99%+ purity.
            </p>

            {/* CTA Button */}
            <div>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center bg-[#0066FF] hover:bg-[#0052cc] text-white font-sans font-medium text-sm sm:text-base px-8 py-3.5 sm:px-9 sm:py-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
              >
                Explore Products
              </Link>
            </div>

            {/* Metrics Row (Anek Telugu 600 for numbers, Poppins 500 for labels) */}
            <div className="grid grid-cols-3 gap-4 pt-2 max-w-md">
              <div>
                <div className="text-2xl sm:text-3xl font-heading font-semibold text-slate-900 tracking-tight">
                  99%+
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-sans font-medium mt-0.5">
                  HPLC Tested Purity
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-heading font-semibold text-slate-900 tracking-tight">
                  1000+
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-sans font-medium mt-0.5">
                  Verified Orders
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-heading font-semibold text-slate-900 tracking-tight">
                  24-48h
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-sans font-medium mt-0.5">
                  Fast Dispatch
                </div>
              </div>
            </div>

            {/* Disclaimer Callout Box */}
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 flex items-start gap-3 max-w-xl">
              <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                <Info className="w-3.5 h-3.5" />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Disclaimer:</strong> All products are sold strictly for in-vitro laboratory research and analytical applications only. Not for human or animal consumption.
              </p>
            </div>
          </div>

          {/* Right Column: 3D Floating Vials Showcase */}
          <div className="lg:col-span-6 xl:col-span-5 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px]">
            {/* Center Background Soft Glow & Floor Shadow */}
            <div className="absolute inset-0 bg-radial from-blue-100/40 via-transparent to-transparent blur-2xl -z-10" />
            <div className="absolute bottom-4 w-72 sm:w-80 h-10 bg-slate-400/20 rounded-full blur-xl -z-10" />

            {/* Container for the 3 Floating Bottles */}
            <div className="relative w-full max-w-md h-[380px] sm:h-[440px] flex items-center justify-center">
              {/* Left Vial: BPC-157 (Tilted Left & Behind) */}
              <div className="absolute -left-2 sm:left-4 top-10 sm:top-12 w-40 sm:w-48 h-64 sm:h-76 z-10 animate-float-left filter drop-shadow-xl transition-transform hover:scale-105">
                <Image
                  src="/images/vials/bpc-157.png"
                  alt="BPC-157 Research Peptide Vial"
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              {/* Right Vial: Cartalax (Tilted Right & Behind) */}
              <div className="absolute -right-2 sm:right-4 top-14 sm:top-16 w-36 sm:w-44 h-60 sm:h-72 z-10 animate-float-right filter drop-shadow-xl transition-transform hover:scale-105">
                <Image
                  src="/images/vials/cartalax.png"
                  alt="Cartalax Research Peptide Vial"
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              {/* Center Vial: BAC Water (Front & Center) */}
              <div className="relative w-44 sm:w-56 h-72 sm:h-92 z-20 animate-float-slow filter drop-shadow-2xl transition-transform hover:scale-105">
                <Image
                  src="/images/vials/bac-water.png"
                  alt="Bacteriostatic Water Research Vial"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
