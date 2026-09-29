"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, PRODUCTS, UPSELL_PRODUCT, FREE_SHIPPING_THRESHOLD, PROMO_COUPON_CODE, PROMO_DISCOUNT_PERCENT } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedDosage?: string;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  appliedCoupon: string | null;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: Product, quantity?: number, selectedDosage?: string) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  subtotal: number;
  discount: number;
  total: number;
  cartCount: number;
  freeShippingRemaining: number;
  freeShippingProgress: number;
  upsellProduct: Product;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("bh_cart_items");
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      const savedCoupon = localStorage.getItem("bh_cart_coupon");
      if (savedCoupon) {
        setAppliedCoupon(savedCoupon);
      }
    } catch {
      // fallback
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("bh_cart_items", JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      if (appliedCoupon) {
        localStorage.setItem("bh_cart_coupon", appliedCoupon);
      } else {
        localStorage.removeItem("bh_cart_coupon");
      }
    } catch {
      // ignore
    }
  }, [appliedCoupon, isLoaded]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addToCart = (product: Product, quantity: number = 1, selectedDosage?: string) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.product.id === product.id && item.selectedDosage === selectedDosage
      );

      if (existingIndex > -1) {
        const nextItems = [...prevItems];
        nextItems[existingIndex].quantity += quantity;
        return nextItems;
      } else {
        return [...prevItems, { product, quantity, selectedDosage }];
      }
    });
    setIsOpen(true);
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId: number) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const applyCoupon = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === PROMO_COUPON_CODE) {
      setAppliedCoupon(PROMO_COUPON_CODE);
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discount = appliedCoupon ? (subtotal * PROMO_DISCOUNT_PERCENT) / 100 : 0;
  const total = Math.max(0, subtotal - discount);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        appliedCoupon,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        applyCoupon,
        removeCoupon,
        subtotal,
        discount,
        total,
        cartCount,
        freeShippingRemaining,
        freeShippingProgress,
        upsellProduct: UPSELL_PRODUCT,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
