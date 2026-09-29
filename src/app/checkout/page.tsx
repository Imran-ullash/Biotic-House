"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  ArrowLeft, 
  Tag, 
  CreditCard, 
  ShieldAlert, 
  User, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  ArrowRight 
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { PROMO_COUPON_CODE } from "@/data/products";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, discount, total, appliedCoupon, applyCoupon, removeCoupon } = useCart();
  const { user, isAuthenticated, login } = useAuth();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [shippingProtection, setShippingProtection] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Guest inline login state
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPassword, setGuestPassword] = useState("");
  const [showGuestPassword, setShowGuestPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Form states
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "CA",
    zip: "",
    cardNumber: "",
    cardExp: "",
    cardCvc: "",
  });

  // Pre-fill fields if user is authenticated
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        email: prev.email || user.email || "",
        firstName: prev.firstName || user.firstName || "",
        lastName: prev.lastName || user.lastName || "",
        phone: prev.phone || user.phone || "",
        address: prev.address || user.address?.street || "",
        apartment: prev.apartment || user.address?.apartment || "",
        city: prev.city || user.address?.city || "",
        state: prev.state || user.address?.state || "CA",
        zip: prev.zip || user.address?.zip || "",
      }));
    }
  }, [user]);

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

  const handleInlineLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!guestEmail.trim() || !guestEmail.includes("@")) {
      setLoginError("Please enter a valid researcher email address.");
      return;
    }

    if (!guestPassword) {
      setLoginError("Please enter your account password.");
      return;
    }

    setLoginLoading(true);
    try {
      await login(guestEmail.trim(), guestPassword);
    } catch {
      setLoginError("Invalid login credentials. Please verify and try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push("/my-account?redirect=/checkout");
      return;
    }
    setOrderPlaced(true);
  };

  const shippingCost = subtotal >= 100 ? 0 : 9.99;
  const grandTotal = total + (shippingProtection ? 2.95 : 0) + shippingCost;

  if (orderPlaced) {
    return (
      <div className="py-20 bg-slate-50 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="font-heading font-semibold text-2xl text-slate-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-xs sm:text-sm font-sans font-normal text-slate-600 mb-6">
            Thank you for your scientific order. We have sent confirmation and tracking updates to{" "}
            <strong>{formData.email || user?.email || "your email"}</strong>.
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2 mb-6 font-sans">
            <div className="flex justify-between">
              <span className="text-slate-500">Order Number:</span>
              <span className="font-semibold text-slate-900">#BH-78291</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Payment Status:</span>
              <span className="font-semibold text-emerald-600">Authorized &amp; Verified</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Total Paid:</span>
              <span className="font-semibold text-slate-900">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <Link
            href="/"
            className="w-full inline-block py-3 px-6 rounded-full bg-slate-900 text-white font-sans font-medium text-sm hover:bg-slate-800 transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-20 text-center bg-white min-h-[60vh] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-heading font-semibold text-slate-900 mb-2">Your cart is empty</h2>
        <p className="text-sm font-sans font-normal text-slate-500 mb-6">
          Add some high-purity research compounds before proceeding to checkout.
        </p>
        <Link
          href="/shop"
          className="bg-slate-900 hover:bg-slate-800 text-white font-sans font-medium text-sm px-6 py-3 rounded-full transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 sm:py-16 bg-slate-50/70 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-sans font-medium mb-8">
          <Link href="/shop" className="hover:text-blue-600 flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-7">
            {!isAuthenticated ? (
              /* AMINO CLUB STYLE GUEST STATE: ONLY LOGIN CARD & LOCKED NOTICE */
              <div className="space-y-6">
                {/* 1. Guest Login Card (Account Required) */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Account Required</span>
                  </div>

                  <h3 className="font-heading font-semibold text-xl text-slate-900 mb-1">
                    Customer Information
                  </h3>
                  <p className="text-xs sm:text-sm font-sans font-normal text-slate-500 mb-6 leading-relaxed">
                    Please log in to your researcher account. Your billing details, shipping address, and payment options will be unlocked once you log in.
                  </p>

                  {loginError && (
                    <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-sans font-medium flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                      <span>{loginError}</span>
                    </div>
                  )}

                  <form onSubmit={handleInlineLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-sans font-medium text-slate-700 mb-1">
                        Username or Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Enter your email or username"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-sans focus:outline-hidden focus:border-blue-600 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-sans font-medium text-slate-700">
                          Password <span className="text-rose-500">*</span>
                        </label>
                        <Link
                          href="/my-account"
                          className="text-xs font-sans text-blue-600 hover:underline"
                        >
                          Lost password?
                        </Link>
                      </div>
                      <div className="relative">
                        <input
                          type={showGuestPassword ? "text" : "password"}
                          required
                          placeholder="Enter your password"
                          value={guestPassword}
                          onChange={(e) => setGuestPassword(e.target.value)}
                          className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-sans focus:outline-hidden focus:border-blue-600 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
                        />
                        <button
                          type="button"
                          onClick={() => setShowGuestPassword(!showGuestPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          {showGuestPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loginLoading}
                      className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-sans font-semibold text-sm transition-all duration-200 active:scale-98 shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-75"
                    >
                      <span>{loginLoading ? "Logging in..." : "Log In & Continue"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>

                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2 text-xs font-sans text-slate-600">
                    <span>Don&apos;t have an account yet?</span>
                    <Link
                      href="/my-account?redirect=/checkout"
                      className="font-semibold text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <span>Create an Account</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* 2. Shipping & Payment Locked Notice Card (Amino Club Style) */}
                <div className="p-6 sm:p-8 rounded-3xl bg-slate-50/90 border border-dashed border-slate-300 text-center">
                  <div className="w-12 h-12 rounded-full bg-slate-200/80 text-slate-500 flex items-center justify-center mx-auto mb-3">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading font-semibold text-base text-slate-800 mb-1">
                    Shipping &amp; Payment Locked
                  </h4>
                  <p className="text-xs font-sans font-normal text-slate-500 max-w-sm mx-auto mb-4 leading-relaxed">
                    Shipping methods, delivery addresses, and payment options will be available once you log in to your researcher account.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      window.scrollTo({ top: 120, behavior: "smooth" });
                    }}
                    className="py-2.5 px-6 rounded-full bg-white hover:bg-slate-900 hover:text-white border border-slate-300 text-slate-800 font-sans font-medium text-xs transition-colors shadow-2xs cursor-pointer"
                  >
                    Log In to Unlock &rarr;
                  </button>
                </div>
              </div>
            ) : (
              /* AUTHENTICATED: FULL CHECKOUT FORM (CUSTOMER INFO, SHIPPING, PAYMENT, PLACE ORDER) */
              <form onSubmit={handlePlaceOrder} className="space-y-8 animate-in fade-in duration-300">
                {/* 1. Customer Information */}
                <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                    <h2 className="font-heading font-semibold text-lg text-slate-900">
                      1. Customer Information
                    </h2>
                    <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified Researcher</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-200/70 text-blue-950 mb-5 flex items-center justify-between text-xs font-sans">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
                        {user?.firstName ? user.firstName[0].toUpperCase() : "R"}
                      </div>
                      <span>
                        Ordering as <strong className="font-semibold text-slate-900">{user?.firstName} {user?.lastName}</strong> ({user?.email})
                      </span>
                    </div>
                    <Link href="/my-account" className="text-blue-600 hover:underline text-[11px] font-medium">
                      Switch
                    </Link>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address (for order updates &amp; COA) *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="researcher@lab.org"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-blue-600"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-blue-600"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number (for delivery updates)
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-blue-600"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Shipping Address */}
                <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs">
                  <h2 className="font-heading font-semibold text-lg text-slate-900 mb-4">
                    2. Shipping Address (USA Domestic)
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="123 Research Parkway"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Apartment, suite, unit (optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Suite 400"
                        value={formData.apartment}
                        onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-blue-600"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="San Diego"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          State *
                        </label>
                        <select
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-blue-600 bg-white"
                        >
                          <option value="CA">California</option>
                          <option value="FL">Florida</option>
                          <option value="TX">Texas</option>
                          <option value="NY">New York</option>
                          <option value="IL">Illinois</option>
                          <option value="PA">Pennsylvania</option>
                          <option value="OH">Ohio</option>
                          <option value="GA">Georgia</option>
                          <option value="NC">North Carolina</option>
                          <option value="WA">Washington</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="92121"
                          value={formData.zip}
                          onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-blue-600"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Payment Method */}
                <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-heading font-semibold text-lg text-slate-900">
                      3. Payment Method
                    </h2>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                      <ShieldCheck className="w-4 h-4" /> 256-Bit SSL Encrypted
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-3.5 rounded-2xl bg-blue-50/40 border border-blue-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-semibold text-slate-900">Credit / Debit Card</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium">Visa &bull; MC &bull; Amex</span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="•••• •••• •••• ••••"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:outline-hidden focus:border-blue-600"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Expiration (MM/YY) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="MM / YY"
                          value={formData.cardExp}
                          onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:outline-hidden focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          CVC *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="CVC"
                          value={formData.cardCvc}
                          onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:outline-hidden focus:border-blue-600"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit button: Authenticated Place Order */}
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-sans font-medium text-base shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Place Order &bull; ${grandTotal.toFixed(2)}</span>
                </button>

                <p className="text-[11px] text-slate-500 font-sans text-center leading-relaxed">
                  By placing this order, you agree to Biotic House&apos;s{" "}
                  <Link href="/terms-conditions" target="_blank" className="text-blue-600 hover:underline font-medium">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy-policy" target="_blank" className="text-blue-600 hover:underline font-medium">
                    Privacy Policy
                  </Link>
                  , and certify research-only use (see{" "}
                  <Link href="/disclaimer" target="_blank" className="text-blue-600 hover:underline font-medium">
                    Disclaimer
                  </Link>
                  ).
                </p>
              </form>
            )}
          </div>

          {/* ================= RIGHT COLUMN: ORDER REVIEW SUMMARY ================= */}
          {/* Always visible for both guests and authenticated researchers */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-2xs space-y-6">
              <h3 className="font-heading font-semibold text-lg text-slate-900 pb-3 border-b border-slate-100">
                Order Summary ({items.length} items)
              </h3>

              {/* Item List */}
              <div className="space-y-3.5 max-h-80 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex-shrink-0 p-1">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-contain"
                      />
                      <span className="absolute -top-1.5 -right-1.5 bg-slate-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-slate-900 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        ${item.product.price.toFixed(2)} each
                      </p>
                    </div>

                    <div className="text-right font-extrabold text-xs text-slate-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Field */}
              <form onSubmit={handleApplyCoupon} className="space-y-1.5 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Discount code (WELCOME10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 uppercase font-medium focus:bg-white focus:outline-hidden focus:border-blue-600"
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
                    <span className="font-semibold">✓ &apos;{appliedCoupon}&apos; (-10% off) applied</span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-red-500 font-bold hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </form>

              {/* Totals */}
              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>10% Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-slate-900">
                    {shippingCost === 0 ? (
                      <span className="text-emerald-600">FREE</span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>

                {shippingProtection && (
                  <div className="flex justify-between text-slate-600">
                    <span>Priority Shipment Protection</span>
                    <span className="font-semibold text-slate-900">$2.95</span>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-200 flex justify-between text-base font-sans font-semibold text-slate-900">
                  <span>Total Amount</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
