"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// ── Tipos ─────────────────────────────────────────────────────────────────────

interface Role {
  id: string;
  title: string;
  desc: string;
  icon: string;
  bgDefault: string;
  bgSelected: string;
}

// ── Datos de roles ─────────────────────────────────────────────────────────────

const ROLES: Role[] = [
  {
    id: "empresa",
    title: "Soy parte de una empresa",
    desc: "Si llegaste a través de la empresa en la que trabajas, o eres un aliado corporativo.",
    icon: "/images/roles/empresa.png",
    bgDefault: "#EEF4EC",
    bgSelected: "#C2D9BC",
  },
  {
    id: "productor",
    title: "Soy productor/a rural",
    desc: "Si eres propietario/a de finca, Ganadero/a ó productor agropecuario.",
    icon: "/images/roles/rancher.png",
    bgDefault: "#F4EFE6",
    bgSelected: "#D9C9A8",
  },
  {
    id: "independiente",
    title: "Soy un participante independiente",
    desc: "Si quieres aprender por tu cuenta sobre cómo restaurar el Amazonas.",
    icon: "/images/roles/free.png",
    bgDefault: "#E4F0F7",
    bgSelected: "#B5D5E8",
  },
];

// ── Sub-componente: card de rol ────────────────────────────────────────────────

function RoleCard({
  role,
  selected,
  onSelect,
}: {
  role: Role;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left transition-all duration-200"
      style={{
        backgroundColor: selected ? role.bgSelected : role.bgDefault,
        border: selected ? "2px solid #3a3a3a" : "2px solid transparent",
      }}
    >
      {/* Texto */}
      <div className="flex-1">
        <p className="text-[0.9rem] font-bold leading-snug text-gray-900">
          {role.title}
        </p>
        <p className="mt-1 text-[0.75rem] font-light leading-snug text-gray-500">
          {role.desc}
        </p>
      </div>

      {/* Ícono */}
      <div className="shrink-0">
        <Image
          src={role.icon}
          alt={role.title}
          width={72}
          height={72}
          className="rounded-xl"
        />
      </div>
    </button>
  );
}

// ── Componente principal ───────────────────────────────────────────────────────

export default function RolePage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const router = useRouter();

  const handleContinue = () => {
    if (!selectedRole) return;
    // TODO: guardar rol seleccionado y navegar a la siguiente pantalla
    console.log("Rol seleccionado:", selectedRole);
    router.push("/"); // placeholder hasta que exista la siguiente pantalla
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[32rem] flex-col px-6 py-10">

        {/* Sobre nosotros */}
        <div>
          <button className="rounded-full bg-gray-100 px-4 py-1.5 text-[0.7rem] font-normal text-gray-500 transition-colors hover:bg-gray-200">
            Sobre nosotros
          </button>
        </div>

        {/* Título */}
        <h1 className="mt-10 text-[2.2rem] font-normal leading-[1.2] text-gray-900">
          Para comenzar,<br />cuéntanos de ti
        </h1>

        {/* Cards */}
        <div className="mt-10 flex flex-col gap-4">
          {ROLES.map((role) => (
            <RoleCard
              key={role.id}
              role={role}
              selected={selectedRole === role.id}
              onSelect={() => setSelectedRole(role.id)}
            />
          ))}
        </div>

        {/* Botón Sigamos */}
        <div className="mt-10">
          <button
            type="button"
            onClick={handleContinue}
            disabled={!selectedRole}
            className="relative flex w-full items-center overflow-hidden rounded-full py-3 transition-all duration-200 disabled:cursor-not-allowed"
            style={
              selectedRole
                ? {
                    background:
                      "linear-gradient(to right, #2D4A2D, #8AAD89)",
                  }
                : { backgroundColor: "#E0E0E0" }
            }
          >
            {/* Círculo con flecha */}
            <span
              className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
              style={{
                backgroundColor: selectedRole ? "#ffffff" : "#c8c8c8",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke={selectedRole ? "#2D4A2D" : "#888"}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            {/* Texto */}
            <span
              className="flex-1 text-center text-[0.95rem] font-bold tracking-wide"
              style={{ color: selectedRole ? "#ffffff" : "#999999" }}
            >
              Sigamos
            </span>

            {/* Spacer para centrar el texto correctamente */}
            <span className="mr-3 h-9 w-9 shrink-0" />
          </button>
        </div>

      </div>
    </main>
  );
}
