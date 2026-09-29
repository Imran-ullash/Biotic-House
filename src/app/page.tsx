import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import BuiltOnPrecision from "@/components/BuiltOnPrecision";
import ProductCard from "@/components/ProductCard";
import MidPageCallout from "@/components/MidPageCallout";
import WhyBioticHouse from "@/components/WhyBioticHouse";
import WhyChooseUs from "@/components/WhyChooseUs";
import FAQ from "@/components/FAQ";
import CommunitySection from "@/components/CommunitySection";
import { PRODUCTS } from "@/data/products";

export default function HomePage() {
  // Show first 8 featured products on homepage grid, or all 13
  const featuredProducts = PRODUCTS;

  return (
    <div className="bg-white">
      {/* 1. Hero Section with 3D Floating Vials */}
      <Hero />

      {/* 2. Built On Precision And Reliability (Split section with angled vial) */}
      <BuiltOnPrecision />

      {/* 3. Our Products Grid (4-column layout matching live site) */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <h2 className="font-heading font-semibold text-2xl sm:text-3xl lg:text-[38px] text-slate-950 tracking-tight leading-tight">
              Our Products
            </h2>
            <p className="text-[15px] sm:text-base font-sans font-normal text-slate-500 mt-2.5 leading-relaxed">
              Explore our collection of high-purity peptides for laboratory research.
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#0066FF] hover:bg-[#0052cc] text-white font-sans font-medium text-xs sm:text-sm px-8 py-3.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer active:scale-95"
            >
              <span>View All 13 Research Peptides</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Mid-Page Callout Banner */}
      <MidPageCallout />

      {/* 5. Why Biotic House (Split section with tilted Bac Water vial) */}
      <WhyBioticHouse />

      {/* 6. Why Choose Us? (6-card grid with dark icons) */}
      <WhyChooseUs />

      {/* 7. Frequently Asked Questions (Accordion) */}
      <FAQ />

      {/* 8. Community Section & Newsletter Signup */}
      <CommunitySection />
    </div>
  );
}
