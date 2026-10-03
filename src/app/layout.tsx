import type { Metadata } from "next";
import { IM_Fell_English } from "next/font/google";
import { site } from "@/lib/site";
import { about } from "@/lib/about";
import "./globals.css";

const imFellEnglish = IM_Fell_English({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-fell-local",
  display: "swap",
});

const title = `${site.name} | ${site.jobTitle}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [site.name, site.jobTitle, "portfolio", "web developer", ...about.skills],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
    locale: site.locale,
  },
  twitter: { card: "summary_large_image", title, description: site.description },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
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
