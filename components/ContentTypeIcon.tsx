import type { ContentType } from "@/lib/courses";

/** Ícono cuadrado con fondo suave según el tipo de contenido. */
export default function ContentTypeIcon({
  type,
  size = 40,
}: {
  type: ContentType;
  size?: number;
}) {
  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const inner = Math.round(size * 0.5);

  const config: Record<
    ContentType,
    { bg: string; color: string; path: React.ReactNode }
  > = {
    article: {
      bg: "#EEF4EC",
      color: "#2D4A2D",
      path: (
        <>
          <path d="M6 3h9l3 3v15H6z" {...stroke} />
          <path d="M9 8h6M9 12h6M9 16h4" {...stroke} />
        </>
      ),
    },
    video: {
      bg: "#E4F0F7",
      color: "#1F5673",
      path: (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2.5" {...stroke} />
          <path d="M10 9.5v5l4-2.5z" fill="currentColor" stroke="none" />
        </>
      ),
    },
    infographic: {
      bg: "#F4EFE6",
      color: "#8A6D3B",
      path: (
        <>
          <rect x="4" y="4" width="16" height="16" rx="2" {...stroke} />
          <path d="M8 16v-3M12 16v-6M16 16v-4" {...stroke} />
        </>
      ),
    },
    pdf: {
      bg: "#FBE9E7",
      color: "#B23A2E",
      path: (
        <>
          <path d="M6 3h9l3 3v15H6z" {...stroke} />
          <path d="M9 13h2a1.5 1.5 0 0 0 0-3H9v6" {...stroke} />
        </>
      ),
    },
    quiz: {
      bg: "#EDE7F6",
      color: "#5E35B1",
      path: (
        <>
          <path d="M5 4h14v16H5z" {...stroke} />
          <path d="M8 9l2 2 3-3M8 15h6" {...stroke} />
        </>
      ),
    },
    writing: {
      bg: "#ECEFF1",
      color: "#546E7A",
      path: (
        <>
          <path d="M4 20l1-4L16 5l3 3L8 19z" {...stroke} />
          <path d="M14 7l3 3" {...stroke} />
        </>
      ),
    },
  };

  const { bg, color, path } = config[type];

  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-xl"
      style={{ width: size, height: size, backgroundColor: bg, color }}
    >
      <svg width={inner} height={inner} viewBox="0 0 24 24">
        {path}
      </svg>
    </span>
  );
}
