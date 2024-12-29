import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SonDüdük - Canlı Maç Sonuçları",
  description: "Canlı maç sonuçları, istatistikler ve daha fazlası",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={`${inter.className} bg-[#004225]`}>
        {children}
      </body>
    </html>
  );
}
