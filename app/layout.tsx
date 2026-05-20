import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import InstallPrompt from "@/components/InstallPrompt";

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

export const viewport: Viewport = {
  themeColor: "#0f1e0f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"
  ),
  title: "Amazonia Emprende — Escuela de restauración y negocios verdes",
  description: "El futuro comienza aquí",
  manifest: "/manifest.webmanifest",

  // iOS: permite agregar a pantalla de inicio
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Amazonia Emprende",
    startupImage: [
      {
        url: "/icons/apple-touch-icon.png",
      },
    ],
  },

  // Íconos
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/icons/icon-192x192.png",
  },

  // Open Graph (para preview al compartir el link)
  openGraph: {
    title: "Amazonia Emprende",
    description: "Escuela de restauración y negocios verdes",
    images: [{ url: "/images/bosque.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${josefinSans.variable} h-full`}>
      <body className="h-full">
        {children}
        <InstallPrompt />
      </body>
    </html>
  );
}
