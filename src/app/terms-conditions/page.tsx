import React from "react";

export const metadata = {
  title: "Terms & Conditions | Biotic House",
  description: "Terms and conditions of sale for scientific laboratory research materials.",
};

export default function TermsPage() {
  return (
    <div className="py-16 sm:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xs">
          <h1 className="font-heading font-semibold text-2xl sm:text-3xl lg:text-4xl text-slate-900 mb-6">
            Terms &amp; Conditions
          </h1>
          <div className="prose prose-slate max-w-none text-[15px] sm:text-base font-sans font-normal text-slate-600 space-y-4 leading-relaxed">
            <p>Welcome to Biotic House. By accessing our platform, purchasing research compounds, or utilizing our services, you agree to comply with and be bound by the following terms.</p>
            <h3 className="font-heading font-semibold text-base sm:text-lg text-slate-900 pt-2">1. Research Material Scope</h3>
            <p>All items provided are for laboratory and analytical use only. Purchasing entities agree that products will not be misbranded, misused, or administered to humans or animals.</p>
            <h3 className="font-heading font-semibold text-base sm:text-lg text-slate-900 pt-2">2. Age and Legal Compliance</h3>
            <p>Purchasers must be at least 21 years of age and legally authorized in their jurisdiction to receive research peptides.</p>
            <h3 className="font-heading font-semibold text-base sm:text-lg text-slate-900 pt-2">3. Shipping &amp; Delivery</h3>
            <p>Domestic orders are dispatched with priority tracking. Risk of loss passes to purchaser upon transfer to the carrier, unless Priority Shipment Protection is selected at checkout.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
