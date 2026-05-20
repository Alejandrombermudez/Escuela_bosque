import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const josefinSans = localFont({
  src: [
    {
      path: "../public/fonts/JosefinSans/JosefinSans-VariableFont_wght.ttf",
      style: "normal",
    },
    {
      path: "../public/fonts/JosefinSans/JosefinSans-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-josefin",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amazonia Emprende — Escuela de restauración y negocios verdes",
  description: "El futuro comienza aquí",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${josefinSans.variable} h-full`}>
      <body className="h-full">{children}</body>
    </html>
  );
}
