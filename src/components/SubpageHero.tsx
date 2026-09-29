"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";

interface SubpageHeroProps {
  badgeText: string;
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaHref?: string;
  ctaIcon?: React.ReactNode;
  vials?: {
    leftOuter?: string;
    leftInner?: string;
    rightInner?: string;
    rightOuter?: string;
  };
}

export default function SubpageHero({
  badgeText,
  title,
  subtitle,
  ctaText,
  ctaHref = "#content",
  ctaIcon,
  vials = {
    leftOuter: "/images/vials/tb-500.png",
    leftInner: "/images/vials/bac-water.png",
    rightInner: "/images/vials/bpc-157.png",
    rightOuter: "/images/vials/cartalax.png",
  },
}: SubpageHeroProps) {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (ctaHref.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(ctaHref);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f4f2ff]/60 via-[#edf3ff]/50 to-white pt-16 pb-20 sm:pt-20 sm:pb-28 border-b border-slate-100">
      {/* Ambient soft glow overlays */}
      <div className="absolute top-0 left-1/4 w-[500px] h-72 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-0 right-1/4 w-[500px] h-72 bg-purple-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="relative flex items-center justify-between min-h-[320px] sm:min-h-[380px]">
          {/* ================= LEFT FLANKING VIALS ================= */}
          <div className="hidden md:flex items-center gap-3 lg:gap-6 flex-shrink-0 relative w-48 lg:w-72 h-72 pointer-events-none">
            {/* Outer Left Vial (Higher, Tilted Left, Slightly Smaller) */}
            <div className="absolute -left-4 lg:-left-2 top-4 w-28 lg:w-36 h-44 lg:h-56 animate-float-left filter drop-shadow-xl opacity-90 transition-transform">
              <Image
                src={vials.leftOuter || "/images/vials/tb-500.png"}
                alt="Research Vial"
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Inner Left Vial (Lower, Tilted Right Slightly, Larger, Foreground) */}
            <div className="absolute left-16 lg:left-24 top-14 lg:top-12 w-36 lg:w-48 h-56 lg:h-72 animate-float-slow filter drop-shadow-2xl z-10 transition-transform">
              <Image
                src={vials.leftInner || "/images/vials/bac-water.png"}
                alt="Research Peptide Diluent"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

          {/* ================= CENTER HERO CONTENT ================= */}
          <div className="max-w-2xl mx-auto text-center px-4 z-20 flex-1">
            {/* Live Response / Status Pill Badge (Poppins 500) */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-slate-200/80 shadow-xs mb-6 backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              <span className="text-xs font-sans font-medium text-slate-700 tracking-wide">
                {badgeText}
              </span>
            </div>

            {/* Main Headline (Anek Telugu 600) */}
            <h1 className="font-heading font-semibold text-3xl sm:text-4xl lg:text-5xl text-slate-950 tracking-tight leading-[1.15] mb-4">
              {title}
            </h1>

            {/* Subtitle (Poppins 400) */}
            <p className="text-[15px] sm:text-base lg:text-[17px] text-slate-600 max-w-xl mx-auto leading-relaxed mb-8 font-sans font-normal">
              {subtitle}
            </p>

            {/* Pill CTA Button (Poppins 500) */}
            {ctaText && (
              <div>
                <Link
                  href={ctaHref}
                  onClick={handleScroll}
                  className="inline-flex items-center gap-2.5 bg-slate-950 hover:bg-slate-800 text-white font-sans font-medium text-xs sm:text-sm px-8 py-3.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
                >
                  {ctaIcon}
                  <span>{ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* ================= RIGHT FLANKING VIALS ================= */}
          <div className="hidden md:flex items-center gap-3 lg:gap-6 flex-shrink-0 relative w-48 lg:w-72 h-72 pointer-events-none">
            {/* Inner Right Vial (Higher, Tilted Left Slightly, Larger, Foreground) */}
            <div className="absolute right-16 lg:right-24 top-6 lg:top-4 w-36 lg:w-48 h-56 lg:h-72 animate-float-slow filter drop-shadow-2xl z-10 transition-transform">
              <Image
                src={vials.rightInner || "/images/vials/bpc-157.png"}
                alt="Research Peptide Vial"
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Outer Right Vial (Lower, Tilted Right, Slightly Smaller) */}
            <div className="absolute -right-4 lg:-right-2 top-16 lg:top-20 w-28 lg:w-36 h-44 lg:h-56 animate-float-right filter drop-shadow-xl opacity-90 transition-transform">
              <Image
                src={vials.rightOuter || "/images/vials/cartalax.png"}
                alt="Research Peptide Vial"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Down Arrow Guidance Indicator */}
        <div className="pt-8 sm:pt-12 text-slate-400 flex justify-center">
          <Link
            href={ctaHref}
            onClick={handleScroll}
            className="p-2 rounded-full hover:text-slate-700 transition-colors cursor-pointer"
            aria-label="Scroll to content"
          >
            <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
          </Link>
        </div>
      </div>
    </section>
  );
}
