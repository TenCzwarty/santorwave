export { metadata } from "@/app/_helpers/metadata";
import { fontClasses } from "@/app/_helpers/font";

import { AudioVisualizer } from "@/components/audio-visualizer";
import { Header } from "@/app/_components/header";
import { Footer } from "@/app/_components/footer";
import "@/styles/globals.css";

export default function RootLayout({ children }: Children) {
  return (
    <html lang="en" className={fontClasses}>
      <body className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 text-white">
        <Header />
        {children}
        <AudioVisualizer />
        <Footer />
      </body>
    </html>
  );
}
