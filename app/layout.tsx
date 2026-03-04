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
import PaletteSync from "@/components/ui/PaletteSync";
import { TransitionProvider } from "@/components/ui/TransitionProvider";
import { MainLayout } from "@/components/layout/MainLayout";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import TargetCursor from "@/components/ui/TargetCursor";

import { cookies } from 'next/headers';
import { palettes, defaultPalette } from '@/constants/palettes';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // read palette id from cookie on server
  const cookieStore = cookies();
  const paletteId = cookieStore.get('app-palette')?.value || defaultPalette.id;
  const palette = palettes.find(p => p.id === paletteId) ?? defaultPalette;

  return (
    <html lang="en" style={{ '--tint': palette.tint } as React.CSSProperties}>
      <body
        className={`${bricolage.variable} ${workSans.variable} antialiased`}
        suppressHydrationWarning
      >
        <PaletteProvider>
          <PaletteSync />
          <TransitionProvider>
            <SmoothScrollProvider>
              <TargetCursor 
                  spinDuration={0}
                  hideDefaultCursor
                  parallaxOn
                  hoverDuration={0.2}
                />
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
