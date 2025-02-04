export { metadata } from "@/components/layout/metadata";

import { fontClasses } from "@/components/layout/font";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import "@/styles/globals.css";

export default function RootLayout({ children }: Children) {
  return (
    <html lang="en" className={fontClasses}>
      <body className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 text-white">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
