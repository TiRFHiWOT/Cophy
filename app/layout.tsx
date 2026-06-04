import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { UIProvider } from "@/context/UIContext";
import { AuthProvider } from "@/context/AuthContext";

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
    default: "Hendi Coffee | Premium Ethiopian Specialty Coffee",
    template: "%s | Hendi Coffee",
  },
  description:
    "Premium B2B Ethiopian Speciality Coffee Export Portal. Technical specifications, transparent logistics, and SCA-scored lots direct from origin.",
  keywords: [
    "Ethiopian coffee export",
    "specialty coffee wholesale",
    "green coffee beans",
    "B2B coffee exchange",
    "Hendi Coffee",
    "SCA scored coffee",
    "direct trade Ethiopia",
  ],
  authors: [{ name: "Hendi Coffee" }],
  creator: "Hendi Coffee",
  publisher: "Hendi Coffee",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hendicoffee.com",
    siteName: "Hendi Coffee",
    title: "Hendi Coffee | Premium Ethiopian Specialty Coffee",
    description:
      "Premium B2B Ethiopian Speciality Coffee Export Portal. Access technical lot data and request samples directly from origin.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hendi Coffee | Premium Ethiopian Specialty Coffee",
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
              {children}
            </AuthProvider>
          </UIProvider>
        </CartProvider>
      </body>
    </html>
  );
}
