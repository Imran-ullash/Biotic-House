"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ChevronLeft, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Sparkles, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { FREE_SHIPPING_THRESHOLD, PROMO_COUPON_CODE } from "@/data/products";

export default function SideCartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    discount,
    total,
    freeShippingRemaining,
    freeShippingProgress,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    upsellProduct,
    addToCart,
    cartCount,
  } = useCart();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [shippingProtection, setShippingProtection] = useState(true);

  if (!isOpen) return null;

  const isUpsellInCart = items.some((item) => item.product.id === upsellProduct.id);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const ok = applyCoupon(couponInput);
    if (ok) {
      setCouponInput("");
      setCouponError("");
    } else {
      setCouponError(`Invalid code. Try "${PROMO_COUPON_CODE}" for 10% off.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-white z-10">
            <button
              onClick={closeCart}
              className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-transform active:scale-95 cursor-pointer"
              aria-label="Back to shopping"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <span className="font-heading font-semibold text-sm sm:text-base tracking-wider uppercase text-slate-900">
                YOUR CART
              </span>
              <span className="bg-emerald-100 text-emerald-800 font-sans font-medium text-xs px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            </div>

            <button
              onClick={closeCart}
              className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-transform active:scale-95 cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body: Scrollable area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {/* Free Shipping Dynamic Progress Bar */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 sm:p-4">
              <div className="flex items-center justify-between text-xs sm:text-sm font-sans font-medium mb-2">
                <span className="text-slate-700">Free US Shipping</span>
                <span className="font-sans font-medium text-slate-900">
                  {freeShippingRemaining > 0 ? (
                    <>
                      Add <span className="text-blue-600 font-semibold">${freeShippingRemaining.toFixed(2)}</span> more
                    </>
                  ) : (
                    <span className="text-emerald-600 font-sans font-semibold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Free Shipping Unlocked!
                    </span>
                  )}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2.5 pt-2 border-t border-slate-200/50 font-sans font-normal">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  <span>Ships in 24h from USA</span>
                </div>
                <span>Free on orders $100+</span>
              </div>
            </div>

            {/* Empty state */}
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-slate-900 mb-1">Your cart is empty</h3>
                <p className="text-xs font-sans font-normal text-slate-500 max-w-xs mb-6">
                  Explore our premium research peptides with 99%+ verified purity.
                </p>
                <button
                  onClick={closeCart}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-sans font-medium text-xs px-6 py-3 rounded-full transition-all cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              /* Item List */
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedDosage || ""}`}
                    className="flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-slate-200/70 hover:border-slate-300 transition-colors shadow-2xs"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-xl bg-slate-50 border border-slate-100 p-1 flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${item.product.slug}`}
                          onClick={closeCart}
                          className="font-sans font-medium text-sm text-slate-900 hover:text-blue-600 truncate transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-slate-400 hover:text-red-500 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.selectedDosage && (
                        <div className="text-[11px] font-semibold text-slate-500 mt-0.5">
                          Dosage: {item.selectedDosage}
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-2.5">
                        {/* Stepper */}
                        <div className="inline-flex items-center border border-slate-200 rounded-lg bg-slate-50">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 hover:bg-slate-200 text-slate-700 transition-colors rounded-l-md"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-slate-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-slate-200 text-slate-700 transition-colors rounded-r-md"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="font-extrabold text-sm text-slate-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* In-Cart Upsell Card (Bacteriostatic Water) */}
            {!isUpsellInCart && (
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-50/80 via-white to-slate-50 border border-blue-200/60 shadow-2xs">
                <div className="flex items-center justify-between text-xs font-extrabold text-blue-900 mb-2">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" /> RECOMMENDED ADD-ON
                  </span>
                  <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
                    Essential Diluent
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl bg-white border border-blue-100 flex-shrink-0 p-1">
                    <Image
                      src={upsellProduct.image}
                      alt={upsellProduct.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-slate-900 truncate">
                      {upsellProduct.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-semibold">
                      ${upsellProduct.price.toFixed(2)} &middot; 10 mL
                    </p>
                  </div>
                  <button
                    onClick={() => addToCart(upsellProduct, 1, "10ml")}
                    className="bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all active:scale-95 shadow-xs cursor-pointer"
                  >
                    + Add
                  </button>
                </div>
              </div>
            )}

            {/* Shipment Protection Toggle */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <div>
                  <span className="font-bold text-slate-800">Priority Shipment Protection</span>
                  <p className="text-[10px] text-slate-500">Covers loss, theft, or damage in transit ($2.95)</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={shippingProtection}
                onChange={() => setShippingProtection(!shippingProtection)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
            </div>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-1.5">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Coupon code (e.g. WELCOME10)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:border-blue-600 transition-colors uppercase font-medium"
                />
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {couponError && <p className="text-[11px] text-red-600 font-medium">{couponError}</p>}
              {appliedCoupon && (
                <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 p-2 rounded-lg border border-emerald-200">
                  <span className="font-semibold">✓ Coupon &apos;{appliedCoupon}&apos; applied (-10%)</span>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-red-500 font-bold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Footer Area with Subtotal & Instant Checkout */}
          <div className="p-4 sm:p-5 border-t border-slate-100 bg-white space-y-3 z-10 shadow-lg">
            <div className="space-y-1.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex items-center justify-between text-emerald-600 font-semibold">
                  <span>10% Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              {shippingProtection && (
                <div className="flex items-center justify-between text-slate-600">
                  <span>Shipping Protection</span>
                  <span className="font-semibold text-slate-900">$2.95</span>
                </div>
              )}
              <div className="flex items-center justify-between text-slate-600">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-emerald-600">
                  {freeShippingRemaining === 0 ? "FREE" : "$9.99"}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between font-sans font-semibold text-base text-slate-900">
                <span>Total</span>
                <span>
                  $
                  {(
                    total +
                    (shippingProtection ? 2.95 : 0) +
                    (freeShippingRemaining === 0 ? 0 : 9.99)
                  ).toFixed(2)}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-sans font-medium text-sm py-3.5 rounded-full transition-all duration-200 active:scale-98 shadow-md hover:shadow-lg cursor-pointer"
            >
              <span>Instant Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <p className="text-[10px] text-center text-slate-400">
              Guaranteed Safe &amp; Secure Checkout &bull; 256-Bit SSL Encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
