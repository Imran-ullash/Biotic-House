"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is Biotic House?",
      a: "Biotic House is a dedicated research chemical and peptide supplier providing analytical laboratories, universities, and qualified scientists with high-purity compounds. All materials are tested to ensure verifiable purity (>99%) and stability for controlled laboratory investigation.",
    },
    {
      q: "How are products tested?",
      a: "All compounds undergo independent third-party High-Performance Liquid Chromatography (HPLC) and Mass Spectrometry (MS) testing to verify chemical identity, purity levels, and molecular stability before release.",
    },
    {
      q: "Are your peptides safe for human use?",
      a: "No. All products sold on Biotic House are strictly for in-vitro laboratory research and analytical applications only. They are not intended for human consumption, clinical use, medical treatment, or veterinary use under any circumstances.",
    },
    {
      q: "What are the shipping options and delivery times?",
      a: "We ship domestically across the United States via tracked priority courier within 24–48 hours of order confirmation. Transit times typically range from 2 to 4 business days.",
    },
    {
      q: "Can I get a Certificate of Analysis (COA)?",
      a: "Yes. Every single product has an accessible Certificate of Analysis detailing batch purity, HPLC chromatograms, and testing date available directly on the product page.",
    },
    {
      q: "Where is support located?",
      a: "Our customer service and technical inquiry support team is based in the United States and available Monday through Friday to assist researchers with order tracking and technical data.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading font-semibold text-2xl sm:text-3xl lg:text-[38px] text-slate-950 tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-[15px] sm:text-base font-sans font-normal text-slate-500 mt-2 max-w-xl mx-auto leading-relaxed">
            Find answers to frequently asked questions about our products, shipping, and quality assurance.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className={`w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-heading font-semibold text-sm sm:text-base transition-all cursor-pointer ${
                    isOpen
                      ? "bg-[#0066FF] text-white rounded-t-xl"
                      : "bg-[#1e293b] hover:bg-[#334155] text-white rounded-xl shadow-xs"
                  }`}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-white flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="p-5 text-xs sm:text-sm font-sans font-normal text-slate-600 leading-relaxed bg-[#f8f9fa] border-x border-b border-slate-200/80 rounded-b-xl">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
