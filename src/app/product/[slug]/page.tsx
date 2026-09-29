"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Star,
  Truck,
  FileCheck,
  MapPin,
  Plus,
  Minus,
  ShoppingBag,
  ShieldAlert,
  X,
  Download,
  CheckCircle2,
} from "lucide-react";
import { PRODUCTS, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const product = PRODUCTS.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const { addToCart } = useCart();
  const [selectedDosage, setSelectedDosage] = useState(product.dosage[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [isCoaOpen, setIsCoaOpen] = useState(false);
  const [productImg, setProductImg] = useState(product.image || "/images/vials/placeholder-vial.png");

  const hasDiscount = product.regularPrice > product.price;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedDosage);
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="py-10 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-blue-600 transition-colors">
            Products
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">{product.name}</span>
        </div>

        {/* Product Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 pb-16 border-b border-slate-100">
          {/* Left: Product Image */}
          <div className="relative rounded-3xl bg-slate-50/70 border border-slate-200/80 p-8 sm:p-12 flex items-center justify-center min-h-[360px] sm:min-h-[460px] overflow-hidden">
            {/* 99% Purity Badge */}
            <div className="absolute top-4 right-4 z-10">
              <span className="inline-block bg-[#0066FF] text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                {product.purity}
              </span>
            </div>

            <div className="relative w-full h-72 sm:h-96 flex items-center justify-center">
              <Image
                src={productImg}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-2 hover:scale-105 transition-transform duration-300"
                onError={() => setProductImg("/images/vials/placeholder-vial.png")}
              />
            </div>
          </div>

          {/* Right: Product Meta & Purchase Panel */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              {/* Product Title (Anek Telugu 600) */}
              <h1 className="font-heading font-semibold text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight mb-2">
                {product.name}
              </h1>

              {/* Rating Row (Poppins 500) */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-sans font-medium text-slate-700">
                  5.0 ({product.ratingCount} Reviews)
                </span>
              </div>

              {/* Pricing Display (Poppins 600, Poppins 400 for regular price) */}
              <div className="flex items-baseline gap-3 mb-6">
                {hasDiscount ? (
                  <>
                    <span className="text-lg sm:text-xl text-slate-400 line-through font-sans font-normal">
                      ${product.regularPrice.toFixed(2)}
                    </span>
                    <span className="text-3xl sm:text-4xl font-sans font-semibold text-slate-900 tracking-tight">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-sans font-medium px-2.5 py-1 rounded-full">
                      Save ${(product.regularPrice - product.price).toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl sm:text-4xl font-sans font-semibold text-slate-900 tracking-tight">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Stock Status & COA button */}
              <div className="flex items-center gap-4 py-3 border-y border-slate-100 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs sm:text-sm font-sans font-medium text-slate-800">
                    {product.stockQuantity} in stock
                  </span>
                </div>

                {product.coaUrl && (
                  <button
                    type="button"
                    onClick={() => setIsCoaOpen(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0066FF] bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>View Batch COA</span>
                  </button>
                )}
              </div>

              {/* Dosage Selector Buttons */}
              {product.dosage.length > 0 && (
                <div className="mb-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Select Dosage / Format:
                  </label>
                  <div className="flex items-center gap-2">
                    {product.dosage.map((dose) => (
                      <button
                        key={dose}
                        onClick={() => setSelectedDosage(dose)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          selectedDosage === dose
                            ? "bg-slate-900 text-white shadow-xs scale-102"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                        }`}
                      >
                        {dose}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Add to Cart */}
              <div className="flex items-center gap-3.5 mb-8">
                {/* Quantity */}
                <div className="inline-flex items-center border border-slate-300 rounded-xl bg-slate-50 p-1">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-slate-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#0066FF] hover:bg-[#0052cc] text-white font-extrabold text-sm py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-98 shadow-md hover:shadow-lg cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              </div>

              {/* 3 Key Trust Badges */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/70 text-center">
                <div className="flex flex-col items-center">
                  <Truck className="w-5 h-5 text-blue-600 mb-1" />
                  <span className="text-[11px] font-bold text-slate-800">FAST Shipping</span>
                  <span className="text-[10px] text-slate-400">Within 24h</span>
                </div>
                <div className="flex flex-col items-center border-x border-slate-200">
                  <FileCheck className="w-5 h-5 text-blue-600 mb-1" />
                  <span className="text-[11px] font-bold text-slate-800">99%+ Purity</span>
                  <span className="text-[10px] text-slate-400">HPLC Tested</span>
                </div>
                <div className="flex flex-col items-center">
                  <MapPin className="w-5 h-5 text-blue-600 mb-1" />
                  <span className="text-[11px] font-bold text-slate-800">Ships from USA</span>
                  <span className="text-[10px] text-slate-400">Domestic Hub</span>
                </div>
              </div>
            </div>

            {/* Research Notice */}
            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-start gap-2.5 text-xs text-amber-900">
              <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Research Note:</strong> Supplied in sterile lyophilized format. Strictly for laboratory experimentation and in-vitro research use only. Not for human consumption.
              </span>
            </div>
          </div>
        </div>

        {/* Product Description & Experimental Data */}
        <div className="py-12 border-b border-slate-100 max-w-4xl">
          <h2 className="font-heading font-semibold text-xl sm:text-2xl text-slate-900 mb-4">
            Product Description &amp; Experimental Data
          </h2>
          <div className="prose prose-slate max-w-none text-sm font-sans font-normal text-slate-600 leading-relaxed whitespace-pre-line">
            {product.description}
          </div>
        </div>

        {/* Related Products Section */}
        <div className="py-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-heading font-semibold text-xl sm:text-2xl text-slate-900">
              Frequently Researched Together
            </h3>
            <Link
              href="/shop"
              className="text-xs sm:text-sm font-sans font-medium text-blue-600 hover:underline"
            >
              View All Products
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      {/* COA MODAL POPUP */}
      {isCoaOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-[10px] font-sans font-medium px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified &gt;99% Purity
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    Lot: #BH-2026-{product.id}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-xl sm:text-2xl text-slate-900">
                  Certificate of Analysis (COA)
                </h3>
                <p className="text-xs text-slate-500">
                  Analytical Batch Report for <strong>{product.name}</strong>
                </p>
              </div>

              <button
                onClick={() => setIsCoaOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Report Display */}
            <div className="overflow-y-auto py-5 space-y-5 flex-1 pr-1">
              {/* Specification Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
                <div>
                  <div className="text-[10px] uppercase font-sans font-medium text-slate-400">Purity</div>
                  <div className="text-xs sm:text-sm font-sans font-semibold text-emerald-600">
                    99.4% (HPLC)
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-sans font-medium text-slate-400">Identity</div>
                  <div className="text-xs sm:text-sm font-sans font-semibold text-slate-800">
                    Verified (MS)
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-sans font-medium text-slate-400">Appearance</div>
                  <div className="text-xs sm:text-sm font-sans font-semibold text-slate-800">
                    Lyophilized
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-sans font-medium text-slate-400">Solubility</div>
                  <div className="text-xs sm:text-sm font-sans font-semibold text-slate-800">
                    Clear Aqueous
                  </div>
                </div>
              </div>

              {/* COA Document Preview */}
              <div className="relative w-full h-[360px] sm:h-[440px] rounded-2xl border border-slate-200 bg-slate-100 flex items-center justify-center overflow-hidden">
                <Image
                  src={product.coaUrl || "/images/products/BPC-157.png"}
                  alt={`COA Analytical Chromatogram for ${product.name}`}
                  fill
                  className="object-contain p-2"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                Independent Third-Party High-Performance Liquid Chromatography
              </span>
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() => setIsCoaOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Close
                </button>
                <a
                  href={product.coaUrl || "/images/products/BPC-157.png"}
                  download={`${product.slug}-coa-report.png`}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#0066FF] hover:bg-[#0052cc] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Report</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
