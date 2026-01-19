import type { Metadata } from "next";

import "./globals.css";
import Script from "next/script";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-200"
      >
          <Script
          src="https://www.payhere.lk/lib/payhere.js"
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  );
}
