import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { UIProvider } from "@/context/UIContext";
import { AuthProvider } from "@/context/AuthContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Lot 251 — Global Coffee Commodity Exchange",
    template: "%s | Lot 251 Exchange",
  },
  description:
    "Premium B2B Ethiopian Speciality Coffee Export Portal. Technical specifications, transparent logistics, and SCA-scored lots direct from origin.",
  keywords: [
    "Ethiopian coffee export",
    "specialty coffee wholesale",
    "green coffee beans",
    "B2B coffee exchange",
    "Lot 251",
    "SCA scored coffee",
    "direct trade Ethiopia",
  ],
  authors: [{ name: "Lot 251 Logistics" }],
  creator: "Lot 251",
  publisher: "Lot 251",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lot251.com",
    siteName: "Lot 251 Exchange",
    title: "Lot 251 — Global Coffee Commodity Exchange",
    description:
      "Premium B2B Ethiopian Speciality Coffee Export Portal. Access technical lot data and request samples directly from origin.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lot 251 — Global Coffee Commodity Exchange",
    description:
      "Premium B2B Ethiopian Speciality Coffee Export Portal. Access technical lot data and request samples.",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <CartProvider>
          <UIProvider>
            <AuthProvider>
              <ScrollToTop />
              <div className="flex min-h-screen flex-col bg-lot-paper">
                <Header />
                <main className="flex-1 pt-[calc(var(--topbar-height,36px)+var(--header-height,64px))] md:pt-[calc(var(--topbar-height,36px)+var(--header-height-md,112px))]">
                  {children}
                </main>
                <Footer />
              </div>
            </AuthProvider>
          </UIProvider>
        </CartProvider>
      </body>
    </html>
  );
}
