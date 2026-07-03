// Redesign v2 Phase A: tile unmapped wp-export originals into labeled contact
// sheets for visual triage. Run: node scripts/contact-sheet.mjs <outDir>
import { readdirSync, statSync, mkdirSync } from "node:fs";
import { join, basename, extname } from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const UPLOADS = join(ROOT, "docs", "wp-export", "uploads");
const OUT = process.argv[2] || join(ROOT, ".contact-sheets");
mkdirSync(OUT, { recursive: true });

// Files already staged/mapped in public/images (by basename, sans extension).
const staged = new Set();
function walkStaged(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walkStaged(p);
    else staged.add(basename(entry, extname(entry)).toLowerCase());
  }
}
walkStaged(join(ROOT, "public", "images"));

// Demo/template + fake-location names to skip (from images.md triage).
const SKIP =
  /(^save-|^home-bg|wildlife|breeding|clean-ocean|^forest|fresh-water|bg-graphics|divider|gray-elephant|cta-bg|site-logo|favicon|demo-screenshot|deer-icon|forest-icon|member-icon|dollar-icon|animal-welfare|rectangle|heart-1|^africa$|^australia$|^india$|^usa$|khi-logo|cropped-khi)/i;

const candidates = [];
function walkUploads(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const st = statSync(p);
    if (st.isDirectory()) {
      // Only year dirs — skip theme/template payload dirs.
      if (
        /^(19|20)\d{2}$|^\d{2}$/.test(entry) ||
        /^\d{4}$/.test(basename(dir)) ||
        dir === UPLOADS
      ) {
        if (!/ai-builder|ast-block|astra/i.test(entry)) walkUploads(p);
      }
      continue;
    }
    const ext = extname(entry).toLowerCase();
    if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;
    // Originals only: no -WxH resize suffix.
    if (/-\d+x\d+\.(jpe?g|png)$/i.test(entry)) continue;
    const stem = basename(entry, ext).toLowerCase();
    if (SKIP.test(stem)) continue;
    if (staged.has(stem)) continue; // already mapped into the site
    if (st.size < 8_000) continue; // icons/trivial
    candidates.push(p);
  }
}
walkUploads(UPLOADS);
candidates.sort();

console.log(`unmapped originals: ${candidates.length}`);

const TILE = 320;
const LABEL_H = 26;
const COLS = 5;
const ROWS = 5;
const PER_SHEET = COLS * ROWS;

function labelSvg(text) {
  const safe = text.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  return Buffer.from(
    `<svg width="${TILE}" height="${LABEL_H}"><rect width="100%" height="100%" fill="#1f2328"/><text x="4" y="18" font-family="monospace" font-size="13" fill="#ffffff">${safe}</text></svg>`,
  );
}

for (let s = 0; s * PER_SHEET < candidates.length; s++) {
  const batch = candidates.slice(s * PER_SHEET, (s + 1) * PER_SHEET);
  const composites = [];
  for (let i = 0; i < batch.length; i++) {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const x = col * TILE;
    const y = row * (TILE + LABEL_H);
    try {
      const img = await sharp(batch[i])
        .rotate()
        .resize(TILE, TILE, { fit: "cover" })
        .toBuffer();
      composites.push({ input: img, left: x, top: y });
      composites.push({
        input: labelSvg(
          `${s * PER_SHEET + i}: ${basename(batch[i]).slice(0, 34)}`,
        ),
        left: x,
        top: y + TILE,
      });
    } catch {
      console.log("unreadable:", batch[i]);
    }
  }
  const sheetPath = join(OUT, `sheet-${s}.png`);
  await sharp({
    create: {
      width: COLS * TILE,
      height: ROWS * (TILE + LABEL_H),
      channels: 3,
      background: { r: 247, g: 246, b: 236 },
    },
  })
    .composite(composites)
    .png({ compressionLevel: 9 })
    .toFile(sheetPath);
  console.log("sheet:", sheetPath, `(${batch.length} tiles)`);
}

// Index for mapping tile numbers back to paths.
candidates.forEach((p, i) =>
  console.log(String(i).padStart(3), p.replace(ROOT, ".")),
);
