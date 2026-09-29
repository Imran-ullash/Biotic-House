"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import SubpageHero from "@/components/SubpageHero";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;

    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
    } catch (err) {
      console.error("Failed to submit contact form:", err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-slate-50/50 min-h-screen">
      {/* Amino Club Style Hero Section */}
      <SubpageHero
        badgeText="Typically respond within 24 hours"
        title="How can we help?"
        subtitle="Our research support team is here to assist with orders, product questions, order support, and more."
        ctaText="Email Us"
        ctaHref="#contact-form"
        ctaIcon={<Mail className="w-4 h-4" />}
        vials={{
          leftOuter: "/images/vials/tb-500.png",
          leftInner: "/images/vials/bac-water.png",
          rightInner: "/images/vials/bpc-157.png",
          rightOuter: "/images/vials/cartalax.png",
        }}
      />

      {/* Main Content & Contact Form */}
      <div id="contact-form" className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Info cards */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center mb-3">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-semibold text-base text-slate-900">Email Inquiry</h3>
              <p className="text-xs text-slate-500 mt-1 font-sans font-normal">support@biotichouse.com</p>
              <p className="text-[11px] text-slate-400 mt-0.5 font-sans font-normal">Response within 24 business hours</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-semibold text-base text-slate-900">Fulfillment Hub</h3>
              <p className="text-xs text-slate-500 mt-1 font-sans font-normal">United States Domestic Facility</p>
              <p className="text-[11px] text-slate-400 mt-0.5 font-sans font-normal">Fast nationwide 24–48h delivery</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#faf9f5] border border-slate-200/70">
              <h4 className="font-heading font-semibold text-sm text-slate-900 mb-1">Laboratory Note</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans font-normal">
                For order-specific inquiries, please include your order reference number (#BH-XXXXX) for accelerated routing.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm">
            {submitted ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-semibold text-2xl text-slate-900 mb-2">Message Received</h3>
                <p className="text-sm text-slate-600 max-w-sm mx-auto font-sans font-normal leading-relaxed">
                  Thank you for reaching out. A Biotic House scientific support representative will review your inquiry and respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-sans font-medium text-slate-700 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Dr. John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-sans font-normal focus:outline-hidden focus:border-[#0066FF] focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-sans font-medium text-slate-700 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="researcher@lab.org"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-sans font-normal focus:outline-hidden focus:border-[#0066FF] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-sans font-medium text-slate-700 mb-1.5">
                    Subject / Order Reference *
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Batch COA / Order Tracking Inquiry"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-sans font-normal focus:outline-hidden focus:border-[#0066FF] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-sans font-medium text-slate-700 mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide detailed information regarding your scientific questions or order inquiry..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-sans font-normal focus:outline-hidden focus:border-[#0066FF] focus:bg-white transition-all"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 bg-[#0066FF] hover:bg-[#0052cc] text-white font-sans font-medium text-sm sm:text-base px-8 py-3.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 cursor-pointer disabled:opacity-70"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? "Sending..." : "Send Inquiry"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
