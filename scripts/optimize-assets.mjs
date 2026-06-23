// One-off asset optimisation (Phase 4): generate square + maskable PWA icons
// from the logo, and compress oversized staged photos in public/images.
// Run: node scripts/optimize-assets.mjs
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  readdirSync,
  statSync,
} from "node:fs";
import { join, extname } from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const LOGO = join(ROOT, "public", "khi-logo.png");
const ICON_DIR = join(ROOT, "public", "icons");
mkdirSync(ICON_DIR, { recursive: true });

// ---- PWA icons: logo centred on a white field (provisional until a real
// square mark / SVG is supplied). Maskable keeps content in the ~80% safe zone.
async function makeIcon(size, logoRatio, out) {
  const logoW = Math.round(size * logoRatio);
  const logo = await sharp(LOGO)
    .resize({ width: logoW, fit: "inside" })
    .toBuffer();
  const { height: logoH } = await sharp(logo).metadata();
  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([
      {
        input: logo,
        top: Math.round((size - logoH) / 2),
        left: Math.round((size - logoW) / 2),
      },
    ])
    .png()
    .toFile(join(ICON_DIR, out));
  console.log("icon:", out);
}

await makeIcon(192, 0.74, "icon-192.png");
await makeIcon(512, 0.74, "icon-512.png");
await makeIcon(512, 0.58, "icon-maskable-512.png"); // safe-zone padding
await makeIcon(180, 0.74, "apple-icon.png");

// ---- Compress oversized photos. Cap the longest side per area; re-encode
// JPEG (mozjpeg q80). Read to buffer first to avoid in-place read/write races.
const IMAGES = join(ROOT, "public", "images");
const caps = { people: 900, default: 1600 };

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p);
    else files.push(p);
  }
}
const files = [];
walk(IMAGES);

let savedTotal = 0;
for (const file of files) {
  const ext = extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;
  const before = statSync(file).size;
  const cap = file.includes(`${join("images", "people")}`)
    ? caps.people
    : caps.default;
  const input = readFileSync(file);
  const meta = await sharp(input).metadata();
  const longest = Math.max(meta.width ?? 0, meta.height ?? 0);
  let pipeline = sharp(input).rotate(); // respect EXIF orientation
  if (longest > cap)
    pipeline = pipeline.resize({
      width: meta.width >= meta.height ? cap : null,
      height: meta.height > meta.width ? cap : null,
      fit: "inside",
    });
  const out =
    ext === ".png"
      ? await pipeline.png({ compressionLevel: 9 }).toBuffer()
      : await pipeline.jpeg({ quality: 80, mozjpeg: true }).toBuffer();
  if (out.length < before) {
    writeFileSync(file, out);
    savedTotal += before - out.length;
    console.log(
      `compressed ${file.replace(ROOT, ".")}  ${(before / 1024).toFixed(0)}KB -> ${(out.length / 1024).toFixed(0)}KB`,
    );
  }
}
console.log(`\nTotal saved: ${(savedTotal / 1024).toFixed(0)}KB`);
