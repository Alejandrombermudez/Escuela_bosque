"use client";

import { useRouter, usePathname } from "next/navigation";

type NavKey = "home" | "profile" | "content" | "tree" | "alerts";

const ITEMS: { key: NavKey; label: string; href: string }[] = [
  { key: "home", label: "Inicio", href: "/home" },
  { key: "profile", label: "Perfil", href: "/create-profile" },
  { key: "content", label: "Contenidos", href: "/contenidos" },
  { key: "tree", label: "Mi bosque", href: "/home" },
  { key: "alerts", label: "Novedades", href: "/home" },
];

function Icon({ name }: { name: NavKey }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "home":
      return (
        <svg {...common}>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V21h14V9.5" />
        </svg>
      );
    case "profile":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
        </svg>
      );
    case "content":
      return (
        <svg {...common}>
          <path d="M5 4h11l3 3v13H5z" />
          <path d="M9 9h6M9 13h6M9 17h4" />
        </svg>
      );
    case "tree":
      return (
        <svg {...common}>
          <path d="M12 3c-3 0-5 2.2-5 5 0 2 1.2 3.7 3 4.5-.4 1-1.4 1.8-3 2.3h10c-1.6-.5-2.6-1.3-3-2.3 1.8-.8 3-2.5 3-4.5 0-2.8-2-5-5-5Z" />
          <path d="M12 16v5" />
        </svg>
      );
    case "alerts":
      return (
        <svg {...common}>
          <path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8" />
          <path d="M10.5 21a2 2 0 0 0 3 0" />
        </svg>
      );
  }
}

export default function BottomNav({ active = "home" }: { active?: NavKey }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 z-30 border-t border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-[32rem] items-center justify-around px-4 py-2">
        {ITEMS.map((item) => {
          const isActive =
            item.key === active ||
            (item.href !== "/home" && pathname.startsWith(item.href));
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => router.push(item.href)}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              className="flex flex-col items-center gap-0.5 px-2 py-1"
            >
              <span
                className={
                  isActive
                    ? "flex h-10 w-10 items-center justify-center rounded-full bg-[#2D4A2D] text-white"
                    : "flex h-10 w-10 items-center justify-center text-gray-500"
                }
              >
                <Icon name={item.key} />
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
