import "./globals.css";
import "./professional-polish.css";
import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-manrope",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Vinith Busipalli | Engineer · Designer · Creator",
  description: "Vinith Busipalli Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${dmSans.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}