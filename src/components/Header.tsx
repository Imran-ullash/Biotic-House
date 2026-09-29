"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  ShoppingCart, 
  Menu, 
  X, 
  User, 
  ChevronDown, 
  LayoutDashboard, 
  Settings, 
  LogOut 
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const pathname = usePathname();
  const { openCart, cartCount, total } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/shop" },
    { name: "FAQs", href: "/faqs" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "Affiliates", href: "/affiliates" },
  ];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
          {/* Mobile: Hamburger Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 text-slate-800 hover:text-blue-600 focus:outline-hidden cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-9 h-11 sm:w-10 sm:h-12 flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Biotic House Logo"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-semibold tracking-wider text-lg sm:text-xl text-slate-900 group-hover:text-blue-600 transition-colors uppercase">
                  BIOTIC HOUSE
                </span>
                <span className="text-[9px] tracking-wider font-sans font-medium text-slate-500 uppercase -mt-1">
                  RESEARCH PEPTIDES
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links (Poppins 500) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-sans font-medium transition-all duration-150 ${
                    isActive
                      ? "text-blue-600 bg-blue-50/80"
                      : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Area: Login / User Profile & Cart */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Dynamic User Profile or Login Link */}
            {isAuthenticated && user ? (
              <div className="relative hidden sm:block" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 text-xs font-sans font-medium text-slate-800 hover:text-blue-600 transition-colors pl-1.5 pr-2.5 py-1 rounded-full hover:bg-slate-50 border border-slate-200 cursor-pointer shadow-2xs"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[11px]">
                    {user.firstName ? user.firstName[0].toUpperCase() : "U"}
                  </div>
                  <span className="max-w-[100px] truncate">{user.firstName}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Profile Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-900 truncate">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-[11px] text-slate-500 font-normal truncate">
                        {user.email}
                      </p>
                      {user.institution && (
                        <p className="text-[10px] text-blue-600 font-medium truncate mt-0.5">
                          {user.institution}
                        </p>
                      )}
                    </div>

                    <div className="py-1 text-xs font-sans">
                      <Link
                        href="/my-account"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-slate-400" />
                        <span>Researcher Dashboard</span>
                      </Link>
                      <Link
                        href="/my-account?tab=profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                      >
                        <Settings className="w-4 h-4 text-slate-400" />
                        <span>Edit Profile &amp; Address</span>
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 pt-1 mt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-sans text-rose-600 hover:bg-rose-50 text-left cursor-pointer transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/my-account"
                className="hidden sm:flex items-center gap-1.5 text-xs font-sans font-medium text-slate-700 hover:text-blue-600 transition-colors px-2 py-1.5 rounded-md hover:bg-slate-50"
              >
                <User className="w-4 h-4 text-slate-500" />
                <span>Login / Register</span>
              </Link>
            )}

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md cursor-pointer group"
              aria-label="View Shopping Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:scale-105 transition-transform" />
                <span className="absolute -top-2 -right-2 bg-emerald-500 text-white font-sans font-semibold text-[10px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-slate-900">
                  {cartCount}
                </span>
              </div>
              <span className="font-sans font-medium text-xs sm:text-sm tracking-tight text-white">
                ${total.toFixed(2)}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-In Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl p-6 flex flex-col justify-between z-10 animate-in slide-in-from-left duration-300">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2.5">
                  <div className="relative w-8 h-10">
                    <Image
                      src="/images/logo.png"
                      alt="Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-heading font-semibold text-slate-900 tracking-wider text-base">BIOTIC HOUSE</span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation list (Poppins 500) */}
              <div className="py-6 flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-3 rounded-xl text-base font-sans font-medium transition-all ${
                        isActive
                          ? "bg-blue-50 text-blue-600"
                          : "text-slate-800 hover:bg-slate-50"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Bottom Account Action: Dynamic Mobile State */}
            <div className="pt-6 border-t border-slate-100">
              {isAuthenticated && user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {user.firstName[0].toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-slate-900 truncate">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    </div>
                  </div>

                  <Link
                    href="/my-account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-slate-900 text-white font-sans font-medium text-xs hover:bg-slate-800 transition-colors"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>My Dashboard</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="w-full text-center text-xs text-rose-600 hover:underline cursor-pointer py-1 font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/my-account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-slate-900 text-white font-sans font-medium text-sm hover:bg-slate-800 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>My Account / Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
