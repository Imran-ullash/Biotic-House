import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand Info (Spans 2 on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-9 h-11 flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Biotic House Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-semibold tracking-wider text-lg text-white uppercase">
                  BIOTIC HOUSE
                </span>
                <span className="text-[9px] tracking-wider font-sans font-medium text-slate-400 uppercase -mt-1">
                  RESEARCH PEPTIDES
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm font-sans font-normal text-slate-400 leading-relaxed max-w-sm">
              Biotic House is a premier provider of research-grade biochemical peptides, synthesis standards, and analytical reagents for certified laboratory and institutional investigation.
            </p>

            <div className="flex items-center gap-3 pt-2 text-slate-400 text-xs font-sans font-normal">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-sky-400 font-medium text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Laboratory Purity 99%+
              </span>
              <span className="text-[11px] text-slate-500">Ships Domestic USA</span>
            </div>
          </div>

          {/* Col 2: Resources (Anek Telugu 600 heading, Poppins 400 links) */}
          <div>
            <h4 className="text-white font-heading font-semibold text-sm sm:text-base tracking-wider uppercase mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-sans font-normal">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  Lyophilized Peptides
                </Link>
              </li>
              <li>
                <Link href="/product/bacteriostatic-water" className="hover:text-white transition-colors">
                  Bacteriostatic Water
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-white transition-colors">
                  Certificates of Analysis (COA)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Support */}
          <div>
            <h4 className="text-white font-heading font-semibold text-sm sm:text-base tracking-wider uppercase mb-4">
              Support
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-sans font-normal">
              <li>
                <Link href="/contact-us" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-white transition-colors">
                  FAQs &amp; Guidance
                </Link>
              </li>
              <li>
                <Link href="/my-account" className="hover:text-white transition-colors">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link href="/affiliates" className="hover:text-white transition-colors">
                  Affiliate Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal */}
          <div>
            <h4 className="text-white font-heading font-semibold text-sm sm:text-base tracking-wider uppercase mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-sans font-normal">
              <li>
                <Link href="/terms-conditions" className="hover:text-white transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-white transition-colors">
                  Research Use Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/affiliates" className="hover:text-white transition-colors">
                  Affiliate Agreement
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="my-8 p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-[11px] sm:text-xs text-slate-400 leading-relaxed text-center sm:text-left">
          <p>
            <strong className="text-slate-200">RESEARCH CHEMICAL DISCLAIMER:</strong> All materials and peptide compounds listed and distributed on this website are sold exclusively for in-vitro laboratory experimentation, scientific investigation, and chemical analysis. Products are not approved by the U.S. Food and Drug Administration (FDA) to diagnose, treat, prevent, or cure any condition or disease. They must not be used for human consumption, food additives, drug compounding, or cosmetic application.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Biotic House. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy
            </Link>
            <Link href="/terms-conditions" className="hover:text-slate-300 transition-colors">
              Terms
            </Link>
            <Link href="/disclaimer" className="hover:text-slate-300 transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
