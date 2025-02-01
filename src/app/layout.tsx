export { metadata } from "@/components/layout/metadata";

import { fontClasses } from "@/components/layout/font";
import "@/styles/globals.css";

export default function RootLayout({ children }: Children) {
  return (
    <html lang="en" className={fontClasses}>
      <body>{children}</body>
    </html>
  );
}
