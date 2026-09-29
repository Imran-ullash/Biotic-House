"use client";

import React from "react";
import Image from "next/image";
import { Check, Truck, FlaskConical, RotateCcw } from "lucide-react";

export default function BuiltOnPrecision() {
  const features = [
    {
      icon: <Check className="w-5 h-5 text-white stroke-[2.5]" />,
      title: "High-Purity Standards",
      description: "Maintained to ensure reliable and consistent research results.",
    },
    {
      icon: <Truck className="w-5 h-5 text-white" />,
      title: "Batch-Tested Compounds",
      description: "Each batch is checked for quality and consistency.",
    },
    {
      icon: <FlaskConical className="w-5 h-5 text-white" />,
      title: "Secure Packaging",
      description: "Sealed to protect against contamination and damage.",
    },
    {
      icon: <RotateCcw className="w-5 h-5 text-white" />,
      title: "Reliable US Distribution",
      description: "Fast, reliable shipping across the United States.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-100 overflow-hidden relative">
      {/* Soft lavender/blue glow on left */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-indigo-50/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Large Tilted Floating Vial */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px]">
            <div className="absolute w-72 h-72 bg-slate-100/80 rounded-full blur-2xl -z-10" />
            <div className="relative w-56 sm:w-68 h-88 sm:h-104 animate-float-left filter drop-shadow-2xl">
              <Image
                src="/images/vials/bpc-157.png"
                alt="BPC-157 Precision Peptide Vial"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

          {/* Right Column: Title, Subtitle, and 4 Single-Column Stacked Cards */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div>
              <h2 className="font-heading font-semibold text-2xl sm:text-3xl lg:text-[38px] text-slate-950 tracking-tight leading-tight">
                Built On Precision And Reliability
              </h2>
              <p className="text-[15px] sm:text-base font-sans font-normal text-slate-600 mt-2.5 max-w-xl leading-relaxed">
                Every product is handled with strict quality control to ensure consistency, purity, and dependable research performance.
              </p>
            </div>

            {/* Vertical Stack of 4 Wide Rounded Cards */}
            <div className="space-y-3.5 max-w-2xl">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-[#faf9f5] border border-slate-200/60 hover:border-slate-300 hover:shadow-xs transition-all flex items-center gap-4 sm:gap-5"
                >
                  {/* Dark Circular Icon Container */}
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#1e242f] flex items-center justify-center flex-shrink-0 shadow-xs">
                    {feature.icon}
                  </div>

                  {/* Text details */}
                  <div>
                    <h3 className="font-heading font-semibold text-slate-900 text-sm sm:text-base leading-snug">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-sans font-normal text-slate-500 mt-0.5 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
