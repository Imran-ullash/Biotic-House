import React from "react";
import { ShieldAlert } from "lucide-react";

export const metadata = {
  title: "Research Use Disclaimer | Biotic House",
  description: "Official chemical research and scientific laboratory compliance disclaimer.",
};

export default function DisclaimerPage() {
  return (
    <div className="py-16 sm:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xs">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-6">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span>Regulatory &amp; Compliance Statement</span>
          </div>

          <h1 className="font-heading font-semibold text-2xl sm:text-3xl lg:text-4xl text-slate-900 mb-6">
            Research Use Only Disclaimer
          </h1>

          <div className="prose prose-slate max-w-none text-[15px] sm:text-base font-sans font-normal text-slate-600 space-y-4 leading-relaxed">
            <p>
              All products offered, sold, and delivered by <strong>Biotic House</strong> are supplied strictly for in-vitro analytical evaluation, chemical characterization, and scientific laboratory research purposes only.
            </p>
            <p>
              Under no circumstances are these compounds intended for human or animal application, medicinal administration, veterinary diagnosis, therapeutic treatment, food additive introduction, or commercial cosmetic compounding.
            </p>
            <h3 className="font-heading font-semibold text-base sm:text-lg text-slate-900 pt-2">Purchaser Representations</h3>
            <p>
              By purchasing from Biotic House, the customer explicitly acknowledges that they are a qualified scientist, researcher, or institutional representative possessing the requisite equipment, safety facilities, and handling knowledge to manage chemical research materials responsibly.
            </p>
            <h3 className="font-heading font-semibold text-base sm:text-lg text-slate-900 pt-2">FDA Disclaimer</h3>
            <p>
              The statements and products on this website have not been evaluated or approved by the United States Food and Drug Administration (FDA). These materials are not intended to diagnose, treat, cure, or prevent any medical disease or health condition.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
