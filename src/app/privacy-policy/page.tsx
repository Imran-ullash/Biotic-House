import React from "react";

export const metadata = {
  title: "Privacy Policy | Biotic House",
  description: "Privacy and data protection policy of Biotic House.",
};

export default function PrivacyPage() {
  return (
    <div className="py-16 sm:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xs">
          <h1 className="font-heading font-semibold text-2xl sm:text-3xl lg:text-4xl text-slate-900 mb-6">
            Privacy Policy
          </h1>
          <div className="prose prose-slate max-w-none text-[15px] sm:text-base font-sans font-normal text-slate-600 space-y-4 leading-relaxed">
            <p>At Biotic House, we prioritize the confidentiality and security of our researchers and scientific institutions.</p>
            <h3 className="font-heading font-semibold text-base sm:text-lg text-slate-900 pt-2">1. Information We Collect</h3>
            <p>We collect essential order, payment, and shipping information required to process and dispatch research orders securely.</p>
            <h3 className="font-heading font-semibold text-base sm:text-lg text-slate-900 pt-2">2. Data Security</h3>
            <p>All sensitive transactions are processed through 256-bit encrypted channels and compliant payment gateways. We do not sell or lease customer information to third parties.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
