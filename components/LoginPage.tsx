"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: reemplazar con autenticación real
    router.push("/roles");
  };

  return (
    <div className="h-full min-h-screen">

      {/* ─── MOBILE (< lg) ─────────────────────────────────────────── */}
      <div className="relative flex min-h-screen flex-col lg:hidden">
        <Image
          src="/images/bosque.png"
          alt="Bosque Amazonia Emprende"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 flex min-h-screen flex-col items-center px-8 pt-14 pb-10">
          {/* Título — 1.875rem = 30px @ 16px base */}
          <h1 className="mb-8 text-center text-[1.875rem] font-normal leading-[1.28] text-white">
            Escuela de restauración y negocios verdes
          </h1>

          <div className="mb-8">
            <Image
              src="/images/logo-ae.png"
              alt="Amazonia Emprende"
              width={120}
              height={80}
              style={{ height: "auto" }}
              className="mx-auto"
            />
          </div>

          {/* "Bienvenido" — 0.9375rem = 15px @ 16px base */}
          <h2 className="mb-4 self-start text-[0.9375rem] font-normal text-white">
            Bienvenido
          </h2>

          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
            <div>
              {/* Labels — 0.5625rem = 9px @ 16px base */}
              <label className="mb-1 block text-[0.5625rem] font-bold text-white">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full rounded-md border border-white/25 bg-black/25 px-3 py-2.5 text-sm text-white placeholder-white/40 focus:border-white/60 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-[0.5625rem] font-bold text-white">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full rounded-md border border-white/25 bg-black/25 px-3 py-2.5 pr-10 text-sm text-white placeholder-white/40 focus:border-white/60 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100"
                >
                  <Image src="/images/ojo.png" alt="" width={18} height={18} className="invert" />
                </button>
              </div>
            </div>

            {/* "Recuérdame" — 0.5625rem light */}
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-3 w-3 accent-white"
              />
              <span className="text-[0.5625rem] font-light text-white">Recuérdame</span>
            </label>

            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-white py-2.5 text-sm font-bold text-black transition-colors hover:bg-white/90"
            >
              Ingresa
            </button>
          </form>

          <div className="my-5 flex w-full items-center">
            <div className="h-px flex-1 bg-white/30" />
            <span className="mx-3 text-[0.5625rem] font-light text-white">O entra con</span>
            <div className="h-px flex-1 bg-white/30" />
          </div>

          <button
            onClick={() => router.push("/roles")}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 py-2.5 transition-colors hover:bg-white/20"
          >
            <Image src="/images/logo-google.png" alt="Google" width={16} height={16} />
            {/* 0.625rem = 10px @ 16px base */}
            <span className="text-[0.625rem] font-bold text-white">Continúa con google</span>
          </button>

          <p className="mt-6 text-[0.625rem] font-normal text-white/80">
            ¿No tienes cuenta?{" "}
            <button
              type="button"
              onClick={() => router.push("/create-profile")}
              className="font-bold text-white hover:underline"
            >
              Créala aquí
            </button>
          </p>
        </div>
      </div>

      {/* ─── DESKTOP (≥ lg) ─────────────────────────────────────────── */}
      <div className="hidden h-screen lg:grid lg:grid-cols-[55fr_45fr]">

        {/* ── Izquierda: foto del bosque ── */}
        <div className="relative">
          <Image
            src="/images/bosque.png"
            alt="Bosque Amazonia Emprende"
            fill
            sizes="55vw"
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 flex flex-col p-[3vw]">
            <div>
              <Image
                src="/images/logo-ae.png"
                alt="Amazonia Emprende"
                width={110}
                height={75}
                style={{ height: "auto", width: "clamp(80px, 8vw, 160px)" }}
              />
            </div>
            {/* Texto abajo-izquierda, ancho máximo para no esparcirse en pantallas anchas */}
            <div className="mt-auto max-w-[24rem]">
              <h1 className="text-[1.875rem] font-normal leading-[1.28] text-white">
                Escuela de restauración y negocios verdes
              </h1>
              <p className="mt-2 text-sm font-light text-white/80">
                El futuro comienza aquí
              </p>
            </div>
          </div>
        </div>

        {/* ── Derecha: panel blanco con formulario ──
             items-center + max-w-[32rem] evita que el form se estire en pantallas anchas */}
        <div className="flex flex-col items-center justify-center bg-white px-8">
          <div className="w-full max-w-[32rem]">

            <h2 className="mb-8 text-2xl font-normal text-gray-900">
              Te damos la bienvenida
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="mb-1 block text-[0.5625rem] font-bold tracking-wide text-gray-700">
                  E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm text-gray-900 focus:border-gray-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-[0.5625rem] font-bold tracking-wide text-gray-700">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="w-full rounded-md border border-gray-200 px-3 py-2.5 pr-10 text-sm text-gray-900 focus:border-gray-400 focus:outline-none"
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

              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-3 w-3"
                />
                <span className="text-[0.5625rem] font-light text-gray-500">Recuérdame</span>
              </label>

              <button
                type="submit"
                className="mt-1 w-full rounded-full bg-black py-3 text-sm font-bold text-white transition-colors hover:bg-gray-900"
              >
                Ingresa
              </button>
            </form>

            <div className="my-5 flex items-center">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="mx-3 text-[0.5625rem] font-light text-gray-400">O entra con</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <button
              onClick={() => router.push("/roles")}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 py-2.5 transition-colors hover:bg-gray-50"
            >
              <Image src="/images/logo-google.png" alt="Google" width={18} height={18} />
              <span className="text-[0.625rem] font-bold text-gray-700">Continúa con google</span>
            </button>

            <p className="mt-6 text-center text-[0.625rem] font-normal text-gray-500">
              ¿No tienes cuenta?{" "}
              <button
                type="button"
                onClick={() => router.push("/create-profile")}
                className="font-bold text-gray-900 hover:underline"
              >
                Créala aquí
              </button>
            </p>

          </div>
        </div>
      </div>

    </div>
  );
}
