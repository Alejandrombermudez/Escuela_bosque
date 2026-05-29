"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCourse, type Course, type ContentItem } from "@/lib/courses";
import { getProfile } from "@/lib/profile";
import ContentTypeIcon from "@/components/ContentTypeIcon";
import BottomNav from "@/components/BottomNav";

export default function ContenidosPage() {
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    setCourse(getCourse(getProfile()?.role));
  }, []);

  if (!course) return <div className="min-h-screen bg-white" />;

  return (
    <div className="flex min-h-screen flex-col bg-[#F4F5F3]">
      <main className="mx-auto w-full max-w-[32rem] flex-1 px-4 pb-6">
        {/* Encabezado */}
        <header className="flex items-center gap-3 pt-6">
          <button
            type="button"
            onClick={() => router.push("/home")}
            aria-label="Volver al inicio"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600 shadow-sm hover:bg-gray-50"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 2L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="text-[1.4rem] font-bold text-gray-900">Contenidos</h1>
        </header>

        {/* Curso actual */}
        <section className="mt-4 rounded-3xl bg-white p-5 shadow-sm">
          <p className="text-[0.65rem] font-bold uppercase tracking-wide text-[#2D4A2D]">
            Tu curso
          </p>
          <h2 className="mt-1 text-[1.05rem] font-bold leading-tight text-gray-900">
            {course.title}
          </h2>
          <p className="mt-1 text-[0.78rem] font-light text-gray-500">
            {course.theme}
          </p>
        </section>

        {/* Módulos */}
        <div className="mt-4 flex flex-col gap-4">
          {course.modules.map((module, idx) => (
            <section key={module.id} className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-[0.65rem] font-bold uppercase tracking-wide text-gray-400">
                Módulo {idx + 1}
              </p>
              <h3 className="mt-0.5 text-[0.98rem] font-bold leading-tight text-gray-900">
                {module.title}
              </h3>
              <p className="mt-1.5 text-[0.74rem] font-light leading-snug text-gray-500">
                {module.intro}
              </p>
              <ul className="mt-3 flex flex-col gap-2.5">
                {module.items.map((item) => (
                  <ContentRow
                    key={item.id}
                    item={item}
                    onClick={() => router.push(`/contenidos/${item.id}`)}
                  />
                ))}
              </ul>
            </section>
          ))}

          {/* Quiz final */}
          <section className="rounded-3xl bg-[#EEF4EC] p-5">
            <div className="flex items-center gap-3">
              <ContentTypeIcon type="quiz" size={40} />
              <div className="flex-1">
                <h3 className="text-[0.9rem] font-bold text-gray-900">
                  Actividad final
                </h3>
                <p className="text-[0.72rem] font-light text-gray-500">
                  Pon a prueba lo aprendido con el quiz del curso.
                </p>
              </div>
            </div>
            <button
              type="button"
              disabled
              className="mt-3 w-full rounded-full bg-[#2D4A2D]/40 py-2 text-[0.78rem] font-bold text-white"
            >
              Próximamente
            </button>
          </section>

          {/* Recursos (PDFs) */}
          {course.resources && course.resources.length > 0 && (
            <section className="rounded-3xl bg-white p-5 shadow-sm">
              <h3 className="text-[0.9rem] font-bold text-gray-900">Recursos</h3>
              <ul className="mt-3 flex flex-col gap-2.5">
                {course.resources.map((item) => (
                  <ContentRow
                    key={item.id}
                    item={item}
                    onClick={() => router.push(`/contenidos/${item.id}`)}
                  />
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>

      <BottomNav active="content" />
    </div>
  );
}

function ContentRow({
  item,
  onClick,
}: {
  item: ContentItem;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center gap-3 rounded-2xl bg-[#F7F8F6] px-3 py-2.5 text-left transition-colors hover:bg-[#EEF1EC]"
      >
        <ContentTypeIcon type={item.type} size={40} />
        <div className="min-w-0 flex-1">
          <p className="text-[0.8rem] font-bold leading-snug text-gray-900">
            {item.title}
          </p>
          <p className="mt-0.5 text-[0.68rem] font-light text-gray-500">
            {item.type === "video" && item.duration
              ? `Video · ${item.duration} min`
              : item.summary ?? subtitleFor(item)}
          </p>
        </div>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 text-gray-300">
          <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </li>
  );
}

function subtitleFor(item: ContentItem): string {
  if (item.pending) return "Próximamente";
  switch (item.type) {
    case "infographic":
      return item.source ? `Infografía · ${item.source}` : "Infografía";
    case "pdf":
      return "Documento PDF";
    case "writing":
      return "Documento escrito";
    default:
      return "";
  }
}
