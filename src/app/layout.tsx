export { metadata } from "@/app/_helpers/metadata";
import { fontClasses } from "@/app/_helpers/font";

import { Win95ThemeProvider } from "@/components/win-95/provider";
import { ThemedBackground } from "@/components/win-95/themed-background";
import { PlayerProvider } from "@/components/player-provider";
import { Header } from "@/app/_components/header";
import { Footer } from "@/app/_components/footer";

import "@/styles/globals.css";

export default function RootLayout({ children }: Children) {
  return (
    <html lang="en" className={fontClasses}>
      <body className="font-ms-sans-serif overflow-hidden">
        <Win95ThemeProvider>
          <ThemedBackground>
            <PlayerProvider>
              <Header />
              {/* The page scrolls inside this box; header and footer stay put. */}
              <div className="h-screen overflow-y-auto">{children}</div>
              <Footer />
            </PlayerProvider>
          </ThemedBackground>
        </Win95ThemeProvider>
      </body>
    </html>
  );
}
