"use client";

import React from "react";
import { FlaskConical, Award, Shield, Truck, Lock, Headphones } from "lucide-react";

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: FlaskConical,
      title: "Pure Quality",
      desc: "Independently verified for 99%+ purity with comprehensive third-party HPLC and Mass Spectrometry documentation.",
    },
    {
      icon: Award,
      title: "Batch Consistency",
      desc: "Strict synthesis and purification protocols guarantee uniform compound integrity across every research order.",
    },
    {
      icon: Shield,
      title: "Discreet Packaging",
      desc: "All compounds are packed securely in temperature-stable, tamper-evident vials with unmarked protective boxes.",
    },
    {
      icon: Truck,
      title: "Fast Shipping",
      desc: "Dispatched safely within 24–48 hours from our US laboratory facility with tracked express delivery.",
    },
    {
      icon: Lock,
      title: "Secure Transactions",
      desc: "Fully encrypted checkout with 256-bit SSL security and flexible, compliant research payment options.",
    },
    {
      icon: Headphones,
      title: "Expert Support",
      desc: "Our scientific customer service team is readily available to answer experimental inquiries and assist your lab.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#f8f9fa] border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-heading font-semibold text-2xl sm:text-3xl lg:text-[38px] text-slate-950 tracking-tight leading-tight">
            Why Choose Us?
          </h2>
          <p className="text-[15px] sm:text-base font-sans font-normal text-slate-600 mt-3 leading-relaxed">
            Dedicated to providing researchers with superior quality, reliable service, and verified purity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <div
                key={i}
                className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-200 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-slate-950 text-white flex items-center justify-center mb-4 group-hover:bg-[#0066FF] transition-colors shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-semibold text-slate-900 text-base sm:text-lg mb-2">
                    {r.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-sans font-normal text-slate-600 leading-relaxed">
                    {r.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
