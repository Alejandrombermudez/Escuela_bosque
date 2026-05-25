"use client";

/**
 * Banner de instalación PWA.
 * - Android / Chrome: intercepta el evento beforeinstallprompt y muestra botón.
 * - iOS / Safari: detecta que no está instalada y muestra instrucciones del Share menu.
 * Se oculta automáticamente si la app ya corre en modo standalone (ya instalada).
 */

import { useEffect, useState } from "react";
import Image from "next/image";

type Platform = "android" | "ios" | null;

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [platform, setPlatform] = useState<Platform>(null);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [iosGuide, setIosGuide] = useState(false);

  useEffect(() => {
    // Si ya está instalada en modo standalone → no mostrar nada
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    // iOS standalone también via navigator.standalone
    if ((navigator as { standalone?: boolean }).standalone) return;
    // Si el usuario ya lo descartó en esta sesión o en sesiones anteriores → no mostrar
    if (localStorage.getItem("pwa-prompt-dismissed")) return;

    const ua = navigator.userAgent;
    const isIOS = /iphone|ipad|ipod/i.test(ua) && !/chrome/i.test(ua);
    const isAndroid = /android/i.test(ua);

    if (isIOS) {
      setPlatform("ios");
      setVisible(true);
    }

    if (isAndroid || (!isIOS && !isAndroid)) {
      // Capturamos el prompt de Chrome / Edge
      const handler = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e as BeforeInstallPromptEvent);
        setPlatform("android");
        setVisible(true);
      };
      window.addEventListener("beforeinstallprompt", handler);
      return () => window.removeEventListener("beforeinstallprompt", handler);
    }
  }, []);

  if (!visible) return null;

  // ── Android / Chrome ──────────────────────────────────────────────────────
  const handleAndroidInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    // Tanto si acepta como si cancela el diálogo del sistema, no volver a mostrar
    localStorage.setItem("pwa-prompt-dismissed", "1");
    setVisible(false);
  };

  // ── iOS ───────────────────────────────────────────────────────────────────
  const handleIosToggle = () => setIosGuide((v) => !v);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-safe">
      <div className="mx-auto mb-4 max-w-sm rounded-2xl border border-white/20 bg-black/70 px-5 py-4 shadow-xl backdrop-blur-md">
        {/* Cabecera */}
        <div className="flex items-center gap-3">
          <Image
            src="/icons/icon-192x192.png"
            alt="Amazonia Emprende"
            width={44}
            height={44}
            className="rounded-xl"
          />
          <div className="flex-1">
            <p className="text-[13px] font-bold text-white leading-tight">
              Amazonia Emprende
            </p>
            <p className="text-[11px] font-light text-white/70">
              Añade la app a tu pantalla de inicio
            </p>
          </div>
          <button
            onClick={() => {
              localStorage.setItem("pwa-prompt-dismissed", "1");
              setVisible(false);
            }}
            aria-label="Cerrar"
            className="ml-1 text-white/50 hover:text-white text-lg leading-none"
          >
            ✕
          </button>
        </div>

        {/* Botón Android */}
        {platform === "android" && (
          <button
            onClick={handleAndroidInstall}
            className="mt-3 w-full rounded-full bg-white py-2 text-[12px] font-bold text-black transition hover:bg-white/90"
          >
            Instalar app
          </button>
        )}

        {/* Instrucciones iOS */}
        {platform === "ios" && (
          <>
            <button
              onClick={handleIosToggle}
              className="mt-3 w-full rounded-full bg-white py-2 text-[12px] font-bold text-black transition hover:bg-white/90"
            >
              {iosGuide ? "Ocultar instrucciones" : "Cómo instalar →"}
            </button>
            {iosGuide && (
              <ol className="mt-3 space-y-2 text-[11px] text-white/80">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/20 text-[9px] font-bold text-white">
                    1
                  </span>
                  Toca el botón{" "}
                  <span className="font-bold text-white">Compartir</span>{" "}
                  <span className="text-base leading-none">⎙</span> en Safari
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/20 text-[9px] font-bold text-white">
                    2
                  </span>
                  Desplázate y selecciona{" "}
                  <span className="font-bold text-white">
                    «Añadir a pantalla de inicio»
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/20 text-[9px] font-bold text-white">
                    3
                  </span>
                  Toca <span className="font-bold text-white">Añadir</span> para
                  confirmar
                </li>
              </ol>
            )}
          </>
        )}
      </div>
    </div>
  );
}
