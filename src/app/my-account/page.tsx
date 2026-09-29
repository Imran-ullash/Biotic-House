"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  User,
  Lock,
  Mail,
  ArrowRight,
  Phone,
  Building2,
  Eye,
  EyeOff,
  ShieldCheck,
  FlaskConical,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  ExternalLink,
  ArrowLeft,
  Settings,
  MapPin,
  Package,
  LogOut,
  Save,
  Check
} from "lucide-react";
import { useAuth, UserProfile } from "@/context/AuthContext";

function MyAccountContent() {
  const searchParams = useSearchParams();
  const { user, isAuthenticated, login, register, updateProfile, updateAddress, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<"overview" | "profile" | "address" | "orders">("overview");

  // Sync tab with URL search parameter if present
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "profile") setActiveTab("profile");
    else if (tabParam === "address") setActiveTab("address");
    else if (tabParam === "orders") setActiveTab("orders");
  }, [searchParams]);

  // Login / Register toggle
  const [isRegister, setIsRegister] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [institution, setInstitution] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [researchAgreed, setResearchAgreed] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Profile Edit states
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editInstitution, setEditInstitution] = useState("");
  const [profileSaved, setProfileSaved] = useState(false);

  // Address Edit states
  const [addressStreet, setAddressStreet] = useState("");
  const [addressApartment, setAddressApartment] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressState, setAddressState] = useState("CA");
  const [addressZip, setAddressZip] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  // Sync user profile data to edit inputs
  useEffect(() => {
    if (user) {
      setEditFirstName(user.firstName || "");
      setEditLastName(user.lastName || "");
      setEditPhone(user.phone || "");
      setEditInstitution(user.institution || "");
      if (user.address) {
        setAddressStreet(user.address.street || "");
        setAddressApartment(user.address.apartment || "");
        setAddressCity(user.address.city || "");
        setAddressState(user.address.state || "CA");
        setAddressZip(user.address.zip || "");
      }
    }
  }, [user]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    await login(loginEmail, loginPassword);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (registerPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match. Please verify both passwords.");
      return;
    }

    if (!researchAgreed) {
      setErrorMsg("You must confirm you are at least 21 years old and that all materials are for laboratory research only.");
      return;
    }

    if (!termsAgreed) {
      setErrorMsg("Please accept the Terms of Service and Privacy Policy.");
      return;
    }

    await register({
      firstName,
      lastName,
      email: registerEmail,
      phone,
      institution,
      password: registerPassword,
    });
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSuccess(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      firstName: editFirstName.trim(),
      lastName: editLastName.trim(),
      phone: editPhone.trim() || undefined,
      institution: editInstitution.trim() || undefined,
    });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    updateAddress({
      street: addressStreet.trim(),
      apartment: addressApartment.trim(),
      city: addressCity.trim(),
      state: addressState.trim(),
      zip: addressZip.trim(),
      country: "United States",
    });
    setAddressSaved(true);
    setTimeout(() => setAddressSaved(false), 3000);
  };

  return (
    <div className="py-12 sm:py-20 bg-slate-50 min-h-screen flex items-center justify-center p-4">
      {isAuthenticated && user ? (
        /* ================= AUTHENTICATED RESEARCHER DASHBOARD ================= */
        <div className="w-full max-w-4xl bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl transition-all duration-300">
          {/* Dashboard Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl border border-blue-100 shadow-inner">
                {user.firstName ? user.firstName[0].toUpperCase() : "R"}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-heading font-semibold text-2xl text-slate-900">
                    {user.firstName} {user.lastName}
                  </h1>
                  <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Researcher
                  </span>
                </div>
                <p className="text-xs font-sans text-slate-500 mt-0.5">
                  {user.email} &bull; Member since {user.memberSince || "2026"}
                </p>
              </div>
            </div>

            <button
              onClick={logout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 text-slate-700 hover:text-rose-600 hover:bg-rose-50 text-xs font-sans font-medium transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto gap-2 py-4 border-b border-slate-100 mb-8 text-xs font-sans font-medium">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${activeTab === "overview"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100"
                }`}
            >
              <User className="w-4 h-4" />
              <span>Account Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${activeTab === "profile"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100"
                }`}
            >
              <Settings className="w-4 h-4" />
              <span>Edit Profile Details</span>
            </button>

            <button
              onClick={() => setActiveTab("address")}
              className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${activeTab === "address"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100"
                }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Shipping Address</span>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-2.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${activeTab === "orders"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100"
                }`}
            >
              <Package className="w-4 h-4" />
              <span>Orders &amp; COA History</span>
            </button>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block mb-1">
                    Compliance Verification
                  </span>
                  <p className="font-heading font-semibold text-lg text-emerald-600 flex items-center gap-1.5">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    21+ Age Verified
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">Authorized for laboratory research order placement.</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block mb-1">
                    Affiliated Institution
                  </span>
                  <p className="font-heading font-semibold text-lg text-slate-900 truncate">
                    {user.institution || "Independent Investigator"}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">Contact: {user.phone || "No phone added"}</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block mb-1">
                    Total Completed Orders
                  </span>
                  <p className="font-heading font-semibold text-2xl text-slate-900">
                    0
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">Priority dispatch from domestic USA hub.</p>
                </div>
              </div>

              {/* Action Banner */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-1">
                    Ready to begin research experimentation?
                  </h3>
                  <p className="text-xs text-slate-300">
                    Browse our high-purity peptides with verified batch HPLC/MS Certificates of Analysis.
                  </p>
                </div>
                <Link
                  href="/shop"
                  className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-sans font-medium text-xs flex items-center gap-2 transition-colors shrink-0 shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Browse Catalog</span>
                </Link>
              </div>
            </div>
          )}

          {/* TAB 2: EDIT PROFILE */}
          {activeTab === "profile" && (
            <form onSubmit={handleSaveProfile} className="space-y-6 max-w-2xl">
              <div>
                <h2 className="font-heading font-semibold text-xl text-slate-900 mb-1">
                  Researcher Profile Information
                </h2>
                <p className="text-xs text-slate-500">
                  Customize and keep your personal and laboratory contact details up to date.
                </p>
              </div>

              {profileSaved && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-sans font-medium flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Your profile details have been saved successfully!</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans font-medium text-slate-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editFirstName}
                    onChange={(e) => setEditFirstName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-sans focus:outline-hidden focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans font-medium text-slate-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editLastName}
                    onChange={(e) => setEditLastName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-sans focus:outline-hidden focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans font-medium text-slate-700 mb-1">
                    Email Address (Read-only)
                  </label>
                  <input
                    type="email"
                    disabled
                    value={user.email}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 text-sm font-sans cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans font-medium text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-sans focus:outline-hidden focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans font-medium text-slate-700 mb-1">
                  Institution / Company / Laboratory Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. BioMed Research Analytical Lab"
                  value={editInstitution}
                  onChange={(e) => setEditInstitution(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-sans focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <button
                type="submit"
                className="py-3 px-6 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-sans font-medium text-xs flex items-center gap-2 cursor-pointer shadow-sm transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile Changes</span>
              </button>
            </form>
          )}

          {/* TAB 3: SHIPPING ADDRESS */}
          {activeTab === "address" && (
            <form onSubmit={handleSaveAddress} className="space-y-6 max-w-2xl">
              <div>
                <h2 className="font-heading font-semibold text-xl text-slate-900 mb-1">
                  Default Shipping &amp; Delivery Address
                </h2>
                <p className="text-xs text-slate-500">
                  This address will automatically pre-fill your checkout details for rapid dispatch.
                </p>
              </div>

              {addressSaved && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-sans font-medium flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Default shipping address saved successfully!</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-sans font-medium text-slate-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  placeholder="123 Research Way"
                  value={addressStreet}
                  onChange={(e) => setAddressStreet(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-sans focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-medium text-slate-700 mb-1">
                  Apartment, Suite, Lab Unit (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Suite 400 / Building B"
                  value={addressApartment}
                  onChange={(e) => setAddressApartment(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-sans focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-sans font-medium text-slate-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="San Diego"
                    value={addressCity}
                    onChange={(e) => setAddressCity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-sans focus:outline-hidden focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans font-medium text-slate-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    placeholder="CA"
                    value={addressState}
                    onChange={(e) => setAddressState(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-sans focus:outline-hidden focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans font-medium text-slate-700 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    placeholder="92121"
                    value={addressZip}
                    onChange={(e) => setAddressZip(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-sans focus:outline-hidden focus:border-blue-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="py-3 px-6 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-sans font-medium text-xs flex items-center gap-2 cursor-pointer shadow-sm transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Address</span>
              </button>
            </form>
          )}

          {/* TAB 4: ORDERS */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading font-semibold text-xl text-slate-900 mb-1">
                  Order &amp; Certificate of Analysis Records
                </h2>
                <p className="text-xs text-slate-500">
                  Track domestic shipment progress, delivery timelines, and download batch HPLC/MS reports.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mx-auto mb-3">
                  <Package className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-semibold text-base text-slate-800 mb-1">
                  No orders placed yet
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-5">
                  You have not placed any research orders under this account. All future orders will display tracking and verified batch records here.
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 py-2.5 px-5 rounded-full bg-slate-900 text-white font-sans font-medium text-xs hover:bg-slate-800 transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Start First Order</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ================= UNAUTHENTICATED (LOGIN / REGISTER FORM) ================= */
        <div
          className={`w-full bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl transition-all duration-300 ${isRegister && !isForgotPassword ? "max-w-xl" : "max-w-md"
            }`}
        >
          {isForgotPassword ? (
            /* Forgot Password Flow */
            <div>
              <button
                type="button"
                onClick={() => {
                  setIsForgotPassword(false);
                  setForgotSuccess(false);
                  setErrorMsg("");
                }}
                className="inline-flex items-center gap-1.5 text-xs font-sans text-slate-500 hover:text-slate-800 mb-6 cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Sign In</span>
              </button>

              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-6 h-6" />
                </div>
                <h1 className="font-heading font-semibold text-2xl text-slate-900 mb-1">
                  Reset Password
                </h1>
                <p className="text-xs font-sans font-normal text-slate-500">
                  Enter your registered researcher email address and we will dispatch a password recovery link.
                </p>
              </div>

              {forgotSuccess ? (
                <div className="text-center space-y-4">
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-sans">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                    <p className="font-semibold mb-1">Recovery link dispatched!</p>
                    <p className="text-emerald-700">
                      If an account exists for <span className="font-semibold">{forgotEmail}</span>, instructions have been sent. Please check your inbox and spam folder.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPassword(false);
                      setForgotSuccess(false);
                    }}
                    className="w-full py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-sans font-medium text-xs transition-colors"
                  >
                    Return to Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-sans font-medium text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        placeholder="researcher@lab.org"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-sans font-normal text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-sans font-medium text-sm transition-all duration-200 active:scale-98 shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    <span>Send Recovery Link</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          ) : (
            /* Standard Login / Register Toggle */
            <div>
              <div className="text-center mb-6">
                <h1 className="font-heading font-semibold text-2xl text-slate-900 mb-1">
                  {isRegister ? "Create Researcher Account" : "Researcher Login"}
                </h1>
                <p className="text-xs font-sans font-normal text-slate-500">
                  {isRegister
                    ? "Register for verified batch COA reports, priority dispatch, and laboratory pricing."
                    : "Access your order history, saved addresses, and batch COA records."
                  }
                </p>
              </div>

              {/* Toggle tabs */}
              <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl mb-6 text-xs font-sans font-medium">
                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(false);
                    setErrorMsg("");
                  }}
                  className={`py-2 rounded-lg transition-all cursor-pointer ${!isRegister ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
                    }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(true);
                    setErrorMsg("");
                  }}
                  className={`py-2 rounded-lg transition-all cursor-pointer ${isRegister ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
                    }`}
                >
                  Register
                </button>
              </div>

              {errorMsg && (
                <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-sans font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {!isRegister ? (
                /* LOGIN FORM */
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-sans font-medium text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        placeholder="researcher@lab.org"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-sans font-normal text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-sans font-medium text-slate-700">
                        Password *
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setIsForgotPassword(true);
                          setForgotEmail(loginEmail);
                          setForgotSuccess(false);
                        }}
                        className="text-xs font-sans text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type={showLoginPassword ? "text" : "password"}
                        required
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm font-sans font-normal text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                      >
                        {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
                      />
                      <span className="text-xs font-sans text-slate-600">Remember me</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-sans font-medium text-sm transition-all duration-200 active:scale-98 shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                /* REGISTRATION FORM */
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-sans font-medium text-slate-700 mb-1">
                        First Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          placeholder="John"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-sans font-normal text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-sans font-medium text-slate-700 mb-1">
                        Last Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          placeholder="Doe"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-sans font-normal text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-sans font-medium text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="tel"
                          required
                          placeholder="+1 (555) 000-0000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-sans font-normal text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-sans font-medium text-slate-700">
                          Lab / Institution
                        </label>
                        <span className="text-[10px] text-slate-400 font-sans">Optional</span>
                      </div>
                      <div className="relative">
                        <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="BioMed Research Labs"
                          value={institution}
                          onChange={(e) => setInstitution(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-sans font-normal text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-sans font-medium text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        placeholder="researcher@lab.org"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-sans font-normal text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-sans font-medium text-slate-700 mb-1">
                        Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type={showRegisterPassword ? "text" : "password"}
                          required
                          placeholder="••••••••"
                          value={registerPassword}
                          onChange={(e) => setRegisterPassword(e.target.value)}
                          className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm font-sans font-normal text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                        >
                          {showRegisterPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-sans font-medium text-slate-700 mb-1">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          required
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={`w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm font-sans font-normal text-slate-900 placeholder:text-slate-400 focus:outline-hidden transition-colors ${confirmPassword && registerPassword !== confirmPassword
                              ? "border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                              : "border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                            }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-2 border-t border-slate-100">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={researchAgreed}
                        onChange={(e) => setResearchAgreed(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer shrink-0"
                      />
                      <span className="text-[11px] sm:text-xs font-sans text-slate-600 leading-snug">
                        <strong className="text-slate-800">Age &amp; Research Verification:</strong> I certify that I am at least 21 years of age and acknowledge that all compounds are strictly intended for laboratory research purposes only (see{" "}
                        <Link
                          href="/disclaimer"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-blue-600 hover:text-blue-700 underline font-medium inline-flex items-center gap-0.5"
                        >
                          <span>Research Disclaimer</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </Link>
                        ). *
                      </span>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={termsAgreed}
                        onChange={(e) => setTermsAgreed(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer shrink-0"
                      />
                      <span className="text-[11px] sm:text-xs font-sans text-slate-600 leading-snug">
                        I agree to the{" "}
                        <Link
                          href="/terms-conditions"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-blue-600 hover:text-blue-700 underline font-medium inline-flex items-center gap-0.5"
                        >
                          <span>Terms of Service</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/privacy-policy"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-blue-600 hover:text-blue-700 underline font-medium inline-flex items-center gap-0.5"
                        >
                          <span>Privacy Policy</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </Link>
                        . *
                      </span>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newsletterSubscribed}
                        onChange={(e) => setNewsletterSubscribed(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer shrink-0"
                      />
                      <span className="text-[11px] sm:text-xs font-sans text-slate-600 leading-snug">
                        Notify me regarding new batch 3rd-party HPLC/MS COA releases, purity updates, and research alerts.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-sans font-medium text-sm transition-all duration-200 active:scale-98 shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    <span>Create Researcher Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function MyAccountPage() {
  return (
    <Suspense fallback={
      <div className="py-20 min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <MyAccountContent />
    </Suspense>
  );
}
