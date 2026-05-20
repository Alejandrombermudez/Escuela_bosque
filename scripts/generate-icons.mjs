/**
 * Genera los iconos PWA para Amazonia Emprende.
 * Fondo: verde oscuro del bosque + logo blanco centrado.
 * Ejecutar: node scripts/generate-icons.mjs
 */
import sharp from "sharp";
import { mkdir } from "fs/promises";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const LOGO = resolve(ROOT, "public/images/logo-ae.png");
const OUT = resolve(ROOT, "public/icons");

await mkdir(OUT, { recursive: true });

const BG_COLOR = { r: 15, g: 30, b: 15, alpha: 1 }; // verde bosque oscuro

async function makeIcon(size) {
  // Fondo sólido verde oscuro
  const bg = await sharp({
    create: { width: size, height: size, channels: 4, background: BG_COLOR },
  })
    .png()
    .toBuffer();

  // Logo redimensionado al 60% del icono, centrado
  const logoSize = Math.round(size * 0.6);
  const offset = Math.round((size - logoSize) / 2);
  const logo = await sharp(LOGO)
    .resize(logoSize, logoSize, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();

  const outFile = resolve(OUT, `icon-${size}x${size}.png`);
  await sharp(bg)
    .composite([{ input: logo, left: offset, top: offset }])
    .toFile(outFile);

  console.log(`✓ icon-${size}x${size}.png`);
}

// Icono para iOS (apple-touch-icon): fondo sólido requerido por Safari
async function makeAppleIcon() {
  const size = 180;
  const bg = await sharp({
    create: { width: size, height: size, channels: 4, background: BG_COLOR },
  })
    .png()
    .toBuffer();

  const logoSize = Math.round(size * 0.65);
  const offset = Math.round((size - logoSize) / 2);
  const logo = await sharp(LOGO)
    .resize(logoSize, logoSize, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();

  const outFile = resolve(ROOT, "public/icons/apple-touch-icon.png");
  await sharp(bg)
    .composite([{ input: logo, left: offset, top: offset }])
    .toFile(outFile);

  console.log("✓ apple-touch-icon.png (180x180)");
}

await makeIcon(192);
await makeIcon(512);
await makeAppleIcon();

console.log("\n¡Iconos generados en public/icons/");
