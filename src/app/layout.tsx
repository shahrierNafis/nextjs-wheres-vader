import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import fonts from "@/../public/fonts/fonts";

const fontVars = fonts.map((font) => font.variable).join(" ");
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "where's vader",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${fontVars} ${inter.className}`}>{children}</body>
    </html>
  );
}
