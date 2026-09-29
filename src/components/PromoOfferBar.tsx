"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { PROMO_COUPON_CODE } from "@/data/products";

export default function PromoOfferBar() {
  const { applyCoupon, appliedCoupon } = useCart();
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 16,
    minutes: 49,
    seconds: 32,
  });

  useEffect(() => {
    const storageKey = "bh_promo_timer_target";
    let target = localStorage.getItem(storageKey);
    const now = Date.now();

    if (!target || parseInt(target, 10) < now) {
      const fourDaysMs = (4 * 86400 + 16 * 3600 + 49 * 60 + 32) * 1000;
      target = (now + fourDaysMs).toString();
      localStorage.setItem(storageKey, target);
    }

    const interval = setInterval(() => {
      const remaining = Math.max(0, parseInt(target!, 10) - Date.now());
      if (remaining <= 0) {
        const nextTarget = Date.now() + 3 * 86400 * 1000;
        localStorage.setItem(storageKey, nextTarget.toString());
        return;
      }

      const totalSecs = Math.floor(remaining / 1000);
      const days = Math.floor(totalSecs / 86400);
      const hours = Math.floor((totalSecs % 86400) / 3600);
      const minutes = Math.floor((totalSecs % 3600) / 60);
      const seconds = totalSecs % 60;

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleApplyCoupon = () => {
    applyCoupon(PROMO_COUPON_CODE);
    navigator.clipboard?.writeText(PROMO_COUPON_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const isApplied = appliedCoupon === PROMO_COUPON_CODE || copied;

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="relative w-full overflow-hidden border-b border-blue-500/30 bg-gradient-to-r from-[#060911] via-[#0A1224] to-[#0B1938] text-white py-2 px-3 sm:px-4 z-40 select-none">
      {/* Animated Watermark Marquee */}
      <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center overflow-hidden z-0">
        <div className="flex whitespace-nowrap animate-[marquee_35s_linear_infinite] font-heading font-semibold text-2xl tracking-[2.5px] text-[#38BDF8] uppercase">
          <span>WELCOME OFFER &bull; 10% OFF SITEWIDE &bull; FREE SHIPPING &bull; BIOTIC HOUSE &bull; WELCOME10 &bull;&nbsp;</span>
          <span>WELCOME OFFER &bull; 10% OFF SITEWIDE &bull; FREE SHIPPING &bull; BIOTIC HOUSE &bull; WELCOME10 &bull;&nbsp;</span>
          <span>WELCOME OFFER &bull; 10% OFF SITEWIDE &bull; FREE SHIPPING &bull; BIOTIC HOUSE &bull; WELCOME10 &bull;&nbsp;</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto flex items-center justify-between sm:justify-center gap-2 sm:gap-4 md:gap-5">
        {/* Left: Discount callout */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="font-heading font-semibold text-xl sm:text-2xl text-[#38BDF8] drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]">
            10%
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-heading font-semibold text-xs sm:text-sm text-white">
              off sitewide
            </span>
            <span className="hidden sm:inline-block text-[9px] font-sans font-medium tracking-wider uppercase text-slate-400">
              WELCOME OFFER &middot; FREE SHIPPING
            </span>
            <div className="sm:hidden flex items-center gap-1 text-[9.5px] font-sans font-medium text-slate-400">
              <span>Welcome Offer</span>
              <span className="text-[#38BDF8]">&bull;</span>
              <span className="font-mono text-slate-200">
                {timeLeft.days}d {pad(timeLeft.hours)}h {pad(timeLeft.minutes)}m
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Divider Plus */}
        <span className="hidden sm:inline text-white/40 text-sm font-light">+</span>

        {/* 1-Click Interactive Coupon Tag */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <span className="hidden md:inline text-xs font-semibold text-slate-300">Code</span>
          <button
            onClick={handleApplyCoupon}
            type="button"
            className={`group inline-flex items-center gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md border transition-all duration-200 active:scale-95 cursor-pointer ${
              isApplied
                ? "bg-[#064E3B] border-emerald-500 shadow-[0_0_14px_rgba(16,185,129,0.35)]"
                : "bg-[#090E17] border-blue-600 hover:border-sky-400 shadow-[0_2px_8px_rgba(37,99,235,0.25)] hover:shadow-[0_0_16px_rgba(56,189,248,0.4)]"
            }`}
            title="Click to copy and apply code"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full flex-shrink-0 shadow-inner ${
                isApplied ? "bg-emerald-400" : "bg-[#3B82F6]"
              }`}
            />
            <div className="flex flex-col text-left leading-none">
              <span
                className={`text-[11px] sm:text-xs font-extrabold tracking-wider uppercase ${
                  isApplied ? "text-emerald-200" : "text-[#38BDF8]"
                }`}
              >
                {isApplied ? "✓ WELCOME10" : "WELCOME10"}
              </span>
              <span
                className={`text-[7.5px] sm:text-[8.5px] font-semibold tracking-tight ${
                  isApplied ? "text-emerald-300" : "text-slate-400"
                }`}
              >
                {isApplied ? "applied!" : "tap to apply"}
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Divider */}
        <div className="hidden sm:block w-[1px] h-5 bg-white/20" />

        {/* Desktop Countdown Timer */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs flex-shrink-0">
          <span className="text-slate-400 font-semibold">Ends In</span>
          <span className="font-mono font-bold text-white tracking-wide">
            {timeLeft.days}d {pad(timeLeft.hours)}h {pad(timeLeft.minutes)}m {pad(timeLeft.seconds)}s
          </span>
        </div>
      </div>
    </div>
  );
}
