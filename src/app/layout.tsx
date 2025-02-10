export { metadata } from "@/app/_helpers/metadata";
import { fontClasses } from "@/app/_helpers/font";

import { Win95ThemeProvider } from "@/components/win-95/provider";
import { AudioVisualizer } from "@/components/audio-visualizer";
import { Header } from "@/app/_components/header";
import { Footer } from "@/app/_components/footer";

import "@/styles/globals.css";
import { Suspense } from "react";
// import { Hourglass } from "react95";

export default function RootLayout({ children }: Children) {
  return (
    <html lang="en" className={fontClasses}>
      <body className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 font-ms-sans-serif text-white">
        <Win95ThemeProvider>
          <Header />
          {children}
          <Footer />
          <Suspense
            fallback={
              <div>loading...</div>
              // <Hourglass
              //   size={32}
              //   style={{ margin: 20, position: "absolute" }}
              // />
            }
          >
            <AudioVisualizer />
          </Suspense>
        </Win95ThemeProvider>
      </body>
    </html>
  );
}
