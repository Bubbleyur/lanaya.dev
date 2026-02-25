import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque, Work_Sans } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-work",
});

export const metadata: Metadata = {
  title: "Lann.",
  description: "Alan Wijaya's Portofolio",
};

import { PaletteProvider } from "@/context/PaletteContext";
import { TransitionProvider } from "@/components/ui/TransitionProvider";
import { MainLayout } from "@/components/layout/MainLayout";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bricolage.variable} ${workSans.variable} antialiased`}
        suppressHydrationWarning
      >
        <PaletteProvider>
          <TransitionProvider>
            <SmoothScrollProvider>
              <MainLayout>
                {children}
              </MainLayout>
            </SmoothScrollProvider>
          </TransitionProvider>
        </PaletteProvider>
      </body>
    </html>
  );
}
