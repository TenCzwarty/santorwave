import local from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const msSansSerif = local({
  variable: "--ms-sans-serif",
  src: [
    {
      path: "../../../public/fonts/ms_sans_serif.woff2",
      weight: "500",
    },
    {
      path: "../../../public/fonts/ms_sans_serif_bold.woff2",
      weight: "600",
    },
  ],
});

export const fontClasses = `${geistSans.variable} ${geistMono.variable} ${msSansSerif.variable} antialiased}`;
