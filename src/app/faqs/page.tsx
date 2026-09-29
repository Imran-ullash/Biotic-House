"use client";

import React, { useState } from "react";
import SubpageHero from "@/components/SubpageHero";
import FAQ from "@/components/FAQ";
import { HelpCircle, Search } from "lucide-react";

export default function FAQsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Amino Club Style Hero Section */}
      <SubpageHero
        badgeText="24/7 Verified Research Knowledgebase"
        title="How can we help?"
        subtitle="Explore detailed answers regarding HPLC batch testing, shipping protocols, cold-chain storage, and research compound specifications."
        ctaText="Explore Questions"
        ctaHref="#faq-list"
        ctaIcon={<HelpCircle className="w-4 h-4" />}
        vials={{
          leftOuter: "/images/vials/tb-500.png",
          leftInner: "/images/vials/bac-water.png",
          rightInner: "/images/vials/bpc-157.png",
          rightOuter: "/images/vials/cartalax.png",
        }}
      />

      {/* FAQ Accordion Section */}
      <div id="faq-list" className="scroll-mt-10 py-12">
        <FAQ />
      </div>
    </div>
  );
}
