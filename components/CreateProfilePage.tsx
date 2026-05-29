"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { saveProfile } from "@/lib/profile";

export default function CreateProfilePage() {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveProfile({ firstName, lastName, email });
    router.push("/home");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-10">

      {/* ── Fondo: foto aérea del bosque ── */}
      <Image
        src="/images/photo-background.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* ── Card ── */}
      <div className="relative z-10 w-full max-w-[26rem]">

        {/* Header: foto del bosque + logo + botón atrás */}
        <div className="relative h-32 overflow-hidden rounded-t-3xl">
          <Image
            src="/images/photo-background.png"
            alt=""
            fill
            sizes="26rem"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/30" />

          {/* Botón atrás */}
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Volver"
            className="absolute left-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/40"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M9 2L4 7l5 5"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Logo centrado */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/images/logo-ae.png"
              alt="Amazonia Emprende"
              width={110}
              height={75}
              style={{ height: "auto", width: "clamp(72px, 7vw, 110px)", filter: "brightness(0) invert(1)" }}
            />
          </div>
        </div>

        {/* Avatar — sobresale del header */}
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 -top-10 z-10">
            <div className="relative">
              {/* Círculo con silueta de persona */}
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-800 ring-4 ring-white">
                <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
                  <circle cx="21" cy="14" r="8" fill="white" />
                  <path
                    d="M5 37c0-8.837 7.163-16 16-16s16 7.163 16 16"
                    fill="white"
                  />
                </svg>
              </div>

              {/* Badge cámara */}
              <button
                type="button"
                aria-label="Cambiar foto de perfil"
                className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transition-colors hover:bg-gray-50"
              >
                <Image
                  src="/images/icon-camera.png"
                  alt=""
                  width={14}
                  height={14}
                />
              </button>
            </div>
          </div>

          {/* Cuerpo de la card */}
          <div className="rounded-b-3xl bg-white px-6 pb-8 pt-14">

            <h1 className="mb-6 text-[1.5rem] font-normal leading-tight text-gray-900">
              Crea tu perfil
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              {/* Nombre */}
              <div>
                <label className="mb-1 block text-[0.5625rem] font-bold tracking-wide text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="given-name"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-gray-400 focus:outline-none"
                />
              </div>

              {/* Apellidos */}
              <div>
                <label className="mb-1 block text-[0.5625rem] font-bold tracking-wide text-gray-700">
                  Apellidos
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="family-name"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-gray-400 focus:outline-none"
                />
              </div>

              {/* Correo */}
              <div>
                <label className="mb-1 block text-[0.5625rem] font-bold tracking-wide text-gray-700">
                  Correo
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-gray-400 focus:outline-none"
                />
              </div>

              {/* Contraseña */}
              <div>
                <label className="mb-1 block text-[0.5625rem] font-bold tracking-wide text-gray-700">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 pr-10 text-sm text-gray-900 focus:border-gray-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-80"
                  >
                    <Image src="/images/ojo.png" alt="" width={18} height={18} />
                  </button>
                </div>
              </div>

              {/* Botón Guardar — mismo estilo que "Sigamos" */}
              <button
                type="submit"
                className="relative mt-2 flex w-full items-center overflow-hidden rounded-full py-3 transition-all duration-200"
                style={{ background: "linear-gradient(to right, #2D4A2D, #8AAD89)" }}
              >
                {/* Círculo con flecha */}
                <span className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="#2D4A2D"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                {/* Texto */}
                <span className="flex-1 text-center text-[0.95rem] font-bold tracking-wide text-white">
                  Guardar
                </span>

                {/* Spacer para centrar el texto */}
                <span className="mr-3 h-9 w-9 shrink-0" />
              </button>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
