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
    default: "Cophy - Direct Trade Coffee Export Portal",
    template: "%s | Cophy Export",
  },
  description:
    "Premium B2B Speciality Coffee Export Portal. Discover high-quality direct-trade offers with full lot specifications including SCA Score, Moisture and Altitude.",
  keywords: [
    "specialty coffee wholesale",
    "direct trade coffee",
    "B2B coffee export",
    "coffee bean logistics",
    "Cophy B2B",
  ],
  authors: [{ name: "Cophy Logistics" }],
  creator: "Cophy",
  publisher: "Cophy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cophy.com",
    siteName: "Cophy Export Portal",
    title: "Cophy - Direct Trade Coffee Export Portal",
    description:
      "Premium B2B Speciality Coffee Export Portal. Discover high-quality direct-trade offers with full lot specifications.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cophy - Direct Trade Coffee Export Portal",
    description:
      "Premium B2B Speciality Coffee Export Portal. Discover high-quality direct-trade offers with full lot specifications.",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
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
              <div className="flex min-h-screen flex-col bg-[hsl(var(--background))]">
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
