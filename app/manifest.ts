import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Amazonia Emprende — Escuela de restauración y negocios verdes",
    short_name: "Amazonia Emprende",
    description: "El futuro comienza aquí",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0f1e0f",
    theme_color: "#0f1e0f",
    categories: ["education", "business"],
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
