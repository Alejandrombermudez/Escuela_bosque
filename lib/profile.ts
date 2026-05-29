// Persistencia local del perfil del usuario (sin backend todavía).
// Cuando exista autenticación real, reemplazar esta capa por la sesión del servidor.

import { isRoleId, type RoleId } from "./courses";

export interface Profile {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: RoleId;
}

const KEY = "ae-profile";

export function getProfile(): Profile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Profile) : null;
  } catch {
    return null;
  }
}

/** Combina los campos dados con el perfil existente y lo guarda. */
export function saveProfile(patch: Profile): Profile {
  const next = { ...(getProfile() ?? {}), ...patch };
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* almacenamiento no disponible */
    }
  }
  return next;
}

export function getRole(): RoleId | null {
  const role = getProfile()?.role;
  return isRoleId(role) ? role : null;
}

/** Nombre para saludar: nombre + inicial del apellido (ej. "Claudia R"). */
export function displayName(profile: Profile | null): string {
  if (!profile) return "";
  const first = profile.firstName?.trim();
  const lastInitial = profile.lastName?.trim()?.charAt(0);
  if (first && lastInitial) return `${first} ${lastInitial.toUpperCase()}`;
  if (first) return first;
  if (profile.email) return profile.email.split("@")[0];
  return "";
}

/** Iniciales para el avatar (ej. "CR"). */
export function initials(profile: Profile | null): string {
  if (!profile) return "";
  const f = profile.firstName?.trim()?.charAt(0) ?? "";
  const l = profile.lastName?.trim()?.charAt(0) ?? "";
  const result = (f + l).toUpperCase();
  if (result) return result;
  return profile.email?.charAt(0).toUpperCase() ?? "";
}
