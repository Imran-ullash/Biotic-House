import type { Metadata } from "next";
import { Anek_Telugu, Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import PromoOfferBar from "@/components/PromoOfferBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SideCartDrawer from "@/components/SideCartDrawer";
import FloatingCartPill from "@/components/FloatingCartPill";
import AgeVerificationModal from "@/components/AgeVerificationModal";
import DiscountOfferModal from "@/components/DiscountOfferModal";

const anekTelugu = Anek_Telugu({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-anek",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Biotic House | Research Peptides 99%+ Purity",
  description:
    "Shop high-quality research peptides with 99%+ purity at Biotic House. Independently verified compounds, batch testing, COAs, and reliable US shipping.",
  keywords: [
    "research peptides",
    "buy peptides",
    "BPC-157",
    "NAD+",
    "GHK-Cu",
    "Bacteriostatic Water",
    "peptide purity",
    "COA",
  ],
  openGraph: {
    title: "Biotic House | Research Peptides 99%+ Purity",
    description:
      "Shop high-quality research peptides with 99%+ purity at Biotic House. Independently verified compounds, batch testing, COAs, and reliable US shipping.",
    url: "https://biotichouse.com",
    siteName: "Biotic House",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Biotic House | Research Peptides 99%+ Purity",
    description:
      "Shop high-quality research peptides with 99%+ purity at Biotic House. Independently verified compounds, batch testing, COAs, and reliable US shipping.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anekTelugu.variable} ${poppins.variable}`}
    >
      <body className="font-sans antialiased text-slate-800 bg-white min-h-screen flex flex-col">
        <AuthProvider>
          <CartProvider>
            <AgeVerificationModal />
            <DiscountOfferModal />
            <PromoOfferBar />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <SideCartDrawer />
            <FloatingCartPill />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
