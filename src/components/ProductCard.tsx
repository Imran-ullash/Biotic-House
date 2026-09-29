"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const hasDiscount = product.regularPrice > product.price;

  const [imgSrc, setImgSrc] = React.useState(product.image || "/images/vials/placeholder-vial.png");

  return (
    <div className="group relative rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Top Image Area */}
      <div className="relative pt-6 px-4 pb-4 bg-[#fbfbfa]/60 flex items-center justify-center min-h-[220px] sm:min-h-[250px] overflow-hidden">
        {/* +99% Purity Blue Pill Badge (Poppins 500) */}
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-block bg-[#0066FF] text-white text-[10px] sm:text-[11px] font-sans font-medium px-2.5 py-0.5 rounded-full shadow-xs tracking-wider uppercase">
            {product.purity || "+99% Purity"}
          </span>
        </div>

        {/* Product Vial Image */}
        <Link
          href={`/product/${product.slug}`}
          className="relative w-full h-44 sm:h-52 flex items-center justify-center cursor-pointer"
        >
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300 filter drop-shadow-sm"
            onError={() => setImgSrc("/images/vials/placeholder-vial.png")}
          />
        </Link>
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Title & Price Row */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <Link
              href={`/product/${product.slug}`}
              className="font-sans font-medium text-sm sm:text-base text-slate-900 group-hover:text-[#0066FF] transition-colors leading-snug line-clamp-1"
            >
              {product.name} {product.dosage[0] ? `(${product.dosage[0]})` : ""}
            </Link>

            <div className="text-right flex-shrink-0">
              {hasDiscount ? (
                <div className="flex items-center gap-1.5 justify-end">
                  <span className="text-xs text-slate-400 line-through font-sans font-normal">
                    ${product.regularPrice.toFixed(2)}
                  </span>
                  <span className="text-sm sm:text-base font-sans font-semibold text-slate-900">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-sm sm:text-base font-sans font-semibold text-slate-900">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <div className="text-[11px] text-slate-500 font-sans font-normal mb-4">
            Research Grade &middot; In Stock
          </div>
        </div>

        {/* Solid Blue Button (Poppins 500) */}
        <button
          onClick={() => addToCart(product, 1, product.dosage[0])}
          className="w-full py-2.5 px-4 rounded-xl bg-[#0066FF] hover:bg-[#0052cc] text-white font-sans font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-98 shadow-xs hover:shadow-md cursor-pointer"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
