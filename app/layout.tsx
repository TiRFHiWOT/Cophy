import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { UIProvider } from "@/context/UIContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-cursive",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Cophy - Premium Specialty Coffee",
    template: "%s | Cophy",
  },
  description:
    "Quality. Transparency. Sustainability. Discover exceptional Panamanian coffees and specialty selections. Cophy brings you the finest specialty coffee from farm to cup.",
  keywords: [
    "specialty coffee",
    "premium coffee",
    "Panamanian coffee",
    "coffee beans",
    "artisan coffee",
    "Cophy",
  ],
  authors: [{ name: "Cophy" }],
  creator: "Cophy",
  publisher: "Cophy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cophy.com",
    siteName: "Cophy",
    title: "Cophy - Premium Specialty Coffee",
    description:
      "Quality. Transparency. Sustainability. Discover exceptional Panamanian coffees and specialty selections.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cophy - Premium Specialty Coffee",
    description:
      "Quality. Transparency. Sustainability. Discover exceptional Panamanian coffees and specialty selections.",
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
        className={`${inter.variable} ${dancingScript.variable} font-sans antialiased`}
      >
        <CartProvider>
          <UIProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1 pt-[calc(var(--topbar-height,36px)+var(--header-height,64px))] md:pt-[calc(var(--topbar-height,36px)+var(--header-height-md,112px))]">
                {children}
              </main>
              <Footer />
            </div>
          </UIProvider>
        </CartProvider>
      </body>
    </html>
  );
}
