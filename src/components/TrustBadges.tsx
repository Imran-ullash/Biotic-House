import React from "react";
import { ShieldCheck, FileCheck, Truck, Headphones } from "lucide-react";

export default function TrustBadges() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "99%+ Verified Purity",
      desc: "Each batch is analytically tested via HPLC and Mass Spectrometry for molecular integrity.",
    },
    {
      icon: FileCheck,
      title: "Batch COA Reports",
      desc: "Every product includes an accessible third-party Certificate of Analysis with exact lot numbers.",
    },
    {
      icon: Truck,
      title: "Fast USA Domestic Shipping",
      desc: "Orders dispatch within 24 hours in secure, temperature-resilient, vacuum-sealed packaging.",
    },
    {
      icon: Headphones,
      title: "Dedicated Researcher Support",
      desc: "Technical compound support and responsive customer assistance for scientific laboratories.",
    },
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-sans font-medium uppercase tracking-widest text-blue-600">
            Gold Standard Quality
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-slate-900 mt-1">
            Built on Precision and Reliability
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:border-blue-300 hover:bg-blue-50/30 transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-heading font-semibold text-slate-900 mb-1.5">{p.title}</h3>
                <p className="text-xs sm:text-sm font-sans font-normal text-slate-500 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
