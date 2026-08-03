import type { Metadata } from "next";
import { IM_Fell_English } from "next/font/google";
import "./globals.css";

const imFellEnglish = IM_Fell_English({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-fell-local",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hassan Shirazi",
  description: "Portfolio site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${imFellEnglish.variable} h-full`}>
      <body className="min-h-full flex flex-col font-fell">{children}</body>
    </html>
  );
}
