"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  getCourse,
  findItem,
  CONTENT_TYPE_LABELS,
  type ContentItem,
  type Module,
} from "@/lib/courses";
import { getProfile } from "@/lib/profile";

export default function ContentDetailPage({ itemId }: { itemId: string }) {
  const router = useRouter();
  const [data, setData] = useState<{ item: ContentItem; module: Module } | null>(
    null
  );
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const course = getCourse(getProfile()?.role);
    const found = findItem(course, itemId);
    if (found) setData(found);
    else setNotFound(true);
  }, [itemId]);

  if (notFound) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-8 text-center">
        <p className="text-gray-600">No encontramos este contenido.</p>
        <button
          type="button"
          onClick={() => router.push("/contenidos")}
          className="rounded-full bg-[#2D4A2D] px-6 py-2.5 text-sm font-bold text-white"
        >
          Ver contenidos
        </button>
      </div>
    );
  }

  if (!data) return <div className="min-h-screen bg-white" />;

  const { item } = data;
  const isVideo = item.type === "video";
  const text = item.body ?? item.summary;

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-[40rem]">
        {/* Media / encabezado visual */}
        <div className="relative aspect-video w-full overflow-hidden bg-gray-900">
          <Image
            src="/images/bosque.png"
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 40rem"
            className="object-cover object-center opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />

          {/* Botón volver */}
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Volver"
            className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/60"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 2L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Play (solo videos) */}
          {isVideo && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="#2D4A2D">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </div>
          )}

          {/* Barra de control simulada (solo videos) */}
          {isVideo && (
            <div className="absolute bottom-0 left-0 right-0 flex items-center gap-2 px-4 py-3">
              <div className="h-1 flex-1 rounded-full bg-white/40">
                <div className="h-1 w-1/4 rounded-full bg-white" />
              </div>
              <span className="text-[0.65rem] font-medium text-white">
                {item.duration ?? "0:00"}
              </span>
            </div>
          )}
        </div>

        {/* Cuerpo */}
        <article className="px-6 py-6">
          <span className="inline-block rounded-full bg-[#EEF4EC] px-3 py-1 text-[0.6rem] font-bold uppercase tracking-wide text-[#2D4A2D]">
            {CONTENT_TYPE_LABELS[item.type]}
            {isVideo && item.duration ? ` · ${item.duration} min` : ""}
          </span>

          <h1 className="mt-3 text-[1.5rem] font-bold leading-tight text-gray-900">
            {item.title}
          </h1>

          {text && (
            <p className="mt-4 text-[0.95rem] leading-relaxed text-gray-600">
              {text}
            </p>
          )}

          {/* Aviso de recurso aún no disponible */}
          {item.pending ? (
            <div className="mt-6 rounded-2xl bg-amber-50 px-4 py-3 text-[0.82rem] text-amber-800">
              Este contenido aún está en preparación. Pronto estará disponible.
            </div>
          ) : (
            <PendingResourceNote item={item} />
          )}
        </article>
      </div>
    </div>
  );
}

/**
 * Aviso para recursos cuya fuente real (video, infografía, PDF) todavía no fue
 * cargada en la app. Se oculta para artículos, que ya tienen su texto.
 */
function PendingResourceNote({ item }: { item: ContentItem }) {
  if (item.url) return null;
  if (item.type === "article") return null;

  const messages: Partial<Record<ContentItem["type"], string>> = {
    video: "El video estará disponible aquí próximamente.",
    infographic: item.source
      ? `Infografía alojada en ${item.source}. El enlace se añadirá pronto.`
      : "La infografía estará disponible aquí próximamente.",
    pdf: "El documento PDF estará disponible para descarga próximamente.",
    writing: "El documento estará disponible próximamente.",
  };

  const msg = messages[item.type];
  if (!msg) return null;

  return (
    <div className="mt-6 rounded-2xl bg-gray-50 px-4 py-3 text-[0.82rem] text-gray-500">
      {msg}
    </div>
  );
}
