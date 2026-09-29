"use client";

import React from "react";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function FloatingCartPill() {
  const { openCart, cartCount, total } = useCart();

  if (cartCount === 0) return null;

  return (
    <button
      onClick={openCart}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 bg-slate-900/95 hover:bg-slate-900 text-white rounded-full p-1.5 pl-3 pr-4 sm:pl-4 sm:pr-5 shadow-2xl border border-slate-700/80 backdrop-blur-md flex items-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group"
      aria-label="Open Cart Drawer"
    >
      <div className="relative flex items-center gap-2">
        <div className="relative">
          <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] font-sans font-semibold w-4 h-4 rounded-full flex items-center justify-center border-2 border-slate-900">
            {cartCount}
          </span>
        </div>
        <span className="font-sans font-semibold text-xs sm:text-sm text-white">
          ${total.toFixed(2)}
        </span>
      </div>

      <div className="w-[1px] h-4 bg-white/20" />

      <div className="flex items-center gap-1 text-[11px] sm:text-xs font-sans font-medium tracking-wider uppercase text-white">
        <span>View Cart</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </button>
  );
}
