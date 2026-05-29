// ─────────────────────────────────────────────────────────────────────────────
// Contenido educativo de Amazonía Emprende.
// Fuente: "Módulos organizados.docx". Cada curso corresponde a un rol elegido
// en la pantalla de selección de rol (/roles).
//
// Algunos recursos (URLs de videos, archivos de infografías/PDFs y los cuerpos
// completos de los artículos) aún no fueron entregados; quedan marcados con
// `pending: true` o sin `url`. La UI los muestra como "próximamente".
// ─────────────────────────────────────────────────────────────────────────────

export type RoleId = "empresa" | "productor" | "independiente";

export type ContentType =
  | "article"
  | "video"
  | "infographic"
  | "pdf"
  | "quiz"
  | "writing";

export interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  /** Resumen corto que se muestra bajo el título. */
  summary?: string;
  /** Cuerpo del artículo (texto largo). */
  body?: string;
  /** Duración del video, ej. "8:49". */
  duration?: string;
  /** Enlace externo (video, Google Drive, PDF). Aún por definir en muchos. */
  url?: string;
  /** Origen del recurso, ej. "Google Drive". */
  source?: string;
  /** Contenido aún no entregado. */
  pending?: boolean;
}

export interface Module {
  id: string;
  title: string;
  intro: string;
  items: ContentItem[];
}

export interface Course {
  role: RoleId;
  title: string;
  theme: string;
  modules: Module[];
  /** Recursos sueltos del curso (PDFs, etc.). */
  resources?: ContentItem[];
}

// ── Datos ────────────────────────────────────────────────────────────────────

export const COURSES: Record<RoleId, Course> = {
  empresa: {
    role: "empresa",
    title: "Restauración para empresas e inversionistas",
    theme: "Financiación, sostenibilidad y Soluciones basadas en la Naturaleza.",
    modules: [
      {
        id: "emp-m1",
        title: "La restauración como una oportunidad empresarial",
        intro:
          "Presenta la restauración ecológica como una oportunidad de emprendimiento rural, inversión ambiental y generación de valor territorial.",
        items: [
          {
            id: "emp-a1",
            type: "article",
            title:
              "Algunos riesgos de los negocios relacionados con la pérdida de biodiversidad",
            summary:
              "Por qué la pérdida de biodiversidad ya es un riesgo económico, regulatorio y reputacional para las empresas.",
            body: "La pérdida de biodiversidad ya no es solamente un problema ambiental: también representa riesgos económicos, regulatorios y reputacionales para las empresas. Este artículo explora cómo los negocios dependen de los ecosistemas y por qué integrar estrategias de conservación y restauración puede convertirse en una oportunidad para generar valor y reducir riesgos a largo plazo.",
          },
          {
            id: "emp-a2",
            type: "article",
            title:
              "Una casa bonita con una puerta poco accesible: el mercado de la biodiversidad en Colombia",
            summary:
              "Los retos y oportunidades del mercado de la biodiversidad y las inversiones ambientales en Colombia.",
            body: "El mercado de la biodiversidad y las inversiones ambientales están creciendo en Colombia, pero aún existen barreras técnicas, financieras e institucionales para participar en ellos. Este artículo permite comprender los retos y oportunidades que enfrentan empresas y emprendedores interesados en desarrollar proyectos de restauración y Soluciones Basadas en la Naturaleza.",
          },
          {
            id: "emp-v1",
            type: "video",
            title:
              "Aciertos y errores al comenzar una empresa de restauración en la ruralidad",
            duration: "8:49",
          },
        ],
      },
      {
        id: "emp-m2",
        title: "Estrategias para viabilizar la restauración",
        intro:
          "Elementos necesarios para que un proyecto de restauración sea sostenible: financiación, gobernanza, normatividad y continuidad operativa.",
        items: [
          {
            id: "emp-v2",
            type: "video",
            title: "3 elementos estratégicos para viabilizar la restauración",
            duration: "22:22",
          },
          {
            id: "emp-a3",
            type: "article",
            title: "Amazonía con futuro: un reto financiero antes que técnico",
            summary:
              "Por qué la financiación, las alianzas y la planificación son claves para sostener la restauración en el tiempo.",
            body: "Muchos proyectos de restauración fracasan no por falta de conocimiento técnico, sino por dificultades para sostenerse financieramente en el tiempo. Este artículo analiza los desafíos económicos de restaurar la Amazonía y ayuda a entender por qué la financiación, las alianzas y la planificación son claves para viabilizar procesos de restauración a largo plazo.",
          },
        ],
      },
      {
        id: "emp-m3",
        title: "Talento, alianzas y sostenibilidad del proyecto",
        intro:
          "Capacidades humanas, técnicas y organizativas necesarias para sacar adelante procesos de restauración en contextos rurales.",
        items: [
          {
            id: "emp-v3",
            type: "video",
            title: "6 talentos para sacar adelante la restauración",
            duration: "14:50",
          },
        ],
      },
    ],
  },

  productor: {
    role: "productor",
    title: "Restaurando tu finca",
    theme: "Conservación y restauración en fincas ganaderas.",
    modules: [
      {
        id: "prod-m1",
        title: "¿Por qué conservar bosque en una finca ganadera?",
        intro:
          "Beneficios de conservar bosque dentro de una finca: protección del agua, sombra, biodiversidad, suelo y productividad a largo plazo.",
        items: [
          {
            id: "prod-a4",
            type: "article",
            title:
              "Aliviane el pago del predial de su finca con la gestión de la biodiversidad",
            summary:
              "Cómo la gestión de la biodiversidad puede generar incentivos económicos y reducir costos del predio.",
            body: "Conservar y restaurar áreas naturales dentro de una finca no solo trae beneficios para el agua, el suelo y la biodiversidad: también puede generar incentivos económicos para los propietarios. Este artículo muestra cómo la gestión de la biodiversidad puede convertirse en una herramienta para fortalecer la sostenibilidad y reducir algunos costos asociados al manejo del predio.",
          },
          {
            id: "prod-v1",
            type: "video",
            title: "Ventajas de conservar el bosque. Mensaje de José Rendón",
            duration: "1:17",
          },
          {
            id: "prod-v2",
            type: "video",
            title: "¿Se puede restaurar una finca de ganadería extensiva?",
            duration: "12:56",
          },
        ],
      },
      {
        id: "prod-m2",
        title: "Restauración en fincas ganaderas",
        intro:
          "Cómo una finca ganadera puede iniciar procesos de restauración sin dejar de ser productiva, integrando conservación, regeneración natural y manejo del paisaje.",
        items: [
          {
            id: "prod-v3",
            type: "video",
            title: "Ley del árbol: analizada por un ganadero en la Amazonía",
            duration: "16:04",
          },
          {
            id: "prod-i1",
            type: "infographic",
            title:
              "Criterios de selección de 15 especies de interés para la restauración en la Amazonía colombiana",
            source: "Google Drive",
          },
          {
            id: "prod-a5",
            type: "article",
            title: "No toda plántula es un árbol: restaurar no es sembrar por sembrar",
            summary:
              "Por qué la restauración requiere planificación y criterios técnicos, especialmente en territorios productivos.",
            body: "Restaurar un ecosistema implica mucho más que sembrar árboles. Para lograr procesos exitosos es necesario seleccionar especies adecuadas, entender el paisaje y garantizar el cuidado del material vegetal. Este artículo explica por qué la restauración requiere planificación y criterios técnicos, especialmente en territorios productivos como las fincas ganaderas.",
          },
        ],
      },
      {
        id: "prod-m3",
        title: "Alianzas para restaurar tu finca",
        intro:
          "La importancia de trabajar con aliados técnicos, comunitarios, institucionales y financieros para que la restauración sea viable.",
        items: [
          {
            id: "prod-v4",
            type: "video",
            title: "5 alianzas para potenciar la restauración en tu finca",
            duration: "19:28",
          },
        ],
      },
    ],
  },

  independiente: {
    role: "independiente",
    title: "Bases de la restauración ecológica",
    theme: "Restauración, semillas, árboles semilleros y viveros.",
    modules: [
      {
        id: "ind-m1",
        title: "Conceptos básicos de restauración ecológica",
        intro:
          "Qué significa restaurar un ecosistema, por qué es importante y cuáles son los pasos básicos para iniciar un proceso de restauración.",
        items: [
          {
            id: "ind-v1",
            type: "video",
            title: "Aprende a restaurar un ecosistema",
            duration: "13:26",
          },
          {
            id: "ind-v2",
            type: "video",
            title:
              "Indra Cap. 2: transformación del paisaje, mensaje de un ganadero",
            duration: "2:05",
          },
        ],
      },
      {
        id: "ind-m2",
        title: "Semillas y árboles semilleros",
        intro:
          "La importancia de las semillas nativas, la identificación de árboles semilleros y las buenas prácticas para recolectar semillas.",
        items: [
          {
            id: "ind-a6",
            type: "article",
            title:
              "Crean centro de semillas nativas en la Amazonía para recuperación forestal",
            summary:
              "Cómo las redes locales, los viveros y el conocimiento del territorio recuperan ecosistemas degradados.",
            body: "Las semillas nativas son la base de muchos procesos de restauración ecológica. Este artículo presenta una iniciativa enfocada en la conservación y producción de semillas en la Amazonía colombiana, mostrando cómo las redes locales, los viveros y el conocimiento del territorio son fundamentales para recuperar ecosistemas degradados.",
          },
          {
            id: "ind-v3",
            type: "video",
            title: "Indra Cap. 1: mensaje de Don Eli sobre semillas",
            duration: "1:53",
          },
          {
            id: "ind-v4",
            type: "video",
            title:
              "Indra Cap. 3: importancia de los árboles semilleros y tecnología de dron",
            duration: "2:29",
          },
          {
            id: "ind-v5",
            type: "video",
            title: "Recomendaciones de cómo recoger semillas con Don Eli",
            duration: "3:33",
          },
          {
            id: "ind-i1",
            type: "infographic",
            title: "¿Cómo escoger bien un árbol semillero?",
          },
        ],
      },
      {
        id: "ind-m3",
        title: "Viveros y redes locales de restauración ecológica",
        intro:
          "El papel de los viveros comunitarios y locales en la producción de material vegetal para restaurar ecosistemas amazónicos.",
        items: [
          {
            id: "ind-v6",
            type: "video",
            title: "Mensajes viveristas del Caquetá",
            duration: "1:15",
          },
          {
            id: "ind-w1",
            type: "writing",
            title: "Documento escrito del módulo",
            pending: true,
          },
        ],
      },
    ],
    resources: [
      {
        id: "ind-pdf1",
        type: "pdf",
        title: "Estrategia Nacional de Soluciones Basadas en la Naturaleza",
      },
    ],
  },
};

export const ROLE_LABELS: Record<RoleId, string> = {
  empresa: "Empresa / inversionista",
  productor: "Productor/a rural",
  independiente: "Participante independiente",
};

// ── Helpers ────────────────────────────────────────────────────────────────

export const DEFAULT_ROLE: RoleId = "independiente";

export function isRoleId(value: unknown): value is RoleId {
  return value === "empresa" || value === "productor" || value === "independiente";
}

export function getCourse(role: RoleId | null | undefined): Course {
  return COURSES[isRoleId(role) ? role : DEFAULT_ROLE];
}

/** Todos los ítems del curso en orden, aplanando los módulos. */
export function getAllItems(course: Course): ContentItem[] {
  return course.modules.flatMap((m) => m.items);
}

export function findItem(
  course: Course,
  itemId: string
): { item: ContentItem; module: Module } | null {
  for (const module of course.modules) {
    const item = module.items.find((i) => i.id === itemId);
    if (item) return { item, module };
  }
  const resource = course.resources?.find((i) => i.id === itemId);
  if (resource) return { item: resource, module: course.modules[0] };
  return null;
}

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  article: "Artículo",
  video: "Video",
  infographic: "Infografía",
  pdf: "PDF",
  quiz: "Quiz",
  writing: "Documento",
};
