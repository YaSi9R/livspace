import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Livspace | Beautiful Home Interiors, Modular Kitchens & Renovations",
  description: "Get premium end-to-end home interiors with a flat 10-year warranty, 146 quality checks, and 45-day delivery. Explore modular kitchens, wardrobes, and living designs.",
  keywords: ["home interiors", "interior design", "modular kitchen", "wardrobe designs", "living room decor", "renovations", "livspace"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#fdfdfd] text-[#111111]">
        {children}
      </body>
    </html>
  );
}

