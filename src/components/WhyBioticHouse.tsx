"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function WhyBioticHouse() {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Story & Metrics */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            <h2 className="font-heading font-semibold text-2xl sm:text-3xl lg:text-[38px] text-slate-950 tracking-tight leading-tight">
              Why Biotic House
            </h2>

            <div className="space-y-4 text-[15px] sm:text-base font-sans font-normal text-slate-600 leading-relaxed max-w-xl">
              <p>
                At Biotic House, we are committed to providing institutions, analytical laboratories, and independent research scientists with research-grade peptides of the highest analytical purity.
              </p>
              <p>
                Our rigorous multi-stage quality control involves independent third-party HPLC &amp; Mass Spectrometry verification for every production batch. We pride ourselves on batch traceability, temperature-controlled packaging, and lightning-fast domestic dispatch.
              </p>
            </div>

            {/* Metrics Row (Anek Telugu 600 numbers, Poppins 500 labels) */}
            <div className="grid grid-cols-3 gap-4 pt-2 max-w-md">
              <div>
                <div className="text-2xl sm:text-3xl font-heading font-semibold text-slate-900 tracking-tight">
                  99%+
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-sans font-medium mt-0.5">
                  Verified Purity
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-heading font-semibold text-slate-900 tracking-tight">
                  1000+
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-sans font-medium mt-0.5">
                  Research Clients
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-heading font-semibold text-slate-900 tracking-tight">
                  24-48h
                </div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-sans font-medium mt-0.5">
                  Expedited Dispatch
                </div>
              </div>
            </div>

            {/* CTA Button (Poppins 500) */}
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center bg-[#0066FF] hover:bg-[#0052cc] text-white font-sans font-medium text-xs sm:text-sm px-8 py-3.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer active:scale-95"
              >
                Shop Now
              </Link>
            </div>
          </div>

          {/* Right Column: Floating Vial */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[340px] sm:min-h-[420px]">
            <div className="absolute w-64 h-64 bg-blue-50/60 rounded-full blur-2xl -z-10" />
            <div className="relative w-52 sm:w-64 h-80 sm:h-96 animate-float-right filter drop-shadow-2xl">
              <Image
                src="/images/vials/bac-water.png"
                alt="Biotic House Bacteriostatic Water Research Vial"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
