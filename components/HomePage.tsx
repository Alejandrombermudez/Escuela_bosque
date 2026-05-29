"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getCourse,
  getAllItems,
  type Course,
  type ContentItem,
} from "@/lib/courses";
import { getProfile, displayName, initials, type Profile } from "@/lib/profile";
import ContentTypeIcon from "@/components/ContentTypeIcon";
import BottomNav from "@/components/BottomNav";

export default function HomePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const p = getProfile();
    // Puerta de acceso: sin rol no se ha completado el onboarding.
    if (!p?.role) {
      router.replace("/roles");
      return;
    }
    setProfile(p);
    setCourse(getCourse(p.role));
  }, [router]);

  // Evita parpadeo de hidratación / mientras se resuelve la redirección.
  if (!course) {
    return <div className="min-h-screen bg-[#F4F5F3]" />;
  }

  const greeting = displayName(profile) || "Explorador/a";
  const preview = getAllItems(course).slice(0, 2);

  return (
    <div className="flex min-h-screen flex-col bg-[#F4F5F3]">
      <main className="mx-auto w-full max-w-[32rem] flex-1 px-4 pb-6">
        {/* ── Cabecera: saludo + avatar ── */}
        <header
          className="mt-4 flex items-center gap-4 rounded-3xl px-5 py-5"
          style={{
            background: "linear-gradient(135deg, #AEC4D6 0%, #C9D6E0 100%)",
          }}
        >
          <button
            type="button"
            onClick={() => router.push("/create-profile")}
            aria-label="Editar perfil"
            className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/40 ring-2 ring-white/70"
          >
            {initials(profile) ? (
              <span className="text-lg font-bold text-[#2D4A2D]">
                {initials(profile)}
              </span>
            ) : (
              <svg width="34" height="34" viewBox="0 0 42 42" fill="none">
                <circle cx="21" cy="14" r="8" fill="#2D4A2D" opacity="0.7" />
                <path
                  d="M5 37c0-8.837 7.163-16 16-16s16 7.163 16 16"
                  fill="#2D4A2D"
                  opacity="0.7"
                />
              </svg>
            )}
          </button>
          <div className="leading-tight text-white">
            <p className="text-[0.8rem] font-light">Hola</p>
            <p className="text-[1.35rem] font-bold">{greeting}</p>
          </div>
        </header>

        {/* ── Contenidos ── */}
        <section className="mt-4 rounded-3xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-[1.05rem] font-bold text-gray-900">Contenidos</h2>
            <button
              type="button"
              onClick={() => router.push("/contenidos")}
              className="text-[0.7rem] font-bold text-[#2D4A2D] hover:underline"
            >
              Ver todos
            </button>
          </div>

          <ul className="mt-3 flex flex-col gap-2.5">
            {preview.map((item) => (
              <ContentRow
                key={item.id}
                item={item}
                onClick={() => router.push(`/contenidos/${item.id}`)}
              />
            ))}
          </ul>
        </section>

        {/* ── Mapas + Camera trap ── */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          {/* Mapas */}
          <article
            className="flex flex-col justify-between rounded-3xl p-5"
            style={{ background: "linear-gradient(160deg, #C7E29A 0%, #A9CF7C 100%)" }}
          >
            <h3 className="text-[1rem] font-bold text-[#33401f]">Mapas</h3>
            <div className="mt-3">
              <span className="inline-block rounded-md bg-[#2b2b2b] px-2 py-0.5 text-[0.6rem] font-bold text-white">
                Zona 2
              </span>
              <svg viewBox="0 0 120 60" className="mt-2 w-full" fill="none">
                <path
                  d="M2 52 L30 40 L40 42 L70 20 L90 22 L118 6"
                  stroke="#3c5325"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="70" cy="20" r="4" fill="#2b2b2b" />
                <path
                  d="M2 52 L30 40 L40 42 L70 20 L90 22 L118 6 L118 58 L2 58 Z"
                  fill="#ffffff"
                  opacity="0.25"
                />
              </svg>
            </div>
          </article>

          {/* Camera trap */}
          <article className="flex flex-col rounded-3xl bg-white p-5 shadow-sm">
            <h3 className="text-[1rem] font-bold text-gray-900">Camera trap</h3>
            <p className="text-[0.7rem] font-light text-gray-500">
              Observa la selva
            </p>
            <svg viewBox="0 0 120 70" className="mt-auto w-full" fill="none">
              {/* Animal silueta sencilla */}
              <path
                d="M18 50c0-10 8-16 18-16 6 0 9 2 14 2s7-4 13-4c10 0 16 7 16 16"
                stroke="#9aa0a6"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M22 50v8M34 50v8M70 50v8M82 50v8"
                stroke="#9aa0a6"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="83" cy="34" r="2" fill="#9aa0a6" />
              {/* pasto */}
              <path
                d="M96 58c0-4 1-7 3-9M101 58c0-3 2-6 4-7M106 58c1-3 3-5 6-6"
                stroke="#bcd49a"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </article>
        </div>

        {/* ── Relatos del bosque + Updates ── */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          {/* Relatos del bosque (podcast) */}
          <article
            className="flex flex-col justify-between rounded-3xl p-5 text-white"
            style={{ background: "linear-gradient(180deg, #5f6f5a 0%, #36423a 100%)" }}
          >
            <h3 className="text-[1rem] font-bold leading-tight">
              Relatos del bosque
            </h3>
            <div className="mt-4 flex items-end gap-[3px]" aria-hidden>
              {WAVEFORM.map((h, i) => (
                <span
                  key={i}
                  className="w-[3px] rounded-full bg-white/80"
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
          </article>

          {/* Updates */}
          <article className="flex flex-col rounded-3xl bg-white p-5 shadow-sm">
            <h3 className="text-[1rem] font-bold text-gray-900">Novedades</h3>
            <ul className="mt-3 flex flex-col gap-3">
              <li className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EEF4EC] text-[#2D4A2D]">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 20l9-15 9 15z" />
                  </svg>
                </span>
                <span className="flex-1 text-[0.75rem] font-medium text-gray-700">
                  Camps
                </span>
                <span className="rounded-full bg-[#E7B85C] px-2 py-0.5 text-[0.55rem] font-bold text-white">
                  Reserva
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E4F0F7] text-[#1F5673]">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="6" width="14" height="12" rx="2" />
                    <path d="M17 10l4-2v8l-4-2" />
                  </svg>
                </span>
                <span className="flex-1 text-[0.75rem] font-medium text-gray-700">
                  Webinar
                </span>
              </li>
            </ul>
          </article>
        </div>
      </main>

      <BottomNav active="home" />
    </div>
  );
}

const WAVEFORM = [8, 14, 22, 12, 28, 18, 34, 24, 14, 30, 20, 10, 26, 16, 8, 12];

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
        <ContentTypeIcon type={item.type} size={38} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.8rem] font-bold text-gray-900">
            {item.title}
          </p>
          {item.summary && (
            <p className="truncate text-[0.68rem] font-light text-gray-500">
              {item.summary}
            </p>
          )}
          {item.duration && (
            <p className="text-[0.68rem] font-light text-gray-500">
              Video · {item.duration} min
            </p>
          )}
        </div>
      </button>
    </li>
  );
}
