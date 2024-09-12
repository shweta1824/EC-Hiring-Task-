import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { StickyHeader } from "@/components/sticky-header";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Engineer's Cradle",
  description: "Frontend Intern Task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-[100vh]`}
      >
        <StickyHeader />
        {children}
        <Toaster position="bottom-right" />
        <Footer />
      </body>
    </html>
  );
}
